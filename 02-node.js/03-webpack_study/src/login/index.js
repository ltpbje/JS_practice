/**
 * 目标一:体验webpack打包的过程
 */
// 打包css代码
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
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
    else {
        console.log('服务器登录中...');
    }
});
/** 
 * 目标6：优化 - 提取css代码到单独的css文件中
 * 6.1下载mini-css-extract-plugin本地软件包
 * 6.2配置webpack,config.js让Webpack拥有该插件功能
 * 6.3打包后观察效果
**/