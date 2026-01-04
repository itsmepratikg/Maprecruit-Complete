# System Testing Plan

## Overview
System tests validate the complete and integrated software product.

## End-to-End Flows

### 1. User Journey: Campaign Management
1. **Login** (Mock) -> Dashboard.
2. **Select Campaign**: Click on "Warehouse Associate".
3. **Verify Dashboard**: Check Widgets and Stats.
4. **Navigate**: Go to "Engage AI".
5. **Action**: Open "Workflow Builder".
6. **Modify**: Toggle a Node setting.
7. **View**: Switch to "Candidate List".
8. **Detail**: Click Candidate "Sarah".
9. **Return**: Click "Back to List".

### 2. User Journey: Profile Management
1. **Sidebar**: Click "Create Profile".
2. **Modal**: Verify "Create Profile" modal opens.
3. **Input**: Fill details (Mock).
4. **Submit**: Click Save (verify console log/mock success).
5. **Navigate**: Go to "Profiles" page.

### 3. Responsive Check
- **Mobile View (375px)**
  - Sidebar should generally collapse or hide (if implemented).
  - Dashboard widgets should stack vertically.
- **Tablet View (768px)**
  - Grid layouts should adjust (2 cols vs 3 cols).

### 4. Cross-Browser
- Verify functional parity on Chrome, Firefox, Edge.
