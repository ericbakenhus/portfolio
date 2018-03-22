import axios from 'axios';
import autosize from 'autosize';
import serialize from './serialize';

const contactForm = document.querySelector('[data-contact]');
const contactMessage = document.querySelector('[data-contact-message]');
const contactSubmit = document.querySelector('[data-contact-submit]');

let isSubmitting = false;

export default function contactFormInit() {
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

  autosize(contactMessage);
}
