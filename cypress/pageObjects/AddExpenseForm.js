import { EXPENSE_DATA } from '../support/testData/carData';
import { CAR_DATA } from '../support/testData/carData';

class AddExpenseForm {

    get vehicleSelect() { return cy.get('#addExpenseCar'); }
    get dateInput() { return cy.get('#addExpenseDate'); }
    get mileageInput() { return cy.get('#addExpenseMileage'); }
    get litersInput() { return cy.get('#addExpenseLiters'); }
    get totalCostInput() { return cy.get('#addExpenseTotalCost'); }
    get addButton() { return cy.get('.modal-footer .btn-primary'); }

    fillExpenseForSelectedCar() {
        this.mileageInput.clear().type(EXPENSE_DATA.mileage);
        this.litersInput.clear().type(EXPENSE_DATA.liters);
        this.totalCostInput.clear().type(EXPENSE_DATA.cost);
        this.addButton.should('not.be.disabled').click();
    }

}

export default new AddExpenseForm();