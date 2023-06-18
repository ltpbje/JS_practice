/**
 * 目标1：信息渲染
 *  1.1 获取用户的数据
 *  1.2 回显数据到标签上
 * */
// 数据回显
axios({
    url: 'http://hmajax.itheima.net/api/settings',
    method: 'get',
    params: {
        creator: '播仔',
    }
}).then(result => {
    console.log(result);
    console.log(result.data.data);
    useData = result.data.data
    Object.keys(useData).forEach(key => {
        if (key === 'avatar') {
            document.querySelector('.prew').src = useData[key];
        }

    });
})