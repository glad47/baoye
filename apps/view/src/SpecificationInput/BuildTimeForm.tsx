import React, { useState } from 'react'
import {ClockCircleFilled } from '@ant-design/icons'
import { Row,Typography, Radio } from 'antd';
import { BuildTimeItem } from '../types';
import { RadioChangeEvent } from 'antd/lib/radio';
import { useAppState, changeUrgentCost } from '../state';



interface BuildTimeFormProps {
    buildItems: Array<BuildTimeItem>
}

const bts = [
    {id: 1,dayNumber:"3day",price:0},
    {id: 2,dayNumber:"48hours",price:22},
    {id: 3,dayNumber:"24hours",price:38},
]
const {Title,Text} = Typography
const BuildTimeForm: React.FC<BuildTimeFormProps> = (props) =>{
    const {buildItems} = props
    const { dispatch, urgentCost } = useAppState();
    const onChange = (e: RadioChangeEvent) =>{
        let v = e.target.value;
        const {price} = buildItems.filter((item)=>{return Number(item.id) === Number(v)})[0]
        dispatch(changeUrgentCost(price))
    }
    return(
       <div>
           <Row>
                <Title level={3}><ClockCircleFilled/><b>Build Time</b></Title>
           </Row>
           <Row>
               <div style={{width:"100px",height:"300px"}}>图片</div>
           </Row>
           <Row>
                <Radio.Group onChange={onChange} defaultValue={buildItems[0].id}>
                    {
                        buildItems.map(item=>(
                            <Radio.Button value={item.id} key={item.id}>{item.dayNumber}</Radio.Button>
                        ))
                    }
                </Radio.Group>
           </Row>
           <Row className="ant-row-cont">
               <Text>quickturn charge</Text>
                <Text><b>${urgentCost}</b></Text>
           </Row>
       </div> 
    )
}
BuildTimeForm.defaultProps = {buildItems: bts}

export default BuildTimeForm;