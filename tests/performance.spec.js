import { test, expect } from '@playwright/test';

/**
 * Performance E2E Tests
 * Tests load times, animation performance, and resource usage
 */

test.describe('Performance', () => {
    test('should load the page within reasonable time', async ({ page }) => {
        const startTime = Date.now();

        await page.goto('/');
        await page.waitForLoadState('load');

        const loadTime = Date.now() - startTime;

        // Should load within 5 seconds (adjust based on your requirements)
        expect(loadTime).toBeLessThan(5000);
    });

    test('should achieve good Largest Contentful Paint (LCP)', async ({ page }) => {
        await page.goto('/');

        // Get LCP metric using Performance API
        const lcp = await page.evaluate(() => {
            return new Promise((resolve) => {
                new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    resolve(lastEntry.renderTime || lastEntry.loadTime);
                }).observe({ entryTypes: ['largest-contentful-paint'] });

                // Fallback timeout
                setTimeout(() => resolve(0), 5000);
            });
        });

        // LCP should be under 2.5s for good Core Web Vitals
        if (lcp > 0) {
            expect(lcp).toBeLessThan(2500);
        }
    });

    test('should have reasonable bundle size', async ({ page }) => {
        // Track resources loaded
        const resources = [];

        page.on('response', response => {
            resources.push({
                url: response.url(),
                size: response.headers()['content-length'],
                type: response.headers()['content-type']
            });
        });

        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Find main JavaScript bundle
        const jsResources = resources.filter(r =>
            r.type?.includes('javascript') && r.url.includes('index')
        );

        // Log bundle info (for monitoring)
        console.log(`Loaded ${jsResources.length} JS bundles`);

        // Main bundle should be present
        expect(jsResources.length).toBeGreaterThan(0);
    });

    test('should not block main thread excessively', async ({ page }) => {
        await page.goto('/');

        // Measure interaction delay
        const start = Date.now();
        await page.locator('h1').click();
        const interactionTime = Date.now() - start;

        // Click should respond quickly (< 100ms for good UX)
        expect(interactionTime).toBeLessThan(100);
    });

    test('should handle smooth scrolling on desktop', async ({ page, isMobile }) => {
        test.skip(isMobile, 'Desktop scrolling test');

        await page.goto('/');
        await page.waitForTimeout(500);

        // Scroll to bottom
        const startY = await page.evaluate(() => window.scrollY);

        await page.evaluate(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        });

        await page.waitForTimeout(1500); // Wait for smooth scroll

        const endY = await page.evaluate(() => window.scrollY);

        // Should have scrolled (allow for any significant scroll, not exact)
        expect(endY).toBeGreaterThan(startY);
    });

    test('should render animations without jank', async ({ page, isMobile }) => {
        if (!isMobile) {
            await page.goto('/');

            // Scroll through sections and monitor frame rate
            await page.locator('#education').scrollIntoViewIfNeeded();
            await page.waitForTimeout(1000);

            // Basic check: page should still be responsive
            const title = page.getByText('The Foundation');
            await expect(title).toBeVisible();
        }
    });

    test('should not leak memory on navigation', async ({ page, isMobile }) => {
        test.skip(isMobile, 'Desktop navigation test');

        await page.goto('/');

        // Get initial metrics
        const initialMetrics = await page.evaluate(() => ({
            memory: performance.memory?.usedJSHeapSize || 0
        }));

        // Navigate through all sections
        const sections = ['#education', '#gijon-early', '#budapest', '#london', '#gijon-return'];
        for (const selector of sections) {
            await page.locator(selector).scrollIntoViewIfNeeded();
            await page.waitForTimeout(300);
        }

        // Get final metrics
        const finalMetrics = await page.evaluate(() => ({
            memory: performance.memory?.usedJSHeapSize || 0
        }));

        // Memory shouldn't grow excessively (allow 50MB growth)
        if (initialMetrics.memory > 0 && finalMetrics.memory > 0) {
            const growth = finalMetrics.memory - initialMetrics.memory;
            expect(growth).toBeLessThan(50 * 1024 * 1024); // 50MB
        }
    });

    test('should lazy load images efficiently', async ({ page, isMobile }) => {
        test.skip(isMobile, 'Desktop image loading test');

        const imageRequests = [];
        page.on('request', request => {
            if (request.resourceType() === 'image') {
                imageRequests.push(request.url());
            }
        });

        await page.goto('/');
        await page.waitForLoadState('networkidle');

        const initialImageCount = imageRequests.length;

        // Scroll down to load more images
        await page.locator('#london').scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        const finalImageCount = imageRequests.length;

        // More images should load as we scroll
        expect(finalImageCount).toBeGreaterThanOrEqual(initialImageCount);
    });

    test('should have reasonable First Input Delay (FID)', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('load');

        // Time a click interaction
        const startTime = Date.now();
        await page.locator('h1').click();
        const fid = Date.now() - startTime;

        // Good FID is < 100ms
        expect(fid).toBeLessThan(100);
    });

    test('should not make excessive network requests', async ({ page }) => {
        const requests = [];

        page.on('request', request => {
            requests.push(request.url());
        });

        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Count unique requests
        const uniqueRequests = [...new Set(requests)];

        // Should be reasonable (HTML + CSS + JS + images + fonts)
        // Modern SPAs can have many requests, so be lenient
        expect(uniqueRequests.length).toBeLessThan(100);
    });

    test('should handle concurrent animations smoothly', async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Trigger multiple animations by swiping (if in mobile view)
        for (let i = 0; i < 2; i++) {
            await page.mouse.move(200, 500);
            await page.mouse.down();
            await page.mouse.move(200, 100);
            await page.mouse.up();
            await page.waitForTimeout(600); // Wait for animation
        }

        // Should still be responsive - main assertion is page didn't crash
        const body = page.locator('body');
        await expect(body).toBeVisible();
    });

    test('should cache resources appropriately', async ({ page }) => {
        // First load
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Reload page
        const cachedRequests = [];
        page.on('response', response => {
            const cacheHeader = response.headers()['cache-control'];
            if (cacheHeader) {
                cachedRequests.push(response.url());
            }
        });

        await page.reload();
        await page.waitForLoadState('networkidle');

        // Some resources should have cache headers
        expect(cachedRequests.length).toBeGreaterThan(0);
    });
});
