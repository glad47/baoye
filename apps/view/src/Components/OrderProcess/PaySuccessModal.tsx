import React, {useEffect, useState} from 'react';
import {Progress} from "antd";
import '../../styles/pay-success-modal.css'

const PaySuccessModal = () => {
    const [tms, setTms] = useState<number>(0);
    useEffect(() => {
        let df = tms;
        setInterval(() => {
            setTms(df++);
        }, 1000);
    }, []);

    const goCustomerBack = () => {
        window.location.href = 'https://sys.pcbonline.com/payment';
    }
    return (
        <div className="my-modal">
            <div className="mask">
                <div className="content">
                    <div className="header">
                        YOUR ORDER IS UNDER REVIEW
                    </div>
                    <div className="txt">
                        <div>
                            <div className="process-box">
                                <span className="process">50%</span>
                                <Progress percent={50} status="active" strokeColor={'#2952ea'} format={() => (tms + 's')}/>
                            </div>
                            <span className="intro">Please do not close this page until we pass the review. This process will take about 10 minutes (during working time)</span>
                            <button className="btn global-primary" onClick={goCustomerBack}>I will complete the payment in the backend {">"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaySuccessModal;