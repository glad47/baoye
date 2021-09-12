/*
 * @Descripttion: V3报价页面右侧计价面板
 * @version: 1.0
 * @Author:
 * @Date: 2021-07-17 11:10:06
 * @LastEditors: ho huang
 * @LastEditTime: 2021-09-04 20:33:16
 */
import React, {useEffect} from 'react';
import {Select} from "antd";
import {changeUrgentCost, useAppState} from "../state";
import {BuildTimeItem} from "../types";

const { Option } = Select;
const bts = [
    { id: 1, dayNumber: "3 day", price: 0 },
    { id: 2, dayNumber: "48 hours", price: 22 },
    { id: 3, dayNumber: "24 hours", price: 38 },
]

const PcbBuildFeeDetail: React.FC<any> = props => {
    const { boardFee, engineeringFee, testFee, stencilFee, assemblyFee } = props;
    const { dispatch, subtotal, buildTimeItmes, carDrawerStatus, quoteMode} = useAppState();

    const handlerBuild = (value: any) => {
        const v = value;
        const { price, dayNumber, id } = buildTimeItmes.filter((item) => { return Number(item.id) === Number(v) })[0];
        const buildTimeItem: BuildTimeItem = {id: id, price: price, dayNumber: dayNumber};
        dispatch(changeUrgentCost(buildTimeItem));
    }

    let pcbFeeLoading, smtFeeLoading, assFeeLoading;
    if (quoteMode === 0) {
        pcbFeeLoading = true;
        smtFeeLoading = stencilFee !== 0;
        assFeeLoading = assemblyFee !== 0;
    } else if (quoteMode === 1) {
        smtFeeLoading = true;
        pcbFeeLoading = boardFee !== 0;
        assFeeLoading = assemblyFee !== 0;
    } else if (quoteMode === 2) {
        assFeeLoading = true;
        pcbFeeLoading = boardFee !== 0;
        smtFeeLoading = stencilFee !== 0;
    };

    const DOM = (
        <div className="pcb-build-fee-detail">
            <div className="model-1">
                <div className="cost-det">
                    {
                        pcbFeeLoading &&
                            <>
                                <div>
                                    <span>Board Price:</span>
                                    <span>${boardFee}</span>
                                </div>
                                <div>
                                    <span>Engineering Price:</span>
                                    <span>${engineeringFee}</span>
                                </div>
                                <div>
                                    <span>Test Price:</span>
                                    <span>${testFee}</span>
                                </div>
                            </>
                    }
                    {
                        smtFeeLoading  &&
                        <>
                            <div>
                                <span>Stencil Price:</span>
                                <span>${stencilFee}</span>
                            </div>
                        </>
                    }
                    {
                        assFeeLoading &&
                        <>
                            <div>
                                <span>Assembly Price:</span>
                                <span>${assemblyFee}</span>
                            </div>
                        </>
                    }
                </div>
            </div>
            <div className="model-2">
                <strong>Lead Time:</strong>
                <div className="cost-det">
                    <div>
                        <span className="selector">
                            <Select style={{ width: 120 }} onChange={handlerBuild} defaultValue={buildTimeItmes[0].id} key={buildTimeItmes[0].id}>
                                {buildTimeItmes.map((item: { price: string | number | undefined; id: React.ReactText; dayNumber: React.ReactNode; }) => (
                                    <Option key={item.id} value={item.id}>{item.dayNumber}</Option>
                                ))}
                            </Select>
                        </span>
                        <span>${subtotal.urgentFee}</span>
                    </div>
                </div>
            </div>
            <div className="model-3">
                <div className="cost-det">
                    <div>
                        <span>Estimated Cost</span>
                        <span className="m-price" style={{fontSize: '20px', 'fontWeight': 600}}>
                            ${Number((subtotal.boardFee + subtotal.engineeringFee + subtotal.testFee + subtotal.urgentFee + subtotal.shippingFee + subtotal.stencilFee + subtotal.assemblyFee).toFixed(2))}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
    return DOM;
}

PcbBuildFeeDetail.defaultProps = { buildItems: bts, boardFee: 0, engineeringFee: 0, testFee: 0 }
export default PcbBuildFeeDetail;