import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ServiceProfile.css';

const ServiceProfile = () => {
    const [selectedTier, setSelectedTier] = useState('advanced');

    const tiers = {
        starter: {
            price: 39,
            name: 'Starter',
            title: '1 Short Video 60 sec',
            desc: '60 sec short ( Alex Hormozi Style )',
            deliveryTime: '2 day',
            revisions: '2',
            footage: '10',
            runningTime: '1',
            deliveryDate: '1 day delivery — Dec 4, 2025',
            motionGraphics: 'Basic Motion Graphics'
        },
        standard: {
            price: 55,
            name: 'Standard',
            title: '1 Youtube video 1-5 min',
            desc: '1-5 min Youtube Video ( Alex Hormozi Style )',
            deliveryTime: '3 days',
            revisions: '2',
            footage: '20',
            runningTime: '1',
            deliveryDate: '5 days delivery — Dec 8, 2025',
            motionGraphics: 'Basic & Advanced Motion Graphics'
        },
        advanced: {
            price: 250,
            name: 'Advanced',
            title: '1 Youtube video 5-10 min',
            desc: '5-10 min Youtube Video ( Alex Hormozi Style )',
            deliveryTime: '7 days',
            revisions: '2',
            footage: '30',
            runningTime: '1',
            deliveryDate: '7 days delivery — Dec 10, 2025',
            motionGraphics: 'Advanced Motion Graphics'
        }
    };

    const currentTier = tiers[selectedTier];

    return (
        <div className="service-profile-container">
            {/* Header Section */}
            {/* <div className="sp-header">
                <h1 className="sp-title">
                    You will get an Alex Hormozi-style video.
                </h1>
                <div className="sp-meta">
                    <div className="sp-user-info">
                        <img
                            src="https://ui-avatars.com/api/?name=Muhammad+U&background=random"
                            alt="Muhammad U."
                            className="sp-avatar"
                        />
                        <span className="sp-username">Muhammad U.</span>
                    </div>
                    <div className="sp-rating">
                        <span className="sp-star">★</span>
                        <span>4.7</span>
                        <span className="sp-reviews">(35 reviews)</span>
                    </div>
                    <div className="sp-badge">
                        <span className="sp-badge-icon">🛡️</span> Top Rated
                    </div>
                </div>
            </div> */}

            {/* Main Content */}
            <div className="sp-content">
                {/* Left Column */}
                <div className="sp-left-column">
                    {/* Visuals */}
                    <div className="sp-visuals">
                        <div className="sp-main-image">
                            <img
                                src="/zoozoo-lion.png"
                                alt="ZooZoo Studio"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        {/* <div className="sp-thumbnails">
                            <div className="sp-thumbnail active">
                                <div style={{ width: '100%', height: '100%', background: '#ff6b6b' }}></div>
                            </div>
                            <div className="sp-thumbnail">
                                <div style={{ width: '100%', height: '100%', background: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span>▶</span>
                                </div>
                            </div>
                        </div> */}
                    </div>

                    {/* Pro Banner */}
                    {/* <div className="sp-pro-banner">
                        <div className="sp-pro-icon">
                            <div style={{ width: '60px', height: '60px', background: '#4caf50', borderRadius: '50%' }}></div>
                        </div>
                        <div className="sp-pro-content">
                            <h3>Let a pro handle the details</h3>
                            <p>Buy <span style={{ textDecoration: 'underline', color: '#108a00' }}>Video Editing</span> services from Muhammad, priced and ready to go.</p>
                            <a href="#" className="sp-pro-link">How it works <span>ⓘ</span></a>
                        </div>
                    </div> */}

                    {/* Project Details */}
                    {/* <div className="sp-project-details">
                        <h3 className="sp-section-title">Project details</h3>
                        <div className="sp-description">
                            <p>Hey welcome to my gig</p>
                            <p>I have been editing videos for more than 3 years now. I am very passionate about filmmaking and editing so I can guarantee you will be satisfied with my results.</p>
                            <p>Contact me before making the order.</p>
                            <p>Why do I want you to contact me before making the order? I want to see your vision and completely understand what you want from me and deliver exactly what you want.</p>
                            <p>I can edit all of the following:</p>
                            <p>Youtube includes shorts, TikTok, Facebook, Instagram shorts and reels, Gaming, Vl.. <a href="#">more</a></p>
                        </div>

                        <div className="sp-meta-list">
                            <div className="sp-meta-item">
                                <span className="sp-meta-label">Video Type</span>
                            </div>
                            <div className="sp-meta-value">Social Media Video</div>
                        </div>
                    </div> */}

                    {/* What's included Table */}
                    <div className="sp-whats-included" id="whats-included">
                        {/* <h3 className="sp-section-title">What's included</h3> */}
                        <div className="sp-table-wrapper">
                            <table className="sp-comparison-table">
                                <thead>
                                    <tr>
                                        <th>Service Tiers</th>
                                        <th>Starter<span>$39</span></th>
                                        <th>Standard<span>$55</span></th>
                                        <th>Advanced<span>$250</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Delivery Time</td>
                                        <td>{tiers.starter.deliveryTime}</td>
                                        <td>{tiers.standard.deliveryTime}</td>
                                        <td>{tiers.advanced.deliveryTime}</td>
                                    </tr>
                                    <tr>
                                        <td>Number of Revisions</td>
                                        <td>{tiers.starter.revisions}</td>
                                        <td>{tiers.standard.revisions}</td>
                                        <td>{tiers.advanced.revisions}</td>
                                    </tr>
                                    <tr>
                                        <td>Footage Provided (Minutes)</td>
                                        <td>{tiers.starter.footage}</td>
                                        <td>{tiers.standard.footage}</td>
                                        <td>{tiers.advanced.footage}</td>
                                    </tr>
                                    <tr>
                                        <td>Running Time (Minutes)</td>
                                        <td>{tiers.starter.runningTime}</td>
                                        <td>{tiers.standard.runningTime}</td>
                                        <td>{tiers.advanced.runningTime}</td>
                                    </tr>
                                    <tr>
                                        <td>Color Grading</td>
                                        <td><span className="sp-check">✓</span></td>
                                        <td><span className="sp-check">✓</span></td>
                                        <td><span className="sp-check">✓</span></td>
                                    </tr>
                                    <tr>
                                        <td>Sound Design & Mixing</td>
                                        <td><span className="sp-check">✓</span></td>
                                        <td><span className="sp-check">✓</span></td>
                                        <td><span className="sp-check">✓</span></td>
                                    </tr>
                                    <tr>
                                        <td>Motion Graphics</td>
                                        <td style={{ fontSize: '14px' }}>{tiers.starter.motionGraphics}</td>
                                        <td style={{ fontSize: '14px' }}>{tiers.standard.motionGraphics}</td>
                                        <td style={{ fontSize: '14px' }}>{tiers.advanced.motionGraphics}</td>
                                    </tr>
                                    <tr>
                                        <td>Subtitles</td>
                                        <td><span className="sp-check">✓</span></td>
                                        <td><span className="sp-check">✓</span></td>
                                        <td><span className="sp-check">✓</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Optional Add-ons */}
                    {/* <div className="sp-addons">
                        <h3 className="sp-section-title">Optional add-ons</h3>
                        <p style={{ fontSize: '12px', color: '#5e6d55', marginBottom: '16px' }}>You can add these on the next page.</p>

                        <div className="sp-addon-item">
                            <div className="sp-addon-info">
                                <h4>Fast Delivery</h4>
                            </div>
                            <div className="sp-addon-price">+$10 - $20</div>
                        </div>
                        <div className="sp-addon-item">
                            <div className="sp-addon-info">
                                <h4>Additional Revision</h4>
                            </div>
                            <div className="sp-addon-price">+$10</div>
                        </div>
                    </div> */}
                </div>

                {/* Right Column - Pricing */}
                <div className="sp-pricing-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <span style={{ fontWeight: '600', fontSize: '16px' }}>Select service tier</span>
                        <a
                            href="#whats-included"
                            className="sp-compare-link"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('whats-included').scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Compare tiers
                        </a>
                    </div>

                    <div className="sp-tier-selector">
                        {Object.entries(tiers).map(([key, tier]) => (
                            <div
                                key={key}
                                className={`sp-tier-option ${selectedTier === key ? 'active' : ''}`}
                                onClick={() => setSelectedTier(key)}
                            >
                                <div className={`sp-radio-circle ${selectedTier === key ? 'active' : ''}`}>
                                    {selectedTier === key && <div className="sp-radio-dot"></div>}
                                </div>
                                <span className="sp-tier-name">{tier.name}</span>
                                <span className="sp-tier-price">${tier.price}</span>
                            </div>
                        ))}
                    </div>

                    <div className="sp-package-details">
                        <div className="sp-package-header">
                            {/* <div className="sp-package-title">
                                <span>{currentTier.title}</span>
                            </div> */}
                            {/* <div className="sp-package-desc">
                                {currentTier.desc}
                            </div> */}
                        </div>

                        <ul className="sp-card-features">
                            <li className="sp-card-feature">
                                <span className="feature-label">Delivery Time</span>
                                <span className="feature-value">{currentTier.deliveryTime}</span>
                            </li>
                            <li className="sp-card-feature">
                                <span className="feature-label">Number of Revisions</span>
                                <span className="feature-value">{currentTier.revisions}</span>
                            </li>
                            <li className="sp-card-feature">
                                <span className="feature-label">Footage Provided (Minutes)</span>
                                <span className="feature-value">{currentTier.footage}</span>
                            </li>
                            <li className="sp-card-feature">
                                <span className="feature-label">Running Time (Minutes)</span>
                                <span className="feature-value">{currentTier.runningTime}</span>
                            </li>
                            <li className="sp-card-feature">
                                <span className="feature-label">Color Grading</span>
                                <span className="feature-check">✓</span>
                            </li>
                            <li className="sp-card-feature">
                                <span className="feature-label">Sound Design & Mixing</span>
                                <span className="feature-check">✓</span>
                            </li>
                            <li className="sp-card-feature">
                                <span className="feature-label">{currentTier.motionGraphics}</span>
                                <span className="feature-check">✓</span>
                            </li>
                            <li className="sp-card-feature">
                                <span className="feature-label">Subtitles</span>
                                <span className="feature-check">✓</span>
                            </li>
                        </ul>

                        {/* <div className="sp-delivery-date">
                            <span className="sp-clock-icon">🕒</span>
                            <div>
                                <div className="sp-date-text">{currentTier.deliveryDate}</div>
                                <div className="sp-date-subtext">Revisions may occur after this date.</div>
                            </div>
                        </div> */}

                        <Link to="/login" className="sp-cta-button">
                            ORDER NOW (${currentTier.price})
                        </Link>

                        <Link to="/login" className="sp-secondary-button">
                            Message
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceProfile;
