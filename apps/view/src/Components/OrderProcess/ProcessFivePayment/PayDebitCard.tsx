import React, {useEffect, useState} from 'react';
import '../../../styles/process-five-payment.css'
import {Space, Form, Row, Col, Input} from "antd";
import {
    InfoCircleOutlined
} from '@ant-design/icons'

const qs = require('querystring')


const PayDebitCard = () => {
    const [form] = Form.useForm();
    const [initValues, setInitValues] = useState({
        CardNumber: 4711100000000000,
        ExpirationData: '06/28',
        CCV: 123,
    });
    const startOrder = {
        version: '3.0',
        merchant_id: 1557899299,
        business_id: 1557899299001,
        access_type: 's2s',
        order_number: 11223355454,
        trans_type: 'authorization',
        trans_channel: 'cc', // cc: 信用卡 ll: 本地支付
        pay_method: 'normal',
        trans_timeout: 10,
        url: 'localhost',
        currency: '',
        amount: 1, // 交易金额
        settle_currency: 'USD', // 结算币种
        product_info: {name: 'nike', price: 500},
        pay_method_info: initValues, // 交易信用卡信息
        country: 'US', // 国家二字代码
        language: 'zh', // 国家语言代码
        terminal_type: 0, // 终端类型 web/h5
        dcc: '',
        notify_url: '', // 商户服务器接收 晶粒 异步结果的通知地址
        redirect_url: '', // 商户交易结果回调地址，用于浏览器跳转
        sign_type: 'MD5', // MD5/SHA256
        sign: ''
    }

    useEffect(() => {
        const aa = qs.encode(startOrder)
        // md5签名加密
        console.log(aa)
    }, [])
    return (
        <div className="box-content">
            <Form
                form={form}
                initialValues={initValues}
                layout="vertical"
            >
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="Card Number" name="CardNumber" required>
                            <Input
                                prefix={(
                                    <img src={require('../../../images/input_prefix1.png')} alt=""/>
                                )}
                                placeholder={'0000 0000 0000 0000'}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Expiration Date" name="ExpirationData" required>
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
                            name="CCV"
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