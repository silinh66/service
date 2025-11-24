import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
    return (
        <div className="contact-us-page">
            {/* Hero Section */}
            <div className="contact-hero">
                <div className="contact-hero-overlay"></div>
                <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
                    alt="Contact Hero"
                    className="contact-hero-bg"
                />
                <div className="contact-hero-content">
                    <h1 className="contact-hero-title">
                        <span className="text-orange">HOW</span><br />
                        to contact us?
                    </h1>

                    <div className="contact-info-grid">
                        <div className="contact-info-item">
                            <h4>Email</h4>
                            <p>zoozoostudio@gmail.com</p>
                            <p>sale.zoozoostudio@gmail.com</p>
                        </div>
                        <div className="contact-info-item">
                            <h4>WhatsApp</h4>
                            <p>(+84) 356943330</p>
                        </div>
                        <div className="contact-info-item">
                            <h4>Base office</h4>
                            <p>LK VA03A Khu đô Thị Hoàng Thành Villas, Đại Mỗ, Hà Nội</p>
                        </div>
                        <div className="contact-info-item">
                            <h4>Work hour</h4>
                            <p>6AM – 11PM</p>
                            <p>Working from Monday to Saturday</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className="contact-form-section">
                <div className="contact-container">
                    <div className="contact-form-grid">
                        <div className="contact-form-wrapper">
                            <h2 className="contact-form-title">Let Us Solve Your Problems</h2>
                            <p className="contact-form-subtitle">Our friendly team would love to hear from you.</p>

                            <form className="contact-form">
                                <div className="form-group">
                                    <label htmlFor="name">Your name</label>
                                    <input type="text" id="name" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Your email</label>
                                    <input type="email" id="email" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input type="tel" id="phone" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Your message (optional)</label>
                                    <textarea id="message" className="form-control" rows="4"></textarea>
                                </div>
                                <button type="submit" className="contact-submit-btn">SUBMIT</button>
                            </form>
                            <p className="contact-form-note">We will get back to you as fast as possible</p>
                        </div>
                        <div className="contact-image-wrapper">
                            <img
                                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
                                alt="Contact Team"
                                className="contact-side-image"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className="contact-map-section">
                <iframe
                    src="https://maps.google.com/maps?q=36%20LK%206A%20L%C3%A0ng%20Vi%E1%BB%87t%20Ki%E1%BB%81u%20Ch%C3%A2u%20%C3%82u%20H%C3%A0%20%C4%90%C3%B4ng%20H%C3%A0%20N%E1%BB%99i&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Google Map"
                ></iframe>
            </div>
        </div>
    );
};

export default ContactUs;
