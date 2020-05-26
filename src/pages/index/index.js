import "layui-src/dist/layui.all"
// import "jquery/dist/jquery.slim"
import "layui-src/src/css/layui.css"
import "./index.scss"

import { getHomeBlogList, getMoreBlogList } from '../../server/index'

layui.config({
    dir: '/dist/'
})
// $(document).ready(() => { 
    // 
    //获取weibo列表
    const getWeiboList = (result) => {
        let { blogList } = result.data
        for (let index = 0; index < blogList.length; index++) {
            const item = blogList[index];
            let html = `<li class="home-list-item" id="list-item">
                            <div class="item-user-info" >
                                <div class="user-info">
                                    <img src=${item.user.picture}>
                                    <div class="nickname-info">
                                        <div class="nickname">${item.user.nickName}</div>
                                        <div class="add-time-info">${item.city ? `来着 ${item.city}` : '保密' }</div>
                                    </div>
                                </div>
                                <div class="more" id="mored">
                                    <i class=" layui-icon layui-icon-down"></i>
                                    <div class="more-list">
                                        <ul>
                                          <li>关注</li>
                                          <li>取消关注</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="item-user-article">
                                <article>
                                    ${item.content}
                                </article>
                                <div class="img-box"></div>
                            </div>
                        </li>`
            
            $('.home-list').animate({opacity:1}).append(html)
            if (item.images) {
                let imgs = item.images.split(',')
                imgs.forEach(imgItem => {
                    let img = `<img src=${imgItem}></img>`
                    $('.home-list').find('.home-list-item').eq(index).find('.img-box').append(img)
                });
            }
        }
    }

    const hasLogin = localStorage.getItem('IS_LOGIN')
    const UserId = localStorage.getItem('USER_ID')
    if (hasLogin && UserId) {
        getHomeBlogList().then(res => {
            const result = res.data
            if (result && result.code === 10000) {
                getWeiboList(result)
            }
         })
    }

    //点击底部加载更多
    let loadMoreIndex = 0
    $('.load-more').on('click', () => {
        loadMoreIndex++
        getMoreBlogList({
            index: loadMoreIndex
        }).then(res => {
            const result = res.data
            if (result && result.code === 10000) {
                getWeiboList(result)
            }
        })
    })
 

    //点击more
    $("list2 li").click(function(){
      const index = $(this).index()
      const index3 =  $(this).find('#list-item').eq(index).prevObject
    //   .find('.more-list').show()
      debugger
    });
// });
