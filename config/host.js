const merge = require('webpack-merge');
const { getBaseConfig } = require('./common');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(getBaseConfig(), {
  entry: './src/host.jsx',
  output: {
    filename: 'host.js',
  },
  plugins: [new HtmlWebpackPlugin({ filename: 'host.html' })],
});
