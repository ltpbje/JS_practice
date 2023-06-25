// axios 公共配置
// 基地址
// axios.defaults.baseURL = 'http://geek.itheima.net'; 
axios.defaults.baseURL = 'http://geek.itheima.net'

axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('token');
    token && (config.headers.Authorization = `Bearer ${token}`);
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});