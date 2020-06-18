import React, { Component } from 'react'
import { CalculatorOutlined ,CaretDownOutlined} from '@ant-design/icons'
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
                <div className="logo_inner"><img src={require('../images/logo.png')} alt="" /></div>
                <div className='nav_logo'>
                    <ul className='nav_logo_inner'>
                        <li><a href='https://www.pcbonline.com/'>HOME</a></li>
                        <li><a href='https://www.pcbonline.com/quote'>QUOTE</a></li>
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
                            <LastMenu/>
                        </li>
                        <li className='title_blog'><a href='https://www.pcbonline.com/blog'>BLOG</a></li>
                        <li><a href='https://www.pcbonline.com/feedback'>FEEDBACK</a></li>
                        <li><a href='https://www.pcbonline.com/about'>ABOUT</a></li>
                    </ul>

                </div>
                <div className="sign-btn">
                    <span className="sign-in">Sign in</span>
                </div>
            </div>
        )
    }
}
export default index