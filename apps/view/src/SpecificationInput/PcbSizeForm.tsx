import React from 'react';
import { Row, Col, Form, Input, Select } from 'antd';

interface PcbSizeFormProps {}
const boardType = [{id:1,name:'Single'},{id:2,name:'Panel'}];
const PcbSizeForm: React.FC<PcbSizeFormProps> = (props) =>{
    const { Option } = Select;
    return (
        <Form>
            <Row>
                <Col span={12} >
                    <Form.Item label="Dimensions">
                        <Select>
                            {
                                boardType.map(item=>(
                                    <Option key={item.id} value={item.id}>{item.name}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="Panel Array">
                        <Input.Group size="large">
                            <Row gutter={8}>
                                <Col span={12}>
                                <Input defaultValue="05719" />
                                </Col>
                                <Col span={12}>
                                <Input defaultValue="26899" />
                                </Col>
                            </Row>
                        </Input.Group>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Size">
                        <Input.Group size="large">
                            <Row gutter={8}>
                                <Col span={12}>
                                <Input defaultValue="05719" />
                                </Col>
                                <Col span={12}>
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