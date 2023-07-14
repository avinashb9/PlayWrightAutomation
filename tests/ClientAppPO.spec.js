const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageObjects/POManager');


test('End to End test using PageObject Model', async ({page}) => {

    const poManager = new POManager(page);
    const loginPage  = poManager.getLoginPage();
    await loginPage.goTo();
    await expect(page).toHaveTitle("Let's Shop");

    await loginPage.validLogin("avinashbg@gmail.com","Playwright#7");

    //select iphone x
    const productName = "iphone 13 pro";
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(productName);
    

    //navigate to cart page
    await expect(dashboardPage.cart).toBeVisible()
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await expect(cartPage.myCart).toBeVisible()


    //validate productName in cart
    expect(await cartPage.getProductNameInCart() === productName).toBeTruthy()

    //enter select country
    const countryName = "India"
    const orderMsg = await cartPage.checkOutItemsInCart(countryName)
    
    const orderSuccessMsg = "Thankyou for the order."
    expect(orderMsg.includes(orderSuccessMsg)).toBeTruthy()

    //get orderId after placing the order
    const orderId = await cartPage.getSuccessOrderId();

    //navigate to Orders page and validate
    await dashboardPage.navigateToMyOrders();

    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await expect(ordersHistoryPage.orderHistoryBody).toBeVisible()
    
    //navigate to OrderViewPage
    await ordersHistoryPage.viewOrder(orderId);

    //validate orderId
    expect(orderId.includes(await ordersHistoryPage.getOrderIdFromView())).toBeTruthy();
});


test.only('Login test using PageObject Model', async ({page}) => {

    const poManager = new POManager(page);
    const loginPage  = poManager.getLoginPage();
    await loginPage.goTo();
    await expect(page).toHaveTitle("Let's Shop");

    await loginPage.validLogin("avinashbg@gmail.com","Playwright#7");
}
);