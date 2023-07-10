const {expect} = require("@playwright/test")


class APIUtils {

    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            })
        // console.log(login)
        expect(loginResponse.ok()).toBeTruthy();
        const loginRespJson = await loginResponse.json();
        console.log(loginRespJson)
        return  loginRespJson.token;
    }

    async createOrder(orderPayload) {
        let response = {};
        response.token =  await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    'Authorization': response.token,
                    'Content-Type': 'application/json'
                }
            })
        const orderResponseJSON = await orderResponse.json();
        console.log(orderResponseJSON)
        response.orderId = orderResponseJSON.orders[0];
        return response;
    }
}

module.exports = { APIUtils };