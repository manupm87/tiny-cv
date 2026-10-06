import sharp from 'sharp';
import { readdirSync, mkdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(root, 'resources/images-src');
const outDir = path.join(root, 'src/assets/images');
const SIZES = [
    { suffix: '', width: 1100, quality: 78 },
    { suffix: '-small', width: 550, quality: 78 },
];

mkdirSync(outDir, { recursive: true });
for (const file of readdirSync(srcDir).filter((f) => f.endsWith('.png'))) {
    const name = path.parse(file).name;
    for (const { suffix, width, quality } of SIZES) {
        const out = path.join(outDir, `${name}${suffix}.webp`);
        await sharp(path.join(srcDir, file))
            .resize({ width })
            .webp({ quality, alphaQuality: 90, effort: 6 })
            .toFile(out);
        console.log(`${path.relative(root, out)} ${(statSync(out).size / 1024).toFixed(0)} kB`);
    }
}
