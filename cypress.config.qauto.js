const { defineConfig } = require("cypress");
const baseConfig = require("./cypress.config");

module.exports = defineConfig({
    ...baseConfig,

    e2e: {
        baseUrl: 'https://guest:welcome2qauto@qauto.forstudy.space/',
        env: {
            userEmail: 'testmaxvs@mail.com',
            userPassword: 'Great123!'
        },
    },
});