/*------------------------------------- Preloader -------------------------------------*/
$(window).on("load", function () {
  $(".preloader").delay(800).fadeOut(600);
});
// --------------------------------------- Bg Design
(function ($) {
  "use strict";
  $(".sakura-falling").sakura();
})(jQuery);
// ------------------------------------ Slick Services Slider
$(".center").slick({
  centerMode: true,
  centerPadding: "0px",
  slidesToShow: 2,
  infinite: true,
  arrows: false,
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
  // ------------------- open date and time box 
  $(function () {
    $("#datepicker").datepicker({
      dateFormat: "dd-mm-yy",
      duration: "fast",
    });
  });
  $(document).ready(function () {
    $("#datepicker").on("change keyup", function () {
      if ($(this).val().trim() !== "") {
        $(".data-relative").hide(); // Hide when date is selected
      } else {
        $(".data-relative").show(); // Show again if input is cleared
      }
    });
  });
// ------------------------------------ Slick Gallry Slider
$(".main").slick({
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
// ----------------- Gallary Dersign
$('[data-fancybox="gallery"]').fancybox({
  buttons: [
    "slideShow",
    "thumbs",
    "zoom",
    "fullScreen",
    "share",
    "close"
  ],
  loop: false,
  protect: true
});
// ------------------------------------ Slick Packages Slider
$(".packages").slick({
  centerMode: true,
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
// ------------------------------------ Slick Client Review Slider
$(".apointment-data").slick({
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
$(".blog-design").slick({
  centerMode: true,
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
