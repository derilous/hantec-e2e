const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const select = require('selenium-webdriver').Select;
const {
  dismissCookieBanner,
  fillRegistrationForm,
  submitForm,
  setValidPasswordAndWait,
} = require('../utils/formCommands');

const { generateUserData } = require('../utils/formData');
const {
  generateInvalidPassword,
  generateValidPassword,
} = require('../utils/passwordUtils');
const selectors = require('../utils/selectors');
const { sleep } = require('../utils/helpers');
const { waitForDebugger } = require('inspector');

describe('Live Registration Form Tests', () => {
  it('Should not fill the form and try submitting it', async () => {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
      await driver.get('https://hmarkets.com/live-account-pre-registration/');

      // Get rid of the cookie consent banner
      await dismissCookieBanner(driver, selectors, sleep);

      // Try to submit an empty form
      await submitForm(driver, selectors, sleep);
      await sleep(1000);

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
      await dismissCookieBanner(driver, selectors, sleep);

      const user = generateUserData();

      // Fill first and last name, email, country & phone
      await fillRegistrationForm(driver, selectors, user);

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
      const validPassword = await setValidPasswordAndWait(
        driver,
        selectors,
        generateValidPassword
      );

      await submitForm(driver, selectors);

      await driver.wait(
        until.urlIs('https://portal-mu.hmarkets.com/en/#docs'),
        10000
      );
      console.log('Form submitted successfully!');

      // PS. Would be good to have an API call to
      // 1. Check user is created, for quicker assertions.
      // 2. User can be deleted, since we risk potentially flooding the live DB with fake users every time the tests run
    } catch (error) {
      console.error('Test failed:', error);
      throw error;
    } finally {
      await driver.quit();
    }
  });
});

describe('Demo Registration Form Tests', () => {
  it('Should reject the form submission due to whitespace only in First Name', async () => {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
      await driver.get('https://hmarkets.com/mt-demo-account/');

      // Get rid of the cookie consent banner
      await dismissCookieBanner(driver, selectors, sleep);

      const user = generateUserData();

      // Select the leverage dropdown and choose an option
      const leverageSelectElement = await driver.findElement(
        By.name('leverage')
      );
      await leverageSelectElement.click();
      const leverageOption = await driver.findElement(
        By.css('select[name="leverage"] option[value="1:200"]')
      );
      await leverageOption.click();

      // Select the deposit dropdown and choose an option
      const depositSelectElement = await driver.findElement(By.name('deposit'));
      await depositSelectElement.click();
      const depositOption = await driver.findElement(
        By.css('select[name="deposit"] option[value="3000"]')
      );
      await depositOption.click();

      // Fill first and last name, email, country & phone, then submit
      user.firstName = '          ';
      await fillRegistrationForm(driver, selectors, user);

      await sleep(1000);

      await submitForm(driver, selectors, sleep);

      await sleep(3000);

      // Scroll down a little bit to ensure the element is in view
      const btnElement = await driver.findElement(selectors.submitButton);
      await driver.executeScript(
        'arguments[0].scrollIntoView({behavior: "smooth", block: "center"});',
        btnElement
      );
      await sleep(1000);

      // Ensure the success message is NOT visible after form submission
      const successMessageElements = await driver.findElements(
        By.xpath("//*[contains(text(), 'Your submission was successful.')]")
      );
      assert(
        successMessageElements.length === 0,
        'Success message should not be visible, but it was found.'
      );
    } catch (error) {
      console.error('Test failed:', error);
      throw error;
    } finally {
      await driver.quit();
    }
  });

  it('Should be able to submit the form with correct input', async () => {
    const driver = await new Builder().forBrowser('chrome').build();
    try {
      await driver.get('https://hmarkets.com/mt-demo-account/');

      // Get rid of the cookie consent banner
      await dismissCookieBanner(driver, selectors, sleep);

      const user = generateUserData();

      // Select the leverage dropdown and choose an option
      const leverageSelectElement = await driver.findElement(
        By.name('leverage')
      );
      await leverageSelectElement.click();
      const leverageOption = await driver.findElement(
        By.css('select[name="leverage"] option[value="1:200"]')
      );
      await leverageOption.click();

      // Select the deposit dropdown and choose an option
      const depositSelectElement = await driver.findElement(By.name('deposit'));
      await depositSelectElement.click();
      const depositOption = await driver.findElement(
        By.css('select[name="deposit"] option[value="3000"]')
      );
      await depositOption.click();
      // Fill first and last name, email, country & phone, then submit
      await fillRegistrationForm(driver, selectors, user);

      await submitForm(driver, selectors, sleep);

      await sleep(3000);

      // Scroll down a little bit to ensure the element is in view
      const btnElement = await driver.findElement(selectors.submitButton);
      await driver.executeScript(
        'arguments[0].scrollIntoView({behavior: "smooth", block: "center"});',
        btnElement
      );
      await sleep(1000);

      // Ensure the success message is visible after form submission
      await driver.wait(
        async () => {
          const elements = await driver.findElements(
            By.xpath("//*[contains(text(), 'Your submission was successful.')]")
          );
          return elements.length > 0 && (await elements[0].isDisplayed());
        },
        5000,
        'Success message did not appear within 5 seconds'
      );

      const successMessageElements = await driver.findElements(
        By.xpath("//*[contains(text(), 'Your submission was successful.')]")
      );
      assert(successMessageElements.length > 0, 'Success message not found');
    } catch (error) {
      console.error('Test failed:', error);
      throw error;
    } finally {
      await driver.quit();
    }
  });
});
