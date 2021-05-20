import React from 'react'
import { Dropdown, Checkbox  } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import '../../../styles/car-order-summary.css'

import {setOrderSummaryStatus, useAppState} from "../../../state";
import CarCoupon from "./CarCoupon";

interface ints {
    handleCheckout: any
}

const CarOrderSummary:React.FC<ints> = props => {
    const { dispatch, orderSummaryStatus, orderOptionsItem } = useAppState();
    const { orderSummary } = useAppState();
    const orderNext = () => {
        const {process} = orderSummaryStatus;
        props.handleCheckout(process, parseInt(String(process))+1);
        dispatch(setOrderSummaryStatus({ process: parseInt(String(process))+1 }))
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
                                    <span>${orderSummary.freightCharges}</span>
                                </div>
                            </div>
                            <CarCoupon />
                        </>
                }
                <div className="cost-det total">
                    <div>
                        <span>Total</span>
                        <span>
                        <strong>${orderSummary.total+orderSummary.freightCharges}</strong>
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