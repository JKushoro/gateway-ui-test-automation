### 1. Bug Title: Booking link scrolls past Check Availability section and overlaps date pickers
### Steps to Reproduce:
- Go to the homepage.
- Click the Booking link in the top navigation bar.

### Expected Result:
- Page should scroll to the “Check Availability & Book Your Stay” section clearly, with date fields fully visible and accessible.

### Actual Result:
- The page scrolls too far, partially hiding the “Check Availability & Book Your Stay” section under the navigation bar. The date picker fields are obscured, and users have to manually scroll up to see them.

### Impact:
- Poor user experience – key booking input fields are hidden and may be missed.
---

### 2. Bug Title: Amenities link in top navigation is not responsive on desktop
### Steps to Reproduce:
- Open the site on a desktop browser.
- Click the Amenities link in the top navigation bar.

### Expected Result:
- The page should smoothly scroll to the Amenities section.

### Actual Result:
- Clicking the Amenities link does not scroll to the correct section or behaves inconsistently.

### Impact:
- Users may get confused or think the link is broken, affecting navigation flow.
---

### 3. Bug Title: Logout button appears on login screen when user is not logged in
### Steps to Reproduce:
- Navigate to the /admin login page.
- Observe the top-right corner of the navigation bar.

### Expected Result:
- Only Login or relevant options should be shown if the user is not authenticated.

### Actual Result:
- The Logout button is displayed even though the user is not logged in.

### Impact:
- This can confuse users and suggests incorrect session handling or visibility control in the UI.
---

### 4. Bug Title: Only one generic error message shown for incorrect login entry
### Steps to Reproduce:
- Go to the /admin login page.
- Enter an invalid username or password.
- Click the Login button.

### Expected Result:
- The system should display a specific error message indicating which field is incorrect (e.g., "Invalid username" or "Incorrect password").

### Actual Result:
- A generic message — “Invalid credentials” — is shown regardless of whether the username, password, or both are incorrect.

### Impact:
- Reduces usability and makes it harder for users to know which credential is incorrect.
---

### 5. 🐞 Accessibility Bug Report
Bug Title: Missing labels on form inputs across multiple pages (Critical Accessibility Violation)

### Summary:
Automated accessibility tests using Axe (via axe-playwright) revealed critical violations due to missing form labels on the 
Homepage, Contact Page, and Login Page. These issues affect screen reader navigation and compliance with WCAG 2.1 guidelines.

### Affected Pages:
- Homepage
- Contact Page
- Login Page

### Violations Detected:
| ID    | Impact   | Description                           | Affected Nodes |
| ----- | -------- | ------------------------------------- | -------------- |
| label | Critical | Ensure every form element has a label | 3              |


### Sample Affected Elements:
- <input class="form-control" type="text" value="13/07/2025"> (Check-in/out inputs)
- <textarea id="description"> (Contact form)
- Username and password fields (Login screen)

### Steps to Reproduce:
- Run npx playwright test on accessibility.spec.ts
- Observe test output for label rule violation
- Confirm violation locations via DOM inspection or dev tools

### Expected Result:
All form inputs and textareas should be associated with <label for="..."> elements or 
use ARIA labels to support assistive technologies.

### Actual Result:
Several form fields lack labels, resulting in label rule violations flagged by Axe.

### Impact:
- Fails WCAG 2.1 Level A compliance (Form elements must have accessible names)
- Impairs usability for screen reader users
- Reduces overall accessibility of the site



