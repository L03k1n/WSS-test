document.addEventListener("DOMContentLoaded",function(){$(".header__mobile nav").hide(),$.fn.myShow=function(e){return this.animate({height:"toggle"},e||1e3)},$(".header__menu-btn").on("click",function(){$(".header__mobile nav").myShow(300),$(this).toggleClass("active")}),$(".video-control").on("click",function(n){{n=n.currentTarget.getAttribute("data-v");let e=document.querySelector("#video");return"play"==n?void($("#video-play").addClass("d-none"),$("#video-over").removeClass("d-none"),e.play()):(e.pause(),$("#video-play").removeClass("d-none"),void $("#video-over").addClass("d-none"))}});new Swiper(".swiper",{slidesPerView:1,speed:400,spaceBetween:0,centeredSlides:!0,centerInsufficientSlides:!0,loop:!0,centeredSlidesBounds:!0,pagination:{el:".swiper-pagination",type:"bullets",clickable:"true"},breakpoints:{320:{slidesPerView:1,spaceBetween:60},480:{slidesPerView:1.2,spaceBetween:40},640:{slidesPerView:1.5,spaceBetween:80},690:{spaceBetween:60}}})});