"""Split sprite sheets into individual card images.

Takes a 1024x1024 sprite sheet containing a strict 4x4 grid of icons and
produces the 16 individual 256x256 images it contains. Supports processing a
single file or every sheet in a directory.

See ``specs/001-sprite-sheet-splitter/contracts/cli.md`` for the full CLI
contract.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from PIL import Image

EXPECTED_SIZE = 1024
DEFAULT_GRID = 4
DEFAULT_INPUT = Path("assets/sprite_sheets")
DEFAULT_OUTPUT = Path("assets/cards")
IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp"}


class SpriteSheetError(Exception):
    """Raised when a sprite sheet fails validation."""


def load_sheet(path: Path) -> Image.Image:
    """Open an image as RGBA so alpha/transparency is preserved."""
    image = Image.open(path)
    return image.convert("RGBA")


def validate_sheet(image: Image.Image, grid: int) -> None:
    """Ensure the image matches the expected grid geometry.

    Raises ``SpriteSheetError`` with a clear message when the image is not
    ``EXPECTED_SIZE`` square or its width is not evenly divisible by ``grid``.
    """
    width, height = image.size
    if width != EXPECTED_SIZE or height != EXPECTED_SIZE:
        raise SpriteSheetError(
            f"expected a {EXPECTED_SIZE}x{EXPECTED_SIZE} image but got {width}x{height}"
        )
    if width % grid != 0:
        raise SpriteSheetError(
            f"image width {width} is not evenly divisible by grid size {grid}"
        )


def split_image(image: Image.Image, grid: int) -> list[Image.Image]:
    """Split ``image`` into ``grid*grid`` tiles in reading order.

    Reading order is left-to-right, top-to-bottom. Tiles are exact,
    lossless crops (no scaling/resampling).
    """
    tile = image.width // grid
    tiles: list[Image.Image] = []
    for row in range(grid):
        for col in range(grid):
            box = (col * tile, row * tile, (col + 1) * tile, (row + 1) * tile)
            tiles.append(image.crop(box))
    return tiles


def save_tiles(tiles: list[Image.Image], sheet_name: str, output_root: Path) -> list[Path]:
    """Write tiles as ``card_01.png`` ... in ``<output_root>/<sheet_name>/``.

    Existing files are overwritten (idempotent). Returns the written paths.
    """
    out_dir = output_root / sheet_name
    out_dir.mkdir(parents=True, exist_ok=True)
    written: list[Path] = []
    for index, tile in enumerate(tiles, start=1):
        out_path = out_dir / f"card_{index:02d}.png"
        tile.save(out_path, format="PNG")
        written.append(out_path)
    return written


def process_sheet(path: Path, output_root: Path, grid: int) -> int:
    """Load, validate, split and save a single sheet. Returns tile count."""
    image = load_sheet(path)
    validate_sheet(image, grid)
    tiles = split_image(image, grid)
    written = save_tiles(tiles, path.stem, output_root)
    return len(written)


def iter_sheets(input_path: Path) -> list[Path]:
    """Return the sheets to process.

    For a file: that single file. For a directory: all image files within
    (non-image files are ignored), sorted by name.
    """
    if input_path.is_file():
        return [input_path]
    sheets = [
        p
        for p in sorted(input_path.iterdir())
        if p.is_file() and p.suffix.lower() in IMAGE_EXTENSIONS
    ]
    return sheets


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description=(
            "Split 1024x1024 sprite sheets (4x4 grid) into 16 individual "
            "256x256 card images."
        )
    )
    parser.add_argument(
        "input",
        nargs="?",
        default=str(DEFAULT_INPUT),
        help=f"A sprite sheet file or a directory of sheets (default: {DEFAULT_INPUT})",
    )
    parser.add_argument(
        "-o",
        "--output",
        default=str(DEFAULT_OUTPUT),
        help=f"Root output directory (default: {DEFAULT_OUTPUT})",
    )
    parser.add_argument(
        "-g",
        "--grid",
        type=int,
        default=DEFAULT_GRID,
        help=f"Cells per side of the grid (default: {DEFAULT_GRID})",
    )
    parser.add_argument(
        "-f",
        "--force",
        action="store_true",
        help="Reserved; output is idempotent and overwrites by default.",
    )
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    input_path = Path(args.input)
    output_root = Path(args.output)

    if not input_path.exists():
        print(f"error: input path does not exist: {input_path}", file=sys.stderr)
        return 2

    sheets = iter_sheets(input_path)
    if not sheets:
        print(f"error: no image files found in: {input_path}", file=sys.stderr)
        return 1

    processed = 0
    for sheet in sheets:
        try:
            count = process_sheet(sheet, output_root, args.grid)
        except SpriteSheetError as exc:
            print(f"skipping {sheet.name}: {exc}", file=sys.stderr)
            continue
        except OSError as exc:
            print(f"skipping {sheet.name}: could not read image ({exc})", file=sys.stderr)
            continue
        processed += 1
        print(f"{sheet.stem}: wrote {count} tiles to {output_root / sheet.stem}")

    if processed == 0:
        print("error: no sheets were processed successfully", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
