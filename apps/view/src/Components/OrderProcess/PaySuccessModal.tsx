import React, {useState} from 'react';
import {Progress} from "antd";

const PaySuccessModal = () => {
    return (
        <div className="my-modal">
            <div className="mask">
                <div className="content">
                    <div className="header">
                        YOUR ORDER IS UNDER REVIEW
                    </div>
                    <div className="txt">
                        <div>
                            <Progress percent={50} status="active" strokeColor={'#2952ea'}/>
                            <span className="intro">Please do not close this page until we pass the review. This process will take about 10 minutes (during working time)</span>
                            <button className="btn global-primary">I will complete the payment in the backend ></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaySuccessModal;