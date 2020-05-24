import request from "./http"
import qs from "qs"

/**
 * get请求
 * @method get
 * @param {url, params} 请求地址，请求参数
 */
const get = function( url, params ) {
    return new Promise((resolve, reject) => {
        request
            .get(url, {
                params: params
            })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * post请求
 * @method post
 * @param {url, params} 请求地址，请求参
 */
const post = function(url, params ) {
    return new Promise((resolve, reject) => {
        request
            .post(url, qs.stringify(params))
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export { get, post }
