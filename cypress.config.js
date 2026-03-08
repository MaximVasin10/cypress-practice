const { defineConfig } = require("cypress");
const base = require("./cypress.base");

module.exports = defineConfig({
  ...base,
  e2e: {
    ...base.e2e,
    baseUrl: 'https://guest:welcome2qauto@qauto.forstudy.space',
    env: {
      userEmail: 'testmaxvs@mail.com',
      userPassword: 'Great123!',
      envName: 'QAuto 1'
    },
  },
});