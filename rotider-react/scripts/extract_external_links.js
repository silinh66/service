import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatesDir = path.join(__dirname, '../public/WebsiteTemplate');
const dataFile = path.join(__dirname, '../src/data/templates.json');

function extractLinks() {
    if (!fs.existsSync(dataFile)) {
        console.error('templates.json not found');
        return;
    }

    const templates = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    let updatedCount = 0;

    templates.forEach(template => {
        // Construct path to index.html based on the link property
        // link is like "/WebsiteTemplate/Architecture/index.html"
        const relativePath = template.link.replace(/^\//, '');
        const filePath = path.join(__dirname, '../public', relativePath);

        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');

            // Method 1: Look for "saved from url" comment
            // <!-- saved from url=(0093)https://up2client.com/... -->
            const savedFromMatch = content.match(/saved from url=\(\d+\)(https?:\/\/[^\s]+)/);

            if (savedFromMatch && savedFromMatch[1]) {
                template.externalLink = savedFromMatch[1];
                updatedCount++;
            } else {
                // Method 2: Look for logo link
                // <a href="..." class="logo">
                const logoMatch = content.match(/<a href="([^"]+)"[^>]*class="logo"/);
                if (logoMatch && logoMatch[1] && logoMatch[1].startsWith('http')) {
                    template.externalLink = logoMatch[1];
                    updatedCount++;
                } else {
                    console.log(`No external link found for ${template.title}`);
                }
            }
        } else {
            console.log(`File not found: ${filePath}`);
        }
    });

    fs.writeFileSync(dataFile, JSON.stringify(templates, null, 2));
    console.log(`Updated ${updatedCount} templates with external links.`);
}

extractLinks();
