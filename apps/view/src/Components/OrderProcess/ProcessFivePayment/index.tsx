import React, {useState} from 'react';
import '../../../styles/process-five-payment.css'
import {Radio, Space} from "antd";
import PayDebitCard from "./PayDebitCard";
import PayPaypal from "./PayPaypal";

const ProcessFivePayment = () => {
    const [payType, setPayType] = useState<number>(0);

    // 选择支付类型
    const handlerCheckPayType = (type: number) => {
        setPayType(type);
    }
    return (
        <div className="process-five">
            <div className="header">
                <Space>
                    <span>All transactions are secured and encrypted</span>
                    <img src={require('../../../images/safe_icon14.png')} alt=""/>
                </Space>
            </div>
            <div className="pays-box one">
                <div className="box-li">
                    <div className="header">
                        <div className="radio">
                            <Radio
                                checked={payType === 0}
                                onChange={() => {handlerCheckPayType(0)}}>
                                Credit / Debit Card
                            </Radio>
                        </div>
                        <div className="rig-imgs">
                            <img src={require('../../../images/pay-atps.png')} alt=""/>
                        </div>
                    </div>
                    {
                        payType === 0 ? <PayDebitCard /> : ''
                    }
                </div>
            </div>
            <div className="pays-box">
                <div className="box-li">
                    <div className="header">
                        <div className="radio">
                            <Radio
                                checked={payType === 1}
                                onChange={() => {handlerCheckPayType(1)}}>
                                <img src={require('../../../images/paypal.png')} alt=""/>
                            </Radio>
                        </div>
                    </div>
                    {
                        payType === 1 ? <PayPaypal /> : ''
                    }
                </div>
            </div>
        </div>
    )
}

export default ProcessFivePayment;