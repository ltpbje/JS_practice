/**
 * 目标：网站-更换背景
 *  1. 选择图片上传，设置body背景
 *  2. 上传成功时，"保存"图片url网址
 *  3. 网页运行后，"获取"url网址使用
 * */
const bg_ipt = document.querySelector('.bg-ipt');
bg_ipt.addEventListener('change', function (e) {
    console.log(e.target.files[0]);
    const fd = new FormData();
    fd.append('img', e.target.files[0]);
    console.log(fd);
    axios({
        url: 'http://hmajax.itheima.net/api/uploadimg',
        method: 'post',
        data: fd
    }).then(result => {
        // console.log(result);
        // console.log(result.data.data.url);
        const bgUrl = result.data.data.url;
        document.body.style.backgroundImage = `url('${bgUrl}')`;
        localStorage.setItem('bgurl', bgUrl);

    })
});
const url = localStorage.getItem('bgurl');
url && (document.body.style.backgroundImage = `url('${url}')`);