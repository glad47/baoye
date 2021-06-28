import React, {useEffect, useState} from 'react'
import { Badge } from 'antd';
// import Product from '../Menus/product'
// import Assembly from '../Menus/AssemblyAllMenu'
// import Solution from '../Menus/Solution'
// import Resource from '../Menus/Resource'
// import Company from '../Menus/Company'
import {BellFilled, ShoppingCartOutlined} from '@ant-design/icons'
import LoginShow from '../DownMenu/loginShow'
import HeaderTips from "./HeaderTips";
import {changeCarDrawer, useAppState} from "../state";

function Head(props: any) {
    const { dispatch, carDrawerStatus } = useAppState();
    const [tipsShow, setTipsShow] = useState<boolean>(false);
    const handleManage = () => {
        window.open('https://sys.pcbonline.com/home')
    }
    useEffect(() => {
        const {pathname} = window.location;
        if (pathname === '/') {
            setTipsShow(true);
        }
    }, []);

    // 打开购物车
    const handlerCar = () => {
        dispatch(changeCarDrawer(true));
    }

    return (
        <div id='pcb-header'>
            <div className='pcb-header-inner'>
                <div className='pcb-header-logo'>
                    <div className='pcb-header-logo-bg'>
                        <a href="https://www.pcbonline.com" title="PCBONLINE">PCBONLINE</a>
                    </div>
                </div>
                <div className='pcb-header-menu'>
                    <ul className='pcb-header-menu-all'>
                        <li className='pcb-menu-one'>
                            <a>Factory Live</a>
                        </li>
                        <li className='pcb-menu-two'>
                            <a>Quality Control</a>
                        </li>
                        <li className='pcb-menu-three'>
                            <a>About Us</a>
                        </li>
                        <div className="sign-btn">
                            {props.loginName[0] === null
                                ? <span className="sign-in">
                                    <a href='http://sys.pcbonline.com//login?jumpUrl=/blog'>
                                        SIGN IN
                                </a>
                                </span>
                                : <div className='use_name' onClick={handleManage}>
                                    {props.loginName[1] ?
                                        <img src={props.loginName[1]} />
                                        : ''}
                                </div>
                            }
                            {props.loginName === null ? null : <LoginShow />}
                        </div>
                        {
                            props.loginName[0] !== null
                            &&
                                <>
                                    <li className="h-badge">
                                        <Badge count={5} dot size="small" offset={[-2, 1]}>
                                            <BellFilled />
                                        </Badge>
                                    </li>
                                    <li className="h-badge num" onClick={handlerCar}>
                                        <Badge count={5} size="small">
                                            <ShoppingCartOutlined />
                                        </Badge>
                                    </li>
                                </>
                        }
                        {/*<div className="pcb-search">*/}
                        {/*    <img src={require('../images/ocb-search.png')} alt="search" />*/}
                        {/*</div>*/}
                    </ul>
                </div>
            </div>
            {
                tipsShow && <HeaderTips />
            }
        </div>
    )
}

export default Head