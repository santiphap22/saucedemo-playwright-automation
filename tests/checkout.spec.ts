import { test, expect } from '@playwright/test';

test.describe('Cart & Checkout Module', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
  });

  test('TC06 - Item Addition & Cart Badge Assertion', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toHaveText('1');
  });

  test('TC07 - Item Removal & Cart State Update', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).not.toBeVisible();
  });

  test('TC08 - Complete End-to-End Order Processing Flow', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();

    await page.locator('[data-test="checkout"]').click();

    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('10240');
    await page.locator('[data-test="continue"]').click();

    await page.locator('[data-test="finish"]').click();

    const completeHeader = page.locator('[data-test="complete-header"]');
    await expect(completeHeader).toHaveText('Thank you for your order!');
  });

});  