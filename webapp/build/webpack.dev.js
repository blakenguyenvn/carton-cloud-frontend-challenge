const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.base.js');

module.exports = merge(common, {
  mode: 'development',
  watchOptions: {
    poll: true,
    ignored: /node_modules/,
  },
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    port: 8100,
    historyApiFallback: true,
    contentBase: 'public',
    inline: true
  },
});
