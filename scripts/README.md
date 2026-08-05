# Scripts

## split_sprite_sheet.py

Splits 1024x1024 sprite sheets (a strict 4x4 grid) into 16 individual
256x256 card images. Full validation guide:
[`specs/001-sprite-sheet-splitter/quickstart.md`](../specs/001-sprite-sheet-splitter/quickstart.md).

### Install

```powershell
pip install -r requirements.txt
```

### Usage

```powershell
# Process every sheet in the default folder (assets/sprite_sheets)
python scripts/split_sprite_sheet.py

# Process a single sheet
python scripts/split_sprite_sheet.py assets/sprite_sheets/space.png

# Custom output directory / grid size
python scripts/split_sprite_sheet.py assets/sprite_sheets -o build/cards -g 4
```

Outputs go to `assets/cards/<sheet-name>/card_01.png` … `card_16.png`, in
reading order (top-left = `card_01`, bottom-right = `card_16`). Transparency
is preserved. Re-running overwrites existing tiles (idempotent).

### Running without a local Python install (uv)

If Python is not on your `PATH` but [`uv`](https://docs.astral.sh/uv/) is,
use these exact commands (uv downloads Python and dependencies on demand into
an ephemeral environment — no manual `pip install` needed):

```powershell
# Run the splitter on all sheets
uv run --python 3.12 --with Pillow python scripts/split_sprite_sheet.py

# Run the splitter on a single sheet
uv run --python 3.12 --with Pillow python scripts/split_sprite_sheet.py assets/sprite_sheets/space.png

# Run the tests
uv run --python 3.12 --with Pillow --with pytest pytest tests/test_split_sprite_sheet.py -v
```

### Assets are committed

The generated tiles under `assets/cards/` **are version-controlled** — they
are production game assets consumed directly by the memory game. Regenerate
them with this splitter whenever the source sprite sheets change, and commit
the updated tiles.

### Tests

```powershell
pytest tests/test_split_sprite_sheet.py -v
```

Or, without a local Python install:

```powershell
uv run --python 3.12 --with Pillow --with pytest pytest tests/test_split_sprite_sheet.py -v
```
