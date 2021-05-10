import React, {useEffect} from 'react';
import {changeCarDrawer, useAppState} from "../state";
import CarDrawer from "./CarDrawer";
import PcbBuildFeeDetail from "./PcbBuildFeeDetail";

const PcbBuildFee: React.FC<any> = (props) => {
    const { setIsLogin } = props;
    console.log('props', props)
    const { dispatch, carDrawerStatus, subtotal } = useAppState();
    const handlerCar = () => {
        const isLogin = sessionStorage.getItem('username');
        console.log('isLogin', isLogin)
        if (setIsLogin && !isLogin) {
            setIsLogin(false);
        } else {
            dispatch(changeCarDrawer(true));
        }
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
