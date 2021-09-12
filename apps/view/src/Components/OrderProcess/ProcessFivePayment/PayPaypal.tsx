import React, {useRef} from 'react';
import {PayPalButton} from "react-paypal-button-v2";

interface props {
    callBackSuccess: any,
    options: any,
}

const PayPaypal = (props: props) => {
    const {options} = props;
    return (
        <div className="box-content">
            <div className="pp">
                <img src={require('../../../images/box_window.png')} alt=""/>
                <span>
                    After Clicking " CHECKOUT WITH PAYPAL", you will be redirected to Paypal to complete your purchase securely.
                </span>
                <span className="paypal-btn">
                    <PayPalButton
                        shippingPreference="NO_SHIPPING"
                        options={{
                            // clientId: "Ab5enUR6ZAsRH6SUSaLM1-wECeRamMD7m18PU_Jk78Tlrurh3HV3qVYfyPnhZXM7SPuLu9386nAx5Vr2",
                            clientId: "AQP008uQy-suleFOxpEUTfvjSUHJ9C5BKSyswNL-K554eMqDsvhl_Vjbx1vFJgZOpKhvj82eex8OWoz3",
                        }}
                        createOrder={(data: any, actions: any) => {
                            return actions.order.create({
                                purchase_units: [{
                                    amount: {
                                        currency_code: "USD",
                                        value: options.amountValue,
                                        custom_id: options.amountValueCustomId
                                    }
                                }],
                                custom: options.amountValueCustomId
                            })
                        }}
                        onApprove={(actions: any, data: any) => {
                            return actions.order.capture().then(function (details: any) {
                                props.callBackSuccess(data);
                                console.log('data', details)
                                // return _self.createOrderDetail(data.orderID)
                            })
                        }}
                        onSuccess={(actions: any, data: any) => {
                            props.callBackSuccess(data);
                            console.log('data', data)
                        }}
                        style={{
                            layout: 'horizontal',
                            size: 'small',
                            currency: "USD",
                            tagline: false,
                            shape: 'pill',
                            label: 'checkout',
                        }}
                    />
                    {/*<img src={require('../../../images/paypal_small.png')} alt="" onClick={estRef}/>*/}
                    {/*CHECKOUT WITH PAYPAL*/}
                </span>
            </div>
        </div>
    )
}

export default PayPaypal;