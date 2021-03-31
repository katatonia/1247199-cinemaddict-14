const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  devtool: 'source-map',
  mode: 'development',
  devServer: {
    contentBase: path.resolve('./public'),
    watchContentBase: true,
  }
};

