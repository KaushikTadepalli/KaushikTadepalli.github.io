const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: false,
  speed: 2000,
  slidesPerView: 4,
  spaceBetween: 60,
  mousewheel: true,
  parallax: true,
  centeredSlides: true,
  effect: "coverflow",
  coverflowEffect: {
    rotate: 40,
    slideShadows: true
  },
  autoplay: {
    delay: 8000,
    pauseOnMouseEnter: true
  },
  scrollbar: {
    el: ".swiper-scrollbar"
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 60
    },
    600: {
      slidesPerView: 2,
      spaceBetween: 60
    },
    1000: {
      slidesPerView: 3,
      spaceBetween: 60
    },
    1400: {
      slidesPerView: 4,
      spaceBetween: 60
    },
    2300: {
      slidesPerView: 5,
      spaceBetween: 60
    },
    2900: {
      slidesPerView: 6,
      spaceBetween: 60
    }
  }
});

document.querySelectorAll("nav ul li a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const slideId = this.getAttribute("href").substring(1);
    const slideIndex = Array.from(
      document.querySelectorAll(".swiper-slide")
    ).findIndex((slide) => slide.id === slideId);
    swiper.slideTo(slideIndex);
  });
});
