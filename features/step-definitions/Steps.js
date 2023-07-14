const {Given, When, Then} = require("@cucumber/cucumber")
const {expect} = require("@playwright/test");
// const { POManager } = require("../../pageObjects/POManager");
// const playwright = require("@playwright/test")


Given('User login to Ecommerce application with {string} and {string}',{timeout:100*1000}, async function(username,password) {
    // const browser = await playwright.chromium.launch({
    //     headless:false
    // });
    // const context = await browser.newContext();
    // const page = await context.newPage();
    
    // this.poManager = new POManager(page);
    this.loginPage = this.poManager.getLoginPage();
    await this.loginPage.goTo();
    await expect(this.page).toHaveTitle("Let's Shop");

    await this.loginPage.validLogin(username,password);
} 
);

When('Add {string} to the Cart', {timeout:100*1000},async function (string) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(string);
  });

  Then('Verify {string} is displaying in the Cart',{timeout:100*1000},async function (productName) {
    //navigate to cart page
    await expect(this.dashboardPage.cart).toBeVisible()
    await this.dashboardPage.navigateToCart();
    this.cartPage = this.poManager.getCartPage();
    await expect(this.cartPage.myCart).toBeVisible()


    //validate productName in cart
    expect(await this.cartPage.getProductNameInCart() === productName).toBeTruthy()
  });

  When('User enters valid details and placed the order',{timeout:100*1000},async function () {
    //enter select country
    const countryName = "India"
    const orderMsg = await this.cartPage.checkOutItemsInCart(countryName)
    
    const orderSuccessMsg = "Thankyou for the order."
    expect(orderMsg.includes(orderSuccessMsg)).toBeTruthy()

    //get orderId after placing the order
    this.orderId = await this.cartPage.getSuccessOrderId();
  });

  Then('Verify Order is present in the Order History Page',{timeout:100*1000}, async function () {
    //navigate to Orders page and validate
    await this.dashboardPage.navigateToMyOrders();

    this.ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await expect(this.ordersHistoryPage.orderHistoryBody).toBeVisible()
    
    //navigate to OrderViewPage
    await this.ordersHistoryPage.viewOrder(this.orderId);

    //validate orderId
    expect(this.orderId.includes(await this.ordersHistoryPage.getOrderIdFromView())).toBeTruthy();
  });