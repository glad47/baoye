import React, {useImperativeHandle, useState} from 'react';
import {
    EditFilled
} from '@ant-design/icons'
import {Space, Checkbox, Radio} from "antd";
import FormAddress from "./FormAddress";
import {useAppState} from "../../../state";

const EditAddress = (props: any) => {
    const { orderOptionsItem } = useAppState();
    const {deliveryAddr} = orderOptionsItem;
    const [editing, setEditing] = useState<boolean>(false);
    const [editingBilling, setEditingBilling] = useState<boolean>(false);
    const [billingCheck, setBillingCheck] = useState<boolean>(true);
    const [currentBill, setCurrentBill] = useState<any>(1);

    const handlerEditing = () => {
        setEditing(!editing);
    }

    const handleBillingCheck = () => {
        setBillingCheck(!billingCheck);
    }
    const billOnChange = (e: any) => {
        const v = e.target.value;
        setCurrentBill(v);
        if (v === 2) {
            setEditingBilling(true);
        }
        handleBillingCheck();
    }

    useImperativeHandle(props.cRef, () => ({
        uiHandlerEditing() {
            handlerEditing();
        }
    }))

    return (
        <div className="edit-address">
            <Space className="header">
                {/*<div onClick={handlerEditing}>*/}
                {/*    <Space>*/}
                {/*        <span>Edit the address</span>*/}
                {/*        <EditFilled />*/}
                {/*    </Space>*/}
                {/*</div>*/}
            </Space>
            {
                editing && <FormAddress closeEdit={() => setEditing(false)}/>
            }
            <Space className="check-unRadius">
                <strong>Billing Address</strong>
            </Space>
            <div className="bill-ul-box">
                <Radio.Group onChange={billOnChange} value={currentBill}>
                    <ul>
                        <li>
                            <Radio value={1}>Same as shipping address</Radio>
                        </li>
                        <li>
                            <Radio value={2}>Use a different billing address</Radio>
                        </li>
                    </ul>
                </Radio.Group>
            </div>
            {
                (!billingCheck && editingBilling) && <FormAddress key="addrBilling" closeEdit={() => setEditingBilling(false)}/>
            }
        </div>
    )
}

export default EditAddress;