const path = require('node:path');

module.exports = function karmaConfig(config) {
  config.set({
    basePath: path.resolve(__dirname, '..'),
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('karma-webpack'),
      require('karma-sourcemap-loader'),
      require('karma-spec-reporter'),
    ],
    files: [
      // setup primero
      { pattern: 'app/setupTests/setup.ts', watched: false },
      // tests
      { pattern: 'app/**/*.test.ts', watched: false },
      { pattern: 'app/**/*.test.tsx', watched: false },
      { pattern: 'app/**/*.test.js', watched: false },
      { pattern: 'app/**/*.test.jsx', watched: false },
    ],
    preprocessors: {
      'app/setupTests/setup.ts': ['webpack', 'sourcemap'],
      'app/**/*.test.ts': ['webpack', 'sourcemap'],
      'app/**/*.test.tsx': ['webpack', 'sourcemap'],
      'app/**/*.test.js': ['webpack', 'sourcemap'],
      'app/**/*.test.jsx': ['webpack', 'sourcemap'],
    },
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
          '~': path.resolve(__dirname, './'), // maps to app/
          '@': path.resolve(__dirname, './'),
        },
      },
      module: {
        rules: [
          {
            test: /\.(ts|tsx|js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              },
            },
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.(png|jpe?g|gif|svg|webp|mp4|mp3)$/i,
            type: 'asset/resource',
          },
        ],
      },
      // evitar warnings innecesarios en tests
      performance: { hints: false },
    },
    reporters: ['spec', 'kjhtml'],
    coverageReporter: {
      dir: path.join(__dirname, '../coverage'),
      reporters: [{ type: 'html' }, { type: 'text-summary' }],
    },
    client: {
      jasmine: { random: false },
      clearContext: false, // deja la UI de Jasmine
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true,
  });
};