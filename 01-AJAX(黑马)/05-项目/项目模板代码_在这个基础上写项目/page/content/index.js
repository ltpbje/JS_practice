/**
 * 目标1：获取文章列表并展示
 *  1.1 准备查询参数对象
 *  1.2 获取文章列表数据
 *  1.3 展示到指定的标签结构中
 */
const queryParams = {
  status: '',
  channel_id: '',
  page: 1,
  per_page: 2
}
async function setArticleList() {
  const res = await axios({
    url: '/v1_0/mp/articles',
    params: queryParams
  });
  // console.log(res);
  document.querySelector('.total-count').innerHTML = `共${res.data.total_count}条`;
  console.log(res.data.results);
  const trStr = res.data.results.map(item => {
    return `<tr>
                <td>
                  <img src=${item.type === 0 ? `https://img2.baidu.com/it/u=2640406343,1419332367&amp;fm=253&amp;fmt=auto&amp;app=138&amp;f=JPEG?w=708&amp;h=500` : item.cover.images[0]} alt="">
                </td>
                <td>${item.title}</td>
                <td>
                  
                ${item.status === 1 ? ` <span class="badge text-bg-primary"> 待审核</span> ` : ` <span class="badge text-bg-success">审核通过</span>`}
                  
                </td>
                <td>
                  <span>${item.pubdate}</span>
                </td>
                <td>
                  <span>${item.read_count}</span>
                </td>
                <td>
                  <span>${item.comment_count}</span>
                </td>
                <td>
                  <span>${item.like_count}</span>
                </td>
                <td>
                  <i class="bi bi-pencil-square edit"></i>
                  <i class="bi bi-trash3 del" data-id ='${item.id}'></i>
                </td>
              </tr > `
  }).join('');
  totalCount = res.data.total_count;
  document.querySelector('.art-list').innerHTML = trStr;
}
setArticleList();

/**
 * 目标2：筛选文章列表
 *  2.1 设置频道列表数据
 *  2.2 监听筛选条件改变，保存查询信息到查询参数对象
 *  2.3 点击筛选时，传递查询参数对象到服务器
 *  2.4 获取匹配数据，覆盖到页面展示
 */
async function setChannleList() {
  const result = await axios({
    url: "/v1_0/channels"
  })
  // console.log(result);
  const selStr = result.data.channels.map(item => {
    return `<option value=${item.id}>${item.name}</option>`;
  }).join('');
  document.querySelector('.form-select').innerHTML = `<option value="" selected="">请选择文章频道</option>${selStr}`;
}
setChannleList();
document.querySelectorAll('.form-check').forEach(item => {
  item.addEventListener('change', function (e) {
    // console.log(e.target.value);
    queryParams.status = e.target.value;
  });
});
document.querySelector('.form-select').addEventListener('change', function (e) {
  // console.log(e.target.value);
  queryParams.channel_id = e.target.value;
});
document.querySelector('.sel-btn').addEventListener('click', function () {
  setArticleList();
});


/**
 * 目标3：分页功能
 *  3.1 保存并设置文章总条数
 *  3.2 点击下一页，做临界值判断，并切换页码参数并请求最新数据
 *  3.3 点击上一页，做临界值判断，并切换页码参数并请求最新数据
 */
let totalCount = 0;

document.querySelector('.next').addEventListener('click', function () {
  if (queryParams.page < Math.ceil(totalCount / queryParams.per_page)) {
    queryParams.page++;
    document.querySelector('.page-now').innerHTML = `第${queryParams.page}页`;
    setArticleList();
  }
})
document.querySelector('.last').addEventListener('click', function () {
  if (queryParams.page > 1) {
    queryParams.page--;
    document.querySelector('.page-now').innerHTML = `第${queryParams.page}页`;
    setArticleList();
  }
})
/**
 * 目标4：删除功能
 *  4.1 关联文章 id 到删除图标
 *  4.2 点击删除时，获取文章 id
 *  4.3 调用删除接口，传递文章 id 到服务器
 *  4.4 重新获取文章列表，并覆盖展示
 *  4.5 删除最后一页的最后一条，需要自动向前翻页
 */
document.querySelector('.art-list').addEventListener('click', async function (e) {
  if (e.target.classList.contains('del')) {
    // console.log(11);
    const artId = e.target.dataset.id;
    const res = await axios({
      url: `/v1_0/mp/articles/${artId}`,
      method: 'delete'
    });
    // console.log(res);
    document.querySelector('.table thead')
    setArticleList();
  }
});

// 点击编辑时，获取文章 id，跳转到发布文章页面传递文章 id 过去

