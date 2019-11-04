const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, '../src/main.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/SuperReceipt.min.js',
        chunkFilename: 'js/[name].[hash:8].js',
        publicPath: './'
    },
    devServer: {
        hot: true,
        port: 8989,
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'cache-loader'
                    },
                    {
                        loader: 'vue-loader',
                        options: {
                            compilerOptionsP: {
                                preserveWhitespace: false
                            }
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../web/index.html')
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin()
    ]
};