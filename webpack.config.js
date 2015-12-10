var webpack = require('webpack');

module.exports = {
  target: "electron",
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
