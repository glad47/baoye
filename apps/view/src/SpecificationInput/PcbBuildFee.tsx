import React, {useEffect, useState} from 'react';
import {
    changeCarDrawer,
    orderOptions,
    orderSummaryFun,
    reduxSetCartProcessHasCheck,
    resetState,
    setOrderSummaryStatus,
    useAppState
} from "../state";
import CarDrawer from "./CarDrawer";
import PcbBuildFeeDetail from "./PcbBuildFeeDetail";
import { useHistory } from "react-router-dom";
import emitter from "../eventBus";

const PcbBuildFee: React.FC<any> = (props) => {
    const { setIsLogin, handleAddQuote } = props;
    const history = useHistory();
    const { dispatch, carDrawerStatus, subtotal, flagQuoteParams, addQuoteStatus, ordersBuyNow } = useAppState();
    const [oprType, setOprType] = useState<number>(0);
    const handlerCar = async (type: number | any) => {
        const flg = await handleAddQuote();
        setOprType(type);
        return flg;
    }

    /**
     * 清除页面所有数据以及表单、文件类
     */
    const handleClear = () => {
        // 删除页面文件
        emitter.emit('Emi_HandleCloseFile');
        // 清除PcbSizeForm表单
        emitter.emit('Emi_ClearPcbSizeForm');
        dispatch(resetState());
    }

    useEffect(() => {
        if (addQuoteStatus) {
            if (oprType === 0) {
                handleClear();
                dispatch(changeCarDrawer(true));
                // 清除页面所有数据以及表单、文件类
                // 定时关闭
                setTimeout(() => {
                    // dispatch(resetState()); // 清除state
                    dispatch(changeCarDrawer(false));
                }, 6000);
            } else {
                const {subtotal, weight, id} =ordersBuyNow
                dispatch(orderOptions({ordersItem: [{record: ordersBuyNow}]}))
                dispatch(orderSummaryFun({total: subtotal, weight}))
                // 购买 直接跳转到订单页
                dispatch(setOrderSummaryStatus({ process: 2 }))
                // 设置可点击购物车
                dispatch(reduxSetCartProcessHasCheck([1]))
                history.push(`/order-process`)
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
