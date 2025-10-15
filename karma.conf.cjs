const { fileURLToPath } = require('url');
const path = require('path');

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'webpack'],
    files: [
      'app/__tests__/**/*.test.jsx'
    ],
    preprocessors: {
      'app/__tests__/**/*.test.jsx': ['webpack']
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  ['@babel/preset-react', { runtime: 'automatic', development: true }]
                ]
              }
            }
          },
          {
            test: /\.(png|jpe?g|gif|webp|svg)$/i,
            type: 'asset/inline',
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx']
      }
    },
    browsers: ['ChromeHeadless'],
    singleRun: true
  });
};
