/*
 * @Descripttion: 支付流程页面
 * @version: 1.1
 * @Author: Parker
 * @Date: 2021-08-15 17:15:00
 * @LastEditors: ho huang
 * @LastEditTime: 2021-09-03 23:37:05
 */


import React, {useEffect, useRef, useState} from 'react';
import { withRouter } from 'react-router-dom'
import '../styles/pcb-order-process.css'
import '../styles/file-init.css'
import PcbLayout from "../Components/PcbLayout";
import {Collapse, message} from "antd";
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


const _Match_payWats: any = {1: 'PCBONLINE Review', 2: 'Customer review'};  //提交订单的方式， 1、由PCBONLINE审核，2、客户自己审核

const icon_CheckOutlined = <CheckOutlined style={_iconStyle} />;  //手拉琴右上角打勾符号

const { Panel } = Collapse;  //定义手拉琴面板

const PcbOrderProcess:React.FC = (props:any) => {
    const { orderSummaryStatus,orderOptionsItem, dispatch } = useAppState();
    const [paySuccess, setPaySuccess] = useState<boolean>(false);  //是否支付成功
    const [alrIndex, setAlrIndex] = useState<any>([]); // 已经checkout过的流程，避免用户直接跳过某个流程
    const summaryRef = useRef(null); 
    let msgInterval: NodeJS.Timeout;
    const handlerCheckCollapse = (val: string | string[]) => {
        if (alrIndex.indexOf(Number(val)) > -1) { // 不能跳过没有选过的流程
            dispatch(setOrderSummaryStatus({ process: val }));
            // console.log('process', val)
        }
    }

    /**手拉琴面板选中状态*/
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

    /**页面刷新时候提醒*/
    useEffect(() => {
        window.onbeforeunload = function(){
            return "必您确定要退出页面吗？";
        }
        return () => {
            clearInterval(msgInterval);
        }
    }, []);

    /**发送通知审核信息*/
    const handleAudit = () => {
        const {ordersItem} = orderOptionsItem;
        const productNos: any = [];
        const orderDetailsList = ordersItem.reduce((pre: any, cur) => {
            const {record}: any = cur;
            const {totalStencilFee, totalAssemblyFee, id, productNo} = record;
            productNos.push(productNo);
            pre.push({
                id,
                productNo,
                type: totalStencilFee ? 2 : (totalAssemblyFee ? 3 : 1),
            });
            return pre;
        }, []);
        const params = {
            orderDetailsList,
            remark: orderOptionsItem.remark
        }
        SendAuditMsg(params).then((res: any) => {
            if (res) {
                setPaySuccess(true);
            }
        });
        msgInterval = setInterval(async() => {
            await GetMsgStatus(productNos);
        }, 3000);
    }


    /**获取通知审核信息*/
    const GetMsgStatus = async (productNos: String) => {
        const res:any = await DescribeCurrUserMsg();
        if (res.length > 0) {
            const isReaArr = res.filter((item: any) => item.isread === 0 && productNos.indexOf(item.content) > -1);
            if (isReaArr.length > 0) {
                clearInterval(msgInterval);
                setPaySuccess(false);
                // @ts-ignore
                summaryRef.current?.orderNext('force');
            }
        } else {
            console.error('接口错误， 请联系后端解决！');
        }
    }

    /**手拉琴面板右上角信息*/

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
                    {/*<strong>&nbsp;</strong>*/}
                    <Collapse accordion className="order-collapse" activeKey={orderSummaryStatus.process} onChange={handlerCheckCollapse}>

                        <Panel header="My Shopping Cart" key="1" extra={processExtra[1]}>
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
                        </Panel>
                    </Collapse>
                    {
                        paySuccess ? <PaySuccessModal /> : ''
                    }
                </div>
                <div className="order-detail">
                    {/*<strong>&nbsp;</strong>*/}
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