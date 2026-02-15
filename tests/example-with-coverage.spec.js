import { test, expect } from '@playwright/test';
import { startCoverage, stopAndSaveCoverage } from './coverage-helper.js';

/**
 * Example: UI Tests with Coverage Collection
 * This demonstrates how to collect coverage during E2E tests
 */

test.describe('Tiny CV Application with Coverage', () => {

    test.beforeEach(async ({ page }) => {
        // Start coverage collection before each test
        await startCoverage(page);
        await page.goto('/');
    });

    test.afterEach(async ({ page }, testInfo) => {
        // Save coverage after each test
        await stopAndSaveCoverage(page, testInfo.title);
    });

    test('should load and show intro with coverage tracking', async ({ page }) => {
        await expect(page).toHaveTitle(/Manuel Pérez Martínez/i);

        const introHeading = page.getByRole('heading', { name: 'Manuel Pérez Martínez' });
        await expect(introHeading).toBeVisible();

        // Coverage is automatically collected for all code executed
    });

    test('should navigate through sections with coverage', async ({ page }) => {
        const sections = ['intro', 'education', 'gijon-early', 'budapest'];

        for (const sectionId of sections) {
            const section = page.locator(`#${sectionId}`);
            await section.scrollIntoViewIfNeeded();
            await page.waitForTimeout(300);

            await expect(section).toBeVisible();
        }

        // All navigation code is tracked in coverage
    });
});
