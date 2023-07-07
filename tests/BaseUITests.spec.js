const {test, expect} = require('@playwright/test')

test('First Playwright test - Browser fixture', async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

});

test('Page fixture - verify login error for incorrect credentials', async ({page}) => {
    // await page.goto("https://www.atlassian.com/")
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title())
    // await expect(page).toHaveTitle(" Collaboration software for software, IT and business teams ")
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy")

    const username = page.locator("#username")
    const password = page.locator("#password")
    const signInBtn = page.locator("#signInBtn")
    await username.type("rahulshetty")
    await password.type("learning")
    await signInBtn.click()


    // console.log(await page.locator("[style*='block']").textContent())
    await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.")

    //clear username and password - enter valid credentials
    await username.fill("")
    await username.fill("rahulshettyacademy")
    await signInBtn.click()


    //select iphone x
    const cardTitles = page.locator(".card-body a")
    console.log(await cardTitles.first().textContent())
    console.log(await cardTitles.allTextContents())
    

});

test('verify all elemets texts - Non-Services based app', async ({page}) => {
    // await page.goto("https://www.atlassian.com/")
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title())
    // await expect(page).toHaveTitle(" Collaboration software for software, IT and business teams ")
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy")

    const username = page.locator("#username")
    const password = page.locator("#password")
    const signInBtn = page.locator("#signInBtn")
    await username.type("rahulshettyacademy")
    await password.type("learning")
    //dynamic wait for allTextContents
    await Promise.all([
        page.waitForNavigation(),
        signInBtn.click()
    ]);
    

    //select iphone x
    const cardTitles = page.locator(".card-body a")
    // console.log(await cardTitles.first().textContent())
    console.log(await cardTitles.allTextContents())
});


test('verify all elemets texts - Rest Services based app', async ({page})=> {
    await page.goto("https://rahulshettyacademy.com/client")
    await expect(page).toHaveTitle("Let's Shop")

    const username = page.locator("#userEmail")
    const password = page.locator("#userPassword")
    const signInBtn = page.locator("#login")

    //clear username and password - enter valid credentials
    await username.fill("avinashbg@gmail.com")
    await password.type("Playwright#7")
    await signInBtn.click()


    //select iphone x
    await page.waitForLoadState('networkidle')
    const cardTitles = page.locator(".card-body b")
    console.log(await cardTitles.allTextContents())
});