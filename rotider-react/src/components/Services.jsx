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
    <section className="section" id="section_1420510211">
      <div className="section-bg fill"></div>
      <div className="section-content relative">
        <div className="row align-middle align-center" id="row-2007065556">
          <div id="col-221791228" className="col small-12 large-12">
            <div className="col-inner">
              <div className="container section-title-container sec2_title title-color">
                <h3 className="section-title section-title-center">
                  <b></b>
                  <span className="section-title-main">OUR SERVICES</span>
                  <b></b>
                </h3>
              </div>
              <p style={{ textAlign: "center" }}>
                Let’s see what we have to offer
              </p>
            </div>
          </div>

          <div id="col-509051115" className="col small-12 large-12">
            <div className="col-inner">
              <div className="tabbed-content sec3_tab">
                <ul
                  className="nav nav-simple nav-normal nav-size-normal nav-center"
                  role="tablist"
                >
                  <li
                    id="tab-video-editing"
                    className={`tab has-icon ${activeTab === "video-editing" ? "active" : ""
                      }`}
                    role="presentation"
                  >
                    <a
                      href="#tab_video-editing"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("video-editing");
                      }}
                      role="tab"
                      aria-selected={activeTab === "video-editing"}
                    >
                      <span>Video editing</span>
                    </a>
                  </li>
                  <li
                    id="tab-website-designing"
                    className={`tab has-icon ${activeTab === "website-designing" ? "active" : ""
                      }`}
                    role="presentation"
                  >
                    <a
                      href="#tab_website-designing"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("website-designing");
                      }}
                      role="tab"
                      aria-selected={activeTab === "website-designing"}
                    >
                      <span>Website Designing</span>
                    </a>
                  </li>

                  <li
                    id="tab-virtual-services"
                    className={`tab has-icon ${activeTab === "virtual-services" ? "active" : ""
                      }`}
                    role="presentation"
                  >
                    <a
                      href="#tab_virtual-services"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("virtual-services");
                      }}
                      role="tab"
                      aria-selected={activeTab === "virtual-services"}
                    >
                      <span>Virtual services</span>
                    </a>
                  </li>
                </ul>

                <div className="tab-panels">
                  {/* Video Editing Panel */}
                  <div
                    id="tab_video-editing"
                    className={`panel entry-content ${activeTab === "video-editing" ? "active" : ""
                      }`}
                    role="tabpanel"
                  >
                    {/* Blog Posts Section */}
                    {loadingPosts ? (
                      <div style={{ textAlign: "center", padding: "40px 0" }}>
                        <p>Loading posts...</p>
                      </div>
                    ) : videoPosts.length > 0 ? (
                      <>
                        <div
                          id="gap-blog-posts"
                          className="gap-element clearfix"
                          style={{ display: "block", height: "auto" }}
                        >
                          <style>{` #gap-blog-posts { padding-top: 50px; } `}</style>
                        </div>
                        <div className="container section-title-container">
                          <h3 className="section-title section-title-center">
                            <b></b>
                            <span className="section-title-main">
                              Latest Video Editing Articles
                            </span>
                            <b></b>
                          </h3>
                          <p style={{ textAlign: "center" }}>
                            Tips, tutorials and insights about video editing
                          </p>
                        </div>
                        <div className="row" id="row-blog-posts">
                          {videoPosts.map((post) => (
                            <div
                              key={post.id}
                              className="col medium-6 small-12 large-4"
                              style={{ marginBottom: "30px" }}
                            >
                              <div
                                className="col-inner box-shadow-1"
                                style={{ height: "100%" }}
                              >
                                {post.videos && post.videos.length > 0 ? (
                                  <VideoPreview
                                    video={post.videos[0]}
                                    thumbnail={post.featured_image}
                                    onOpen={handleOpenVideo}
                                  />
                                ) : (
                                  post.featured_image && (
                                    <div
                                      className="img has-hover x md-x lg-x y md-y lg-y"
                                      style={{ marginBottom: "15px" }}
                                    >
                                      <div className="img-inner dark">
                                        <img
                                          src={post.featured_image}
                                          alt={post.title}
                                          style={{
                                            width: "100%",
                                            height: "200px",
                                            objectFit: "cover",
                                          }}
                                        />
                                      </div>
                                    </div>
                                  )
                                )}
                                <div
                                  className="text bf_text_des"
                                  style={{
                                    textAlign: "center",
                                    padding: "0 15px",
                                  }}
                                >
                                  <h4>
                                    <strong>{post.title}</strong>
                                  </h4>
                                  {post.excerpt && (
                                    <p
                                      style={{ fontSize: "90%", color: "#666" }}
                                    >
                                      {post.excerpt}
                                    </p>
                                  )}
                                  <p style={{ fontSize: "80%", color: "#999" }}>
                                    By {post.author_name || "Admin"} |{" "}
                                    {new Date(
                                      post.created_at
                                    ).toLocaleDateString("vi-VN")}
                                  </p>
                                </div>
                                <Link
                                  to={`/blog/${post.slug}`}
                                  className="button primary is-link btn-learn-more"
                                  style={{ margin: "15px" }}
                                >
                                  <span>Read more</span>
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : null}
                  </div>

                  {/* Website Designing Panel */}
                  <div
                    id="tab_website-designing"
                    className={`panel entry-content ${activeTab === "website-designing" ? "active" : ""
                      }`}
                    role="tabpanel"
                  >
                    <div
                      id="gap-50248749"
                      className="gap-element clearfix"
                      style={{ display: "block", height: "auto" }}
                    >
                      <style>{` #gap-50248749 { padding-top: 30px; } `}</style>
                    </div>
                    <div className="row align-center" id="row-1141879485">
                      {/* HDR */}
                      <div
                        id="col-862663076"
                        className="col before-af-col medium-6 small-12 large-6"
                      >
                        <div className="col-inner box-shadow-1">
                          <div className="row row-collapse" id="row-1483536298">
                            <div className="col before-af-col small-12 large-12">
                              <div className="col-inner">
                                <BeforeAfterSlider
                                  beforeImage="/assets/HDR-editing.jpg"
                                  afterImage="/assets/HDR-edited.jpg"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="text bf_text_des"
                            style={{ textAlign: "center" }}
                          >
                            <h3>
                              <strong>HDR</strong>
                            </h3>
                            <p>
                              <span style={{ fontSize: "100%" }}>
                                Taking multiple shots at different exposure
                                levels and then combining them into a single
                                image.
                              </span>
                            </p>
                          </div>
                          <a
                            href="/hdr/"
                            className="button primary is-link btn-learn-more"
                          >
                            <span>Learn more</span>
                          </a>
                        </div>
                        <style>{` #col-862663076 > .col-inner { border-radius: 12px; } `}</style>
                      </div>

                      {/* Twilight */}
                      <div
                        id="col-517503980"
                        className="col before-af-col medium-6 small-12 large-6"
                      >
                        <div className="col-inner box-shadow-1">
                          <div className="row row-collapse" id="row-219410822">
                            <div className="col before-af-col small-12 large-12">
                              <div className="col-inner">
                                <BeforeAfterSlider
                                  beforeImage="/assets/tw-edited.jpg"
                                  afterImage="/assets/tw-editing.jpg"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="text bf_text_des"
                            style={{ textAlign: "center" }}
                          >
                            <h3>
                              <strong>Twilight</strong>
                            </h3>
                            <p>
                              <span style={{ fontSize: "100%" }}>
                                Creating a simulated sunset effect on daytime
                                photos by replacing the sky.
                              </span>
                            </p>
                          </div>
                          <a
                            href="/twilight/"
                            className="button primary is-link btn-learn-more"
                          >
                            <span>Learn more</span>
                          </a>
                        </div>
                        <style>{` #col-517503980 > .col-inner { border-radius: 12px; } `}</style>
                      </div>

                      {/* Day to Dusk */}
                      <div
                        id="col-166803865"
                        className="col before-af-col medium-6 small-12 large-6"
                      >
                        <div className="col-inner box-shadow-1">
                          <div className="row row-collapse" id="row-41800958">
                            <div className="col before-af-col small-12 large-12">
                              <div className="col-inner">
                                <BeforeAfterSlider
                                  beforeImage="/assets/d2d-editing.jpg"
                                  afterImage="/assets/d2d-edited.jpg"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="text bf_text_des"
                            style={{ textAlign: "center" }}
                          >
                            <h3>
                              <strong>Day To Dusk</strong>
                            </h3>
                            <p>
                              <span style={{ fontSize: "100%" }}>
                                Transforming a daytime photo into a dusk or
                                evening scene.
                              </span>
                            </p>
                          </div>
                          <a
                            href="/day-to-dusk/"
                            className="button primary is-link btn-learn-more"
                          >
                            <span>Learn more</span>
                          </a>
                        </div>
                        <style>{` #col-166803865 > .col-inner { border-radius: 12px; } `}</style>
                      </div>

                      {/* Flash */}
                      <div
                        id="col-545162437"
                        className="col before-af-col medium-6 small-12 large-6"
                      >
                        <div className="col-inner box-shadow-1">
                          <div className="row row-collapse" id="row-1549762609">
                            <div className="col before-af-col small-12 large-12">
                              <div className="col-inner">
                                <BeforeAfterSlider
                                  beforeImage="/assets/flash-editing.jpg"
                                  afterImage="/assets/flash-edited.jpg"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="text bf_text_des"
                            style={{ textAlign: "center" }}
                          >
                            <h3>
                              <strong>Flash</strong>
                            </h3>
                            <p>
                              <span style={{ fontSize: "100%" }}>
                                Creating a perfect balance of light and shadow
                                in the image.
                              </span>
                            </p>
                          </div>
                          <a
                            href="/flash/"
                            className="button primary is-link btn-learn-more"
                          >
                            <span>Learn more</span>
                          </a>
                        </div>
                        <style>{` #col-545162437 > .col-inner { border-radius: 12px; } `}</style>
                      </div>

                      {/* Single */}
                      <div
                        id="col-229266192"
                        className="col before-af-col medium-6 small-12 large-6"
                      >
                        <div className="col-inner box-shadow-1">
                          <div className="row row-collapse" id="row-1551364221">
                            <div className="col before-af-col small-12 large-12">
                              <div className="col-inner">
                                <BeforeAfterSlider
                                  beforeImage="/assets/single-edited.jpg"
                                  afterImage="/assets/single-editing.jpg"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="text bf_text_des"
                            style={{ textAlign: "center" }}
                          >
                            <h3>
                              <strong>Single</strong>
                            </h3>
                            <p>
                              <span style={{ fontSize: "100%" }}>
                                Processing a single image, a original photo.
                              </span>
                            </p>
                          </div>
                          <a
                            href="/single/"
                            className="button primary is-link btn-learn-more"
                          >
                            <span>Learn more</span>
                          </a>
                        </div>
                        <style>{` #col-229266192 > .col-inner { border-radius: 12px; } `}</style>
                      </div>

                      {/* Remove */}
                      <div
                        id="col-2128048686"
                        className="col before-af-col medium-6 small-12 large-6"
                      >
                        <div className="col-inner box-shadow-1">
                          <div className="row row-collapse" id="row-497753041">
                            <div className="col before-af-col small-12 large-12">
                              <div className="col-inner">
                                <BeforeAfterSlider
                                  beforeImage="/assets/remove-editing.jpg"
                                  afterImage="/assets/remove-edited.jpg"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="text bf_text_des"
                            style={{ textAlign: "center" }}
                          >
                            <h3>
                              <strong>Remove</strong>
                            </h3>
                            <p>
                              <span style={{ fontSize: "100%" }}>
                                Removing unwanted elements from a photo.
                              </span>
                            </p>
                          </div>
                          <a
                            href="/remove/"
                            className="button primary is-link btn-learn-more"
                          >
                            <span>Learn more</span>
                          </a>
                        </div>
                        <style>{` #col-2128048686 > .col-inner { border-radius: 12px; } `}</style>
                      </div>
                    </div>
                  </div>

                  {/* Virtual Services Panel */}
                  <div
                    id="tab_virtual-services"
                    className={`panel entry-content ${activeTab === "virtual-services" ? "active" : ""
                      }`}
                    role="tabpanel"
                  >
                    <div
                      id="gap-795143325"
                      className="gap-element clearfix"
                      style={{ display: "block", height: "auto" }}
                    >
                      <style>{` #gap-795143325 { padding-top: 30px; } `}</style>
                    </div>
                    <div className="row align-center" id="row-1758048299">
                      {/* 2D Floor Plan */}
                      <div className="col medium-6 small-12 large-6">
                        <div className="col-inner box-shadow-1">
                          <div className="img has-hover x md-x lg-x y md-y lg-y">
                            <div className="img-inner dark">
                              <img
                                loading="lazy"
                                decoding="async"
                                width="1080"
                                height="720"
                                src="/assets/contemporary.jpg"
                                className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                                alt="2d floor plan"
                              />
                            </div>
                          </div>
                          <div
                            className="text bf_text_des"
                            style={{ textAlign: "center" }}
                          >
                            <h3>
                              <strong>2D Floor Plan</strong>
                            </h3>
                            <p>
                              <span style={{ fontSize: "100%" }}>
                                Offer detailed visual layouts of a property,
                                help clients understand the layout and flow of a
                                property, making it easier to visualize the
                                space.
                              </span>
                            </p>
                          </div>
                          <a className="button primary is-link btn-learn-more">
                            <span>Learn more</span>
                          </a>
                        </div>
                        <style>{` #col-1168226114 > .col-inner { border-radius: 12px; } `}</style>
                      </div>

                      {/* 3D Floor Plan */}
                      <div className="col medium-6 small-12 large-6">
                        <div className="col-inner box-shadow-1">
                          <div className="img has-hover x md-x lg-x y md-y lg-y">
                            <div className="img-inner dark">
                              <img
                                loading="lazy"
                                decoding="async"
                                width="1621"
                                height="1080"
                                src="/assets/Traditional-Style.jpg"
                                className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                                alt="3d floor plan"
                              />
                            </div>
                          </div>
                          <div
                            className="text bf_text_des"
                            style={{ textAlign: "center" }}
                          >
                            <h3>
                              <strong>3D Floor Plan</strong>
                            </h3>
                            <p>
                              <span style={{ fontSize: "100%" }}>
                                Offer detailed visual layouts of a property,
                                help clients understand the layout and flow of a
                                property, making it easier to visualize the
                                space.
                              </span>
                            </p>
                          </div>
                          <a className="button primary is-link btn-learn-more">
                            <span>Learn more</span>
                          </a>
                        </div>
                      </div>

                      {/* Virtual Renovation */}
                      <div className="col medium-6 small-12 large-6">
                        <div className="col-inner box-shadow-1">
                          <div className="row row-collapse">
                            <div className="col before-af-col small-12 large-12">
                              <div className="col-inner">
                                <BeforeAfterSlider
                                  beforeImage="/assets/DSC06251-scaled.jpg"
                                  afterImage="/assets/DSC06251a-scaled.jpg"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="text bf_text_des"
                            style={{ textAlign: "center" }}
                          >
                            <h3>
                              <strong>Virtual Renovation</strong>
                            </h3>
                            <p>
                              <span style={{ fontSize: "100%" }}>
                                Use digital editing to show potential upgrades
                                or remodels of a space, without any physical
                                changes.
                              </span>
                            </p>
                          </div>
                          <a className="button primary is-link btn-learn-more">
                            <span>Learn more</span>
                          </a>
                        </div>
                      </div>

                      {/* Virtual Staging */}
                      <div className="col medium-6 small-12 large-6">
                        <div className="col-inner box-shadow-1">
                          <div className="row row-collapse">
                            <div className="col before-af-col small-12 large-12">
                              <div className="col-inner">
                                <BeforeAfterSlider
                                  beforeImage="/assets/Living-dining-room.jpeg"
                                  afterImage="/assets/Living-dining-room_1-1.jpg"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="text bf_text_des"
                            style={{ textAlign: "center" }}
                          >
                            <h3>
                              <strong>Virtual Staging</strong>
                            </h3>
                            <p>
                              <span style={{ fontSize: "100%" }}>
                                Add digital furniture and decor to empty rooms,
                                helping buyers visualize how each space can be
                                used.
                              </span>
                            </p>
                          </div>
                          <a className="button primary is-link btn-learn-more">
                            <span>Learn more</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
