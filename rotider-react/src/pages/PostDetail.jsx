import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import postsData from "../data/postsData";
import "./PostDetail.css";

const PostDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Find post by slug from local data
        const foundPost = postsData.find(p => p.slug === slug);

        if (foundPost) {
            setPost(foundPost);
            setLoading(false);
            // Scroll to top
            window.scrollTo(0, 0);
        } else {
            // Fallback or error
            setLoading(false);
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="pd-loading">
                <div className="spinner"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="pd-error">
                <h2>Post not found</h2>
                <button onClick={() => navigate("/blog")}>Back to Blog</button>
            </div>
        );
    }

    return (
        <div className="post-detail-page">
            {/* Hero Section */}
            <div className="pd-hero" style={{ backgroundImage: `url(${post.image})` }}>
                <div className="pd-hero-content">
                    <span className="pd-category">{post.category}</span>
                    <h1 className="pd-title">{post.title}</h1>
                    <div className="pd-meta">
                        <span>By {post.author_name}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.views} views</span>
                    </div>
                </div>
            </div>

            <div className="pd-container">
                {/* Main Content */}
                <div className="pd-content-wrapper">
                    {/* Table of Contents (Inline for mobile/desktop) */}
                    <div className="pd-toc-box">
                        <h3 className="pd-toc-title">Table of Contents</h3>
                        <ul className="pd-toc-list">
                            <li><a href="#why-this-matters">Why This Matters</a></li>
                            <li><a href="#key-takeaways">Key Takeaways</a></li>
                            <li><a href="#deep-dive">Deep Dive</a></li>
                            <li><a href="#conclusion">Conclusion</a></li>
                        </ul>
                    </div>

                    {/* Article Content */}
                    <div
                        className="pd-article"
                        dangerouslySetInnerHTML={{
                            __html: post.content
                                // Add IDs to headings for TOC linking (simple replace since we know the structure)
                                .replace('<h2>Why This Matters</h2>', '<h2 id="why-this-matters">Why This Matters</h2>')
                                .replace('<h2>Key Takeaways</h2>', '<h2 id="key-takeaways">Key Takeaways</h2>')
                                .replace('<h2>Deep Dive</h2>', '<h2 id="deep-dive">Deep Dive</h2>')
                                .replace('<h2>Conclusion</h2>', '<h2 id="conclusion">Conclusion</h2>')
                        }}
                    />

                    {/* Navigation Footer */}
                    <div style={{ marginTop: "60px", textAlign: "center" }}>
                        <Link to="/blog" className="button primary" style={{ padding: "12px 30px", backgroundColor: "#f39c12", color: "#fff", textDecoration: "none", borderRadius: "4px", fontWeight: "600" }}>
                            View More Posts
                        </Link>
                    </div>
                </div>

                {/* Sidebar (Desktop Only) */}
                <aside className="pd-sidebar">
                    <div className="pd-sidebar-widget">
                        <h4 className="pd-sidebar-title">About ZooZoo</h4>
                        <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "#666" }}>
                            We are a creative studio dedicated to helping you build your personal brand and digital presence.
                        </p>
                    </div>

                    <div className="pd-sidebar-widget">
                        <h4 className="pd-sidebar-title">Share this post</h4>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button style={{ padding: "8px 16px", background: "#3b5998", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Facebook</button>
                            <button style={{ padding: "8px 16px", background: "#1da1f2", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Twitter</button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default PostDetail;
