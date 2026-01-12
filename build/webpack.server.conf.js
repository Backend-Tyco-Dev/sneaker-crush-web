const webpack = require('webpack')
const { merge } = require('webpack-merge')
const path = require('path');
const config = require('../config')
const nodeExternals = require('webpack-node-externals')
const utils = require('./utils')
const baseConfig = require('./webpack.base.conf.js')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const env = require('../config/prod.env')

module.exports = merge(baseConfig, {
    mode: 'production',
    module: {
        rules: utils.styleLoaders({
            sourceMap: true,
            extract: true,
            usePostCSS: true
        })
    },
  // Point entry to your app's server entry file
  entry: './src/entry-server.js',

  // This allows webpack to handle dynamic imports in a Node-appropriate
  // fashion, and also tells `vue-loader` to emit server-oriented code when
  // compiling Vue components.
  target: 'node',

  // For bundle renderer source map support
  devtool: 'source-map',

  // This tells the server bundle to use Node-style exports
  output: {
    libraryTarget: 'commonjs2'
  },

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'vue-notification$': 'vue-notification/dist/ssr.js'
    }
  },

  // https://webpack.js.org/configuration/externals/#function
  // https://github.com/liady/webpack-node-externals
  // Externalize app dependencies. This makes the server build much faster
  // and generates a smaller bundle file.
  externals: nodeExternals({
    // do not externalize dependencies that need to be processed by webpack.
    // you can add more file types here e.g. raw *.vue files
    // you should also whitelist deps that modifies `global` (e.g. polyfills)
    allowlist: [/\.(scss|css)$/, 'vue-notification']
  }),

  // This is the plugin that turns the entire output of the server build
  // into a single JSON file. The default file name will be
  // `vue-ssr-server-bundle.json`
  plugins: [
    new VueSSRServerPlugin({
      filename: 'ssr/server-bundle.json'
    }),
    new webpack.DefinePlugin({
      'process.env': env,
      DEBUG: 'false',
      SERVER: 'true'
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../index-ssr.html'),
        to: config.build.assetsRoot + '/ssr/index.html'
      }
    ]),
    new MiniCssExtractPlugin({
        filename: utils.assetsPath('css/[name].[contenthash].css'),
        chunkFilename: utils.assetsPath('css/[id].[contenthash].css'),
        ignoreOrder: true
    }),
  ]
})