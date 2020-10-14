const html = document.querySelector('[data-html]');
const body = document.querySelector('[data-body]');
const modals = document.querySelectorAll('[data-site-modal]');
const modalLinks = document.querySelectorAll('[data-modal-show]');

let isModalOpen = false;
let prevFocus = null;

const handleEsc = (event) => {
  const key = event.key;

  if ( key === 'Esc' || key === 'Escape' ) {
    event.preventDefault();
    closeModal();
  }
}

const openModal = ( modalID ) => {
  if ( isModalOpen )
    return;

  isModalOpen = true;

  const modal = document.querySelector('[data-site-modal="' + modalID + '"]');
  const focusable = modal.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]');

  html.classList.add('is-locked');
  body.classList.add('is-locked');
  modal.classList.add('is-active');
  focusable[0].focus();
  
  window.addEventListener('keydown', handleEsc);
}

const closeModal = () => {
  if ( !isModalOpen )
    return;

  const modal = document.querySelector('[data-site-modal].is-active');

  modal.classList.remove('is-active');
  html.classList.remove('is-locked');
  body.classList.remove('is-locked');
  prevFocus.focus();
  isModalOpen = false;

  window.removeEventListener('keydown', handleEsc);
}

const initModal = (modal) => {
  const focusable = modal.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]');
  const lastFocusableElem = focusable[focusable.length - 1];
  const firstFocusableElem = focusable[0];
  const closeButton = modal.querySelector('[data-close-modal]');

  closeButton.addEventListener('click', event => {
    event.preventDefault();
    closeModal();
  });

  lastFocusableElem.addEventListener('keydown', event => {
    const key = event.key;

    if ( key === 'Tab' ) {
      event.preventDefault();
      firstFocusableElem.focus();
    }
  });

  firstFocusableElem.addEventListener('keydown', event => {
    const key = event.key;

    if ( key === 'Tab' && event.shiftKey ) {
      event.preventDefault();
      lastFocusableElem.focus();
    }
  });
};

const initLink = (link) => {
  link.addEventListener('click', event => {
    event.preventDefault();

    const target = event.currentTarget.getAttribute('data-modal-show');
    prevFocus = event.currentTarget;

    openModal(target);
  });
};

const initModals = () => {
  modals.forEach(modal => initModal(modal));
  modalLinks.forEach(link => initLink(link));
}

export default initModals;