var webpack = require('webpack');

var config = {
  context: __dirname + './src/js', // `__dirname` is root of project and `src` is source
  entry: {
    app: './src/js/index.js',
  },
  output: {
    path: __dirname + '/dist', // `dist` is the destination
    publicPath: "/assets/",
    filename: 'bundle.js',
  },
};

module.exports = config;