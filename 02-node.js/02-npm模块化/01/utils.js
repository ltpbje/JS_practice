/* 目标：基于Common.JS标准话法，封装属性和
 方法并导出*/
const baseURL = 'http://hmajax.itheima.net';
const getArraySum = arr => arr.reduce((sum, item) => sum += item, 0)

module.exports = {
    url: baseURL,
    arraySum: getArraySum
}