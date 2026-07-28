import { test, expect } from '@playwright/test';

test.describe('Authentication Module', () => {

  test('TC01 - Successful Login with valid credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    const pageTitle = page.locator('[data-test="title"]');
    await expect(pageTitle).toHaveText('Products');
  });

  test('TC02 - Locked-out Account Verification', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
  });

  test('TC03 - Invalid Credentials Handling', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('invalid_password');
    await page.locator('[data-test="login-button"]').click();

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
  });

});