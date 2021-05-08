import React, {useState} from 'react';
import '../styles/pcb-order-process.css'
import PcbLayout from "../Components/PcbLayout";
import {Button, Collapse, Progress} from "antd";
import CarOrderSummary from "../Components/OrderProcess/ProcessOneForCar/CarOrderSummary";
import ShoppingCarListTable from "../Components/OrderProcess/ProcessOneForCar/ShoppingCarListTable";
import ProcessTwoForAddr from "../Components/OrderProcess/ProcessTwoForAddr";
import ProcessThreeTransport from "../Components/OrderProcess/ProcessThreeTransport";
import ProcessFourConfirmation from "../Components/OrderProcess/ProcessFourConfirmation";
import ProcessFivePayment from "../Components/OrderProcess/ProcessFivePayment";
import PaySuccessModal from "../Components/OrderProcess/PaySuccessModal";
import {useAppState} from "../state";

const { Panel } = Collapse;

const PcbOrderProcess:React.FC<any> = (props:any) => {
    const { orderSummaryStatus } = useAppState();
    const [activeProcess, setActiveProcess] = useState<number>();
    const [paySuccess, setPaySuccess] = useState<boolean>(false);
    const handlerCheckCollapse = (val: number) => {
        setActiveProcess(val);
    }
    return (
        <PcbLayout>
            <div className="pcb-order-process">
                <div className="order-types" id="shit">
                    <strong>{orderSummaryStatus.description}</strong>
                    <Collapse accordion className="order-collapse" activeKey={orderSummaryStatus.process} onChange={handlerCheckCollapse}>
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
                        <Panel header="流程5=>支付" key="5">
                            <ProcessFivePayment />
                            <Button type="primary" onClick={() => {setPaySuccess(true)}}>支付成功测试按钮</Button>
                        </Panel>
                    </Collapse>
                    {/*弹窗*/}
                    {
                        paySuccess ? <PaySuccessModal /> : ''
                    }
                </div>
                <div className="order-detail">
                    <strong>Order Summary</strong>
                    <CarOrderSummary />
                </div>
            </div>
        </PcbLayout>
    )
}

export default PcbOrderProcess;