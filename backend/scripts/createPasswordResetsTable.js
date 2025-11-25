import pool from "../config/database.js";

const createTable = async () => {
    try {
        await pool.query(`
      CREATE TABLE IF NOT EXISTS password_resets (
        email VARCHAR(255) NOT NULL,
        token VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (token),
        INDEX (email)
      )
    `);
        console.log("password_resets table created successfully");
        process.exit(0);
    } catch (error) {
        console.error("Error creating table:", error);
        process.exit(1);
    }
};

createTable();
