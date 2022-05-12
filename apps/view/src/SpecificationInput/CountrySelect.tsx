/*
 * @Author: aziz
 * @Date: 2021-12-20 14:58:08
 * @LastEditors: aziz
 * @LastEditTime: 2022-03-23 18:17:59
 * @Description: file content
 */
import { Select, Spin } from 'antd';
import React, { useState, ReactNode } from 'react';
import axios from 'axios';

interface CountrySelectProps {
  lastFetchId: number;
  fetchCountry?: CountryItem;
}
type CountryItem  = {
  id: number;
  name: string;
}
type CountryType = { value: string | number, label?: ReactNode };
const SS: CountryType = {value:''}; 
const { Option } = Select;
const CountrySelect: React.FC<CountrySelectProps> = (prpos) =>{
  let { lastFetchId } =prpos;
  const [value , setValue] = useState('');
  const [countryItems, setCountryItems] = useState(new Array<CountryItem>());
  const [fetching, setFetching] = useState(false);

  const fetchCountry = (v: string) =>{
    console.log('获取国家',v);
    const fetchid = lastFetchId += 1;
    setFetching(true)
    axios.get('http://localhost:8871/quote/getCountry')
    .then((rep)=>{
      // console.log(rep.data.data);
      // if(fetchid !== lastFetchId) return;
      if(rep.data.code === 0){
        const d = rep.data.data;
        setCountryItems(d);
        setFetching(false);
      }
      
    }).catch((rep)=>{
      console.log(rep)
    })
  }

  const handleChange = (v: string)=>{
    setValue(v);
    setFetching(false);
  }

  return (
    <Select
        showSearch
        value={value}
        placeholder="Select country"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={fetchCountry}
        onChange={handleChange}
        style={{ width: '70%' }}
      >
        {countryItems.map(d => (
          <Option key={d.id} value={d.id}>{d.name}</Option>
        ))}
      </Select>
  )
}

export default CountrySelect;