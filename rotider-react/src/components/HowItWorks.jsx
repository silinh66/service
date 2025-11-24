import React, { useEffect } from "react";

const HowItWorks = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll(".step-item").forEach((item) => {
      item.style.opacity = 0;
      item.style.transform = "translateY(20px)";
      item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="modern-section" style={{ backgroundColor: "#f8f9fa" }}>
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "10px" }}>HOW ZOOZOO WORKS</h2>
        <p style={{ color: "#666" }}>Simple 4-step process to get your photos edited</p>
      </div>

      <div className="steps-container">
        {/* Phase 1 */}
        <div className="step-item">
          <div className="step-image">
            <img src="/assets/process-1.jpg" alt="Upload" style={{ width: "100%", borderRadius: "8px", boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }} />
          </div>
          <div className="step-content">
            <div className="step-number">01</div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "15px" }}>Upload photos or videos</h3>
            <p style={{ color: "#666" }}>
              Upload your raw photos or videos directly to our platform. We support all major formats.
            </p>
          </div>
        </div>

        {/* Phase 2 */}
        <div className="step-item reverse">
          <div className="step-image">
            <img src="/assets/process-2.jpg" alt="Editing" style={{ width: "100%", borderRadius: "8px", boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }} />
          </div>
          <div className="step-content">
            <div className="step-number">02</div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "15px" }}>Expert Editing</h3>
            <p style={{ color: "#666" }}>
              Our professional editors get to work immediately, applying advanced techniques to enhance your media.
            </p>
          </div>
        </div>

        {/* Phase 3 */}
        <div className="step-item">
          <div className="step-image">
            <img src="/assets/process-3.jpg" alt="Quality Control" style={{ width: "100%", borderRadius: "8px", boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }} />
          </div>
          <div className="step-content">
            <div className="step-number">03</div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "15px" }}>Quality Control</h3>
            <p style={{ color: "#666" }}>
              Every image goes through a strict quality assurance process to ensure it meets our high standards.
            </p>
          </div>
        </div>

        {/* Phase 4 */}
        <div className="step-item reverse">
          <div className="step-image">
            <img src="/assets/process-4.jpg" alt="Delivery" style={{ width: "100%", borderRadius: "8px", boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }} />
          </div>
          <div className="step-content">
            <div className="step-number">04</div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "15px" }}>Fast Delivery</h3>
            <p style={{ color: "#666" }}>
              Receive your edited photos within 24 hours. Download them directly from your dashboard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
