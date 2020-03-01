var path = require('path');

var config = {

  /* The entry point of the application. Webpack uses this information to
  create the dependency tree which is used to bundle the scripts.*/
  entry: ['./src/index.tsx'],

  /* This information is used to give the name of the bundled file and the
  location of the bundled file. */
  output: {
      path: path.resolve(__dirname, '../public'),
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
  },

  /* This information is used to give the port and dev server */
  optimization: {
     splitChunks: {
       chunks: 'all',
     },
   },

  /*  The extensions which will be imported or required in the application
  scripts. */
  resolve: {
      extensions: ['.ts', '.tsx', '.js', '.css', '.scss'],
      alias: {
        '@': path.resolve(__dirname, '../src')
      }
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        use: 'source-map-loader',
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              import: true,
              modules: true,
              localIdentName:
                process.env.NODE_ENV === 'development'
                  ? '[local]__[hash:base64:5]'
                  : '[hash:base64]',
            }
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              esModule: false,
            }
          }
        ]
      },
    ],
  },
};

module.exports = config;
