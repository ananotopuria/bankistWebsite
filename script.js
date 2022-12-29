'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector(`.btn--scroll-to`);
const section1 = document.querySelector(`#section--1`);
const nav = document.querySelector(`.nav`);
const tabs = document.querySelectorAll(`.operations__tab`);
const tabsContainer = document.querySelector(`.operations__tab-container`);
const tabsContent = document.querySelectorAll(`.operations__content`);

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Button scrolling

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log(`Current scroll (x/y)`, window.pageXOffset, window.pageYOffset);
  console.log(
    `height/width viewport`,
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: `smooth`,
  // });

  section1.scrollIntoView({ behavior: `smooth` });
});

////////////////////////////////////
//Page navigation

// document.querySelectorAll(`.nav__link`).forEach(function (el) {
//   el.addEventListener(`click`, function (e) {
//     e.preventDefault();
//     const id = this.getAttribute(`href`);
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: `smooth` });
//   });
// });

// 1. Add even listener to common parent element
// 2. Determine what element originated the event

document.querySelector(`.nav__links`).addEventListener(`click`, function (e) {
  e.preventDefault();
  // Matching stategy
  if (e.target.classList.contains(`nav__link`)) {
    const id = e.target.getAttribute(`href`);
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: `smooth` });
  }
});

// Tabbed component
// tabs.forEach(t => t.addEventListener(`click`, () => console.log(`TAB`)));

tabsContainer.addEventListener(`click`, function (e) {
  const clicked = e.target.closest(`.operations__tab`);

  // Guard class
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove(`operations__tab--active`));
  tabsContent.forEach(c => c.classList.remove(`operations__content--active`));

  // Activate tab
  clicked.classList.add(`operations__tab--active`);

  // Active content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add(`operations__content--active`);
});

// Menu fade animation
const handleHover = function (e, opacity) {
  if (e.target.classList.contains(`nav__link`)) {
    const link = e.target;
    const siblings = link.closest(`.nav`).querySelectorAll(`.nav__link`);
    const logo = link.closest(`.nav`).querySelector(`img`);

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener(`mouseover`, handleHover.bind(0.5));
nav.addEventListener(`mouseout`, handleHover.bind(1));

// // Sticky navigation
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener(`scroll`, function () {
//   console.log(window.scrollY);

//   if (window.scrollY > initialCoords.top) nav.classList.add(`sticky`);
//   else nav.classList.remove(`sticky`);
// });

////////////////////////////////////
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);
const header = document.querySelector(`.header`);
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);
const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) nav.classList.add(`sticky`);
  else nav.classList.remove(`sticky`);
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
/*
const header = document.querySelector(`.header`);
const allSelections = document.querySelectorAll(`.selection`);
console.log(allSelections);

document.getElementById(`section--1`);
const allButtons = document.getElementsByTagName(`button`);
console.log(allButtons);

const message = document.createElement(`div`);
message.classList.add(`cookie-message`);

message.textContent = `We use cookies for improved functionality and analytics`;
message.innerHTML = `We use cookies for improved functionality and analytics <button class="btn btn--close-cookie">Got it!  </button>`;

// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));

document
  .querySelector(`.btn--close-cookie`)
  .addEventListener(`click`, function () {
    message.remove();
  });

// Styles

message.style.backgroundColor = `#37383d`;
message.style.width = `120%`;

document.documentElement.style.setProperty(`--color-primary`, `orangered`);





const h1 = document.querySelector(`h1`);
h1.addEventListener(`mouseenter`, function (e) {
  alert(`addEventListener: Great! You are reading the heading`);
});

h1.onmouseenter = function (e) {
  alert(`onmouseenter: Great! You are reading the heading`);
};
*/
