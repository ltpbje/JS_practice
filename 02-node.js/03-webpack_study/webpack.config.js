const path = require('path');
module.exports = {
    //入口
    entry: path.join(__dirname, './src/login/index.js'),
    //输出
    output: {
        path: path.join(__dirname, 'dist'),
        filename: './login/index.js',
        clean: true //生成打包后内容之前，清空输出目录
    }

}