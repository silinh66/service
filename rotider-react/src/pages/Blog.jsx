import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';
import postsData from '../data/postsData';

const Blog = () => {
    const [activeFilter, setActiveFilter] = useState("All Blogs");
    const filters = ["All Blogs", "Web Design & Digital Identity", "Video & Visuals", "Personal Branding Strategy"];

    // Helper to get posts by category
    const getPostsByCategory = (category) => {
        return postsData.filter(post => post.category === category);
    };

    const videoPosts = getPostsByCategory("Video & Visuals");
    const webDesignPosts = getPostsByCategory("Web Design & Digital Identity");
    const brandingPosts = getPostsByCategory("Personal Branding Strategy");

    // Get recent posts (just taking the first 3 for now, or could sort by date)
    const recentPosts = postsData.slice(0, 3);

    // Featured posts for each section
    const featuredVideo = videoPosts[0];
    const featuredWeb = webDesignPosts[0];
    const featuredBranding = brandingPosts[0];

    // Specific featured post for "All Blogs" tab
    const globalFeaturedPost = postsData.find(post => post.title === "Why Everyone Needs a Personal Website") || featuredWeb;

    // Filter logic for the main grid (if we were showing a single grid, but we have sections)
    // For this design, we show sections. If "All Blogs" is selected, show all sections.
    // If a specific category is selected, scroll to that section or show only that section.
    // For simplicity, let's just show all sections for now, or filter visibility.

    return (
        <div className="blog-page">
            {/* Hero Section */}
            <div className="blog-hero">
                <div className="blog-hero-content">
                    <p className="blog-hero-subtitle">Our Blog</p>
                    <h1 className="blog-hero-title">BLOGS</h1>
                    <p className="blog-hero-desc">
                        Read our latest articles on web design, video editing, and personal branding.
                    </p>
                </div>
                <div className="blog-hero-overlay"></div>
                <img
                    src="https://res.cloudinary.com/dw5j6ht9n/image/upload/v1763972107/unnamed_nwrr0q.jpg"
                    alt="Blog Hero"
                    className="blog-hero-bg"
                />
            </div>

            {/* Filter Bar */}
            <div className="blog-filters">
                {filters.map((filter, index) => (
                    <button
                        key={index}
                        className={`blog-filter-btn ${activeFilter === filter ? 'active' : ''}`}
                        onClick={() => setActiveFilter(filter)}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            <div className="blog-container">
                {/* Featured Top Post (Global) */}
                {activeFilter === "All Blogs" && (
                    <div className="blog-featured-top">
                        <div className="blog-featured-content">
                            <div className="blog-meta">
                                <span className="blog-category">{globalFeaturedPost?.category}</span>
                                <span className="blog-date"> • {globalFeaturedPost?.date}</span>
                            </div>
                            <h2 className="blog-featured-title">
                                <Link to={`/blog/${globalFeaturedPost?.slug}`}>{globalFeaturedPost?.title}</Link>
                            </h2>
                            <p className="blog-featured-excerpt">
                                {globalFeaturedPost?.excerpt}
                            </p>
                        </div>
                        <div className="blog-featured-image">
                            <Link to={`/blog/${globalFeaturedPost?.slug}`}>
                                <img src={globalFeaturedPost?.image} alt={globalFeaturedPost?.title} />
                            </Link>
                        </div>
                    </div>
                )}

                {/* Featured Top Post (Category Specific) */}
                {activeFilter !== "All Blogs" && (
                    <div className="blog-featured-top">
                        <div className="blog-featured-content">
                            <div className="blog-meta">
                                <span className="blog-category">{activeFilter === "Video & Visuals" ? featuredVideo?.category : activeFilter === "Web Design & Digital Identity" ? featuredWeb?.category : featuredBranding?.category}</span>
                                <span className="blog-date"> • {activeFilter === "Video & Visuals" ? featuredVideo?.date : activeFilter === "Web Design & Digital Identity" ? featuredWeb?.date : featuredBranding?.date}</span>
                            </div>
                            <h2 className="blog-featured-title">
                                <Link to={`/blog/${activeFilter === "Video & Visuals" ? featuredVideo?.slug : activeFilter === "Web Design & Digital Identity" ? featuredWeb?.slug : featuredBranding?.slug}`}>
                                    {activeFilter === "Video & Visuals" ? featuredVideo?.title : activeFilter === "Web Design & Digital Identity" ? featuredWeb?.title : featuredBranding?.title}
                                </Link>
                            </h2>
                            <p className="blog-featured-excerpt">
                                {activeFilter === "Video & Visuals" ? featuredVideo?.excerpt : activeFilter === "Web Design & Digital Identity" ? featuredWeb?.excerpt : featuredBranding?.excerpt}
                            </p>
                        </div>
                        <div className="blog-featured-image">
                            <Link to={`/blog/${activeFilter === "Video & Visuals" ? featuredVideo?.slug : activeFilter === "Web Design & Digital Identity" ? featuredWeb?.slug : featuredBranding?.slug}`}>
                                <img src={activeFilter === "Video & Visuals" ? featuredVideo?.image : activeFilter === "Web Design & Digital Identity" ? featuredWeb?.image : featuredBranding?.image} alt="Featured" />
                            </Link>
                        </div>
                    </div>
                )}

                {/* Recent Blog Posts */}
                {activeFilter === "All Blogs" && (
                    <div className="blog-section">
                        <h3 className="blog-section-title">Recent blog posts</h3>
                        <div className="blog-grid">
                            {recentPosts.map(post => (
                                <div key={post.id} className="blog-card">
                                    <div className="blog-card-image">
                                        <Link to={`/blog/${post.slug}`}>
                                            <img src={post.image} alt={post.title} />
                                        </Link>
                                    </div>
                                    <div className="blog-card-content">
                                        <div className="blog-meta">
                                            <span className="blog-category">{post.category}</span>
                                            <span className="blog-date"> • {post.date}</span>
                                        </div>
                                        <h4 className="blog-card-title">
                                            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                                        </h4>
                                        <p className="blog-card-excerpt">
                                            {post.excerpt.substring(0, 100)}...
                                        </p>
                                        <Link to={`/blog/${post.slug}`} className="blog-card-arrow">↗</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Web Design & Digital Identity Section */}
                {(activeFilter === "All Blogs" || activeFilter === "Web Design & Digital Identity") && (
                    <div className="blog-section">
                        <h3 className="blog-section-title">Web Design & Digital Identity</h3>
                        <div className="blog-featured-mid">
                            <div className="blog-featured-mid-image">
                                <Link to={`/blog/${activeFilter === "All Blogs" ? webDesignPosts[1]?.slug : featuredWeb?.slug}`}>
                                    <img src={activeFilter === "All Blogs" ? webDesignPosts[1]?.image : featuredWeb?.image} alt={activeFilter === "All Blogs" ? webDesignPosts[1]?.title : featuredWeb?.title} />
                                </Link>
                            </div>
                            <div className="blog-featured-mid-content">
                                <div className="blog-meta">
                                    <span className="blog-category">{activeFilter === "All Blogs" ? webDesignPosts[1]?.category : featuredWeb?.category}</span>
                                    <span className="blog-date"> • {activeFilter === "All Blogs" ? webDesignPosts[1]?.date : featuredWeb?.date}</span>
                                </div>
                                <h3 className="blog-featured-mid-title">
                                    <Link to={`/blog/${activeFilter === "All Blogs" ? webDesignPosts[1]?.slug : featuredWeb?.slug}`}>
                                        {activeFilter === "All Blogs" ? webDesignPosts[1]?.title : featuredWeb?.title}
                                    </Link>
                                </h3>
                                <p className="blog-featured-mid-excerpt">
                                    {activeFilter === "All Blogs" ? webDesignPosts[1]?.excerpt : featuredWeb?.excerpt}
                                </p>
                            </div>
                        </div>
                        <div className="blog-grid">
                            {(activeFilter === "All Blogs" ? webDesignPosts.slice(2, 5) : webDesignPosts.slice(1, 4)).map(post => (
                                <div key={post.id} className="blog-card">
                                    <div className="blog-card-image">
                                        <Link to={`/blog/${post.slug}`}>
                                            <img src={post.image} alt={post.title} />
                                        </Link>
                                    </div>
                                    <div className="blog-card-content">
                                        <div className="blog-meta">
                                            <span className="blog-category">{post.category}</span>
                                            <span className="blog-date"> • {post.date}</span>
                                        </div>
                                        <h4 className="blog-card-title">
                                            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                                        </h4>
                                        <p className="blog-card-excerpt">
                                            {post.excerpt.substring(0, 80)}...
                                        </p>
                                        <Link to={`/blog/${post.slug}`} className="blog-card-arrow">↗</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="blog-read-more-container">
                            <button className="blog-read-more-btn">Read more</button>
                        </div>
                    </div>
                )}

                {/* Video & Visuals Section */}
                {(activeFilter === "All Blogs" || activeFilter === "Video & Visuals") && (
                    <div className="blog-section">
                        <h3 className="blog-section-title">Video & Visuals</h3>
                        <div className="blog-featured-mid">
                            <div className="blog-featured-mid-image">
                                <Link to={`/blog/${featuredVideo?.slug}`}>
                                    <img src={featuredVideo?.image} alt={featuredVideo?.title} />
                                </Link>
                            </div>
                            <div className="blog-featured-mid-content">
                                <div className="blog-meta">
                                    <span className="blog-category">{featuredVideo?.category}</span>
                                    <span className="blog-date"> • {featuredVideo?.date}</span>
                                </div>
                                <h3 className="blog-featured-mid-title">
                                    <Link to={`/blog/${featuredVideo?.slug}`}>{featuredVideo?.title}</Link>
                                </h3>
                                <p className="blog-featured-mid-excerpt">
                                    {featuredVideo?.excerpt}
                                </p>
                            </div>
                        </div>
                        <div className="blog-grid">
                            {videoPosts.slice(1, 4).map(post => (
                                <div key={post.id} className="blog-card">
                                    <div className="blog-card-image">
                                        <Link to={`/blog/${post.slug}`}>
                                            <img src={post.image} alt={post.title} />
                                        </Link>
                                    </div>
                                    <div className="blog-card-content">
                                        <div className="blog-meta">
                                            <span className="blog-category">{post.category}</span>
                                            <span className="blog-date"> • {post.date}</span>
                                        </div>
                                        <h4 className="blog-card-title">
                                            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                                        </h4>
                                        <p className="blog-card-excerpt">
                                            {post.excerpt.substring(0, 80)}...
                                        </p>
                                        <Link to={`/blog/${post.slug}`} className="blog-card-arrow">↗</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="blog-read-more-container">
                            <button className="blog-read-more-btn">Read more</button>
                        </div>
                    </div>
                )}

                {/* Personal Branding Strategy Section */}
                {(activeFilter === "All Blogs" || activeFilter === "Personal Branding Strategy") && (
                    <div className="blog-section">
                        <h3 className="blog-section-title">Personal Branding Strategy</h3>
                        <div className="blog-featured-mid">
                            <div className="blog-featured-mid-image">
                                <Link to={`/blog/${featuredBranding?.slug}`}>
                                    <img src={featuredBranding?.image} alt={featuredBranding?.title} />
                                </Link>
                            </div>
                            <div className="blog-featured-mid-content">
                                <div className="blog-meta">
                                    <span className="blog-category">{featuredBranding?.category}</span>
                                    <span className="blog-date"> • {featuredBranding?.date}</span>
                                </div>
                                <h3 className="blog-featured-mid-title">
                                    <Link to={`/blog/${featuredBranding?.slug}`}>{featuredBranding?.title}</Link>
                                </h3>
                                <p className="blog-featured-mid-excerpt">
                                    {featuredBranding?.excerpt}
                                </p>
                            </div>
                        </div>
                        <div className="blog-grid">
                            {brandingPosts.slice(1, 4).map(post => (
                                <div key={post.id} className="blog-card">
                                    <div className="blog-card-image">
                                        <Link to={`/blog/${post.slug}`}>
                                            <img src={post.image} alt={post.title} />
                                        </Link>
                                    </div>
                                    <div className="blog-card-content">
                                        <div className="blog-meta">
                                            <span className="blog-category">{post.category}</span>
                                            <span className="blog-date"> • {post.date}</span>
                                        </div>
                                        <h4 className="blog-card-title">
                                            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                                        </h4>
                                        <p className="blog-card-excerpt">
                                            {post.excerpt.substring(0, 80)}...
                                        </p>
                                        <Link to={`/blog/${post.slug}`} className="blog-card-arrow">↗</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Blog;
