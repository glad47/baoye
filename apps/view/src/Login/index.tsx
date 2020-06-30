import React, { Component } from 'react'
import { CalculatorOutlined, CaretDownOutlined} from '@ant-design/icons'
import Menus from '../DownMenu'
import ShowMenu from '../DownMenu/showMenu'
import LastMenu from '../DownMenu/lastMenu'
import LoginShow from '../DownMenu/loginShow'
import { baseUrl } from '../SpecificationInput/AjaxService'
import axios from 'axios'

class index extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            userInfo: '',
            isLogin:true
        }
    }
    async componentDidMount() {
        let data = await axios.post('http://192.168.0.181:8882/' + 'loginUserInfo')
        if (data.success) {
            this.setState({
                userInfo: data.result.userName,
                isLogin: data.success
            })
        }
        console.log(this.state.userInfo)
    }
    render() {
        const {userName}=this.state.userInfo || ''
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
                        {this.state.isLogin
                            ? <span className="sign-in">Sign in</span>
                            : <div className='use_name'>{this.state.userInfo}</div>
                        }
                        {this.state.isLogin? '':<LoginShow/>}
                    </div>
                </div>
            </div>
        )
    }
}
export default index