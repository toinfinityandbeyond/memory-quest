# Implementation Plan: Sprite Sheet Splitter

**Branch**: `001-sprite-sheet-splitter` | **Date**: 2026-08-05 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/001-sprite-sheet-splitter/spec.md`

## Summary

Provide a small, self-contained script that splits 1024x1024 sprite sheets (each a strict 4x4 grid) into 16 individual 256x256 card images. It must validate input dimensions, preserve transparency, name outputs by grid position, group outputs per source sheet, and support batch-processing every sheet in `assets/sprite_sheets/`.

## Technical Context

**Language/Version**: Python 3.10+
**Primary Dependencies**: Pillow (PIL) for image loading, cropping, and saving
**Storage**: Local filesystem — reads from `assets/sprite_sheets/`, writes to `assets/cards/<sheet-name>/`
**Testing**: pytest (verifies tile count, dimensions, and per-cell content)
**Target Platform**: Cross-platform CLI (developed on Windows/PowerShell)
**Project Type**: Single-project utility script (asset tooling)
**Performance Goals**: Not performance-critical; process all current sheets (<10) in well under a few seconds
**Constraints**: Must preserve alpha/transparency (PNG); no scaling or resampling — exact 256x256 crops only
**Scale/Scope**: A handful of sprite sheets; 16 tiles each

## Constitution Check

No project constitution exists (`.specify/memory/constitution.md` not present). No governance gates to evaluate. Applying general good-practice defaults: keep the tool small, dependency-light, deterministic, and idempotent.

**Result**: PASS (no constitution constraints).

## Project Structure

### Documentation (this feature)

```
specs/001-sprite-sheet-splitter/
├── spec.md
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   └── cli.md           # CLI contract
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```
memory-game/
├── assets/
│   ├── sprite_sheets/          # Input: animalcrossing.png, onepiece.png, space.png
│   └── cards/                  # Output (generated)
│       ├── animalcrossing/     # card_01.png ... card_16.png
│       ├── onepiece/
│       └── space/
├── scripts/
│   └── split_sprite_sheet.py   # The splitter tool
├── tests/
│   └── test_split_sprite_sheet.py
└── requirements.txt
```

**Structure Decision**: Single-project layout. A standalone `scripts/split_sprite_sheet.py` keeps asset tooling separate from future game code, with tests under `tests/`.

## Complexity Tracking

No constitution violations or added complexity requiring justification.
