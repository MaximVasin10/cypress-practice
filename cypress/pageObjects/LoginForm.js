class LoginForm {

    get emailInput() { return cy.get('#signinEmail'); }
    get passwordInput() { return cy.get('#signinPassword'); }

    get rememberMeCheckbox() { return cy.get('#remember'); }

    get loginButton() { return cy.get('.modal-footer button.btn-primary').contains('Login', { matchCase: false }); }
    get forgotPasswordButton() { return cy.get('.btn-link').contains('Forgot password', { matchCase: false }); }
    get registrationButton() { return cy.get('.modal-footer .btn-link').contains('Registration', { matchCase: false }); }

    get modalTitle() { return cy.get('.modal-title'); }
    get closeButton() { return cy.get('button.close'); }
}

export default new LoginForm();