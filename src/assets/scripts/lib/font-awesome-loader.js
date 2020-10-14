import { dom, library } from '@fortawesome/fontawesome-svg-core';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faHome, faLaptop, faEnvelope, faGlobe, faSquareFull } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faWordpressSimple, faStackOverflow } from '@fortawesome/free-brands-svg-icons';

library.add(
  faGithub,
  faWordpressSimple,
  faStackOverflow,
  faHome,
  faLaptop,
  faEnvelope,
  faTimesCircle,
  faGlobe,
  faSquareFull
);

const initIcons = () => dom.i2svg();

export default initIcons;