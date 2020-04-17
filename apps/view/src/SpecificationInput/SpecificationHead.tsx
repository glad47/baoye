import React from 'react';
import { Row,Typography, Radio } from 'antd';

interface SpecificationHeadProps {
    icon: string;
    title: string;

}
const {Title} = Typography;
const titleStyle = {}
const SpecificationHead: React.FC<SpecificationHeadProps> = (props) =>{
    return (
        <Row>
            <Title level={2} style={titleStyle}>{props.title}</Title>
            <Radio.Group>
                <Radio.Button value="general">
                    general
                </Radio.Button>
                <Radio.Button value="special">
                    special
                </Radio.Button>
            </Radio.Group>
        </Row>
    )
}

export default SpecificationHead;

