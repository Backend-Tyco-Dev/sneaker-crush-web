'use strict'
const { merge } = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  USE_STAGING: JSON.stringify(process.env.USE_STAGING),
});
