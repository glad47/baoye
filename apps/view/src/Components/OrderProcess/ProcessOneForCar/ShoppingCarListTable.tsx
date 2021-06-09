import React, {useEffect, useState} from 'react'
import CarTable from "./CarTable";
import {ajaxCarList, delPcbOrder} from "../../../SpecificationInput/AjaxService";
import {orderOptions, orderSummaryFun, useAppState} from "../../../state";

const ShoppingCarListTable = () => {
    const { dispatch } = useAppState();
    const columns = [
        {
            title: 'PRODUCT',
            key: '',
            dataIndex: 'img',
            width: 120,
            render: (undefined: any,txt: string | undefined) => (<img src={txt} />)
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

    const handlerDel = (record: any, index: number) => {
        const {id} = record;
        setSpin(true);
        delPcbOrder(id).then(res => {
            const defData = [...data];
            defData.splice(index, 1);
            setData(defData);
            setSpin(false);
        });
    }

    // 选中
    const handlerChecked = (row: any) => {
        let total = 0;
        let weightTotal = 0;
        row.reduce((pre: any ,cur: any) => {
            const {subtotal, weight} = cur.record;
            total += subtotal; // 计算总价格
            weightTotal += weight; // 计算总重量
            return pre;
        }, 0);
        dispatch(orderOptions({ordersItem: row}));
        dispatch(orderSummaryFun({ total: total, weight: weightTotal}));
    }

    return (
        <div className="shopping-car-list">
            <CarTable
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