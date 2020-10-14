import initIcons from './lib/font-awesome-loader';
import initModals from './lib/modals';
import initNav from './lib/nav';
import initForm from './lib/contact-form';

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initIcons();
  initModals();
  initForm();
});
