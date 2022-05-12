import React, { useState, useEffect } from 'react';
import { PayCircleFilled, DollarCircleOutlined } from '@ant-design/icons';
import { Row, Col, Typography, Radio, Select } from 'antd';
import Axios from 'axios';
import { useAppState, changeTransportCost } from '../state';
import { SelectValue } from 'antd/lib/select';
import { fetchShipingCost, baseUrl } from './AjaxService';
import DHL from '../images/dhl.png'


type CountryItem = {
    id: number
    name: string
    countryCode: string
}

type CouriersItems = {
    id: number
    courierName: string
}

interface ShoppingCastProps {
    countryItmes?: Array<CountryItem>
    couriersItems?: Array<CouriersItems>
    shoppingCast?: 500
    isMobileSize?: boolean
}

const { Title, Text } = Typography
const { Option } = Select;
let cItem: Array<CountryItem> = [];
const ShoppingCast: React.FC<ShoppingCastProps> = (props) => {
    const { dispatch, subtotal } = useAppState();
    let [countryItem, setCountryItem] = useState(cItem);
    let countryIcon = 'ac'

    useEffect(() => {
        if (cItem.length === 0) {
            Axios.get(baseUrl + 'v1/quote/getCountry')
                .then((rep) => {
                    //   console.log(rep.data.data);
                    if (rep.data.code === 0) {
                        cItem = rep.data.data;                       // setCountryItem(rep.data.data);
                        setCountryItem(rep.data.data);
                    }
                }).catch((rep) => {
                    console.log(rep)
                })
        }
    }, [countryItem]);
    // todo 任务1
    // const [countryItems, setCountryItems ] = useState([]);
    const fetchCountryItems = () => {

    }

    const changName = (n: string) => {
        let newName = ''
        if (n) {
            newName = n.toLocaleLowerCase()
            return newName
        } else {
            return countryIcon
        }
    }

    const fetchShippingCost = (v: SelectValue) => {
        const { totalWeight } = subtotal;
        if (totalWeight) {
            Axios.all([fetchShipingCost({ countryId: v, totalWeight: totalWeight })]).then((v) => {
                const [{ data: { data: { shippingCost }, code } }] = v;
                if (code === 0) {
                    dispatch(changeTransportCost(shippingCost));
                }
            });
        }
        // dispatch(fetchTransportCost(v));
    }

    const chooseCourier = (v: SelectValue) => {
        const courier = String(v)
        // console.log(courier)
    }
    return (
        !props.isMobileSize ? <div>
            <Row>
                <Col span={24}><Title level={3}><DollarCircleOutlined className='cost-title' /> <b>Shipping Cost</b></Title></Col>
            </Row>
            <Row className="shopping-cast-mar">
                <Col span={20}>
                    <Select defaultValue='DHL' className='express_choose' bordered={false} onChange={chooseCourier}>
                        <Option value="DHL" >
                            <img src={DHL} className='express_logo' />
                        </Option>
                        <Option value="ups" >
                            <img src={require('../images/ups.png')} className='express_logo' />
                        </Option>
                        <Option value="fedex" >
                            <img src={require('../images//fedex.png')} className='express_logo' />
                        </Option>
                    </Select>

                    <Select
                        placeholder="Select Your Country"
                        style={{ width: 100 }}
                        showSearch
                        optionLabelProp="children"
                        optionFilterProp="children"
                        onFocus={fetchCountryItems}
                        onChange={fetchShippingCost}
                        filterOption={(input, option) =>
                            option?.label?.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        className='country_select'
                        dropdownClassName="country-select"
                        bordered={false}
                        defaultValue={countryItem.length != 0 ? 101 : undefined}
                    >
                        {
                            cItem && cItem.map(item => (
                                <Option key={item.id} value={item.id} label={item.name}>
                                    <img src={require('../images/countryFlag/flag_' + changName(item.countryCode) + '.png')} className='all_country_logo' />
                                    <span className='country_name'>{item.name}</span>
                                </Option>
                            ))

                        }

                    </Select>
                </Col>
                <Col span={4}><i>${subtotal.shippingFee}</i></Col>
            </Row>
        </div >
            : <div className='mobile-address'>
                <div className='mobile-shipping-cost'>Shipping Cost: <span>${subtotal.shippingFee}</span></div>
                <Select defaultValue='DHL' className='express_choose' bordered={false} onChange={chooseCourier}>
                    <Option value="DHL" >
                        DHL
                    </Option>
                    <Option value="ups" >
                        UPS
                    </Option>
                    <Option value="fedex" >
                        Fedex
                    </Option>
                </Select>
            </div>
    )
}
// ShoppingCast.defaultProps = { countryItmes: [{ id: 1, name: 'China' }, { id: 2, name: 'America' }, { id: 3, name: 'Germany' }] }
export default ShoppingCast;
