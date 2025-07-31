const { By } = require('selenium-webdriver');

// Storing selector values here for easy access
module.exports = {
  cookieButton: By.id('onetrust-accept-btn-handler'),
  firstNameInputs: [By.name('first_name'), By.name('firstName')],
  lastNameInputs: [By.name('last_name'), By.name('lastName')],
  emailInput: By.name('email'),
  countrySelect: By.name('country'),
  phoneInputWrapper: By.css('[id^="country-selector-MazPhoneNumberInput-"]'),
  phoneInput: By.css('[id^="MazPhoneNumberInput-"]'),
  passwordInput: By.css(
    'input[placeholder="Enter your password"][type="password"][name="password"]'
  ),
  checkbox: By.css('div.flex.items-center input[type="checkbox"]'),
  submitButton: By.css('button.button.bg-hantec-primary[type="submit"]'),
  passwordNumberRequirement: By.xpath(
    "//li[contains(@class, 'text-black') and contains(., 'At least one number')]"
  ),
  greenRequirements: By.css('li[class*="#0FB2A5"]'),
};
