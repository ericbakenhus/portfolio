import axios from 'axios';
import autosize from 'autosize';
import serialize from './serialize';
import {addClass, removeClass} from './class-helpers';

const contactForm = document.querySelector('[data-contact]');
const contactMessage = document.querySelector('[data-contact-message]');
const contactSubmit = document.querySelector('[data-contact-submit]');
const contactFlash = document.querySelector('[data-contact-flash]');

let isSubmitting = false;
let isFlashShowing = false;
let isFlashFailure = false;

export default function contactFormInit() {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();

    if ( isSubmitting )
      return;

    isSubmitting = true;
    contactSubmit.disabled = true;
    axios.post(contactForm.action, serialize(contactForm))
    .then(function(response) {
      isFlashFailure = false;
      contactForm.reset();
      removeClass(contactFlash, 'is-failure');
      addClass(contactFlash, 'is-success');
      contactFlash.innerHTML = 'Your message has been sent. Thanks!';
    })
    .catch(function(error) {
      isFlashFailure = true;
      removeClass(contactFlash, 'is-success');
      addClass(contactFlash, 'is-failure');
      contactFlash.innerHTML = 'Looks like something went wrong. Try again.';
    })
    .finally(function() {
      isFlashShowing = true;
      contactSubmit.disabled = false;
      isSubmitting = false;
      addClass(contactFlash, 'is-open');
      contactFlash.focus();
    });
  });

  contactFlash.addEventListener('focusout', event => {
    if ( isFlashShowing && ! isFlashFailure ) {
      removeClass(contactFlash, 'is-success');
      removeClass(contactFlash, 'is-open');
      contactFlash.innerHTML = '';
    }
  });

  autosize(contactMessage);
}
