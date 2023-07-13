class CartPage {

    constructor(page) {
        this.page = page;
        this.myCart = page.locator("text=My Cart");
        this.checkOut = page.locator("text=Checkout")
        this.selectCountry = page.locator("[placeholder='Select Country']");
        this.dropDown = page.locator("section.ta-results");
        this.dropDownList = this.dropDown.locator("button");
        this.placeOrderBtn = page.locator(".action__submit");
        this.orderStatusMsg = page.locator(".hero-primary");
        this.orderIdLabel = page.locator("label.ng-star-inserted");
    }

    async getProductNameInCart() {
        return await this.page.locator(".cart .infoWrap h3").textContent();
    }

    async checkOutItemsInCart(countryName) {
        await this.checkOut.click();
        
        await this.selectCountry.type("Ind");
        await this.dropDown.waitFor()
        // await page.waitForLoadState('networkidle')
        //iterate for dropDown selction
        const dropDownsCount = await this.dropDownList.count()
        for (let i = 0; i < dropDownsCount; ++i) {
            let text = await this.dropDownList.nth(i).textContent()
            console.log(text)
            if (text === ' India') {
                await this.dropDownList.nth(i).click()
                break;
            }
        }

        await this.placeOrderBtn.click()
        return await this.orderStatusMsg.textContent();
    }

    async getSuccessOrderId(){
        return await this.orderIdLabel.textContent();
    }

    
}

module.exports = { CartPage };