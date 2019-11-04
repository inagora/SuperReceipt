const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(webpackConfig, {
    mode: 'production',
    devtool: '#source-map',
    optimization: {
        // splitChunks: {
        //     cacheGroups: {
        //         vendors: {
        //             name: 'chunk-vendors',
        //             test: /[\\\/]node_modules[\\\/]/,
        //             priority: -10,
        //             chunks: 'initial'
        //         },
        //         common: {
        //             name: 'chunk-common',
        //             minChunks: 2,
        //             priority: -20,
        //             chunks: 'initial',
        //             reuseExistingChunk: true
        //         }
        //     }
        // }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name],[contenthash:8].css'
        }),
        new OptimizeCssnanoPlugin({
            sourceMap: true,
            cssnanoOptions: {
                preset: [
                    'default',
                    {
                        mergeLonghand: false,
                        cssDeclarationSorter: true
                    }
                ]
            }
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../web'),
                to: path.resolve(__dirname, '../dist')
            }
        ]),
        new CleanWebpackPlugin()
    ]
});