import React, {useEffect, useRef, useState} from 'react';
import { withRouter } from 'react-router-dom'
import '../styles/pcb-order-process.css'
import '../styles/file-init.css'
import PcbLayout from "../Components/PcbLayout";
import {Collapse} from "antd";
import CarOrderSummary from "../Components/OrderProcess/ProcessOneForCar/CarOrderSummary";
import ShoppingCarListTable from "../Components/OrderProcess/ProcessOneForCar/ShoppingCarListTable";
import ProcessTwoForAddr from "../Components/OrderProcess/ProcessTwoForAddr";
import ProcessThreeTransport from "../Components/OrderProcess/ProcessThreeTransport";
import ProcessFourConfirmation from "../Components/OrderProcess/ProcessFourConfirmation";
import ProcessFivePayment from "../Components/OrderProcess/ProcessFivePayment";
import PaySuccessModal from "../Components/OrderProcess/PaySuccessModal";
import {setOrderSummaryStatus, useAppState} from "../state";
import {
    CheckOutlined
} from '@ant-design/icons'
import {DescribeCurrUserMsg, SendAuditMsg} from "./AjaxService";

const _iconStyle = {
    color: '#1CA159',
    "marginLeft": '10px',
    fontSize: '20px',
}

const _Match_payWats: any = {1: 'PCBONLINE Review', 2: 'Customer review'};

const icon_CheckOutlined = <CheckOutlined style={_iconStyle} />;

const { Panel } = Collapse;

const PcbOrderProcess:React.FC = (props:any) => {
    const { orderSummaryStatus,orderOptionsItem, dispatch } = useAppState();
    const [paySuccess, setPaySuccess] = useState<boolean>(false);
    const [alrIndex, setAlrIndex] = useState<any>([]); // 已经checkout过的流程，避免用户直接跳过某个流程
    const summaryRef = useRef(null);
    let msgInterval: NodeJS.Timeout;
    const handlerCheckCollapse = (val: number) => {
        if (alrIndex.indexOf(Number(val)) > -1) { // 不能跳过没有选过的流程
            dispatch(setOrderSummaryStatus({ process: val }));
        }
    }

    // 选中
    const handleCheckout = (index1: number, index2: number) => {
        const def: any = [...alrIndex];
        if (alrIndex.indexOf(index1) === -1) {
            def.push(Number(index1));
        }
        if (alrIndex.indexOf(index2) === -1) {
            def.push(Number(index2));
        }
        setAlrIndex([...def]);
    }

    useEffect(() => {
        return () => {
            clearInterval(msgInterval);
        }
    }, []);

    // 发送通知审核信息
    const handleAudit = () => {
        const {ordersItem} = orderOptionsItem;
        let productNos = ordersItem.reduce((pre: any, cur) => {
            const {record}: any = cur;
            pre.push(record.productNo);
            return pre;
        }, [])
        productNos = productNos.join(',')
        const fromData = new FormData();
        fromData.append("productNos", productNos);
        SendAuditMsg(fromData).then((res: any) => {
            if (res) {
                setPaySuccess(true);
            }
        });
        msgInterval = setInterval(async() => {
            await GetMsgStatus();
        }, 3000);
    }


    // 获取通知审核信息
    const GetMsgStatus = async () => {
        const res:any = await DescribeCurrUserMsg();
        const {list} = res;
        if (list) {
            const isRea = list.find((item: any) => item.isread === 0);
            if (isRea) {
                // @ts-ignore
                summaryRef.current?.orderNext();
            }
        }
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
                shipment:
                {orderOptionsItem.expressInfo?.name}
                {icon_CheckOutlined}
            </>
        ),
        4: (
            <>
                {_Match_payWats[orderOptionsItem.payWays]}
                {icon_CheckOutlined}
            </>
        ),
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
                        <Panel header="Shipping Method" key="3" extra={orderOptionsItem.expressInfo.name && processExtra[3]}>
                            {
                                orderSummaryStatus.process === 3 && <ProcessThreeTransport />
                            }
                        </Panel>
                        <Panel header="Submit Order" key="4" extra={orderOptionsItem.payWays && processExtra[4]}>
                            <ProcessFourConfirmation />
                        </Panel>
                        <Panel header="Pay Directly" key="5">
                            {
                                orderSummaryStatus.process === 5 && <ProcessFivePayment />
                            }
                            {/*<Button type="primary" onClick={() => {setPaySuccess(true)}}>支付成功测试按钮</Button>*/}
                            {/*<Link to="/paySuc">*/}
                            {/*    <Button type="primary">感谢支付测试按钮</Button>*/}
                            {/*</Link>*/}
                        </Panel>
                    </Collapse>
                    {/*弹窗*/}
                    {
                        paySuccess ? <PaySuccessModal /> : ''
                    }
                </div>
                <div className="order-detail">
                    <strong>Order Summary</strong>
                    <CarOrderSummary
                        cRef={summaryRef}
                        handleAudit={handleAudit}
                        handleCheckout={handleCheckout}/>
                </div>
            </div>
        </PcbLayout>
    )
}

export default withRouter(PcbOrderProcess);