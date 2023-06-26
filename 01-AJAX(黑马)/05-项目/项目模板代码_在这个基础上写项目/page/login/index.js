// const { serialize } = require("v8");

/**
 * 目标1：验证码登录
 * 1.1 在 utils/request.js 配置 axios 请求基地址
 * 1.2 收集手机号和验证码数据
 * 1.3 基于 axios 调用验证码登录接口
 * 1.4 使用 Bootstrap 的 Alert 警告框反馈结果给用户
 */
document.querySelector('.btn').addEventListener('click', function () {
    const form = document.querySelector('.login-form');
    const data = serialize(form, { hash: true, empty: true });
    axios({
        url: "/v1_0/authorizations",
        method: 'post',
        data
    }).then(result => {
        console.log(result);
        myAlert(true, '登录成功');
        localStorage.setItem('token', result.data.token);
        setTimeout(function () {
            location.href = '../content/index.html';
        }, 1000)
    }).catch(error => {
        myAlert(false, error.response.data.message);
    })
})