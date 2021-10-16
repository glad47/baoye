import React from "react";

const ElMes = (props: {order?: any}) => {
    const {order} = props;

    const handleDire = () => {
        window.location.href  = '/order'
    }
    return <>
        Your order
        <span>{order}</span>
        has been approved,
        <span onClick={handleDire} className="underline" style={{color: 'blue'}}>
                 Go to the payment
         </span>
    </>
}

export default ElMes