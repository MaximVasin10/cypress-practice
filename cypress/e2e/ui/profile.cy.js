import header from '../../pageObjects/Header';
import profilePage from '../../pageObjects/ProfilePage';
import sidebar from '../../pageObjects/SideBarComponent';

it('should display mocked user name "Polar Bear" via intercept', () => {
    cy.visit('/');
    cy.login();

    cy.intercept('GET', '**/api/users/profile', {
        body: {
            status: "ok",
            data: {
                userId: 3,
                photoFilename: "default-user.png",
                name: "Polar",
                lastName: "Bear"
            }
        }
    }).as('getProfile');

    sidebar.profileLink.click();

    cy.wait('@getProfile');

    profilePage.profileName.should('have.text', 'Polar Bear');
});