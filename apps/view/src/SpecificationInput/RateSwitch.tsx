import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { baseUrl } from './AjaxService'
import { DollarCircleOutlined, TransactionOutlined, EuroCircleOutlined } from '@ant-design/icons';
interface RateSwitchProps{
    defaultRate: number;
    changeRate: ()=>void;
}

const RateSwitch: React.FC<RateSwitchProps> = (props) =>{
    const {defaultRate, changeRate} = props
    switch (defaultRate) {
        case 0:
            return (<DollarCircleOutlined className="total-transc" onClick={changeRate}/>)
        case 1:
            return (<TransactionOutlined className="total-transc" onClick={changeRate}/>)
        case 2: 
            return (<EuroCircleOutlined className="total-transc" onClick={changeRate}/>)
        default:
            return null;
    }
}

export default RateSwitch;