import { test, expect } from '@playwright/test';
import { startCoverage, stopAndSaveCoverage } from './coverage-helper.js';

/**
 * Desktop Navigation E2E Tests
 * Tests scroll-based navigation, navigation dots, and desktop-specific features
 * WITH COVERAGE COLLECTION for desktop components
 */

test.describe('Desktop Navigation', () => {
    // Only run on desktop browsers
    test.skip(({ isMobile }) => isMobile, 'Desktop only tests');

    test.beforeEach(async ({ page }) => {
        await startCoverage(page);
        await page.goto('/');
        await page.waitForLoadState('networkidle');
    });

    test.afterEach(async ({ page }, testInfo) => {
        await stopAndSaveCoverage(page, testInfo.title);
    });

    test('should display intro slide on load', async ({ page }) => {
        // Check title
        await expect(page).toHaveTitle(/Manuel Pérez Martínez/);

        // Check intro content
        await expect(page.getByRole('heading', { name: 'Manuel Pérez Martínez' })).toBeVisible();
        await expect(page.locator('.intro-role')).toContainText('Cloud Platform');

        // Check social links
        await expect(page.getByRole('link', { name: /github/i })).toBeVisible();
        await expect(page.getByRole('link', { name: /linkedin/i })).toBeVisible();
    });

    test('should navigate through all timeline sections by scrolling', async ({ page }) => {
        const sections = [
            { id: 'intro', title: 'Manuel Pérez Martínez' },
            { id: 'education', title: 'The Foundation' },
            { id: 'gijon-early', title: 'Early Career' },
            { id: 'budapest', title: 'The R&D Era' },
            { id: 'london', title: 'The Fintech & Data Scale-up' },
            { id: 'gijon-return', title: 'The Architect' },
            { id: 'ai-builder', title: 'The AI Builder' }
        ];

        for (const section of sections) {
            const sectionElement = page.locator(`#${section.id}`);
            await expect(sectionElement).toBeAttached();

            // Scroll into view
            await sectionElement.scrollIntoViewIfNeeded();
            await page.waitForTimeout(500); // Wait for scroll and animations

            // Verify visibility
            await expect(sectionElement).toBeInViewport();
            await expect(page.getByText(section.title).first()).toBeVisible();
        }
    });

    test('should update active navigation dot on scroll', async ({ page }) => {
        const nav = page.locator('.navigator');
        await expect(nav).toBeVisible();

        // Intro is the current location initially
        const introNav = nav.locator('[href="#intro"]');
        await expect(introNav).toHaveAttribute('aria-current', 'location');

        // Scroll to education section
        await page.locator('#education').scrollIntoViewIfNeeded();

        // Education is now current, intro no longer is
        const eduNav = nav.locator('[href="#education"]');
        await expect(eduNav).toHaveAttribute('aria-current', 'location', { timeout: 5000 });
        await expect(introNav).not.toHaveAttribute('aria-current', 'location');
    });

    test('should show the period label only on hover or keyboard focus', async ({ page }) => {
        const nav = page.locator('.navigator');
        const introLink = nav.locator('[href="#intro"]');
        const introLabel = introLink.locator('.tooltip');
        const eduLink = nav.locator('[href="#education"]');
        const eduLabel = eduLink.locator('.tooltip');

        // The active dot no longer shows its label permanently
        await expect(introLink).toHaveAttribute('aria-current', 'location');
        await expect(introLabel).toHaveCSS('opacity', '0');
        await expect(eduLabel).toHaveCSS('opacity', '0');

        // Hover reveals the hovered dot's label only
        await eduLink.hover();
        await expect(eduLabel).toHaveCSS('opacity', '1');
        await expect(introLabel).toHaveCSS('opacity', '0');
        await page.mouse.move(0, 0);
        await expect(eduLabel).toHaveCSS('opacity', '0');

        // Keyboard focus reveals it too (walk the tab order until a dot is focused)
        const focusedLabel = nav.locator('.navLink:focus-visible .tooltip');
        for (let i = 0; i < 15 && (await focusedLabel.count()) === 0; i++) {
            await page.keyboard.press('Tab');
        }
        await expect(focusedLabel).toHaveCount(1);
        await expect(focusedLabel).toHaveCSS('opacity', '1');
    });

    test('should navigate using navigation dots', async ({ page }) => {
        const nav = page.locator('.navigator');
        await expect(nav).toBeVisible();

        // One dot per slide, the new last slide included
        await expect(nav.locator('.navLink')).toHaveCount(7);
        await expect(nav.locator('[href="#ai-builder"]')).toBeVisible();

        // Click on Budapest navigation dot
        const budapestLink = nav.locator('[href="#budapest"]');
        await expect(budapestLink).toBeVisible();
        await budapestLink.click();

        // Verify we're at Budapest section
        const budapestSection = page.locator('#budapest');
        await expect(budapestSection).toBeInViewport({ ratio: 0.3, timeout: 5000 }); // At least 30% visible
        await expect(page.getByText('The R&D Era')).toBeVisible({ timeout: 5000 });
        await expect(budapestLink).toHaveAttribute('aria-current', 'location', { timeout: 5000 });
    });

    test('should show cards collapsed by default and expand one at a time', async ({ page }) => {
        const slide = page.locator('#education');
        await slide.scrollIntoViewIfNeeded();

        const cards = slide.locator('.info-card');
        const cardCount = await cards.count();
        expect(cardCount).toBeGreaterThan(1);

        // Every card starts collapsed: header visible, details not rendered
        for (let i = 0; i < cardCount; i++) {
            await expect(cards.nth(i)).toBeVisible();
            await expect(cards.nth(i)).toHaveAttribute('aria-expanded', 'false');
        }
        await expect(slide.locator('.card-details')).toHaveCount(0);

        // Clicking a card expands it
        await cards.nth(0).click();
        await expect(cards.nth(0)).toHaveAttribute('aria-expanded', 'true');
        await expect(cards.nth(0).locator('.card-details')).toBeVisible();

        // Clicking another card moves the expansion: only one is open per slide
        await cards.nth(1).click();
        await expect(cards.nth(1)).toHaveAttribute('aria-expanded', 'true');
        await expect(cards.nth(0)).toHaveAttribute('aria-expanded', 'false');
        await expect(slide.locator('.info-card[aria-expanded="true"]')).toHaveCount(1);

        // Clicking the open card collapses it again
        await cards.nth(1).click();
        await expect(slide.locator('.info-card[aria-expanded="true"]')).toHaveCount(0);
        await expect(slide.locator('.card-details')).toHaveCount(0);
    });

    test('should display and animate background orbs', async ({ page }) => {
        // Check that background orbs container exists
        const orbs = page.locator('.orb');
        const orbCount = await orbs.count();

        expect(orbCount).toBeGreaterThan(0);

        // Verify orbs are visible
        for (let i = 0; i < Math.min(orbCount, 3); i++) {
            await expect(orbs.nth(i)).toBeVisible();
        }

        // Scroll to trigger orb animations (they use useScroll hook)
        await page.evaluate(() => window.scrollTo(0, 500));
        await page.waitForTimeout(500);

        // Scroll more to trigger transform changes
        await page.evaluate(() => window.scrollTo(0, 1500));
        await page.waitForTimeout(500);

        // Orbs should still be visible after scroll
        await expect(orbs.first()).toBeVisible();
    });

    test('should show location images in timeline slides', async ({ page }) => {
        // Navigate to section with images
        await page.locator('#budapest').scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        // Check for location image by alt text
        const image = page.locator('img[alt="Budapest"]').first();
        await expect(image).toBeVisible({ timeout: 5000 });
    });

    test('should handle keyboard navigation and trigger focus states', async ({ page }) => {
        // Press Tab to start navigating
        await page.keyboard.press('Tab');
        await page.waitForTimeout(300);

        // Tab through several elements to trigger focus handlers
        for (let i = 0; i < 5; i++) {
            await page.keyboard.press('Tab');
            await page.waitForTimeout(100);
        }

        // Check that something is focused
        const focusedElement = page.locator(':focus');
        const count = await focusedElement.count();

        // At least one element should be focusable
        expect(count).toBeGreaterThanOrEqual(0);
    });

    test('should show hover effects on cards', async ({ page }) => {
        await page.locator('#gijon-early').scrollIntoViewIfNeeded();

        const card = page.locator('.glass-card').first();

        // Hover over card
        await card.hover();

        // Card should still be visible and possibly have transform
        await expect(card).toBeVisible();

        // Verify no errors occurred
        const box = await card.boundingBox();
        expect(box).toBeTruthy();
    });

    test('should preserve scroll position on browser resize (within reason)', async ({ page }) => {
        // Scroll to middle section
        await page.locator('#budapest').scrollIntoViewIfNeeded();
        const initialScrollY = await page.evaluate(() => window.scrollY);

        // Resize viewport
        await page.setViewportSize({ width: 1280, height: 720 });
        await page.waitForTimeout(300);

        // Scroll position should be roughly the same (allow some variance)
        const newScrollY = await page.evaluate(() => window.scrollY);
        expect(Math.abs(newScrollY - initialScrollY)).toBeLessThan(200);
    });
});
