const { defineConfig } = require("cypress");
const base = require("./cypress.base");

module.exports = defineConfig({
    ...base,
    e2e: {
        ...base.e2e,
        baseUrl: 'https://guest:welcome2qauto@qauto2.forstudy.space',
        env: {
            userEmail: 'testmaxvs2@mail.com',
            userPassword: 'Great123!',
            envName: 'QAuto 2'
        },
    },
});