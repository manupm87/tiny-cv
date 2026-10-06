import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 390, height: 844 } }); // iPhone 12 pro size

const swipeUp = async (page) => {
    await page.mouse.move(200, 500);
    await page.mouse.down();
    await page.mouse.move(200, 300, { steps: 4 });
    await page.mouse.move(200, 100, { steps: 4 });
    await page.mouse.up();
};

test('Mobile experience cards should visually collapse and expand', async ({ page }) => {
    // 1. The mobile timeline opens on the intro slide, which has no cards
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.info-card')).toHaveCount(0);

    // 2. Swipe up to the first experience card
    await swipeUp(page);
    const card = page.locator('.info-card').filter({ hasText: 'International Baccalaureate' });
    await expect(card).toBeVisible({ timeout: 5000 });

    // 3. It is an interactive, collapsed card: details are not rendered
    await expect(card).toHaveAttribute('role', 'button');
    await expect(card).toHaveAttribute('aria-expanded', 'false');
    await expect(card).toHaveClass(/collapsed/);
    await expect(card.locator('.card-details')).toHaveCount(0);

    // 4. Tap to expand: details appear
    await card.click();
    await expect(card).toHaveAttribute('aria-expanded', 'true');
    await expect(card).toHaveClass(/expanded/);
    await expect(card.getByText('High School Education')).toBeVisible();

    // 5. Tap again to collapse: details are removed
    await card.click();
    await expect(card).toHaveAttribute('aria-expanded', 'false');
    await expect(card.locator('.card-details')).toHaveCount(0);

    // 6. An expanded card does not leak its state to the next one
    await card.click();
    await expect(card).toHaveAttribute('aria-expanded', 'true');
    await swipeUp(page);
    const nextCard = page.locator('.info-card').filter({ hasText: 'ERASMUS' });
    await expect(nextCard).toBeVisible({ timeout: 5000 });
    await expect(nextCard).toHaveAttribute('aria-expanded', 'false');
    await expect(nextCard.locator('.card-details')).toHaveCount(0);
});
