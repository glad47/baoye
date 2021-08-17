import React, {useEffect, useState} from 'react'
import { Drawer } from 'antd';
import {changeCarDrawer, useAppState} from "../state";
import CarList from "./CarList";

const CarDrawer = (props: any) => {
    const { dispatch, carDrawerStatus, user } = useAppState();
    const [listLen, setListLen] = useState<number>(0);
    const onClose = () => {
        dispatch(changeCarDrawer(false));
    };

    const drawerOptions = {
        width: 440,
        closable: false,
        maskClosable: true,
        onClose: onClose,
        zIndex: 9999999999,
        visible: carDrawerStatus
    }
    return (
        <Drawer {...drawerOptions} className="car-drawer">
            <div className="car-drawer-box">
                <div className="lef-li">
                    <div className="car-header">
                        Shopping Cart ({user.cartNum})
                    </div>
                    <div className="car-container">
                        <CarList setLen={(num: number) => setListLen(num)}/>
                    </div>
                </div>
                <div className="rig-close">
                    <div onClick={onClose}>
                        X
                        <br />
                        Close
                    </div>
                </div>
            </div>
        </Drawer>
    )
}

CarDrawer.defaultProps = {visible: true}

export default CarDrawer