import axios from 'axios'
import Cookies from "js-cookie";
import {GetUrlRelativePath} from "./util";

//线上
// const baseUrl = "https://www.pcbonline.com/" //线上前端
// const sysUrl = "https://sys.pcbonline.com/"  //线上后端
// 线下
const baseUrl = "http://localhost:8083/base" //网站前端
const sysUrl = "http://localhost:8083/sys"  //网站后端
// parker服务器配置地址
// const baseUrl = "http://pcb.imcoding.top/base/" //网站前端
// const sysUrl = "http://pcb.imcoding.top/sys/"  //网站后端

// api登录拦截
const AUTH_API = [
    '/api/quote/query', // 订单列表
]

const service = axios.create({
    baseURL: baseUrl, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 50000 // request timeout
})
// request interceptor
service.interceptors.request.use(
    config => {
        const token = Cookies.get('token');
        // if ()
        if (token) config.headers.Authorization = token;
        // do something before request is sent
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data.result

        // if the custom code is not 20000, it is judged as an error.
        return res
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)

export default service
