const path = require('path');
const webpackConfig = require('./webpack.config');

module.exports = {
  mode: 'production',
  entry: webpackConfig.entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: webpackConfig.module,
  resolve: webpackConfig.resolve,
  plugins: [
    ...webpackConfig.plugins,
  ]
};