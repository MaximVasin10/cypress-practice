class ProfilePage {

    get profileName() {
        return cy.get('.profile_name');
    }

    get editProfileButton() {
        return cy.get('.btn-primary').contains('Edit profile');
    }

    get profilePhoto() {
        return cy.get('.profile_photo');
    }
}

export default new ProfilePage();