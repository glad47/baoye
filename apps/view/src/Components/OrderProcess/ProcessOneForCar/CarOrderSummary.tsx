import React from 'react'
import {Dropdown, Checkbox, message} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import '../../../styles/car-order-summary.css'

import {setOrderSummaryStatus, useAppState} from "../../../state";
import CarCoupon from "./CarCoupon";
import FlagProcess from "./FlagProcess";

interface ints {
    handleCheckout: any,
    handleAudit: any
}

const CarOrderSummary:React.FC<ints> = props => {
    const { dispatch, orderSummaryStatus, orderOptionsItem } = useAppState();
    const { orderSummary } = useAppState();
    const orderNext = () => {
        const {process} = orderSummaryStatus;
        let flag: boolean = false;
        console.log(orderOptionsItem.expressInfo)
        if (process === 1) {
            flag = FlagProcess.CheckItems(orderOptionsItem);
        } else if (process === 3 && !orderOptionsItem.expressInfo) {
            message.error('Please Check Shipping method!')
            flag = false;
        } else if (process === 4 && orderOptionsItem.payWays === 1) { // 选择支付方式 并且支付方式为先审核
            flag = false;
            props.handleAudit();
        } else {
            flag = true;
        }
        if (flag) {
            props.handleCheckout(process, parseInt(String(process))+1);
            dispatch(setOrderSummaryStatus({ process: parseInt(String(process))+1 }))
        }
    }

    return (
        <>
            <div className="summary-box">
                <div className="cost-det">
                    <div>
                        <span>Subtotal（{orderOptionsItem.ordersItem.length} Items）</span>
                        <span>${orderSummary.total}</span>
                    </div>
                    <div>
                        <span>Freight Charges</span>
                        <span>${orderSummary.freightCharges}</span>
                    </div>
                </div>
                {
                    orderSummaryStatus.process > 3 &&
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
                        <strong>${(orderSummary.total+orderSummary.freightCharges+orderSummary.handlingCharge-orderSummary.coupon.value).toFixed(3)}</strong>
                    </span>
                    </div>
                </div>
            </div>
            <div className="summary-tips">
                You can download the proforma invoice and apply coupons at the checkout
            </div>
            <div className="summary-btn">
                <button className="btn global-primary" onClick={orderNext}>CHECKOUT</button>
            </div>
        </>
    )
}

export default CarOrderSummary;