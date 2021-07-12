import React, {useEffect, useState} from 'react';
import {Row, Form, Col, Input, Tooltip, Button, Select, message} from "antd";
import {
    InfoCircleOutlined
} from '@ant-design/icons'
import {orderOptions, useAppState} from "../../../state";
import {getAllCountry, modifyDeliveryAddress} from "../../../SpecificationInput/AjaxService";

type RequiredMark = boolean | 'optional';

const { TextArea } = Input;
const { Option } = Select;

import emitter from "../../../eventBus";

interface thisInter {
    closeEdit?: any // 退出编辑
}

const FormAddress = (props: thisInter) => {
    const { orderOptionsItem,dispatch } = useAppState();
    const {deliveryAddr} = orderOptionsItem;
    const [form] = Form.useForm();
    const onRequiredTypeChange = () => {};
    const [initialValues, setInitialValues] = useState();
    const [countryList, setCountryList] = useState([]);

    // 获取所有国家
    const initCountryList = () => {
        const session = window.localStorage.getItem("countryList");
        if (session) {
            setCountryList(JSON.parse(session));
        } else {
            getAllCountry().then((res: any) => {
                setCountryList(res);
                window.localStorage.setItem("countryList", JSON.stringify(res));
            })
        }
    }

    // 保存
    const handlerSave = () => {
        const def = {...deliveryAddr};
        const dat = form.getFieldsValue();
        for(let key in dat) {
            def[key] = dat[key];
        }
        modifyDeliveryAddress(def).then(res => {
            const {closeEdit} = props;
            if (closeEdit) {
                closeEdit();
            }
            dispatch(orderOptions({deliveryAddr: def}));
            emitter.emit('updateCurrentAddr',def);
           message.success('edit success');
        });
    }

    useEffect(() => {
        if (deliveryAddr) {
            setInitialValues(deliveryAddr);
        }
        initCountryList();
    }, []);
    return (
        <div className="form-Address">
            <Form
                form={form}
                layout="vertical"
                initialValues={deliveryAddr}
                onValuesChange={onRequiredTypeChange}
            >
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="Country" name="receiverCountry" required>
                            <Select showSearch style={{ width: '100%' }}>
                                {countryList && countryList.map((item: { name: any; id: any; }) => {
                                    return (
                                        <Option value={item.name} key={item.id}>{item.name}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="First Name" name="receiverName" required>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Last Name (Optional)" name="lastName">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Address Line1" name="receiverAddress" required>
                            <TextArea />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Zip Code" name="receiverPostcode" required>
                            <Input
                                suffix={
                                    <Tooltip title="Extra information">
                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                    </Tooltip>
                                }/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="City" name="receiverCity" required>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="State/Territory" name="stateTerritory">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Phone Number" name="receiverTelephone" required>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Button type={"primary"} onClick={handlerSave}>Save</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

FormAddress.defaultProps = {closeEdit: null};
export default FormAddress;