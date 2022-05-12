import React, {useEffect, useState} from 'react';
import {Badge, notification, Popover} from 'antd';
// import Product from '../Menus/product'
// import Assembly from '../Menus/AssemblyAllMenu'
// import Solution from '../Menus/Solution'
// import Resource from '../Menus/Resource'
// import Company from '../Menus/Company'
import {BellFilled, ShoppingCartOutlined} from '@ant-design/icons'
import LoginShow from '../DownMenu/loginShow'
import HeaderTips from "./HeaderTips";
import {changeCarDrawer, reduxUser, useAppState} from "../state";
import SysMessage from "./components/SysMessage";
import {useHistory} from "react-router-dom";
import { Form, Input, Button, Checkbox,message } from 'antd'
import axios from 'axios'

import {
    ajaxCarList,
    ajaxCarListForAssembly,
    ajaxCarListForStencil,
    DescribeCurrUserMsg
} from "../SpecificationInput/AjaxService";
import {getKeysNumForArr, IsLogin, MetaTips, MyNotify} from "../util";
import * as Cookies from "js-cookie";
import emitter from "../eventBus";
import {openNotification} from "../utils/notify";
import ElMes from "../Components/ElMes";
import {sysUrl} from '../SpecificationInput/AjaxService'

let times: NodeJS.Timeout;

