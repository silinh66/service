import React, { useEffect } from "react";

const HowItWorks = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll(".fade-item").forEach((item) => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section sec4" id="section_126868153">
      <div className="section-bg fill">
        <img
          loading="lazy"
          decoding="async"
          width="576"
          height="904"
          src="/assets/Features-section.png"
          className="bg attachment-original size-original"
          alt="Features-section"
        />
      </div>
      <div className="section-content relative">
        <div className="row" id="row-431569064">
          <div id="col-683667602" className="col small-12 large-12">
            <div className="col-inner">
              <div
                id="gap-2031178059"
                className="gap-element clearfix"
                style={{ display: "block", height: "auto" }}
              >
                <style>{` #gap-2031178059 { padding-top: 50px; } `}</style>
              </div>
              <div className="container section-title-container sec2_title">
                <h3 className="section-title section-title-center">
                  <b></b>
                  <span className="section-title-main">how ZOOZOO works</span>
                  <b></b>
                </h3>
              </div>
            </div>
          </div>

          {/* Phase 1 */}
          <div id="col-722529573" className="col col-act small-12 large-12">
            <div className="col-inner">
              <div className="row row-small" id="row-751654254">
                <div
                  id="col-1152589391"
                  className="col medium-5 small-12 large-5"
                >
                  <div className="col-inner">
                    <div
                      id="stack-3901929890"
                      className="stack sec4_stack_img fade-item fade-left stack-row justify-center items-center"
                    >
                      <div
                        className="img has-hover sec4_stack_img_in x md-x lg-x y md-y lg-y"
                        id="image_1293482575"
                      >
                        <div className="img-inner dark">
                          <img
                            loading="lazy"
                            decoding="async"
                            width="1621"
                            height="1080"
                            src="/assets/process-1.jpg"
                            className="attachment-original size-original"
                            alt="ZOOZOO's Working Process"
                          />
                        </div>
                        <style>{` #image_1293482575 { width: 90%; } `}</style>
                      </div>
                      <style>{` #stack-3901929890 > * { --stack-gap: 0rem; } `}</style>
                    </div>
                  </div>
                </div>
                <div
                  id="col-1262760444"
                  className="col medium-6 small-12 large-6"
                >
                  <div className="col-inner">
                    <div className="icon-box featured-box ic-box-home icon-box-left text-left">
                      <div className="icon-box-img" style={{ width: "110px" }}>
                        <div className="icon">
                          <div className="icon-inner">
                            <img
                              loading="lazy"
                              decoding="async"
                              width="300"
                              height="300"
                              src="/assets/upload-icon.png"
                              className="attachment-medium size-medium"
                              alt="icon"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="icon-box-text last-reset">
                        <div className="container section-title-container how-w-title fade-item fade-right">
                          <h3 className="section-title section-title-normal">
                            <b></b>
                            <span
                              className="section-title-main"
                              style={{ color: "rgb(255, 255, 255)" }}
                            >
                              PHASE 1
                            </span>
                            <b></b>
                          </h3>
                        </div>
                        <div
                          id="stack-1293357516"
                          className="stack fade-item fade-right stack-row justify-start items-stretch"
                        >
                          <div id="text-3891718789" className="text">
                            <h3>Upload photos or videos of your property</h3>
                            <p>Upload photos or videos of your property</p>
                            <style>{` #text-3891718789 { color: rgb(255, 255, 255); } #text-3891718789 > * { color: rgb(255, 255, 255); } `}</style>
                          </div>
                          <style>{` #stack-1293357516 > * { --stack-gap: 0rem; } `}</style>
                        </div>
                      </div>
                    </div>
                  </div>
                  <style>{` #col-1262760444 > .col-inner { padding: 0px 0px 0px 0px; } @media (min-width:550px) { #col-1262760444 > .col-inner { padding: 100px 0px 0px 0px; } } `}</style>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="row row-small align-right" id="row-1970254327">
            <div
              id="col-2005381679"
              className="col hide-for-small medium-4 small-12 large-4"
            >
              <div className="col-inner">
                <div className="container section-title-container how-w-title title-right fade-item fade-left">
                  <h3 className="section-title section-title-normal">
                    <b></b>
                    <span
                      className="section-title-main"
                      style={{ color: "rgb(255, 255, 255)" }}
                    >
                      PHASE 2
                    </span>
                    <b></b>
                  </h3>
                </div>
                <div
                  id="stack-2762900158"
                  className="stack fade-item fade-left stack-row justify-end items-stretch"
                >
                  <div id="text-398892496" className="text">
                    <h3 style={{ textAlign: "right" }}>
                      Real estate editors go to work
                    </h3>
                    <p style={{ textAlign: "right" }}>
                      Every project you send to ZOOZOO will be assigned to an
                      expert editor
                    </p>
                    <style>{` #text-398892496 { color: rgb(255, 255, 255); } #text-398892496 > * { color: rgb(255, 255, 255); } `}</style>
                  </div>
                  <style>{` #stack-2762900158 > * { --stack-gap: 0rem; } `}</style>
                </div>
              </div>
              <style>{` #col-2005381679 > .col-inner { padding: 125px 20px 0px 0px; } `}</style>
            </div>
            <div
              id="col-2080055016"
              className="col re-order-h2 medium-2 small-12 large-2"
            >
              <div className="col-inner">
                <div className="icon-box featured-box ic-box-home icon-box-left text-left">
                  <div className="icon-box-img" style={{ width: "110px" }}>
                    <div className="icon">
                      <div className="icon-inner">
                        <img
                          loading="lazy"
                          decoding="async"
                          width="300"
                          height="300"
                          src="/assets/edit-icon.png"
                          className="attachment-medium size-medium"
                          alt="icon"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="icon-box-text last-reset">
                    <div className="container section-title-container how-w-title show-for-small">
                      <h3 className="section-title section-title-normal">
                        <b></b>
                        <span
                          className="section-title-main"
                          style={{ color: "rgb(255, 255, 255)" }}
                        >
                          PHASE 2
                        </span>
                        <b></b>
                      </h3>
                    </div>
                    <div
                      id="stack-2871464335"
                      className="stack stack-row justify-start items-stretch"
                    >
                      <div id="text-2525699478" className="text show-for-small">
                        <h3>Real estate editors go to work</h3>
                        <p>
                          Every project you send to ZOOZOO will be assigned to
                          an expert editor
                        </p>
                        <style>{` #text-2525699478 { color: rgb(255, 255, 255); } #text-2525699478 > * { color: rgb(255, 255, 255); } `}</style>
                      </div>
                      <style>{` #stack-2871464335 > * { --stack-gap: 0rem; } `}</style>
                    </div>
                  </div>
                </div>
              </div>
              <style>{` #col-2080055016 > .col-inner { padding: 0px 0px 0px 0px; } @media (min-width:550px) { #col-2080055016 > .col-inner { padding: 100px 0px 0px 0px; } } `}</style>
            </div>
            <div
              id="col-1801153470"
              className="col re-order-h1 medium-5 small-12 large-5"
            >
              <div className="col-inner">
                <div
                  id="stack-3253010176"
                  className="stack sec4_stack_img fade-item fade-right stack-row justify-center items-center"
                >
                  <div
                    className="img has-hover sec4_stack_img_in x md-x lg-x y md-y lg-y"
                    id="image_147876974"
                  >
                    <div className="img-inner dark">
                      <img
                        loading="lazy"
                        decoding="async"
                        width="1621"
                        height="1080"
                        src="/assets/process-2.jpg"
                        className="attachment-original size-original"
                        alt="ZOOZOO's Working Process"
                      />
                    </div>
                    <style>{` #image_147876974 { width: 90%; } `}</style>
                  </div>
                  <style>{` #stack-3253010176 > * { --stack-gap: 0rem; } `}</style>
                </div>
              </div>
              <style>{` #col-1801153470 > .col-inner { margin: 0px 0px 0px 0px; } @media (min-width:550px) { #col-1801153470 > .col-inner { margin: 0px 0px 0px 0px; } } @media (min-width:850px) { #col-1801153470 > .col-inner { margin: 0px 0px 0px -70px; } } `}</style>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="row row-small" id="row-1208273442">
            <div id="col-971083774" className="col medium-5 small-12 large-5">
              <div className="col-inner">
                <div
                  id="stack-1126821081"
                  className="stack sec4_stack_img fade-item fade-left stack-row justify-center items-center"
                >
                  <div
                    className="img has-hover sec4_stack_img_in x md-x lg-x y md-y lg-y"
                    id="image_1563521316"
                  >
                    <div className="img-inner dark">
                      <img
                        loading="lazy"
                        decoding="async"
                        width="1621"
                        height="1080"
                        src="/assets/process-3.jpg"
                        className="attachment-original size-original"
                        alt="ZOOZOO's Working Process"
                      />
                    </div>
                    <style>{` #image_1563521316 { width: 90%; } `}</style>
                  </div>
                  <style>{` #stack-1126821081 > * { --stack-gap: 0rem; } `}</style>
                </div>
              </div>
            </div>
            <div id="col-546367395" className="col medium-6 small-12 large-6">
              <div className="col-inner">
                <div className="icon-box featured-box ic-box-home icon-box-left text-left">
                  <div className="icon-box-img" style={{ width: "110px" }}>
                    <div className="icon">
                      <div className="icon-inner">
                        <img
                          loading="lazy"
                          decoding="async"
                          width="300"
                          height="300"
                          src="/assets/search-icon.png"
                          className="attachment-medium size-medium"
                          alt="icon"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="icon-box-text last-reset">
                    <div className="container section-title-container how-w-title fade-item fade-right">
                      <h3 className="section-title section-title-normal">
                        <b></b>
                        <span
                          className="section-title-main"
                          style={{ color: "rgb(255, 255, 255)" }}
                        >
                          PHASE 3
                        </span>
                        <b></b>
                      </h3>
                    </div>
                    <div
                      id="stack-3753593147"
                      className="stack fade-item fade-right stack-row justify-start items-stretch"
                    >
                      <div id="text-219043630" className="text">
                        <h3>Quality Control Managers go to work</h3>
                        <p>
                          The outputs go through a strict quality control
                          process carried out by our experts
                        </p>
                        <style>{` #text-219043630 { color: rgb(255, 255, 255); } #text-219043630 > * { color: rgb(255, 255, 255); } `}</style>
                      </div>
                      <style>{` #stack-3753593147 > * { --stack-gap: 0rem; } `}</style>
                    </div>
                  </div>
                </div>
              </div>
              <style>{` #col-546367395 > .col-inner { padding: 0px 0px 0px 0px; } @media (min-width:550px) { #col-546367395 > .col-inner { padding: 100px 0px 0px 0px; } } `}</style>
            </div>
          </div>

          {/* Phase 4 */}
          <div className="row row-small align-right" id="row-2132048701">
            {/* Simplified Phase 4 content for brevity, similar structure to Phase 2 */}
            <div
              id="col-561670866"
              className="col hide-for-small medium-4 small-12 large-4"
            >
              <div className="col-inner">
                <div className="container section-title-container how-w-title title-right fade-item fade-left">
                  <h3 className="section-title section-title-normal">
                    <b></b>
                    <span
                      className="section-title-main"
                      style={{ color: "rgb(255, 255, 255)" }}
                    >
                      PHASE 4
                    </span>
                    <b></b>
                  </h3>
                </div>
                <div
                  id="stack-22363629"
                  className="stack fade-item fade-left stack-row justify-end items-stretch"
                >
                  <div id="text-1324301785" className="text">
                    <h3 style={{ textAlign: "right" }}>Receive high quality</h3>
                    <p style={{ textAlign: "right" }}>
                      You will receive an email notification when your order is
                      ready for download
                    </p>
                    <style>{` #text-1324301785 { color: rgb(255, 255, 255); } #text-1324301785 > * { color: rgb(255, 255, 255); } `}</style>
                  </div>
                  <style>{` #stack-22363629 > * { --stack-gap: 0rem; } `}</style>
                </div>
              </div>
              <style>{` #col-561670866 > .col-inner { padding: 125px 20px 0px 0px; } `}</style>
            </div>
            <div
              id="col-1842585728"
              className="col re-order-h2 medium-2 small-12 large-2"
            >
              <div className="col-inner">
                <div className="icon-box featured-box ic-box-home icon-box-left text-left">
                  <div className="icon-box-img" style={{ width: "110px" }}>
                    <div className="icon">
                      <div className="icon-inner">
                        <img
                          loading="lazy"
                          decoding="async"
                          width="300"
                          height="300"
                          src="/assets/download-icon.png"
                          className="attachment-medium size-medium"
                          alt="icon"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <style>{` #col-1842585728 > .col-inner { padding: 0px 0px 0px 0px; } @media (min-width:550px) { #col-1842585728 > .col-inner { padding: 100px 0px 0px 0px; } } `}</style>
            </div>
            <div
              id="col-1001915080"
              className="col re-order-h1 medium-5 small-12 large-5"
            >
              <div className="col-inner">
                <div
                  id="stack-3142268527"
                  className="stack sec4_stack_img fade-item fade-right stack-row justify-center items-center"
                >
                  <div
                    className="img has-hover sec4_stack_img_in x md-x lg-x y md-y lg-y"
                    id="image_1583455023"
                  >
                    <div className="img-inner dark">
                      <img
                        loading="lazy"
                        decoding="async"
                        width="1621"
                        height="1080"
                        src="/assets/process-4.jpg"
                        className="attachment-original size-original"
                        alt="ZOOZOO's Working Process"
                      />
                    </div>
                    <style>{` #image_1583455023 { width: 90%; } `}</style>
                  </div>
                  <style>{` #stack-3142268527 > * { --stack-gap: 0rem; } `}</style>
                </div>
              </div>
              <style>{` #col-1001915080 > .col-inner { margin: 0px 0px 0px 0px; } @media (min-width:550px) { #col-1001915080 > .col-inner { margin: 0px 0px 0px 0px; } } @media (min-width:850px) { #col-1001915080 > .col-inner { margin: 0px 0px 0px -70px; } } `}</style>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
