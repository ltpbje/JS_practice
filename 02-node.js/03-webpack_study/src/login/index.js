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
/**
 * 目标8：打包1ess代码
 * 8.1新建less代码（设置背景图）并引入到src/1ogin/index.js中
 * 8.2下载1ess和1ess-1 pader本地软件包
 * 8.3配置webpack.config.js让Webpack拥有功能
 * 8.4打包后观察效果
 */
import './login.less'
/**
 * 目标9：打包资源模块（图片处理）
 *  9.1 创建 img 标签并动态添加到页面，配置 webpack.config.js
 *  9.2 打包后观察效果和区别
 */
// 9.1 创建 img 标签并动态添加到页面，配置 webpack.config.js
// 注意：js 中引入本地图片资源要用 import 方式（如果是网络图片http地址，字符串可以直接写）
import imgObj from './assets/logo.png';
const theImg = document.createElement('img');
theImg.src = imgObj;
document.querySelector('.login-wrap').appendChild(theImg);
import { myAlert } from '../utils/alert.js';
import axios from '../utils/request.js';
document.querySelector('.btn').addEventListener('click', e => {
    const mobile = document.querySelector('[name="mobile"]').value;
    const code = document.querySelector('[name="code"]').value;
    if (!checkPhone(mobile)) {
        myAlert(false, '手机号错误');
        return;
    } if (!checkCode(code)) {
        myAlert(false, '验证码错误');
        return;
    }
    else {
        axios({
            url: '/v1_0/authorizations',
            method: 'post',
            data: {
                mobile,
                code
            }
        }).then(() => {
            myAlert(true, '登录成功');
        }).catch(error => {
            myAlert(false, error.response.data.message)
            console.log(error.response.data.message);
        });
    }
});
console.log(111);