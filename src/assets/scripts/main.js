import initIcons from './lib/font-awesome-loader';
import initModals from './lib/modals';
import initNav from './lib/nav';
import initForm from './lib/contact-form';

const init = () => {
  initNav();
  initIcons();
  initModals();
  initForm();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}