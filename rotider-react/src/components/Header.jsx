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
                        <div className="header-inner flex-row container logo-left medium-logo-center" role="navigation">

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
                                            <i className="icon-menu"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Left Elements */}
                            <div className="flex-col hide-for-medium flex-left flex-grow">
                                <ul className="header-nav header-nav-main nav nav-left nav-spacing-xlarge nav-uppercase">
                                    <li id="menu-item-808" className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home menu-item-808 active menu-item-design-default">
                                        <Link to="/" aria-current="page" className="nav-top-link">Home page</Link>
                                    </li>
                                    <li id="menu-item-38" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-38 menu-item-design-default has-dropdown">
                                        <a href="#" className="nav-top-link" aria-expanded="false" aria-haspopup="menu">Service</a>
                                        <ul className="sub-menu nav-dropdown nav-dropdown-default">
                                            <li id="menu-item-1307" className="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-has-children menu-item-1307 nav-dropdown-col">
                                                <a href="/product-category/photo-editing/">Photo Editing</a>
                                                <ul className="sub-menu nav-column nav-dropdown-default">
                                                    <li id="menu-item-2202" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2202"><a href="/hdr/">HDR</a></li>
                                                    <li id="menu-item-2205" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2205"><a href="/twilight/">Twilight</a></li>
                                                    <li id="menu-item-2200" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2200"><a href="/day-to-dusk/">Day to Dusk</a></li>
                                                    <li id="menu-item-2201" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2201"><a href="/flash/">Flash</a></li>
                                                    <li id="menu-item-2204" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2204"><a href="/single/">Single</a></li>
                                                    <li id="menu-item-2203" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2203"><a href="/remove/">Remove</a></li>
                                                </ul>
                                            </li>
                                            <li id="menu-item-1309" className="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-has-children menu-item-1309 nav-dropdown-col">
                                                <a href="/product-category/video-editing/">Video Editing</a>
                                                <ul className="sub-menu nav-column nav-dropdown-default">
                                                    <li id="menu-item-2198" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2198"><a href="/drone-videography/">Drone Videography</a></li>
                                                    <li id="menu-item-2199" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2199"><a href="/standard/">Standard</a></li>
                                                    <li id="menu-item-2196" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2196"><a href="/advanced/">Advanced</a></li>
                                                    <li id="menu-item-2197" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2197"><a href="/high-end/">High-End</a></li>
                                                    <li id="menu-item-2195" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2195"><a href="/add-on-effect/">Add On Effect</a></li>
                                                </ul>
                                            </li>
                                            <li id="menu-item-1308" className="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-has-children menu-item-1308 nav-dropdown-col">
                                                <a href="/product-category/virtual-service/">Virtual Staging Service</a>
                                                <ul className="sub-menu nav-column nav-dropdown-default">
                                                    <li id="menu-item-2604" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2604"><a href="/3d-floor-plan/">3D Floor Plan</a></li>
                                                    <li id="menu-item-2193" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2193"><a href="/virtual-renovation/">Virtual Renovation</a></li>
                                                    <li id="menu-item-2192" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2192"><a href="/virtual-staging/">Virtual Staging</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li id="menu-item-791" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-791 menu-item-design-default"><a href="/our-story/" className="nav-top-link">Our Story</a></li>
                                    <li id="menu-item-2153" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-2153 menu-item-design-default"><Link to="/login" className="nav-top-link">Order</Link></li>
                                    <li id="menu-item-809" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-809 menu-item-design-default"><a href="/blog/" className="nav-top-link">Blog</a></li>
                                    <li id="menu-item-810" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-810 menu-item-design-default"><a href="/contact-us/" className="nav-top-link">Contact us</a></li>
                                    <li id="menu-item-3753" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-3753 menu-item-design-default"><Link to="/login" className="nav-top-link">Login</Link></li>
                                </ul>
                            </div>

                            {/* Right Elements */}
                            <div className="flex-col hide-for-medium flex-right">
                                <ul className="header-nav header-nav-main nav nav-right nav-spacing-xlarge nav-uppercase">
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
                        <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-38 has-child" aria-expanded="false">
                            <a href="#">Service</a>
                            <button className="toggle" aria-label="Toggle"><i className="icon-angle-down"></i></button>
                            <ul className="sub-menu nav-sidebar-ul children">
                                {/* ... Submenu items ... */}
                                {/* Simplified for brevity, should match desktop structure but for mobile */}
                                <li className="menu-item"><a href="/product-category/photo-editing/">Photo Editing</a></li>
                                <li className="menu-item"><a href="/product-category/video-editing/">Video Editing</a></li>
                                <li className="menu-item"><a href="/product-category/virtual-service/">Virtual Staging Service</a></li>
                            </ul>
                        </li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-791"><a href="/our-story/">Our Story</a></li>
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
