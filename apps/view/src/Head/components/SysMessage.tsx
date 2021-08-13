import React, {useEffect, useState} from 'react'
import { CaretRightOutlined } from '@ant-design/icons'
import {Space} from "antd";
import {DescribeCurrUserMsg} from "../../SpecificationInput/AjaxService";
import {reduxUser, useAppState} from "../../state";
import {getKeysNumForArr} from "../../util";

const notify_icon = require('../../images/quate_icon24.png');
const check_icon = require('../../images/quate_icon25.png');

export default () => {
    const { dispatch, user } = useAppState();
    const [mesList, setMesList] = useState([]);

    // 获取系统消息
    const getMes = () => {
        DescribeCurrUserMsg().then((res: any) => {
            if (res && res.length > 0) {
                setMesList(res);
                const unreadNum = getKeysNumForArr(res, 'isread', 0);
                dispatch(reduxUser({message: {unread: unreadNum}}));
            }
        })
    }

    const goMessageList = () => {
        window.location.href = '/allMessages';
    }

    useEffect(() => {
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
                        <div className="mes-li" key={index}>
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
                                    {item.content}
                                </div>
                            </div>
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