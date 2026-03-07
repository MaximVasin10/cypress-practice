import header from '../../pageObjects/Header';
import homepage from '../../pageObjects/Homepage';
import loginForm from '../../pageObjects/LoginForm';
import registrationForm from '../../pageObjects/RegistrationForm';

import { VALIDATION_MESSAGES, USER_DATA } from '../../support/testData/registrationData';

describe('Registration: basic checks', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('Opening the registration form from the main page', () => {
    homepage.signUpButton.click();
    registrationForm.modalTitle.should('be.visible').and('have.text', 'Registration');
  });

  it('Opening the registration form from the login form', () => {
    header.signInButton.click();
    loginForm.registrationButton.click();
    registrationForm.modalTitle.should('be.visible').and('have.text', 'Registration');
  });

  it('Observe registration form', () => {
    homepage.signUpButton.click();
    registrationForm.modalTitle.should('be.visible');
    registrationForm.nameInput.should('be.visible');
    registrationForm.lastNameInput.should('be.visible');
    registrationForm.emailInput.should('be.visible');
    registrationForm.passwordInput.should('be.visible');
    registrationForm.repeatPasswordInput.should('be.visible');
    registrationForm.closeButton.should('be.visible');
    registrationForm.registerButton.should('be.visible');
  });

  it('Close registration form by "X" button', () => {
    homepage.signUpButton.click();
    registrationForm.closeButton.click();
    registrationForm.modalContent.should('not.exist');
  });

  context('Empty fields validation', () => {

    // Array of all input fields to check
    const validationData = [
      { field: 'nameInput', label: 'Name' },
      { field: 'lastNameInput', label: 'Last name' },
      { field: 'emailInput', label: 'Email' },
      { field: 'passwordInput', label: 'Password' },
      { field: 'repeatPasswordInput', label: 'Re-enter password' }
    ];

    beforeEach(() => {
      homepage.signUpButton.click();
    });

    validationData.forEach((data) => {
      it(`${data.label} field should show validation message if it's empty`, () => { //tests are failed due to bug on the site ('[field] incorrect' instead of '[field] is incorrect')
        const inputField = registrationForm[data.field];
        inputField.focus().blur(); // Click on field and then click away to trigger validation

        inputField.siblings('label').then(($label) => {
          const labelText = $label.text().trim();
          registrationForm.errorMessage
            .should('be.visible')
            .and('have.text', `${labelText} is required`);
        });

        registrationForm.registerButton.should('be.disabled');
      });
    });
  });
});

describe('Registration: Validation of Name and Surname fields', () => {

  beforeEach(() => {
    cy.visit('/');
    homepage.signUpButton.click();
  });

  const testData = [
    { label: 'Less than 2 symbols', value: 'a', valid: false },
    { label: '2 symbols', value: 'aa', valid: true },
    { label: '20 symbols', value: 'a'.repeat(20), valid: true },
    { label: '21 symbols', value: 'a'.repeat(21), valid: false },
    { label: 'Numbers in name', value: 'Ivan5', valid: false },
    { label: 'Symbol in name', value: 'Ivan%', valid: false },
    { label: 'Space inside', value: 'Ivan Ivan', valid: false },
  ];

  const fieldsToTest = [
    { name: 'Name', getElement: () => registrationForm.nameInput },
    { name: 'Last name', getElement: () => registrationForm.lastNameInput }
  ];

  fieldsToTest.forEach((field) => {

    context(`Validation for: ${field.name}`, () => {

      testData.forEach((data) => {
        it(`Check ${field.name}: ${data.label}`, () => {
          const input = field.getElement();

          input.type(data.value).blur();

          if (data.valid) {
            input.should('not.have.class', 'is-invalid');
          } else {
            input.should('have.class', 'is-invalid');
            registrationForm.errorMessage.should('be.visible');
          }
        });
      });
    });
  });
});

describe('Registration: Email field validation', () => {

  beforeEach(() => {
    cy.visit('/');
    homepage.signUpButton.click();
  });

  const emailTestData = [
    // Positive
    { label: 'valid mail', value: 'test@test.com', valid: true },
    { label: 'only number before @', value: '12345@test.com', valid: true },
    { label: 'text+numbers', value: 'test123@test.com', valid: true },
    { label: 'double dot after @', value: 'test@test.co.uk', valid: true },

    // Negative
    { label: 'without @', value: 'testtest.com', valid: false },
    { label: 'without domain', value: 'max@', valid: false },
    { label: 'without name', value: '@gmail.com', valid: false },
    { label: 'dot at the start', value: '.test@gmail.com', valid: false },
    { label: 'dot at the end', value: 'test.@gmail.co.', valid: false },
    { label: 'space inside the input', value: 'test @gmail.com', valid: false },
    { label: 'spec symbols before @', value: 'te#!st@gmail.com', valid: false }, //test is failed. Need to discuss the requirements
    { label: 'spec symbols after @', value: 'test@gm!ail.com', valid: false },
  ];

  emailTestData.forEach((data) => {
    it(`Check Email: ${data.label}`, () => {

      registrationForm.emailInput.type(data.value).blur();

      if (data.valid) {
        registrationForm.emailInput.should('not.have.class', 'is-invalid');
      } else {
        registrationForm.emailInput.should('have.class', 'is-invalid');

        registrationForm.registerButton.should('be.disabled');

        registrationForm.errorMessage
          .should('be.visible')
          .and('have.text', 'Email is incorrect');
      }
    });
  });
});

