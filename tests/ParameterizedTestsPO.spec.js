const { test,expect } = require("@playwright/test")
const { POManager } = require("../pageObjects/POManager")
//json to string --> Javascript Object
const dataset = JSON.parse(JSON.stringify(require("./utils/loginTestData.json")))
const multipleDataSets = JSON.parse(JSON.stringify(require("./utils/testData.json")))

const { customtest } = require("./utils/test-base")


test('Parameterized Test - Verify login with valid credentials and search product', async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await expect(page).toHaveTitle("Let's Shop");

    await loginPage.validLogin(dataset.username, dataset.password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(dataset.productName);
});


for (let data of multipleDataSets) {
    test(`Parameterized Test Multiple Test Data- search product ${data.productName}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await expect(page).toHaveTitle("Let's Shop");

        await loginPage.validLogin(data.username, data.password);

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(data.productName);
    });
}


customtest.only("Client Page login - Passing Test data as fixute", async ({ page, testDataForOrder }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await expect(page).toHaveTitle("Let's Shop");

    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
});