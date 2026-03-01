class RegistrationForm {

    get modalContent() { return cy.get('.modal-content'); }

    get modalTitle() { return cy.contains('.modal-title', 'Registration'); }

    get nameInput() { return cy.get('#signupName'); }
    get lastNameInput() { return cy.get('#signupLastName'); }
    get emailInput() { return cy.get('#signupEmail'); }
    get passwordInput() { return cy.get('#signupPassword'); }
    get repeatPasswordInput() { return cy.get('#signupRepeatPassword'); }

    get registerButton() { return cy.get('.btn-primary').contains('register', { matchCase: false }); }
    get closeButton() { return cy.get('button.close'); }
    get modalTitle() { return cy.get('.modal-title'); }

    get errorMessage() { return cy.get('.invalid-feedback'); }

    get userAlreadyExistErrorMessage() { return cy.get('.alert-danger').contains('user already exists', { matchCase: false }); }
    get registrationCompleteMessage() { return cy.get('.alert-success').contains('registration complete', { matchCase: false }); }
}

export default new RegistrationForm();