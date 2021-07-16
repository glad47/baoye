import React, {useEffect, useState} from 'react';
import {changeCarDrawer, useAppState} from "../state";
import CarDrawer from "./CarDrawer";
import PcbBuildFeeDetail from "./PcbBuildFeeDetail";
import { useHistory } from "react-router-dom";

const PcbBuildFee: React.FC<any> = (props) => {
    const { setIsLogin, handleAddQuote } = props;
    const history = useHistory();
    const { dispatch, carDrawerStatus, subtotal, flagQuoteParams, addQuoteStatus } = useAppState();
    const [oprType, setOprType] = useState<number>(0);
    const handlerCar = async (type: number | any) => {
        const flg = await handleAddQuote();
        setOprType(type);
        return flg;
    }

    useEffect(() => {
        if (addQuoteStatus) {
            if (oprType === 0) {
                // 定时关闭
                setTimeout(() => {
                    dispatch(changeCarDrawer(false));
                }, 6000);
            } else { // 购买 直接跳转到订单页
                history.push('/order');
            }
        }
    }, [addQuoteStatus]);


    const DOM = (
        <div className="pcb-build-container">
            <div className="cost-d">Cost Details</div>
            <PcbBuildFeeDetail {...subtotal} />
            <div className="model-4">
                <span onClick={() => handlerCar(0)}>Add to cart</span>
                <span onClick={() => handlerCar(1)}>Buy Now</span>
            </div>
            {
                carDrawerStatus ? <CarDrawer visible={carDrawerStatus}/> : ''
            }
        </div>
    )
    return DOM;
}
export default PcbBuildFee;
