var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: './src/components/useMonitor.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'useMonitor.js',
    library: 'useMonitor',
    globalObject: "this",
    libraryTarget: 'commonjs2'
  },
  externals: {
    react: 'commonjs react',
   'react-dom': 'commonjs react-dom',
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
