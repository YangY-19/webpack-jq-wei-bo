import "../../assets/css/index.scss"
import "./index.scss"
import "layui-src/src/css/layui.css"
import { verifyLogin } from '../../server/index'

$(document).ready(() => {
    verifyLogin().then(res => {
        let result = res.data
       if (result.code === 10000 && result.data.isLogin) {
           $('#userInfo > p').html(result.data.nickName)
        } else {
            $('#userInfo > .layui-icon').hide()
            $('#notice > .layui-icon-notice').hide()
            $('#notice > .layui-badge-dot').hide()
            $('#userInfo').html('<a href="/login.html">登录</a>')
            $('#notice').html('<a href="/login.html">注册</a>')
            $('#setting').hide()
            $('#add-word').hide()
       }
    })


});