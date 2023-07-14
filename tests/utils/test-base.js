const base = require("@playwright/test")

exports.customtest = base.test.extend({
    testDataForOrder:
    {
        username: "avinashbg@gmail.com",
        password: "Playwright#7",
        productName: "iphone 13 pro"
    }
}

)