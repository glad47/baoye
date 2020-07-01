import React, { Component } from 'react'
import { ShoppingCartOutlined ,PoweroffOutlined } from '@ant-design/icons'
export default class loginShow extends Component {
    render() {
        return (
            <div className="login_show">
                <p className='down_sw_login'></p>
                <div className='login_nav_two'>
                    <a href='/user/resetPwd'>Change the password</a>
                    <a href='#1'>My information</a>
                    <a href='/awaitingAudit'><ShoppingCartOutlined />  My order</a>
                    <a href='#loginOut'><PoweroffOutlined/>    Login out</a>
                </div>
            </div>
        )
    }
}
