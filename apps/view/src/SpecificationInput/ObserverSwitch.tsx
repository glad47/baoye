import React from 'react';
import { Switch,Form } from 'antd';

interface ObserverSwitchProps {
    name?: string;
}

const VALUE_PROP_NAME = "checked";

const ObserverSwitch: React.FC<ObserverSwitchProps> = (props) =>{
    return (
        <Form.Item name={props.name} valuePropName={VALUE_PROP_NAME} noStyle>
            <Switch/>
        </Form.Item>
    )
}

export default ObserverSwitch;