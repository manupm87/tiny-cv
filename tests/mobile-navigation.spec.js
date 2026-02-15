import { test, expect } from '@playwright/test';

test.describe('Mobile Navigation', () => {
    // skip desktop browsers
    test.skip(({ isMobile }) => !isMobile, 'Mobile only tests');

    test.beforeEach(async ({ page }) => {
        page.on('console', msg => console.log(`BROWSER LOG: ${msg.text()}`));
        await page.goto('/');
        // Wait for loading to finish
        await expect(page.locator('text=Loading timeline...')).not.toBeVisible();
    });

    test('should navigate slides with swipe gestures', async ({ page }) => {
        // 1. Initial State: Intro
        await expect(page.locator('text=Manuel Pérez Martínez')).toBeVisible();
        await expect(page.locator('text=Cloud Platform Engineer')).toBeVisible();

        // 2. Swipe Up -> Education (Gijon - IB) [Vertical Slide]
        await page.mouse.move(200, 500);
        await page.mouse.down();
        await page.mouse.move(200, 100);
        await page.mouse.up();
        await page.waitForTimeout(2000); // Wait for animation

        await expect(page.locator('text=The Foundation')).toBeVisible();
        await expect(page.locator('text=International Baccalaureate')).toBeVisible();
        await expect(page.locator('text=R.I.E.S. Jovellanos')).toBeVisible();

        // 3. Swipe Up -> Education (Bologna - Erasmus) [Horizontal Slide]
        await page.mouse.move(200, 500);
        await page.mouse.down();
        await page.mouse.move(200, 100);
        await page.mouse.up();
        await page.waitForTimeout(2000);

        await expect(page.locator('text=The Foundation')).toBeVisible(); // Same Section
        await expect(page.locator('text=ERASMUS')).toBeVisible();
        await expect(page.locator('text=Universitá di Bologna')).toBeVisible();

        // 4. Swipe Up -> Education (Gijon - MSc) [Horizontal Slide]
        await page.mouse.move(200, 500);
        await page.mouse.down();
        await page.mouse.move(200, 100);
        await page.mouse.up();
        await page.waitForTimeout(2000);

        await expect(page.locator('text=The Foundation')).toBeVisible();
        await expect(page.locator('text=MSc Telecommunication Engineering')).toBeVisible();
        await expect(page.locator('text=University of Oviedo')).toBeVisible();

        // 5. Swipe Up -> Early Career (Gijon - DXC) [Vertical Slide]
        await page.mouse.move(200, 500);
        await page.mouse.down();
        await page.mouse.move(200, 100);
        await page.mouse.up();
        await page.waitForTimeout(2000);

        await expect(page.locator('text=Early Career')).toBeVisible();
        await expect(page.locator('text=Software Engineer')).toBeVisible();
        await expect(page.locator('text=DXC')).toBeVisible();

        // 6. Test Expansion
        // Click on the DXC card to expand
        const cardTitle = page.locator('h3').filter({ hasText: 'Software Engineer' });
        await cardTitle.click();

        // Check for details (e.g. "Alfresco")
        await expect(page.locator('text=Alfresco')).toBeVisible();
    });
});
