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
      { pattern: 'app/setupTests/setup.ts', watched: false },
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
          // Specific test-time overrides FIRST
          '~/hooks/useCart$': path.resolve(__dirname, '__mocks__/useCart.mock.ts'),
          '~/hooks/useLocalStorage$': path.resolve(__dirname, '__mocks__/useLocalStorage.mock.ts'),
          '~/component/Header$': path.resolve(__dirname, '__mocks__/Header.stub.tsx'),
          '~/component/ProductList$': path.resolve(__dirname, '__mocks__/ProductList.stub.tsx'),
          '~/component/Footer$': path.resolve(__dirname, '__mocks__/Footer.stub.tsx'),
          '~/component/HeroSelection$': path.resolve(__dirname, '__mocks__/HeroSelection.stub.tsx'),
          '~/component/AreasMain$': path.resolve(__dirname, '__mocks__/AreasMain.stub.tsx'),
          '~/component/ClientCarousel$': path.resolve(__dirname, '__mocks__/ClientCarousel.stub.tsx'),
          '~/component/CardVentas$': path.resolve(__dirname, '__mocks__/CardVentas.stub.tsx'),
          '~/component/Mosaico$': path.resolve(__dirname, '__mocks__/Mosaico.stub.tsx'),
          '~/component/login$': path.resolve(__dirname, '__mocks__/LoginComponent.stub.tsx'),
          // Generic aliases LAST
          '~': path.resolve(__dirname, './'),
          '@': path.resolve(__dirname, './'),
        },
        // Avoid bundling Node core polyfills in browser tests
        fallback: {
          path: false,
          fs: false,
          os: false,
          crypto: false,
        },
      },
      module: {
        rules: [
          {
            test: /\.(ts|tsx|js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: { cacheDirectory: true },
            },
          },
          { test: /\.css$/, use: ['style-loader', 'css-loader'] },
          { test: /\.(png|jpe?g|gif|svg|webp|mp4|mp3)$/i, type: 'asset/resource' },
        ],
      },
      performance: { hints: false },
    },
    reporters: ['spec', 'kjhtml'],
    coverageReporter: {
      dir: path.join(__dirname, '../coverage'),
      reporters: [{ type: 'html' }, { type: 'text-summary' }],
    },
    client: { jasmine: { random: false }, clearContext: false },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true,
  });
};
