// 目标：基于http模块创建Web服务程序
//1.1加载http模块，创建Web服务对象
//1.2监听request请求事件，设置响应头和响应体
//1.3配置端口号并启动Web服务
//1.4浏览器请求(http:/loca1host:3000)测试
const http = require('http');
const server = http.createServer();
server.on('request', (req, res) => {
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    res.end('欢迎使用 Node.js 和 Http模块创建的Web服务');
});
server.listen(3000, () => {
    console.log('Web服务启动成功');
});