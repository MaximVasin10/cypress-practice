class Header {

    get signInButton() { return cy.get('.header_signin'); }
    get guestLogInLink() { return cy.get('.header-link').contains('guest log in', { matchCase: false }); }
}

export default new Header();