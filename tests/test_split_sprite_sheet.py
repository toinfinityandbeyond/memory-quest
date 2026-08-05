"""Tests for the sprite sheet splitter."""

import sys
from pathlib import Path

import pytest
from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))

import split_sprite_sheet as splitter  # noqa: E402


CELL_COLORS = [
    (r * 60, c * 60, 128, 255)
    for r in range(4)
    for c in range(4)
]


def make_sheet(size: int = 1024, grid: int = 4, mode: str = "RGBA") -> Image.Image:
    """Build a synthetic sheet where each cell has a unique solid color."""
    image = Image.new(mode, (size, size))
    tile = size // grid
    idx = 0
    for row in range(grid):
        for col in range(grid):
            color = CELL_COLORS[idx]
            if mode == "RGB":
                color = color[:3]
            cell = Image.new(mode, (tile, tile), color)
            image.paste(cell, (col * tile, row * tile))
            idx += 1
    return image


def test_produces_16_tiles_256px():
    tiles = splitter.split_image(make_sheet(), 4)
    assert len(tiles) == 16
    for tile in tiles:
        assert tile.size == (256, 256)


def test_reading_order_matches_grid():
    tiles = splitter.split_image(make_sheet(), 4)
    for idx, tile in enumerate(tiles):
        expected = CELL_COLORS[idx]
        assert tile.getpixel((0, 0)) == expected


def test_transparency_preserved():
    image = Image.new("RGBA", (1024, 1024), (255, 0, 0, 0))
    tiles = splitter.split_image(image, 4)
    assert tiles[0].mode == "RGBA"
    assert tiles[0].getpixel((0, 0))[3] == 0


def test_validate_rejects_offsize():
    with pytest.raises(splitter.SpriteSheetError):
        splitter.validate_sheet(Image.new("RGBA", (512, 512)), 4)


def test_save_tiles_naming_and_grouping(tmp_path):
    tiles = splitter.split_image(make_sheet(), 4)
    written = splitter.save_tiles(tiles, "space", tmp_path)
    assert len(written) == 16
    assert (tmp_path / "space" / "card_01.png").exists()
    assert (tmp_path / "space" / "card_16.png").exists()


def test_directory_processes_all_sheets(tmp_path):
    input_dir = tmp_path / "sheets"
    input_dir.mkdir()
    output_dir = tmp_path / "cards"
    for name in ("alpha", "beta"):
        make_sheet().save(input_dir / f"{name}.png")

    exit_code = splitter.main([str(input_dir), "-o", str(output_dir)])

    assert exit_code == 0
    for name in ("alpha", "beta"):
        tiles = list((output_dir / name).glob("card_*.png"))
        assert len(tiles) == 16


def test_offsize_image_is_skipped_with_message(tmp_path, capsys):
    input_dir = tmp_path / "sheets"
    input_dir.mkdir()
    output_dir = tmp_path / "cards"
    make_sheet().save(input_dir / "good.png")
    Image.new("RGBA", (500, 500)).save(input_dir / "bad.png")

    exit_code = splitter.main([str(input_dir), "-o", str(output_dir)])

    assert exit_code == 0
    assert (output_dir / "good").exists()
    assert not (output_dir / "bad").exists()
    err = capsys.readouterr().err
    assert "bad.png" in err


def test_nonimage_files_ignored(tmp_path):
    input_dir = tmp_path / "sheets"
    input_dir.mkdir()
    output_dir = tmp_path / "cards"
    make_sheet().save(input_dir / "good.png")
    (input_dir / "notes.txt").write_text("not an image")

    exit_code = splitter.main([str(input_dir), "-o", str(output_dir)])

    assert exit_code == 0
    assert (output_dir / "good").exists()
    assert not (output_dir / "notes").exists()


def test_missing_input_returns_exit_code_2(tmp_path):
    exit_code = splitter.main([str(tmp_path / "does_not_exist"), "-o", str(tmp_path)])
    assert exit_code == 2


def test_empty_directory_returns_exit_code_1(tmp_path):
    input_dir = tmp_path / "empty"
    input_dir.mkdir()
    exit_code = splitter.main([str(input_dir), "-o", str(tmp_path / "cards")])
    assert exit_code == 1
