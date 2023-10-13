/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject = any> {
        loginToApplication(): Chainable<any>;
        navigateToAPage(pageName:string): Chainable<any>;
        logOut(): Chainable<any>;
    }
  }