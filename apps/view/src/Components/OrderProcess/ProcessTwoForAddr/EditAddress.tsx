import React, {useState} from 'react';
import {
    EditFilled
} from '@ant-design/icons'
import {Space, Checkbox, message} from "antd";
import FormAddress from "./FormAddress";
import {useAppState} from "../../../state";

const EditAddress = () => {
    const { orderOptionsItem } = useAppState();
    const {deliveryAddr} = orderOptionsItem;
    const [editing, setEditing] = useState<boolean>(false);
    const [billingCheck, setBillingCheck] = useState<boolean>(true);

    const handlerEditing = () => {
        setEditing(!editing);
    }

    const handleBillingCheck = () => {
        setBillingCheck(!billingCheck);
    }

    return (
        <div className="edit-address">
            <Space className="header">
                <div onClick={handlerEditing}>
                    <Space>
                        <span>Edit the address</span>
                        <EditFilled />
                    </Space>
                </div>
            </Space>
            {
                editing && <FormAddress closeEdit={() => setEditing(false)}/>
            }
            <Space className="check-unRadius">
                <Checkbox checked={billingCheck} onClick={handleBillingCheck}>
                    Same Billing Address
                </Checkbox>
            </Space>
            {
                !billingCheck && <FormAddress key="addrBilling" />
            }
        </div>
    )
}

export default EditAddress;