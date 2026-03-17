'use strict';

module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': '@vue/vue2-jest',
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/tests/**/*.spec.js', '**/tests/**/*.test.js', '**/*.spec.js', '**/*.test.js'],
  collectCoverageFrom: ['src/**/*.{js,vue}', '!src/main.js', '!src/**/index.js'],
  setupFilesAfterEnv: [],
};
