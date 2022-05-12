/*
 * @Author: aziz
 * @Date: 2021-12-20 14:58:08
 * @LastEditors: aziz
 * @LastEditTime: 2022-03-09 17:11:48
 * @Description: file content
 */
import React, { Component } from 'react'
import { ShoppingCartOutlined ,PoweroffOutlined } from '@ant-design/icons'
import Cookies from 'js-cookie'
export default class loginShow extends Component {
    loginOut=()=>{
        sessionStorage.removeItem('username')
        Cookies.remove('token')
        Cookies.remove('user-login',  {domain:'pcbonline.com'});
        Cookies.remove('user-favicon', {domain:'pcbonline.com'});
        Cookies.remove('cartCount', {domain:'pcbonline.com'});
        // window.location.href="https://sys.pcbonline.com/instant-quote/"
        window.location.href="http://localhost:8081/instant-quote/"
    }
    render() {
        return (
            <div className="login_show">
                <p className='down_sw_login'></p>
                <div className='login_nav_two'>
                    <a href='/changePassword'>Change password</a>
                    <a href='/myInfo'>My information</a>
                    <a href='/payment'>My order</a>
                    <span onClick={this.loginOut}>Log out</span>
                </div>
            </div>
        )
    }
}
