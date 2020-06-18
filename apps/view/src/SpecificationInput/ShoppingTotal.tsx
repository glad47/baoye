import React, { useState, useEffect } from 'react';
import { SwapOutlined, ShoppingCartOutlined, PrinterFilled} from '@ant-design/icons';
import { Row, Col, Select, Button, Input } from 'antd';
import axios from 'axios'
import { baseUrl } from './AjaxService';
import RateSwitch from './RateSwitch';

interface ShoppingTotalProps {
    total: number;
    handleAddQuote: () => void;
    handleGoCar: () => void;
}

const { Option } = Select;

type RateItem = {
    id: number
    currency: string
    exchangeRate: number
}
let rItem: Array<RateItem> = [];
const ShoppingCast: React.FC<ShoppingTotalProps> = (props) => {
    const { total, handleAddQuote, handleGoCar } = props;
    const [defaultRate, setDefaultRate] = useState(1);
    const [rateItem, setRateItem] = useState(rItem);
    
    const changeRate = () => {
        if(defaultRate === 2){
            setDefaultRate(0);
        }else{
            setDefaultRate(defaultRate + 1);
        }
    }

    useEffect(() => {
        if(rItem.length === 0){
            axios.get('/getAllExchangeRate')
            .then(rep=>{
                if(rep.data.code === 0){
                    setRateItem(rep.data.data);
                }
            })
        }
    },[])

    return (
        <div>
            <Row>
                <Col span={12}><h5>Total</h5></Col>
                {/* <Col span={12}><b>{total}</b> */}
                <Col span={12}><b>${total}</b>
                    <SwapOutlined className="total-swap"/>
                </Col>
            </Row>
            <Row>
                <Col span={12}><i>Currency select</i></Col>
                <Col span={12}>
                    <RateSwitch defaultRate={defaultRate} changeRate={changeRate} />
                    <strong>{ rateItem.length !== 0 ? (total*rateItem[0].exchangeRate/rateItem[defaultRate].exchangeRate).toFixed(2): 0.00}</strong>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    {/* <Select  defaultValue="Order description" disabled={true}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled={true}></Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select> */}
                    <Input placeholder="Order description" className="total-select"/>
                </Col>
            </Row>
            <Row>
                <Col span={14}></Col>
                <Col span={10} className="total-shopping-icon">
                    {/* <Link to="/quote/goToCart"> */}
                    <Button icon={<ShoppingCartOutlined />} block type="link" onClick={handleGoCar} />
                    {/* </Link> */}
                    <Button icon={<PrinterFilled />} block type="link" onClick={handleAddQuote} />
                </Col>
            </Row>
        </div>
    )
}
ShoppingCast.defaultProps = { total: 0 }

export default ShoppingCast;