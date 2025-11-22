/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/app'],
  setupFilesAfterEnv: ['<rootDir>/app/setupTests.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: { '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest' },
  coverageThreshold: {
    global: { branches: 24, functions: 25, lines: 25, statements: 25 }
  },
  // solo ejecuta archivos *.test.*
  testMatch: ['**/?(*.)+(test).[jt]s?(x)'],

  moduleNameMapper: {
    // alias "~" -> app/
    '^~/(.*)$': '<rootDir>/app/$1',

    // mocks para estilos y assets
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(png|jpe?g|gif|svg|webm)$': '<rootDir>/app/__mocks__/fileMock.js',
  },

  collectCoverageFrom: [
    'app/component/**/*.{ts,tsx}',
    'app/pages/**/*.{ts,tsx}',
    'app/hooks/**/*.{ts,tsx}',
    '!app/**/index.{ts,tsx}'
],

 coveragePathIgnorePatterns: [
    '/node_modules/',
    // excluye temporalmente archivos grandes hasta tener tests
    'app/component/ProductList.tsx',
    'app/component/CheckoutModal.tsx',
    'app/service/',
    'app/types/',
    'app/lib/',
  ],

  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov', 'html'],

  // Si algún paquete ESM revienta, whitelistea aquí:
  // transformIgnorePatterns: ['/node_modules/(?!lucide-react)'],
};
