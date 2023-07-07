/*
目标：基于ECMAScript标准语法，封装属性和
方法并"默认"导出
*/
const baseURL = 'http://hmajax.itheima.net';
const getArraySum = arr => arr.reduce((sum, item) => sum += item, 0)

export default {
    url: baseURL,
    arraySum: getArraySum
}