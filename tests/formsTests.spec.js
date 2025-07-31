const { faker } = require('@faker-js/faker');
const { Builder, By, Key, until } = require('selenium-webdriver');

const assert = require('assert');
const { styleText } = require('util');
const select = require('selenium-webdriver').Select;

describe('Live Registration Form', () => {
  it('Should fill in the form correctly and submit it', async () => {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
      await driver.get('https://hmarkets.com/live-account-pre-registration/');

      // Get rid of the cookie consent banner
      const cookieButton = await driver.findElement(
        By.id('onetrust-accept-btn-handler')
      );
      await cookieButton.click();
      // Wait a moment for the overlay to disappear
      await driver.sleep(500);

      // Fill in First Name
      await driver
        .findElement(By.name('first_name'))
        .sendKeys(faker.person.firstName());

      // Fill in Last Name
      await driver
        .findElement(By.name('last_name'))
        .sendKeys(faker.person.lastName());

      // Fill in Email
      await driver
        .findElement(By.name('email'))
        .sendKeys(faker.internet.email());

      // Select Country
      const countrySelectElement = await driver.findElement(By.name('country'));
      const countrySelect = new select(countrySelectElement);
      await countrySelect.selectByVisibleText('United Arab Emirates');

      // Fill in Phone Number
      await driver
        .findElement(By.css('[id^="country-selector-MazPhoneNumberInput-"]'))
        .click();

      // Generate a UAE phone number without country code, starting with '415'
      let rawPhone = faker.number.int({ min: 1111111, max: 9999999 });
      let localPhone = '415' + rawPhone;

      // Fill in the phone number input
      await driver
        .findElement(By.css('[id^="MazPhoneNumberInput-"]'))
        .sendKeys(localPhone);

      console.log(localPhone);

      // Test if password check works
      // Fill in incorrect Password
      await driver
        .findElement(
          By.css(
            'input[placeholder="Enter your password"][type="password"][name="password"]'
          )
        )
        .sendKeys(faker.internet.password({ length: 6, memorable: true }));
      // Assert that the "At least one number" requirement is not yet satisfied
      const atLeastOneNumberLi = await driver.findElement(
        By.xpath(
          "//li[contains(@class, 'text-black') and contains(., 'At least one number')]"
        )
      );
      const isAtLeastOneNumberDisplayed =
        await atLeastOneNumberLi.isDisplayed();
      if (!isAtLeastOneNumberDisplayed) {
        throw new Error('"At least one number" requirement is not visible');
      }

      // Now type a proper password that satisfies all requirements
      const specialChars = '~!@#$%^&*[?+';
      const getRandom = (chars) =>
        chars[Math.floor(Math.random() * chars.length)];
      const schars = getRandom(specialChars);
      const newPassword = faker.internet.password({
        length: 12,
        pattern: /[a-zA-Z0-9]/,
      });
      let correctPassword = newPassword
        .split('')
        .sort(() => 0.5 - Math.random())
        .join('');

      const properPassword = schars + correctPassword;

      const passwordInput = await driver.findElement(
        By.css(
          'input[placeholder="Enter your password"][type="password"][name="password"]'
        )
      );
      await passwordInput.clear();
      await passwordInput.sendKeys(properPassword);

      console.log(properPassword);

      // Wait for all 5 requirements to be satisfied (li.text-[#0FB2A5])
      await driver.wait(
        async () => {
          const greenLis = await driver.findElements(
            By.css('li[class*="#0FB2A5"]')
          );
          return greenLis.length === 5;
        },
        5000,
        'Did not find 5 green requirement items after entering a valid password'
      );

      // Click the checkbox using normal Selenium click (no JavaScript)
      const checkbox = await driver.findElement(
        By.css('div.flex.items-center input[type="checkbox"]')
      );
      await checkbox.click();
      await driver.sleep(500);

      // Submit the form
      await driver;
      const submitButton = await driver.findElement(
        By.css('button.button.bg-hantec-primary[type="submit"]')
      );
      await submitButton.click();

      // Wait for redirection
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
