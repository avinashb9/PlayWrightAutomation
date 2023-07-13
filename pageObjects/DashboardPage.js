class DashboardPage {

    constructor(page) {
        this.page = page;
        this.cardTitles = page.locator(".card-body b");
        this.products = page.locator(".card-body");
        this.cart = page.locator("[routerlink='/dashboard/cart']");
        this.myOrders = page.locator("button[routerlink='/dashboard/myorders']");
    }


    async searchProductAddCart(productName) {
        console.log(await this.cardTitles.allTextContents());

        const count = await this.products.count();
        console.log("No of Products:" + count);

        for (let i = 0; i < count; ++i) {
            //iterate
            let text = await this.products.nth(i).locator("b").textContent();
            if (text === productName) {
                //click add To Cart
                await this.products.nth(i).locator("text= Add To Cart").click()
                break
            }
        }
    }

    async navigateToCart(){
        await this.cart.click();
    }

    async navigateToMyOrders(){
        await this.myOrders.click()
    }
}

module.exports = {DashboardPage};