import React from 'react';
import { SwapOutlined, TransactionOutlined, ShoppingCartOutlined, PrinterFilled } from '@ant-design/icons';
import { Row, Col, Select, Button } from 'antd';
interface ShoppingTotalProps { 
    total: number;
    handleAddQuote: () => void;
    handleGoCar: ()=>void;
}

const { Option } = Select;

const ShoppingCast: React.FC<ShoppingTotalProps> = (props) =>{
    const { total,handleAddQuote,handleGoCar } = props;
    return (
      <div>
        <Row>
            <Col span={12}><h5>Total</h5></Col>
            <Col span={12}><b>${total}</b> <SwapOutlined className="total-swap" /></Col>
        </Row>
        <Row>
            <Col span={12}><i>Currency select</i></Col>
        <Col span={12}><TransactionOutlined className="total-transc" /><strong>¥{(total*6.8).toFixed(2)}</strong> </Col>
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
                {/* <Link to="/quote/goToCart"> */}
                <Button icon={<ShoppingCartOutlined />} block type="link" onClick={handleGoCar}/>
                {/* </Link> */}
                

                <Button icon={<PrinterFilled />} block type="link" onClick={handleAddQuote}/>
            </Col>
        </Row>
      </div>
    )
}
ShoppingCast.defaultProps = {total:0}

export default ShoppingCast;