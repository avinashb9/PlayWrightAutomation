const {test,expect,request} = require("@playwright/test")
const {APIUtils} = require("./utils/APIUtils")


const loginPayload = {userEmail: "avinashbg@gmail.com",userPassword: "Playwright#7"};
const orderPayload = {orders: [ {country: "India",productOrderedId: "6262e990e26b7e1a10e89bfa" }]};
let response;

test.beforeAll( async ()=>{

    //Login API
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,loginPayload);

    /*const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data:loginPayload
    })
    // console.log(login)
    expect(loginResponse.ok()).toBeTruthy();
    const loginRespJson = await loginResponse.json();
    console.log(loginRespJson)
    token = loginRespJson.token;
    console.log(token)*/

    //Order API
    response = await apiUtils.createOrder(orderPayload);
    /*const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data:orderPayload,
            headers:{
                'Authorization':token,
                'Content-Type':'application/json'
            }
        })
    const orderResponseJSON= await orderResponse.json();
    console.log(orderResponseJSON)
    orderId = orderResponseJSON.orders[0];*/
});

test.only('End 2 End test by using APIs', async ({page}) => {

    //set token in the system local storage
    page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    },response.token);
    await page.goto("https://rahulshettyacademy.com/client");
    await expect(page).toHaveTitle("Let's Shop")
    
    //verify order created showing up on Order History Page
    //navigate to Orders page and validate
    await page.locator("button[routerlink='/dashboard/myorders']").click()
    await expect(page.locator("tbody")).toBeVisible()
    const ordersList = page.locator("tbody tr")
    for(let i=0; i< await ordersList.count();++i){
        if(response.orderId.includes(await ordersList.nth(i).locator("th").textContent())){
            //click view button
            await ordersList.nth(i).locator("text=View").click()
            break;
        }
    }

    //validate orderId
    expect(response.orderId.includes(await page.locator("div.email-container .col-text").textContent())).toBeTruthy()
});