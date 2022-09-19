document.addEventListener('DOMContentLoaded', function(){
  $('.header__mobile nav').hide()
    $.fn.myShow = function(duration) {
      return this.animate({height: "toggle"}, duration || 1000);
    }
    $('.header__menu-btn').on('click', function(){
    $(".header__mobile nav").myShow(300);
    $(this).toggleClass('active');
    })
    function videoCtrl(e){
      let attr = e.currentTarget.getAttribute('data-v')
      let video = document.querySelector('#video')
      if(attr == 'play'){
        $("#video-play").addClass('d-none')
        $("#video-over").removeClass('d-none')
        video.play()
        return
      }
      video.pause()
      $("#video-play").removeClass('d-none')
      $("#video-over").addClass('d-none')
    }
    $('.video-control').on('click', function(e){
      videoCtrl(e)
    })
    const swiper = new Swiper('.swiper', {
      slidesPerView: 1,
      speed: 400,
      spaceBetween: 0,
      centeredSlides: true,
      centerInsufficientSlides: true,
      loop: true,
      centeredSlidesBounds: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: 'true'
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 60
        },
        480: {
          slidesPerView: 1.2,
          spaceBetween: 40
        },
        640: {
          slidesPerView: 1.5,
          spaceBetween: 80
        },
        690: {
          spaceBetween: 60
        }
      }
    });
})