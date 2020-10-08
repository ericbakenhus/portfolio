import del from 'del';

import { paths } from '../config';

const clean = () => del(paths.dist);

export default clean;