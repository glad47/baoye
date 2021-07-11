import React, {useEffect, useState} from 'react';
import '../../../styles/process-three-transport.css'
import {Input, Space, Radio, Checkbox} from "antd";
import CarTable from "../ProcessOneForCar/CarTable";
import {orderOptions, orderSummaryFun, useAppState} from "../../../state";
import {DescribeCouriers, fetchShipingCost, getAllCountry} from "../../../SpecificationInput/AjaxService";
import _ from "lodash";

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
    const [currentRadio, setCurrentRadio] = useState<number | null>();
    const [spin, setSpin] = useState(false);
    const [shippingAccount, setShippingAccount] = useState();
    const [freightParams, setFreightParams] = useState({
        courierId: 1,
        countryId: 0,
        countryName: null,
        totalWeight: 0,
    });
    const [shipmentTerms, setShipmentTerms] = useState<any>();
    const [tableData, setTableData] = useState<any>([]);
    const [beforeTableData, setBeforeTableData] = useState<any>([]);
    const [checkRow, setCheckRow] = useState<any>();

    const handlerRadio = (index: any) => {
        if (currentRadio === index) {
            // // 运费恢复
            const def = [...tableData];
            const total = beforeTableData[index].total;
            def[index].total = total;
            const t = checkRow ? checkRow.record.total : 0;
            dispatch(orderSummaryFun({ freightCharges: t}));
            setTableData(def);
            setCurrentRadio(null);
        } else {
            setShipmentTerms('EXC');
            setCurrentRadio(index);
            // 运费清零
            clearShippingFee(index)
        }
    }

    const clearShippingFee = (index: any) => {
        const dtd = _.cloneDeep(tableData);
        dtd[index].total = 0;
        dispatch(orderSummaryFun({ freightCharges: 0}));
        setTableData(dtd);
    }

    // 快递选中
    const handlerChecked = (row: any) => {
        let freightCharges = 0;
        if (row && row.length > 0) {
            const {courierName, id} = row[0].record;
            setCheckRow(row[0]);
            // setShipmentTerms(courierName);
            if (row[0].record.total) {
                freightCharges = row[0].record.total;
                dispatch(orderOptions({expressInfo: {id: id, name: courierName}}));
            } else {
                dispatch(orderOptions({expressInfo: {id: null, name: null}}));
            }
        } else { // 取消选中
            freightCharges = 0;
            dispatch(orderOptions({expressInfo: {id: null, name: null}}));
        }
        // redux 存入运费
        dispatch(orderSummaryFun({ freightCharges: freightCharges}));
    }


    const initCouriers = async () => {
        setSpin(true);
        const params = await initQuoteFreightParams();
        DescribeCouriers().then(async res => {
            const dt: any = [];
            if (res && Array.isArray(res)) {
                for (let item of res) {
                    const {id, courierName} = item;
                    params.courierId = id;
                    if (filterCouriers.indexOf(courierName) === -1) {
                        const _img = iconMapping.find((item: any) => (item.name === courierName));
                        const shippingRes: any = await fetchShipingCost(params);
                        if (shippingRes) { // 判断是否支持当前运输方式
                            const {shippingTime, shippingCost} = shippingRes;
                            dt.push({
                                description: 'Using my own account',
                                tim: shippingTime,
                                img: _img ? _img.icon : null,
                                total: shippingCost,
                                courierName: courierName,
                                id: id
                            });
                        }
                    }
                }
            }
            setTableData(dt);
            setBeforeTableData(dt);
            setSpin(false);
        })
    }

    const initQuoteFreightParams = async () => {
        const dat : any = {
            courierId: 1,
            countryId: 0,
            countryName: 0,
            totalWeight: 0,
        }
        const {weight} = orderSummary;
        dat.totalWeight = weight;
        const {deliveryAddr} = orderOptionsItem;
        let receiverCountry: any;
        deliveryAddr && ({receiverCountry} = deliveryAddr);
        dat.countryName = receiverCountry;
        let _session : any = window.localStorage.getItem('countryList');
        let countryList;
        if (_session) {
            countryList = JSON.parse(_session);
        } else {
            await getAllCountry().then((res: any) => {
                countryList = res;
            })
        }
        dat.countryId = countryList.find((item: any) => (item.name === receiverCountry))?.id;
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
                <Checkbox
                    key={`radio-${index}`}
                    checked={currentRadio === index}
                    onChange={() => handlerRadio(index)}>
                    {txt}
                </Checkbox>
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
            render: (record: any, txt: string | undefined) => (<strong>{txt || txt === 0 ? `$${txt}` : 'Not currently supported'}</strong>)
        }
    ];

    useEffect(() => {
        initCouriers();
    }, []);
    return (
        <div className="process-three-tra">
            <div className="header">
                <span>SHIPMENT 1/1 — Shipping from {freightParams.countryName}</span>
                <div>
                    <span>shipment terms:</span>
                    <Input value={shipmentTerms}/>
                </div>
            </div>
            <div className="tra-box">
                <CarTable
                    columns={columns}
                    data={tableData}
                    rowKey="id"
                    spin={spin}
                    checkBox="single"
                    onChecked={handlerChecked}
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