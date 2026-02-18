import { writeFileSync } from 'fs';

import { version } from './index.js';
import packageJson from '../package.json' with { type: 'json' };

packageJson.version = version;

writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
