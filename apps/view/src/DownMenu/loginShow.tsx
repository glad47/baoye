import React, { Component } from 'react'
import { ShoppingCartOutlined ,PoweroffOutlined } from '@ant-design/icons'
export default class loginShow extends Component {
    render() {
        return (
            <div className="login_show">
                <p className='down_sw_login'></p>
                <div className='login_nav_two'>
                    <a >Change the password</a>
                    <a >My information</a>
                    <a ><ShoppingCartOutlined />  My order</a>
                    <a ><PoweroffOutlined/>    Login out</a>
                </div>
            </div>
        )
    }
}
