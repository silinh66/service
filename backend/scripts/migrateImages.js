import mysql from "mysql2/promise";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrateImages = async () => {
    let connection;

    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        console.log("🔗 Connected to MySQL server");

        // Ensure uploads/images directory exists
        const imagesDir = path.join(__dirname, "../uploads/images");
        if (!fs.existsSync(imagesDir)) {
            fs.mkdirSync(imagesDir, { recursive: true });
            console.log("✅ Created uploads/images directory");
        }

        // Fetch posts with Base64 images
        const [posts] = await connection.query(
            "SELECT id, featured_image FROM posts WHERE featured_image LIKE 'data:image%'"
        );

        console.log(`Found ${posts.length} posts with Base64 images.`);

        for (const post of posts) {
            const base64Data = post.featured_image;
            const matches = base64Data.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);

            if (!matches || matches.length !== 3) {
                console.warn(`⚠️ Invalid Base64 format for post ${post.id}, skipping.`);
                continue;
            }

            const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
            const data = matches[2];
            const buffer = Buffer.from(data, "base64");

            const fileName = `post-${post.id}-${Date.now()}.` + ext;
            const filePath = path.join(imagesDir, fileName);

            fs.writeFileSync(filePath, buffer);

            const fileUrl = `/uploads/images/${fileName}`;

            await connection.query(
                "UPDATE posts SET featured_image = ? WHERE id = ?",
                [fileUrl, post.id]
            );

            console.log(`✅ Migrated post ${post.id}: ${fileUrl}`);
        }

        console.log("\n🎉 Migration completed successfully!");

    } catch (error) {
        console.error("❌ Error migrating images:", error);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
};

migrateImages();
