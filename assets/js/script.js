'use strict';



/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});

// function whatsapp() {
//   // Retrieve input field values
//   var name = document.getElementById('fname').value;
//   var phoneNumber = document.getElementById('number').value;
//   var numberOfPersons = document.getElementById('person').value;
//   var reservationDate = document.getElementById('date').value;
//   var reservationTime = document.getElementById('time').value;
//   var message = document.getElementById('message').value;

//   var whatsappUrl = "https://wa.me//+61450614576?text="
//   + "Name: "+name + "%0a"
//   + "Contact: "+phoneNumber + "%0a"
//   + "numberOfPersons: "+numberOfPersons + "%0a"
//   + "Date: "+reservationDate + "%0a"
//   + "Time: "+reservationTime + "%0a"
//   + "Message: "+message;

//   window.open(whatsappUrl, "_blank").focus()
// }

function adminLogin() {
  var adminId = prompt("Enter Admin ID:");
  var adminPassword = prompt("Enter Admin Password:");

  if (adminId === "admin" && adminPassword === "1234") { // set adminID and Password here
    window.location.href = "admin.html";
  } else {
    alert("Invalid ID or Password. Access Denied");
  }
}


var bookingsOpen = localStorage.getItem("bookingsOpen");


if (bookingsOpen === null) {
  bookingsOpen = true;
} else {
  bookingsOpen = JSON.parse(bookingsOpen);
}

function openBookings() {
  bookingsOpen = true;
  console.log(bookingsOpen); // Output: true
  localStorage.setItem("bookingsOpen", JSON.stringify(bookingsOpen));
}

function closeBookings() {
  bookingsOpen = false;
  console.log(bookingsOpen); // Output: false
  localStorage.setItem("bookingsOpen", JSON.stringify(bookingsOpen));
}


function whatsapp() {
  var name = document.getElementById('fname').value;
  var phoneNumber = document.getElementById('number').value;
  var numberOfPersons = document.getElementById('person').value;
  var reservationDate = document.getElementById('date').value;
  var reservationTime = document.getElementById('time').value;
  var message = document.getElementById('message').value;

  if (!bookingsOpen) {
    alert("Our online booking system is currently at full capacity. Please reach out to us directly via phone to secure your reservation promptly. We look forward to assisting you.");
  } else {
    var whatsappUrl = "https://wa.me//+61450614576?text="
      + "Name: " + name + "%0a"
      + "Contact: " + phoneNumber + "%0a"
      + "numberOfPersons: " + numberOfPersons + "%0a"
      + "Date: " + reservationDate + "%0a"
      + "Time: " + reservationTime + "%0a"
      + "Message: " + message;

    window.open(whatsappUrl, "_blank").focus();
  }
}

