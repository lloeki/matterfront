var webpack = require('webpack');
module.exports = {
  target: "electron",
  entry: {
    app: ['webpack/hot/dev-server', './src/browser/index.js'],
  },
  output: {
    path: './browser-build',
    filename: 'index.js',
    publicPath: 'http://localhost:9000/browser-build/'
  },
  devServer: {
    contentBase: './',
    publicPath: 'http://localhost:9000/browser-build/'
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
      test: /\.css$/,
      loader: 'style!css'
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
