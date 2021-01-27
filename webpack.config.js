var path = require('path');

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
      }
    ]
  }
};
