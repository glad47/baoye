import React, { useState } from 'react';
import {PayCircleFilled } from '@ant-design/icons';
import { Row, Col, Typography, Radio, Select } from 'antd';

type CountryItem = {
    id: number
    name: string
}

type CouriersItems = {
    id: number
    courierName: string
}

interface ShoppingCastProps {
    countryItmes?: Array<CountryItem>
    couriersItems?: Array<CouriersItems>
    shoppingCast?: 500
}

const {Title,Text} = Typography
const { Option } = Select;
const ShoppingCast: React.FC<ShoppingCastProps> = (props) =>{
    const { countryItmes,shoppingCast } = props;
    // todo 任务1
    // const [countryItems, setCountryItems ] = useState([]);

    const fetchCountry = (value: string) =>{
        fetch('http://localhost:8871/quote/getCountry')
            .then(response => response.json())
            .then(body =>{
                body.results.map(() =>({
                    
                }))
            })
    }
    return (
      <div>
          <Row>
            <Col span={24}><Title level={3}><PayCircleFilled /><b>Shopping Cast</b></Title></Col>
          </Row>
          <Row className="shopping-cast-mar">
            <Col span={16}>
                <Select defaultValue='DHL'>
                    <Option value="DHL">DHL</Option>
                </Select>

                <Select 
                    showSearch
                    labelInValue
                    onSearch={fetchCountry}
                >
                    {
                        countryItmes && countryItmes.map(item =>(
                            <Option key={item.id} value={item.id}>{item.name}</Option>
                        ))
                    }
                </Select>
            </Col>
            <Col span={8}><i>$555</i></Col>
            
          </Row>
      </div>
    )
}
ShoppingCast.defaultProps = {countryItmes:[{id:1,name:'china'},{id:2,name:'us'}]}
export default ShoppingCast;