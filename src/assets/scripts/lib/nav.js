import throttle from 'lodash/throttle';
import fastdom from 'fastdom';

const mediumMQ = window.matchMedia('(min-width: 40em)');
const sections = document.querySelectorAll('[data-section]');
const navLinks = document.querySelectorAll('[data-nav-link]');

let boundaries = [];
let isLarge = mediumMQ.matches;

const updateNav = () => navLinks.forEach((link) => fastdom.measure(() => {
  const linkRect = link.getBoundingClientRect();
  const linkTopScroll = linkRect.top + window.scrollY;
  const linkBottomScroll = linkRect.bottom + window.scrollY;
  const linkHeight = linkRect.height;
  const nextBoundaryIndex = boundaries.findIndex((b) => b > linkTopScroll);
  const nextBoundary = nextBoundaryIndex !== -1 ? boundaries[nextBoundaryIndex] : null;
  const currentSectionIndex = nextBoundaryIndex !== -1 ? nextBoundaryIndex - 1 : boundaries.length - 1;
  const currentSection  = sections[currentSectionIndex];
  const isCrossing = nextBoundary !== null && linkTopScroll < nextBoundary && linkBottomScroll > nextBoundary;

  fastdom.mutate(() => {
    if (isCrossing) {
      // Link is intersecting a boundary
      const percentCross = ((nextBoundary - linkTopScroll) / linkHeight) * 100;
      link.setAttribute('data-cross', Math.min(Math.round(percentCross) + 5, 99));
    } else if (link.hasAttribute('data-cross')) {
      link.removeAttribute('data-cross');
    }

    if (link.getAttribute('data-section') != currentSection.id) {
      // Link has moved to a different section
      link.setAttribute('data-section', currentSection.id);
      const allLinksSameSection = Array.from(navLinks).every((l) => l.getAttribute('data-section') === navLinks[0].getAttribute('data-section'));

      if (allLinksSameSection) {
        // Move active link when all nav links in new section
        document.querySelector('[data-nav-link].is-active').classList.remove('is-active');
        navLinks[currentSectionIndex].classList.add('is-active');
      }
    }
  });
}));

const updateBoundaries = fastdom.measure(() => {
  boundaries = [...sections].map((section) => Math.round(section.getBoundingClientRect().top + window.scrollY));
});

const onResize = throttle(() => {
  updateBoundaries();
  updateNav();
}, 200);

const onScroll = throttle(() => {
  updateNav();
}, 50);

const addListeners = () => {
  window.addEventListener('resize', onResize);
  window.addEventListener('scroll', onScroll);

  updateBoundaries();
  updateNav();
};

const removeListeners = () => {
  window.removeEventListener('resize', onResize);
  window.removeEventListener('scroll', onScroll);
};

const initNav = () => {
  window.addEventListener('load', () => {
    updateBoundaries();
    updateNav();
  });

  mediumMQ.addListener((mql) => {
    isLarge = mql.matches;

    if (isLarge) {
      addListeners();
    } else {
      removeListeners();
    }
  });

  if (isLarge) {
    addListeners();
  }
};

export default initNav;