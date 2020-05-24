import { post } from '../utils/request' 

function login (params) {
   return post('/weibo/user/login', params)
}

export {
    login
}