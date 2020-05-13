import React, { useState } from 'react'
import {ClockCircleFilled } from '@ant-design/icons'
import { Row,Typography, Radio } from 'antd';


type BuildItem = {
    id: number,
    dayNumber: string,
    price: number
}

interface BuildTimeFormProps {
    buildItems?: Array<BuildItem>
}

const bts = [
    {id: 1,dayNumber:"3day",price:0},
    {id: 2,dayNumber:"48hours",price:22},
    {id: 1,dayNumber:"24hours",price:38},
]
const {Title,Text} = Typography
const BuildTimeForm: React.FC<BuildTimeFormProps> = (props) =>{
    const {buildItems} = props
    const [urgentCast, setUrgentCast] = useState(0);
    return(
       <div>
           <Row>
                <Title level={3}><ClockCircleFilled/><b>Build Time</b></Title>
           </Row>
           <Row>
               <div style={{width:"100px",height:"300px"}}>图片</div>
           </Row>
           <Row>
                <Radio.Group onChange={(e)=>{setUrgentCast(e.target.value)}} defaultValue={buildItems&&buildItems[0].price}>
                    {
                        buildItems&&buildItems.map(item=>(
                            <Radio.Button value={item.price} key={item.price}>{item.dayNumber}</Radio.Button>
                        ))
                    }
                </Radio.Group>
           </Row>
           <Row className="ant-row-cont">
               <Text>quickturn charge</Text>
                <Text><b>$ {urgentCast}</b></Text>
           </Row>
       </div> 
    )
}
BuildTimeForm.defaultProps = {buildItems: bts}

export default BuildTimeForm;