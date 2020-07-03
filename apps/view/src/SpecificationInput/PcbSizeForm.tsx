import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Select } from 'antd';
import { useForm } from 'antd/lib/form/util';
import { Store } from 'antd/lib/form/interface';
import ObserverSize from './ObserverSize';
import { useAppState, changeSizeField } from '../state';

interface PcbSizeFormProps {}
const boardType = [{id:1,name:'Single'},{id:2,name:'Panel'}];

// const INITIAL = {boardType:'Single'}
const PcbSizeForm: React.FC<PcbSizeFormProps> = (props) =>{
    const { Option } = Select;
    const [form] = useForm();
    const [singleMode, setSingleMode] = useState(true);
    const { dispatch,pcbSizeField } = useAppState();
    const onValuesChange = (v:Store) =>{
        // console.log(Object.values(v)[0])
        switch (Object.values(v)[0]) {
            case 2 : {
                setSingleMode(false)
                break;
            } 
            case 1 : {
                setSingleMode(true)
                break;
            }
        }
        form.submit();
    }
    const onFinish = (v:Store)=>{
        if(Object.values(v)[0] === 'Single'){
            if(Object.values(v)[2] && Object.values(v)[3]){
                dispatch(changeSizeField(v));
            }
        }else{
            if(Object.values(v)[1] && Object.values(v)[2] && Object.values(v)[3]){
                dispatch(changeSizeField(v));
            }
        }
    }
    
    useEffect(()=>{
        // form.validateFields(['panelSize'])
        form.setFieldsValue({...pcbSizeField});   
    },[pcbSizeField])

    return (
        <Form form={form} initialValues={pcbSizeField} onValuesChange={onValuesChange} onFinish={onFinish}>
            <Row>
                <Col span={12} >
                    <Form.Item label="Dimensions" name="boardType">
                        <Select>
                            {
                                boardType.map(item=>(
                                    <Option key={item.id} value={item.id}>{item.name}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="Panel Array" name="panelSize">
                        <ObserverSize isDisabled={singleMode}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Size" name="singleSize">
                        <ObserverSize/>
                    </Form.Item>
                    <Form.Item label="Quantity" name="quantity">
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default PcbSizeForm;