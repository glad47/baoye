import React, {useEffect, useState} from 'react';
import { Badge, Popover } from 'antd';
// import Product from '../Menus/product'
// import Assembly from '../Menus/AssemblyAllMenu'
// import Solution from '../Menus/Solution'
// import Resource from '../Menus/Resource'
// import Company from '../Menus/Company'
import {BellFilled, ShoppingCartOutlined} from '@ant-design/icons'
import LoginShow from '../DownMenu/loginShow'
import HeaderTips from "./HeaderTips";
import {changeCarDrawer, useAppState} from "../state";
import SysMessage from "./components/SysMessage";
import {ajaxCarList, ajaxCarListForAssembly, ajaxCarListForStencil} from "../SpecificationInput/AjaxService";

const Head:React.FC = (props: any) => {
    const { dispatch, user } = useAppState();
    const [tipsShow, setTipsShow] = useState<boolean>(false);
    const [cartNum, setCartNum] = useState(0);
    const handleManage = () => {
        window.open('https://sys.pcbonline.com/home')
    }
    const [popoverVisible, setPopoverVisible] = useState(false);
    useEffect(() => {
        const {pathname} = window.location;
        if (pathname === '/') {
            setTipsShow(true);
        }
        getCartNum()
    }, []);

    // 用户信息接口没返回购物车数量， 重复请求
    const getCartNum = async () => {
        if (props.loginName[0]) {
            const status = 1;
            const s1: any = await ajaxCarList({status});
            const s2: any = await ajaxCarListForStencil({status});
            const s3: any = await ajaxCarListForAssembly({status});
            const total = s1.total + s2.total + s3.total;
            setCartNum(total);
        }
    }

    // 打开购物车
    const handlerCar = () => {
        dispatch(changeCarDrawer(true));
    }

    const handleVisibleChange = (visible: any) => {
        setPopoverVisible(visible);
    }

    const hidePopover = () => {
        setPopoverVisible(false);
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
                            <a href="https://www.pcbonline.com/factory-live/" target="_blank">Factory Live</a>
                        </li>
                        <li className='pcb-menu-two'>
                            <a href="https://www.pcbonline.com/quality-control/" target="_blank">Quality Control</a>
                        </li>
                        <li className='pcb-menu-three'>
                            <a href="https://www.pcbonline.com/about/" target="_blank">About Us</a>
                        </li>
                        <div className="sign-btn">
                            {props.loginName[0] === null
                                ? <span className="sign-in">
                                    <a href='http://sys.pcbonline.com//login?jumpUrl=/blog'>
                                        SIGN IN
                                    </a>
                                </span>
                                :
                                <div className='use_name' onClick={handleManage}>
                                    {props.loginName[1] ?
                                        <img src={props.loginName[1]} />
                                        : ''}
                                </div>
                            }
                            {props.loginName[0] !== null && <LoginShow />}
                        </div>
                        {
                            props.loginName[0] !== null
                            &&
                                <>
                                    <li className="h-badge">
                                        <Popover
                                            className="sys-popover"
                                            content={<SysMessage />}
                                            trigger="click"
                                            visible={popoverVisible}
                                            onVisibleChange={handleVisibleChange}
                                        >
                                            <Badge
                                                showZero={false}
                                                count={user.message.unread}
                                                dot
                                                size="small"
                                                offset={[-2, 1]}>
                                                <BellFilled onClick={() => setPopoverVisible(true)}/>
                                            </Badge>
                                        </Popover>
                                    </li>
                                    <li className="h-badge num" onClick={handlerCar}>
                                        <Badge count={cartNum} size="small">
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

export default Head;