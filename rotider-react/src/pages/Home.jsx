import React, { Suspense } from 'react';
import '../modern-home.css';

// Lazy load components
const SonySlider = React.lazy(() => import('../components/SonySlider'));
const SliderVertical = React.lazy(() => import('../components/SliderVertical'));
const WebsiteDesign = React.lazy(() => import('../components/WebsiteDesign'));
const ContactSection = React.lazy(() => import('../components/ContactSection'));

// Loading fallback component
const LoadingFallback = () => (
  <div style={{
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    color: '#fff'
  }}>
    Loading...
  </div>
);

const Home = () => {
  return (
    <div className="modern-home">
      <Suspense fallback={<LoadingFallback />}>
        <SonySlider />
        <ContactSection />
        <SliderVertical />
        <WebsiteDesign />
      </Suspense>

      {/* Start An Order Section - Commented out as per original file */}
      {/* <div className="start-order-section">
                 <div className="start-order-content">
                     <h2>Ready to start your project?</h2>
                     <p>Get professional video editing services today</p>
                     <a href="/start-order" className="btn-start-order">Start an order</a>
                 </div>
             </div> */}
    </div>
  );
};

export default Home;
