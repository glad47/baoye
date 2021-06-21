import React, {useEffect, useImperativeHandle, useState} from 'react'
import '../../../styles/car-order-summary.css'

import {setOrderSummaryStatus, useAppState} from "../../../state";
import CarCoupon from "./CarCoupon";
import FlagProcess from "./FlagProcess";

interface ints {
    handleCheckout: any,
    handleAudit: any,
    cRef: any,
}

const CarOrderSummary:React.FC<ints> = (props) => {
    const { dispatch, orderSummaryStatus, orderOptionsItem } = useAppState();
    const { orderSummary } = useAppState();
    const [flag, setFlag] = useState<boolean>(false);


    useEffect(() => {
        const {process} = orderSummaryStatus;
        if (process === 1 && FlagProcess.CheckItems(orderOptionsItem)) {
            setFlag(true)
        } else if (process === 2 && orderOptionsItem.deliveryAddr) {
            setFlag(true);
        } else if (process === 3 && orderOptionsItem.expressInfo.name) {
            setFlag(true);
        } else if (process === 4) { // 选择支付方式 并且支付方式为先审核
            setFlag(true);
        } else {
            setFlag(false);
        }
    }, [dispatch]);

    const orderNext = () => {
        console.log('下一步噢')
        const {process} = orderSummaryStatus;
        if (process === 4 && orderOptionsItem.payWays === 1) {
            props.handleAudit();
        } else {
            if (flag) {
                props.handleCheckout(process, parseInt(String(process))+1);
                dispatch(setOrderSummaryStatus({ process: parseInt(String(process))+1 }))
            }
        }
    }

    useImperativeHandle(props.cRef, () => ({
        orderNext() {
            orderNext()
        }
    }));

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
                <button className="btn global-primary" onClick={orderNext} disabled={!flag}>
                    CHECKOUT
                </button>
            </div>
        </>
    )
}

export default CarOrderSummary;