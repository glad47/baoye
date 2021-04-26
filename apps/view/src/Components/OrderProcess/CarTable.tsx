import React from 'react';
import { Checkbox } from 'antd';


const CarTable = (props: any) => {
    const {columns, data, rowKey, checkBox} = props;
    return (
        <div className="car-table">
            <table>
                <thead>
                <tr>
                    {
                        checkBox ? <th><Checkbox></Checkbox></th> : ''
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
                    data.map((tds:any, index: number) => (
                        <tr key={`tr-${index}-${tds[rowKey]}`}>
                            {
                                checkBox ? <td><Checkbox></Checkbox></td> : ''
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