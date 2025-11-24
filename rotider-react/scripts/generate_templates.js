import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatesDir = path.join(__dirname, '../public/WebsiteTemplate');
const outputDir = path.join(__dirname, '../src/data');
const outputFile = path.join(outputDir, 'templates.json');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

function getDirectories(srcPath) {
    return fs.readdirSync(srcPath).filter(file => {
        return fs.statSync(path.join(srcPath, file)).isDirectory();
    });
}

function findHtmlFile(dirPath) {
    const files = fs.readdirSync(dirPath);
    // Filter for .html files
    const htmlFiles = files.filter(file => file.endsWith('.html'));

    if (htmlFiles.length === 0) return null;

    // If index.html exists, use it
    if (htmlFiles.includes('index.html')) return 'index.html';

    // Otherwise, pick the first one (or logic to pick the "main" one)
    return htmlFiles[0];
}

function findImageFile(dirPath) {
    const files = fs.readdirSync(dirPath);
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp'];

    let imageFile = files.find(file => imageExtensions.includes(path.extname(file).toLowerCase()));

    if (imageFile) return imageFile;

    // If not found, check subdirectories (e.g., "Architecture services_files")
    const subDirs = files.filter(file => fs.statSync(path.join(dirPath, file)).isDirectory());

    for (const subDir of subDirs) {
        const subDirPath = path.join(dirPath, subDir);
        const subFiles = fs.readdirSync(subDirPath);
        imageFile = subFiles.find(file => imageExtensions.includes(path.extname(file).toLowerCase()));
        if (imageFile) return path.join(subDir, imageFile);
    }

    return null; // No image found
}

const templates = [];
const directories = getDirectories(templatesDir);

console.log(`Found ${directories.length} template directories.`);

directories.forEach((dir, index) => {
    const dirPath = path.join(templatesDir, dir);
    const htmlFile = findHtmlFile(dirPath);

    if (htmlFile) {
        // Rename to index.html if it's not already
        if (htmlFile !== 'index.html') {
            const oldPath = path.join(dirPath, htmlFile);
            const newPath = path.join(dirPath, 'index.html');
            fs.renameSync(oldPath, newPath);
            console.log(`Renamed ${htmlFile} to index.html in ${dir}`);
        }

        const imagePath = findImageFile(dirPath);

        let imageUrl = 'https://via.placeholder.com/300x200?text=No+Image';
        if (imagePath) {
            // Construct path relative to public
            imageUrl = `/WebsiteTemplate/${dir}/${imagePath}`;
        }

        templates.push({
            id: index + 1,
            title: dir.replace(/_/g, ' '), // Replace underscores with spaces for title
            tag: 'Website Template', // Generic tag for now
            tagColor: 'tag-blue',
            image: imageUrl,
            link: `/WebsiteTemplate/${dir}/index.html`
        });
    } else {
        console.warn(`No HTML file found in ${dir}`);
    }
});

fs.writeFileSync(outputFile, JSON.stringify(templates, null, 2));
console.log(`Generated ${templates.length} templates in ${outputFile}`);
