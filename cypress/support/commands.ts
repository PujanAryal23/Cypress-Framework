import LoginPage from "../page-objects/LoginPage";

Cypress.Commands.add("loginToApplication", () => {
  cy.intercept('GET','/web/index.php/api/v2/dashboard/*').as('getDashboard')
  cy.visit("/web/index.php/auth/login");
  LoginPage.userLogin();
  cy.wait('@getDashboard')
  cy.log("Logged Into Application");
});

Cypress.Commands.add("navigateToAPage", (pageName:string) => {
  cy.get('span.oxd-main-menu-item--name').contains(pageName).click();
});


Cypress.Commands.add("logOut", () => {
  cy.get('i.oxd-userdropdown-icon').click();
  cy.get('a[role="menuitem"]').contains('Logout').click();
  cy.log("Logged Out Of Application");
});