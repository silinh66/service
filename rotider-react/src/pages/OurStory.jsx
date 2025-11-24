import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './OurStory.css';

const OurStory = () => {
    const teamMembers = [
        {
            id: 1,
            name: "Hoang Van Vinh",
            role: "Co-Founder",
            description: "Guides product direction and quality standards. Always prioritizes viewer experience and conversion effectiveness over flashy effects.",
            image: "https://yt3.googleusercontent.com/9O75pSvOO_k_OEgsNMlelARYWeK_X4IKN9a5Bqj327O_u_tMZ4bCdzNzpXj88eUPyBBn3-Ntqw=s1920-c-k-c0x00ffffff-no-rj"
        },
        {
            id: 4,
            name: "Ta Quang Chien",
            role: "Project and Client Coordinator",
            description: "Plans and tracks milestones, ensures data confidentiality, and guarantees on-time delivery.",
            image: "https://s240-ava-talk.zadn.vn/a/2/8/f/38/240/81d25cde960ebda12a1d0846f3621fa0.jpg"
        },
        {
            id: 2,
            name: "Nguyen Quang Huy",
            role: "Head of Video Editing",
            description: "Responsible for editing rhythm, audio, color, and subtitles. Turns raw ideas into coherent, engaging videos that capture attention within the first 3 seconds.",
            image: "https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-6/537336942_4092019947706246_3186753567032905584_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=BZ2m9tyx6AQQ7kNvwHT6qj_&_nc_oc=Adliqco8TXhY_OgiY5D1VNDfItqEBLctdaNfa6DzOR-dkCU37zHJoqcvA-7J3M95JVbpvjVY74YA3SG0tZc3nu-O&_nc_zt=23&_nc_ht=scontent.fhan20-1.fna&_nc_gid=EB_nFrwQvncfA1PxWW0e2Q&oh=00_Afi1BH-h5o6KLZjT5HWDbE3sexxXhKksi75xT6ySy7W2Tg&oe=6929E068"
        },
        {
            id: 3,
            name: "Nguyen Si Linh",
            role: "Website Design and Development",
            description: "Designs clean and compact websites with fast loading speeds, easy usability across devices. Optimizes on-page SEO and the conversion potential of each call-to-action button.",
            image: "https://lh3.googleusercontent.com/a/ACg8ocJIfmWgkQk0V20oTujSK39jdsRlhj3and7SShiBSGoFTuqD-dkJ=s576-c-no"
        }
    ];

    const teamPhotos = [
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop"
    ];

    return (
        <div className="our-story-page">
            {/* Hero Section */}
            <div className="story-hero">
                <div className="story-hero-overlay"></div>
                <img
                    src="https://res.cloudinary.com/dw5j6ht9n/image/upload/v1721033477/ao2rv6aelv5v8qkyph1r.jpg"
                    alt="Team Hero"
                    className="story-hero-bg"
                />
                <div className="story-hero-content">
                    <h1 className="story-hero-title">WELCOME TO ZOOZOOSTUDIO</h1>
                    <p className="story-hero-subtitle">With a passionate team building our hands, hard work for real estate photography</p>
                    <button className="story-btn-primary">Join Us</button>
                </div>
            </div>

            {/* Vision & Mission Section */}
            <div className="story-section story-vision-mission">
                <div className="story-container">
                    <div className="story-vision-header">
                        <h2 className="story-heading">
                            <span className="text-blue">Our</span> <span className="text-orange">Vision</span>
                        </h2>
                        <p className="story-text-block">
                            Help individuals, professionals, content creators, and small businesses tell clear, engaging stories through videos and websites full of personal touches, ready for higher conversion rates.
                        </p>
                    </div>

                    <div className="story-mission-grid">
                        <div className="story-mission-image">
                            <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1000&auto=format&fit=crop" alt="Team Hands" />
                        </div>
                        <div className="story-mission-content">
                            <h3 className="story-subheading text-blue">Mission</h3>
                            <ul className="story-list">
                                <li>
                                    Build a proactive, creative, and disciplined team: continuous learning, standardized processes, multi-layer quality control to deliver the best products to clients.
                                </li>
                                <li>
                                    Establish long-term credibility through transparency and responsibility: clear pricing, on-time delivery, client data confidentiality, and warranty within the package scope.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Values Section */}
            <div className="story-section story-core-values">
                <div className="story-bg-watermark">ZOOZOOSTUDIO</div>
                <div className="story-container">
                    <div className="story-values-grid">
                        <div className="story-values-content">
                            <h2 className="story-heading">
                                <span className="text-blue">Core</span> <span className="text-orange">Value</span>
                            </h2>
                            <ul className="story-values-list">
                                <li>
                                    <strong>Transparency:</strong> Clear pricing, specific scope of work, delivery on schedule. No additional costs beyond the agreement.
                                </li>
                                <li>
                                    <strong>Dedication:</strong> Careful attention to every frame and every line of text. Revise until it meets the objectives and brand voice within the package.
                                </li>
                                <li>
                                    <strong>Purposeful Creativity:</strong> Ideas must effectively drive views and conversions, not just showcase effects. Streamlined, clear, easy to understand, and brand-style consistent.
                                </li>
                                <li>
                                    <strong>Quality Standards:</strong> Multi-layer checks: audio, color, subtitles, editing rhythm; loading speed, multi-device display, on-page SEO. Preview version provided before finalization.
                                </li>
                                <li>
                                    <strong>Sustainable Development:</strong> Long-term collaboration, scientific resource management, reuse of editing templates and layouts to save client time and cost.
                                </li>
                                <li>
                                    <strong>Value Delivered to Clients:</strong> Deliver original files, color presets, subtitle templates; instructions for self-updating the website and post-delivery support.
                                </li>
                                <li>
                                    <strong>Data Security:</strong> Commitment to confidentiality, shared only as necessary. Ready to sign a confidentiality agreement if requested.
                                </li>
                                <li>
                                    <strong>On-Time Delivery:</strong> Respect clients’ time. Contingency mechanisms in place and commitment to resolve any delays.
                                </li>
                            </ul>
                        </div>
                        <div className="story-values-image">
                            <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop" alt="Core Values" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Meet Our Team Section */}
            <div className="story-section story-team">
                <div className="story-container text-center">
                    <p className="story-intro-text text-orange">We're hiring</p>
                    <h2 className="story-heading-large">MEET OUR TEAM</h2>
                    <p className="story-desc-text">
                        Our philosophy is simple — hire a team of diverse, passionate people and foster a culture that empowers you to do your best work.
                    </p>
                    <button className="story-btn-primary btn-large">Join Us Now</button>

                    <div className="story-team-grid">
                        {teamMembers.map(member => (
                            <div key={member.id} className="story-team-card">
                                <div className="story-team-avatar">
                                    <img src={member.image} alt={member.name} />
                                </div>
                                <h4 className="story-team-name">{member.name}</h4>
                                <p className="story-team-role">{member.role}</p>
                                <p className="story-team-desc">{member.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Team Slider Section */}
            <div className="story-section story-team-slider-section">
                <div className="story-container">
                    <h2 className="story-heading text-center mb-5">
                        <span className="text-blue">Our</span> <span className="text-orange">Team</span>
                    </h2>

                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000 }}
                        className="story-swiper"
                    >
                        {teamPhotos.map((photo, index) => (
                            <SwiperSlide key={index}>
                                <div className="story-slide-image">
                                    <img src={photo} alt={`Team Activity ${index + 1}`} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default OurStory;
