import pool from "../config/database.js";

const checkOrder = async () => {
    try {
        const [posts] = await pool.query("SELECT id, title, display_order FROM posts ORDER BY display_order ASC");
        console.log("Current Post Order:");
        posts.forEach(p => {
            console.log(`${p.id}: ${p.title} (Order: ${p.display_order})`);
        });
        process.exit(0);
    } catch (error) {
        console.error("Check failed:", error);
        process.exit(1);
    }
};

checkOrder();
