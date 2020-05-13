import React from 'react';
import {PayCircleFilled } from '@ant-design/icons';
import { Row,Typography, Radio, Select } from 'antd';

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
    return (
      <div>
          <Row>
            <Title level={3}><PayCircleFilled /><b>Shopping Cast</b></Title>
          </Row>
          <Row className="cast-option">
          <div>
                <Select>
                    <Option value="DHL">DHL</Option>
                </Select>

                <Select>
                    {
                        countryItmes && countryItmes.map(item =>(
                            <Option key={item.id} value={item.id}>{item.name}</Option>
                        ))
                    }
                </Select>
            </div>
            <span>${ shoppingCast }</span>
          </Row>
      </div>
    )
}
ShoppingCast.defaultProps = {countryItmes:[{id:1,name:'china'},{id:2,name:'us'}]}
export default ShoppingCast;