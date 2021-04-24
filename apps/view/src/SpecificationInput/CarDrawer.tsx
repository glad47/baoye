import React, {useEffect, useState} from 'react'
import { Drawer } from 'antd';

const CarDrawer = (props: any) => {
    const {visible: propsVisible} = props;
    const [visible, setVisible] = useState(propsVisible);
    const onClose = () => {
        console.log('关闭')
        setVisible(false);
    };
    useEffect(() => {
        console.log('加载抽屉')
    }, []);
    return (
        <Drawer
            title="Basic Drawer"
            placement="right"
            closable={false}
            maskClosable={true}
            onClose={onClose}
            visible={visible}
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Drawer>
    )
}

CarDrawer.defaultProps = {visible: true}

export default CarDrawer