const path = require('path');
const { Template } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
    //入口
    entry: path.join(__dirname, './src/login/index.js'),
    //输出
    output: {
        path: path.join(__dirname, 'dist'),
        filename: './login/index.js',
        clean: true //生成打包后内容之前，清空输出目录
    },
    //插件 (给Webpack提供更多功能)
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public/login.html'),//模板文件
            filename: path.join(__dirname, 'dist/index.html')//输出文件
        }),
        new MiniCssExtractPlugin(),
        new MiniCssExtractPlugin(),
    ],
    // 加载器 (让webpack识别更多模块文件内容)
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },
    //优化压缩css代码
    optimization: {
        minimizer: [
            // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
            `...`,
            new CssMinimizerPlugin(),
        ],
    },
}