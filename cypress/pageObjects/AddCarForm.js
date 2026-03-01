import { CAR_DATA } from '../support/testData/carData';

class AddCarForm {

    get brandSelect() { return cy.get('#addCarBrand'); }
    get modelSelect() { return cy.get('#addCarModel'); }
    get mileageInput() { return cy.get('#addCarMileage'); }
    get addButton() { return cy.get('.modal-footer .btn-primary'); }
    get submitButton() { return cy.get('.modal-content .btn-primary').contains('add', { matchCase: false }); }

    addCar() {
        this.brandSelect.select(CAR_DATA.brand);
        this.modelSelect.select(CAR_DATA.model);
        this.mileageInput.type(CAR_DATA.milleage);
        this.submitButton.click();
    }

}

export default new AddCarForm();