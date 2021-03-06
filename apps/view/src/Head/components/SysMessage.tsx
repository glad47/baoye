import React, {useEffect, useState} from 'react'
import { CaretRightOutlined } from '@ant-design/icons'
import {notification, Space} from "antd";
import {DeleteCurrUseMsg, DescribeCurrUserMsg} from "../../SpecificationInput/AjaxService";
import {reduxUser, useAppState} from "../../state";
import {getKeysNumForArr} from "../../util";
import {useHistory} from "react-router-dom";
import * as Cookies from "js-cookie";

const notify_icon = require('../../images/quate_icon24.png');
const check_icon = require('../../images/quate_icon25.png');
const close_icon = require('../../images/close_circle.png')

export default () => {
    const { dispatch, user } = useAppState();
    const history = useHistory();
    const [mesList, setMesList] = useState([]);
    const [currentClose, setCurrentClose] = useState<number>(-1);

    const EL_MES = (content: any) => {
        return <>
            Your order
            <span>&nbsp;{content}&nbsp;</span>
            has been approved,
             <span onClick={handleDire} className="underline" style={{color: 'blue'}}>
                 Go to the payment
             </span>
        </>
    }

    // 获取系统消息
    const getMes = () => {
        DescribeCurrUserMsg().then((res: any) => {
            if (res && res.length > 0) {
                setMesList(res.splice(0, 9));
                const unreadNum = getKeysNumForArr(res, 'isread', 0);
                dispatch(reduxUser({message: {unread: unreadNum}}));
            }
        })
    }

    const goMessageList = () => {
        window.location.href = '/allMessages';
    }

    const handleDire = () => {
        window.location.href = 'https://sys.pcbonline.com/payment';
    }

    const handleDeleteMes = (index: number) => {
        const {id} = mesList[index];
        DeleteCurrUseMsg(id).then(res => {
            const def = [...mesList];
            def.splice(index, 1);
            setMesList([...def]);
        });
    }

    useEffect(() => {
        // 定时获取系统信息
        getMes();
    }, []);

    return (
        <div className="sys-message">
            <div className="mes-header">
                MESSAGE
            </div>
            <div className="mes-box">
                {
                    mesList.length > 0 ?
                    mesList.map((item: any, index) => (
                        <div className="mes-li"
                             key={index}
                             onMouseEnter={() => setCurrentClose(index)}
                             onMouseLeave={() => setCurrentClose(-1)}
                        >
                            <div className="lef-icon">
                                <img src={notify_icon} alt=""/>
                            </div>
                            <div className="rig-info">
                                <div className="info-header">
                                    <span className="title">{item.sendUser}</span>
                                    <img src={check_icon} alt=""/>
                                    <span className="time">{item.gmtCreate}</span>
                                </div>
                                <div className="info-content">
                                    {EL_MES(item.content)}
                                </div>
                            </div>
                            {
                                currentClose === index && <img src={close_icon} className="close-mes" alt="" onClick={() => handleDeleteMes(index)}/>
                            }
                        </div>
                    ))
                        : 'No Messages'
                }
            </div>
            {/*<div className="mes-foot" onClick={goMessageList}>*/}
            {/*    <Space>*/}
            {/*        VIEW ALL MESSAGES*/}
            {/*        <CaretRightOutlined />*/}
            {/*    </Space>*/}
            {/*</div>*/}
        </div>
    )
}