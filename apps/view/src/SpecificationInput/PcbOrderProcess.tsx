import React from 'react'
import PcbLayout from "../Components/PcbLayout";
import ProcessHeader from "../Components/OrderProcess/ProcessHeader";
import {Collapse} from "antd";
import CarOrderSummary from "../Components/OrderProcess/ProcessOneForCar/CarOrderSummary";
import ShoppingCarListTable from "../Components/OrderProcess/ProcessOneForCar/ShoppingCarListTable";
import ProcessTwoForAddr from "../Components/OrderProcess/ProcessTwoForAddr";
import ProcessThreeTransport from "../Components/OrderProcess/ProcessThreeTransport";
import ProcessFourConfirmation from "../Components/OrderProcess/ProcessFourConfirmation";

const { Panel } = Collapse;

const PcbOrderProcess:React.FC<any> = (props:any) => {
    return (
        <PcbLayout>
            <ProcessHeader />
            <div className="pcb-order-process">
                <div className="order-types">
                    <Collapse accordion className="order-collapse" defaultActiveKey={4}>
                        <Panel header="流程1=>购物车" key="1">
                            <ShoppingCarListTable />
                        </Panel>
                        <Panel header="流程2=>收获地址" key="2">
                            <ProcessTwoForAddr />
                        </Panel>
                        <Panel header="流程3=>运输方式" key="3">
                            <ProcessThreeTransport />
                        </Panel>
                        <Panel header="流程4=>订单确认" key="4">
                            <ProcessFourConfirmation />
                        </Panel>
                    </Collapse>
                </div>
                <div className="order-detail">
                    <CarOrderSummary />
                </div>
            </div>
        </PcbLayout>
    )
}

export default PcbOrderProcess;