import React, {useEffect, useState} from 'react';
import '../../../styles/process-three-transport.css'
import {Input, Space, Radio} from "antd";
import CarTable from "../ProcessOneForCar/CarTable";
import {useAppState} from "../../../state";
import {DescribeCouriers, fetchShipingCost, getAllCountry} from "../../../SpecificationInput/AjaxService";

interface freightItf {
    courierId?: number
    countryId?: number
    totalWeight?: number
}

const iconMapping: any = [
    {name: 'DHL', icon: require('../../../images/dhl.png')},
    {name: 'FedEx-IP', icon: require('../../../images/fedex.png')},
    {name: 'UPS', icon: require('../../../images/ups.png')},
    {name: 'HK DHL', icon: require('../../../images/dhl.png')}
]

// 过滤掉暂时不需要的快递公司
const filterCouriers: any = ['UPS', 'HK DHL'];

const ProcessThreeTransport = () => {
    const { orderSummary, orderOptionsItem, dispatch } = useAppState();
    const [currentRadio, setCurrentRadio] = useState<number>();
    const [spin, setSpin] = useState(false);
    const [shippingAccount, setShippingAccount] = useState();
    const [freightParams, setFreightParams] = useState({
        courierId: 1,
        countryId: 0,
        totalWeight: 0,
    });
    const [tableData, setTableData] = useState<any>([]);

    const handlerRadio = (index: number) => {
        setCurrentRadio(index)
    }

    // 快递选中
    const handlerChecked = (row: any) => {
        const {id} = row;
        const def = {...freightParams};
        def.courierId = id;
        fetchShipingCost(def).then(res => {
            console.log('运费报价为：', res);
        });
    }

    const initCouriers = async () => {
        setSpin(true);
        const params = await initQuoteFreightParams();
        DescribeCouriers().then(async res => {
            console.log('运输方式', res);
            const dt: any = [];
            if (res && Array.isArray(res)) {
                for (let item of res) {
                    const {id, courierName} = item;
                    params.courierId = id;
                    if (filterCouriers.indexOf(courierName) === -1) {
                        const _img = iconMapping.find((item: any) => (item.name === courierName));
                        const shippingRes: any = await fetchShipingCost(params);
                        const {shippingTime, shippingCost} = shippingRes;
                        console.log('shippingRes', shippingRes)
                        dt.push({
                            description: 'Using my own account',
                            tim: shippingTime,
                            img: _img ? _img.icon : null,
                            total: shippingCost,
                            id: id
                        });
                    }
                }
            }
            setTableData(dt);
            setSpin(false);
        })
    }

    const initQuoteFreightParams = async () => {
        const dat = {
            courierId: 1,
            countryId: 0,
            totalWeight: 0,
        }
        const {weight} = orderSummary;
        dat.totalWeight = weight;
        const {deliveryAddr} = orderOptionsItem;
        let receiverCountry: any;
        deliveryAddr && ({receiverCountry} = deliveryAddr);
        let _session : any = window.localStorage.getItem('countryList');
        let countryList;
        if (_session) {
            countryList = JSON.parse(_session);
        } else {
            await getAllCountry().then((res: any) => {
                countryList = res;
            })
        }
        dat.countryId = countryList.find((item: any) => (item.name === receiverCountry)).id;
        setFreightParams(dat);
        return dat;
    }

    // 计算运费
    // const quoteFreight = async (id) => {
    //
    // }

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
            dataIndex: 'total',
            render: (record: any, txt: string | undefined) => (<strong>${txt}</strong>)
        }
    ];

    useEffect(() => {
        initQuoteFreightParams();
        initCouriers();
    }, []);
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
                    data={tableData}
                    rowKey="id"
                    spin={spin}
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