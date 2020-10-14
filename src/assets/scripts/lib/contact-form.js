const form = document.querySelector('[data-contact]');
const submitButton = document.querySelector('[data-contact-submit]');
const flash = document.querySelector('[data-contact-flash]');
const inputs = form.querySelectorAll('input, textarea');

let isSubmitting = false;

const showFlash = () => flash.classList.add('is-open');
const hideFlash = () => flash.classList.remove('is-open');

const setFlashSucces = () => {
  flash.classList.remove('is-failure');
  flash.classList.add('is-success');
}

const setFlashFailure = () => {
  flash.classList.remove('is-success');
  flash.classList.add('is-failure');
}

const onSuccess = () => {
  form.reset();
  form.classList.remove('is-submitted');
  setFlashSucces();
  flash.textContent = 'Your message has been sent. Thanks!';

  flash.addEventListener('focusout', () => {
    hideFlash();
    flash.textContent = '';
  }, { once: true });
};

const onFailure = () => {
  setFlashFailure();
  flash.textContent = 'Looks like something went wrong with the server. Try again.';
};

const onSubmit = (event) => {
  event.preventDefault();

  if ( isSubmitting )
    return;

  form.classList.add('is-submitted');

  isSubmitting = true;
  submitButton.disabled = true;

  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
  })
  .then((res) => {
    if (!res.ok)
      throw new Error('Not a 2xx response');

    onSuccess();
  })
  .catch(() => {
    onFailure();
  })
  .then(() => {
    showFlash();
    flash.focus();
    submitButton.disabled = false;
    isSubmitting = false;
  });
};

const initForm = () => {
  form.addEventListener('submit', onSubmit);
  inputs.forEach( (input) => {
    input.addEventListener('blur', (event) => {
      event.target.classList.add('is-touched');
    });
  });
};

export default initForm;
