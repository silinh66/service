/*------------------------------------- Preloader -------------------------------------*/
$(function () {
  setTimeout(() => {
    $(".preloader").fadeOut("slow");
  }, 1000);
});
//  ------------------------------------ Popup Scanner
$(document).ready(function () {
  $(".scan-btn").click(function () {
    $(".popup-overlay").fadeIn(200);
    $(".popup-box-content").addClass("show");
  });
  $(".close-popup, .popup-overlay").click(function () {
    $(".popup-box-content").removeClass("show");
    setTimeout(function () {
      $(".popup-overlay").fadeOut(200);
    }, 300);
  });
});
//  ------------------------------------ Popup Share
$(document).ready(function () {
  $(".scan-btn-second").click(function () {
    $(".popup-overlay").fadeIn(200);
    $(".popup-box-content-share").addClass("show");
  });
  $(".close-popup, .popup-overlay").click(function () {
    $(".popup-box-content-share").removeClass("show");
    setTimeout(function () {
      $(".popup-overlay").fadeOut(200);
    }, 300);
  });
});
/*------------------------------------- Scanner Img Download -------------------------------------*/
function downloadImage() {
  const imagePath = "assets/images/scanner-img.png";
  const fileName = "scanner-img.png";
  const link = document.createElement("a");
  link.href = imagePath;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
/*------------------------------------- Share Scanner Img -------------------------------------*/
function shareImage() {
  const imageUrl =
    window.location.origin +
    "/envato/digi-vcard/CEO/assets/images/main-img/scanner-img.png";
  const title = "Share Scanner Image";
  const text = "Check out this image!";
  if (navigator.share) {
    navigator
      .share({
        title: title,
        text: text,
        url: imageUrl,
      })
      .then(() => {
        console.log("Image shared successfully.");
      })
      .catch((error) => {
        console.error("Error sharing image:", error);
      });
  } else {
    alert("Sharing is not supported on this device.");
  }
}
// ----------------- Gallary Dersign
$('[data-fancybox="gallery"]').fancybox({
  buttons: ["slideShow", "thumbs", "zoom", "fullScreen", "share", "close"],
  loop: true,
  protect: true,
});
// ----------------------------------- counter
$(document).ready(function () {
  function animateCounter($el, target, duration) {
    let start = 0;
    let increment = target / (duration / 16); // ~60fps
    let timer = setInterval(function () {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      $el.text(Math.floor(start) + "+");
    }, 16);
  }
  let countersStarted = {};
  function startCounterIfNotStarted($el, target) {
    let id = $el.attr("id");
    if (!countersStarted[id]) {
      animateCounter($el, target, 6000);
      countersStarted[id] = true;
    }
  }
  function checkCountersVisibility() {
    $(".counter-deta").each(function () {
      let $counter = $(this);
      let elementTop = $counter.offset().top;
      let elementBottom = elementTop + $counter.outerHeight();
      let viewportTop = $(window).scrollTop();
      let viewportBottom = viewportTop + $(window).height();
      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        let targetValue = parseInt($counter.text()); // existing text thi target
        startCounterIfNotStarted($counter, targetValue);
      }
    });
  }
  $(window).on("load", function () {
    checkCountersVisibility();
  });
  $(window).on("scroll", function () {
    checkCountersVisibility();
  });
});
// ----------------------------------- Service Slider
$(".services-main").slick({
  centerMode: true,
  centerPadding: "0px",
  slidesToShow: 1,
  infinite: true,
  arrows: false,
  speed: 500,
  fade: true,
  autoplay: true,
  autoplaySpeed: 1000,
  responsive: [
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        infinite: true,
        centerMode: true,
        centerPadding: "0px",
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 380,
      settings: {
        arrows: false,
        infinite: true,
        centerMode: true,
        centerPadding: "0px",
        slidesToShow: 1,
      },
    },
  ],
});
// ------------------------------------ team Slider
$(".team-design-all").slick({
  centerMode: true,
  centerPadding: "0px",
  slidesToShow: 2,
  infinite: true,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 1000,
  responsive: [
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        infinite: true,
        centerMode: true,
        centerPadding: "0px",
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 380,
      settings: {
        arrows: false,
        infinite: true,
        centerMode: true,
        centerPadding: "0px",
        slidesToShow: 2,
      },
    },
  ],
});
// ------------------------------------ Slick Gallry Slider
$(".gallery-mex-design").slick({
  centerMode: true,
  centerPadding: "0px",
  slidesToShow: 1,
  infinite: true,
  arrows: false,
  speed: 500,
  fade: true,
  autoplay: true,
  autoplaySpeed: 1000,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        infinite: true,
        centerMode: true,
        centerPadding: "0px",
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 380,
      settings: {
        arrows: false,
        infinite: true,
        centerMode: true,
        centerPadding: "0px",
        slidesToShow: 1,
      },
    },
  ],
});
// ----------------- Gallary Dersign
$('[data-fancybox="gallery"]').fancybox({
  buttons: ["slideShow", "thumbs", "zoom", "fullScreen", "share", "close"],
  loop: true,
  protect: true,
});
/*------------------------------------- Bloger slider -------------------------------------*/
$(".main-all-bloger-instant").slick({
  centerMode: true,
  dots: true,
  centerPadding: "0px",
  slidesToShow: 1,
  infinite: true,
  arrows: false,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 1000,
  responsive: [
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        infinite: true,
        centerMode: true,
        centerPadding: "0px",
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 380,
      settings: {
        arrows: false,
        infinite: true,
        centerMode: true,
        centerPadding: "0px",
        slidesToShow: 1,
      },
    },
  ],
});
//  ------------------------------------ Popup bloges
$(document).ready(function () {
  $(".blog-name").click(function () {
    $(".popup-overlay").fadeIn(200);
    $(".popup-box").addClass("show");
  });
  $(".close-popup, .popup-overlay").click(function () {
    $(".popup-box").removeClass("show");
    setTimeout(function () {
      $(".popup-overlay").fadeOut(200);
    }, 300);
  });
});
/*------------------------------------- Testimonial slider -------------------------------------*/
$(".main-mentor-design").slick({
  centerMode: true,
  dots: true,
  centerPadding: "0px",
  slidesToShow: 1,
  infinite: true,
  arrows: false,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 1000,
  responsive: [
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        infinite: true,
        centerMode: true,
        centerPadding: "0px",
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 380,
      settings: {
        arrows: false,
        infinite: true,
        centerMode: true,
        centerPadding: "0px",
        slidesToShow: 1,
      },
    },
  ],
});
/*------------------------------------- Bg Design slider -------------------------------------*/
particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: false, value_area: 400 } },
    color: { value: "#ffffff" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 },
      image: { src: "img/github.svg", width: 100, height: 100 },
    },
    opacity: {
      value: 1,
      random: true,
      anim: { enable: true, speed: 1, opacity_min: 0, sync: false },
    },
    size: {
      value: 3,
      random: true,
      anim: { enable: false, speed: 4, size_min: 0.3, sync: false },
    },
    line_linked: {
      enable: false,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1,
      direction: "bottom",
      random: false,
      straight: true,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 300, rotateY: 300 },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "bubble" },
      onclick: { enable: true, mode: "repulse" },
      resize: true,
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: {
        distance: 170.31630170316308,
        size: 2,
        duration: 2,
        opacity: 1,
        speed: 3,
      },
      repulse: { distance: 400, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 },
    },
  },
  retina_detect: true,
});
var count_particles, stats, update;
stats = new Stats();
stats.setMode(0);
stats.dom.style.display = "none";
stats.domElement.style.position = "absolute";
stats.domElement.style.left = "0px";
stats.domElement.style.top = "0px";
document.body.appendChild(stats.domElement);
count_particles = document.querySelector(".js-count-particles");
update = function () {
  stats.begin();
  stats.end();
  if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
    if (count_particles) {
      count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
    }
  }
  requestAnimationFrame(update);
};
requestAnimationFrame(update);
// ------------------------------------ Slick Services separate Detail Gallry Slider
$(".image-services-detail").slick({
  centerMode: true,
  centerPadding: "0px",
  slidesToShow: 1,
  infinite: true,
  arrows: false,
  speed: 500,
  fade: true,
  autoplay: true,
  autoplaySpeed: 1000,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        infinite: true,
        centerMode: true,
        centerPadding: "0px",
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 380,
      settings: {
        arrows: false,
        infinite: true,
        centerMode: true,
        centerPadding: "0px",
        slidesToShow: 1,
      },
    },
  ],
});
// -------------------------- FAQ Section Design
$(document).ready(function () {
  $(".faq-question").click(function () {
    let parent = $(this).parent();
    if (!parent.hasClass("active")) {
      $(".faq-item").removeClass("active");
      $(".faq-answer").slideUp(300);
      parent.addClass("active");
      parent.find(".faq-answer").slideDown(300);
    } else {
      parent.removeClass("active");
      parent.find(".faq-answer").slideUp(300);
    }
  });
});
//  ------------------------------------ Popup Services
$(document).ready(function () {
  $(".blog-services").click(function () {
    $(".popup-overlay").fadeIn(200);
    $(".popup-box-dash").addClass("show");
  });

  $(".close-popup, .popup-overlay").click(function () {
    $(".popup-box-dash").removeClass("show");
    setTimeout(function () {
      $(".popup-overlay").fadeOut(200);
    }, 300);
  });
});

