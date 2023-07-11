const {test,expect} = require("@playwright/test")


test('Take screenshot of the page test', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title())
    // await expect(page).toHaveTitle(" Collaboration software for software, IT and business teams ")
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    await page.screenshot({path:'screenshot.png'})
    await page.pause()
});


test('Take screenshot of Element on the page test', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title())
    // await expect(page).toHaveTitle(" Collaboration software for software, IT and business teams ")
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    await page.locator("#username").screenshot({path:'element.png'});
    await page.pause();
});

test('Visual Testing Test- comparing the image of page with expected image.',async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title());

    //if the landing.page is not available, it takes screenshot freshly and fails the test for the first time
    expect(await page.screenshot()).toMatchSnapshot("landing.png");
});


test.only('Visual Testing Test, Fail example - comparing the image of page with expected image.',async ({page}) => {
    await page.goto("https://www.irctc.co.in/nget/train-search")
    console.log(await page.title());

    //if the landing.page is not available, it takes screenshot freshly and fails the test for the first time
    expect(await page.screenshot()).toMatchSnapshot("IRCTC_landing.png");
});