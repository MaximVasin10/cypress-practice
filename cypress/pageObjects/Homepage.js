class Homepage {

    get signUpButton() { return cy.get('.btn-primary').contains('sign up', { matchCase: false }); }

}

export default new Homepage();