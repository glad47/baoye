import React, {useEffect} from 'react';
import {changeCarDrawer, useAppState} from "../state";
import CarDrawer from "./CarDrawer";
import PcbBuildFeeDetail from "./PcbBuildFeeDetail";
import { useHistory } from "react-router-dom";

const PcbBuildFee: React.FC<any> = (props) => {
    const { setIsLogin, handleAddQuote } = props;
    const history = useHistory();
    const { dispatch, carDrawerStatus, subtotal, flagQuoteParams } = useAppState();
    const handlerCar = () => {
        if (flagQuoteParams) {
            const isLogin = sessionStorage.getItem('username');
            if (setIsLogin && !isLogin) {
                setIsLogin(false);
            } else {
                const flg = handleAddQuote();
                if (flg) {
                    dispatch(changeCarDrawer(true));
                    // 定时关闭
                    setTimeout(() => {
                        dispatch(changeCarDrawer(false));
                    }, 6000);
                }
            }
        }
    }

    // 购买 直接跳转到订单页
    const buyNow = () => {
        if (flagQuoteParams) {
            history.push('/order');
        }
    }

    const DOM = (
        <div className="pcb-build-container">
            <div className="cost-d">Cost Details</div>
            <PcbBuildFeeDetail {...subtotal} />
            <div className="model-4">
                <span onClick={handlerCar} className={!flagQuoteParams ? 'disabled' : ''}>Add to cart</span>
                <span onClick={buyNow} className={!flagQuoteParams ? 'disabled' : ''}>Buy Now</span>
            </div>
            {
                carDrawerStatus ? <CarDrawer visible={carDrawerStatus}/> : ''
            }
        </div>
    )
    return DOM;
}
export default PcbBuildFee;
