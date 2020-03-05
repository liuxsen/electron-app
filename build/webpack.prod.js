process.env.NODE_ENV = 'production';
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {})