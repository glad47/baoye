/*
 * @Author: 黄常浩
 * @Date: 2021-12-20 19:30:41
 * @LastEditors: aziz
 * @LastEditTime: 2022-05-12 11:22:58
 * @Description: axios 页面
 */
import axios from 'axios'
import Cookies from "js-cookie";
import { message } from "antd";

//线上
const baseUrl = "https://www.pcbonline.com/" //线上前端
const sysUrl1 = "https://sys.pcbonline.com/"  //线上后端



// 线下
// const baseUrl = "http://localhost:8083/base" //网站前端
// const sysUrl = "http://localhost:8083/sys"  //网站后端


// const baseUrl = "http://10.168.8.250:8877";

//ofline
 const sysUrl = "http://10.168.8.250:8871"

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
        let res;
        if (response.data.result) {
            res = response.data.result;
        } else if (response.data.data) {
            res = response.data.data;
        } else {
            res = response.data;
        }
        // if the custom code is not 20000, it is judged as an error.
        return res
    },
    error => {
        const { data } = error.response;
        if (data) {
            const { code } = data;
            if (code === '403') {
                message.error('登陆失效，请重新登陆！');
                setTimeout(() => {
                    location.replace("/");
                }, 1500)
            } else {
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
)

export default service
