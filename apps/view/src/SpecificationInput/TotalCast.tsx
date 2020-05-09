import React from 'react';
import { Row,Typography, Radio } from 'antd';

interface TotalCastProps {}

const { Title } = Typography
const TotalCast: React.FC<TotalCastProps> = (props)=>{
    return (
        <div>
            <Title level={3}>Total</Title> 
            <Row>
                <Title level={4}>Currency select</Title>
            </Row>

            
        </div>
    )
}

export default TotalCast;