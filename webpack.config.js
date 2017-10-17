const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/public/',
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    port: 8080,
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
              loader: "sass-loader",
              options: {
                includePaths: [__dirname + "/src/scss/stylesheets.scss", __dirname + "/public/css/stylesheets.css"],
                sourceMap: true
              }
            }
          ],
          fallback: "style-loader"
        })
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