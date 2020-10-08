import { src } from 'gulp';
import plumber from 'gulp-plumber';

import { config } from './config';

const plumbedSrc = (...args) => src(...args).pipe(plumber(config.plumber));

export { plumbedSrc };