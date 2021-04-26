import React from 'react'
import PcbLayout from "../Components/PcbLayout";
import ProcessHeader from "../Components/OrderProcess/ProcessHeader";
import ShoppingCarListTable from "../Components/OrderProcess/ShoppingCarListTable";

const PcbOrderProcess:React.FC<any> = (props:any) => {
    return (
        <PcbLayout>
            <ProcessHeader />
            <div className="order-types">
                <ShoppingCarListTable />
            </div>
            <div className="order-detail"></div>
        </PcbLayout>
    )
}

export default PcbOrderProcess;