import "layui-src/dist/layui.all"
import "jquery/dist/jquery.slim"
import "layui-src/src/css/layui.css"
import "./index.scss"

layui.config({
    dir: '/dist/'
})
$(document).ready(() => {
    console.log('222' )
        const token = localStorage.getItem('token')
    if(!token) {
        window.location.href = "/login.html"
    } 
});