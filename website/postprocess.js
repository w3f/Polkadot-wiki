// postprocess.js
'use strict';

require('loud-rejection/register');

const path = require('path');
const { postProcess } = require('./utils');

const buildDirectory = path.join(__dirname, 'build/polkadot-wiki');

postProcess(buildDirectory);
