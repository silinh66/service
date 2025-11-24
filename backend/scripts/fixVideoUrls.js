import pool from "../config/database.js";

const fixVideoUrls = async () => {
    try {
        console.log("Starting video URL migration...");

        // Fetch all posts with videos
        const [posts] = await pool.query("SELECT id, videos FROM posts WHERE videos IS NOT NULL");

        console.log(`Found ${posts.length} posts with videos.`);

        let updatedCount = 0;

        for (const post of posts) {
            let videos = post.videos;
            let needsUpdate = false;

            // Parse videos if it's a string
            if (typeof videos === "string") {
                try {
                    videos = JSON.parse(videos);
                } catch (e) {
                    console.error(`Failed to parse videos for post ${post.id}:`, e);
                    continue;
                }
            }

            if (!Array.isArray(videos)) continue;

            // Check and update each video URL
            const updatedVideos = videos.map((video) => {
                if (video.url && video.url.includes("http://localhost:5001/uploads/")) {
                    needsUpdate = true;
                    return {
                        ...video,
                        url: video.url.replace("http://localhost:5001/uploads/", "/uploads/"),
                    };
                }
                return video;
            });

            if (needsUpdate) {
                const videosJson = JSON.stringify(updatedVideos);
                await pool.query("UPDATE posts SET videos = ? WHERE id = ?", [videosJson, post.id]);
                updatedCount++;
                console.log(`Updated post ${post.id}`);
            }
        }

        console.log(`Migration complete. Updated ${updatedCount} posts.`);
        process.exit(0);
    } catch (error) {
        console.error("Migration error:", error);
        process.exit(1);
    }
};

fixVideoUrls();
