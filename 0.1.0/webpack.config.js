const path = require('path');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // webpack offers source-map which maps your compiled code back to your original source code
  devtool: 'inline-source-map',
  // we can use watch or webpack development server each time any changes made to our files
  // webpack development server starts the entry point what ever that is there in dist folder
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
           test: /\.css$/,
           use: [
            {
              loader: 'style-loader'                   //  Add the style loader
            },
            {
              loader: 'css-loader',                   // We just imported a Css file from our JavaScript, as a module.
              options: {
                modules: true,
                camelCase: true,
                sourceMap: true
              }
            }
          ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'                               // We just imported a Sass file from our JavaScript, as a module.
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'                               //  Add the file loader
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.js$/,                                // Run the loader on all .js files
        exclude: /node_modules/,                      // ignore all files in the node_modules folder
        use: 'jshint-loader'                          // Add the JSHint loader
      },
      {
        test: /\.json$/,
        use: "json-loader"                         //JSON loader
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
        query:{
          presets: ['env','es2015']
        }
      }
    ]
  }
};