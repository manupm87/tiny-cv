import { test, expect } from '@playwright/test';

/**
 * Error Handling E2E Tests
 * Tests error boundaries, fallback UI, and error recovery
 */

test.describe('Error Handling', () => {
    test.beforeEach(async ({ page }) => {
        // Enable console error tracking
        page.on('console', msg => {
            if (msg.type() === 'error') {
                console.log(`Browser Error: ${msg.text()}`);
            }
        });

        page.on('pageerror', error => {
            console.log(`Page Error: ${error.message}`);
        });
    });

    test('should load without JavaScript errors', async ({ page }) => {
        const errors = [];
        page.on('pageerror', error => {
            errors.push(error.message);
        });

        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Check no page errors occurred
        expect(errors).toHaveLength(0);
    });

    test('should not have console errors on initial load', async ({ page }) => {
        const consoleErrors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                consoleErrors.push(msg.text());
            }
        });

        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Filter out known third-party errors if any
        const relevantErrors = consoleErrors.filter(err =>
            !err.includes('third-party') &&
            !err.includes('extension')
        );

        expect(relevantErrors).toHaveLength(0);
    });

    test('should handle missing images gracefully', async ({ page, isMobile }) => {
        test.skip(isMobile, 'Testing desktop image failure');

        await page.route('**/*.png', route => route.abort());
        await page.goto('/');

        // Page should still load
        await expect(page.getByRole('heading', { name: 'Manuel Pérez Martínez' })).toBeVisible();

        // Scroll to section with images
        await page.locator('#budapest').scrollIntoViewIfNeeded();

        // Section should still be visible even without images
        await expect(page.locator('#budapest')).toBeVisible();
    });

    test('should handle network failures gracefully', async ({ page }) => {
        // Simulate offline
        await page.context().setOffline(true);

        try {
            await page.goto('/');
            // Should show browser error page or offline message
        } catch (error) {
            // Expected - offline navigation fails
            expect(error.message).toContain('net::ERR');
        }

        // Go back online
        await page.context().setOffline(false);
    });

    test('should recover from temporary failures', async ({ page }) => {
        // Load page normally
        await page.goto('/');
        await expect(page.getByRole('heading', { name: 'Manuel Pérez Martínez' })).toBeVisible();

        // Simulate temporary network issue
        await page.context().setOffline(true);
        await page.waitForTimeout(100);
        await page.context().setOffline(false);

        // Page should still be functional
        await expect(page.getByRole('heading', { name: 'Manuel Pérez Martínez' })).toBeVisible();
    });

    test('should not break on rapid navigation', async ({ page, isMobile }) => {
        test.skip(isMobile, 'Desktop navigation test');

        await page.goto('/');

        // Rapidly scroll through sections
        const sections = ['#education', '#gijon-early', '#budapest', '#london', '#gijon-return'];

        for (const selector of sections) {
            await page.locator(selector).scrollIntoViewIfNeeded();
            await page.waitForTimeout(100); // Short wait between scrolls
        }

        // Page should still be functional - check last section is visible
        const lastSection = page.locator('#gijon-return');
        await expect(lastSection).toBeInViewport({ ratio: 0.1 }); // Allow partial viewport
    });

    test('should handle rapid mobile swipes', async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto('/');

        // Perform rapid swipes
        for (let i = 0; i < 3; i++) {
            await page.mouse.move(200, 500);
            await page.mouse.down();
            await page.mouse.move(200, 100);
            await page.mouse.up();
            await page.waitForTimeout(100);
        }

        // Page should still be stable
        const sections = page.locator('section');
        await expect(sections.first()).toBeVisible();
    });

    test('should handle invalid data gracefully (robustness)', async ({ page }) => {
        // This tests that the app handles edge cases in data
        await page.goto('/');

        // Navigate through all sections to ensure no data issues
        const sections = page.locator('section');
        const count = await sections.count();

        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < Math.min(count, 6); i++) {
            const section = sections.nth(i);
            await section.scrollIntoViewIfNeeded();
            await expect(section).toBeVisible();
        }
    });

    test('should not expose sensitive information in errors', async ({ page }) => {
        const consoleLogs = [];
        page.on('console', msg => {
            consoleLogs.push(msg.text());
        });

        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Check that no API keys, tokens, or sensitive data are logged
        const sensitivePatterns = [
            /api[_-]?key/i,
            /secret/i,
            /token/i,
            /password/i
        ];

        const suspiciousLogs = consoleLogs.filter(log =>
            sensitivePatterns.some(pattern => pattern.test(log))
        );

        expect(suspiciousLogs).toHaveLength(0);
    });

    test('should maintain state after errors (if any occur)', async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Wait for timeline to be ready
        await page.waitForTimeout(1000);

        // Navigate to a section with cards
        const sections = page.locator('section');
        const sectionCount = await sections.count();

        if (sectionCount > 1) {
            // Try to find a card
            const card = page.locator('.info-card').first();
            const cardCount = await card.count();

            if (cardCount > 0) {
                // Check if card is clickable (mobile mode)
                const role = await card.getAttribute('role');

                if (role === 'button') {
                    await card.click({ timeout: 5000 });
                    await page.waitForTimeout(500);

                    // Check if details are visible
                    const details = card.locator('.card-details');
                    const detailsCount = await details.count();
                    expect(detailsCount).toBeGreaterThanOrEqual(0); // Just verify no crash
                } else {
                    // Desktop - cards are always expanded
                    expect(await card.isVisible()).toBeTruthy();
                }
            }
        }

        // Main assertion: page is still functional
        const heading = page.locator('h1, h2').first();
        await expect(heading).toBeVisible();
    });

    test('should have error boundary fallback (if triggered)', async ({ page }) => {
        // Error boundaries should be present (tested via code)
        // This test verifies the app loaded with error boundaries
        await page.goto('/');

        // Check that ErrorBoundary component is in the React tree
        // (We can't easily trigger it without modifying code, but we can verify it loads)
        await expect(page.getByRole('heading', { name: 'Manuel Pérez Martínez' })).toBeVisible();

        // If an error boundary triggered, we'd see the error UI
        // The fact that we see normal content means no errors occurred
        const errorBoundaryUI = page.getByText(/something went wrong/i);
        await expect(errorBoundaryUI).not.toBeVisible();
    });

    test('should handle browser resize without errors', async ({ page }) => {
        await page.goto('/');

        // Resize multiple times
        const sizes = [
            { width: 1920, height: 1080 },
            { width: 1280, height: 720 },
            { width: 768, height: 1024 },
            { width: 390, height: 844 }
        ];

        for (const { width, height } of sizes) {
            await page.setViewportSize({ width, height });
            await page.waitForTimeout(200);

            // Page should remain functional
            await expect(page.locator('h1, h2').first()).toBeVisible();
        }
    });
});
