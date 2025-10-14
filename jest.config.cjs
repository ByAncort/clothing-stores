/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",

  
  setupFilesAfterEnv: ["<rootDir>/app/setupTests.js"],

  
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^~/(.*)$": "<rootDir>/app/$1",
  },

  
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },

  
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],

  
  collectCoverageFrom: [
    "app/**/*.{js,jsx,ts,tsx}",
    "!app/**/*.d.ts",
    "!app/index.{js,ts,tsx}",
  ],

  
  transformIgnorePatterns: [
    "node_modules/(?!(your-es-module-packages)/)",
  ],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};
