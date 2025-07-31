const { Builder, until } = require('selenium-webdriver');
const assert = require('assert');
const select = require('selenium-webdriver').Select;

const { generateUserData } = require('../utils/formData');
const {
  generateInvalidPassword,
  generateValidPassword,
} = require('../utils/passwordUtils');
const selectors = require('../utils/selectors');
const { sleep } = require('../utils/helpers');

describe('Live Registration Form Tests', () => {
  it('Should not fill the form and submit it', async () => {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
      await driver.get('https://hmarkets.com/live-account-pre-registration/');

      // Get rid of the cookie consent banner
      await driver.findElement(selectors.cookieButton).click();
      await sleep(500);

      await driver.findElement(selectors.submitButton).click();
      // Assert that at least 3 elements with class 'text-hantec-primary' and text containing 'required' using xpath
      const requiredElements = await driver.findElements(
        require('selenium-webdriver').By.xpath(
          "//*[contains(@class, 'text-hantec-primary') and contains(translate(text(), 'REQUIRED', 'required'), 'required')]"
        )
      );
      assert(
        requiredElements.length >= 3,
        `Expected at least 3 elements with class 'text-hantec-primary' and text containing 'required', but found ${requiredElements.length}`
      );
    } catch (error) {
      console.error('Test failed:', error);
      throw error;
    } finally {
      await driver.quit();
    }
  });

  it('Should fill in the form correctly and submit it', async () => {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
      await driver.get('https://hmarkets.com/live-account-pre-registration/');

      // Get rid of the cookie consent banner
      await driver.findElement(selectors.cookieButton).click();
      await sleep(500);

      const user = generateUserData();

      // Fill first and last name, email, and country
      await driver
        .findElement(selectors.firstNameInput)
        .sendKeys(user.firstName);
      await driver.findElement(selectors.lastNameInput).sendKeys(user.lastName);
      await driver.findElement(selectors.emailInput).sendKeys(user.email);

      const countrySelectElement = await driver.findElement(
        selectors.countrySelect
      );
      const countrySelect = new select(countrySelectElement);
      await countrySelect.selectByVisibleText('United Arab Emirates');

      await driver.findElement(selectors.phoneInputWrapper).click();
      await driver.findElement(selectors.phoneInput).sendKeys(user.phone);

      // Invalid password test
      await driver
        .findElement(selectors.passwordInput)
        .sendKeys(generateInvalidPassword());

      const numberReq = await driver.findElement(
        selectors.passwordNumberRequirement
      );
      assert(
        await numberReq.isDisplayed(),
        '"At least one number" requirement not visible'
      );

      // Valid password
      const validPassword = generateValidPassword();
      await driver.findElement(selectors.passwordInput).clear();
      await driver.findElement(selectors.passwordInput).sendKeys(validPassword);

      await driver.wait(
        async () =>
          (await driver.findElements(selectors.greenRequirements)).length === 5,
        5000,
        'Not all password criteria satisfied'
      );

      await driver.findElement(selectors.checkbox).click();
      await sleep(500);

      await driver.findElement(selectors.submitButton).click();

      await driver.wait(
        until.urlIs('https://portal-mu.hmarkets.com/en/#docs'),
        10000
      );
      console.log('Form submitted successfully!');
    } catch (error) {
      console.error('Test failed:', error);
      throw error;
    } finally {
      await driver.quit();
    }
  });
});
