/* -----------------------------------------------
/* How to use? : Check the GitHub README
/* ----------------------------------------------- */

/* To load a config file (particles.json) you need to host this demo (MAMP/WAMP/local)... */
/*
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('particles.js loaded - callback');
});
*/

/* Otherwise just put the config content (json): */
! function(e) {
   e("#particles-snow").length > 0 && particlesJS("particles-snow", {
        particles: {
            number: {
                value: 25,
                density: {
                    enable: !0,
                    value_area: 800
                }
            },
            color: {
                value: "#ffffff"
            },
            shape: {
                type: "image",
                stroke: {
                    width: 8,
                    color: "#fff"
                },
                polygon: {
                    nb_sides: 10
                },
                image: {
                    src: "assets/images/hero-sec/snow.png",
                    width: 100,
                    height: 100
                }
            },
            opacity: {
                value: .7,
                random: !1,
                anim: {
                    enable: !1,
                    speed: 2,
                    opacity_min: .1,
                    sync: !1
                }
            },
            size: {
                value: 10,
                random: !0,
                anim: {
                    enable: !1,
                    speed: 10,
                    size_min: .1,
                    sync: !1
                }
            },
            line_linked: {
                enable: !1,
                distance: 50,
                color: "#ffffff",
                opacity: .6,
                width: 1
            },
            move: {
                enable: !0,
                speed: 1,
                direction: "top",
                random: !0,
                straight: !1,
                out_mode: "out",
                bounce: !1,
                attract: {
                    enable: !0,
                    rotateX: 300,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: !0,
                    mode: "bubble"
                },
                onclick: {
                    enable: !0,
                    mode: "repulse"
                },
                resize: !0
            },
            modes: {
                grab: {
                    distance: 150,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 200,
                    size: 10,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: .2
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: !0
    })
}(jQuery);