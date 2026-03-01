import '../../support/commands';
import header from '../../pageObjects/Header';
import garagePage from '../../pageObjects/GaragePage';
import addCarForm from '../../pageObjects/AddCarForm';
import addExpenseForm from '../../pageObjects/AddExpenseForm';
import expensePage from '../../pageObjects/ExpensePage'
import { after } from 'mocha';

describe('Garage: add a car', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login();
  });

  it('should allow user to add a car to the garage', () => {

    garagePage.addCarButton.click();

    addCarForm.addCar();

    garagePage.carLogoImage.should('be.visible');
    garagePage.carName.should('be.visible');
    garagePage.carMileageInput.should('be.visible');
  });


  after(() => {
    cy.cleanupCars();
  });

});

describe('Garage: add a fuel expense for a newly created car', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login();
  });

  it('should allow user to add a fuel expense to the newly created car', () => {

    garagePage.addCarButton.click();

    addCarForm.addCar();

    garagePage.addFuelExpenseButton.click();

    addExpenseForm.fillExpenseForSelectedCar();

    expensePage.verifyLastExpense();


  });


  after(() => {
    cy.cleanupCars();
  });

});