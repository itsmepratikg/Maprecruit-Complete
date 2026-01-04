# Exhaustive Testing Scenarios

## Overview
Exhaustive testing checks extreme edge cases, invalid inputs, and stressful conditions to ensure total robustness.

## Edge Cases

### 1. Data Extremes
- **ET-01: Zero Candidates**
  - **Scenario:** Campaign has 0 candidates.
  - **Expected:** "No candidates found" message. No crashes in `CandidateTracking.jsx`.
- **ET-02: Massive Name Length**
  - **Scenario:** Candidate Name is 500 characters.
  - **Expected:** UI truncates with ellipsis (...) or wraps, does not break layout.
- **ET-03: Null Fields**
  - **Scenario:** `candidate.contact` is null (not just empty object).
  - **Expected:** Detail view handles extraction safely (`candidate?.contact?.email || 'N/A'`).

### 2. Workflow Complexity
- **ET-04: Max Nodes**
  - **Scenario:** Add 50 nodes to the workflow builder.
  - **Expected:** Canvas remains performant; panning works; JSON structure valid.
- **ET-05: Cyclic Connections**
  - **Scenario:** Node A -> Node B -> Node A.
  - **Expected:** Valid or handled (if cycles allowed), otherwise prevent connection creation.

### 3. User Input
- **ET-06: Rapid Clicking**
  - **Scenario:** Click "Save" button 20 times in 1 second.
  - **Expected:** Only 1 request sent (debounced/disabled on click) or handled gracefully.
- **ET-07: Invalid Dates**
  - **Scenario:** Enter "Feb 30" in any date picker.
  - **Expected:** Input validation rejects date or defaults to valid date.

### 4. Application State during Errors
- **ET-08: Network Failure**
  - **Scenario:** Disconnect network, click "Save".
  - **Expected:** "Network Error" toast; App does not freeze.
- **ET-09: Local Storage Full**
  - **Scenario:** Fill LocalStorage, try to save settings.
  - **Expected:** Graceful failure notification (if LS is used for persistence).
