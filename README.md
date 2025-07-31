# Selenium JavaScript Form Testing

This project contains automated tests for the HMarkets website's registration forms using Selenium WebDriver with JavaScript. The tests are designed to simulate real user behavior, validate form inputs, and verify successful submissions.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [How to Run Tests](#how-to-run-tests)
- [Test Plan Summary](#test-plan-summary)
- [Potential Improvements](#potential-improvements)

---

## Prerequisites

Before running these tests, ensure you have the following installed:

- **Node.js**: [Download & Install Node.js](https://nodejs.org/) (includes `npm`)
- **Java Development Kit (JDK)**: Required for Selenium WebDriver. [Download & Install JDK](https://www.oracle.com/java/technologies/javase-downloads.html)
- **Chrome Browser**: The tests are configured to run on Chrome.
- **ChromeDriver**: Selenium requires a WebDriver executable. The `selenium-webdriver` package often handles this automatically, but if needed, [manually download ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver/) and add it to your system's PATH.

---

## Installation

1. Clone the repository (if applicable) or create your project directory.
2. Navigate to your project root in the terminal.
3. Install project dependencies:

```bash
npm i
```

This will install all dependencies listed in your `package.json` file. Ensure the following are included:

- `selenium-webdriver`
- `mocha`
- `chai`
- `@faker-js/faker`

---

## Project Structure

Your project should be structured like this:

```
.
├── tests/
│   └── formsTests.spec.js
└── utils/
    ├── formCommands.js
    ├── formData.js
    ├── helpers.js
    ├── passwordUtils.js
    └── selectors.js
├── package.json
├── package-lock.json
└── README.md
```

- **`tests/formsTests.spec.js`**: Main test suites and cases for forms.
- **`utils/`**: Directory for helper functions and data.
  - `formCommands.js`: Reusable functions for interacting with forms (e.g., dismissing cookie banners, submitting).
  - `formData.js`: Generates realistic user data for testing.
  - `helpers.js`: Utility functions like `sleep`.
  - `passwordUtils.js`: Functions for generating valid/invalid passwords.
  - `selectors.js`: Centralized location for all CSS selectors and XPath expressions.

---

## How to Run Tests

To run the tests:

1. Navigate to the tests directory:

```bash
cd tests
```

2. Run the tests:

```bash
npm test
```

Ensure your `package.json` includes a test script, e.g.:

```package.json
{
  "name": "selenium-form-tests",
  "version": "1.0.0",
  "description": "Automated form testing for HMarkets using Selenium and JavaScript.",
  "main": "index.js",
  "scripts": {
    "test": "npx mocha tests/**/*.spec.js --timeout 90000"
  },
  "dependencies": {
    "@faker-js/faker": "^8.4.1",
    "chai": "^5.1.1",
    "mocha": "^10.4.0",
    "selenium-webdriver": "^4.22.0"
  }
}
```

- `--timeout 90000`: Sets the test timeout to 90 seconds to accommodate network or page load delays.

---

## Test Plan Summary

This suite focuses on **functional and negative testing** for the following forms on [hmarkets.com](https://hmarkets.com):

### Forms Tested

- **Live Registration Form**:  
  [https://hmarkets.com/live-account-pre-registration/](https://hmarkets.com/live-account-pre-registration/)
- **Demo Registration Form** (MT4 & MT5):  
  [https://hmarkets.com/mt-demo-account/](https://hmarkets.com/mt-demo-account/)

### Key Test Scenarios

#### Live Registration Form

- Submitting an empty form to verify required field validations.
- Submitting with valid data, including:
  - Password validation:
    - Test invalid passwords
    - Then test valid ones

#### Demo Registration Form

- MT4: Submit form with invalid input (e.g., whitespace in first name) to verify rejection.
- MT5: Successfully submit form with valid data.

> For a detailed breakdown, refer to the `Test Plan.md` document.

---

## Potential Improvements

- **API Integration for User Management**  
  Integrate API calls to verify user creation and enable user deletion. This will improve test speed and prevent database clutter.

- **Cross-Browser Testing**  
  Extend the test suite to Firefox, Edge, and Safari using Selenium Grid or platforms like **BrowserStack** or **Sauce Labs**.

- **Expanded Negative Testing**  
  Add more edge case scenarios:

  - Invalid email formats
  - Mismatched phone numbers and country codes
  - Special characters in names

- **Performance Testing**  
  Measure form submission times under different conditions.

- **Dynamic Waits**  
  Replace `sleep()` with explicit `until` conditions to improve test robustness and speed.
