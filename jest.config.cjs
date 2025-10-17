/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/app'],
  setupFilesAfterEnv: ['<rootDir>/app/setupTests.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: { '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest' },
  coverageThreshold: {
    global: { branches: 80, functions: 80, lines: 80, statements: 80 }
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
    'app/**/*.{ts,tsx,js,jsx}',
    '!app/**/__tests__/**',
    '!**/*.d.ts'
  ],

  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov', 'html'],

  // Si algún paquete ESM revienta, whitelistea aquí:
  // transformIgnorePatterns: ['/node_modules/(?!lucide-react)'],
};
