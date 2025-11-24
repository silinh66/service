/*------------------------------------- Preloader -------------------------------------*/
$(function () {
  setTimeout(() => {
    $(".preloader").fadeOut("slow");
  }, 2000);
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
// ------------- particles js Animation
particlesJS("particles-js", {
  particles: {
    number: { value: 52, density: { enable: true, value_area: 300 } },
    color: { value: "#ffffff" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 },
      image: { src: "", width: -10, height: 60 },
    },
    opacity: {
      value: 0.4,
      random: true,
      anim: {
        enable: false,
        speed: 1.7031630170316308,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 2,
      random: true,
      anim: { enable: false, speed: 150, size_min: 0.1, sync: false },
    },
    line_linked: {
      enable: false,
      distance: 176.19451874869847,
      color: "#ffffff",
      opacity: 0.1922122022713074,
      width: 1.1212378465826265,
    },
    move: {
      enable: true,
      speed: 3,
      direction: "bottom",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: true, rotateX: 600, rotateY: 1200 },
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
      grab: { distance: 400, line_linked: { opacity: 0.5 } },
      bubble: { distance: 400, size: 4, duration: 0.3, opacity: 1, speed: 3 },
      repulse: { distance: 200, duration: 0.4 },
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
    count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
  }
  requestAnimationFrame(update);
};
requestAnimationFrame(update);
// -------------------------------------- why choose Slider
$(".box-why").slick({
  centerMode: true,
  dots: true,
  centerPadding: "0px",
  slidesToShow: 1,
  infinite: true,
  arrows: false,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2000,
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
// ------------------ services slider
$(".services-data").slick({
  centerMode: true,
  centerPadding: "0px",
  slidesToShow: 1,
  infinite: true,
  arrows: false,
  speed: 500,
  fade: true,
  autoplay: true,
  autoplaySpeed: 2000,
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
// ------------------------------------ Slick Gallry Slider
$(".project-latest-data-all").slick({
  centerMode: true,
  centerPadding: "0px",
  slidesToShow: 1,
  infinite: true,
  arrows: false,
  speed: 500,
  fade: true,
  autoplay: true,
  autoplaySpeed: 2000,
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
// ------------------------------------ Slick Blog Slider
$(".blog-all-data").slick({
  centerMode: true,
  dots: true,
  centerPadding: "0px",
  slidesToShow: 1,
  infinite: true,
  arrows: false,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2000,
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
// ------------------------------------ Slick Blog Slider
$(".test-design-all").slick({
  centerMode: true,
  dots: true,
  centerPadding: "0px",
  slidesToShow: 1,
  infinite: true,
  arrows: false,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2000,
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
  autoplaySpeed: 2000,
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
