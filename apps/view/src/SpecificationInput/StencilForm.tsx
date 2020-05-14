import React from 'react';
import { SwapOutlined, TransactionOutlined, ShoppingCartOutlined, PrinterFilled } from '@ant-design/icons';
import { Row, Col, Select } from 'antd';

interface StencilFormProps { }

const { Option } = Select;

const StencilForm: React.FC<StencilFormProps> = (props) =>{
    return (
      <div>
        <Row>
            <Col span={12}><span>Quantity</span></Col>
            <Col span={12}>
                <Select defaultValue="lucy">
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                </Select>
            </Col>
        </Row>
        <Row>
            <Col span={12}><span>Stencil Side</span></Col>
            <Col span={12}>
                <Select defaultValue="lucy">
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                </Select>
            </Col>
        </Row>
        <Row>
            <Col span={12}><span>Dimensions</span></Col>
            <Col span={12}>
                <Select defaultValue="lucy">
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                </Select>
            </Col>
        </Row>
        <Row>
            <Col span={12}><span>Thickness</span></Col>
            <Col span={12}>
                <Select defaultValue="lucy">
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                </Select>
            </Col>
        </Row>
        <Row>
            <Col span={12}><span>Existing Fiducials</span></Col>
            <Col span={12}>
                <Select defaultValue="lucy">
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                </Select>
            </Col>
        </Row>
      </div>
    )
}

export default StencilForm;