/*
 * @Descripttion: TG跟导热之间的转换，当选择FR4出现TG，当选择AL出现导热系数
 * @version: 1.0
 * @Author: 
 * @Date: 2021-07-17 11:10:06
 * @LastEditors: ho huang
 * @LastEditTime: 2021-09-04 18:53:26
 */
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