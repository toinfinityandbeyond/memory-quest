# Data Model: Sprite Sheet Splitter

This tool is stateless (no database). The "entities" below describe the in-memory/file concepts the script operates on.

## Entity: SpriteSheet

Represents a single source image to be split.

| Field         | Type    | Description                                                        | Validation                                  |
|---------------|---------|--------------------------------------------------------------------|---------------------------------------------|
| `path`        | Path    | Filesystem path to the source image                                | Must exist and be a readable image file     |
| `name`        | string  | Theme/sheet name = filename without extension (e.g. `space`)       | Non-empty                                   |
| `width`       | int     | Image width in pixels                                              | MUST equal 1024                             |
| `height`      | int     | Image height in pixels                                            | MUST equal 1024                             |
| `grid`        | int     | Cells per side of the grid                                        | Default 4; `width % grid == 0`              |
| `tile_size`   | int     | Derived: `width / grid`                                           | Derived (256 for a 1024px sheet, grid 4)    |

**Validation rules** (from FR-001, FR-007):
- If `width != 1024` or `height != 1024`, the sheet is invalid → reported and skipped.
- `width` MUST be evenly divisible by `grid`.

## Entity: CardImage

Represents one extracted 256x256 tile.

| Field         | Type    | Description                                                        | Validation                       |
|---------------|---------|--------------------------------------------------------------------|----------------------------------|
| `source`      | string  | Name of the originating sheet                                     | Matches a `SpriteSheet.name`     |
| `row`         | int     | Grid row, 0-indexed                                               | 0 ≤ row < grid                   |
| `col`         | int     | Grid column, 0-indexed                                            | 0 ≤ col < grid                   |
| `index`       | int     | Reading-order ordinal = `row * grid + col + 1`                    | 1 ≤ index ≤ grid²                |
| `output_path` | Path    | `assets/cards/<source>/card_<index:02d>.png`                      | Parent dir created if missing    |
| `width`       | int     | Output width                                                      | MUST equal `tile_size` (256)     |
| `height`      | int     | Output height                                                     | MUST equal `tile_size` (256)     |

**Derivation** (from FR-002, FR-005):
- Crop box for a cell: `(col * tile_size, row * tile_size, (col+1) * tile_size, (row+1) * tile_size)`.
- Reading order: left-to-right, top-to-bottom.

## Relationships

- One `SpriteSheet` produces exactly `grid²` `CardImage` records (16 for a 4x4 grid).
- Each `CardImage` belongs to exactly one `SpriteSheet` (via `source`).
