import React, {useEffect} from 'react';
import {changeCarDrawer, useAppState} from "../state";
import CarDrawer from "./CarDrawer";
import PcbBuildFeeDetail from "./PcbBuildFeeDetail";
import { useHistory } from "react-router-dom";

const PcbBuildFee: React.FC<any> = (props) => {
    const { setIsLogin, handleAddQuote } = props;
    const history = useHistory();
    const { dispatch, carDrawerStatus, subtotal, flagQuoteParams } = useAppState();
    const handlerCar = async (type: number | any) => {
        const flg = await handleAddQuote();
        if (flg) {
            dispatch(changeCarDrawer(true));
            if (type === 1) {
                if (flagQuoteParams) {
                    history.push('/order');
                }
            } else {
                // 定时关闭
                setTimeout(() => {
                    dispatch(changeCarDrawer(false));
                }, 6000);
            }
        }
    }

    // 购买 直接跳转到订单页
    const buyNow = async () => {
        await handlerCar(1);
    }

    const DOM = (
        <div className="pcb-build-container">
            <div className="cost-d">Cost Details</div>
            <PcbBuildFeeDetail {...subtotal} />
            <div className="model-4">
                <span onClick={handlerCar}>Add to cart</span>
                <span onClick={buyNow}>Buy Now</span>
            </div>
            {
                carDrawerStatus ? <CarDrawer visible={carDrawerStatus}/> : ''
            }
        </div>
    )
    return DOM;
}
export default PcbBuildFee;
