// Custom JavaScript
$(document).ready(function() {
    "use strict";
    
    // 1 col slider
    var swiper = new Swiper(".dtr-slider-1col", {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        speed: 300,
        //effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            reverseDirection: true
        },
    });
    
    // testimonial
    var swiper = new Swiper(".dtr-testimonial-carousel", {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        speed: 1200,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: ".swiper-pagination.dtr-testimonial__dots",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next.dtr-testimonial__next",
            prevEl: ".swiper-button-prev.dtr-testimonial__prev",
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true
        },
    });
    
    // posts carousel
    var swiper_recentposts = new Swiper(".dtr-recentposts-carousel", {  
        slidesPerView:1,    
        spaceBetween: 0,
        loop: true,
        speed: 1600,
        pagination: {
            el: ".swiper-pagination.dtr-recentposts__dots",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next.dtr-recentposts__next",
			prevEl: ".swiper-button-prev.dtr-recentposts__prev",
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false
        },
        breakpoints: {
          782: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
		},
    }); 
    
    // header
    function headerSticky() {
      var windowPos = $(window).scrollTop();
      var $header = $('.dtr-header.fixed-top');
      var $sidemenu = $('.dtr-header .dtr-sidemenu-wrapper');
      var $trigger = $('.dtr-header .dtr-navigation-trigger');      
      $header.toggleClass("header-fixed", windowPos > 80);
      $sidemenu.toggleClass("sidemenu-fixed", windowPos > 80);
      $trigger.toggleClass("trigger-fixed", windowPos > 80);
    }    
    headerSticky();
    $(window).scroll(headerSticky);

    // Vertical menu
    function dtrVerticalMenu(){
        $('.menu-item-has-children .sub-menu').hide();
        $('.dtr-vertical-nav').each( function() {
        var $hasChildren = $( this ).find('.menu-item-has-children');
            $hasChildren.each( function() {
            $( this ).addClass('parent');
            var $links = $( this ).children('a');
                $links.on('click', function( event ) {
                    var $linkParent = $( this ).parent('li');
                    var $allParents = $linkParent.parents('li');
                    if ( ! $linkParent.hasClass('active') ) {
                        $hasChildren.not( $allParents ).removeClass('active').children('.sub-menu').slideUp({duration: 400});
                        $linkParent.addClass('active').children('.sub-menu').stop( true, true ).slideDown({duration: 400});
                    } else {
                        $linkParent.removeClass('active').children('.sub-menu').stop( true, true ).slideUp({duration: 400});
                    }
                    return false;
                });
            });
        });
    }
    dtrVerticalMenu();
        
    // vertical menu trigger    
    $(".dtr-navigation-trigger").on('click', function(e) { 
        $(".dtr-sidemenu-wrapper,.dtr-sidemenu-scroll,.dtr-navigation-close-trigger").addClass("is-visible");
        e.preventDefault();
    });
    $(".dtr-navigation-close-trigger").on('click', function(e) { 
        $(".dtr-sidemenu-wrapper,.dtr-sidemenu-scroll,.dtr-navigation-close-trigger").removeClass("is-visible");
        e.preventDefault();
    }); 
    // vertical menu close on menu link click
    $(".menu-item > a").not('.menu-item-has-children > a').on('click', function(e) {
        $(".dtr-navigation-close-trigger,.dtr-sidemenu-wrapper,.dtr-sidemenu-scroll").toggleClass("is-visible");
    }); 

    // mobile menu
    $("#dtr-resp-menu-button").on('click', function() { 
        $(".slicknav_nav").slideToggle(); 
    }); 
		
    // responsive menu hamburger
    var $hamburger = $("#dtr-resp-menu-button");
    $hamburger.on("click", function(e) {
        $hamburger.toggleClass("is-active");
    });
        
    // Sroll to top
    var offset = 800;
    var duration = 400;
    $(window).scroll(function() {
    if ($(this).scrollTop() > offset) {
        $('#take-to-top').addClass("active");
    } else {
        $('#take-to-top').removeClass("active");
    }
    });
    $('#take-to-top').on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, duration);
        return false;
    });
    
    //contact form
    $(function () {
        var v = $("#contactform").validate({
            submitHandler: function (form) {
                $(form).ajaxSubmit({
                    target: "#contactresult",
                    clearForm: true
                });
            }
        });
    });
    
    // counter
    $(".dtr-counter").appear(function () {
        $(".counting-number").countTo();
    });

    // menu scroll	
    var headeroffset = $('#dtr-header-global').height();
    $('.dtr-nav a[href^="#"], .dtr-scroll-link').on('click', function(){  
        event.preventDefault();  
        var target = this.hash;
        var $target = $(target);
        if($target.length){
            $('html, body').animate({
                scrollTop: $($target).offset().top - headeroffset - 60
            }, 500);
            return false;
        }
    });
    
    // responsive scroll
    var mnavoffset = $('#dtr-responsive-header').height();
    $('.dtr-responsive-header-menu a[href^="#"]').on('click', function(){  
        event.preventDefault();  
        var target = this.hash;
        var $target = $(target);
        if($target.length){
            $('html, body').animate({
                scrollTop: $($target).offset().top - mnavoffset + 40
            }, 500);
            return false;
        }
    });
     
    // scrollspy   
    var win = $(window);
    var smallwin = $(window);
    function scrollSpy() {
        $("section").each(function () {
            if (win.scrollTop() >= $(this).offset().top - 180) {
                $(".dtr-nav li a[href='#" + $(this).attr("id") + "']").addClass("active").parent().siblings().find("a").removeClass("active");
            }
            if (smallwin.scrollTop() >= $(this).offset().top - 180) {
                $(".slicknav_menu li a[href='#" + $(this).attr("id") + "']").addClass("active").parent().siblings().find("a").removeClass("active");
            }
        });
    }
    win.on("scroll", scrollSpy);
    smallwin.on("scroll", scrollSpy);

    // sectionAnchor - link to section from another page
    function sectionAnchor() {
    var navoffset = $('#dtr-header-global').height();
        var hash = window.location.hash;
        if (hash !== '') {
            setTimeout(function() {
                $('html, body').stop().animate({
                    scrollTop: $(hash).offset().top - navoffset - 40
                }, 800);
                history.pushState('', document.title, window.location.pathname);
            }, 500);
        }
    } sectionAnchor();

    // responsiveAnchor - link to section from another page
    function responsiveAnchor() {
    var windowWidth=$(window).width();
        if(windowWidth<992){
            var mnavoffset = $('#dtr-responsive-header').height();
            var hash = window.location.hash;
            if (hash !== '') {
                setTimeout(function() {
                    $('html, body').stop().animate({
                        scrollTop: $(hash).offset().top - mnavoffset + 40
                    }, 800);
                    history.pushState('', document.title, window.location.pathname);
                }, 500);
            }
        }
    } responsiveAnchor();
    
    // wow animations
	if( $(window).outerWidth() >= 767 ) {
		new WOW().init({
			mobile: false,
		});
	}
        
});
// document ready end

// on load
$(window).on('load', function(){
	"use strict";
	$('.dtr-preloader').delay(400).fadeOut(500);
});