'use strict'

const path = require('path')
const merge = require('webpack-merge')

const {browserScriptConfig} = require('@tracespace/config/webpack')

module.exports = merge(browserScriptConfig(__dirname), {
  entry: {
    'whats-that-gerber': path.join(__dirname, 'index.js'),
  },
  output: {
    library: 'whatsThatGerber',
  },
})
