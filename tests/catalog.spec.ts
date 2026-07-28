import { test, expect } from '@playwright/test';

test.describe('Product Catalog Module', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
  });

  test('TC04 - Inventory Grid Display Verification', async ({ page }) => {
    const inventoryItems = page.locator('[data-test="inventory-item"]');
    await expect(inventoryItems).toHaveCount(6);
  });

  test('TC05 - Product Sorting (Price: Low to High)', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

    const priceElements = await page.locator('[data-test="inventory-item-price"]').allTextContents();
    const prices = priceElements.map(price => parseFloat(price.replace('$', '')));

    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  });

});