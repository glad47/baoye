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
    const { boardFee, engineeringFee, testFee, quoteMode, stencilFee, assemblyFee } = props;
    const { dispatch, subtotal, buildTimeItmes, carDrawerStatus } = useAppState();

    const handlerBuild = (value: any) => {
        const v = value;
        const { price, dayNumber, id } = buildTimeItmes.filter((item) => { return Number(item.id) === Number(v) })[0];
        const buildTimeItem: BuildTimeItem = {id: id, price: price, dayNumber: dayNumber};
        dispatch(changeUrgentCost(buildTimeItem));
    }
    const DOM = (
        <div className="pcb-build-fee-detail">
            <div className="model-1">
                <div className="cost-det">
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
                </div>
            </div>
            <div className="model-2">
                <strong>Lead Time:</strong>
                <div className="cost-det">
                    <div>
                        <span className="selector">
                            <Select style={{ width: 120 }} onChange={handlerBuild} defaultValue={1}>
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
                        <span className="m-price" style={{fontSize: '20px', 'font-weight': '600'}}>
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