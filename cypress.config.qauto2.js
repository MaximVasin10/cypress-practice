const { defineConfig } = require("cypress");
const baseConfig = require("./cypress.config");

module.exports = defineConfig({
    ...baseConfig,

    e2e: {
        baseUrl: 'https://guest:welcome2qauto@qauto2.forstudy.space/',
        env: {
            userEmail: 'testmaxvs2@mail.com',
            userPassword: 'Great123!'
        },
    },
});