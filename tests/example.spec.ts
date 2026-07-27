import { test, expect } from '@playwright/test';

test.describe('Authentication Module', () => {

  test('TC01 - Successful Login with valid credentials', async ({ page }) => {
    // 1. ไปยังหน้าเว็บไซต์ SauceDemo
    await page.goto('https://www.saucedemo.com/');

    // 2. พิมพ์ Username และ Password โดยใช้ data-test locator
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // 3. กดปุ่ม Login
    await page.locator('[data-test="login-button"]').click();

    // 4. Assertions (ตรวจสอบผลลัพธ์)
    // ตรวจสอบว่า URL เปลี่ยนไปหน้า inventory
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // ตรวจสอบว่ามีหัวข้อ Products แสดงอยู่บน UI
    const pageTitle = page.locator('[data-test="title"]');
    await expect(pageTitle).toHaveText('Products');
  });

});