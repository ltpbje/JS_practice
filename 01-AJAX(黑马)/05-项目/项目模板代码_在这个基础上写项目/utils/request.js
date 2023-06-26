// axios 公共配置
// 基地址
// axios.defaults.baseURL = 'http://geek.itheima.net'; 
axios.defaults.baseURL = 'http://geek.itheima.net'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('token');
    token && (config.headers.Authorization = `Bearer ${token}`);
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const result = response.data;
    return result;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.dir(error);
    console.dir(error.response.status);
    if (error?.response?.status === 401) {
        alert(error.response.data.message);
        location.href = '../login/index.html';
        localStorage.clear();
    }
    return Promise.reject(error);
});