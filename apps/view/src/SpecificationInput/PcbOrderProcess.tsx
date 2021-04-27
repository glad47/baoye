import React from 'react'
import PcbLayout from "../Components/PcbLayout";
import ProcessHeader from "../Components/OrderProcess/ProcessHeader";
import ProcessOneForCar from "../Components/OrderProcess/ProcessOneForCar";
import {Collapse} from "antd";

const { Panel } = Collapse;

const PcbOrderProcess:React.FC<any> = (props:any) => {
    return (
        <PcbLayout>
            <ProcessHeader />
            <Collapse className="order-collapse" defaultActiveKey={1}>
                <Panel header="流程1=>购物车" key="1">
                    <ProcessOneForCar />
                </Panel>
                <Panel header="流程2=>购物车" key="2">
                </Panel>
            </Collapse>
        </PcbLayout>
    )
}

export default PcbOrderProcess;