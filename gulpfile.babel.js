'use strict';

import { series, parallel } from 'gulp';
import c from 'ansi-colors';

import styles from './gulp/tasks/styles';
import scripts from './gulp/tasks/scripts';
import images from './gulp/tasks/images';
import assets from './gulp/tasks/assets';
import views from './gulp/tasks/views';
import clean from './gulp/tasks/clean';
import notifyBuild from './gulp/tasks/notify-build';
import server from './gulp/tasks/server';

import { production } from './gulp/config';

if (production)
	console.log(c.green.bold.underline('🚚 Production mode'));
else
	console.log(c.yellow.bold.underline('🔧 Development mode'));

const dev = series(parallel(styles, scripts, images, assets, views), server);
const build = series(clean, parallel(styles, scripts, images, assets, views), notifyBuild);

export { dev, build };
export default dev;