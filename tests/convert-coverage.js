import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import v8toIstanbul from 'v8-to-istanbul';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Convert Playwright V8 coverage to Istanbul format for nyc
 */
async function convertCoverage() {
    const nycOutputDir = path.join(__dirname, '..', '.nyc_output');
    const istanbulDir = path.join(__dirname, '..', '.nyc_output', 'istanbul');

    // Create istanbul directory
    if (!fs.existsSync(istanbulDir)) {
        fs.mkdirSync(istanbulDir, { recursive: true });
    }

    // Read all coverage files
    const coverageFiles = fs.readdirSync(nycOutputDir)
        .filter(f => f.startsWith('coverage-') && f.endsWith('.json'));

    console.log(`Found ${coverageFiles.length} coverage files to convert`);

    const istanbulCoverage = {};

    for (const file of coverageFiles) {
        const coveragePath = path.join(nycOutputDir, file);
        const coverageData = JSON.parse(fs.readFileSync(coveragePath, 'utf-8'));

        // Process JS coverage
        for (const entry of coverageData.js || []) {
            try {
                // Only process source files, not node_modules
                if (entry.url.includes('node_modules') || !entry.url.includes('/src/')) {
                    continue;
                }

                // Extract file path from URL
                const urlPath = new URL(entry.url).pathname;
                const srcIndex = urlPath.indexOf('/src/');
                if (srcIndex === -1) continue;

                const relativePath = urlPath.substring(srcIndex + 1);
                const absolutePath = path.join(__dirname, '..', relativePath);

                // Check if file exists
                if (!fs.existsSync(absolutePath)) {
                    continue;
                }

                // Convert to Istanbul format
                const converter = v8toIstanbul(absolutePath);
                await converter.load();
                converter.applyCoverage(entry.functions || []);

                const istanbulData = converter.toIstanbul();
                Object.assign(istanbulCoverage, istanbulData);

            } catch (err) {
                console.warn(`Warning: Could not convert ${entry.url}:`, err.message);
            }
        }
    }

    // Save converted coverage
    const outputFile = path.join(istanbulDir, 'coverage-final.json');
    fs.writeFileSync(outputFile, JSON.stringify(istanbulCoverage, null, 2));

    console.log(`✓ Converted coverage saved to: ${outputFile}`);
    console.log(`✓ Total files covered: ${Object.keys(istanbulCoverage).length}`);

    return Object.keys(istanbulCoverage).length > 0;
}

// Run conversion
convertCoverage()
    .then(success => {
        if (success) {
            console.log('\n✓ Coverage conversion complete!');
            console.log('Run: npm run coverage:e2e:report');
            process.exit(0);
        } else {
            console.warn('\n⚠ No coverage data could be converted');
            process.exit(1);
        }
    })
    .catch(err => {
        console.error('Error converting coverage:', err);
        process.exit(1);
    });