describe('Registration: Password field validation', () => {

  beforeEach(() => {
    cy.visit('/');
    homepage.signUpButton.click();
  });

  const passwordTestData = [
    // Positive&boundaries
    { label: '8 symbols', value: 'Passwor1', valid: true },
    { label: '10 symbols', value: 'Password12', valid: true },
    { label: '15 symbols', value: 'P'.repeat(13) + '1p', valid: true },
    { label: 'with Spec symbols', value: 'Pass123!', valid: true },
    { label: 'without Spec symbols', value: 'Pass1234', valid: true },

    // Space cases
    { label: 'with space inside', value: 'Pass word1', valid: true },
    { label: 'with space at the start', value: ' Passwor1', valid: true },
    { label: 'with space at the end', value: 'Passwor1 ', valid: true },

    // Negative
    { label: '7 symbols (too short)', value: 'Passw1', valid: false },
    { label: '16 symbols (too long)', value: 'P'.repeat(15) + '1', valid: false },
    { label: 'without Capital letter', value: 'password123', valid: false },
    { label: 'without small letter', value: 'PASSWORD123', valid: false },
    { label: 'without Number', value: 'Password!', valid: false },
  ];

  it('Password should be hidden (input type="password")', () => {
    registrationForm.passwordInput.should('have.attr', 'type', 'password');
  });

  passwordTestData.forEach((data) => {
    it(`Check Password: ${data.label}`, () => {
      registrationForm.passwordInput.type(data.value, { sensitive: true }).blur();

      if (data.valid) {
        registrationForm.passwordInput.should('not.have.class', 'is-invalid');
      } else {
        registrationForm.passwordInput.should('have.class', 'is-invalid');
        registrationForm.errorMessage
          .should('be.visible')
          .and('have.text', VALIDATION_MESSAGES.passwordValidationError);

        registrationForm.registerButton.should('be.disabled');
      }
    });
  });
});

describe('Registration: Re-enter password validation', () => {
  beforeEach(() => {
    cy.visit('/');
    homepage.signUpButton.click();
    registrationForm.passwordInput.type(USER_DATA.password, { sensitive: true });
  });

  it('Should show error if passwords are different', () => {
    registrationForm.repeatPasswordInput.type('Different123').blur();

    registrationForm.repeatPasswordInput.should('have.class', 'is-invalid');
    registrationForm.errorMessage.should('have.text', VALIDATION_MESSAGES.passwordMatchError);
    registrationForm.registerButton.should('be.disabled');
  });

  it('Should show error if cases are different (one letter in different case)', () => {
    registrationForm.passwordInput.type('g'); //adding letter in lower case to password field

    registrationForm.repeatPasswordInput.type(USER_DATA.password + 'G', { sensitive: true }).blur(); //adding letter in upper case to password field

    registrationForm.errorMessage.should('have.text', VALIDATION_MESSAGES.passwordMatchError);
  });

  it('Should show error if there is a space at the start/end', () => {
    registrationForm.repeatPasswordInput.type(` ${USER_DATA.password}`, { sensitive: true }).blur();

    registrationForm.errorMessage.should('have.text', VALIDATION_MESSAGES.passwordMatchError);
  });

  it('Should be valid if passwords are identical', () => {
    registrationForm.repeatPasswordInput.type(USER_DATA.password, { sensitive: true }).blur();

    registrationForm.repeatPasswordInput.should('not.have.class', 'is-invalid');
  });
});

describe('Registration: Verify Succesfull registration & user already exists cases', () => {

  beforeEach(() => {
    cy.visit('/');
    homepage.signUpButton.click();
  });

  it('Should register a new user successfully', () => {
    const uniqueEmail = USER_DATA.getUniqueEmail();

    registrationForm.nameInput.type(USER_DATA.firstName);
    registrationForm.lastNameInput.type(USER_DATA.lastName);
    registrationForm.emailInput.type(uniqueEmail);
    registrationForm.passwordInput.type(USER_DATA.validPassword, { sensitive: true });
    registrationForm.repeatPasswordInput.type(USER_DATA.validPassword, { sensitive: true });

    registrationForm.registerButton.should('not.be.disabled').click();

    registrationForm.registrationCompleteMessage.should('be.visible');
  });

  it('Should show error when user already exists', () => {
    registrationForm.nameInput.type(USER_DATA.firstName);
    registrationForm.lastNameInput.type(USER_DATA.lastName);
    registrationForm.emailInput.type(USER_DATA.staticEmail);
    registrationForm.passwordInput.type(USER_DATA.validPassword, { sensitive: true });
    registrationForm.repeatPasswordInput.type(USER_DATA.validPassword, { sensitive: true });

    registrationForm.registerButton.click();

    registrationForm.userAlreadyExistErrorMessage.should('be.visible');
  });
});