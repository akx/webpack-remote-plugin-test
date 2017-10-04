const path = require('path');

module.exports.getBaseConfig = () => ({
  context: path.resolve(__dirname, '..'),
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
});

module.exports.makePluginConfig = name => {
  return {
    entry: `./src/${name}.jsx`,
    output: {
      filename: `${name}.js`,
      libraryTarget: 'commonjs2',
    },
    externals: {
      react: 'react',
    },
  };
};
