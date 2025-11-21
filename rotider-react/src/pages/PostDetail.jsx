import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { postService } from "../services/postService";

const PostDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadPost();
    }, [slug]);

    const loadPost = async () => {
        try {
            setLoading(true);
            const data = await postService.getPostBySlug(slug);
            setPost(data);

            // Increment view count
            await postService.incrementViews(data.id);
        } catch (err) {
            console.error("Error loading post:", err);
            setError("Unable to load post");
        } finally {
            setLoading(false);
        }
    };

    const renderVideo = (video) => {
        if (video.type === "youtube") {
            const videoId = extractYouTubeId(video.url);
            return (
                <div className="video-container" style={{ position: "relative", paddingBottom: "56.25%", height: 0, marginBottom: "20px" }}>
                    <iframe
                        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                        src={`https://www.youtube.com/embed/${videoId}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video.title || "YouTube video"}
                    ></iframe>
                </div>
            );
        } else if (video.type === "vimeo") {
            const videoId = extractVimeoId(video.url);
            return (
                <div className="video-container" style={{ position: "relative", paddingBottom: "56.25%", height: 0, marginBottom: "20px" }}>
                    <iframe
                        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                        src={`https://player.vimeo.com/video/${videoId}`}
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title={video.title || "Vimeo video"}
                    ></iframe>
                </div>
            );
        } else if (video.type === "upload") {
            return (
                <div className="video-container" style={{ marginBottom: "20px" }}>
                    <video
                        controls
                        style={{ width: "100%", maxHeight: "500px" }}
                        src={video.url}
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            );
        }
        return null;
    };

    const extractYouTubeId = (url) => {
        const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        return match ? match[1] : null;
    };

    const extractVimeoId = (url) => {
        const match = url.match(/vimeo\.com\/(\d+)/);
        return match ? match[1] : null;
    };

    if (loading) {
        return (
            <section className="section">
                <div className="section-content relative">
                    <div className="row">
                        <div className="col small-12">
                            <div style={{ textAlign: "center", padding: "100px 0" }}>
                                <p>Loading post...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error || !post) {
        return (
            <section className="section">
                <div className="section-content relative">
                    <div className="row">
                        <div className="col small-12">
                            <div style={{ textAlign: "center", padding: "100px 0" }}>
                                <p style={{ color: "#e74c3c", fontSize: "18px" }}>{error || "Post not found"}</p>
                                <button
                                    onClick={() => navigate("/")}
                                    className="button primary"
                                    style={{ marginTop: "20px" }}
                                >
                                    Back to Home
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="section" id="post-detail">
            <div className="section-content relative">
                <div className="row">
                    <div className="col small-12 large-10" style={{ margin: "0 auto" }}>
                        <div className="col-inner">
                            {/* Back button */}
                            <div style={{ marginBottom: "30px" }}>
                                <button
                                    onClick={() => navigate("/")}
                                    className="button secondary"
                                    style={{ fontSize: "14px", backgroundColor: "#f0f0f0", color: "#333" }}
                                >
                                    ← Back
                                </button>
                            </div>

                            {/* Post Card Container */}
                            <div style={{
                                backgroundColor: "#fff",
                                borderRadius: "12px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                overflow: "hidden",
                                marginBottom: "30px"
                            }}>
                                {/* Featured Image */}
                                {post.featured_image && (
                                    <div style={{ width: "100%" }}>
                                        <img
                                            src={post.featured_image}
                                            alt={post.title}
                                            style={{ width: "100%", height: "auto", display: "block" }}
                                        />
                                    </div>
                                )}

                                {/* Post Content Container */}
                                <div style={{ padding: "40px 30px" }}>
                                    {/* Post Header */}
                                    <div style={{ marginBottom: "30px" }}>
                                        {/* Category */}
                                        {post.category && (
                                            <div style={{ marginBottom: "15px" }}>
                                                <span
                                                    style={{
                                                        display: "inline-block",
                                                        padding: "6px 16px",
                                                        backgroundColor: "#3498db",
                                                        borderRadius: "20px",
                                                        fontSize: "12px",
                                                        fontWeight: "600",
                                                        color: "#fff",
                                                        textTransform: "uppercase",
                                                        letterSpacing: "0.5px"
                                                    }}
                                                >
                                                    {post.category}
                                                </span>
                                            </div>
                                        )}

                                        <h1 style={{
                                            fontSize: "32px",
                                            fontWeight: "700",
                                            marginBottom: "15px",
                                            lineHeight: "1.3",
                                            color: "#000"
                                        }}>
                                            {post.title}
                                        </h1>

                                        {/* Meta info */}
                                        <div style={{
                                            fontSize: "14px",
                                            color: "#666",
                                            marginBottom: "10px",
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: "15px",
                                            alignItems: "center"
                                        }}>
                                            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                                Posted by <strong style={{ color: "#333" }}>{post.author_name || "Admin"}</strong>
                                            </span>
                                            <span>•</span>
                                            <span>{new Date(post.created_at).toLocaleDateString("en-US")}</span>
                                            <span>•</span>
                                            <span>{post.views || 0} views</span>
                                        </div>
                                    </div>

                                    {/* Excerpt */}
                                    {post.excerpt && (
                                        <div
                                            style={{
                                                fontSize: "18px",
                                                color: "#555",
                                                fontStyle: "italic",
                                                marginBottom: "30px",
                                                paddingLeft: "20px",
                                                borderLeft: "4px solid #3498db",
                                                lineHeight: "1.6"
                                            }}
                                        >
                                            {post.excerpt}
                                        </div>
                                    )}

                                    {/* Post Content */}
                                    <div
                                        className="entry-content"
                                        style={{
                                            fontSize: "16px",
                                            lineHeight: "1.8",
                                            marginBottom: "40px",
                                            color: "#333"
                                        }}
                                        dangerouslySetInnerHTML={{ __html: post.content }}
                                    />

                                    {/* Videos Section */}
                                    {post.videos && post.videos.length > 0 && (
                                        <div style={{
                                            marginTop: "50px",
                                            paddingTop: "30px",
                                            borderTop: "2px solid #f0f0f0"
                                        }}>
                                            <h3 style={{
                                                fontSize: "24px",
                                                fontWeight: "700",
                                                marginBottom: "25px",
                                                color: "#000"
                                            }}>
                                                📹 Related Videos
                                            </h3>
                                            {post.videos.map((video, index) => (
                                                <div key={index} style={{ marginBottom: "30px" }}>
                                                    {renderVideo(video)}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Footer navigation */}
                            <div style={{ textAlign: "center", marginTop: "40px", marginBottom: "40px" }}>
                                <button
                                    onClick={() => navigate("/")}
                                    className="button primary"
                                    style={{
                                        padding: "12px 30px",
                                        fontSize: "16px",
                                        fontWeight: "600"
                                    }}
                                >
                                    View more posts
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
        #post-detail { 
          padding-top: 50px; 
          padding-bottom: 50px;
          background-color: #f9f9f9;
        }
        .entry-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 25px 0;
        }
        .entry-content p {
          margin-bottom: 16px;
        }
        .entry-content h1, 
        .entry-content h2, 
        .entry-content h3, 
        .entry-content h4 {
          margin-top: 35px;
          margin-bottom: 18px;
          font-weight: 700;
          color: #000;
          line-height: 1.3;
        }
        .entry-content h1 { font-size: 32px; }
        .entry-content h2 { font-size: 28px; }
        .entry-content h3 { font-size: 24px; }
        .entry-content h4 { font-size: 20px; }
        .entry-content ul, 
        .entry-content ol {
          margin-left: 25px;
          margin-bottom: 16px;
          line-height: 1.8;
        }
        .entry-content li {
          margin-bottom: 8px;
        }
        .entry-content blockquote {
          padding: 15px 20px;
          border-left: 4px solid #3498db;
          background-color: #f8f9fa;
          color: #555;
          font-style: italic;
          margin: 25px 0;
          border-radius: 4px;
        }
        .entry-content a {
          color: #3498db;
          text-decoration: underline;
        }
        .entry-content a:hover {
          color: #2980b9;
        }
        .entry-content strong {
          font-weight: 700;
          color: #000;
        }
        @media (max-width: 768px) {
          #post-detail .col-inner > div:first-child {
            padding: 25px 20px;
          }
          #post-detail h1 {
            font-size: 26px;
          }
        }
      `}</style>
        </section>
    );
};

export default PostDetail;
