import React, {useState} from 'react';
import '../../../styles/process-three-transport.css'
import {Input, Space, Radio} from "antd";
import CarTable from "../ProcessOneForCar/CarTable";

const ProcessThreeTransport = () => {
    const [currentRadio, setCurrentRadio] = useState<number>();
    const [shippingAccount, setShippingAccount] = useState();

    const handlerRadio = (index: number) => {
        setCurrentRadio(index)
    }

    const checkRadioDom = (record: any, txt: any, index: number) => {
        return (
            <>
                <Radio
                    key={`radio-${index}`}
                    checked={currentRadio === index}
                    onChange={() => (handlerRadio(index))}>
                    {txt}
                </Radio>
                {
                    currentRadio === index ? <Input defaultValue={shippingAccount} className="checkRadio-input"/> : ''
                }
            </>
        )
    }

    const columns = [
        {
            title: 'COMPANY',
            key: '',
            dataIndex: 'img',
            width: 128,
            render: (record: any, txt: string | undefined) => (<img src={txt} />)
        },
        {
            title: 'TRANSPORTATION TIME',
            key: '',
            width: 240,
            dataIndex: 'tim'
        },
        {
            title: ' ACCOUN',
            key: 'id',
            width: 256,
            dataIndex: 'description',
            render: checkRadioDom
        },
        {
            title: 'TOTAL',
            key: '',
            width: 164,
            dataIndex: 'quantity'
        }
    ];
    const data = [
        {
            img: require('../../../images/fedex.png'),
            description: 'Using my own account',
            tim: ' 4-7 working days',
            quantity: 100,
            total: 80,
            id: 1
        },
        {
            img: require('../../../images/ups.png'),
            description: 'Using my own account',
            tim: ' 4-7 working days',
            quantity: 100,
            total: 80,
            id: 2
        },
        {
            img: require('../../../images/dhl.png'),
            description: 'Using my own account',
            tim: ' 4-7 working days',
            quantity: 100,
            total: 80,
            id: 3
        },
        {
            img: require('../../../images/ems.png'),
            description: 'Using my own account',
            tim: ' 4-7 working days',
            quantity: 100,
            total: 80,
            id: 3
        }
    ]
    return (
        <div className="process-three-tra">
            <div className="header">
                <span>SHIPMENT 1/1 — Shipping from China</span>
                <div>
                    <span>shipment terms:</span>
                    <Input value={'EXW ShenZhen'}/>
                </div>
            </div>
            <div className="tra-box">
                <CarTable
                    columns={columns}
                    data={data}
                    rowKey="id"
                    spin={false}
                    checkBox="single"
                    openCheckAll={false}
                    _style={{TdHeight: 68}}
                />
            </div>
            <div className="tra-tips">
                <Space>
                    <span>
                        <img src={require("../../../images/quate_voice.png")} alt=""/>
                        Customs duties/taxes and any other import fees are not included and are the responsibility of the buyer.
                        <br />
                        Please refer to the destination country's customs regulations for details.
                    </span>
                </Space>
            </div>
            <div className="order-instr">
                <span>Order instructions</span>
                <div>
                    Leave a remark if you have any request
                </div>
            </div>
        </div>
    )
}

export default ProcessThreeTransport;