import { watch, series, parallel } from 'gulp';
import browsersync from 'browser-sync';

import styles from './styles';
import scripts from './scripts';
import images from './images';
import assets from './assets';
import views from './views';
import resetViews from './reset-views';

import { config, paths } from '../config';

const server = (done) => {
	browsersync.init({
		server: paths.dist,
		port: config.server.port,
		notify: true,
	});

	watch(paths.views.watch, { usePolling: true }, parallel(views));
	watch(paths.views.refresh, { usePolling: true }, series(resetViews, views));
	watch(paths.styles.watch, { usePolling: true }, parallel(styles));
	watch(paths.scripts.watch, { usePolling: true }, parallel(scripts));
	watch(paths.images.watch, { usePolling: true }, parallel(images));
	watch(paths.assets.watch, { usePolling: true }, parallel(assets));

	return done;
}

export default server;