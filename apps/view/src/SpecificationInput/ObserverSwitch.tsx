import React from 'react';
import { Switch,Form } from 'antd';

interface ObserverSwitchProps {
    name?: string;
}

const VALUE_PROP_NAME = "checked";

const ObserverSwitch: React.FC<ObserverSwitchProps> = (props) =>{
    const dataTo=(e:any)=>{
        console.log(props,name)
        console.log(e)
    }
    return (
        <Form.Item name={props.name} valuePropName={VALUE_PROP_NAME} noStyle>
            <Switch onChange={e=>dataTo(e)} checkedChildren="Y" unCheckedChildren="N" className="quoteSwitch"/>
        </Form.Item>
    )
}

export default ObserverSwitch;