/**
 * 下单流程 => 购物车 商品列表表格组件封装
 */
import React, {useEffect} from 'react';
import {Checkbox, message} from 'antd';

interface checkValueTS {
    record?: object
    rowIndex?: number
}

const CarTable = (props: any) => {
    const {columns, data, rowKey, checkBox, _style} = props;
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
            setCheckedList([...checkedList, value]);
        }
    }


    useEffect(() => {
        if (checkedList.length === data.length) {
            setCheckAll(true);
        } else {
            setCheckAll(false);
        }
    }, [checkedList])
    return (
        <div className="car-table">
            <table>
                <thead>
                <tr>
                    {
                        checkBox ?
                            <th>
                                <Checkbox onChange={handlerCheckAll} checked={checkAll} />
                            </th> : ''
                    }
                    {
                        columns.map((hea: any, index: number) => (
                            <th key={`th-${index}`} style={{width: hea.width + 'px' || 'auto'}}>
                                {hea.title}
                            </th>
                        ))
                    }
                </tr>
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
                                                {res === undefined ? hea.render('null') : hea.render(tds[res])}
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
                </thead>
            </table>
        </div>
    )
}

export default CarTable;