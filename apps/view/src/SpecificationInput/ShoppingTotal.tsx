import React, { useState, useEffect } from 'react';
import { SwapOutlined, TransactionOutlined, ShoppingCartOutlined, PrinterFilled } from '@ant-design/icons';
import { Row, Col, Select, Button } from 'antd';
import axios from 'axios'

interface ShoppingTotalProps {
    total: number;
    handleAddQuote: () => void;
    handleGoCar: () => void;
}

const { Option } = Select;

const ShoppingCast: React.FC<ShoppingTotalProps> = (props) => {
    const { total, handleAddQuote, handleGoCar } = props;
    // let [totalMoney, changeTotalMoney] = useState('$' + total)
    // let [changeMoney, changeAllMoney] = useState('¥' + (total * 6.8))
    // let [isChangeLocation, changeLocationState] = useState(false)
    const changeLocation = () => {
        // let temple;
        // switch (isChangeLocation) {
        //     case true:
        //         isChangeLocation = false
        //         break;
        //     case false:
        //         isChangeLocation = true;
        //         break;
        //     default:
        //         isChangeLocation = false;
        //         break
        // }
        // changeLocationState(isChangeLocation)
        // if (isChangeLocation) {
        //     temple = totalMoney
        //     totalMoney = changeMoney
        //     changeMoney = temple
        //     changeTotalMoney(totalMoney)
        //     changeAllMoney(changeMoney)
        // } else {
        //     temple = totalMoney
        //     totalMoney = changeMoney
        //     changeMoney = temple
        //     changeTotalMoney(totalMoney)
        //     changeAllMoney(changeMoney)
        // }
    }

    const changeRate = () => {
        console.log('1111')
    }

    // useEffect(() => {
    //     axios.get('http://10.168.8.113:8871/getAllExchangeRate').then(res=>{
    //         console.log(res.data)
    //     })
    // })

    return (
        <div>
            <Row>
                <Col span={12}><h5>Total</h5></Col>
                <Col span={12}><b>{total}</b>
                    <SwapOutlined className="total-swap" onClick={changeLocation} />
                </Col>
            </Row>
            <Row>
                <Col span={12}><i>Currency select</i></Col>
                <Col span={12}><TransactionOutlined className="total-transc" onClick={changeRate} />
                    <strong>¥{(total*6.8).toFixed(2)}</strong>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Select className="total-select" defaultValue="Order description" disabled={true}>
                        {/* <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled={true}></Option>
                        <Option value="Yiminghe">yiminghe</Option> */}
                    </Select>
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