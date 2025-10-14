// karma.conf.cjs
const path = require('path');
const karmaJasmine = require('karma-jasmine');
const karmaChrome = require('karma-chrome-launcher');
const karmaWebpack = require('karma-webpack');
const karmaHtml = require('karma-jasmine-html-reporter');

module.exports = function (config) {
  config.set({
    // 🔹 Carga manual de plugins (para garantizar compatibilidad con Jasmine)
    plugins: [karmaJasmine, karmaChrome, karmaWebpack, karmaHtml],

    // 🔹 Framework de pruebas
    frameworks: ['jasmine'],

    // 🔹 Archivos de test
    files: [
      { pattern: 'app/**/*.spec.tsx', watched: false },
      { pattern: 'app/**/*.spec.ts', watched: false },
    ],

    // 🔹 Preprocesadores (usa Webpack para compilar React + TS)
    preprocessors: {
      'app/**/*.spec.tsx': ['webpack'],
      'app/**/*.spec.ts': ['webpack'],
    },

    // 🔹 Configuración de Webpack
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.[tj]sx?$/,
            use: {
              loader: 'ts-loader',
              options: {
                transpileOnly: true, // Evita comprobaciones duplicadas
              },
            },
            exclude: /node_modules/,
          },
        ],
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
          '~': path.resolve(__dirname, 'app'), // 👈 alias igual que en vite.config.ts
        },
      },
    },

    // 🔹 Reportes en consola y navegador (html opcional)
    reporters: ['progress', 'kjhtml'],

    // 🔹 Navegadores donde ejecutar los tests
    browsers: ['ChromeHeadless'],

    // 🔹 Ejecuta los tests una sola vez y termina
    singleRun: true,

    // 🔹 Colores y nivel de log
    colors: true,
    logLevel: config.LOG_INFO,
  });
};
