# Test Plan: Hantec Markets Forms Automation with Selenium JavaScript

## 1. Introduction

This document outlines the test plan for automating the testing of key registration forms on the [https://hmarkets.com](https://hmarkets.com) website using Selenium WebDriver with JavaScript. The primary goal is to ensure the forms function correctly, handle valid and invalid inputs appropriately, and provide a seamless user experience.

## 2. Test Objectives

- Verify successful submission of the **Live Registration Form** with valid data.
- Verify successful submission of the **Demo Registration Form** (both MT4 and MT5 variants) with valid data.
- Validate input mechanisms for appropriate error messages or rejections.
- Confirm correct navigation and success messages/redirections after submissions.
- Identify critical defects or usability issues in form submission processes.

## 3. Types of Testing

### Functional Testing

- Ensure form fields accept and process valid inputs.
- Verify dropdowns (e.g., leverage, deposit, country) function correctly.
- Confirm successful form submissions.

### Negative Testing

- Test with invalid data (e.g., empty fields, bad passwords, whitespace-only names).
- Confirm proper validation messages are shown and submissions blocked.

### Regression Testing

- Automated tests ensure future code changes don’t break existing functionality.

### UI/UX Testing (Automated Checks)

- Verify visibility of UI elements (e.g., cookie banners, password messages).
- Ensure interactive elements are clickable and responsive.

## 4. Test Cases and Expected Results

### 4.1 Live Registration Form Tests

**URL:** [https://hmarkets.com/live-account-pre-registration/](https://hmarkets.com/live-account-pre-registration/)

| Test Case ID | Description                                   | Test Steps Summary                                                                         | Expected Result                                                       |
| ------------ | --------------------------------------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| **LRT-001**  | Verify Empty Form Submission                  | Submit form with all fields empty.                                                         | Show required field messages (at least 3 with `text-hantec-primary`). |
| **LRT-002**  | Password Validation (Invalid → Valid)         | Submit with invalid password, verify unmet criteria. Then enter valid password and submit. | Criteria should turn green; form submits with success message.        |
| **LRT-003**  | Successful Live Account Registration          | Fill all fields with valid data, agree to terms, and submit.                               | Form submits successfully with success message.                       |
| **LRT-004**  | Reject Invalid Characters and Length in Names | Use whitespace, special characters, and long strings in first/last name.                   | Form should not submit; show validation messages.                     |

### 4.2 Demo Registration Form Tests

**URL:** [https://hmarkets.com/mt-demo-account/](https://hmarkets.com/mt-demo-account/)

| Test Case ID | Description                 | Test Steps Summary                                                                                    | Expected Result                                |
| ------------ | --------------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| **DRT-001**  | Invalid MT4 First Name      | Enter whitespace, special characters, and long strings in first name. Submit with other valid fields. | Submission rejected; validation message shown. |
| **DRT-002**  | Successful MT5 Registration | Select MT5 tab, enter valid data, agree to terms, and submit.                                         | Success message displayed.                     |

## 5. Coverage Approach

To ensure comprehensive coverage:

- **Form Identification**: Live and Demo Registration forms selected.
- **Field Coverage**: All required fields have positive and negative test cases. Optional fields covered in positive cases.
- **Dropdowns**: All tested for correct selection behavior.
- **Validation**: Client- and server-side checks covered.
- **Success/Error Flows**: Both outcomes tested for every form.
- **Cookie Banner Handling**: Cookie dismiss automated to avoid interference.
- **Password Validation**: Ensures complexity rules are checked.
- **Data Generation**: Uses `faker-js` for unique, realistic test inputs.
- **Modular Design**: Test logic organized in `formCommands.js`, `formData.js`, `passwordUtils.js`, and `selectors.js` for reusability.

---

This test plan provides a solid foundation for automating the functional and negative testing of the HMarkets registration forms.
