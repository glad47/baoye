import React from 'react';
import { Form } from 'antd';
import ObserverSelect from './ObserverSelect';

interface LinkageFieldItemProps {
    showTg: boolean
    vaule?: string
    onChange?: (v: string) => void
}
const tgSelectData = ['135','140','150','170','180']
const heatConductivitySelectData = ['1W','2W','3W']

const LinkageFieldItem: React.FC<LinkageFieldItemProps> = (props) =>{
    const {showTg} = props;

    return showTg ?  <Form.Item label="TG(℃)">
                        <ObserverSelect item={tgSelectData} name={"tg"} />
                    </Form.Item>
                : <Form.Item label="Heat Conductivity">
                <ObserverSelect item={heatConductivitySelectData} name={"heatConductivity"}/>
            </Form.Item>  
}

export default LinkageFieldItem;