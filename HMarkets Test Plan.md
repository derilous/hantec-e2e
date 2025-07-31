# Test Plan: HMarkets Forms Automation with Selenium JavaScript

## 1. Introduction

This document outlines the test plan for automating the testing of key registration forms on the [https://hmarkets.com](https://hmarkets.com) website using Selenium WebDriver with JavaScript. The primary goal is to ensure the forms function correctly, handle valid and invalid inputs appropriately, and provide a seamless user experience.

## 2. Test Objectives

- Verify successful submission of the **Live Registration Form** with valid data.
- Verify successful submission of the **Demo Registration Form** (MT4 and MT5 variants) with valid data.
- Validate form input mechanisms, ensuring appropriate error messages or rejections for invalid data.
- Confirm correct navigation and success messages/redirections after submissions.
- Identify any critical defects or usability issues within form submission processes.

## 3. Types of Testing

### Functional Testing

- Verify all form fields accept and process valid inputs.
- Confirm dropdowns (e.g., leverage, deposit, country) work as expected.
- Ensure form submission completes successfully, leading to expected outcomes.

### Negative Testing

- Test fields with invalid data (e.g., empty required fields, incorrect passwords, whitespace-only input).
- Ensure system correctly rejects invalid submissions and shows validation messages.

### Regression Testing

- While not a dedicated phase initially, tests will be re-runnable to catch regressions from future changes.

### UI/UX Testing (Automated Checks)

- Verify presence and visibility of UI elements (cookie banner, password rules, success messages).
- Check interactivity of buttons, dropdowns, etc.

## 4. Test Cases and Expected Results

### 📋 4.1 Live Registration Form Tests

**URL:** [https://hmarkets.com/live-account-pre-registration/](https://hmarkets.com/live-account-pre-registration/)

| Test Case ID | Description                              | Test Steps                                                                                                                                                                                                                                                                                                                                                                                                                                   | Expected Result                                                                                                                                                                    |
|--------------|------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **LRT-001**  | Verify Empty Form Submission             | 1. Navigate to the form URL  <br> 2. Dismiss the cookie banner  <br> 3. Click **Submit** without filling any fields                                                                                                           | All required fields show validation messages. At least 3 elements with class `text-hantec-primary` containing the word "required" should be visible.                              |
| **LRT-002**  | Verify Password Validation (Invalid → Valid) | 1. Navigate to the form URL  <br> 2. Dismiss cookie banner  <br> 3. Fill all required fields with valid data  <br> 4. Enter an invalid password (e.g., no special char, too short)  <br> 5. Check that password requirement indicators are **not green**  <br> 6. Enter a valid password meeting all criteria  <br> 7. Verify indicators **turn green**  <br> 8. Click **Submit** | All password rules should initially be unmet. After correction, all indicators turn green. Form submits with "Your submission was successful." message. |
| **LRT-003**  | Verify Successful Live Account Registration | 1. Navigate to the form URL  <br> 2. Dismiss cookie banner  <br> 3. Select a deposit option  <br> 4. Fill all required fields with valid, unique data  <br> 5. Enter a valid password  <br> 6. Agree to terms  <br> 7. Click **Submit**                                                                                                                                                            | Form should submit successfully. A prominent success message, "Your submission was successful." should appear.                               |

**URL:** [https://hmarkets.com/live-account-pre-registration/](https://hmarkets.com/live-account-pre-registration/)

#### LRT-001: Verify Empty Form Submission

- **Preconditions:** None  
- **Steps:**
  1. Navigate to form URL.
  2. Dismiss cookie banner.
  3. Click "Submit" with all fields empty.
- **Expected Result:** All required fields should show validation messages. At least 3 elements with class `text-hantec-primary` and text containing "required" should be visible.

#### LRT-002: Verify Password Validation (Invalid then Valid)

- **Preconditions:** None  
- **Steps:**
  1. Navigate to form URL.
  2. Dismiss cookie banner.
  3. Fill all required fields with valid data.
  4. Enter an invalid password.
  5. Verify password rules are unmet (not green).
  6. Clear field and enter a valid password.
  7. Confirm all 5 password rule indicators turn green.
  8. Click "Submit".
- **Expected Result:** Initially unmet password criteria become fulfilled (green). Form should submit with "Your submission was successful." message.

#### LRT-003: Verify Successful Live Account Registration

- **Preconditions:** None  
- **Steps:**
  1. Navigate to form URL.
  2. Dismiss cookie banner.
  3. Select a deposit option.
  4. Fill in valid, unique data.
  5. Set a valid password.
  6. Agree to terms.
  7. Click "Submit".
- **Expected Result:** Form should submit successfully with a clear success message.

### 4.2 Demo Registration Form Tests

**URL:** [https://hmarkets.com/mt-demo-account/](https://hmarkets.com/mt-demo-account/)

#### DRT-001: MT4 Form Submission with Invalid First Name

- **Preconditions:** None  
- **Steps:**
  1. Navigate to form URL.
  2. Dismiss cookie banner.
  3. Select "MT4" tab.
  4. Enter whitespace as "First Name".
  5. Fill other fields with valid data.
  6. Agree to terms.
  7. Click "Submit".
- **Expected Result:** Submission rejected with an error for the "First Name". No success message shown.

#### DRT-002: Successful MT5 Account Registration

- **Preconditions:** None  
- **Steps:**
  1. Navigate to form URL.
  2. Dismiss cookie banner.
  3. Select "MT5" tab.
  4. Fill in valid, unique data.
  5. Agree to terms.
  6. Click "Submit".
- **Expected Result:** Form submits successfully and shows a confirmation message.

## 5. Coverage Approach

To ensure comprehensive test coverage:

- **Form Identification:** Target Live and Demo Registration Forms.
- **Field Coverage:** Each required input field covered by positive and negative tests.
- **Dropdown Coverage:** All select elements tested.
- **Validation:** Client- and server-side validations implicitly tested through input variation.
- **Success/Error Handling:** Each test validates correct feedback or navigation.
- **Cookie Handling:** Banner dismissal is automated to avoid interference.
- **Password Checks:** Password criteria are thoroughly validated.
- **Data Generation:** Uses `faker-js` to create unique, realistic data each run.
- **Modular Test Design:** Reusable modules (`formCommands.js`, `formData.js`, `passwordUtils.js`, `selectors.js`) enhance scalability and maintainability.

---

This test plan forms the foundation for automated functional and negative testing of the HMarkets registration forms.
