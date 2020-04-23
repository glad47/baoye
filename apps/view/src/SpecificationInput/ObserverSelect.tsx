import React from 'react';
import { Select } from 'antd';

interface ObserverSelectProps {
    item: Array<string>;
    selectedValue?: string;
    hendleChange?: (value: string) => void;
    defauleValue?: string;      
    value?: string;
    onChange?: (value: string) => void;
}

const ObserverSelect: React.FC<ObserverSelectProps>  = (props) =>{
    const {item, selectedValue,hendleChange,defauleValue} = props;
    const { Option } = Select;
    const defaultSelectStyle = {width: 'auto'};
    return (
        <Select style={defaultSelectStyle} defaultValue={defauleValue && defauleValue} value={selectedValue && selectedValue} onChange={hendleChange}>
            { item.map(item => (
                <Option key={item} value={item}>{item}</Option>
            ))}
        </Select>
    )
}

export default ObserverSelect;