import React, {useEffect, useState} from 'react';
import {changeCarDrawer, orderOptions, resetState, useAppState} from "../state";
import CarDrawer from "./CarDrawer";
import PcbBuildFeeDetail from "./PcbBuildFeeDetail";
import { useHistory } from "react-router-dom";
import emitter from "../eventBus";

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
                    dispatch(resetState()); // 清除state
                    dispatch(changeCarDrawer(false));
                }, 6000);
            } else { // 购买 直接跳转到订单页
                const total = Number((subtotal.boardFee + subtotal.engineeringFee + subtotal.testFee + subtotal.urgentFee + subtotal.shippingFee + subtotal.stencilFee + subtotal.assemblyFee).toFixed(2));
                const {totalWeight} = subtotal;
                // 添加购物车成功以后，后端必须返回当前订单的一个标识给我，最好给当前订单的全部信息，/sys/api/quote/query这个接口返回的字段信息，不能给最起码给个订单id（这样前端会进行一次查询所有列表再去筛选订单，没多大必要造成请求浪费）
                // 为什么要订单信息？ 在订单审核页，需要当前订单的id，productNo订单编号、必要字段去发送请求审核
                console.log('subtotal===>',subtotal)
                history.push('/order-process');
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
