import { post, get } from '../utils/request' 

function verifyLogin (params) {
   return post('/weibo/user/verifyLogin', params)
}

function getHomeBlogList() {
    return get('/weibo/blog/square')
}

function getMoreBlogList(params) {
    return get(`/weibo/blog/square/loadMore/${params.index}`)
}


export {
    verifyLogin,
    getHomeBlogList,
    getMoreBlogList
}