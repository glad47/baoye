import React, {useEffect, useState} from 'react';
import {delDeliveryAddress, getDeliveryAddress} from "../../../SpecificationInput/AjaxService";
import {message, Spin} from "antd";

const HistoryAddress = () => {
    const [addrList, setAddrList] = useState([]);
    const [spin, setSpin] = useState<boolean>(false);

    const getAddr = () => {
        setSpin(true);
        getDeliveryAddress().then(res => {
            const { data: dt } = res;
            if (dt) {
                setAddrList(dt);
                setSpin(false);
            }
        })
    }

    const handlerDelAddr = (id: number, index: number) => {
        setSpin(true);
        delDeliveryAddress(id).then(res => {
            const defLi = [...addrList];
            defLi.splice(index, 1);
            setAddrList(defLi);
            setSpin(false);
            message.success("delete success!");
        });
    }
    useEffect(() => {
        getAddr();
    }, [])
    return (
        <div className="history-addr">
            <div>
                <span>History address</span>
                <Spin spinning={spin}>
                    <div className="history-addr-box">
                        {
                            addrList.map((item: any, index: number) => (
                                <div className={`history-addr-li ${item.isDefault ===1 ? ' active' : ''}`}>
                                    <strong>{item.receiverName}</strong>
                                    <span className="tel">{item.receiverTelephone}</span>
                                    <span className="addr">{item.receiverAddress}</span>
                                    <img src={require("../../../images/close_circle.png")} alt="" className="close" onClick={() => handlerDelAddr(item.id, index)}/>
                                </div>
                            ))
                        }
                    </div>
                </Spin>
            </div>
        </div>
    )
}

export default HistoryAddress;