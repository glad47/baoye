import React from 'react'

const CarList = (props:any) => {
    const num = [1,2,3]
    return (
        <div className="car-list">
            {
                num.map(() => (
                    <div className="car-li">
                        <div className="img-div">
                            <img src={require('../images/FR42greenwhite.png')} alt='shopping cart' />
                        </div>
                        <div className="options">
                            <span className="name">300178F - mux.zip</span>
                            <div className="lift-num">
                                <span className="down">-</span>
                                <span className="num">50</span>
                                <span className="up">+</span>
                            </div>
                            <strong>$3500</strong>
                        </div>
                        <img src={require("../images/close_circle.png")} alt="close" className="close"/>
                    </div>
                ))
            }
            <div className="car-total">
                <span>Estimated Cose</span>
                <strong>$14000</strong>
            </div>
            <div className="car-btns">
                <button>Checkout</button>
                <span>Go to cart</span>
            </div>
        </div>
    )
}

export default CarList;