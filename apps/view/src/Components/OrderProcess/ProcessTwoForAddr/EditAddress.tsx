import React, {useImperativeHandle, useState} from 'react';
import {
    CheckOutlined, CloseOutlined,
    EditFilled
} from '@ant-design/icons'
import {Space, Checkbox, Radio} from "antd";
import FormAddress from "./FormAddress";
import {useAppState} from "../../../state";

const EditAddress = (props: any) => {
    const {orderOptionsItem} = useAppState();
    const {deliveryAddr} = orderOptionsItem;
    const [editing, setEditing] = useState<boolean>(false);
    const [editingBilling, setEditingBilling] = useState<boolean>(false);
    const [billingCheck, setBillingCheck] = useState<boolean>(true);
    const [currentBill, setCurrentBill] = useState<any>(1);
    const [closeIcon, setCloseIcon] = useState<boolean>(false);
    const obj =
        {
            "id": 560,
            "receiverCompany": null,
            "receiverEmail": null,
            "receiverName": "666",
            "receiverTelephone": "12",
            "receiverCountry": "China",
            "receiverCountryName": null,
            "receiverCity": "12",
            "receiverPostcode": "12",
            "receiverAddress": "12",
            "gmtModified": 1626357543000,
            "gmtCreate": 1626357543000,
            "isDefault": 1,
            "courierName": null,
            "courierAccount": null,
            "lastName": "12",
            "stateTerritory": "21"
        }

    const hoverIcon = () => {
        setCloseIcon(false);
        setEditingBilling(true);
    }

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
                        <li className="li-addr">
                            <div>
                                <Radio value={2}>Use a different billing address</Radio>
                            </div>
                            {
                                !billingCheck && !editingBilling &&
                                <div className="addr">
                                    <Space>
                                        <span>
                                            {
                                                deliveryAddr &&
                                                <>
                                                    {deliveryAddr.receiverAddress},
                                                    {deliveryAddr.receiverCountryName},
                                                    {deliveryAddr.receiverCountry},
                                                    {deliveryAddr.receiverName},
                                                    {deliveryAddr.lastName},
                                                    {deliveryAddr.receiverTelephone}
                                                </>
                                            }
                                        </span>
                                        <span className="icon"
                                              onMouseEnter={() => setCloseIcon(true)}
                                              onMouseLeave={() => setCloseIcon(false)}>
                                            {
                                                closeIcon ?
                                                    <CloseOutlined style={{fontSize: '20px', cursor: 'pointer'}} onClick={hoverIcon} /> :
                                                    <CheckOutlined style={{color: '#1CA159', fontSize: '20px'}} />
                                            }
                                        </span>
                                    </Space>
                                </div>
                            }
                        </li>
                    </ul>
                </Radio.Group>
            </div>
            {
                (!billingCheck && editingBilling) &&
                <FormAddress key="addrBilling" closeEdit={() => setEditingBilling(false)}/>
            }
        </div>
    )
}

export default EditAddress;