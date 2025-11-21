import React, { useState, useRef, useEffect } from 'react';

const VideoPreview = ({ video, thumbnail, onOpen }) => {
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef(null);

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (video.type === 'upload' && videoRef.current) {
            videoRef.current.play().catch(e => console.log("Play error:", e));
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (video.type === 'upload' && videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onOpen(video);
    };

    const extractYouTubeId = (url) => {
        const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        return match ? match[1] : null;
    };

    const extractVimeoId = (url) => {
        const match = url.match(/vimeo\.com\/(\d+)/);
        return match ? match[1] : null;
    };

    const renderPreview = () => {
        if (!isHovered) {
            return (
                <div className="img-inner dark" style={{ position: 'relative', height: '100%' }}>
                    <img
                        src={thumbnail}
                        alt="Video thumbnail"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                    {/* Play Icon Overlay */}
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
                        pointerEvents: 'none'
                    }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>
            );
        }

        // Hover State
        if (video.type === 'upload') {
            return (
                <video
                    ref={videoRef}
                    src={video.url}
                    muted
                    loop
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            );
        } else if (video.type === 'youtube') {
            const videoId = extractYouTubeId(video.url);
            return (
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0&rel=0`}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    title="YouTube video preview"
                />
            );
        } else if (video.type === 'vimeo') {
            const videoId = extractVimeoId(video.url);
            return (
                <iframe
                    src={`https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&background=1`}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    title="Vimeo video preview"
                />
            );
        }

        return null;
    };

    return (
        <div
            className="video-preview-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            style={{
                width: '100%',
                height: '200px',
                cursor: 'pointer',
                overflow: 'hidden',
                borderRadius: '8px 8px 0 0',
                backgroundColor: '#000'
            }}
        >
            {renderPreview()}
        </div>
    );
};

export default VideoPreview;
