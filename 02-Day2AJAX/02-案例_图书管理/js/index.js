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
            const { bookname, author, publisher } = item;
            return `<tr>
              <td>${index + 1}</td>
              <td>${bookname}</td>
              <td>${author}</td>
              <td>${publisher}</td>
              <td>
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
        console.log(result);
        getBooklist();
        addModal.hide();
    })
});