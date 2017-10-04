const merge = require('webpack-merge');
const { getBaseConfig, makePluginConfig } = require('./common');

module.exports = merge(getBaseConfig(), makePluginConfig('plugin2'));
