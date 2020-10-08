import { dest } from 'gulp';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import browsersync from 'browser-sync';

import { plumbedSrc } from '../util';
import { config, paths } from '../config';

const scripts = () => plumbedSrc(paths.scripts.src)
	.pipe(webpackStream(config.webpack), webpack)
	.pipe(dest(paths.scripts.dist))
	.on('end', browsersync.reload);
	
export default scripts;