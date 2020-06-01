import React from 'react';
import { Row,Typography, Radio, Space } from 'antd';
import { ControlFilled } from '@ant-design/icons';

interface SpecificationTitleProps {
    title: string;
}
const {Title} = Typography;
const titleStyle = {}
const SpecificationTitle: React.FC<SpecificationTitleProps> = (props) =>{
    return (
        <Row>
            <Space direction="horizontal" size="large">
                <Title level={2} style={titleStyle}><ControlFilled /><b>{props.title}</b></Title>
            </Space>
        </Row>
    )
}

export default SpecificationTitle;

