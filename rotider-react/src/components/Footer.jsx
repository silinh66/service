import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Column 1: Services */}
        <div className="footer-column">
          <h3 className="footer-heading">Services</h3>
          <a href="/" className="footer-link">Video Editing</a>
          <a href="/" className="footer-link">Website Design</a>
        </div>

        {/* Column 2: Company */}
        <div className="footer-column">
          <h3 className="footer-heading">Company</h3>
          <a href="/our-story/" className="footer-link">About us</a>
          <a href="/blog/" className="footer-link">Blogs</a>
        </div>

        {/* Column 3: Term of use */}
        <div className="footer-column">
          <h3 className="footer-heading">Term of use</h3>
          <a href="/privacy-policy/" className="footer-link">Privacy Policy</a>
          <a href="/terms-of-service/" className="footer-link">Terms of Services</a>
        </div>

        {/* Column 4: Contact & Social */}
        <div className="footer-column">
          <h3 className="footer-heading">ZOOZOOSTUDIO</h3>

          <div className="footer-social">
            <a href="https://www.facebook.com/ZOOZOOmedia" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg className="footer-social-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
            </a>
            <a href="https://www.instagram.com/ZOOZOOmedia/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg className="footer-social-icon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://www.linkedin.com/company/ZOOZOO-media" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg className="footer-social-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="https://www.youtube.com/@ZOOZOOmedia" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg className="footer-social-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.33 29 29 0 00-.46-5.33zM9.75 15.02l5.75-3.27-5.75-3.27v6.54z"></path></svg>
            </a>
          </div>

          <div className="footer-contact-info">
            <p>zoozoostudio@gmail.com</p>
            <p>sale.zoozoostudio@gmail.com</p>
            <p>WhatsApp: (+84) 356943330</p>
            <p>LK VA03A Khu do thi Hoang Thanh Villas, Dai Mo, Ha Noi</p>
            <p>Working from Monday to Saturday</p>
            <p>6AM - 11PM</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright 2025 © ZOOZOO STUDIO</p>
      </div>
    </footer>
  );
};

export default Footer;
