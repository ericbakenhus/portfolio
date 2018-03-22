import throttle from 'lodash/throttle';
import {addClass, removeClass} from './class-helpers';
import SmoothScroll from 'smooth-scroll/dist/js/smooth-scroll.polyfills';

const sections = document.querySelectorAll('[data-section]');
const navLinks = document.querySelectorAll('[data-nav-link]');
const nav = document.querySelectorAll('[data-nav]');

const updateNav = () => {
  let topSectionID = '';
  let bottomSectionID = '';
  let topPos = -1000000000;
  let bottomPos = 1000000000;
  let navSections = [];
  let isNavUniform = false;

  sections.forEach( section => {
    let sectionRect = section.getBoundingClientRect();

    if ( sectionRect.top <= 0 && sectionRect.top > topPos ) {
      topSectionID = section.id;
      topPos = sectionRect.top;
    } else if ( sectionRect.top > 0 && sectionRect.top < bottomPos ) {
      bottomSectionID = section.id;
      bottomPos = sectionRect.top;
    }
  });

  navLinks.forEach( link => {
    let linkRect = link.getBoundingClientRect();
    let linkCurrSection = link.getAttribute('data-section');
    let linkUpdatedSection = linkCurrSection;
    let isInBottom = bottomPos - linkRect.top - linkRect.height / 2 <= 0;

    if ( isInBottom && linkCurrSection !== bottomSectionID ) {
      link.setAttribute('data-section', bottomSectionID);
      linkUpdatedSection = bottomSectionID;
    } else if ( ! isInBottom && linkCurrSection !== topSectionID ) {
      link.setAttribute('data-section', topSectionID);
      linkUpdatedSection = topSectionID;
    }

    navSections.push(linkUpdatedSection);
  });

  isNavUniform = !navSections.some( (value, index, array) => {
    return value !== array[0];
  });

  if ( isNavUniform ) {
    let id = navSections[0];
    let currNav = document.querySelector('[data-nav-link].is-active');
    let nextNav = document.querySelector('[data-nav-link][href="#' + id + '"]');

    removeClass(currNav, 'is-active');
    addClass(nextNav, 'is-active');
  }
}

export default function navInit() {
  window.addEventListener('scroll', throttle(updateNav, 32));
  window.addEventListener('resize', throttle(updateNav, 500));
  updateNav();

  let scroll = new SmoothScroll('[data-nav-link]',
  {
    speed: 250,
    easing: easeInOutQuad
  });
}
