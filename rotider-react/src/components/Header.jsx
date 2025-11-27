import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = (e) => {
        e.preventDefault();
        setIsMenuOpen(!isMenuOpen);
        // Toggle body class if needed for scrolling, etc.
        if (!isMenuOpen) {
            document.body.classList.add('off-canvas-active');
        } else {
            document.body.classList.remove('off-canvas-active');
        }
    };

    return (
        <>
            <header id="header" className="header has-transparent has-transparent has-sticky sticky-jump transparent">
                <div className="header-wrapper">
                    <div id="masthead" className="header-main nav-dark">
                        <div className="header-inner flex-row container header-centered medium-logo-center" role="navigation">

                            {/* Logo */}
                            <div id="logo" className="flex-col logo">
                                <Link to="/" title="ZOOZOO – Real Estate Photo Editing and Video Editing" rel="home">
                                    <span className="header-logo-text">ZOOZOOSTUDIO</span>
                                </Link>
                            </div>

                            {/* Mobile Left Elements */}
                            <div className="flex-col show-for-medium flex-left">
                                <ul className="mobile-nav nav nav-left ">
                                    <li className="nav-icon has-icon">
                                        <a href="#" onClick={toggleMenu} className="is-small" aria-label="Menu" aria-controls="main-menu" aria-expanded={isMenuOpen}>
                                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fff' }}>
                                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                                <line x1="3" y1="18" x2="21" y2="18"></line>
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Center Elements (Logo + Menu) */}
                            <div className="flex-col hide-for-medium">
                                <ul className="header-nav header-nav-main nav nav-center nav-spacing-xlarge nav-uppercase">
                                    <li id="menu-item-808" className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home menu-item-808 active menu-item-design-default">
                                        <Link to="/" aria-current="page" className="nav-top-link">Home page</Link>
                                    </li>

                                    {/* <li id="menu-item-791" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-791 menu-item-design-default"><a href="/our-story/" className="nav-top-link">Our Story</a></li> */}
                                    <li id="menu-item-2153" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-2153 menu-item-design-default"><Link to="/login" className="nav-top-link">Order</Link></li>
                                    <li id="menu-item-809" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-809 menu-item-design-default"><a href="/blog/" className="nav-top-link">Blog</a></li>
                                    <li id="menu-item-810" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-810 menu-item-design-default"><a href="/contact-us/" className="nav-top-link">Contact us</a></li>
                                    <li id="menu-item-3753" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-3753 menu-item-design-default"><Link to="/login" className="nav-top-link">Login</Link></li>
                                </ul>
                            </div>



                            {/* Mobile Right Elements */}
                            <div className="flex-col show-for-medium flex-right">
                                <ul className="mobile-nav nav nav-right ">
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className="header-bg-container fill"><div className="header-bg-image fill"></div><div className="header-bg-color fill"></div></div>
                </div>
            </header>

            {/* Mobile Menu */}
            <div id="main-menu" className={`mobile-sidebar no-scrollbar ${isMenuOpen ? 'mfp-ready' : 'mfp-hide'}`} style={{ display: isMenuOpen ? 'block' : 'none' }}>
                <div className="sidebar-menu no-scrollbar ">
                    <ul className="nav nav-sidebar nav-vertical nav-uppercase" data-tab="1">
                        <li className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home menu-item-808"><Link to="/" aria-current="page">Home page</Link></li>

                        {/* <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-38" aria-expanded="false">
                            <a href="/service">Service</a>

                        </li> */}
                        {/* <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-791"><a href="/our-story/">Our Story</a></li> */}
                        <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-2153"><Link to="/login">Order</Link></li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-809"><a href="/blog/">Blog</a></li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-810"><a href="/contact-us/">Contact us</a></li>
                        <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-3753"><Link to="/login">Login</Link></li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Header;
