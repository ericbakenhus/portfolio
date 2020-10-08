import 'es6-promise/auto';
import './lib/nodelist-foreach-polyfill';
import './lib/font-awesome-loader';
import modalsInit from './lib/modals';
import navInit from './lib/nav';
import contactFormInit from './lib/contact-form';

document.addEventListener('DOMContentLoaded', () => {
  navInit();
  modalsInit();
  contactFormInit();
});
