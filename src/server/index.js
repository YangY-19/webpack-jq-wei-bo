import { post } from '../utils/request' 

function verifyLogin (params) {
   return post('/weibo/user/verifyLogin', params)
}

export {
    verifyLogin
}