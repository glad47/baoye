import React, { Component } from 'react'
import { CalculatorOutlined, CaretDownOutlined } from '@ant-design/icons'
import Axios from 'axios'
import Menus from '../DownMenu'
import ShowMenu from '../DownMenu/showMenu'
import LastMenu from '../DownMenu/lastMenu'

interface IsHead {
    props: any
}

class index extends Component {
    constructor(props: IsHead) {
        super(props)
        this.state = {
            f: false
        }
    }
    componentDidMount() {
        console.log('函数初始化')
    }
    render() {
        return (
            <div className='login'>
                <div className='login_inner_layout'>
                    <div className="logo_inner"><img src={require('../images/logo.png')} alt="" /></div>
                    <div className='nav_logo'>
                        <ul className='nav_logo_inner'>
                            <li><a href='https://www.pcbonline.com/'>Home</a></li>
                            <li className='new_add_active'>
                                <a href='https://www.pcbonline.com/quote'>Instant Quote</a>
                                <p className='new_active'><img src={require('../images/new-t.gif')} alt='new function' /></p>
                            </li>
                            <li className='down_menu_one'>
                                <a >PCB Fab <CaretDownOutlined /></a>
                                <Menus />
                            </li>
                            <li className='down_menu_two'>
                                <a>PCB Assembly <CaretDownOutlined /></a>
                                <ShowMenu />
                            </li>
                            <li className='down_menu_three'>
                                <a>How We Produce <CaretDownOutlined /></a>
                                <LastMenu />
                            </li>
                            <li className='title_blog'><a href='/blog'>Blog</a></li>
                            <li><a href='/feedback'>Feedback</a></li>
                            <li><a href='https://www.pcbonline.com/about'>About</a></li>
                        </ul>

                    </div>
                    <div className="sign-btn">
                        <span className="sign-in">Sign in</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default index