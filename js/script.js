"use strick";

/*---------------------------------------*/
/*     Global Function Declaration       */
/*---------------------------------------*/

/// Add Event on multiple element
const addEventOnElement = function (elements, eventType, callback) {
  elements.forEach((element) => {
    element.addEventListener(eventType, callback);
  });
};

/// Accordion Function
const accordion = function (lists) {
  lists.forEach((list) => {
    list.addEventListener("click", function () {
      lists.forEach((otherList) => {
        if (otherList !== list) {
          otherList.classList.remove("active");
        }
      });
      list.classList.toggle("active");
    });
  });
};

////////////////////////////////////////////////////////////////////////

/*---------------------------------------*/
/*           Header Functions            */
/*---------------------------------------*/
// Navigation Toggle

const navBar = document.querySelector("[data-nav-bar]");
const navBtn = document.querySelector("[data-nav-toggle-btn]");
const overlay = document.querySelector("[data-overlay]");

const toggleFunction = function () {
  navBar.classList.toggle("active");
  navBtn.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
};

addEventOnElement([navBtn, overlay], "click", toggleFunction);

// Sticky navigation barre
const header = document.querySelector(".header");
window.addEventListener("scroll", function () {
  header.classList[this.window.scrollY > 100 ? "add" : "remove"]("sticky");
});

// Smooth Animation

const navList = document.querySelector(".nav-bar-list");

navList.addEventListener("click", function (e) {
  e.preventDefault();
  const link = e.target;
  if (link.classList.contains("nav-bar-link")) {
    const id = link.getAttribute("href");
    id === "#"
      ? window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      : document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    toggleFunction();
  }
});

////////////////////////////////////////////////////////////////////////
// Read More and Footer Nav Toggle
const serviceDesc = document.querySelectorAll(".service-description");
const footerListItems = document.querySelectorAll(".footer-list-item");

accordion(serviceDesc);
accordion(footerListItems);

////////////////////////////////////////////////////////////////////////

/*---------------------------------------*/
/*           Testimonial Slider          */
/*---------------------------------------*/

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".btn-left");
  const btnRight = document.querySelector(".btn-right");
  const dotContainer = document.querySelector(".dots");
  let currentSlide = 0;
  const maxSlide = slides.length;

  // Create dots
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        ` <button class="dots-dot" data-slide=${i}></button>`
      );
    });
  };

  // Active Dots
  const activeDots = function (slide) {
    document.querySelectorAll(".dots-dot").forEach(function (dot) {
      dot.classList.remove("active");
      document
        .querySelector(`.dots-dot[data-slide="${slide}"]`)
        .classList.add("active");
    });
  };

  // Carrousel movement

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  // Next slide
  const nextSlide = function () {
    currentSlide === maxSlide - 1 ? (currentSlide = 0) : currentSlide++;
    goToSlide(currentSlide);
    activeDots(currentSlide);
  };

  // Previous Slide
  const prevSlide = function () {
    currentSlide === 0 ? (currentSlide = maxSlide - 1) : currentSlide--;
    goToSlide(currentSlide);
    activeDots(currentSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activeDots(0);
  };

  init();
  btnLeft.addEventListener("click", prevSlide);
  btnRight.addEventListener("click", nextSlide);

  // Key event

  document.addEventListener("keydown", function (e) {
    e.key === "ArrowRight" && nextSlide();
    e.key === "ArrowLeft" && prevSlide();
  });

  // Dots Event

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots-dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activeDots(slide);
    }
  });
};

slider();
