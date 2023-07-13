class OrdersHistoryPage {

    constructor(page) {
        this.page = page;
        this.orderHistoryBody = page.locator("tbody");
        this.ordersList = page.locator("tbody tr");
        this.orderIdView = page.locator("div.email-container .col-text");
    }

    async viewOrder(orderId) {
        // const ordersList = page.locator("tbody tr")
        for (let i = 0; i < await this.ordersList.count(); ++i) {
            if (orderId.includes(await this.ordersList.nth(i).locator("th").textContent())) {
                //click view button
                await this.ordersList.nth(i).locator("text=View").click()
                break;
            }
        }
    }

    async getOrderIdFromView(){
        return await this.orderIdView.textContent();
    }
}

module.exports = { OrdersHistoryPage };