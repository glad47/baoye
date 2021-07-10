import React, {useEffect, useRef, useState} from 'react'
import _ from 'lodash'
import CarTable from "./CarTable";
import {ajaxCarList, delPcbOrder} from "../../../SpecificationInput/AjaxService";
import {orderOptions, orderSummaryFun, useAppState} from "../../../state";

const ShoppingCarListTable = () => {
    const { dispatch } = useAppState();
    const carTableRef = useRef();
    const columns = [
        {
            title: 'PRODUCT',
            key: '',
            dataIndex: 'productNo',
            width: 120,
            // render: (undefined: any,txt: string | undefined) => (<img src={txt} />)
        },
        {
            title: 'DESCRIPTION',
            key: '',
            width: 160,
            dataIndex: 'gerberName'
        },
        {
            title: 'PRODUCTION TIME',
            key: '',
            width: 168,
            dataIndex: 'buildTime'
        },
        {
            title: 'QUANTITY',
            key: '',
            width: 168,
            dataIndex: 'quantityPcs'
        },
        {
            title: 'TOTAL',
            key: '',
            width: 128,
            dataIndex: 'subtotal',
            render: (record: any, txt: any) => (txt)
        },
        {
            title: '',
            key: '',
            dataIndex: 'subtotal',
            type: 'operation',
            render: (record: any, txt: any, index: number) => {
                return (
                    <img src={require('../../../images/close_circle.png')} alt="" onClick={() => handlerDel(record, index)}/>
                )
            }
        },
    ];
    const [data, setData] = useState<any>([]);
    const [checked, setChecked] = useState([]);
    const [spin, setSpin] = useState<boolean>(false);

    const getCarList = () => {
        setSpin(true);
        ajaxCarList({status: 1}).then(res => {
            const {data} = res;
            setData(data);
            setSpin(false);
        })
    }

    useEffect(() => {
        getCarList();
    }, []);

    useEffect(() => {
        let total = 0;
        let weightTotal = 0;
        console.log('checked', checked)
        checked.reduce((pre: any ,cur: any) => {
            const {subtotal, weight} = cur.record;
            total += subtotal; // 计算总价格
            weightTotal += weight; // 计算总重量
            return pre;
        }, 0);
        dispatch(orderOptions({ordersItem: checked}));
        dispatch(orderSummaryFun({ total: total, weight: weightTotal}));
    }, [checked])

    const handlerDel = (record: any, index: number) => {
        const {id} = record;
        setSpin(true);
        delPcbOrder(id).then(res => {
            const defData = [...data];
            defData.splice(index, 1);
            setData(defData);
            setSpin(false);
            // 删除选中
            const defChecked = [...checked];
            defChecked.some((item: any, i) => {
                const {record} = item;
                if (record.id === id) {
                    defChecked.splice(i, 1)
                    // @ts-ignore
                    carTableRef?.current.UIH_clearCheckList(index)
                    return true
                }
            })
            setChecked(defChecked);
        });
    }

    // 选中
    const handlerChecked = (row: any) => {
        console.log('carTableRef', carTableRef)
        setChecked(row);
    }

    return (
        <div className="shopping-car-list">
            <CarTable
                cRef={carTableRef}
                spin={spin}
                columns={columns}
                data={data}
                rowKey="id"
                checkBox _style={{TdHeight: 120}}
                onChecked={handlerChecked}
            />
        </div>
    )
}

export default ShoppingCarListTable;