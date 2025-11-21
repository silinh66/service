import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

async function fixFeaturedImageColumn() {
  let connection;

  try {
    // Connect to MySQL
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "tmkITC98",
      database: process.env.DB_NAME || "ZOOZOO_cms",
    });

    console.log("🔗 Connected to MySQL database");

    // Modify featured_image column to LONGTEXT to support base64 images
    await connection.query(`
      ALTER TABLE posts 
      MODIFY COLUMN featured_image LONGTEXT
    `);

    console.log('✅ Column "featured_image" has been changed to LONGTEXT');
    console.log("🎉 Migration completed successfully!");
  } catch (error) {
    console.error("❌ Error during migration:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
      console.log("👋 Database connection closed");
    }
  }
}

// Run the migration
fixFeaturedImageColumn()
  .then(() => {
    console.log("✨ All done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Migration failed:", error);
    process.exit(1);
  });
