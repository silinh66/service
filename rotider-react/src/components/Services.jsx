import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BeforeAfterSlider from "./BeforeAfterSlider";
import VideoPreview from "./VideoPreview";
import { postService } from "../services/postService";

const Services = () => {
  const [activeTab, setActiveTab] = useState("video-editing");
  const [videoPosts, setVideoPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [fullscreenVideo, setFullscreenVideo] = useState(null);

  useEffect(() => {
    if (activeTab === "video-editing") {
      loadVideoPosts();
    }
  }, [activeTab]);

  const loadVideoPosts = async () => {
    try {
      setLoadingPosts(true);
      const data = await postService.getAllPosts({
        category: "Video Editing",
        status: "published",
      });
      setVideoPosts(data);
    } catch (error) {
      console.error("Error loading video posts:", error);
    } finally {
      setLoadingPosts(false);
    }
  };

  const handleOpenVideo = (video) => {
    setFullscreenVideo(video);
  };

  const handleCloseVideo = () => {
    setFullscreenVideo(null);
  };

  return (
    <section className="modern-section" id="services">
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "10px" }}>OUR SERVICES</h2>
        <p style={{ color: "#666" }}>Let’s see what we have to offer</p>
      </div>

      <ul className="modern-tabs">
        <li
          className={`modern-tab ${activeTab === "video-editing" ? "active" : ""}`}
          onClick={() => setActiveTab("video-editing")}
        >
          Video Editing
        </li>
        <li
          className={`modern-tab ${activeTab === "website-designing" ? "active" : ""}`}
          onClick={() => setActiveTab("website-designing")}
        >
          Website Designing
        </li>
        <li
          className={`modern-tab ${activeTab === "virtual-services" ? "active" : ""}`}
          onClick={() => setActiveTab("virtual-services")}
        >
          Virtual Services
        </li>
      </ul>

      <div className="tab-panels">
        {/* Video Editing Panel */}
        {activeTab === "video-editing" && (
          <div className="fade-in">
            {loadingPosts ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <p>Loading posts...</p>
              </div>
            ) : (
              <div className="services-grid">
                {videoPosts.map((post) => (
                  <div key={post.id} className="service-card">
                    {post.videos && post.videos.length > 0 ? (
                      <VideoPreview
                        video={post.videos[0]}
                        thumbnail={post.featured_image}
                        onOpen={handleOpenVideo}
                      />
                    ) : (
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px", marginBottom: "15px" }}
                      />
                    )}
                    <h4 style={{ fontWeight: "bold", margin: "15px 0 10px" }}>{post.title}</h4>
                    <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "15px" }}>
                      {post.excerpt}
                    </p>
                    <Link to={`/blog/${post.slug}`} className="modern-btn primary" style={{ fontSize: "0.8rem", padding: "8px 16px" }}>
                      Read More
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Website Designing Panel */}
        {activeTab === "website-designing" && (
          <div className="services-grid fade-in">
            {[
              { title: "HDR", desc: "Taking multiple shots at different exposure levels.", before: "/assets/HDR-editing.jpg", after: "/assets/HDR-edited.jpg", link: "/hdr/" },
              { title: "Twilight", desc: "Creating a simulated sunset effect.", before: "/assets/tw-edited.jpg", after: "/assets/tw-editing.jpg", link: "/twilight/" },
              { title: "Day To Dusk", desc: "Transforming a daytime photo into a dusk scene.", before: "/assets/d2d-editing.jpg", after: "/assets/d2d-edited.jpg", link: "/day-to-dusk/" },
              { title: "Flash", desc: "Creating a perfect balance of light and shadow.", before: "/assets/flash-editing.jpg", after: "/assets/flash-edited.jpg", link: "/flash/" },
              { title: "Single", desc: "Processing a single image.", before: "/assets/single-edited.jpg", after: "/assets/single-editing.jpg", link: "/single/" },
              { title: "Remove", desc: "Removing unwanted elements.", before: "/assets/remove-editing.jpg", after: "/assets/remove-edited.jpg", link: "/remove/" },
            ].map((item, index) => (
              <div key={index} className="service-card">
                <div style={{ marginBottom: "15px", borderRadius: "8px", overflow: "hidden" }}>
                  <BeforeAfterSlider beforeImage={item.before} afterImage={item.after} />
                </div>
                <h4 style={{ fontWeight: "bold", marginBottom: "10px" }}>{item.title}</h4>
                <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "15px" }}>{item.desc}</p>
                <a href={item.link} className="modern-btn primary" style={{ fontSize: "0.8rem", padding: "8px 16px" }}>Learn More</a>
              </div>
            ))}
          </div>
        )}

        {/* Virtual Services Panel */}
        {activeTab === "virtual-services" && (
          <div className="services-grid fade-in">
            <div className="service-card">
              <img src="/assets/contemporary.jpg" alt="2D Floor Plan" style={{ width: "100%", borderRadius: "8px", marginBottom: "15px" }} />
              <h4 style={{ fontWeight: "bold", marginBottom: "10px" }}>2D Floor Plan</h4>
              <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "15px" }}>Offer detailed visual layouts of a property.</p>
              <a href="#" className="modern-btn primary" style={{ fontSize: "0.8rem", padding: "8px 16px" }}>Learn More</a>
            </div>
            <div className="service-card">
              <img src="/assets/Traditional-Style.jpg" alt="3D Floor Plan" style={{ width: "100%", borderRadius: "8px", marginBottom: "15px" }} />
              <h4 style={{ fontWeight: "bold", marginBottom: "10px" }}>3D Floor Plan</h4>
              <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "15px" }}>Help clients understand the layout and flow.</p>
              <a href="#" className="modern-btn primary" style={{ fontSize: "0.8rem", padding: "8px 16px" }}>Learn More</a>
            </div>
            <div className="service-card">
              <div style={{ marginBottom: "15px", borderRadius: "8px", overflow: "hidden" }}>
                <BeforeAfterSlider beforeImage="/assets/DSC06251-scaled.jpg" afterImage="/assets/DSC06251a-scaled.jpg" />
              </div>
              <h4 style={{ fontWeight: "bold", marginBottom: "10px" }}>Virtual Renovation</h4>
              <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "15px" }}>Show potential upgrades without physical changes.</p>
              <a href="#" className="modern-btn primary" style={{ fontSize: "0.8rem", padding: "8px 16px" }}>Learn More</a>
            </div>
            <div className="service-card">
              <div style={{ marginBottom: "15px", borderRadius: "8px", overflow: "hidden" }}>
                <BeforeAfterSlider beforeImage="/assets/Living-dining-room.jpeg" afterImage="/assets/Living-dining-room_1-1.jpg" />
              </div>
              <h4 style={{ fontWeight: "bold", marginBottom: "10px" }}>Virtual Staging</h4>
              <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "15px" }}>Add digital furniture to empty rooms.</p>
              <a href="#" className="modern-btn primary" style={{ fontSize: "0.8rem", padding: "8px 16px" }}>Learn More</a>
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Video Modal */}
      {fullscreenVideo && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.9)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={handleCloseVideo}
        >
          <button
            onClick={handleCloseVideo}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '30px',
              cursor: 'pointer',
              zIndex: 10000
            }}
          >
            ×
          </button>

          <div
            style={{ width: '90%', maxWidth: '1000px', aspectRatio: '16/9' }}
            onClick={e => e.stopPropagation()}
          >
            {fullscreenVideo.type === 'upload' && (
              <video
                src={fullscreenVideo.url}
                controls
                autoPlay
                style={{ width: '100%', height: '100%' }}
              />
            )}
            {fullscreenVideo.type === 'youtube' && (
              <iframe
                src={`https://www.youtube.com/embed/${(() => {
                  const match = fullscreenVideo.url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
                  return match ? match[1] : '';
                })()}?autoplay=1`}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="YouTube video"
              />
            )}
            {fullscreenVideo.type === 'vimeo' && (
              <iframe
                src={`https://player.vimeo.com/video/${(() => {
                  const match = fullscreenVideo.url.match(/vimeo\.com\/(\d+)/);
                  return match ? match[1] : '';
                })()}?autoplay=1`}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="autoplay; fullscreen"
                allowFullScreen
                title="Vimeo video"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
