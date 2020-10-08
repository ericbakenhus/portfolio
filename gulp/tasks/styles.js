import { dest } from 'gulp';
import sass from 'gulp-dart-sass';
import cleanCSS from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import gulpIf from 'gulp-if';
import browsersync from 'browser-sync';

import { plumbedSrc } from '../util';
import { config, paths, production } from '../config';

const styles = () => plumbedSrc(paths.styles.src)
	.pipe(gulpIf(!production, sourcemaps.init()))
	.pipe(sass(config.sass))
	.pipe(postcss(config.postcss))
	.pipe(gulpIf(production, cleanCSS()))
	.pipe(dest(paths.styles.dist))
	.pipe(browsersync.stream());
	
export default styles;