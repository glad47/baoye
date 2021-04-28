import React, {useState} from 'react';
import {Row, Form, Col, Input, Tooltip, Button} from "antd";
import {
    InfoCircleOutlined
} from '@ant-design/icons'

type RequiredMark = boolean | 'optional';

const FormAddress = () => {
    const [form] = Form.useForm();
    const onRequiredTypeChange = () => {}
    return (
        <div className="form-Address">
            <Form
                form={form}
                layout="vertical"
                onValuesChange={onRequiredTypeChange}
            >
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="Country" required>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="First Name" required>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Last Name (Optional)" required>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Address Line1" required>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Address Line2(Optional)" required>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Zip Code" required>
                            <Input
                                suffix={
                                    <Tooltip title="Extra information">
                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                    </Tooltip>
                                }/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="City" required>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="State/Territory" required>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Phone Number" required>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Button type={"primary"}>Save</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default FormAddress;