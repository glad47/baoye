import React from 'react';
import { Row,Typography, Radio, Space } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio/interface';

interface SpecificationHeadProps {
    icon: string;
    title: string;
    handleRadioSwitch: (v: RadioChangeEvent)=>void;
}
const {Title} = Typography;
const titleStyle = {}
const SpecificationHead: React.FC<SpecificationHeadProps> = (props) =>{
    const  {handleRadioSwitch} = props;
    return (
        <Row>
            <Space direction="horizontal" size="large">
                <Title level={2} style={titleStyle}>{props.title}</Title>
                <Radio.Group defaultValue="standard" onChange={handleRadioSwitch}>
                    <Radio.Button value="standard">
                        standard
                    </Radio.Button>
                    <Radio.Button value="special">
                        special
                    </Radio.Button>
                </Radio.Group>
            </Space>
        </Row>
    )
}

export default SpecificationHead;

