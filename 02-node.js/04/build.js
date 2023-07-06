/**
 * 目标1：压缩 html 代码
 * 需求：把回车符 \r，换行符 \n 去掉，写入到新 html 文件中
 *  1.1 读取源 html 文件内容
 *  1.2 正则替换字符串
 *  1.3 写入到新的 html 文件中
 */
// 1.1 读取源 html 文件内容
// const html = require('html');
const fs = require('fs');
const path = require('path');
fs.readFile(`${path.join(__dirname, 'public/index.html')}`, (err, data) => {
  if (err) console.log(err);
  else {
    // console.log(data.toString());
    const htmlStr = data.toString();
    const resultStr = htmlStr.replace(/[\n\r]/g, '');
    // console.log(resultStr);
    fs.writeFile(`${path.join(__dirname, 'dist/index.html')}`, resultStr, (err) => {
      if (err) console.log(err);
      else console.log('写入成功');
    });
  }
})