
'use strict'

const path = require('path')
const { EnvironmentPlugin } = require('webpack')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')

const pkg = require('./package.json')
const {
    DEV_MODE,
    OUT_DIRNAME,
    OUT_IMAGES,
    baseConfig,
} = require('@tracespace/config/webpack')

const OUT_PATH = path.join(__dirname, OUT_DIRNAME)
const EXAMPLE_OUT = path.join(OUT_PATH, 'arduino-uno.zip');
const VIDEO_OUT = path.join(OUT_DIRNAME, 'styles');

const EXAMPLE_FILES = path.join(
    path.dirname(require.resolve(__dirname + path.join('/src/styles/pcb-video.mp4'))),
)

module.exports = merge(baseConfig(__dirname), {
    entry: {
        bundle: path.join(__dirname, 'src/index.tsx'),
    },
    output: {
        globalObject: 'this',
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.json', '.css'],
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
    },
    module: {
        rules: [
            {
                test: /worker\.ts$/i,
                loader: 'worker-loader',
            },
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    configFile: path.join(__dirname, '../../babel.config.js'),
                },
            },
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                enforce: 'pre',
            },
            {
                test: /\.css$/,
                use: [
                    DEV_MODE ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.(png|ico|gif)$/,
                loader: 'url-loader?name=images',
                options: {
                    name: '[name].[contenthash].[ext]',
                    esModule: false
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: "file-loader"
            },
            {
                test: /\.(mp4)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    name: 'images/[name].[contenthash].[ext]',
                    limit:10
                }
            },
        ],
    },
    plugins: [
        new EnvironmentPlugin({
            MIXPANEL_ID: null,
            PKG_VERSION: pkg.version,
            PKG_REPOSITORY_URL: pkg.repository.url,
            PKG_AUTHOR_NAME: pkg.author.name,
            PKG_AUTHOR_URL: pkg.author.url,
        }),
        new FileManagerPlugin({
            onStart: { mkdir: [OUT_IMAGES] },
            // onEnd: { archive: [{ source: EXAMPLE_FILES, destination: VIDEO_OUT }] },
            onEnd: {
                copy: [
                    {
                        source: EXAMPLE_FILES,
                        destination: VIDEO_OUT
                    }
                ]
            }
        }),
        new HtmlPlugin({
            template: path.join(__dirname, 'src/template'),
            title: pkg.productName,
            author: pkg.author.name,
            description: pkg.description,
        }),
    ],
    // ????????????
    devServer: {
        contentBase: path.join(__dirname, '/src/'),
        inline: true
        // proxy:{
        //   "/api":{
        //     target:"https://sys.pcbonline.com",
        //     pathRewrite:{"^/api":""},
        //     changeOrigin:true,
        //     secure:false,
        //   }
        // }
    }
}) 
