import "../../assets/css/layui.css"
import "./index.scss"
import "layui-src/dist/layui.all"
import { login } from '../../server/login' 
layui.config({
    dir: '/dist/'
})


layui.use("form", () => {
    var form = layui.form;
    //监听提交
    form.on("submit(formDemo)", data => {
        console.log(data)
        const { field: { userName, password } } = data
        login({
            userName,
            password
        }).then(res => {
            const result = res.data
            if (result.code === 10000) {
                layer.msg('登录成功', {icon: 1});
                setTimeout(() => {
                    window.location.href = "/index.html"
                }, 1000)
            }
        })
        // layer.msg(JSON.stringify(data.field));
        return false;
    });
});

layui.use('layer', () => {
    var layer = layui.layer;
    layer.open({
        type: 1, 
        content: '传入任意的文本或html' //这里content是一个普通的String
      });
  });
