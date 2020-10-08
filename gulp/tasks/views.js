import { dest } from 'gulp';
import panini from 'panini';
import browsersync from 'browser-sync';

import { plumbedSrc } from '../util';
import { paths } from '../config';

const views = () => plumbedSrc(paths.views.src)
	.pipe(panini({
		root: paths.views.pages,
		layouts: paths.views.layouts,
		partials: paths.views.partials,
		helpers: paths.views.helpers,
		data: paths.views.data,
	}))
	.pipe(dest(paths.views.dist))
	.on('end', browsersync.reload);

export default views;