/*
 * @Descripttion: 支付流程右侧面板
 * @version: 1.0
 * @Author: Parker
 * @Date: 2021-07-23 21:21:09
 * @LastEditors: aziz
 * @LastEditTime: 2022-03-23 18:16:53
 */
import React, {useEffect, useImperativeHandle, useState} from 'react'
import '../../../styles/car-order-summary.css'

import {setOrderSummaryStatus, useAppState} from "../../../state";
import CarCoupon from "./CarCoupon";
import FlagProcess from "./FlagProcess";
import {MyNotify} from "../../../util";

interface ints {
    handleCheckout: any,
    handleAudit: any,
    cRef: any,
}


const CarOrderSummary:React.FC<ints> = (props) => {
    const { dispatch, orderSummaryStatus, orderOptionsItem, isCheckCourierAccount } = useAppState();
    const { orderSummary } = useAppState();
    const [flag, setFlag] = useState<boolean>(false);  //订单勾选


    /**
     * 判断客户选择自己的账号有没有输入账号
     */
    const flagCourier = () => {
        const {deliveryAddr} = orderOptionsItem;
        return !(isCheckCourierAccount && !deliveryAddr.courierAccount);
    }

    useEffect(() => {
        let {process} = orderSummaryStatus;  
        process = Number(process);
        // console.log('flagCourier()', flagCourier())
        if (process === 1 && FlagProcess.CheckItems(orderOptionsItem)) {
            setFlag(true)
        } else if (process === 2 && orderOptionsItem.deliveryAddr) {
            setFlag(true);
        } else if (process === 3 && orderOptionsItem.expressInfo.name && flagCourier()) {
            setFlag(true);
        } else if (process === 4) { // 选择支付方式 并且支付方式为先审核
            setFlag(true);
        } else {
            setFlag(false);
        }
    }, [dispatch]);

    const orderNext = (type: any) => {
        const {process} = orderSummaryStatus;
        if (process === 4 && orderOptionsItem.payWays === 1 && type !== 'force') {
            props.handleAudit();
        } else {
            if(flag || type === 'force') {
                props.handleCheckout(process, parseInt(String(process))+1);
                dispatch(setOrderSummaryStatus({ process: parseInt(String(process))+1 }))
            }
        }
    }

    const canNext = () => {

    }

    useImperativeHandle(props.cRef, () => ({
        orderNext(v: any) {
            orderNext(v)
        }
    }));

    return (
        <>
            <div className="summary-box">
                <strong className="ttt">Order Summary</strong>
                <div className="cost-det">
                    <div>
                        <span>Subtotal（{orderOptionsItem.ordersItem.length} Items）</span>
                        <span>${orderSummary.total.toFixed(2)}</span>
                    </div>
                    <div>
                        <span>Freight Charges</span>
                        <span>${orderSummary.freightCharges}</span>
                    </div>
                </div>
                {
                    orderSummaryStatus.process > 3 &&
                        orderOptionsItem.payWays === 3 &&
                        <>
                            <div className="cost-det">
                                <div>
                                    <span>Handling Charge<br />(PayPal)</span>
                                    <span>${orderSummary.handlingCharge}</span>
                                </div>
                            </div>
                            <CarCoupon />
                        </>
                }
                <div className="cost-det total">
                    <div>
                        <span>Total</span>
                        <span>
                        <strong style={{fontSize: '20px', fontFamily: '"Arial-BoldMT\\,Arial"'}}>
                            ${(orderSummary.total+orderSummary.freightCharges+orderSummary.handlingCharge-orderSummary.coupon.value).toFixed(3)}
                        </strong>
                    </span>
                    </div>
                </div>
            </div>
            {
                orderSummaryStatus.process !== 5 &&
                <div className="summary-tips">
                    You can download the proforma invoice and apply coupons at the checkout
                </div>
            }
            <div className="summary-btn">
                {
                    orderSummaryStatus.process !== 5 &&
                    <button className="btn global-primary" onClick={orderNext} disabled={!flag}>
                        {
                            orderSummaryStatus.process > 3 ? 'Check Out' : 'Continue to Payment'
                        }
                    </button>
                }
            </div>
        </>
    )
}

export default CarOrderSummary;