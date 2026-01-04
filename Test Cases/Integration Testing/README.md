# Integration Testing Plan

## Overview
Integration tests verify that different modules or services work well together.

## Scenarios

### 1. Navigation & Routing
- **Routes -> Components**
  - [ ] Verify `/campaign/:id` loads `CampaignDashboard` with correct ID.
  - [ ] Verify clicking Sidebar "Campaigns" navigates to Campaign List.
  - [ ] Verify "Create Profile" modal opens from Sidebar button.

### 2. Dashboard Integration
- **Sidebar <-> Dashboard View**
  - [ ] Verify selecting "Engage AI" in Sidebar switches `CampaignDashboard` view.
  - [ ] Verify selecting "Candidate List" sub-item renders `CandidateTracking` component within `EngageWorkflow`.

### 3. Data Flow
- **`data.js` -> Components**
  - [ ] Verify `GLOBAL_CAMPAIGNS` correctly populates `CampaignDashboard`.
  - [ ] Verify `MOCK_CANDIDATES_CAMPAIGN` correctly populates `CandidateTracking`.
  - [ ] Verify `PANEL_MEMBERS` correctly populates `PanelView`.

### 4. Workflow Canvas Interactions
- **Nodes <-> Config Modals**
  - [ ] Click Node -> Open `NodeConfigurationModal`.
  - [ ] Save Modal -> Verify Node data updates (mock update).
