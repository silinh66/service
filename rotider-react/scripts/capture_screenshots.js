import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatesPath = path.join(__dirname, '../src/data/templates.json');
const thumbnailsDir = path.join(__dirname, '../public/assets/thumbnails');

// Ensure thumbnails directory exists
if (!fs.existsSync(thumbnailsDir)) {
    fs.mkdirSync(thumbnailsDir, { recursive: true });
}

const templates = JSON.parse(fs.readFileSync(templatesPath, 'utf-8'));
const baseUrl = 'http://localhost:5173'; // Assuming dev server is running here

(async () => {
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // Set viewport to a reasonable desktop size
    await page.setViewport({ width: 1280, height: 800 });

    console.log(`Starting capture for ${templates.length} templates...`);

    for (let i = 0; i < templates.length; i++) {
        const template = templates[i];
        const url = `${baseUrl}${template.link}`;
        const imageName = `thumbnail_${template.id}.jpg`;
        const imagePath = path.join(thumbnailsDir, imageName);

        console.log(`[${i + 1}/${templates.length}] Capturing ${template.title} (${url})...`);

        try {
            await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

            // Wait for 5 seconds to ensure everything is loaded
            await new Promise(resolve => setTimeout(resolve, 5000));

            // Take screenshot
            await page.screenshot({
                path: imagePath,
                type: 'jpeg',
                quality: 80,
                clip: {
                    x: 0,
                    y: 0,
                    width: 1280,
                    height: 800
                }
            });

            // Update template image path (relative to public)
            template.image = `/assets/thumbnails/${imageName}`;

        } catch (error) {
            console.error(`Failed to capture ${template.title}:`, error.message);
            // Keep original image or set to placeholder if failed
        }
    }

    await browser.close();

    // Save updated templates.json
    fs.writeFileSync(templatesPath, JSON.stringify(templates, null, 2));
    console.log('All done! Updated templates.json with new thumbnails.');
})();
