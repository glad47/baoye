import React, { Component } from 'react'
import { ShoppingCartOutlined ,PoweroffOutlined } from '@ant-design/icons'
export default class loginShow extends Component {
    loginOut=()=>{
        sessionStorage.removeItem('username')
        window.location.href="/"
    }
    render() {
        return (
            <div className="login_show">
                <p className='down_sw_login'></p>
                <div className='login_nav_two'>
                    <a href='/changePassword'>Change password</a>
                    <a href='/myInfo'>My information</a>
                    <a href='/payment'>My order</a>
                    <span onClick={this.loginOut}>Login out</span>
                </div>
            </div>
        )
    }
}
