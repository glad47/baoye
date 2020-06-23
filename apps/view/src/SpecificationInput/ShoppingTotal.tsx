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
    const [goCart, setGoCart] = useState(false);
    const [addCart, setAddCart] = useState(false);
    
    const changeRate = () => {
        if(defaultRate === 2){
            setDefaultRate(0);
        }else{
            setDefaultRate(defaultRate + 1);
        }
    }

    const isShowGo=()=>{
        setGoCart(true)
    }
    const isHideGo=()=>{
        setGoCart(false)
    }
    const isShowAdd=()=>{
        setAddCart(true)
    }
    const isHideAdd=()=>{
        setAddCart(false)
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
                    <img src={require('../images/shoppingCart.png')} onClick={handleAddQuote} onMouseOver={isShowGo} onMouseOut={isHideGo}/>
                    {/* </Link> */}
                    <img src={require('../images/down.png')} onClick={handleGoCar} onMouseOver={isShowAdd} onMouseOut={isHideAdd}/>
                    {goCart?<p className='go_to_cart'>Add to cart</p>:""}
                    {addCart?<p className='add_to_cart'>Checkout</p>:""}
                </Col>
            </Row>
        </div>
    )
}
ShoppingCast.defaultProps = { total: 0 }

export default ShoppingCast;