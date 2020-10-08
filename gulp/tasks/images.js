import { dest } from 'gulp';
import imagemin from 'gulp-imagemin';

import { plumbedSrc } from '../util';
import { paths } from '../config';

const images = () => plumbedSrc(paths.images.src)
	.pipe(imagemin())
	.pipe(dest(paths.images.dist));

export default images;