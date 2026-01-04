# Non-Functional Testing Scenarios

## Overview
Non-functional testing checks the "quality attributes" of the system, such as performance, usability, and security.

## Categories

### 1. Performance Testing
- **NFT-01: Load Time**
  - **Metric:** Dashboard should load within 2 seconds.
  - **Test:** Clear cache, reload `/campaign/1`, measure Time to Interactive (TTI).
- **NFT-02: Rendering Large Lists**
  - **Metric:** Candidate list scrolling should remain at 60fps.
  - **Test:** Mock 100+ candidates in `MOCK_CANDIDATES_CAMPAIGN` and scroll rapidly.
- **NFT-03: Modal Animation**
  - **Metric:** Modals should open/close smoothly without jank.
  - **Test:** Rapidly toggle "Create Profile" modal.

### 2. Usability Testing
- **NFT-04: Font Clarity**
  - **Check:** Text contrast ratio should meet WCAG AA standards (especially gray text on gray, currently slate-500).
- **NFT-05: Touch targets**
  - **Check:** Buttons (like "Edit" on nodes) should be at least 44x44px clickable area on mobile.
- **NFT-06: Error Messages**
  - **Check:** "No candidates found" message should be friendly and helpful, not a crash or blank space.

### 3. Security Testing
- **NFT-07: URL Parameter Manipulation**
  - **Test:** Change URL ID to non-existent ID (e.g., `/campaign/9999`).
  - **Expected:** "Campaign Not Found" page, no undefined errors or stack traces exposed.
- **NFT-08: XSS in Inputs**
  - **Test:** Enter `<script>alert(1)</script>` in "Create Profile" name field.
  - **Expected:** Input is sanitized or React escapes it; script does not execute.

### 4. Compatibility
- **NFT-09: Window Resizing**
  - **Test:** Resize window from distinct breakpoints (1920 -> 1366 -> 1024 -> 768 -> 375).
  - **Expected:** Layout adjusts cleanly via Tailwind classes (flex-col -> flex-row).