// function UserLogin(props: any) {
function Head(props: any) {
    const { dispatch, user } = useAppState();
    const [tipsShow, setTipsShow] = useState<boolean>(true);
    const [cartNum, setCartNum] = useState(0);
    const history = useHistory();
    const handleManage = () => {
        // window.open('https://sys.pcbonline.com/home', '_blank')
        window.open('https://sys.pcbonline.com/home', '_blank')
    }
    const [popoverVisible, setPopoverVisible] = useState(false);
    useEffect(() => {
        // console.log("$%$%$%$%$%$%$%$%$%$%$%$%")
        // console.log(Cookies.get('fromPCBCS'))
        if(Cookies.get('fromPCBCS')){
            
                // console.log("inside the logic")
                axios({
                    method: "GET",
                    url: sysUrl+"api/users/info",
                    headers: {
                        "Authorization":Cookies.get("token")
                        
                    }
                }).then(res => {


                    const { result, success } = res.data
                  

                    if (success) {
                        const { userName,favicon } = result || [];
                        let users=userName!==null ? userName : 'defaultName' // 预防出现用户名为null 的情况
                        let heads=favicon!==null ?favicon:require('../images/Mask.png')
                        result.favicon=heads
                        props.getUserInfo(users);
                        props.getUserHead(heads);
                        dispatch(reduxUser({cartNum: result.cartCount}));
                        sessionStorage.setItem('username', JSON.stringify(users))
                        sessionStorage.setItem('userAllInfo',JSON.stringify(result))
                        
                        Cookies.set('user-login', JSON.stringify(users), {domain:'pcbonline.com'});
                        Cookies.set('user-favicon', result.favicon, {domain:'pcbonline.com'});
                        Cookies.set('cartCount', result.cartCount, {domain:'pcbonline.com'});
                        props.closeThisBox(false)
                        props.isLoginReady(true)
                        if (props.loginCallBack && typeof props.loginCallBack === 'function') {
                            props.loginCallBack()
                        }
                        // 订阅系统信息
                        // emitter.emit('Emi_IntervalGetMes');
                        Cookies.remove('fromPCBCS')
                        message.info('Login successful',6)
                    }else{
                        message.error('Something error')
                    }

                })
               
           
            
        }
        const {pathname} = window.location;
        if (pathname === '/') {
            setTipsShow(true);
        }
        emitter.addListener('Emi_IntervalGetMes', () => {
            Emi_IntervalGetMes();
        })
        Emi_IntervalGetMes();
        return () => {
            clearInterval(times)
        }
    }, []);

    // 定时获取系统信息
    const Emi_IntervalGetMes = () => {
        if (IsLogin()) {
            times = setInterval(() => {
                getMes();
            }, 5000);
        }
    }
   
  
    // 获取系统消息
    const getMes = () => {
        DescribeCurrUserMsg().then((res: any) => {
            if (res && res.length > 0) {
                const unreadNum = getKeysNumForArr(res, 'isread', 0);
                const unread = res.find((item: any) => item.isread === 0);
                // 提醒过的信息不提醒了
                const flag = Cookies.get("sysMes");
                openNotification()
                if (unread && !flag && flag !== unread.id) {
                    MetaTips.show(document.title);
                    const {content} = unread;
                    MyNotify(unread, <ElMes order={content}/>)
                } else {
                    setTimeout(() => {
                        MetaTips.clear();
                    }, 3000)
                }
                dispatch(reduxUser({message: {unread: unreadNum}}));
            }
        })
    }

    const handleDire = () => {
        history.push('/order');
    }

    useEffect(() => {
        getCartNum();
    }, [props.loginName])

    // 用户信息接口没返回购物车数量， 重复请求
    const getCartNum = async () => {
        const userInfo: any = sessionStorage.getItem("userAllInfo");
        if (props.loginName[0] || userInfo) {
            // const status = 1;
            // const s1: any = await ajaxCarList({status});
            // const s2: any = await ajaxCarListForStencil({status});
            // const s3: any = await ajaxCarListForAssembly({status});
            // const total = s1.total + s2.total + s3.total;
            // setCartNum(total);
            const userInfo: any = sessionStorage.getItem("userAllInfo");
            // dispatch(reduxUser({cartNum:JSON.parse(userInfo).cartCount}))
            if (userInfo) {
                setCartNum(JSON.parse(userInfo).cartCount);
            }
        }
    }

    // 打开购物车
    const handlerCar = () => {
        dispatch(changeCarDrawer(true));
    }

    const handleVisibleChange = (visible: any) => {
        setPopoverVisible(visible);
    }

    const handleClose = (type: any) => {
        props.closeVideo(type);
        if (type !== 1) setTipsShow(false);
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
                        {/*<li className='pcb-menu-one'>*/}
                        {/*    <a href="https://www.pcbonline.com/factory-live/" target="_blank">Factory Live</a>*/}
                        {/*</li>*/}
                        <li className='pcb-menu-two'>
                            <a href="https://www.pcbonline.com/quality-control/" target="_blank">Quality Control</a>
                        </li>
                        <li className='pcb-menu-three'>
                            <a href="https://www.pcbonline.com/about/" target="_blank">About Us</a>
                        </li>
                        <div className="sign-btn">
                            {props.loginName[0] === null
                                ? <span className="pcb-header-login">
                                    <img style={{marginRight: '5px'}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAS5JREFUOBGlkr1KA0EQx3+rUREkatBGBFErKzGI+h5pbMXCVrAVG5/BwtLOzgfwFQKxSWUlEQwiokL8QM04e9zl9nY3RnCa2fl/3dztwT/LxPzSYpw7jpXbTvlzZjk0i7z7+pIPJHObE+07DnfAA9M67zpYcgw2kCYTvPKMMFQQG7qMUjardFy8KLLMJ3OB2eI28IOKPboVBnxxi1FpWPdmg5YPBwFmXV8AznyhzqcRTJ8VKblmjCeauvZySr8wwoJZU9SrYANpMKWyC8dsLWX9Ng2ps+n5ixskN9DhUkVbvjCdHylRNVVuMr64wRv7v5itp8I3R5nZ9l6ACMN603su2edcS7Qp2Qugzopi831MOSxMcsVSBuQBKPHXEmYyaR5gaGfgwN6N/mgDbVHBD89gQaMzdzmfAAAAAElFTkSuQmCC" alt=""/>
                                    {/* <a href='http://sys.pcbonline.com//login?jumpUrl=/blog'>
                                        Login
                                    </a> */}
                                      <div onClick={() => {
                                          if(!Cookies.get('fromPCBV3')){
                                            Cookies.set('fromPCBV3', "yes");
                                          }
                                          window.location.href= 'http://sys.pcbonline.com//login?jumpUrl=/blog'
                                      }} >
                                        Login
                                    </div>
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
                                        <Badge count={user.cartNum} size="small">
                                            {/*<ShoppingCartOutlined />*/}
                                            <img src={require('../images/quate_icon6.png')} alt=""/>
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
                tipsShow && <HeaderTips closeTip={handleClose}/>
            }
        </div>
    )
}

export default Head;