class SideBarComponent {

    get garageLink() { return cy.get('nav.sidebar a[href*="garage"]'); }
    get expensesLink() { return cy.get('nav.sidebar a[href*="expenses"]'); }
    get instructionsLink() { return cy.get('nav.sidebar a[href*="instructions"]'); }
    get profileLink() { return cy.get('nav.sidebar a[href*="profile"]'); }
    get settingsLink() { return cy.get('nav.sidebar a[href*="settings"]'); }
    get logoutButton() { return cy.get('nav.sidebar .icon-logout').parent(); }
}

export default new SideBarComponent();