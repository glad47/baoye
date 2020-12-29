import React, { useState, useEffect } from 'react';
import { SwapOutlined, ShoppingCartOutlined, PrinterFilled } from '@ant-design/icons';
import { Row, Col, Select, Button, Input } from 'antd';
import axios from 'axios'
import { baseUrl } from './AjaxService';
import RateSwitch from './RateSwitch';
import GerberUpload from '../SpecificationInput/GerberUpload'

interface ShoppingTotalProps {
    total: number;
    handleAddQuote: () => void;
    handleGoCar: () => void;
    isMobileSize?: boolean;
    handMobileTool?:any;
    isTool?:boolean;
    loginName?: any;
    setLoginMessage?: any
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
    const [closePrompt, setClosePrompt] = useState(false)

    const changeRate = () => {
        if (defaultRate === 2) {
            setDefaultRate(0);
        } else {
            setDefaultRate(defaultRate + 1);
        }
    }

    const isShowGo = () => {
        setGoCart(true)
    }
    const isHideGo = () => {
        setGoCart(false)
    }
    const isShowAdd = () => {
        setAddCart(true)
    }
    const isHideAdd = () => {
        setAddCart(false)
    }
    const closeTotalPrompt = () => {
        setClosePrompt(false)
    }
    const showTotalPrompt = () => {
        setClosePrompt(true)
    }
    useEffect(() => {
        if (rItem.length === 0) {
            axios.get(baseUrl + 'quoteConfig/getAllExchangeRate')
                .then(rep => {
                    if (rep.data.code === 0) {
                        setRateItem(rep.data.data);
                    }
                })
        }
    }, [])

    return (
        <div>
            {(props.isTool && props.isMobileSize) && <Row className='mobile-total-money'>
                <Col span={12}><h5>Total</h5></Col>
                {/* <Col span={12}><b>{total}</b> */}
                <Col span={12} className='mobile-total-total'><b>${total}</b>
                    <SwapOutlined className="total-swap" />
                    <span className='increase-distance' />
                </Col>
            </Row>}
            <Row className='mobile-total-cost'>
                <Col span={12}><i>Currency select</i></Col>
                <Col span={12}>
                    <RateSwitch defaultRate={defaultRate} changeRate={changeRate} />
                    <strong>{rateItem.length !== 0 ? (total * rateItem[0].exchangeRate / rateItem[defaultRate].exchangeRate).toFixed(2) : 0.00}</strong>
                </Col>
            </Row>
            <Row className='mobile-total-description'>
                <Col span={24}>
                    {/* <Select  defaultValue="Order description" disabled={true}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled={true}></Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select> */}
                    <Input placeholder="Order description" className="total-select" />
                </Col>
            </Row>
            {!props.isMobileSize ? <Row className='mobile-total-add'>
                <Col span={14}></Col>
                <Col span={10} className="total-shopping-icon">
                    {/* <Link to="/quote/goToCart"> */}
                    <img src={require('../images/shoppingCart.png')} onClick={handleAddQuote} onMouseOver={isShowGo} onMouseOut={isHideGo} />
                    {/* </Link> */}
                    <img src={require('../images/down.png')} onClick={showTotalPrompt} onMouseOver={isShowAdd} onMouseOut={isHideAdd} />
                    {goCart ? <p className='go_to_cart'>Add to cart</p> : ""}
                    {addCart ? <p className='add_to_cart'>Checkout</p> : ""}
                </Col>
            </Row> :
                <div className='mobile-pay-cash'>
                    <div className='mobile-pay-icon' onClick={props.handMobileTool}>
                        <img src={require('../images/orders.png')} alt='shopping cart' />
                    </div>
                    <div className='mobile-pay-icon'>
                        <GerberUpload loginName={props.loginName} setLoginMessage={props.setLoginMessage}/>
                    </div>
                    <div className='mobile-pay-icon'>
                        <img src={require('../images/gouwuchekong.png')} alt='shopping cart' onClick={handleAddQuote} />
                    </div>
                    <div className='mobile-pay-icon'>
                        <img src={require('../images/weibiaoti-.png')} alt='order pages' onClick={showTotalPrompt} />
                    </div>
                </div>}
            {closePrompt ? <div className='total-box'>
                <div className='pay-dialog'>
                    <p className='pay-dialog-prompt'>Are you sure to pay for only the current PCB? </p>
                    <div className='pay-dialog-ask'>
                        <button onClick={handleGoCar}>Yes, check out.</button>
                        <button onClick={closeTotalPrompt}>No, add more.</button>
                    </div>
                </div>
            </div> : ""}
        </div>
    )
}
ShoppingCast.defaultProps = { total: 0 }

export default ShoppingCast;