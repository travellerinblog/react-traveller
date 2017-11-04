const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ["babel-polyfill", './src/index.js'],
  output: {
    path: __dirname + '/public/',
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    port: 7776,
    contentBase: __dirname + '/public/',
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'css-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "sass-loader"
            }
          ],
          fallback: "style-loader"
        })
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        exclude: /node_modules/,
        loader: 'file-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015', 'stage-2']
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('stylesheets.css')
  ]
}