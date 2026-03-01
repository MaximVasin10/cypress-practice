class GaragePage {

    get addCarButton() { return cy.get('.btn-primary').contains('add car', { matchCase: false }); }
    get addFuelExpenseButton() { return cy.get('button.car_add-expense'); }
    get carLogoImage() { return cy.get('img.car-logo_img'); }
    get carName() { return cy.get('.car-group .car_name'); }
    get carMileageInput() { return cy.get('input.update-mileage-form_input'); }

}

export default new GaragePage();