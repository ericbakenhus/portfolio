import fontFaceObserver from 'fontfaceobserver';
import {removeClass} from './class-helpers';

const body = document.querySelector('[data-body]');

let fontOswald = new fontFaceObserver('Oswald');
let fontRoboto = new fontFaceObserver('Roboto');

Promise.all([fontOswald.load(), fontRoboto.load()]).then(() => {
  removeClass(body, 'is-loading');
}, () => {
  removeClass(body, 'is-loading');
});
