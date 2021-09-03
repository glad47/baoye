import React, {useEffect, useState} from 'react'
import {message, Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {
    ajaxCarList,
    ajaxCarListForAssembly,
    ajaxCarListForStencil,
    delPcbOrder,
    delStencilOrder,
    editPcbOrder
} from "./AjaxService";
import {orders} from "../ts/pcb";
import {Link} from "react-router-dom";
import {reduxUser, useAppState} from "../state";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const CarList = (props:any) => {
    const { dispatch } = useAppState();
    const {setLen} = props;
    const [listData, setListData] = useState<[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [spinFlag, setSpinFlag] = useState<boolean>(false);
    const [to, setTo] = useState<any>(0);



    // 获取列表
    const getCarList = async () => {
        setSpinFlag(true);
        const orderPCB: any = await ajaxCarList({status: 1});
        const orderStencil: any = await ajaxCarListForStencil({status: 1});
        const orderAssembly: any = await ajaxCarListForAssembly({status: 1});
        const total = orderPCB.total + orderStencil.total + orderAssembly.total;
        const data = orderPCB.data.concat(orderStencil.data).concat(orderAssembly.data);
        setListData(data);
        setLen(total);
        setTo(total);
        setSpinFlag(false);
    }

    useEffect(() => {
        if (listData.length > 0) {
            let t = listData.reduce((pre: number, cur: orders) => {
                const {subtotal, totalStencilFee} = cur;
                if (subtotal) {
                    pre += subtotal;
                } else {
                    pre += totalStencilFee;
                }
                return pre;
            }, 0);
            t = Number(t.toFixed(2))
            setTotal(t);
        }
    }, [listData]);

    const asyncSessionCount = (value: any) => {
        let userInfo: any = sessionStorage.getItem("userAllInfo");
        if (userInfo) {
            userInfo = JSON.parse(userInfo);
            userInfo.cartCount = value;
            sessionStorage.setItem('userAllInfo',JSON.stringify(userInfo))
        }
    }

    // 删除订单
    const handlerDel = (id: number, index:number) => {
        setSpinFlag(true);
        const dtd = listData[index];
        const {totalStencilFee} = dtd;
        if (totalStencilFee) {
            delStencilOrder(id).then((res: any) => {
                message.success(res);
                setTo(to-1);
                setSpinFlag(false);
                delCallBack(index);
            })
        } else {
            delPcbOrder(id).then((res: any) => {
                message.success(res);
                setTo(to-1);
                setSpinFlag(false);
                delCallBack(index);
            })
        }
    }

    useEffect(() => {
        if (to) {
            asyncSessionCount(to);
            dispatch(reduxUser({cartNum: to}));
        }
    }, [to])

    const delCallBack = (index: any) => {
        const def: [] = [...listData];
        def.splice(index, 1);
        setListData(def);
    }

    useEffect(() => {
        getCarList();
    }, []);

    return (
        <div className="car-list">
            <Spin indicator={antIcon} spinning={spinFlag}>
                {
                    listData.map((item: orders, index) => (
                        <div className="car-li" key={`card-${index}`}>
                            <div className="img-div">
                                <img src={require('../images/FR42greenwhite.png')} alt='shopping cart' />
                            </div>
                            <div className="options">
                                <span className="name">{item.gerberName}</span>
                                <div className="lift-num">
                                    <span className="num">{item.boardType ? item.quantityPcs : item.quantity} <span style={{fontSize: '12px'}}>PCS</span></span>
                                </div>
                                <strong>${item.boardType ? item.subtotal : item.totalStencilFee}</strong>
                            </div>
                            <img
                                src={require("../images/close_circle.png")}
                                alt="close"
                                className="close"
                                onClick={() => {handlerDel(item.id, index)}}
                            />
                        </div>
                    ))
                }
            </Spin>
            <div className="car-total">
                <span>Estimated Cose</span>
                <strong>${total}</strong>
            </div>
            <div className="car-btns">
                <Link to="/order-process">
                    <button>
                        Checkout
                    </button>
                </Link>
                {/* <span>
                    <Link to="/order-process">Go to cart</Link>
                </span> */}
            </div>
        </div>
    )
}

export default CarList;