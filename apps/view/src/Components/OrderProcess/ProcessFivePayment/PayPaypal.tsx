import React from 'react';

const PayPaypal = () => {
    return (
        <div className="box-content">
            <div className="pp">
                <img src={require('../../../images/box_window.png')} alt=""/>
                <span>
                    After Clicking " CHECKOUT WITH PAYPAL", you will be redirected to Paypal to complete your purchase securely.
                </span>
                <span className="paypal-btn">
                    <img src={require('../../../images/paypal_small.png')} alt=""/>
                    CHECKOUT WITH PAYPAL
                </span>
            </div>
        </div>
    )
}

export default PayPaypal;