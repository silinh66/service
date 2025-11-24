import pool from "../config/database.js";

const runMigration = async () => {
    try {
        console.log("Adding display_order column to posts table...");

        // Check if column exists
        const [columns] = await pool.query(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'posts' AND COLUMN_NAME = 'display_order'
    `, [process.env.DB_NAME]);

        if (columns.length > 0) {
            console.log("Column display_order already exists.");
        } else {
            await pool.query(`
        ALTER TABLE posts 
        ADD COLUMN display_order INT DEFAULT 0
      `);
            console.log("Column display_order added successfully.");
        }

        process.exit(0);
    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    }
};

runMigration();
