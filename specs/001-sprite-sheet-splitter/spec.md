# Feature Specification: Sprite Sheet Splitter

**Feature Branch**: `001-sprite-sheet-splitter`
**Created**: 2026-08-05
**Status**: Draft
**Input**: User description: "Necesitamos montar un script que a partir de una imagen de 1024x1024 donde hay un grid de 4x4 nos genere las 16 imagenes que contiene. Cada imagen será, por tanto, de 256x256. Los sprites están en assets/sprite_sheets"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Split a sprite sheet into individual card images (Priority: P1)

As a game developer preparing assets for the memory game, I want to take a single 1024x1024 sprite sheet that contains a 4x4 grid of icons and automatically produce the 16 individual 256x256 images it contains, so that each card icon exists as a standalone image ready to be used in the game.

**Why this priority**: Without individual images, the memory game cannot render distinct cards. This is the foundational asset-preparation step that unblocks all subsequent game development. It delivers immediate, standalone value.

**Independent Test**: Provide one of the existing sprite sheets (e.g. `assets/sprite_sheets/space.png`) as input and confirm that 16 separate image files are produced, each 256x256, each containing exactly one icon from the original grid, in reading order (left-to-right, top-to-bottom).

**Acceptance Scenarios**:

1. **Given** a 1024x1024 sprite sheet containing a 4x4 grid, **When** the splitting process runs on that sheet, **Then** exactly 16 image files of 256x256 pixels are produced.
2. **Given** the produced images, **When** they are viewed in order, **Then** they correspond to the original grid cells in reading order (row by row, left to right).
3. **Given** a sprite sheet with a recognizable theme (e.g. "space"), **When** the process runs, **Then** the output images are grouped/named so it is clear which sheet and which cell each image came from.

---

### User Story 2 - Process all sprite sheets in the assets folder (Priority: P2)

As a game developer, I want to process every sprite sheet placed in `assets/sprite_sheets/` in one run, so that I can regenerate all card assets at once whenever sheets are added or updated.

**Why this priority**: There are multiple themed sheets (`animalcrossing`, `onepiece`, `space`) and more may be added. Batch processing avoids repetitive manual work, but the core value is already delivered by User Story 1 on a single sheet.

**Independent Test**: Run the process against the `assets/sprite_sheets/` folder and confirm each sheet yields its own set of 16 images, kept separate from the other sheets' outputs.

**Acceptance Scenarios**:

1. **Given** multiple sprite sheets in the input folder, **When** the process runs once, **Then** every sheet is split into its own 16 images.
2. **Given** a newly added sprite sheet, **When** the process is re-run, **Then** the new sheet is processed alongside the existing ones without manual per-file configuration.

---

### Edge Cases

- What happens when an input image is **not** 1024x1024? The process should report a clear message and skip (or handle) that file rather than producing malformed tiles.
- What happens when the input folder contains a non-image file? Non-image files are ignored.
- What happens when output images already exist from a previous run? Behavior should be predictable (overwrite is the default assumption — see Assumptions).
- What happens when the input folder is empty or the referenced file does not exist? A clear, actionable message is shown and no partial output is produced.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST accept a source image that is 1024x1024 pixels containing a 4x4 grid of icons.
- **FR-002**: The system MUST divide the source image into 16 equal cells of 256x256 pixels each.
- **FR-003**: The system MUST export each cell as its own separate image file (16 files per source sheet).
- **FR-004**: The system MUST preserve the visual content of each cell exactly, without scaling, cropping, or distortion beyond the grid division.
- **FR-005**: The system MUST order/name the output images so the original grid position (row and column, in reading order) is unambiguous.
- **FR-006**: The system MUST keep each source sheet's outputs distinguishable from other sheets' outputs (e.g. grouped by sheet name/theme).
- **FR-007**: The system MUST validate that an input image matches the expected 1024x1024 dimensions and report a clear message when it does not.
- **FR-008**: The system SHOULD be able to process all sprite sheets found in `assets/sprite_sheets/` in a single run.
- **FR-009**: The system MUST preserve image transparency where present in the source sheet.

### Key Entities

- **Sprite Sheet**: A single 1024x1024 source image containing a 4x4 grid of icons. Identified by its theme/name (e.g. `space`, `onepiece`, `animalcrossing`).
- **Card Image**: A single 256x256 image extracted from one cell of a sprite sheet. Attributes: source sheet name, grid position (row, column), and ordinal index (1–16).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Each 1024x1024 sprite sheet produces exactly 16 output images, each exactly 256x256 pixels.
- **SC-002**: 100% of output images contain exactly one icon that visually matches the corresponding cell of the source sheet in reading order.
- **SC-003**: A developer can process all sprite sheets currently in `assets/sprite_sheets/` and obtain all individual card images in a single run without editing configuration per file.
- **SC-004**: Given an incorrectly sized input, the developer receives a clear message identifying the file and the problem within the same run.

## Assumptions

- Source sheets are exactly 1024x1024 with icons laid out in a strict, evenly-spaced 4x4 grid (each cell exactly 256x256, no gutters/margins between cells).
- The reading order for the 16 cells is left-to-right, top-to-bottom (index 1 = top-left, index 16 = bottom-right).
- Output images are written to a location under `assets/` and grouped per source sheet (e.g. one subfolder per theme).
- Re-running the process overwrites previously generated images for the same sheet (idempotent output).
- PNG is the working format for both input and output to preserve transparency.
