import { test, expect } from '@playwright/test';
import { startCoverage, stopAndSaveCoverage } from './coverage-helper.js';

/**
 * Desktop Component Interaction Tests
 * Specifically designed to trigger JavaScript logic in desktop-only components
 */

test.describe('Desktop Component Interactions', () => {
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

    test('should trigger StoryNavigator hover animations', async ({ page }) => {
        const nav = page.locator('.navigator');
        await expect(nav).toBeVisible({ timeout: 10000 });

        // Get all navigation dots
        const dots = page.locator('.dot');
        const dotCount = await dots.count();
        expect(dotCount).toBeGreaterThan(0);

        // Hover over first 3 dots to trigger whileHover animations
        for (let i = 0; i < Math.min(dotCount, 3); i++) {
            const dot = dots.nth(i);
            await dot.hover();
            await page.waitForTimeout(300); // Give framer-motion time to animate
        }

        // Click a navigation link to trigger active state changes
        const navLinks = nav.locator('a');
        const linkCount = await navLinks.count();
        if (linkCount >= 3) {
            await navLinks.nth(2).click(); // Click 3rd link
            await page.waitForTimeout(1000);
        }
    });

    test('should trigger InfoCard rendering in TimelineSlideDesktop', async ({ page }) => {
        // Scroll to a section with cards to trigger TimelineSlideDesktop rendering
        await page.locator('#gijon-early').scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000); // Wait for framer-motion animations

        // Find all InfoCards (rendered by TimelineSlideDesktop)
        const cards = page.locator('.glass-card');
        const cardCount = await cards.count();
        expect(cardCount).toBeGreaterThan(0);

        // Interact with each card to trigger InfoCard's internal logic
        for (let i = 0; i < Math.min(cardCount, 3); i++) {
            const card = cards.nth(i);

            // Hover to trigger any hover states
            await card.hover();
            await page.waitForTimeout(200);

            // Click to trigger any click handlers
            await card.click();
            await page.waitForTimeout(200);

            // Verify card is still visible and has content
            await expect(card).toBeVisible();
            const text = await card.textContent();
            expect(text.length).toBeGreaterThan(5);
        }
    });

    test('should trigger TimelineSlideDesktop layout calculations', async ({ page }) => {
        // Navigate through multiple sections to trigger different layout modes
        const sections = ['education', 'gijon-early', 'budapest', 'london'];

        for (const sectionId of sections) {
            const section = page.locator(`#${sectionId}`);
            await section.scrollIntoViewIfNeeded();
            await page.waitForTimeout(800); // Wait for scroll and animations

            // Verify the section rendered (triggers TimelineSlideDesktop logic)
            await expect(section).toBeInViewport();

            // Check for location images (triggers image rendering logic)
            const images = section.locator('img');
            const imageCount = await images.count();

            if (imageCount > 0) {
                // Verify image loaded (triggers src attribute handling)
                await expect(images.first()).toBeVisible({ timeout: 5000 });
            }

            // Check for cards (triggers card layout logic)
            const cards = section.locator('.glass-card');
            const cardCount = await cards.count();
            expect(cardCount).toBeGreaterThan(0);
        }
    });

    test('should trigger BackgroundOrbs scroll-based animations', async ({ page }) => {
        // Get orbs
        const orbs = page.locator('.orb');
        const orbCount = await orbs.count();
        expect(orbCount).toEqual(3); // Should have exactly 3 orbs

        // Scroll incrementally to trigger useScroll and useTransform hooks
        const scrollSteps = [0, 500, 1000, 2000, 3000, 4000];

        for (const scrollY of scrollSteps) {
            await page.evaluate((y) => window.scrollTo(0, y), scrollY);
            await page.waitForTimeout(300); // Let framer-motion update transforms

            // Verify orbs are still in DOM (they move but stay visible)
            const visibleOrbCount = await page.locator('.orb').count();
            expect(visibleOrbCount).toEqual(3);
        }

        // Scroll back to top to trigger reverse transforms
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(500);

        // All orbs should still be present
        await expect(orbs.first()).toBeAttached();
    });

    test('should trigger framer-motion animations in TimelineSlideDesktop', async ({ page }) => {
        // Scroll to section to trigger whileInView animations
        const section = page.locator('#budapest');
        await section.scrollIntoViewIfNeeded();

        // Wait for framer-motion initial animation (opacity 0 -> 1, x: -50 -> 0)
        await page.waitForTimeout(1200); // Duration is 0.8s + buffer

        // Verify section is now visible (animation completed)
        await expect(section).toBeVisible();

        // Check contentWrapper has animated (should have opacity 1)
        const contentWrapper = section.locator('[class*="contentWrapper"]').first();
        await expect(contentWrapper).toBeVisible();
    });

    test('should trigger InfoCard expanded state rendering', async ({ page }) => {
        // In desktop TimelineSlideDesktop, all InfoCards have isExpanded={true}
        await page.locator('#london').scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        const cards = page.locator('.glass-card');
        const cardCount = await cards.count();

        // All cards should be visible and expanded
        for (let i = 0; i < Math.min(cardCount, 3); i++) {
            const card = cards.nth(i);

            // Card should be visible with full content
            await expect(card).toBeVisible();

            // Check that card has actual text content (not collapsed)
            const content = await card.textContent();
            expect(content.length).toBeGreaterThan(20); // More than just title
        }
    });

    test('should trigger multi-location vs single-location layout logic', async ({ page }) => {
        // Education section has 2 locations (multi-location layout)
        await page.locator('#education').scrollIntoViewIfNeeded();
        await page.waitForTimeout(800);

        // Check for multi-location row layout
        const multiLocationRow = page.locator('[class*="multiLocationRow"]');
        const hasMultiLayout = await multiLocationRow.count();

        // If education has multiple locations, verify layout
        if (hasMultiLayout > 0) {
            await expect(multiLocationRow).toBeVisible();
        }

        // Navigate to a single-location section
        await page.locator('#budapest').scrollIntoViewIfNeeded();
        await page.waitForTimeout(800);

        // Should have single location layout
        const section = page.locator('#budapest');
        await expect(section).toBeVisible();
    });

    test('should trigger active section detection in StoryNavigator', async ({ page }) => {
        const nav = page.locator('.story-navigator');

        // Scroll through sections and verify active state updates
        const sections = [
            { id: 'intro', selector: '[href="#intro"]' },
            { id: 'education', selector: '[href="#education"]' },
            { id: 'budapest', selector: '[href="#budapest"]' }
        ];

        for (const { id, selector } of sections) {
            // Scroll to section
            await page.locator(`#${id}`).scrollIntoViewIfNeeded();
            await page.waitForTimeout(1500); // Wait for intersection observer

            // Check that this section's nav dot has active class
            const navLink = nav.locator(selector);
            await expect(navLink).toHaveClass(/active/, { timeout: 3000 });
        }
    });
});
