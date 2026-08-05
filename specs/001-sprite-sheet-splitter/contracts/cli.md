# CLI Contract: split_sprite_sheet

Command-line interface exposed by `scripts/split_sprite_sheet.py`.

## Invocation

```
python scripts/split_sprite_sheet.py [INPUT] [options]
```

## Arguments & Options

| Name           | Type   | Default                 | Description                                                                 |
|----------------|--------|-------------------------|-----------------------------------------------------------------------------|
| `INPUT`        | path   | `assets/sprite_sheets`  | A single image file OR a directory of sheets to process.                    |
| `-o, --output` | path   | `assets/cards`          | Root output directory. Each sheet gets a `<output>/<sheet-name>/` subfolder.|
| `-g, --grid`   | int    | `4`                     | Cells per side (grid×grid tiles). Must evenly divide the image width.       |
| `-f, --force`  | flag   | (overwrite is default)  | Reserved; output is idempotent and overwrites by default.                   |

## Behavior contract

1. If `INPUT` is a **file**: process that one sheet.
2. If `INPUT` is a **directory**: process every image file within (non-images ignored). (FR-008)
3. For each valid sheet, produce exactly `grid²` tiles named `card_01.png` … `card_NN.png` in reading order. (FR-002, FR-003, FR-005)
4. Each tile is exactly `image_width / grid` pixels square, cropped losslessly. (FR-002, FR-004)
5. Transparency (alpha) is preserved in outputs. (FR-009)
6. Outputs are grouped in a per-sheet subfolder named after the source file stem. (FR-006)

## Validation & errors

| Condition                              | Behavior                                                                      | Exit code |
|----------------------------------------|-------------------------------------------------------------------------------|-----------|
| Image not 1024x1024 (or not divisible) | Print clear message naming the file; skip it (batch continues).               | 0 if others succeed; 1 if none processed |
| `INPUT` path does not exist            | Print clear error; no output produced.                                        | 2         |
| Directory contains no valid sheets     | Print clear message; no output produced.                                      | 1         |
| Non-image file in directory            | Silently ignored.                                                             | n/a       |
| Success (≥1 sheet processed)           | Print per-sheet summary (sheet name → N tiles written).                       | 0         |

## Example runs

```
# Process all sheets in the default folder
python scripts/split_sprite_sheet.py

# Process a single sheet
python scripts/split_sprite_sheet.py assets/sprite_sheets/space.png

# Custom output directory
python scripts/split_sprite_sheet.py assets/sprite_sheets -o build/cards
```

## Expected output for `space.png`

```
assets/cards/space/card_01.png  ... card_16.png   (each 256x256, PNG with alpha preserved)
```
