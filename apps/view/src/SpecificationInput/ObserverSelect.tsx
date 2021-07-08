import React, { useEffect } from 'react';
import { Select, Form } from 'antd';
import { domainToUnicode } from 'url';
import {useAppState} from "../state";

interface ObserverSelectProps {
    item: Array<string>;
    name: string;
    defauleValue?: string;
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    selectStyle?: React.CSSProperties | undefined;
    isChange?:any
}

const ObserverSelect: React.FC<ObserverSelectProps> = (props) => {
    const { item, defauleValue, name, value, onChange, disabled, selectStyle,isChange } = props;
    const {svg} = useAppState();
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
                className={isChange?'isTest': (!svg ? 'unUpload': '')}
            >
                {item.map(item => (
                    <Option key={item} value={item} className={`select_style unUpload`}>
                        {item}
                    </Option>
                ))}
            </Select>
        </Form.Item>
    )
}

export default ObserverSelect;