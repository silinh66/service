/*------------------------------------- Slider -------------------------------------*/
$('.country-bottom-sec, .testimonial-bottom').slick({
  dots: false,
  arrows: false,
  infinite: false,
  autoplay:true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1
});

/*------------------------------------- Preloader -------------------------------------*/
$(window).on("load", function() {
  $('.preloader').delay(1000).fadeOut(800); 
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
