import React, {useEffect, useRef, useState} from 'react';
import {delDeliveryAddress, getDeliveryAddress} from "../../../SpecificationInput/AjaxService";
import {message, Spin, Button, Space} from "antd";
import {orderOptions, useAppState} from "../../../state";

import emitter from "../../../eventBus";
import {EditFilled} from "@ant-design/icons";

const HistoryAddress = (props: any) => {
    const [addrList, setAddrList] = useState([]);
    const [spin, setSpin] = useState<boolean>(false);
    const [curDefault, setCurDefault] = useState<number>();
    const { dispatch } = useAppState();

    const getAddr = async () => {
        setSpin(true);
        getDeliveryAddress().then(res => {
            const { data: dt } = res;
            if (dt) {
                const curr = dt.find((item: any) => item.isDefault === 1);
                if (curr) { // 设置当前 redux 默认地址
                    dispatch(orderOptions({deliveryAddr: curr}));
                }
                setAddrList(dt);
                setSpin(false);
            }
        })
    }

    const handlerDelAddr = (id: number, index: number) => {
        setSpin(true);
        delDeliveryAddress(id).then(res => {
            const defLi: any = [...addrList];
            defLi.splice(index, 1);
            setAddrList(defLi);
            setSpin(false);
            message.success("delete success!");
        });
    }

    // 更新地址
    const StaticUpdateAddr = (obj: any) => {
        const {id} = obj;
        const def: any = [...addrList];
        let res: any = [];
        const flag = def.find((item:any) => item.id === id);
        if (flag) {
            def.forEach((item: any) => {
                if (item.id === id) {
                    res.push(obj);
                } else {
                    res.push(item);
                }
            });
        } else {
            def.push(obj);
        }
        setAddrList(res);
    }

    // 选中当前地址
    const checkList = (obj: object, index: number) => {
        setCurDefault(index);
        dispatch(orderOptions({deliveryAddr: obj}));
    }

    const handleEdits = () => {
        // @ts-ignore
        props.handleEdit();
    }

    useEffect(() => {
        getAddr();
        emitter.addListener('updateCurrentAddr', async val => {
            await getAddr();
            StaticUpdateAddr(val);
        })

        return () => {
            emitter.rawListeners('updateCurrentAddr');
        }
    }, [])
    return (
        <div className="history-addr">
            <div>
                <span>History address</span>
                <Spin spinning={spin}>
                    <div className="history-addr-box">
                        {
                            addrList.map((item: any, index: number) => (
                                <div
                                    onClick={() => {checkList(item, index)}}
                                    className={`history-addr-li ${item.isDefault || curDefault === index ? ' active' : ''}`}
                                    key={`keyAddr-${index}`}>
                                    <strong>{item.receiverName}</strong>
                                    <span className="tel">{item.receiverTelephone}</span>
                                    <span className="addr">{item.receiverAddress}</span>
                                    <img src={require("../../../images/close_circle.png")} alt="" className="close" onClick={() => handlerDelAddr(item.id, index)}/>
                                </div>
                            ))
                        }
                    </div>
                </Spin>
                {
                    addrList.length > 0 &&
                    <Button onClick={handleEdits} type="primary" className="address-edit">
                        <span>Edit the address</span>
                        <EditFilled />
                    </Button>
                }
            </div>
        </div>
    )
}

export default HistoryAddress;