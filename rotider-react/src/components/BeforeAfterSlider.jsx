import React, { useState, useRef, useEffect } from 'react';

const BeforeAfterSlider = ({ beforeImage, afterImage, beforeLabel = "Before", afterLabel = "After" }) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleMove = (clientX) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
            const percentage = (x / rect.width) * 100;
            setSliderPosition(percentage);
        }
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e) => {
        if (isDragging) handleMove(e.clientX);
    };

    const handleTouchMove = (e) => {
        handleMove(e.touches[0].clientX);
    };

    // Allow clicking to jump
    const handleClick = (e) => {
        handleMove(e.clientX);
    }

    useEffect(() => {
        const handleGlobalMouseUp = () => setIsDragging(false);
        const handleGlobalMouseMove = (e) => {
            if (isDragging) {
                handleMove(e.clientX);
            }
        };

        window.addEventListener('mouseup', handleGlobalMouseUp);
        window.addEventListener('mousemove', handleGlobalMouseMove);
        return () => {
            window.removeEventListener('mouseup', handleGlobalMouseUp);
            window.removeEventListener('mousemove', handleGlobalMouseMove);
        };
    }, [isDragging]);


    return (
        <div
            className="twentytwenty-wrapper bafg-twentytwenty-wrapper twentytwenty-horizontal"
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onTouchMove={handleTouchMove}
            onClick={handleClick}
            style={{ cursor: 'ew-resize' }}
        >
            <div className="bafg-twentytwenty-container twentytwenty-container" style={{ height: '100%', position: 'relative', overflow: 'hidden', userSelect: 'none' }}>
                {/* After Image (Bottom - Right side visible when slider is left) */}
                <img src={afterImage} alt={afterLabel} className="twentytwenty-after" style={{ display: 'block', width: '100%', height: 'auto' }} />

                {/* Before Image (Top - Left side visible, clipped from right) */}
                <img
                    src={beforeImage}
                    alt={beforeLabel}
                    className="twentytwenty-before"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
                    }}
                />

                <div className="twentytwenty-overlay">
                    <div className="twentytwenty-before-label" data-content={beforeLabel}></div>
                    <div className="twentytwenty-after-label" data-content={afterLabel}></div>
                </div>
                <div className="twentytwenty-handle" style={{ left: `${sliderPosition}%` }}>
                    <span className="twentytwenty-left-arrow"></span>
                    <span className="twentytwenty-right-arrow"></span>
                </div>
            </div>
        </div>
    );
};

export default BeforeAfterSlider;
