import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Services from "../components/Services";
import HowItWorks from "../components/HowItWorks";

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <HowItWorks />

      {/* Start An Order Section (Before Footer) */}
      <section className="section" id="section_1715829444">
        <div className="section-bg fill"></div>
        <div className="section-content relative">
          <div className="row" id="row-1880441741">
            <div id="col-1839458169" className="col small-12 large-12">
              <div className="col-inner text-center">
                <p>
                  <span style={{ fontSize: "120%", color: "#000000" }}>
                    <strong>Start An Order</strong>
                  </span>
                </p>
                <p>
                  Join over 100+ agencies and companies already growing with
                  ZOOZOO Media.
                </p>
                <Link
                  to="/login"
                  className="button primary lowercase color2"
                  style={{ borderRadius: "99px" }}
                >
                  <span>Order Now</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <style>{` #section_1715829444 { padding-top: 30px; padding-bottom: 30px; } `}</style>
      </section>
    </>
  );
};

export default Home;
