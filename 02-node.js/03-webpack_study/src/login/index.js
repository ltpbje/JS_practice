/**
 * 目标一:体验webpack打包的过程
 */
// 1.1 准备项目源代码
import { checkCode, checkPhone } from '../utils/check.js';
// console.log(checkCode, checkPhone);
// console.log(11);
// 1.2 准备webpack打包的环境
/**
 *目标2:  修改webpack打包入口和出口
 *   2.1  项目根目录，新建webpack.config.js配置文件
 *   2.2  导出配置对象，配置入口，出口文件路径
 *   2.3  重新打包观察
**/
document.querySelector('.btn').addEventListener('click', e => {
    const mobile = document.querySelector('[name="mobile"]').value;
    const code = document.querySelector('[name="code"]').value;
    if (!checkPhone(mobile)) {
        console.log('手机号错误');
    } if (!checkCode(code)) {
        console.log('验证码错误');
    }
});