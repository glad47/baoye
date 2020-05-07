import React from 'react';
import { Row, Col, Form, Input } from 'antd';

interface PcbSizeFormProps {}

const PcbSizeForm: React.FC<PcbSizeFormProps> = (props) =>{
    return (
        <Form>
            <Row>
                <Col span={12}>
                    <Form.Item label="Dimensions">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Different Design in Panel">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Size">
                        <Input.Group size="large">
                            <Row gutter={8}>
                                <Col span={6}>
                                <Input defaultValue="05719" />
                                </Col>
                                <Col span={6}>
                                <Input defaultValue="26899" />
                                </Col>
                            </Row>
                        </Input.Group>
                    </Form.Item>
                    <Form.Item label="Quantity">
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default PcbSizeForm;