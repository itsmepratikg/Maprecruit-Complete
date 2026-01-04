# Feature Test Log: Profile Creation (Advanced Modal)

**Feature:** Advanced Create Profile Modal (Upload/Manual)
**Component:** `CreateProfileModal`
**Page:** `App.jsx`
**Date:** 2026-01-04
**Type:** Feature Update

## Changes
Updated functionality from Basic Modal to Advanced Upload/Manual Modal.
- Added "Upload Resume" tab with Drag & Drop UI.
- Added "Manual Entry" tab with detailed form.
- Implemented simulated file parsing logic.
- Implemented tab switching logic.

## Test Cases

### 1. UI/UX Verification
| ID | Scenario | Steps | Expected Result | Status |
|----|----------|-------|-----------------|--------|
| T-UI-01 | Default View | Open "Create Profile" modal | Modal opens. "Upload Resume" tab is active. Drag & Drop area is visible. | [ ] |
| T-UI-02 | Tab Switching | Click "Manual Entry" tab | View switches to Form. "Manual Entry" tab underlined. | [ ] |
| T-UI-03 | Drag State | Drag file over drop zone | Drop zone border turns emerald/green. Background changes. | [ ] |

### 2. Functional Scenarios
| ID | Scenario | Steps | Expected Result | Status |
|----|----------|-------|-----------------|--------|
| T-FUNC-01 | Simulated Parsing | Drop a file or click "Browse" (simulated) | Loader appears ("Parsing..."). After 2s, switches to Manual tab with auto-filled data ("Alex Morgan"). Success toast appears. | [ ] |
| T-FUNC-02 | Manual Form Submit | Fill required fields (Name, Email) -> Click "Create Profile" | Modal closes. Success toast appears "Profile created for...". | [ ] |
| T-FUNC-03 | Skip Upload | Click "Skip Upload" in Upload tab | Switches to Manual tab instantly. | [ ] |
| T-FUNC-04 | Cancel Action | Click "Cancel" in either tab | Modal closes. No toast. | [ ] |

### 3. Edge Cases
| ID | Scenario | Steps | Expected Result | Status |
|----|----------|-------|-----------------|--------|
| T-EDGE-01 | Rapid Tab Switch | Click tabs quickly back and forth | State updates correctly without flickering or stuck state. | [ ] |
| T-EDGE-02 | Close during Upload | Click "X" or "Cancel" while "Parsing..." is showing | Modal closes immediately. | [ ] |
