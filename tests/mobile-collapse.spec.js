import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 390, height: 844 } }); // iPhone 12 pro size

test('Mobile experience cards should visually collapse and expand', async ({ page }) => {
    // 1. Navigate to the app
    await page.goto('/');

    // 2. Wait for timeline to load
    const firstCard = page.locator('.info-card').first();
    await firstCard.waitFor({ state: 'visible', timeout: 10000 });

    // 3. Check initial collapsed state
    // In collapsed state, .card-details should NOT be present in the DOM (due to conditional rendering)
    const detailsList = firstCard.locator('.card-details');
    await expect(detailsList).toHaveCount(0);

    // 4. Click to expand
    await firstCard.click();

    // 5. Check expanded state
    // Details should now be present and visible
    await expect(detailsList).toHaveCount(1);
    await expect(detailsList).toBeVisible();

    // 6. Check interaction with another card (Accordion behavior)
    const secondCard = page.locator('.info-card').nth(1);
    if (await secondCard.count() > 0) {
        await secondCard.click();

        // Second card details visible
        const secondDetails = secondCard.locator('.card-details');
        await expect(secondDetails).toBeVisible();

        // First card should now be collapsed (details removed)
        await expect(detailsList).toHaveCount(0);
    }
});
