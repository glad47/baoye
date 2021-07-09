import React from 'react';
import { Row,Typography, Radio, Space } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import { useAppState, setFieldMode } from '../state';
import { ControlFilled } from '@ant-design/icons';

interface SpecificationHeadProps {
    icon: string;
    title: string;
    description: string;
    handleRadioSwitch?: (v: RadioChangeEvent)=>void;
}
const p_style = {
    fontFamily: 'ArialMT',
    fontSize: '14px',
    color: '#666666',
    padding: '6px 3px',
    letterSpacing: 0
}
const {Title} = Typography;
const titleStyle = {}
const SpecificationHead: React.FC<SpecificationHeadProps> = (props) =>{
    const { dispatch,fieldMode } = useAppState();
    let left_img=fieldMode=='standard' ?require(('../images/left_moon.png')) : require('../images/right_moon.png')
    let right_img=fieldMode=='standard' ?require(('../images/right_moon.png')) : require('../images/left_moon.png')
    let is_rote=fieldMode=='standard' ? 'left_moon' :'left_rote_moon'
    let right_rote=fieldMode=='standard' ? 'moon' :'right_rote_moon'
    return (
        <Row>
            <Space direction="horizontal" size="large">
                <Title level={2} style={titleStyle}>
                    <ControlFilled />
                    <b>{props.title}</b>
                </Title>
                <Radio.Group defaultValue="standard" onChange={ (v)=>dispatch(setFieldMode(v.target.value))}>                  
                    <Radio.Button value="standard">
                        {/*<img className={is_rote} src={left_img}/>*/}
                        standard
                    </Radio.Button>
                    <Radio.Button value="special">
                        {/*<img className={right_rote} src={right_img}/>*/}
                        special
                    </Radio.Button>
                </Radio.Group>
            </Space>
            <p style={p_style} id="specificationHeadDesc">{props.description}</p>
        </Row>
    )
}

export default SpecificationHead;

