import './lib/nodelist-foreach-polyfill';
import './lib/font-awesome-loader';
import 'es6-promise/auto';
import {addClass, removeClass} from './lib/class-helpers';
import serialize from './lib/serialize';
import autosize from 'autosize';
import throttle from 'lodash/throttle';
import axios from 'axios';

const html = document.querySelector('[data-html]');
const body = document.querySelector('[data-body]');
const sections = document.querySelectorAll('[data-section]');
const navLinks = document.querySelectorAll('[data-nav-link]');
const nav = document.querySelectorAll('[data-nav]');
const modalLinks = document.querySelectorAll('[data-modal-show]');
const modals = document.querySelectorAll('[data-site-modal]');
const closeButtons = document.querySelectorAll('[data-close-modal]');
const contactForm = document.querySelector('[data-contact]');
const contactMessage = document.querySelector('[data-contact-message]');
const contactSubmit = document.querySelector('[data-contact-submit]');

let isModalOpen = false;
let isSubmitting = false;
let focusable = null;
let prevFocus = null;

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

const openModal = modalID => {
  if ( isModalOpen )
    return;

  let modal = document.querySelector('[data-site-modal="' + modalID + '"]');
  focusable = modal.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]');
  modal.setAttribute('aria-hidden', false);
  addClass(modal, 'is-active');
  addClass(html, 'is-locked');
  addClass(body, 'is-locked');
  isModalOpen = true;
  focusable[0].focus();
}

const closeModal = () => {
  if ( ! isModalOpen )
    return;

  let modal = document.querySelector('[data-site-modal].is-active');
  modal.setAttribute('aria-hidden', true);
  removeClass(modal, 'is-active');
  removeClass(html, 'is-locked');
  removeClass(body, 'is-locked');
  isModalOpen = false;
  prevFocus.focus();
}

const forwardTabModal = event => {
  if ( document.activeElement === focusable[focusable.length - 1] ) {
    event.preventDefault();
    focusable[0].focus();
  }
}

const backwardTabModal = event => {
  if ( document.activeElement === focusable[0] ) {
    event.preventDefault();
    focusable[focusable.length - 1].focus();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('scroll', throttle(updateNav, 32));
  window.addEventListener('resize', throttle(updateNav, 500));
  updateNav();

  modalLinks.forEach( link => {
    link.addEventListener('click', event => {
      event.preventDefault();

      let target = event.currentTarget.getAttribute('data-modal-show');
      prevFocus = event.currentTarget;

      openModal(target);
    });
  });

  closeButtons.forEach( button => {
    button.addEventListener('click', event => {
      event.preventDefault();

      closeModal();
    });
  });

  window.addEventListener('keydown', event => {
    if ( isModalOpen ) {
      const keyName = event.key;

      if ( keyName === 'Escape' || keyName === 'Esc' ) {
        closeModal();
      } else if ( keyName === 'Tab' && event.shiftKey ) {
        backwardTabModal(event);
      } else if ( keyName === 'Tab' ) {
        forwardTabModal(event);
      }
    }
  });

  autosize(contactMessage);

  contactForm.addEventListener('submit', event => {
    event.preventDefault();

    if ( isSubmitting )
      return;

    isSubmitting = true;
    contactSubmit.disabled = true;
    axios.post(contactForm.action, serialize(contactForm))
    .then(function(response) {
      contactForm.reset();
    })
    .catch(function(error) {
      console.log(error);
    })
    .finally(function() {
      contactSubmit.disabled = false;
      isSubmitting = false;
    });
  });
});

window.addEventListener('load', () => {
  removeClass(body, 'is-loading');
});
