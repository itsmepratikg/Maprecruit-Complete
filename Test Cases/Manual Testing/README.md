# Manual Testing Scenarios

## Overview
Manual testing focuses on verifying the application from an end-user perspective, ensuring the UI/UX flows are intuitive and bug-free.

## Test Scenarios

### 1. Authentication & Access
| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| MT-01 | Login Page Load | Open Application URL | Login page displayed with credentials input | High |
| MT-02 | Login Success | Enter valid Username/Password -> Click Login | Redirect to Dashboard | High |
| MT-03 | Login Failure | Enter invalid credentials | Show error message "Invalid credentials" | Medium |

### 2. Campaign Dashboard Navigation
| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| MT-04 | Open Campaign | Click on a Campaign Card on Home | Navigate to Campaign Dashboard | High |
| MT-05 | Tab Switching | Click "engage ai", "Source AI" tabs | Content area updates without page reload | High |
| MT-06 | Scroll Behavior | Scroll down the dashboard | Header shrinks/sticks (if implemented) | Low |

### 3. Profile Management
| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| MT-07 | Create Profile Modal | Click "Create Profile" in sidebar | Modal opens with "Upload Resume" and "Manual Entry" tabs | Medium |
| MT-08 | Close Modal | Click "X" or "Cancel" | Modal closes | Medium |
| MT-09 | Submit Profile | Fill Manual Form -> Click Create | Success toast appears, modal closes | High |
| MT-10 | Upload Workflow | Upload file -> Review Auto-filled Data | Data populates in Manual tab after parse simulation | High |

### 4. Interactive Elements
| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| MT-10 | Map Hover | Hover over Map Widget pins | Tooltip shows location details | Low |
| MT-11 | Node Hover | Hover over Workflow Nodes | "Edit" button appears on card | Medium |
