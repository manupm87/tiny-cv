import { test, expect } from '@playwright/test';

/**
 * Language selection E2E tests.
 * The language comes from the browser (navigator.languages) or an explicit saved choice -
 * never from a network lookup.
 */

const DOWNLOAD_LINK = 'a.download-button';

test.describe('Language detection', () => {
    test.describe('Spanish browser', () => {
        test.use({ locale: 'es-ES' });

        test('should render in Spanish without any geolocation request', async ({ page }) => {
            const requests = [];
            page.on('request', (request) => requests.push(request.url()));

            await page.goto('/');
            await page.waitForLoadState('networkidle');

            await expect(page.locator('html')).toHaveAttribute('lang', 'es');
            await expect(page.locator(DOWNLOAD_LINK)).toHaveText(/Descargar CV \(PDF, en inglés\)/);
            expect(requests.length).toBeGreaterThan(0);
            expect(requests.filter((url) => url.includes('ipapi'))).toEqual([]);

            // Auto-detection is not persisted: only an explicit choice is
            expect(await page.evaluate(() => localStorage.getItem('app-language'))).toBeNull();
        });

        test('should let an explicit choice win over the browser language and persist it', async ({ page }) => {
            await page.goto('/');
            await expect(page.locator('html')).toHaveAttribute('lang', 'es');

            await page.getByRole('button', { name: 'Cambiar idioma' }).click();
            await page.getByRole('button', { name: /English/ }).click();

            await expect(page.locator('html')).toHaveAttribute('lang', 'en');
            await expect(page.locator(DOWNLOAD_LINK)).toHaveText(/Download CV \(PDF\)/);
            expect(await page.evaluate(() => localStorage.getItem('app-language'))).toBe('en');

            // Survives a reload even though the browser still says Spanish
            await page.reload();
            await expect(page.locator('html')).toHaveAttribute('lang', 'en');
            await expect(page.locator(DOWNLOAD_LINK)).toHaveText(/Download CV \(PDF\)/);
        });
    });

    test.describe('English browser', () => {
        test.use({ locale: 'en-GB' });

        test('should render in English and offer the CV as a relative download', async ({ page }) => {
            await page.goto('/');

            await expect(page.locator('html')).toHaveAttribute('lang', 'en');
            const link = page.locator(DOWNLOAD_LINK);
            await expect(link).toHaveText(/Download CV \(PDF\)/);
            await expect(link).toHaveAttribute('download', '');
            // Relative, so it resolves under the /me/ sub-path in production
            await expect(link).toHaveAttribute('href', './CV-ManuelPerezMartinez-CloudArchitect-EN.pdf');

            const response = await page.request.get(await link.evaluate((a) => a.href));
            expect(response.status()).toBe(200);
            expect(response.headers()['content-type']).toContain('pdf');
        });
    });
});
