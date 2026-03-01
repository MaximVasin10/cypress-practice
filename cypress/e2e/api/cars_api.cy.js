import { CAR_DATA } from '../../support/testData/carData';

describe('Cars API Tests', () => {
    let carId;

    beforeEach(() => {
        cy.loginViaApi();
    });

    it('should create a new car', () => {
        cy.request('POST', '/api/cars', {
            carBrandId: CAR_DATA.carBrandId,
            carModelId: CAR_DATA.carModelId,
            mileage: CAR_DATA.milleage
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.status).to.eq('ok');
            expect(response.body.data.brand).to.eq(CAR_DATA.brandName);

            carId = response.body.data.id;
        });
    });

    it('should get current user cars', () => {
        cy.request('GET', '/api/cars').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data).to.be.an('array');
            expect(response.body.data.some(car => car.id === carId)).to.be.true;
        });
    });

    it('should update car mileage', () => {
        cy.request('PUT', `/api/cars/${carId}`, {
            carBrandId: CAR_DATA.carBrandId,
            carModelId: CAR_DATA.carModelId,
            mileage: 55555
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.mileage).to.eq(55555);
        });
    });

    it('should get car model by id', () => {
        cy.request('GET', `/api/cars/models/${CAR_DATA.carModelId}`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.title).to.eq(CAR_DATA.modelName);
        });
    });

    it('should delete the car', () => {
        cy.request('DELETE', `/api/cars/${carId}`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.carId).to.eq(carId);
        });
    });


    after(() => {
        cy.cleanupCars();
    });

});