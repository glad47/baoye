import React from 'react'

const CarOrderSummary = () => {
    return (
        <>
            <div className="summary-box">
                <div className="cost-det">
                    <div>
                        <span>Subtotal（4 Items）</span>
                        <span>$271.24</span>
                    </div>
                    <div>
                        <span>Freight Charges</span>
                        <span>$56.3</span>
                    </div>
                </div>
                <div className="cost-det total">
                    <div>
                        <span>Total</span>
                        <span>
                        <strong>$14038</strong>
                    </span>
                    </div>
                </div>
            </div>
            <div className="summary-tips">
                You can download the proforma invoice and apply coupons at the checkout
            </div>
            <div className="summary-btn">
                <button className="btn global-primary">CHECKOUT</button>
            </div>
        </>
    )
}

export default CarOrderSummary;