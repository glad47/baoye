import React from 'react';
import { Select,Form } from 'antd';

interface ObserverSelectProps {
    item: Array<string>;
    name: string;
    defauleValue?: string;      
    value?: string;
    onChange?: (value: string) => void;
}

const ObserverSelect: React.FC<ObserverSelectProps>  = (props) =>{
    const {item, defauleValue, name, value, onChange} = props;
    const { Option } = Select;
    const defaultSelectStyle = {width: 'auto'};
    return (
        <Form.Item name={name} noStyle>
            <Select style={defaultSelectStyle} defaultValue={defauleValue && defauleValue} value={value && value} onChange={onChange}>
                { item.map(item => (
                    <Option key={item} value={item}>{item}</Option>
                ))}
            </Select>
        </Form.Item>
    )
}

export default ObserverSelect;