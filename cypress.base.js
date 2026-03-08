module.exports = {
    reporter: 'mochawesome',
    reporterOptions: {
        reportDir: 'cypress/reports/mocha',
        overwrite: false,
        html: false,
        json: true,
    },
    e2e: {
        specPattern: 'cypress/e2e/**/*.cy.js',
        supportFile: 'cypress/support/e2e.js',
        setupNodeEvents(on, config) {
            console.log("\x1b[32m%s\x1b[0m", `--- RUNNING ON: ${config.baseUrl} ---`);
            return config;
        },
    },
};