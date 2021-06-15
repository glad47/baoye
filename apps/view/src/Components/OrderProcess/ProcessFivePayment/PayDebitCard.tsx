import React, {useEffect, useState} from 'react';
import '../../../styles/process-five-payment.css'
import {Space, Form, Row, Col, Input} from "antd";
import {
    InfoCircleOutlined
} from '@ant-design/icons'


const PayDebitCard = (props: any) => {
    const [form] = Form.useForm();
    const [initValues, setInitValues] = useState({
        CardNumber: 4711100000000000,
        ExpirationData: '06/28',
        CCV: 123,
    });


    const handleOnFinish = (values: any) => {
        const _dis = ['ExpirationData'];
        const dtd: any = {};
        Object.keys(values).forEach((key: any) => {
            if (_dis.indexOf(key) > -1) {
                const _date = values[key];
                const str = _date.split('/');
                ([dtd.expiration_month] = str);
                ([,dtd.expiration_year] = str);
            } else {
                dtd[key] = values[key];
            }
        });
        props.submitDebit(dtd, 2);
    }


    return (
        <div className="box-content">
            {/*<button onClick={pay}>开始交易</button>*/}
            <Form
                form={form}
                initialValues={initValues}
                layout="vertical"
                onFinish={handleOnFinish}
            >
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="Card Number" name="card_no" rules={[{ required: true }]}>
                            <Input
                                prefix={(
                                    <img src={require('../../../images/input_prefix1.png')} alt=""/>
                                )}
                                placeholder={'0000 0000 0000 0000'}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Expiration Date" name="ExpirationData" rules={[{ required: true }]}>
                            <Input
                                prefix={(
                                    <img src={require('../../../images/input_prefix2.png')} alt=""/>
                                )}
                                placeholder={'MM/YY'}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Secure Code"
                            name="cvv"
                            tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
                            rules={[{ required: true }]}>
                            <Input
                                prefix={(
                                    <img src={require('../../../images/input_prefix3.png')} alt=""/>
                                )}
                                placeholder={'CVC/CVV'}/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Space>
                            <img src={require("../../../images/lock.png")} alt=""/>
                            <span>All transactions are secured and encrypted</span>
                        </Space>
                    </Col>
                    <Col span={24}>
                        <button className="btn global-primary">PAY NOW</button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default PayDebitCard;