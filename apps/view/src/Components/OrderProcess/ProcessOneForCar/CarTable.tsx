/**
 * 下单流程 => 购物车 商品列表表格组件封装
 */
import React, {useEffect, useState} from 'react';
import {Checkbox, message, Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import '../../../styles/car-table.css';

interface checkValueTS {
    record?: object
    rowIndex?: number
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const CarTable = (props: any) => {
    const {columns, data, rowKey, checkBox, _style, openCheckAll, spin: pSpin} = props;
    const [checkedList, setCheckedList] = React.useState<any>([]);
    const [checkAll, setCheckAll] = React.useState(false);

    // 全选
    const handlerCheckAll = () => {
        setCheckAll(!checkAll);
        if (!checkAll && checkedList.length !== data.length) {
            const res = data.reduce((pre:object[], cur:any, index: number) => {
                pre.push({
                    record: cur,
                    rowIndex: index
                });
                return pre;
            }, []);
            message.success('check all successful!');
            setCheckedList(res);
        } else {
            message.warn('Deselect all!');
            setCheckedList([]);
        }
    }

    // 单选
    const handlerCheck = (e: any) => {
        let { value } = e.target;
        value = JSON.parse(value);
        const { rowIndex } = value;
        let flag = checkedList.findIndex((item: checkValueTS) => (item.rowIndex === rowIndex));
        if (flag > -1) { // 数据已存在， 取消选择
            const def = [...checkedList];
            def.splice(flag, 1);
            setCheckedList(def);
        } else { // 数据不存在， 选择
            if (checkBox && checkBox === 'single') { // 单选
                setCheckedList([value]);
            } else { // 多选
                setCheckedList([...checkedList, value]);
            }
        }
    }


    useEffect(() => {
        const {onChecked} = props;
        if (checkedList.length === data.length) {
            setCheckAll(true);
        } else {
            setCheckAll(false);
        }
        if (onChecked) { // 选中传值
            onChecked(checkedList);
        }
    }, [checkedList])
    return (
        <div className="car-table">
            <Spin indicator={antIcon} spinning={pSpin}>
                <table>
                    <thead>
                    <tr>
                        {
                            checkBox && openCheckAll ?
                                <th style={{width: '60px'}}>
                                    <Checkbox onChange={handlerCheckAll} checked={checkAll} />
                                </th> : <th style={{width: '78px'}}></th>
                        }
                        {
                            columns.map((hea: any, index: number) => (
                                <th key={`th-${index}`} style={{width: hea.width + 'px' || 'auto'}}>
                                    {hea.title}
                                </th>
                            ))
                        }
                    </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((tds:any, inx: number) => (
                                <tr key={`tr-${inx}-${tds[rowKey]}`}>
                                    {
                                        checkBox ?
                                            <td style={{height: _style.TdHeight || 'auto'}}>
                                                <Checkbox
                                                    checked={checkedList.find((item: checkValueTS) => (item.rowIndex == inx))}
                                                    value={JSON.stringify({record: tds, rowIndex: inx})}
                                                    onChange={handlerCheck}/>
                                            </td> : ''
                                    }
                                    {
                                        columns.map((hea: any, hIndex: number) => {
                                            const res = hea['dataIndex']
                                            if (hea.render) {
                                                return (
                                                    <td key={`td-${hIndex}-${tds[rowKey]}`}>
                                                        {/* 行数据，当前值，下标值*/}
                                                        {res === undefined ? hea.render('null') : hea.render(tds, tds[res], inx)}
                                                    </td>
                                                )
                                            }
                                            return (
                                                <td key={`td-${hIndex}-${tds[rowKey]}`}>
                                                    {res === undefined ? '' : tds[res]}
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </Spin>
        </div>
    )
}

CarTable.defaultProps = {openCheckAll: true}
export default CarTable;