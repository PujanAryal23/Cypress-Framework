class LoginPage{
    username = 'input[name="username"]';
    password = 'input[name="password"]';
    loginButton = 'button.orangehrm-login-button';

    userLogin() {
        cy.get(this.username).click().type(Cypress.env('username'));
        cy.get(this.password).click().type(Cypress.env('password'));
        cy.get(this.loginButton).click();
    }
}

export default new LoginPage();