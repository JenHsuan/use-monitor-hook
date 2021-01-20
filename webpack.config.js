var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: './src/components/SimpleGauge.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'SimpleGauge.js',
    library: 'SimpleGauge',
    globalObject: "this",
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        exclude: path.join(__dirname, '/node_modules/'),
        loader: 'babel-loader',
      }, {
        test: /\.*css$/,
        use : ExtractTextPlugin.extract({
            fallback : 'style-loader',
            use : [
                'css-loader',
                'sass-loader'
            ]
        })
       },
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
  ]
};