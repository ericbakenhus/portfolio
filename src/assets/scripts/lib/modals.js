const html = document.querySelector('[data-html]');
const body = document.querySelector('[data-body]');
const modalLinks = document.querySelectorAll('[data-modal-show]');
const modals = document.querySelectorAll('[data-site-modal]');
const closeButtons = document.querySelectorAll('[data-close-modal]');
import {addClass, removeClass} from './class-helpers';

let isModalOpen = false;
let focusable = null;
let prevFocus = null;

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

export default function initModals() {
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
}
