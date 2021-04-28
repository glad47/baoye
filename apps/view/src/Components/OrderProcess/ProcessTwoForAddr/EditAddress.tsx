import React, {useState} from 'react';
import {
    EditFilled
} from '@ant-design/icons'
import {Space, Checkbox} from "antd";
import FormAddress from "./FormAddress";

const EditAddress = () => {
    const [editing, setEditing] = useState<boolean>(false)
    return (
        <div className="edit-address">
            <Space className="header">
                <div onClick={() => {setEditing(!editing)}}>
                    <span>Edit the address</span>
                    <EditFilled />
                </div>
            </Space>
            {
                editing ? <FormAddress /> : ''
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