import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

const Hero = () => {
  const typedEl = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        "Enhancing Real Estate – Elevating Impressions",
        "Professional Photo – Video Editing",
        "Reliable and Fast Service",
      ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
      showCursor: false,
    };

    const typed = new Typed(typedEl.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section className="section" id="section_2018792387">
      <div className="section-bg fill"></div>
      <div className="section-content relative">
        <div className="banner has-hover is-full-height" id="banner-1082472658">
          <div className="banner-inner fill">
            <div className="banner-bg fill">
              <img
                loading="lazy"
                decoding="async"
                width="512"
                height="287"
                src="/assets/Hero-header-section.png"
                className="bg attachment-original size-original"
                alt="hero header section"
              />
            </div>
            <div className="banner-layers container">
              <div className="fill banner-link"></div>
              <div
                id="text-box-561771782"
                className="text-box banner-layer text-box-banner-home x50 md-x50 lg-x50 y85 md-y85 lg-y85 res-text"
              >
                <div className="text-box-content text dark">
                  <div className="text-inner text-center">
                    <h1 id="banner-title">
                      <span ref={typedEl}></span>
                    </h1>
                    <p>
                      We’re ZOOZOO Media, based in Vietnam, providing top-tier
                      real estate photo, video, and 3D editing services with a
                      focus on quick turnaround times, reasonable price and
                      stable skills you can rely on.
                    </p>
                    <div
                      id="gap-6562294"
                      className="gap-element clearfix"
                      style={{ display: "block", height: "auto" }}
                    >
                      <style>{`
                        #gap-6562294 {
                          padding-top: 25px;
                        }
                      `}</style>
                    </div>
                    <a
                      href="https://orders.ZOOZOO.com/my-account/service"
                      target="_blank"
                      className="button white btn-banner-home"
                      rel="noopener"
                      style={{ borderRadius: "12px" }}
                    >
                      <span>Start an order</span>
                    </a>
                    <div
                      id="gap-247001426"
                      className="gap-element clearfix"
                      style={{ display: "block", height: "auto" }}
                    >
                      <style>{`
                        #gap-247001426 {
                          padding-top: 40px;
                        }
                      `}</style>
                    </div>
                    <div className="row" id="row-953003159">
                      {/* Stats Columns */}
                      <div
                        id="col-969489179"
                        className="col medium-3 small-6 large-3"
                      >
                        <div className="col-inner">
                          <div
                            id="stack-2449312191"
                            className="stack banner-ic-box stack-col justify-center items-center"
                          >
                            <div
                              id="stack-3625273000"
                              className="stack banner-ic-box-in stack-col justify-center items-center"
                            >
                              <div
                                className="img has-hover home-ic-head-img x md-x lg-x y md-y lg-y"
                                id="image_360934813"
                              >
                                <div className="img-inner dark">
                                  <img
                                    loading="lazy"
                                    decoding="async"
                                    width="64"
                                    height="64"
                                    src="/assets/clock-white.png"
                                    className="attachment-original size-original"
                                    alt="icon"
                                  />
                                </div>
                                <style>{` #image_360934813 { width: 100%; } `}</style>
                              </div>
                              <div
                                id="text-3761943748"
                                className="text text-q-banner"
                              >
                                <h3>
                                  <strong>99,98%</strong>
                                </h3>
                                <p>
                                  On Time Delivery
                                  <br />
                                </p>
                              </div>
                              <div
                                className="img has-hover image-ab-in x md-x lg-x y md-y lg-y"
                                id="image_1086175147"
                              >
                                <div className="img-inner dark">
                                  <img
                                    loading="lazy"
                                    decoding="async"
                                    width="512"
                                    height="237"
                                    src="/assets/Widget.png"
                                    className="attachment-original size-original"
                                    alt="widget"
                                  />
                                </div>
                                <style>{` #image_1086175147 { width: 100%; } `}</style>
                              </div>
                              <style>{` #stack-3625273000 > * { --stack-gap: 0rem; } `}</style>
                            </div>
                            <style>{` #stack-2449312191 > * { --stack-gap: 0rem; } `}</style>
                          </div>
                        </div>
                      </div>

                      <div
                        id="col-1879619731"
                        className="col medium-3 small-6 large-3"
                      >
                        <div className="col-inner">
                          <div
                            id="stack-2058983173"
                            className="stack banner-ic-box stack-col justify-center items-center"
                          >
                            <div
                              id="stack-2749358488"
                              className="stack banner-ic-box-in stack-col justify-center items-center"
                            >
                              <div
                                className="img has-hover home-ic-head-img x md-x lg-x y md-y lg-y"
                                id="image_737422115"
                              >
                                <div className="img-inner dark">
                                  <img
                                    loading="lazy"
                                    decoding="async"
                                    width="64"
                                    height="64"
                                    src="/assets/favorites.png"
                                    className="attachment-original size-original"
                                    alt="icon"
                                  />
                                </div>
                                <style>{` #image_737422115 { width: 100%; } `}</style>
                              </div>
                              <div
                                id="text-248840073"
                                className="text text-q-banner"
                              >
                                <h3>
                                  <strong>97%</strong>
                                </h3>
                                <p>
                                  Customer Satisfaction
                                  <br />
                                </p>
                              </div>
                              <div
                                className="img has-hover image-ab-in x md-x lg-x y md-y lg-y"
                                id="image_1805621412"
                              >
                                <div className="img-inner dark">
                                  <img
                                    loading="lazy"
                                    decoding="async"
                                    width="512"
                                    height="237"
                                    src="/assets/Widget.png"
                                    className="attachment-original size-original"
                                    alt="widget"
                                  />
                                </div>
                                <style>{` #image_1805621412 { width: 100%; } `}</style>
                              </div>
                              <style>{` #stack-2749358488 > * { --stack-gap: 0rem; } `}</style>
                            </div>
                            <style>{` #stack-2058983173 > * { --stack-gap: 0rem; } `}</style>
                          </div>
                        </div>
                        <style>{` #col-1879619731 > .col-inner { margin: 0px 0px 0px 0px; } `}</style>
                      </div>

                      <div
                        id="col-1813639990"
                        className="col medium-3 small-6 large-3"
                      >
                        <div className="col-inner">
                          <div
                            id="stack-3779598039"
                            className="stack banner-ic-box stack-col justify-center items-center"
                          >
                            <div
                              id="stack-477902592"
                              className="stack banner-ic-box-in stack-col justify-center items-center"
                            >
                              <div
                                className="img has-hover home-ic-head-img x md-x lg-x y md-y lg-y"
                                id="image_514965887"
                              >
                                <div className="img-inner dark">
                                  <img
                                    loading="lazy"
                                    decoding="async"
                                    width="64"
                                    height="64"
                                    src="/assets/globe.png"
                                    className="attachment-original size-original"
                                    alt=""
                                  />
                                </div>
                                <style>{` #image_514965887 { width: 100%; } `}</style>
                              </div>
                              <div
                                className="img has-hover image-ab-in x md-x lg-x y md-y lg-y"
                                id="image_66346233"
                              >
                                <div className="img-inner dark">
                                  <img
                                    loading="lazy"
                                    decoding="async"
                                    width="512"
                                    height="237"
                                    src="/assets/Widget.png"
                                    className="attachment-original size-original"
                                    alt="widget"
                                  />
                                </div>
                                <style>{` #image_66346233 { width: 100%; } `}</style>
                              </div>
                              <div
                                id="text-1987198805"
                                className="text text-q-banner"
                              >
                                <h3>
                                  <strong>20+</strong>
                                </h3>
                                <p>Countries Served</p>
                              </div>
                              <style>{` #stack-477902592 > * { --stack-gap: 0rem; } `}</style>
                            </div>
                            <style>{` #stack-3779598039 > * { --stack-gap: 0rem; } `}</style>
                          </div>
                        </div>
                        <style>{`
                            #col-1813639990 > .col-inner { margin: 70px 0px 0px 0px; }
                            @media (min-width:550px) { #col-1813639990 > .col-inner { margin: 0px 0px 0px 0px; } }
                         `}</style>
                      </div>

                      <div
                        id="col-2040384463"
                        className="col medium-3 small-6 large-3"
                      >
                        <div className="col-inner">
                          <div
                            id="stack-2340335430"
                            className="stack banner-ic-box stack-col justify-center items-center"
                          >
                            <div
                              id="stack-1197690815"
                              className="stack banner-ic-box-in stack-col justify-center items-center"
                            >
                              <div
                                className="img has-hover home-ic-head-img x md-x lg-x y md-y lg-y"
                                id="image_1700703085"
                              >
                                <div className="img-inner dark">
                                  <img
                                    loading="lazy"
                                    decoding="async"
                                    width="64"
                                    height="64"
                                    src="/assets/award-white.png"
                                    className="attachment-original size-original"
                                    alt="icon"
                                  />
                                </div>
                                <style>{` #image_1700703085 { width: 100%; } `}</style>
                              </div>
                              <div
                                id="text-3772367845"
                                className="text text-q-banner"
                              >
                                <h3>
                                  <strong>8+ Years</strong>
                                </h3>
                                <p>Experience Editor</p>
                              </div>
                              <div
                                className="img has-hover image-ab-in x md-x lg-x y md-y lg-y"
                                id="image_1759075074"
                              >
                                <div className="img-inner dark">
                                  <img
                                    loading="lazy"
                                    decoding="async"
                                    width="512"
                                    height="237"
                                    src="/assets/Widget.png"
                                    className="attachment-original size-original"
                                    alt="widget"
                                  />
                                </div>
                                <style>{` #image_1759075074 { width: 100%; } `}</style>
                              </div>
                              <style>{` #stack-1197690815 > * { --stack-gap: 0rem; } `}</style>
                            </div>
                            <style>{` #stack-2340335430 > * { --stack-gap: 0rem; } `}</style>
                          </div>
                        </div>
                        <style>{`
                            #col-2040384463 > .col-inner { margin: 70px 0px 0px 0px; }
                            @media (min-width:550px) { #col-2040384463 > .col-inner { margin: 0px 0px 0px 0px; } }
                        `}</style>
                      </div>
                    </div>
                  </div>
                </div>
                <style>{`
                  #text-box-561771782 { width: 100%; }
                  #text-box-561771782 .text-box-content { font-size: 100%; }
                `}</style>
              </div>
            </div>
          </div>
          <style>{` #banner-1082472658 { padding-top: 100%; } `}</style>
        </div>
      </div>
      <style>{` #section_2018792387 { padding-top: 0px; padding-bottom: 0px; } `}</style>
    </section>
  );
};

export default Hero;
