import React from 'react';
import './ContactSection.css';

const ContactSection = () => {
    return (
        <div className="contact-section-container">
            <div className="cs-lang-toggle">
                <span className="cs-lang-active">English</span>
                <span style={{ margin: '0 5px' }}>/</span>
                <span>Japanese</span>
            </div>
            <div className="cs-content">
                <div className="cs-label-container">
                    <span className="cs-label">ZooZoo Studio</span>
                    {/* <svg className="cs-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg> */}
                </div>
                <div className="cs-headline">
                    delivers premium video editing and personal web design SEO optimized, cross platform ready, and strictly on time
                </div>
            </div>
        </div>
    );
};

export default ContactSection;
