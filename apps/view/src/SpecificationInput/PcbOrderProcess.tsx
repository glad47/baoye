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
import {Collapse} from "antd";
import CarOrderSummary from "../Components/OrderProcess/ProcessOneForCar/CarOrderSummary";
import ShoppingCarListTable from "../Components/OrderProcess/ProcessOneForCar/ShoppingCarListTable";
import ProcessTwoForAddr from "../Components/OrderProcess/ProcessTwoForAddr";
import ProcessThreeTransport from "../Components/OrderProcess/ProcessThreeTransport";
import ProcessFourConfirmation from "../Components/OrderProcess/ProcessFourConfirmation";
import ProcessFivePayment from "../Components/OrderProcess/ProcessFivePayment";
import PaySuccessModal from "../Components/OrderProcess/PaySuccessModal";
import {orderSummaryFun, reduxSetCartProcessHasCheck, reduxUser, setOrderSummaryStatus, useAppState} from "../state";
import {
    CheckOutlined
} from '@ant-design/icons'
import {DescribeCurrUserMsg, DescribeOrderItemByIds, SendAuditMsg} from "./AjaxService";
import {getKeysNumForArr, MyNotify} from "../util";
import * as Cookies from "js-cookie";
import ElMes from "../Components/ElMes";

const _iconStyle = {
    color: '#1CA159',
    "marginLeft": '10px',
    fontSize: '20px',
}


const _Match_payWats: any = {1: 'PCBONLINE Review', 2: 'Customer review'};  //提交订单的方式， 1、由PCBONLINE审核，2、客户自己审核

const icon_CheckOutlined = <CheckOutlined style={_iconStyle} />;  //手拉琴右上角打勾符号

const { Panel } = Collapse;  //定义手拉琴面板

const PcbOrderProcess:React.FC = (props:any) => {
    const { orderSummaryStatus,orderOptionsItem, dispatch, cartProcessAlChecked } = useAppState();
    const [paySuccess, setPaySuccess] = useState<boolean>(false);  //是否支付成功
    const [alrIndex, setAlrIndex] = useState<any>([]); // 已经checkout过的流程，避免用户直接跳过某个流程
    const summaryRef = useRef(null); 
    let msgInterval: NodeJS.Timeout;
    const handlerCheckCollapse = (val: string | string[]) => {
        if (cartProcessAlChecked.indexOf(Number(val)) > -1) { // 不能跳过没有选过的流程
            dispatch(setOrderSummaryStatus({ process: val }));
            // console.log('process', val)
        }
    }

    /**手拉琴面板选中状态*/
    const handleCheckout = (index1: number, index2: number) => {
        const def: any = [...cartProcessAlChecked];
        if (cartProcessAlChecked.indexOf(index1) === -1) {
            def.push(Number(index1));
        }
        if (cartProcessAlChecked.indexOf(index2) === -1) {
            def.push(Number(index2));
        }
        dispatch(reduxSetCartProcessHasCheck([...def]))
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
            await GetMsgStatus(productNos.toString());
        }, 3000);
    }


    /**
     * 判断订单类型获取订单最新价格。
     * 必须区分订单类型，接口是这么写的。
     * 后端就不做表关联查询，谁也没办法
     * @constructor
     */
    const GetOrderIdsClassify = () => {
        const {ordersItem} = orderOptionsItem;
        const dat: any = {
            pcbIds: [],
            stencilIds: [],
            assemblyIds: []
        }
        ordersItem.forEach((item: any) => {
            const {totalStencilFee, totalAssemblyFee, id} = item.record;
            // 区分订单类型，为什么这么多if，问后端去吧。
            if (totalStencilFee) {
                dat.stencilIds.push(id)
            } else if (totalAssemblyFee) {
                dat.assemblyIds.push(id)
            } else {
                dat.pcbIds.push(id)
            }
        })
        return dat;
    }


    /**
     * 重新计算总价
     * 后端没做关联查询，数据没在同一对象，前端判断。别踩坑，类型判断错误代码全乱
     * @param data
     * @constructor
     */
    const SetDispatchNewOrders = (data: any) => {
        // quoteList: [], smlStencilList: [] | null, assemblyList: [] | null
        // 重新计算订单总价和
        const {ordersItem} = orderOptionsItem;
        const {quoteList, smlStencilList, assemblyList} = data;
        let total = 0;
        ordersItem.forEach((item: any) => {
            let find;
            const {totalStencilFee, totalAssemblyFee, id} = item.record;
            // 区分订单类型，为什么这么多if，问后端去吧。
            if (totalStencilFee) {
                find = smlStencilList.find((item: any) => item.id === id)
            } else if (totalAssemblyFee) {
                find = assemblyList.find((item: any) => item.id === id)
            } else {
                find = quoteList.find((item: any) => item.id === id)
            }
            if (find) {
                const {subtotal} = find
                item.subtotal = subtotal || 0
            }
            total += item.subtotal
        })
        dispatch(orderSummaryFun({ total: total}));
    }


    /**获取通知审核信息*/
    const GetMsgStatus = async (productNos: String) => {
        const res:any = await DescribeCurrUserMsg();
        if (res && res.length > 0) {
            const unreadNum = getKeysNumForArr(res, 'isread', 0);
            const unread = res.filter((item: any) => item.isread === 0);
            // Cookies.set("sysMes", id);
            // 提醒过的信息不提醒了
            const flag = Cookies.get("sysMes");
        // && !flag && flag !== unread.id || typeof flag === 'undefined'
            if (unread.length > 0) {
                const fg = unread.find((itm: {content: any}) => itm.content === productNos)
                if (fg) {
                    if (!flag || flag === 'undefined' || flag !== fg.id) {
                        clearInterval(msgInterval);
                        setPaySuccess(false);
                        // @ts-ignore
                        summaryRef.current?.orderNext('force');
                        MyNotify(fg, <ElMes order={productNos}/>)
                        Cookies.set("sysMes", fg.id);
                        // 审核成功，获取最新的价格信息
                        const priceRes = await DescribeOrderItemByIds(GetOrderIdsClassify())
                        SetDispatchNewOrders(priceRes)
                    }
                }
            }
            dispatch(reduxUser({message: {unread: unreadNum}}));
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