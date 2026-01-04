# Unit Testing Plan

## Overview
Unit tests verify that individual components and functions work as expected in isolation.

## Components to Test

### 1. Dashboard Components
- **`App.jsx`** (Sidebar Logic)
  - [ ] Verify `Sidebar` renders correct items.
  - [ ] Test `NavItem` click updates state.
  - [ ] Test `SubNavItem` expansion.
- **`DashboardWidgets.jsx`**
  - [ ] `StatsCard`: Verify props (`title`, `value`, `trend`) render correctly.
  - [ ] `RecentActivity`: Test list rendering and empty state.
  - [ ] `TasksList`: Test checkbox interaction (mock handler).

### 2. Campaign Dashboard (`pages/CampaignDashboard.jsx`)
- **`CampaignDashboard` Header**
  - [ ] Verify Campaign Title and ID display.
  - [ ] Verify Tab navigation updates view state.
- **Widgets**
  - [ ] `PanelMembersWidget`: Check member list rendering.
  - [ ] `RemindersWidget`: Check reminder items.
  - [ ] `ActivitiesWidget`: Check timeline rendering.

### 3. Engage Workflow (`components/EngageWorkflow.jsx`)
- **`WorkflowBuilder`**
  - [ ] Verify initial nodes render.
  - [ ] Test Zoom In/Out state changes.
- **`NodeCard`** (in `CanvasNodes.jsx`)
  - [ ] Verify props (`data`, `label`) display.
  - [ ] Test "Edit" button click event.

### 4. Engage Views (`components/engage/Views.jsx`)
- **`CandidateTracking`**
  - [ ] Verify Candidate List renders from data.
  - [ ] Test "No candidates found" fallback.
  - [ ] Test clicking a candidate updates detail view.
- **`InterviewRoom`**
  - [ ] Verify Video placeholder renders.
  - [ ] Test Control buttons (Mute, Camera) toggle state.

## Helper Functions (`data.js`)
- [ ] Verify `ACTIVE_CAMPAIGNS` export is an array.
- [ ] Verify `Stats` calculation logic (if extracted).
