# Quickstart: Sprite Sheet Splitter

Validation guide proving the feature works end-to-end. See [contracts/cli.md](./contracts/cli.md) and [data-model.md](./data-model.md) for details.

## Prerequisites

- Python 3.10+
- Install dependencies:

```powershell
pip install -r requirements.txt
```

## Run

Process every sprite sheet in the default folder:

```powershell
python scripts/split_sprite_sheet.py
```

Or process a single sheet:

```powershell
python scripts/split_sprite_sheet.py assets/sprite_sheets/space.png
```

## Expected outcome

- A new folder `assets/cards/space/` containing `card_01.png` … `card_16.png`.
- Each output file is exactly **256x256** pixels.
- The 16 images match the original grid in reading order (top-left = `card_01`, bottom-right = `card_16`).
- Transparency from the source PNG is preserved.

## Validation scenarios

| Scenario | Steps | Expected |
|----------|-------|----------|
| Single sheet (User Story 1) | Run on `space.png` | 16 files, each 256x256, correct reading order (SC-001, SC-002) |
| Batch (User Story 2) | Run with no args on `assets/sprite_sheets/` | Each of the 3 sheets produces its own `card_01..16.png` under `assets/cards/<name>/` (SC-003) |
| Bad dimensions | Run on a non-1024x1024 image | Clear message naming the file; that file skipped (SC-004) |

## Automated tests

```powershell
pytest tests/test_split_sprite_sheet.py -v
```

Tests assert: exactly 16 tiles per sheet, each 256x256, correct crop content per cell, transparency preserved, and off-size inputs are rejected with a clear message.
