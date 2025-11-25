import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { postService } from '../services/postService';
import { getOptimizedImageUrl } from '../utils/imageUtils';
import './SonySlider.css';

const SonySlider = () => {
    const [posts, setPosts] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [fullscreenVideo, setFullscreenVideo] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await postService.getAllPosts({
                    category: 'Video Editing',
                    status: 'published',
                    video_format: 'horizontal',
                    limit: 30,
                    fields: 'id,title,slug,featured_image,videos,video_format'
                });
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, []);

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.realIndex);
    };

    const handleOpenVideo = (video) => {
        setFullscreenVideo(video);
    };

    const handleCloseVideo = () => {
        setFullscreenVideo(null);
    };

    // Optimize background rendering: only render active, prev, and next images to reduce DOM nodes
    // while maintaining smooth transitions.
    // With loop=true, we need to handle wrap-around indices.

    if (posts.length === 0) return null;

    return (
        <div className="hero" style={{ marginTop: '70px' }}> {/* Added margin-top to clear fixed header */}
            {/* Background Blur Effect */}
            <div className="hero-bg">
                <div className="hero-bg-cover"></div>
                <div className="hero-bg-image">
                    {posts.map((post, index) => {
                        // Always render all background images to ensure smooth transitions and avoid missing images during loop
                        // Opacity handles the visibility
                        return (
                            <img
                                key={post.id}
                                src={getOptimizedImageUrl(post.featured_image)}
                                alt=""
                                loading="lazy"
                                className={index === activeIndex ? 'is-active' : ''}
                                style={{ opacity: index === activeIndex ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Slider Items */}
            <div className="hero-items">
                <Swiper
                    modules={[Pagination, Autoplay, Navigation]}
                    spaceBetween={17}
                    slidesPerView={'auto'}
                    centeredSlides={true}
                    loop={true}
                    loopedSlides={8} // Ensure enough slides are duplicated for loop
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        el: '.hero-controls-dots',
                        clickable: true,
                        renderBullet: function (index, className) {
                            return '<span class="' + className + ' hero-control-dot"><span class="hero-control-dot-inner"></span></span>';
                        },
                    }}
                    navigation={{
                        nextEl: '.hero-control-next',
                        prevEl: '.hero-control-prev',
                    }}
                    onSlideChange={handleSlideChange}
                    className="hero-wrapper"
                >
                    {posts.map((post) => (
                        <SwiperSlide key={post.id} className="hero-item">
                            <div className="hero-item-image">
                                <SlideVideo
                                    video={post.videos && post.videos.length > 0 ? post.videos[0] : null}
                                    thumbnail={getOptimizedImageUrl(post.featured_image)}
                                    onOpen={handleOpenVideo}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Controls & Info */}
            <div className="hero-controls-container">
                <a href="#" className="hero-control-arrow hero-control-prev" onClick={(e) => e.preventDefault()}>
                    <span className="vh">see previous panel</span>
                </a>

                <div className="hero-info">
                    <div style={{ color: '#ff7e27ff' }} className="hero-info-category">Professional Video Editing for Viral - $55</div>
                    <div className="hero-info-title">{posts[activeIndex]?.title}</div>
                    {/* <div className="hero-info-desc">{posts[activeIndex]?.excerpt}</div> */}
                </div>

                <a href="#" className="hero-control-arrow hero-control-next" onClick={(e) => e.preventDefault()}>
                    <span className="vh">see next panel</span>
                </a>
            </div>

            {/* Dots (Hidden or moved if needed, keeping for now as per reference structure but might need hiding if user only wants arrows) */}
            <div className="hero-controls" style={{ display: 'none' }}>
                <div>
                    <div className="hero-controls-dots"></div>
                </div>
            </div>

            {/* Fullscreen Video Modal */}
            {fullscreenVideo && (
                <div className="modal-overlay" onClick={handleCloseVideo}>
                    <button className="modal-close" onClick={handleCloseVideo}>×</button>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        {fullscreenVideo.type === 'upload' && (
                            <video
                                src={getOptimizedImageUrl(fullscreenVideo.url)}
                                controls
                                autoPlay
                                style={{ width: '100%', height: '100%' }}
                            />
                        )}
                        {fullscreenVideo.type === 'youtube' && (
                            <iframe
                                src={`https://www.youtube.com/embed/${extractYouTubeId(fullscreenVideo.url)}?autoplay=1`}
                                style={{ width: '100%', height: '100%', border: 'none' }}
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                title="YouTube video"
                            />
                        )}
                        {fullscreenVideo.type === 'vimeo' && (
                            <iframe
                                src={`https://player.vimeo.com/video/${extractVimeoId(fullscreenVideo.url)}?autoplay=1`}
                                style={{ width: '100%', height: '100%', border: 'none' }}
                                allow="autoplay; fullscreen"
                                allowFullScreen
                                title="Vimeo video"
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const SlideVideo = ({ video, thumbnail, onOpen }) => {
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef(null);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (video) onOpen(video);
    };

    return (
        <div
            style={{ width: '100%', height: '100%', position: 'relative', cursor: 'pointer' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <img
                src={thumbnail}
                alt="Thumbnail"
                loading="lazy"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: isHovered && video ? 0 : 1,
                    transition: 'opacity 0.3s',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 2
                }}
            />

            {video && (
                <div style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1
                }}>
                    {video.type === 'upload' ? (
                        isHovered && (
                            <video
                                ref={videoRef}
                                src={getOptimizedImageUrl(video.url)}
                                muted
                                loop
                                autoPlay
                                playsInline
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        )
                    ) : video.type === 'youtube' ? (
                        isHovered && (
                            <iframe
                                src={`https://www.youtube.com/embed/${extractYouTubeId(video.url)}?autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0&rel=0`}
                                style={{ width: '100%', height: '100%', border: 'none' }}
                                title="YouTube video preview"
                            />
                        )
                    ) : video.type === 'vimeo' ? (
                        isHovered && (
                            <iframe
                                src={`https://player.vimeo.com/video/${extractVimeoId(video.url)}?autoplay=1&muted=1&background=1`}
                                style={{ width: '100%', height: '100%', border: 'none' }}
                                title="Vimeo video preview"
                            />
                        )
                    ) : null}
                </div>
            )}

            {/* Play Icon Overlay (optional, if desired) */}
            {!isHovered && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                    zIndex: 3
                }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </div>
            )}
        </div>
    );
};

const extractYouTubeId = (url) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : '';
};

const extractVimeoId = (url) => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : '';
};

export default SonySlider;
