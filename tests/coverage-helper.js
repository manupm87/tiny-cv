import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Playwright Coverage Helper
 * Collects V8 coverage from browser context during E2E tests
 */

export async function startCoverage(page) {
    // Start collecting coverage
    await Promise.all([
        page.coverage.startJSCoverage({
            resetOnNavigation: false,
        }),
        page.coverage.startCSSCoverage({
            resetOnNavigation: false,
        }),
    ]);
}

export async function stopAndSaveCoverage(page, testName) {
    // Stop coverage collection
    const [jsCoverage, cssCoverage] = await Promise.all([
        page.coverage.stopJSCoverage(),
        page.coverage.stopCSSCoverage(),
    ]);

    // Create coverage directory
    const coverageDir = path.join(__dirname, '..', '.nyc_output');
    if (!fs.existsSync(coverageDir)) {
        fs.mkdirSync(coverageDir, { recursive: true });
    }

    // Save coverage data
    const timestamp = Date.now();
    const safeName = testName.replace(/[^a-z0-9]/gi, '_');

    const coverageFile = path.join(
        coverageDir,
        `coverage-${safeName}-${timestamp}.json`
    );

    const coverage = {
        js: jsCoverage,
        css: cssCoverage,
    };

    fs.writeFileSync(coverageFile, JSON.stringify(coverage, null, 2));

    console.log(`Coverage saved to: ${coverageFile}`);
}
