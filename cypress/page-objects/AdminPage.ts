class AdminPage{
    usernameTextBox = ':nth-child(2)>input.oxd-input';
    userRoleDropdown = ':nth-child(2) > .oxd-input-group > :nth-child(2)';
    statusDropdown = ':nth-child(4) > .oxd-input-group > :nth-child(2)';
    option = 'div[role="option"]>span';
    searchButton = 'button[type="submit"]';
    table = '.oxd-table';
    tableRow = '.oxd-table-body>.oxd-table-card>.oxd-table-row';
    tableHeaders = `[role="columnheader"]:nth-of-type(columnNumber)`;
    expectedData = `[role="cell"]:nth-of-type(columnNumber)`;
    
    //CSS Selectors For Add
    addButton = 'div.orangehrm-header-container>button';
    addUserRoleDropdown = 'div.oxd-form-row:nth-of-type(1) div.oxd-grid-item:nth-of-type(1) .oxd-select-text-input';
    addEmployeeNameTextBox = 'div.oxd-form-row:nth-of-type(1) div.oxd-grid-item:nth-of-type(2) input';
    addStatusDropDown = 'div.oxd-form-row:nth-of-type(1) div.oxd-grid-item:nth-of-type(3) .oxd-select-text-input';
    addUsernameTextBox = 'div.oxd-form-row:nth-of-type(1) div.oxd-grid-item:nth-of-type(4) input';
    passwordTextBox = 'div.oxd-form-row:nth-of-type(2) div.oxd-grid-item:nth-of-type(1) input';
    confirmPasswordTextbox = 'div.oxd-form-row:nth-of-type(2) div.oxd-grid-item:nth-of-type(2) input';
    savebutton = 'div.oxd-form-actions>button[type="submit"]';

    //CSS Selectors For Delete
    deleteButton = '.bi-trash';
    confirmYes = '.oxd-button>i.bi-trash';

    enterUserName(name:string) {
        cy.get(this.usernameTextBox).click().type(name);
    }

    selectUserRole(role: string) {
        cy.get(this.userRoleDropdown).click();
        cy.get(this.option).contains(role).click();
    }

    selectStatus(status:string) {
        cy.get(this.statusDropdown).click();
        cy.get(this.option).contains(status).click();
    }

    clickSearchButton() {
        cy.get(this.searchButton).click();
    }

    clickAddButton() {
        cy.get(this.addButton).click();
    }

    selectUserRoleForAdd(role:string) {
        cy.get(this.addUserRoleDropdown).click();
        cy.get(this.option).contains(role).click();
    }

    selectUserStatusForAdd(status:string) {
        cy.get(this.addStatusDropDown).click();
        cy.get(this.option).contains(status).click();
    }

    enterEmployeeName(name:string) {
        cy.get(this.addEmployeeNameTextBox).click().type(name);
        cy.contains(name).click();
    }

    enterUserNameForAdd(name:string) {
        cy.get(this.addUsernameTextBox).click().type(name);
    }

    enterPassword(password:string) {
        cy.get(this.passwordTextBox).click().type(password);
    }

    enterConfirmPassword(password:string) {
        cy.get(this.confirmPasswordTextbox).click().type(password);
    }

    clickSaveButton() {
        cy.get(this.savebutton).click();
    }

    addUser(role: string, name: string, status: string, username: string, password: string) {
        this.clickAddButton();
        this.selectUserRoleForAdd(role);
        this.selectUserStatusForAdd(status);
        this.enterEmployeeName(name);
        this.enterUserNameForAdd(username);
        this.enterPassword(password);
        this.enterConfirmPassword(password);
        this.clickSaveButton();
        cy.wait(5000);
    }

    searchUser(name:string) {
        this.enterUserName(name);
        cy.intercept('GET','web/index.php/api/v2/admin/users*').as('getUsers')
        this.clickSearchButton();
        cy.wait('@getUsers')
        cy.wait(5000);
    }

    deleteUserIfExists(username: string) {
        this.searchUser(username);
        cy.get(this.table).then(($elements) => {
            if ($elements.find(this.tableRow).length>0) {
                cy.get(this.deleteButton).click();
                cy.get(this.confirmYes).click();
                cy.wait(5000);
            } else {
                cy.log('No user found to delete');
            }
        })
    }

    getValidEmployeeName(): Cypress.Chainable<string> {
        return cy.request({
          method: 'GET',
          url: 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees',
        }).then((response) => {
          const data = response.body.data;
          const firstObject = data[0];
          const firstName = firstObject.firstName;
          return firstName; // Return the value within the Cypress promise chain
        });
      }

    // Verification Parts

    verifyTableHeaders(pageHeaders:string[]) {
        for (let i = 0; i < pageHeaders.length; i++){
            const selector = this.tableHeaders.replace('columnNumber',`${i+2}`);
            cy.get((selector)).should('contain.text',pageHeaders[i]);
        }
    }

    verifySearchResult(expectedData: string[]) {
        cy.get(this.tableRow).should('have.length', 1);
        for (let i = 0; i < expectedData.length; i++){
            const selector = this.expectedData.replace('columnNumber',`${i+2}`);
            cy.get(selector).should('contain.text',expectedData[i]);
        }
    }

    verifyUsersAdded(username:string) {
        this.searchUser(username);
        cy.get(this.tableRow).should('have.length', 1);
    }
}

export default new AdminPage();