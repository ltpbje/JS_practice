const path = require('path');
const { Template } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
        })
    ],
    // 加载器 (让webpack识别更多模块文件内容)
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
}