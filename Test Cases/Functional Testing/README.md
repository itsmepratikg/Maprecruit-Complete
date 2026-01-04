# Functional Testing Scenarios

## Overview
Functional testing validates that the software system validates against the functional requirements/specifications.

## Features to Test

### 1. Campaign Workflow Builder
**Requirement:** Users must be able to visualize and edit the recruitment workflow.
- **TC-F01:** Verify that the default workflow (`INITIAL_NODES`) loads correctly on the canvas.
- **TC-F02:** Verify that "Zoom In" increases the scale of the canvas nodes.
- **TC-F03:** Verify that "Zoom Out" decreases the scale of the canvas nodes.
- **TC-F04:** Verify that clicking "Edit" on a Node opens the `NodeConfigurationModal`.
- **TC-F05:** Verify that changes made in the modal (e.g., updating description) are reflected (mock) or logged.

### 2. Candidate Tracking (Engage AI)
**Requirement:** Users can view a list of candidates and their status in the simplified pipeline.
- **TC-F06:** Verify that the candidate list renders distinct items from `MOCK_CANDIDATES_CAMPAIGN`.
- **TC-F07:** Verify that clicking a candidate selects them and highlights the row.
- **TC-F08:** Verify that the detailed view shows the correct candidate Name and Avatar.
- **TC-F09:** Verify that the status pipeline (steps) renders the correct state (Completed/Active/Locked) based on `steps` logic (currently mock).

### 3. Intelligence Dashboard
**Requirement:** Provide high-level metrics and activity logs.
- **TC-F10:** Verify that `KPIMetricsWidget` calculates/displays totals correctly (Total Candidates, Active, etc.).
- **TC-F11:** Verify that `ActivitiesWidget` filters or groups activities by date (Today, Yesterday, etc.).

### 4. Search Functionality
**Requirement:** Global search bar allows filtering.
- **TC-F12:** Verify typing in the main "Looking for..." search bar updates the state (mock search).
- **TC-F13:** Verify "Recent Searches" chips are clickable and populate the search field.
