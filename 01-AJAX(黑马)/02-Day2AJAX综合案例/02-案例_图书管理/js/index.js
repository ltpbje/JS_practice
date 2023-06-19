/**
 * 目标1：渲染图书列表
 *  1.1 获取数据
 *  1.2 渲染数据
 */

const creator = '老李';

function getBooklist() {

    axios({
        url: 'http://hmajax.itheima.net/api/books',
        params: {
            creator
        }
    }).then(result => {
        console.log(result);
        console.log(result.data.data);
        bookList = result.data.data;
        const str_bookList = bookList.map((item, index) => {
            const { bookname, author, publisher, id } = item;
            return `<tr>
              <td>${index + 1}</td>
              <td>${bookname}</td>
              <td>${author}</td>
              <td>${publisher}</td>
              <td data-id= "${id}">
                <span class="del">删除</span>
                <span class="edit">编辑</span>
              </td>
            </tr>`;
        }).join('');
        document.querySelector('.list').innerHTML = str_bookList;
    })

};
getBooklist();
const add_btn = document.querySelector('.add-btn');
const Modal = document.querySelector('.add-modal');
const addModal = new bootstrap.Modal(Modal);
// 新增图书
add_btn.addEventListener('click', () => {
    // debugger;
    const form = document.querySelector('.add-form');
    // 1.获取数据
    const data = serialize(form, { hash: true, empty: true });
    // console.log(data);
    const { bookname, author, publisher } = data;
    axios({
        url: 'http://hmajax.itheima.net/api/books',
        method: 'post',
        data: {
            ...data,
            creator
        }
    }).then((result) => {
        // console.log(result);
        getBooklist();
        addModal.hide();
    })
});
// 删除
const list = document.querySelector('.list');
list.addEventListener('click', function (e) {
    // debugger
    // console.log(e.target);
    // console.log(e.target.classList.contains("del"));
    if (e.target.classList.contains('del')) {
        // console.log('点我删除');
        // debugger
        // const del_id = e.target.parentNode.dataset.id;
        const theId = e.target.parentNode.dataset.id
        // console.log(del_id);
        axios({
            url: `http://hmajax.itheima.net/api/books/${theId}`,
            method: 'DELETE'
        }).then(() => {
            getBooklist();
        });
    }
});
// 编辑弹框的显示与隐藏
const edit_modal = document.querySelector('.edit-modal');
const editModal = new bootstrap.Modal(edit_modal);
list.addEventListener('click', function (e) {
    if (e.target.classList.contains('edit')) {
        editModal.show();
        // 编辑框信息回显
        const theId = e.target.parentNode.dataset.id;
        axios({
            url: `http://hmajax.itheima.net/api/books/${theId}`
        }).then((result) => {
            const bookObj = result.data.data;

            const keys = Object.keys(bookObj);
            //遍历数组 foreach()
            keys.forEach((key) => {
                document.querySelector(`.edit-form .${key}`).value = bookObj[key];
            });
        })
    }
});
const edit_btn = document.querySelector('.edit-btn');
edit_btn.addEventListener('click', function () {
    // 修改图书详情
    const edit_form = document.querySelector('.edit-form');
    const dataObj = serialize(edit_form, { hash: true, empty: true });
    console.log(dataObj);//{id: '197118', bookname: '前端开发进阶', author: '我们都是黑马程序员', publisher: '北京出版社'}
    const { id, bookname, author, publisher } = dataObj;
    axios({
        url: `http://hmajax.itheima.net/api/books/${id}`,
        method: 'put',
        data: {
            bookname,
            author,
            publisher,
            creator
        }
    }).then(result => {
        console.log(result);
        getBooklist();
        editModal.hide();
    })
});
