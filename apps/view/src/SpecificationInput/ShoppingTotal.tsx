import React from 'react';
import { SwapOutlined, TransactionOutlined, ShoppingCartOutlined, PrinterFilled } from '@ant-design/icons';
import { Row, Col, Form, Select } from 'antd';

interface ShoppingTotalProps { }

const { Option } = Select;

const ShoppingCast: React.FC<ShoppingTotalProps> = (props) =>{
    return (
      <div>
        <Row>
            <Col span={12}><h5>Tootal</h5></Col>
            <Col span={12}><b>$555</b> <SwapOutlined className="total-swap" /></Col>
        </Row>
        <Row>
            <Col span={12}><i>Currency select</i></Col>
            <Col span={12}><TransactionOutlined className="total-transc" /><strong>¥1000</strong> </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Select className="total-select" defaultValue="lucy">
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                        Disabled
                    </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
            </Col>
        </Row>
        <Row>
            <Col span={14}></Col>
            <Col span={10} className="total-shopping-icon">
                <ShoppingCartOutlined />
                <PrinterFilled />
            </Col>
        </Row>
      </div>
    )
}

export default ShoppingCast;