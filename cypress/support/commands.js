import loginForm from '../pageObjects/LoginForm';
import header from '../pageObjects/Header';

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
    if (options && options.sensitive) {
        // turn off original log
        options.log = false
        // create our own log with masked message
        Cypress.log({
            $el: element,
            name: 'type',
            message: '*'.repeat(text.length),
        })
    }

    return originalFn(element, text, options)
})

Cypress.Commands.add('login', () => {
    header.signInButton.click();

    loginForm.emailInput.type(Cypress.env('userEmail'));
    loginForm.passwordInput.type(Cypress.env('userPassword'), { sensitive: true });
    loginForm.loginButton.click();

    // add waiter for tests stability
    cy.url().should('include', '/panel/garage');
});

Cypress.Commands.add('loginViaApi', () => {
    cy.request({
        method: 'POST',
        url: '/api/auth/signin',
        body: {
            email: Cypress.env('userEmail'),
            password: Cypress.env('userPassword'),
            remember: false
        }
    }).then((response) => {
        expect(response.status).to.eq(200);
    });
});


Cypress.Commands.add('cleanupCars', () => {
    cy.request('GET', '/api/cars').then((response) => {
        if (response.body.data && response.body.data.length > 0) {
            response.body.data.forEach((car) => {
                cy.request('DELETE', `/api/cars/${car.id}`);
            });
        }
    });
});