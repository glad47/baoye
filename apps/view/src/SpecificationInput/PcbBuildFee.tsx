import React from 'react';
import {changeCarDrawer, useAppState} from "../state";
import CarDrawer from "./CarDrawer";
import PcbBuildFeeDetail from "./PcbBuildFeeDetail";

interface CastCalculationProps {
    boardFee?: number
    engineeringFee?: number
    buildItems?: any
    testFee?: number
    quoteMode: number
    stencilFee: number
    assemblyFee: number
}

const PcbBuildFee: React.FC<any> = (props) => {
    const { dispatch, carDrawerStatus, subtotal } = useAppState();
    const handlerCar = () => {
        dispatch(changeCarDrawer(true));
    }
    const DOM = (
        <div className="pcb-build-container">
            <div className="cost-d">Cost Details</div>
            <PcbBuildFeeDetail {...subtotal} />
            <div className="model-4">
                <span onClick={handlerCar}>Add to cart</span>
                <span>Buy Now</span>
            </div>
            {
                carDrawerStatus ? <CarDrawer visible={carDrawerStatus}/> : ''
            }
        </div>
    )
    return DOM;
}
export default PcbBuildFee;
