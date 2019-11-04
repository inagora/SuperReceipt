const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');
const webpack = require('webpack');

module.exports = merge(webpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        })
    ]
});