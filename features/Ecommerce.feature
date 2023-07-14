Feature: Ecommerce validations

Scenario: Placing the order
    Given User login to Ecommerce application with "avinashbg@gmail.com" and "Playwright#7"
    When Add "zara coat 3" to the Cart
    Then Verify "zara coat 3" is displaying in the Cart
    When User enters valid details and placed the order
    Then Verify Order is present in the Order History Page
