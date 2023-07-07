const {test, expect} = require('@playwright/test')

test('Verify attribute present - blinkingText',async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy")
    const documentsLink = page.locator("[href*='documents-request']")
    await expect(documentsLink).toHaveAttribute("class","blinkingText")
});


test('Handling new tabs', async ({browser}) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const username = page.locator("#username")
    const documentsLink = page.locator("[href*='documents-request']")
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentsLink.click()
    ]);
    //for multiple tabs/windows
    /*
    const [newPage,newPage2] = await Promise.all([
        context.waitForEvent('page'),
        documentsLink.click()
    ]); */
    const text = await newPage.locator(".red").textContent()
    console.log(text)
    //retrieve domain
    const domain = text.split("@")[1].split(" ")[0];
    console.log(domain);
    ////enter domain at first page
    await page.locator("#username").type(domain);
    await page.pause();
    console.log(await username.textContent());

    
});

test.only('End to End test', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/client");
    await expect(page).toHaveTitle("Let's Shop")

    const username = page.locator("#userEmail")
    const password = page.locator("#userPassword")
    const signInBtn = page.locator("#login")

    await username.fill("avinashbg@gmail.com")
    await password.type("Playwright#7")
    await signInBtn.click()


    //select iphone x
    await page.waitForLoadState('networkidle')
    const productName = "iphone 13 pro";
    const cardTitles = page.locator(".card-body b")
    console.log(await cardTitles.allTextContents())

    // await page.pause()
    const products = page.locator(".card-body")
    const count = await products.count()
    console.log("No of Products:"+count)
    for(let i=0;i<count;++i){
        //iterate
        let text = await products.nth(i).locator("b").textContent();
        if(text === productName){
            //click add To Cart
            await products.nth(i).locator("text= Add To Cart").click()
            break
        }
    }

    //navigate to cart page
    await expect(page.locator("[routerlink='/dashboard/cart']")).toBeVisible()
    await page.locator("[routerlink='/dashboard/cart']").click()
    await expect(page.locator("text=My Cart")).toBeVisible()
    expect(await page.locator(".cart .infoWrap h3").textContent() === productName).toBeTruthy()
    await page.locator("text=Checkout").click()

    //enter select country
    const countryName = "India"
    await page.locator("[placeholder='Select Country']").type("Ind")
    const dropDown = page.locator("section.ta-results")
    await dropDown.waitFor()
    // await page.waitForLoadState('networkidle')
    //iterate for dropDown selction
    const dropDownsCount = await dropDown.locator("button").count()
    for(let i = 0; i<dropDownsCount;++i){
        let text = await dropDown.locator("button").nth(i).textContent()
        console.log(text)
        if(text === ' India'){
            await dropDown.locator("button").nth(i).click()
            break;
        }
    }
    
    await page.locator(".action__submit").click()
    const orderSuccessMsg = "Thankyou for the order."
    const orderMsg = await page.locator(".hero-primary").textContent()
    console.log(orderMsg)
    expect(orderMsg.includes(orderSuccessMsg)).toBeTruthy()

    const orderId = await page.locator("label.ng-star-inserted").textContent()
    console.log(orderId)

    //navigate to Orders page and validate
    await page.locator("button[routerlink='/dashboard/myorders']").click()
    await expect(page.locator("tbody")).toBeVisible()
    const ordersList = page.locator("tbody tr")
    for(let i=0; i< await ordersList.count();++i){
        if(orderId.includes(await ordersList.nth(i).locator("th").textContent())){
            //click view button
            await ordersList.nth(i).locator("text=View").click()
            break;
        }
    }

    //validate orderId
    expect(orderId.includes(await page.locator("div.email-container .col-text").textContent())).toBeTruthy()

});