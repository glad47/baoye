import React from 'react';
import CarOrderSummary from "./CarOrderSummary";
import ShoppingCarListTable from "./ShoppingCarListTable";

const ProcessOneForCar = () => {
    return (
        <div className="pcb-order-process">
            <div className="order-types">
                <ShoppingCarListTable />
            </div>
            <div className="order-detail">
                <CarOrderSummary />
            </div>
        </div>
    )
}

export default ProcessOneForCar;