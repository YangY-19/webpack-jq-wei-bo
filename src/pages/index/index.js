import "layui-src/dist/layui.all"
// import "jquery/dist/jquery.slim"
import "layui-src/src/css/layui.css"
import "./index.scss"
import { verifyLogin } from '../../server/index'
layui.config({
    dir: '/dist/'
})
// $(document).ready(() => { 
//     verifyLogin().then(res => {
//        if (res.data.code !== 10000) {
//           window.location.href = '/login.html'
//        }
//     })


// });