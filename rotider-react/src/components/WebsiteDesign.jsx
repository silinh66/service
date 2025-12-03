import React from 'react';
import { Link } from 'react-router-dom';
import './WebsiteDesign.css';
import templates from '../data/templates.json';

const WebsiteDesign = () => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const itemsPerPage = 6;

    const handleNext = (e) => {
        e.preventDefault();
        setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage) % templates.length);
    };

    const handlePrev = (e) => {
        if (e) e.preventDefault();
        setCurrentIndex((prevIndex) => (prevIndex - itemsPerPage + templates.length) % templates.length);
    };

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage) % templates.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [itemsPerPage]);

    const visibleTemplates = templates.slice(currentIndex, currentIndex + itemsPerPage);
    // If we're at the end and have fewer than itemsPerPage, we might want to wrap around or show what's left.
    // The slice handles showing fewer items correctly.
    // However, for a continuous feel or if the user wants to always show 6, we might need more logic.
    // Given "next 6 templates", simple slicing is likely what's expected.
    // But to ensure we always show 6 items if possible (e.g. wrapping), we can do:
    // const visibleTemplates = [];
    // for (let i = 0; i < itemsPerPage; i++) {
    //     visibleTemplates.push(templates[(currentIndex + i) % templates.length]);
    // }
    // The user said "next 6 template website", implying pagination.
    // Let's stick to simple pagination first, but if the user wants a carousel loop, the modulo approach above is better.
    // "cứ như vậy" implies a loop. Let's use the modulo approach to always fill the grid.

    const getVisibleTemplates = () => {
        let items = [];
        for (let i = 0; i < itemsPerPage; i++) {
            items.push(templates[(currentIndex + i) % templates.length]);
        }
        return items;
    };

    const currentTemplates = getVisibleTemplates();

    return (
        <div className="website-design-container">
            <div className="wd-header">
                <h2 className="wd-title">ZOOZOOSTUDIO - Elevating Your Personal Brand</h2>
                <p className="wd-description">
                    We are dedicated to helping professionals and creators tell their unique stories. Through custom personal websites and engaging video editing, we craft a digital presence that is professional, impactful, and authentically yours.
                </p>
            </div>

            <div className="wd-slider-container">
                <a href="#" className="wd-control-arrow wd-control-prev" onClick={handlePrev}>
                    <span className="vh">Previous</span>
                </a>

                <div className="wd-grid">
                    {currentTemplates.map((item, index) => (
                        <Link
                            to={`/template/${item.id}`}
                            key={`${item.id}-${index}`} // Ensure unique key for duplicates in loop
                            className="wd-card"
                        >
                            <div className="wd-image-container">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    loading="lazy"
                                    className="wd-image"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                                    }}
                                />
                            </div>
                            <span className={`wd-tag ${item.tagColor}`}>{item.tag}</span>
                            <h3 className="wd-card-title">{item.title}</h3>
                        </Link>
                    ))}
                </div>

                <a href="#" className="wd-control-arrow wd-control-next" onClick={handleNext}>
                    <span className="vh">Next</span>
                </a>
            </div>
        </div>
    );
};

export default WebsiteDesign;
