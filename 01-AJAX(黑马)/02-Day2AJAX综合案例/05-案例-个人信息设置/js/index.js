/**
 * 目标1：信息渲染
 *  1.1 获取用户的数据
 *  1.2 回显数据到标签上
 * */
const creator = 'bo仔';
// 数据回显
axios({
    url: 'http://hmajax.itheima.net/api/settings',
    method: 'get',
    params: {
        creator
    }
}).then(result => {
    console.log(result);
    console.log(result.data.data);
    useData = result.data.data
    Object.keys(useData).forEach(key => {
        if (key === 'avatar') {
            document.querySelector('.prew').src = useData[key];
        } else if (key === 'gender') {
            document.querySelector(`.gender[value='${useData[key]}']`).checked = true;
        }
        else {
            document.querySelector(`.${key}`).value = useData[key];
        }
    });
})
// 修改头像
document.querySelector('.upload').addEventListener('change', function (e) {
    console.log(e.target.files);
    const fd = new FormData();
    fd.append('avatar', e.target.files[0]);
    fd.append('creator', creator);
    axios({
        url: 'http://hmajax.itheima.net/api/avatar',
        method: 'put',
        data: fd
    }).then(result => {
        // console.log(result.data.data.avatar);
        const imgUrl = result.data.data.avatar
        document.querySelector('.prew').src = imgUrl;
    })
});
// 修改信息
document.querySelector('.submit').addEventListener('click', function () {
    const userForm = document.querySelector('.user-form');
    const dataObj = serialize(userForm, { hash: true, empty: true });
    dataObj.creator = creator;
    dataObj.gender = +dataObj.gender;
    console.log(dataObj);
    axios({
        url: 'http://hmajax.itheima.net/api/settings',
        method: 'PUT',
        data: dataObj
    }).then(result => {
        // 设置提示框
        const toast = document.querySelector('.my-toast');
        const mToast = new bootstrap.Toast(toast);
        mToast.show();
    })
});
