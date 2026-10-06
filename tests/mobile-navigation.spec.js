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
        await expect(page.locator('.intro-role')).toContainText('Cloud Platform Engineer');

        // 2. Swipe Up -> Education (Gijon - IB) [Vertical Slide]
        await page.mouse.move(200, 500);
        await page.mouse.down();
        await page.mouse.move(200, 100);
        await page.mouse.up();
        await page.waitForTimeout(2000); // Wait for animation

        await expect(page.locator('text=The Foundation')).toBeVisible();
        await expect(page.locator('.card-title', { hasText: 'International Baccalaureate' })).toBeVisible();
        await expect(page.locator('text=R.I.E.S. Jovellanos')).toBeVisible();

        // 3. Swipe Up -> Education (Bologna - Erasmus) [Horizontal Slide]
        await page.mouse.move(200, 500);
        await page.mouse.down();
        await page.mouse.move(200, 100);
        await page.mouse.up();
        await page.waitForTimeout(2000);

        await expect(page.locator('text=The Foundation')).toBeVisible(); // Same Section
        await expect(page.locator('.card-title', { hasText: 'ERASMUS' })).toBeVisible();
        await expect(page.locator('text=Università di Bologna')).toBeVisible();

        // 4. Swipe Up -> Education (Gijon - MSc) [Horizontal Slide]
        await page.mouse.move(200, 500);
        await page.mouse.down();
        await page.mouse.move(200, 100);
        await page.mouse.up();
        await page.waitForTimeout(2000);

        await expect(page.locator('text=The Foundation')).toBeVisible();
        await expect(page.locator('.card-title', { hasText: 'MSc Telecommunication Engineering' })).toBeVisible();
        await expect(page.locator('.card-org', { hasText: 'University of Oviedo' })).toBeVisible();

        // 5. Swipe Up -> Early Career (Gijon - DXC) [Vertical Slide]
        await page.mouse.move(200, 500);
        await page.mouse.down();
        await page.mouse.move(200, 100);
        await page.mouse.up();
        await page.waitForTimeout(2000);

        await expect(page.locator('text=Early Career')).toBeVisible();
        await expect(page.locator('.card-title', { hasText: 'Software Engineer' })).toBeVisible();
        await expect(page.locator('.card-org', { hasText: 'DXC' })).toBeVisible();

        // 6. Test Expansion
        // Click on the DXC card to expand
        const cardTitle = page.locator('h3').filter({ hasText: 'Software Engineer' });
        await cardTitle.click();

        // Details are only rendered once expanded (the "Alfresco" tag alone is always visible)
        const card = page.locator('.info-card').filter({ hasText: 'Software Engineer' });
        await expect(card).toHaveAttribute('aria-expanded', 'true');
        await expect(card.locator('.card-details')).toContainText('Alfresco, Liferay and SharePoint');
    });
});
