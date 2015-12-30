var webpack = require('webpack');
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

var options = {
  entry: ['./src/browser/index.js'],
  output: {
    path: './browser-build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets:['react']
      }
    }, {
      test: /\.less$|\.css$/,
      loader: "style!css!less"
    }]
  }
}

options.target = webpackTargetElectronRenderer(options);

module.exports = options;
