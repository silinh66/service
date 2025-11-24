import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const addVideoFormatColumn = async () => {
    let connection;

    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        console.log("🔗 Connected to MySQL database");

        // Check if column already exists
        const [columns] = await connection.query(
            `SHOW COLUMNS FROM posts LIKE 'video_format'`
        );

        if (columns.length > 0) {
            console.log("✅ Column 'video_format' already exists");
            return;
        }

        // Add video_format column
        await connection.query(`
      ALTER TABLE posts 
      ADD COLUMN video_format ENUM('horizontal', 'vertical') NULL AFTER category,
      ADD INDEX idx_video_format (video_format)
    `);

        console.log("✅ Column 'video_format' added successfully");
        console.log("✅ Index 'idx_video_format' added successfully");
    } catch (error) {
        console.error("❌ Error adding video_format column:", error);
        throw error;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
};

// Run migration
addVideoFormatColumn()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
