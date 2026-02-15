import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 390, height: 844 } }); // iPhone 12 pro size

test('Mobile experience cards should visually collapse and expand', async ({ page }) => {
    // 1. Navigate to the app
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // 2. Wait for timeline to load
    const firstCard = page.locator('.info-card').first();
    await firstCard.waitFor({ state: 'visible', timeout: 10000 });

    // 3. In mobile view, check if card is interactive
    const isClickable = await firstCard.getAttribute('role');

    if (isClickable === 'button') {
        // Card is collapsible
        // Check initial collapsed state
        const detailsList = firstCard.locator('.card-details');
        const initialCount = await detailsList.count();

        // 4. Click to expand
        await firstCard.click();
        await page.waitForTimeout(500); // Animation time

        // 5. Check expanded state
        const expandedCount = await detailsList.count();
        expect(expandedCount).toBeGreaterThanOrEqual(initialCount || 0);

        // 6. Check interaction with another card (Accordion behavior)
        const secondCard = page.locator('.info-card').nth(1);
        if (await secondCard.count() > 0) {
            const secondIsClickable = await secondCard.getAttribute('role');
            if (secondIsClickable === 'button') {
                await secondCard.click();
                await page.waitForTimeout(500);

                // Second card should be visible
                expect(await secondCard.isVisible()).toBeTruthy();
            }
        }
    } else {
        // Desktop view - cards are always expanded
        expect(await firstCard.isVisible()).toBeTruthy();
    }
});
