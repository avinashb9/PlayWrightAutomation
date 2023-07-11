const {test,expect,request} = require("@playwright/test")
const {APIUtils} = require("./utils/APIUtils")


const loginPayload = {userEmail: "avinashbg@gmail.com",userPassword: "Playwright#7"};
const orderPayload = {orders: [ {country: "India",productOrderedId: "6262e990e26b7e1a10e89bfa" }]};
let response;
const fakePayLoadOrders = {data:[],message:"No Orders"};


test.beforeAll( async () => {
    //bypass login through token
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});


test('Intercept/Fake Network API responses', async ({page}) => {
    //inject token to window local storage
    page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    },response.token);

    await page.goto("https://rahulshettyacademy.com/client");
    await expect(page).toHaveTitle("Let's Shop")

    //Intercept the Network call, inject fake response
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/64a79df07244490f9577ee19", 
        async route => {
            //fetch actual response
            const response = await page.request.fetch(route.request());
            //overwrite response body
            let body = fakePayLoadOrders;
            await route.fulfill({
                response,
                body
            });
    
        })
    
    //navigate to order page
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    // await page.pause();
    await expect(page.locator(".mt-4")).toHaveText(' You have No Orders to show at this time.');
});


test('Intercept/Fake Network API request insted of response', async ({page}) => {
    //inject token to window local storage
    page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    },response.token);

    await page.goto("https://rahulshettyacademy.com/client");
    await expect(page).toHaveTitle("Let's Shop")

    //navigate to order page
    await page.locator("button[routerlink='/dashboard/myorders']").click();

    //navigate to Order details page , but intercept the request by changing othe order id
    //Intercept the Network call, inject fake response
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=64ac1bfa7244490f957ae951", 
        //override request
        //64ac1cca7244490f957ae9e8 - this orderId should be from other account - so that Unauthorized page gets displayed
        route => { route.continue({url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=64ac1cca7244490f957ae9e8'});
        })
    
    //click on view button to navigate to order view page
    await page.locator("button:has-text('View')").first().click();
    // await page.pause();
    await expect(page.locator(".blink_me")).toHaveText('You are Not Authorized');
});
