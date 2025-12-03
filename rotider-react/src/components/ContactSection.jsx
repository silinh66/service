import React from 'react';
import './ContactSection.css';

const ContactSection = () => {
    return (
        <div className="contact-section-container">
            <div className="cs-lang-toggle">

            </div>
            <div className="cs-content">
                <div className="cs-label-container">
                    <span className="cs-label">ZOOZOOSTUDIO</span>
                    {/* <svg className="cs-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg> */}
                </div>
                <div className="cs-headline">
                    Delivers premium video editing and personal web design SEO optimized, cross platform ready, and strictly on time
                </div>
            </div>
        </div>
    );
};

export default ContactSection;
