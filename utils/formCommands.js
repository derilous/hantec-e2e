// Dismiss the cookie consent banner
async function dismissCookieBanner(driver, selectors, sleep) {
  await driver.wait(
    require('selenium-webdriver').until.elementIsVisible(
      await driver.findElement(selectors.cookieButton)
    ),
    5000,
    'Cookie consent button not visible after 5s'
  );
  await driver.findElement(selectors.cookieButton).click();
  if (sleep) await sleep(500);
}

// Find the first available element from an array of selectors
async function findFirstAvailableElement(driver, selectors) {
  for (const selector of selectors) {
    const elements = await driver.findElements(selector);
    if (elements.length > 0) {
      return elements[0];
    }
  }
  throw new Error('No matching element found for provided selectors');
}

// Fill the registration form fields for real form
async function fillRegistrationForm(driver, selectors, user) {
  const firstNameInput = await findFirstAvailableElement(
    driver,
    selectors.firstNameInputs
  );
  await firstNameInput.sendKeys(user.firstName);

  await driver.sleep(500);

  const lastNameInput = await findFirstAvailableElement(
    driver,
    selectors.lastNameInputs
  );
  await lastNameInput.sendKeys(user.lastName);

  await driver.sleep(500);

  await driver.findElement(selectors.emailInput).sendKeys(user.email);

  await driver.sleep(500);

  const countrySelectElement = await driver.findElement(
    selectors.countrySelect
  );
  const select = require('selenium-webdriver').Select;
  const countrySelect = new select(countrySelectElement);
  await countrySelect.selectByVisibleText('United Arab Emirates');

  await driver.sleep(500);

  await driver.findElement(selectors.phoneInputWrapper).click();

  await driver.sleep(500);

  await driver
    .findElement(selectors.phoneInputWrapper)
    .sendKeys('America', require('selenium-webdriver').Key.ENTER);
  // Try entering the phone number, and if "Invalid phone number" appears, try a new one
  const { By, until } = require('selenium-webdriver');
  let attempts = 0;
  let maxAttempts = 3;
  let phoneValid = false;
  const generateUserData = require('./formData').generateUserData;

  while (!phoneValid && attempts < maxAttempts) {
    await driver.findElement(selectors.phoneInput).click();
    await driver.findElement(selectors.phoneInput).clear();
    await driver.sleep(500);
    await driver.findElement(selectors.phoneInput).sendKeys(user.phone);

    // Wait a short moment for validation to appear
    await driver.sleep(500);

    // Check for the "Invalid phone number" message
    const invalidPhoneElements = await driver.findElements(
      By.xpath(
        '//span[contains(@class, "text-hantec-primary") and contains(text(), "Invalid phone number")]'
      )
    );
    if (invalidPhoneElements.length === 0) {
      phoneValid = true;
    } else {
      // If invalid, get a new phone number and try again
      attempts++;
      if (attempts < maxAttempts) {
        const newUser = generateUserData();
        user.phone = newUser.phone;
      } else {
        throw new Error(
          'Failed to enter a valid phone number after multiple attempts'
        );
      }
    }
  }
}

// // Fill the registration form fields for demo form
// async function fillDemoRegistrationForm(driver, selectors, user) {
//   await driver.findElement(selectors.firstNameInput).sendKeys(user.firstName);
//   await driver.findElement(selectors.lastNameInput).sendKeys(user.lastName);
//   await driver.findElement(selectors.emailInput).sendKeys(user.email);

//   const countrySelectElement = await driver.findElement(
//     selectors.countrySelect
//   );
//   const select = require('selenium-webdriver').Select;
//   const countrySelect = new select(countrySelectElement);
//   await countrySelect.selectByVisibleText('United Arab Emirates');

//   await driver.findElement(selectors.phoneInputWrapper).click();
//   await driver.findElement(selectors.phoneInput).sendKeys(user.phone);
// }

// Submit the form
async function submitForm(driver, selectors, sleep) {
  await driver.findElement(selectors.checkbox).click();
  if (sleep) await sleep(500);
  await driver.findElement(selectors.submitButton).click();
}

// Set a valid password and wait for all password criteria to be satisfied
async function setValidPasswordAndWait(
  driver,
  selectors,
  generateValidPassword
) {
  const validPassword = generateValidPassword();
  await driver.findElement(selectors.passwordInput).clear();
  await driver.findElement(selectors.passwordInput).sendKeys(validPassword);

  await driver.wait(
    async () =>
      (await driver.findElements(selectors.greenRequirements)).length === 5,
    5000,
    'Not all password criteria satisfied'
  );
  return validPassword;
}

module.exports = {
  dismissCookieBanner,
  findFirstAvailableElement,
  fillRegistrationForm,
  // fillDemoRegistrationForm,
  submitForm,
  setValidPasswordAndWait,
};
