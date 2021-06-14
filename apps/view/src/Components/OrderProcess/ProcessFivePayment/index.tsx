import React, {useEffect, useState} from 'react';
import '../../../styles/process-five-payment.css'
import {Radio, Space} from "antd";
import PayDebitCard from "./PayDebitCard";
import PayPaypal from "./PayPaypal";
import {createOrderDetails, createOrderNumber} from "../../../SpecificationInput/AjaxService";
import {orderSummaryFun, useAppState} from "../../../state";

interface ts_orderDetail {
    amount: number,
}

const ProcessFivePayment = () => {
    const [payType, setPayType] = useState<number>(0);
    const { dispatch, orderSummary, orderOptionsItem } = useAppState();
    const [orderDetail, setOrderDetail] = useState<any>({amount: 0});

    // 选择支付类型
    const handlerCheckPayType = (type: number) => {
        setPayType(type);
    }

    useEffect(() => {
        // console.log('orderOptionsItem', orderOptionsItem)
        createOrder();
    }, []);


    const getOrderDetailList = () => {
        const {ordersItem} = orderOptionsItem;
        return ordersItem.reduce((pre: any, cur: {record: any}) => {
            const {id, productNo, otype: oType, weight, subtotal} = cur.record;
            const obj = {id, productNo, oType, weight, subtotal};
            pre.push(obj);
            return pre;
        }, []);
    }

    // 创建订单号，（从后端获取订单号）
    const createOrder = async() => {
        const toPaymentParameterDTO = {
            "receiverAddressId": orderOptionsItem.deliveryAddr.id,
            "shipping": orderSummary.freightCharges,
            // "shipping": orderOptionsItem.expressInfo.id,
            "subtotal": (orderSummary.total-orderSummary.coupon.value).toFixed(3),
            "totalWeight": orderSummary.weight
        };

        const data:any = await createOrderNumber(toPaymentParameterDTO);
        console.log('toPaymentParameterDTO', data.paypalFee)
        setOrderDetail(data);
        dispatch(orderSummaryFun({ handlingCharge: data.paypalFee}));
        return data;
    }

    const cOrderDetail = async (data: any, payType = 1) => {
        const {orderID} = data;
        const needsFields = [
            'orderDetailsList',
            'courierCompanyName', //物流名称
            'countryName', // 运输到哪个国家
            'orderNo', // 客户填写的订单号，可为空
            'disCouponStr', // 优惠金额
            'couponId', // 券id
            'payPayOrderId', //payPay返回的orderId 信用卡支付时可以随便填，但不能为空【必须】
            'paymentType',//支付类型1->payPal、2->BankTransfer、3->WesternUnion、4->PayWithAccountBalance，5->credit【必须】",
        ]
        const orderDetailList = getOrderDetailList();
        const dtd: any = {};
        Object.keys(orderDetail).forEach(key => {
            if (needsFields.indexOf(key) > -1) {
                if (key === 'orderDetailsList') {
                    dtd[key] = orderDetailList;
                } else if (key === 'courierCompanyName') {
                    dtd[key] = orderOptionsItem.expressInfo.name;
                } else if (key === 'countryName') {
                    dtd[key] = orderOptionsItem.deliveryAddr.receiverCountry;
                } else if (key === 'disCouponStr') {
                    dtd[key] = orderSummary.coupon.value;
                } else if (key === 'couponId') {
                    dtd[key] = orderSummary.coupon.id;
                } else if (key === 'payPayOrderId') {
                    dtd[key] = orderID;
                } else if (key === 'paymentType') {
                    dtd[key] = payType;
                }
            } else {
                dtd[key] = orderDetail[key];
            }
        });
        // createOrderDetails(dtd).then(res => {
        //
        // });
        console.log('dtd===>', dtd);
    }

    return (
        <div className="process-five">
            <div className="header">
                <Space>
                    <span>All transactions are secured and encrypted</span>
                    <img src={require('../../../images/safe_icon14.png')} alt=""/>
                </Space>
            </div>
            <div className="pays-box one">
                <div className="box-li">
                    <div className="header">
                        <div className="radio">
                            <Radio
                                checked={payType === 0}
                                onChange={() => {handlerCheckPayType(0)}}>
                                Credit / Debit Card
                            </Radio>
                        </div>
                        <div className="rig-imgs">
                            <img src={require('../../../images/pay-atps.png')} alt=""/>
                        </div>
                    </div>
                    {
                        payType === 0 ? <PayDebitCard /> : ''
                    }
                </div>
            </div>
            <div className="pays-box">
                <div className="box-li">
                    <div className="header">
                        <div className="radio">
                            <Radio
                                checked={payType === 1}
                                onChange={() => {handlerCheckPayType(1)}}>
                                <img src={require('../../../images/paypal.png')} alt=""/>
                            </Radio>
                        </div>
                    </div>
                    {
                        payType === 1 && orderDetail.amount === Number((orderSummary.total+orderSummary.freightCharges-orderSummary.coupon.value).toFixed(2)) ? <PayPaypal
                            options={{
                                amountValue: orderDetail?.amount,
                                amountValueCustomId: new Date().getTime()
                            }}
                            callBackSuccess={async (data: any) => {await cOrderDetail(data, 1)}}
                            /> : ''
                    }
                </div>
            </div>
        </div>
    )
}

export default ProcessFivePayment;