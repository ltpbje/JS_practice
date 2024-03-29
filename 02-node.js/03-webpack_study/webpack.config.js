const path = require('path');
const { Template } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const webpack = require('webpack');
const config = {
    // mode 设置为 'development'
    mode: 'development',
    devServer: {
        static: './dist/login',
    },
    //入口
    entry: {
        'login': path.join(__dirname, './src/login/index.js'),
    },
    // path.join(__dirname, './src/login/index.js'),
    //输出
    output: {
        path: path.join(__dirname, 'dist'),
        filename: './[name]/index.js',
        clean: true //生成打包后内容之前，清空输出目录
    },
    //插件 (给Webpack提供更多功能)
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public/login.html'),//模板文件
            filename: path.join(__dirname, 'dist/login/index.html'),//输出文件
            useCdn: process.env.NODE_ENV === 'production',
            chunks: 'login'
        }),
        new MiniCssExtractPlugin({
            filename: './[name]/index.css'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],
    // 加载器 (让webpack识别更多模块文件内容)
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', "css-loader"],
            },                                                                        //style-loader 把 CSS 插入到 DOM 中。
            {
                test: /\.less$/i,
                use: [
                    // compiles Less to CSS
                    {
                        test: /\.(png|jpg|jpeg|gif)$/i,
                        type: 'asset',
                        generator: {
                            filename: 'assets/[hash][ext][query]'
                        }
                    }
                ],
            }
        ]
    },
    //优化压缩css代码
    optimization: {
        minimizer: [
            // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
            `...`,
            new CssMinimizerPlugin(),
        ],
    },
    // 解析(Resolve)
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
};
if (process.env.NODE_ENV === 'development') {
    config.devtool = 'inline-source-map'
};
module.exports = config;