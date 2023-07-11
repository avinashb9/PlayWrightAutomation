const {test,expect} = require("@playwright/test")

test('Block css style Network calls for the application', async ({page}) => {
    //block all the css network calls
    page.route("**/*.css",route => route.abort());

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
});

test.only('Block images Network calls for the application', async ({page}) => {
    //block all the css network calls
    page.route("**/*.{jpg,png,jpeg}",route => route.abort());

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
    await page.pause();
});