const {test,expect} = require("@playwright/test")

let webContext;

test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await expect(page).toHaveTitle("Let's Shop")

    const username = page.locator("#userEmail")
    const password = page.locator("#userPassword")
    const signInBtn = page.locator("#login")

    await username.fill("avinashbg@gmail.com")
    await password.type("Playwright#7")
    await signInBtn.click()
    await page.waitForLoadState('networkidle')
    await context.storageState({path:"state.json"});
    webContext = await browser.newContext({storageState:"state.json"});

});

test('Verify Creation Order using session storage', async ({}) => {
    const newPage = await webContext.newPage();
    // const productName = "iphone 13 pro";
    await newPage.goto("https://rahulshettyacademy.com/client");
    await expect(newPage).toHaveTitle("Let's Shop")
    const cardTitles = newPage.locator(".card-body b")
    console.log(await cardTitles.allTextContents())

});