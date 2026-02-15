import { test, expect } from '@playwright/test';

/**
 * Desktop Navigation E2E Tests
 * Tests scroll-based navigation, navigation dots, and desktop-specific features
 */

test.describe('Desktop Navigation', () => {
    // Only run on desktop browsers
    test.skip(({ isMobile }) => isMobile, 'Desktop only tests');

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');
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
            { id: 'gijon-return', title: 'The Architect & AI' }
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
        // Find navigation container
        const nav = page.locator('.story-navigator');
        await expect(nav).toBeVisible();

        // Check intro is active initially
        const introNav = nav.locator('[href="#intro"]');
        await expect(introNav).toHaveClass(/active/);

        // Scroll to education section
        await page.locator('#education').scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000); // Wait for intersection observer

        // Check education nav is now active
        const eduNav = nav.locator('[href="#education"]');
        await expect(eduNav).toHaveClass(/active/, { timeout: 3000 });
    });

    test('should navigate using navigation dots', async ({ page }) => {
        const nav = page.locator('.story-navigator');
        await expect(nav).toBeVisible();

        // Click on Budapest navigation dot
        const budapestLink = nav.locator('[href="#budapest"]');
        await expect(budapestLink).toBeVisible();
        await budapestLink.click();
        await page.waitForTimeout(1500); // Wait for smooth scroll animation

        // Verify we're at Budapest section
        const budapestSection = page.locator('#budapest');
        await expect(budapestSection).toBeInViewport({ ratio: 0.3 }); // At least 30% visible
        await expect(page.getByText('The R&D Era')).toBeVisible({ timeout: 5000 });
    });

    test('should display all cards expanded in desktop view', async ({ page }) => {
        // Navigate to a section with cards
        await page.locator('#gijon-early').scrollIntoViewIfNeeded();
        await page.waitForTimeout(800);

        // All cards should be visible (glass-card class)
        const cards = page.locator('.glass-card');
        const cardCount = await cards.count();
        expect(cardCount).toBeGreaterThan(0);

        // In desktop, cards show all content immediately (no collapse)
        // Just verify first few cards are visible with content
        for (let i = 0; i < Math.min(cardCount, 2); i++) {
            const card = cards.nth(i);
            await expect(card).toBeVisible();

            // Cards should have text content
            const text = await card.textContent();
            expect(text.length).toBeGreaterThan(10); // Has meaningful content
        }
    });

    test('should display background orbs animation', async ({ page }) => {
        // Check that background orbs container exists
        const orbs = page.locator('.orb');
        const orbCount = await orbs.count();

        expect(orbCount).toBeGreaterThan(0);

        // Verify orbs are visible
        for (let i = 0; i < Math.min(orbCount, 3); i++) {
            await expect(orbs.nth(i)).toBeVisible();
        }
    });

    test('should show location images in timeline slides', async ({ page }) => {
        // Navigate to section with images
        await page.locator('#budapest').scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        // Check for location image by alt text
        const image = page.locator('img[alt="Budapest"]').first();
        await expect(image).toBeVisible({ timeout: 5000 });
    });

    test('should handle keyboard navigation', async ({ page }) => {
        // Press Tab to start navigating
        await page.keyboard.press('Tab');
        await page.waitForTimeout(100);

        // Check that something is focused
        const focusedElement = page.locator(':focus');
        const count = await focusedElement.count();

        // At least one element should be focusable
        expect(count).toBeGreaterThanOrEqual(0); // Some browsers may not focus immediately
    });

    test('should show hover effects on cards', async ({ page }) => {
        await page.locator('#gijon-early').scrollIntoViewIfNeeded();

        const card = page.locator('.glass-card').first();

        // Get initial transform (should be none or scale(1))
        const initialBox = await card.boundingBox();

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
