import { dest } from 'gulp';

import { plumbedSrc } from '../util';
import { paths } from '../config';

const assets = () => plumbedSrc(paths.assets.src)
	.pipe(dest(paths.assets.dist));

export default assets;