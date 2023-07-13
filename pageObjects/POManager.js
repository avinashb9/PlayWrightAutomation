const {LoginPage} = require("../pageObjects/LoginPage")
const {DashboardPage} = require("../pageObjects/DashboardPage");
const { CartPage } = require("./CartPage");
const { OrdersHistoryPage } = require("./OrdersHistoryPage");

class POManager{

    constructor(page){
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.ordersHistoryPage = new OrdersHistoryPage(page);
    }


    getLoginPage(){
        return this.loginPage;
    }

    getDashboardPage(){
        return this.dashboardPage;
    }

    getCartPage(){
        return this.cartPage;
    }

    getOrdersHistoryPage(){
        return this.ordersHistoryPage;
    }
}

module.exports = {POManager}