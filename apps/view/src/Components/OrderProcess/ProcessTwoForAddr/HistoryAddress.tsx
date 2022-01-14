import React, {useEffect, useRef, useState} from 'react';
import {delDeliveryAddress, getDeliveryAddress} from "../../../SpecificationInput/AjaxService";
import {message, Spin, Button, Space} from "antd";
import {orderOptions, useAppState} from "../../../state";

import emitter from "../../../eventBus";
import {EditFilled} from "@ant-design/icons";

const HistoryAddress = (props: any) => {
    const [addrList, setAddrList] = useState<any>([]);
    const [spin, setSpin] = useState<boolean>(false);
    const [curDefault, setCurDefault] = useState<number>(0);
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
              
                const dtt=dt.filter((item: any) => item.isDefault !== 1)


                 const dtt2 = (() => [curr,...dtt])();
                
                setAddrList(dtt2);
                setSpin(false);
            }
        })
    }

    const handlerDelAddr = (id: number, index: number) => {
        setSpin(true);
        // delDeliveryAddress(id).then(res => {
           
        //     message.success("delete success!");
        // });
        const defLi: any = [...addrList];
        defLi.splice(index, 1);
        setAddrList(defLi);
        setSpin(false);
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

    const specialClass = {
        backgroundColor: '#ffba00',
        color: '#fff',
        fontSize: '8px',
        padding: '2px',
        borderSizing:'border-box',
        display:'inline-block',
        width:'auto',
        height:'20px',
        marginLeft:'15px'
    }
    return (
        <div className="history-addr">
           
            <div style={{overflow:'auto',whiteSpace:'nowrap'}}>
            <span style={{position:'sticky', left:'10px',top:'-10px'}}>History address</span>
                <Spin spinning={spin}>
                    <div className="history-addr-box" style={{overflow:'auto',whiteSpace:'nowrap'}}>
                        {
                            addrList.map((item: any, index: number) => (
                                <div
                                    style={{display:'inline-box'}}
                                    onClick={() => {checkList(item, index)}}

                                    className={`history-addr-li ${ curDefault === index ? ' active' : ''}`}
                                    key={`keyAddr-${index}`}>
                                    <div style={{display:'flex', flexDirection:'row'}}>
                                    <strong>{item.receiverName}</strong> { item.isDefault === 1 ? <span style={specialClass}>default</span>  : '' }
                                   </div>
                                    <div style={{display:'flex', flexDirection:'row'}}>
                                    <span style={{height:'auto'}} className="tel">{item.receiverTelephone}</span>
                                    
                                    </div>
                                    <div style={{display:'flex', flexDirection:'row', margin:'2px',padding:'0px'}}>
                                    <span style={{height:'auto'}} className="tel">{item.receiverCity}</span>
                                     <span style={{height:'auto'}} className="tel">, {item.receiverCountry}</span>
                                    </div>
                                    <span style={{height:'auto'}} className="addr">{item.receiverAddress}</span>
                                    <img src={require("../../../images/close_circle.png")} alt="" className="close" onClick={() => handlerDelAddr(item.id, index)}/>
                                </div>
                            ))
                        }
                    </div>
                </Spin>
                {
                    addrList.length >  0  &&
                    <Button style={{position:'sticky',bottom:'-30px',left:'600px',width:'200px'}} onClick={handleEdits} type="primary" className="address-edit">
                        <span>Edit the address</span>
                        <EditFilled />
                    </Button>
                }
            </div>
        </div>
    )
}

export default HistoryAddress;