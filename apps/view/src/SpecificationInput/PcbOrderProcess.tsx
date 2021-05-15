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
import {setOrderSummaryStatus, useAppState} from "../state";
import {Link} from "react-router-dom";
import {
    CheckOutlined
} from '@ant-design/icons'

const _iconStyle = {
    color: '#1CA159',
    "marginLeft": '10px',
    fontSize: '20px',
}

const icon_CheckOutlined = <CheckOutlined style={_iconStyle} />;

const { Panel } = Collapse;

const PcbOrderProcess:React.FC<any> = (props:any) => {
    const { orderSummaryStatus,orderOptionsItem, dispatch } = useAppState();
    const [paySuccess, setPaySuccess] = useState<boolean>(false);
    const handlerCheckCollapse = (val: number) => {
        dispatch(setOrderSummaryStatus({ process: val }))
    }

    const processExtra = {
        1: '',
        2: (
            <>
                {orderOptionsItem.deliveryAddr?.receiverAddress},
                {orderOptionsItem.deliveryAddr?.receiverCity},
                {orderOptionsItem.deliveryAddr?.receiverCountry},
                {orderOptionsItem.deliveryAddr?.receiverName},
                {orderOptionsItem.deliveryAddr?.lastName},
                {orderOptionsItem.deliveryAddr?.receiverTelephone}
                {icon_CheckOutlined}
            </>
        ),
        3: (
            <>
                {orderOptionsItem.expressInfo}
                {icon_CheckOutlined}
            </>
        ),
        4: 666,
        5: 666,
    }

    return (
        <PcbLayout>
            <div className="pcb-order-process">
                <div className="order-types" id="shit">
                    <strong>{orderSummaryStatus.description}</strong>
                    <Collapse accordion className="order-collapse" activeKey={orderSummaryStatus.process} onChange={handlerCheckCollapse}>

                        <Panel header="Shipping Items" key="1" extra={processExtra[1]}>
                            <ShoppingCarListTable />
                        </Panel>
                        <Panel header="Shipping Address" key="2" extra={orderOptionsItem.deliveryAddr && processExtra[2]}>
                            <ProcessTwoForAddr />
                        </Panel>
                        <Panel header="Shipping Method" key="3" extra={orderOptionsItem.expressInfo && processExtra[3]}>
                            <ProcessThreeTransport />
                        </Panel>
                        <Panel header="Submit Order" key="4">
                            <ProcessFourConfirmation />
                        </Panel>
                        <Panel header="Pay Directly" key="5">
                            <ProcessFivePayment />
                            <Button type="primary" onClick={() => {setPaySuccess(true)}}>支付成功测试按钮</Button>
                            <Link to="/paySuc">
                                <Button type="primary">感谢支付测试按钮</Button>
                            </Link>
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