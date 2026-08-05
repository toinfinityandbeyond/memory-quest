# Research: Sprite Sheet Splitter

## Decision: Use Python + Pillow

- **Decision**: Implement the splitter as a Python 3.10+ script using the Pillow (PIL) library.
- **Rationale**: Pillow is the de-facto standard for image manipulation in Python, provides exact pixel cropping via `Image.crop((left, upper, right, lower))`, preserves alpha channel for PNGs, and has zero native build steps on Windows. Cropping is lossless (no resampling), which satisfies FR-004 (no scaling/distortion).
- **Alternatives considered**:
  - **ImageMagick CLI (`convert -crop`)**: powerful but adds a system-level dependency the user must install separately; harder to test in Python.
  - **OpenCV**: heavier dependency oriented at computer vision; overkill for a fixed-grid crop and its default BGR/color handling is error-prone for simple asset slicing.

## Decision: Fixed grid geometry, no auto-detection

- **Decision**: Assume a strict 4x4 grid over a 1024x1024 image → each tile is exactly 256x256 with no gutters/margins.
- **Rationale**: Confirmed visually against `assets/sprite_sheets/space.png`. Matches the spec's Assumptions. Keeps the tool deterministic and simple; grid size and tile size are derived (`tile = image_size / grid`).
- **Alternatives considered**: Automatic cell/contour detection — unnecessary complexity and failure risk given the guaranteed uniform grid.

## Decision: Output layout and naming

- **Decision**: Write outputs to `assets/cards/<sheet-name>/card_01.png` … `card_16.png`, one subfolder per source sheet (`<sheet-name>` = source filename without extension).
- **Rationale**: Satisfies FR-005 (grid position unambiguous via reading-order index) and FR-006 (outputs grouped per sheet). Zero-padded index keeps files sorted correctly. Reading order is left-to-right, top-to-bottom (`index = row * 4 + col + 1`).
- **Alternatives considered**: `space_r0_c0.png` style names — more explicit but noisier; the ordinal index is sufficient and maps 1:1 to grid position. Flat single folder — rejected, would mix themes (violates FR-006).

## Decision: Validation & error handling

- **Decision**: Before slicing, verify the image is exactly 1024x1024. If not, print a clear message naming the file and skip it (batch mode continues with other files). Non-image files are ignored. Missing input path → clear error, no partial output.
- **Rationale**: Satisfies FR-007 and the edge cases in the spec. Skipping (not aborting) in batch mode maximizes useful output while surfacing problems.
- **Alternatives considered**: Auto-resizing off-size inputs to 1024x1024 — rejected, would silently distort assets (violates FR-004).

## Decision: Idempotent overwrite + PNG output

- **Decision**: Always write PNG output, overwriting any existing files for the same sheet on re-run.
- **Rationale**: PNG preserves transparency (FR-009); overwrite makes re-runs predictable/idempotent (spec Assumptions).
- **Alternatives considered**: Skip-if-exists — could leave stale tiles after a sheet is updated; rejected.

## Decision: CLI interface

- **Decision**: A CLI supporting (a) a single input file, (b) a whole input directory (default `assets/sprite_sheets/`), with optional `--output`, `--grid` (default 4), and `--force`.
- **Rationale**: Satisfies FR-008 (batch) while allowing single-file runs for the independent test of User Story 1. Defaults make the common case zero-config.
- **Alternatives considered**: Config file — unnecessary for so few options.
