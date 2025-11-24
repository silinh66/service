/*------------------------------------- Slider -------------------------------------*/
$('.testimonial-bottom-content, .project-bottom-sec').slick({
  dots: true,
  arrows: false,
  infinite: true,
  autoplay:false,
  speed: 300,
  rows: 0,
  slidesToShow: 1,
  slidesToScroll: 1
});

/*-------------------------------------Counter -------------------------------------*/
$(".counter-number").counterUp({
    delay: 10,
    time: 3000,
});

/*------------------------------------- Preloader -------------------------------------*/
$(window).on("load", function() {
  $('.preloader').delay(2000).fadeOut(1000); 
});

/*------------------------------------- Infinite Marquee -------------------------------------*/
document.querySelectorAll('.logos').forEach(function (logosContainer) {
  const copy = logosContainer.querySelector('.logos-slide').cloneNode(true);
  logosContainer.appendChild(copy);
});

/*------------------------------------- Scanner Img Download -------------------------------------*/
function downloadImage() {
  const imagePath = 'assets/images/main-img/scanner-img.png';
  const fileName = 'scanner-img.png';
  const link = document.createElement('a');
  link.href = imagePath;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
/*------------------------------------- Share Scanner Img -------------------------------------*/
function shareImage() {
  const imageUrl = window.location.origin + '/envato/digi-vcard/CEO/assets/images/main-img/scanner-img.png';
  const title = 'Share Scanner Image';
  const text = 'Check out this image!';
  if (navigator.share) {
    navigator.share({
      title: title,
      text: text,
      url: imageUrl
    }).then(() => {
      console.log('Image shared successfully.');
    }).catch((error) => {
      console.error('Error sharing image:', error);
    });
  } else {
    alert('Sharing is not supported on this device.');
  }
}