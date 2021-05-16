import React, {useEffect, useState} from 'react';
import '../../../styles/process-four-confirmation.css'
import {Radio, Space} from "antd";
import {orderOptions, useAppState} from "../../../state";

const typesStr = ['PCBONLINE Review', 'Customer review'];

const ProcessFourConfirmation = () => {
    const { dispatch } = useAppState();
    const [ways, setWays] = useState<number>(0);
    const handlerCheckWays = (type: number) => {
        setWays(type);
    }
    useEffect(() => {
        dispatch(orderOptions({payWays: typesStr[ways]}));
    }, [ways]);
    const waysData = [
        {
            title: 'Review Before Payment (recommended)',
            content: (
                <>
                    <p>
                        We suggest you pay after your file is reviewed. File review is completed in 10 mins on working days [Mon-Sat 9 am to 6 pm (GMT+8)].
                    </p>
                    <p>
                        In this way, we can avoid the additional bank charges caused by parameter errors, and what's more, you can enjoy the DFM advice from our engineers.
                    </p>
                </>
            ),
            img: require('../../../images/pay_ways1.png')
        },
        {
            title: 'Pay Directly ',
            content: (
                <>
                    <p>
                        Unless you have checked the specifications and are responsible for the correctness of the parameters, you can pay before we review the data.
                    </p>
                    <p>
                        Direct payment is more efficient. If verification of the file is not approved for production, you'll get a refund within 7 days.
                    </p>
                </>
            ),
            img: require('../../../images/pay_ways2.png')
        }
    ]
    return (
        <div className="process-four">
            <div className="pay-ways">
                {
                    waysData.map((item, index) => (
                        <div className="ways-li" key={item.title}>
                            <div className="ways-header">
                                <Radio
                                    checked={ways === index}
                                    onChange={() => handlerCheckWays(index)}>
                                    {item.title}
                                </Radio>
                            </div>
                            <div className="ways-content">
                                <div className="c-txt">
                                    {item.content}
                                </div>
                                <img src={item.img} alt=""/>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="tra-tips">
                <Space>
                    <span>
                        <img src={require("../../../images/quate_voice.png")} alt=""/>
                       You will be notified by mail when there is a any update with your order.
                    </span>
                </Space>
            </div>
            {/*<div className="btn-continue">*/}
            {/*    <button className="btn global-primary">*/}
            {/*        CONTINUE*/}
            {/*    </button>*/}
            {/*</div>*/}
        </div>
    )
}

export default ProcessFourConfirmation;