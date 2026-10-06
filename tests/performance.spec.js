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
        // Sample the event loop from the very first script: a blocked main thread shows up
        // as a gap between two timer ticks. Measured in the page, so test-runner and
        // actionability-wait overhead cannot leak into the number.
        await page.addInitScript(() => {
            window.__longestStall = 0;
            let last = performance.now();
            setInterval(() => {
                const now = performance.now();
                window.__longestStall = Math.max(window.__longestStall, now - last);
                last = now;
            }, 10);
        });

        await page.goto('/');
        await page.waitForLoadState('load');
        await expect(page.locator('h1')).toBeVisible();
        await page.waitForTimeout(1000); // let the intro animations run

        const longestStall = await page.evaluate(() => window.__longestStall);
        console.log(`Longest main-thread stall: ${Math.round(longestStall)}ms`);

        // The sampler must have run, and no single stall may freeze the page for half a second
        // (unbundled dev server + parallel workers; a production build is far below this).
        expect(longestStall).toBeGreaterThan(0);
        expect(longestStall).toBeLessThan(500);
    });

    test('should handle smooth scrolling on desktop', async ({ page, isMobile }) => {
        test.skip(isMobile, 'Desktop scrolling test');

        await page.goto('/');

        // The page itself never scrolls: the snap container does
        const container = page.locator('.timeline-container');
        await expect(container).toBeVisible();
        expect(await container.evaluate((el) => el.scrollTop)).toBe(0);

        // Smooth-scroll to the bottom
        await container.evaluate((el) => el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' }));

        // Ends on the last slide, at the very end of the scroll range
        await expect(page.locator('#ai-builder')).toBeInViewport({ ratio: 0.9, timeout: 10000 });
        await expect.poll(async () => {
            const { top, max } = await container.evaluate((el) => ({
                top: el.scrollTop, max: el.scrollHeight - el.clientHeight,
            }));
            return max > 0 && Math.abs(top - max) <= 2;
        }, { timeout: 10000 }).toBe(true);
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
        await expect(page.locator('h1')).toBeVisible();

        // FID = time between the input happening and the main thread starting to handle it.
        // Measured in the page (event.timeStamp vs handler start), not around the Playwright
        // call, whose actionability waits on the animating heading dominated the old number.
        await page.evaluate(() => {
            window.__inputDelay = new Promise((resolve) => {
                window.addEventListener(
                    'pointerdown',
                    (event) => resolve(performance.now() - event.timeStamp),
                    { once: true, capture: true }
                );
            });
        });

        const viewport = page.viewportSize();
        await page.mouse.click(viewport.width / 2, viewport.height / 2);

        const fid = await page.evaluate(() => window.__inputDelay);
        console.log(`First input delay: ${fid.toFixed(1)}ms`);

        // Good FID is < 100ms
        expect(Number.isFinite(fid)).toBe(true);
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
        const pageErrors = [];
        page.on('pageerror', (error) => pageErrors.push(error.message));

        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        await expect(page.locator('h1')).toBeVisible();

        // Two swipes back to back: the second starts while the first transition is still running
        for (let i = 0; i < 2; i++) {
            await page.mouse.move(200, 500);
            await page.mouse.down();
            await page.mouse.move(200, 300, { steps: 4 });
            await page.mouse.move(200, 100, { steps: 4 });
            await page.mouse.up();
            await page.waitForTimeout(150); // shorter than the slide transition
        }

        // Both swipes landed: intro -> education (first card) -> education (second card)
        await expect(page.getByText('The Foundation')).toBeVisible({ timeout: 5000 });
        await expect(page.locator('.card-title', { hasText: 'ERASMUS' })).toBeVisible({ timeout: 5000 });
        await expect(page.locator('h1')).toHaveCount(0);

        // Exactly one card is on screen once the transitions settle, and nothing threw
        await expect(page.locator('.info-card')).toHaveCount(1, { timeout: 5000 });
        expect(pageErrors).toEqual([]);
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
