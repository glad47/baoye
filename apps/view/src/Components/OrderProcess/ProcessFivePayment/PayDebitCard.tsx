import React from 'react';
import '../../../styles/process-five-payment.css'
import {Space, Form, Row, Col, Input} from "antd";
import {
    InfoCircleOutlined
} from '@ant-design/icons'

const PayDebitCard = () => {
    const [form] = Form.useForm();
    return (
        <div className="box-content">
            <Form
                form={form}
                layout="vertical"
            >
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="Card Number" required>
                            <Input
                                prefix={(
                                    <img src={require('../../../images/input_prefix1.png')} alt=""/>
                                )}
                                placeholder={'0000 0000 0000 0000'}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Expiration Date" required>
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
                            tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
                            required>
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