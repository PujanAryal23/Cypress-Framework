import { Pages } from '../enums/Pages';
import { UserRoles } from '../enums/UserRoles';
import { UserStatus } from '../enums/UserStatus';
import AdminPage from '../page-objects/AdminPage';
import testData from '../fixtures/admin-test-data.json'

describe("Admin Tests", () => {
    beforeEach(() => {
        cy.loginToApplication();
        cy.navigateToAPage(Pages.Admin);
    })

    it("Search Test", () => {
        AdminPage.enterUserName(testData.username);
        AdminPage.selectUserRole(testData.role);
        AdminPage.selectStatus(testData.status);
        AdminPage.clickSearchButton();
        AdminPage.verifyTableHeaders(testData.pageHeaders);
        AdminPage.verifySearchResult(testData.expectedSearchResult);
    })

    it.only("Add User Test", () => {
        AdminPage.deleteUserIfExists(testData.newUserName);
        AdminPage.getValidEmployeeName().then((firstName) => {
            AdminPage.addUser(UserRoles.Admin, firstName, UserStatus.Enabled, testData.newUserName, testData.password);
        });
        AdminPage.verifyUsersAdded(testData.newUserName);
    })

    afterEach(() => {
        cy.logOut();
    })
})