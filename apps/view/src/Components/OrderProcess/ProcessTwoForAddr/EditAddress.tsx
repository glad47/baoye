import React, {useState} from 'react';
import {
    EditFilled
} from '@ant-design/icons'
import {Space, Checkbox, message} from "antd";
import FormAddress from "./FormAddress";
import {useAppState} from "../../../state";

const EditAddress = () => {
    const { orderOptionsItem,dispatch } = useAppState();
    const {deliveryAddr} = orderOptionsItem;
    const [editing, setEditing] = useState<boolean>(false);
    const handlerEditing = () => {
        if (deliveryAddr) {
            setEditing(!editing);
        } else {
            message.warn('please check delivery')
        }
    }
    return (
        <div className="edit-address">
            <Space className="header">
                <div onClick={handlerEditing}>
                    <span>Edit the address</span>
                    <EditFilled />
                </div>
            </Space>
            {
                editing ? <FormAddress closeEdit={() => setEditing(false)}/> : ''
            }
            <Space className="check-unRadius">
                <Checkbox>
                    Same Billing Address
                </Checkbox>
            </Space>
        </div>
    )
}

export default EditAddress;