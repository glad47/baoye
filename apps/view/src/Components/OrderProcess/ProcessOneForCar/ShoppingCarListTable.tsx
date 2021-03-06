import React, {useEffect, useRef, useState} from 'react'
import CarTable from "./CarTable";
import {
    ajaxCarList,
    ajaxCarListForAssembly,
    ajaxCarListForStencil,
    delPcbOrder, delStencilOrder
} from "../../../SpecificationInput/AjaxService";
import {orderOptions, orderSummaryFun, useAppState} from "../../../state";
import {Fields_Stencil_PCB} from "../../../util";

const ShoppingCarListTable = () => {
    const { dispatch } = useAppState();
    const carTableRef = useRef();

    const handleTextarea = (e: any) => {
        e.persist()
        dispatch(orderOptions({remark: e.target.value}));
    }

    const DESCRIPTION_DOM = (record: any) => (
        <>
            {
                record.totalStencilFee ? 'Stencil' : (record.totalAssemblyFee ? 'Assembly' :
                        <>
                            <p>P/N:{record.productNo}</p>
                            <p>[PCB prototype]<br /></p>
                            <p>{record.finishThickness} {record.layerNum}layer<br /></p>
                            <p>Solder Mask: </p>
                            <p>{record.solderMaskTopColor}</p>
                            <p>{record.surfaceFinish}</p>
                        </>
                )
            }
        </>
    )

    const columns = [
        {
            title: 'PRODUCT',
            key: '',
            dataIndex: 'gerberName',
            width: 120,
            // render: (undefined: any,txt: string | undefined) => (<img src={txt} />)
        },
        {
            title: 'DESCRIPTION',
            key: '',
            width: 160,
            dataIndex: 'gerberName',
            render: (record: any) => (DESCRIPTION_DOM(record))
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

    const getCarList = async () => {
        setSpin(true);
        const status = 1;
        const statusList=[1,2]
        const {data:orderPCB} = await ajaxCarList({statusList});
        let {data:orderStencil} = await ajaxCarListForStencil({statusList});
        const {data:orderAssembly} = await ajaxCarListForAssembly({statusList});
        orderStencil = Fields_Stencil_PCB(orderStencil);
        // console.log('orderPCB', orderPCB)
        // console.log('orderStencil', orderStencil)
        // console.log('orderAssembly', orderAssembly)
        const data = orderPCB.concat(orderStencil).concat(Fields_Stencil_PCB(orderAssembly));
        setData(data);
        setSpin(false);
        // ajaxCarList({status: 1}).then(res => {
        //     const {data} = res;
        //     setData(data);
        //     setSpin(false);
        // })
    }

    useEffect(() => {
        getCarList();
    }, []);

    useEffect(() => {
        let total = 0;
        let weightTotal = 0;
        checked.reduce((pre: any ,cur: any) => {
            const {subtotal, weight} = cur.record;
            total += subtotal; // ???????????????
            weightTotal += weight || 0; // ???????????????
            return pre;
        }, 0);
        dispatch(orderOptions({ordersItem: checked}));
        dispatch(orderSummaryFun({ total: total, weight: weightTotal}));
    }, [checked])

    const handlerDel = async (record: any, index: number) => {
        const {id, totalStencilFee} = record;
        setSpin(true);
        if (!totalStencilFee) { // ????????? ??????pcb??????
            await delPcbOrder(id)
        } else { // ??????????????????
            await delStencilOrder(id)
        }
        const defData = [...data];
        defData.splice(index, 1);
        setData(defData);
        setSpin(false);
        // ????????????
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
    }

    // ??????
    const handlerChecked = (row: any) => {
        // console.log('setChecked row', row)
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
                checkedOperation="all"
                checkBox _style={{TdHeight: 120}}
                onChecked={handlerChecked}
            />
            <div className="order-instr">
                <span>Order instructions</span>
                <div>
                    <textarea placeholder='Leave a remark if you have any request' onKeyUp={e => handleTextarea(e)}/>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCarListTable;