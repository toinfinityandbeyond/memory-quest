# Tasks: Sprite Sheet Splitter

**Feature**: `001-sprite-sheet-splitter`
**Input**: Design documents from `specs/001-sprite-sheet-splitter/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/cli.md, quickstart.md

## Format

`- [ ] [TaskID] [P?] [Story?] Description with file path`

- **[P]**: Can run in parallel (different files, no dependency on incomplete tasks)
- **[US1] / [US2]**: Maps to the user story in `spec.md`

---

## Phase 1: Setup

- [X] T001 Create project directory structure (`scripts/`, `tests/`, `assets/cards/`) at repo root per `plan.md`
- [X] T002 Create `requirements.txt` at repo root pinning `Pillow` and `pytest`
- [X] T003 [P] Create `README.md` section (or `scripts/README.md`) documenting how to run the splitter, referencing `specs/001-sprite-sheet-splitter/quickstart.md`

---

## Phase 2: Foundational (blocking prerequisites)

- [X] T004 Create `scripts/split_sprite_sheet.py` with module skeleton: imports (Pillow, argparse, pathlib), constants (`EXPECTED_SIZE = 1024`, `DEFAULT_GRID = 4`), and a `main()` entry point guarded by `if __name__ == "__main__"`
- [X] T005 Implement core cropping function `split_image(image, grid) -> list[Image]` in `scripts/split_sprite_sheet.py` that returns `grid*grid` tiles in reading order using crop box `(col*tile, row*tile, (col+1)*tile, (row+1)*tile)` (FR-002, FR-004, FR-005)

**Checkpoint**: Foundation ready — cropping logic exists and is unit-testable before wiring CLI/IO.

---

## Phase 3: User Story 1 - Split a single sprite sheet (Priority: P1) 🎯 MVP

**Goal**: Given one 1024x1024 sheet, produce 16 individual 256x256 images in reading order, grouped in a per-sheet folder, preserving transparency.

**Independent Test**: Run on `assets/sprite_sheets/space.png` → `assets/cards/space/card_01.png`…`card_16.png`, each 256x256, matching the source grid.

- [X] T006 [P] [US1] Write failing test `tests/test_split_sprite_sheet.py::test_produces_16_tiles_256px` that builds a synthetic 1024x1024 image, calls `split_image(img, 4)`, and asserts 16 tiles each 256x256 (SC-001)
- [X] T007 [P] [US1] Add test `test_reading_order_matches_grid` in `tests/test_split_sprite_sheet.py` painting each cell a unique color and asserting output order top-left→bottom-right (SC-002, FR-005)
- [X] T008 [P] [US1] Add test `test_transparency_preserved` in `tests/test_split_sprite_sheet.py` using an RGBA image and asserting output tiles keep alpha (FR-009)
- [X] T009 [US1] Implement `load_sheet(path) -> Image` in `scripts/split_sprite_sheet.py` opening the image in RGBA to preserve alpha (FR-009)
- [X] T010 [US1] Implement `validate_sheet(image, grid)` in `scripts/split_sprite_sheet.py` enforcing 1024x1024 and `width % grid == 0`, raising a clear error otherwise (FR-001, FR-007)
- [X] T011 [US1] Implement `save_tiles(tiles, sheet_name, output_root)` in `scripts/split_sprite_sheet.py` writing `card_01.png`…`card_16.png` to `<output_root>/<sheet_name>/`, creating dirs, overwriting existing (FR-003, FR-005, FR-006)
- [X] T012 [US1] Implement `process_sheet(path, output_root, grid)` in `scripts/split_sprite_sheet.py` chaining load → validate → split → save and returning tile count
- [X] T013 [US1] Wire single-file path handling into `main()`/argparse in `scripts/split_sprite_sheet.py` (positional `INPUT`, `-o/--output`, `-g/--grid`) per `contracts/cli.md`
- [X] T014 [US1] Run the tool on `assets/sprite_sheets/space.png` and verify `assets/cards/space/` has 16 correct 256x256 tiles (quickstart validation)

**Checkpoint**: MVP complete — a single sheet can be split end-to-end and is independently testable.

---

## Phase 4: User Story 2 - Batch-process all sheets (Priority: P2)

**Goal**: Process every sheet in `assets/sprite_sheets/` in one run; skip invalid/off-size files with a clear message; ignore non-images.

**Independent Test**: Run with no args → each of `animalcrossing`, `onepiece`, `space` yields its own `card_01..16.png` under `assets/cards/<name>/`.

- [X] T015 [P] [US2] Add test `test_directory_processes_all_sheets` in `tests/test_split_sprite_sheet.py` pointing at a temp dir of synthetic sheets and asserting each gets its own 16-tile output folder (SC-003)
- [X] T016 [P] [US2] Add test `test_offsize_image_is_skipped_with_message` in `tests/test_split_sprite_sheet.py` asserting a non-1024 image is skipped and reported, batch continues (SC-004)
- [X] T017 [P] [US2] Add test `test_nonimage_files_ignored` in `tests/test_split_sprite_sheet.py` asserting non-image files in the directory are ignored
- [X] T018 [US2] Implement `iter_sheets(input_path) -> list[Path]` in `scripts/split_sprite_sheet.py` returning image files for a directory (ignoring non-images) or the single file (FR-008)
- [X] T019 [US2] Implement directory/batch loop in `main()` of `scripts/split_sprite_sheet.py`: default `INPUT=assets/sprite_sheets`, iterate sheets, skip invalid with clear per-file message, print per-sheet summary (FR-007, FR-008)
- [X] T020 [US2] Implement exit-code contract in `main()` of `scripts/split_sprite_sheet.py`: 0 on ≥1 success, 1 if none processed, 2 if INPUT path missing (per `contracts/cli.md`)
- [X] T021 [US2] Run the tool with no args and verify `assets/cards/{animalcrossing,onepiece,space}/` each contain 16 tiles (quickstart batch validation)

**Checkpoint**: Full batch processing works across all provided sheets.

---

## Phase 5: Polish & Cross-Cutting Concerns

- [X] T022 [P] Add module/function docstrings and `--help` text review in `scripts/split_sprite_sheet.py` to match `contracts/cli.md`
- [X] T023 [P] Ensure generated `assets/cards/` IS version-controlled (production game assets): do NOT add it to `.gitignore`; add a note in `scripts/README.md` that these tiles are committed and regenerated via the splitter when source sheets change
- [X] T024 Run full test suite `pytest tests/test_split_sprite_sheet.py -v` and confirm all pass

---

## Dependencies & Execution Order

- **Setup (T001–T003)** → blocks everything.
- **Foundational (T004–T005)** → blocks all user stories (core crop logic).
- **User Story 1 (T006–T014)** → depends on Foundational; delivers the MVP.
- **User Story 2 (T015–T021)** → depends on Foundational and reuses US1's `process_sheet`; can start after T012 exists.
- **Polish (T022–T024)** → after all stories.

## Parallel Opportunities

- **Setup**: T003 in parallel with T001/T002.
- **US1 tests**: T006, T007, T008 in parallel (same file, but independent test functions — coordinate if editing simultaneously).
- **US2 tests**: T015, T016, T017 in parallel.
- **Polish**: T022, T023 in parallel.

## Implementation Strategy

- **MVP scope**: Phases 1–3 (through T014). Delivers the core requested feature: split one sheet into 16 images.
- **Incremental delivery**: Add Phase 4 for batch processing across all themes, then Phase 5 polish.
