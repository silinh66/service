/***************************************************
==================== JS INDEX ======================
****************************************************
01. Pre Loader
02. Mobile Menu
03. Nive Select
04. Search Bar 
05. Data Background
06. Mobile Menu
07. Slick Slider
08. ScrollToTop Js
09. Tour SLider
10. Testimonial SLider
11. SideBar Banner Slider
12. Image Loaded
13. Product Countdown
****************************************************/


(function ($) {
"use strict";

	////////////////////////////////////////////////////
    // 01. Pre loader
	$(window).on('load',function() {
		$("#loading").fadeOut(500);
	});


	 //////////////////////////////////////////////////////
    // 02. Mobile Menu
    $("#mobile-menu").meanmenu({
        meanMenuContainer: ".mobile-menu",
        meanScreenWidth: "991"
	});
	
	////////////////////////////////////////////////////
    // 03. NiceSelect
	$('select').niceSelect();
	
	////////////////////////////////////////////////////
	// 04. Search Bar
	$(".search").on("click", function () {
		$(".search-bar-wrapper").addClass("search-bar-open");
	});
	$(".search-close").on("click", function () {
		$(".search-bar-wrapper").removeClass("search-bar-open");
	});

	////////////////////////////////////////////////////
	// 05. Data Background
	$("[data-background").each(function () {
		$(this).css("background-image", "url( " + $(this).attr("data-background") + "  )");
	});

	////////////////////////////////////////////////////
	// 06. mobile menu
	$("#mobile-menu").meanmenu({
		meanMenuContainer: ".mobile-menu",
		meanScreenWidth: "991"
	});


	////////////////////////////////////////////////////
	// 07. Slick Slider
	function mainSlider() {
	var BasicSlider = $('.hero-slider');
	BasicSlider.on('init', function (e, slick) {
		var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
		doAnimations($firstAnimatingElements);
	});
	BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
		var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
		doAnimations($animatingElements);
	});
	BasicSlider.slick({
		autoplay: true,
		autoplaySpeed: 8000,
		dots: false,
		fade: true,
		arrows: true,
		prevArrow: '<button type="button" class="slick-prev"><i class="fal fa-arrow-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="fal fa-arrow-right"></i></button>',
		responsive: [{
		breakpoint: 767,
		settings: {
			dots: false,
			arrows: false
		}
		}]
	});

	function doAnimations(elements) {
		var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		elements.each(function () {
		var $this = $(this);
		var $animationDelay = $this.data('delay');
		var $animationType = 'animated ' + $this.data('animation');
		$this.css({
			'animation-delay': $animationDelay,
			'-webkit-animation-delay': $animationDelay
		});
		$this.addClass($animationType).one(animationEndEvents, function () {
			$this.removeClass($animationType);
		});
		});
	}
	}
	mainSlider();

	////////////////////////////////////////////////////
    // 08. ScrollToTop Js
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 500) {
            $('#scroll').fadeIn();
        } else {
            $('#scroll').fadeOut();
        }
    });
    $('#scroll').on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

	////////////////////////////////////////////////////
	// 09. Tour SLider
	$('.tour-slider').owlCarousel({
		loop:true,
		margin:30,
		autoplay:true,
		autoplayTimeout:3000,
		smartSpeed:500,
		items:3,
		navText:['<button><i class="fa fa-angle-left"></i>PREV</button>','<button>NEXT<i class="fa fa-angle-right"></i></button>'],
		nav:false,
		dots:false,
		responsive:{
			0:{
				items:1
			},
			767:{
				items:2
			},
			992:{
				items:3
			}
		}
	});

	////////////////////////////////////////////////////
	// 10. Testimonial SLider
	$('.testi-slider-active').owlCarousel({
		loop:true,
		margin:30,
		autoplay:true,
		autoplayTimeout:3000,
		smartSpeed:500,
		items:3,
		navText:['<button><i class="fa fa-angle-left"></i>PREV</button>','<button>NEXT<i class="fa fa-angle-right"></i></button>'],
		nav:false,
		dots:false,
		responsive:{
			0:{
				items:1
			},
			767:{
				items:2
			},
			992:{
				items:3
			}
		}
	});

	////////////////////////////////////////////////////
	// 11. SideBar Banner Slider
	$('.sidebar-banner').owlCarousel({
		loop:true,
		margin:30,
		autoplay:true,
		autoplayTimeout:3000,
		smartSpeed:500,
		items:3,
		navText:['<button><i class="fa fa-angle-left"></i></button>','<button><i class="fa fa-angle-right"></i></button>'],
		nav:true,
		dots:false,
		responsive:{
			0:{
				items:1
			},
			767:{
				items:1
			},
			992:{
				items:1
			}
		}
	});

	////////////////////////////////////////////////////
	// 12. Image Loaded
	$('.grid').imagesLoaded( function() {
		// init Isotope
		var $grid = $('.grid').isotope({
		  itemSelector: '.grid-item',
		  percentPosition: true,
		  masonry: {
			// use outer width of grid-sizer for columnWidth
			columnWidth: 1
		  }
		});	
	});
	
	////////////////////////////////////////////////////
	// 13. Product Countdown
	$(".countdown").countdown();

})(jQuery);