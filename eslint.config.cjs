'use strict';

const js = require('@eslint/js');
const vue = require('eslint-plugin-vue');
const prettierConfig = require('eslint-config-prettier');
const { node: nodeGlobals } = require('globals');
const { browser: browserGlobals } = require('globals');

const sharedGlobals = {
  SERVER: 'readonly',
  DEBUG: 'readonly',
};

module.exports = [
  { ignores: ['node_modules/', 'dist/', 'static/'] },
  js.configs.recommended,
  ...vue.configs['flat/vue2-recommended'],
  {
    files: ['build/**/*.js', 'config/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script',
      globals: { ...nodeGlobals, exports: 'writable', ...sharedGlobals },
    },
  },
  {
    files: ['src/**/*.js', 'src/**/*.vue'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...browserGlobals,
        require: 'readonly',
        process: 'readonly',
        module: 'readonly',
        global: 'readonly',
        define: 'readonly',
        ...sharedGlobals,
      },
    },
  },
  {
    files: ['**/*.js', '**/*.vue'],
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-unreachable': 'warn',
      'vue/require-default-prop': 'off',
      'vue/order-in-components': 'warn',
      'vue/attributes-order': 'warn',
      'vue/multi-word-component-names': 'warn',
      'vue/component-definition-name-casing': 'warn',
      'vue/no-mutating-props': 'warn',
      'no-case-declarations': 'warn',
      'no-useless-assignment': 'warn',
      'vue/no-use-v-if-with-v-for': 'warn',
      'vue/valid-v-for': 'warn',
      'vue/no-parsing-error': 'warn',
    },
  },
  prettierConfig,
];
