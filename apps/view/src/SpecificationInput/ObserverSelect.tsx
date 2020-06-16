import React, { useEffect } from 'react';
import { Select, Form } from 'antd';
import { domainToUnicode } from 'url';

interface ObserverSelectProps {
    item: Array<string>;
    name: string;
    defauleValue?: string;
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    selectStyle?: React.CSSProperties | undefined;
}

const ObserverSelect: React.FC<ObserverSelectProps> = (props) => {
    const { item, defauleValue, name, value, onChange, disabled, selectStyle } = props;
    const { Option } = Select;
    const onChangeStyle = () => {

    }
    const defaultSelectStyle = { width: '158px' };
    return (
        <Form.Item name={name} noStyle>
            <Select
                style={selectStyle || defaultSelectStyle}
                defaultValue={defauleValue && defauleValue}
                value={value && value}
                onChange={onChange}
                onFocus={onChangeStyle}
                disabled={disabled}
                dropdownStyle={{ textAlign: 'center', overflow: 'auto' }}
                defaultActiveFirstOption={true}
                dropdownClassName={'drop_down'}
            >
                {item.map(item => (
                    <Option key={item} value={item} className='select_style'>
                        {item}
                    </Option>
                ))}
            </Select>
        </Form.Item>
    )
}

export default ObserverSelect;