import { EXPENSE_DATA } from '../support/testData/carData';

class ExpensePage {

    get addExpenseButton() { return cy.get('button.btn-primary').contains('Add an expense'); }
    get carSelectDropdown() { return cy.get('#carSelectDropdown'); }
    get firstRow() { return cy.get('tbody tr').first(); }

    verifyLastExpense() {
        this.firstRow.within(() => {
            //cy.get('td').eq(0).should('have.text', EXPENSE_DATA.date);
            cy.get('td').eq(1).should('have.text', EXPENSE_DATA.mileage.toString());
            cy.get('td').eq(2).should('contain', `${EXPENSE_DATA.liters}L`);
            cy.get('td').eq(3).should('contain', `${EXPENSE_DATA.cost}.00 USD`);
        });
    }

}

export default new ExpensePage();