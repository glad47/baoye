import React, {useRef} from 'react';
import {PayPalButton} from "react-paypal-button-v2";

const PayPaypal = () => {
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
                            clientId: "Ab5enUR6ZAsRH6SUSaLM1-wECeRamMD7m18PU_Jk78Tlrurh3HV3qVYfyPnhZXM7SPuLu9386nAx5Vr2",
                        }}
                        createOrder={(data: any, actions: any) => {
                            return actions.order.create({
                                purchase_units: [{
                                    amount: {
                                        currency_code: "USD",
                                        value: 1,
                                        custom_id: 202105180014
                                    }
                                }],
                                custom: 202105180014
                            })
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