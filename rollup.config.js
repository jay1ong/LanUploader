import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import vue from 'rollup-plugin-vue'
import packageInfo from './package.json'
const pluginCSS = require('rollup-plugin-css-only')


// const isDev = process.env.NODE_ENV === 'development'


function baseConfig() {
  return {
    output: {
      format: 'umd',
      sourcemap: true,
      banner: `/*!\n * Name: ${packageInfo.name}\n * Version: ${packageInfo.version}\n * Author: ${packageInfo.author}\n */`,
    },
    plugins: [
      resolve({
        jsnext: true,
        main: true,
        browser: true,
      }),
      commonjs({
        extensions: [
          '.js',
          '.jsx',
          '.json',
          // '.vue'
        ],
      }),
    ],
  }
}

let config = baseConfig()
config.input = 'src/index.js'
config.output.file = 'dist/lan-uploader.js'
config.output.name = 'LanUploader'
config.plugins.push(
  vue({
    template: {
      isProduction: true,
    },
    css: true,
  }),
  babel()
)

let configMin = baseConfig()
configMin.input = 'src/index.js'
configMin.output.file = 'dist/lan-uploader.min.js'
configMin.output.name = 'LanUploader'
configMin.plugins.push(
  vue({
    style: {
      trim: true,
    },
    template: {
      isProduction: true,
    },
    css: true,
  }),
  babel(),
  uglify({
    output: {
      comments: /^!/,
    }
  })
)


let configPart = baseConfig()
configPart.input = 'src/index.js'
configPart.output.file = 'dist/lan-uploader.part.js'
configPart.output.name = 'LanUploader'
configPart.plugins.push(
  pluginCSS(),
  vue({
    style: {
      trim: true,
    },
    template: {
      isProduction: true,
    },
    css: false,
  }),
  babel()
)


module.exports = [
  config,
  configMin,
  configPart,
]
