import React, { useState, useEffect } from 'react';
import {PayCircleFilled } from '@ant-design/icons';
import { Row, Col, Typography, Radio, Select } from 'antd';
import Axios from 'axios';
import { useAppState, changeTransportCost } from '../state';
import { SelectValue } from 'antd/lib/select';
import { fetchShipingCost } from './AjaxService';
import countryImg from '../images/libya.png'
import DHL from '../images/dhl.png'
import {getCountryImg} from '../country/index'

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
let cItem: Array<CountryItem> = [];
const ShoppingCast: React.FC<ShoppingCastProps> = (props) =>{
    const { dispatch,subtotal } = useAppState();
    let getCountry =getCountryImg('by')
    useEffect(()=>{
        if (cItem.length === 0){
            Axios.get('http://10.168.8.113:8871/quote/getCountry')
            .then((rep)=>{
            //   console.log(rep.data.data);
              if(rep.data.code === 0){
                cItem = rep.data.data;
                console.log(cItem)
              }
            }).catch((rep)=>{
              console.log(rep)
            })
        }
    },[cItem]);
    // todo 任务1
    // const [countryItems, setCountryItems ] = useState([]);
    const fetchCountryItems = () =>{
        
    }

    const fetchShippingCost = (v: SelectValue) =>{
        // console.log(v);
        const { totalWeight } = subtotal;
        if(totalWeight){
           Axios.all([fetchShipingCost({countryId:v,totalWeight:totalWeight})]).then((v)=>{
                console.log(v);
                const [{data:{data:{shippingCost},code}}] = v;
                if(code === 0){
                    dispatch(changeTransportCost(shippingCost));
                }
           });
        }
        
        // dispatch(fetchTransportCost(v));
    }
    return (
      <div>
          <Row>
            <Col span={24}><Title level={3}><PayCircleFilled /><b>Shipping Cost</b></Title></Col>
          </Row>
          <Row className="shopping-cast-mar">
            <Col span={16}>
                {/* <Select defaultValue='DHL'>
                    <Option value="DHL">DHL</Option>
                </Select>

                <Select 
                    style={{ width: 100 }}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    onFocus={fetchCountryItems}
                    onChange={fetchShippingCost}
                >
                    {
                        cItem && cItem.map(item =>(
                            <Option key={item.id} value={item.id}>{item.name}</Option>
                        ))
                    }
                </Select> */}
                <div className='the_national_flag'>
                    <div className='dhl'><img src={DHL}/></div>
                    <div className='country_img'>
                        <div className='get_img_show'><img src={getCountry || countryImg}/></div>
                        <span>Libya</span>
                    </div>
                </div>
            </Col>
            <Col span={8}><i>${subtotal.shippingFee}</i></Col>
          </Row>
      </div>
    )
}
ShoppingCast.defaultProps = {countryItmes:[{id:1,name:'China'},{id:2,name:'America'},{id:3,name:'Germany'}]}
export default ShoppingCast;