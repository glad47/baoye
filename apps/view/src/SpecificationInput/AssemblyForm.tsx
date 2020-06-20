import React, { useState } from 'react'
import { Row,Col,Form, Input, Radio, Select } from 'antd';
import { useAppState, changeAssemblyField} from '../state';
import { Store } from 'antd/lib/form/interface';

interface AssemblyFormProps {

}

/** 贴片form表格 */
const AssemblyFrom: React.FC<AssemblyFormProps> = (props) =>{
    const [ form ] = Form.useForm();
    const { assemblyField, dispatch} = useAppState();
    const { Option } = Select;

    const onValuesChange = (v: Store,values: Store) =>{
        if(values.assemblySide && values.quantity && values.throughHolePartNum && values.uniquePartNum && values.assemblySide){
            console.info(values);
            dispatch(changeAssemblyField(values));
        }
    }

    return (
        <Row>
         <Form form={form} initialValues={assemblyField} onValuesChange={onValuesChange}>
            <Row>
               <Col span={12}>
                   <span>Number of SMT Parts</span>
               </Col>
               <Col span={12}>
                   <Form.Item name="smtPartNum">
                       <Input />
                   </Form.Item>
               </Col>
            </Row>
            <Row>
               <Col span={12}>
                   <span>Number of Unique Parts</span>
               </Col> 
               <Col span={12}>
                   <Form.Item name="uniquePartNum">
                       <Input />
                   </Form.Item>
               </Col>
            </Row>
            <Row>
               <Col span={12}>
                   <span>Number of Througt-Hole Parts</span>
               </Col> 
               <Col span={12}>
                   <Form.Item name="throughHolePartNum">
                       <Input />
                   </Form.Item>
               </Col>
            </Row>
            <Row>
               <Col span={12}>
                   <span>Assembly Side</span>
               </Col> 
               <Col span={12}>
                   <Form.Item name="assemblySide">
                       <Select>
                           <Option value="Single Side">Single Side</Option>
                           <Option value="Double Side">Double Side</Option>
                       </Select>
                   </Form.Item>
               </Col>
            </Row>
            <Row>
               <Col span={12}>
                   <span>Quantity</span>
               </Col> 
               <Col span={12}>
                   <Form.Item name="quantity">
                       <Input />
                   </Form.Item>
               </Col>
            </Row>
            <Row>
               <Col span={12}>
                   <span>Assembly Service</span>
               </Col> 
               <Col span={12}>
                   <Form.Item name="assemblyType">
                       <Radio.Group>
                           <Radio value={1}>
                            You Supply Parts, PCBonline only Assembly
                           </Radio>
                           <Radio value={2}>
                            PCBonline Supply Some Parts And Assembly
                           </Radio>
                           <Radio value={3}>
                            PCBonline Supply All Parts And Assembly
                           </Radio>
                       </Radio.Group>
                   </Form.Item>
               </Col>
            </Row>
        </Form>
        </Row>
    )
}

export default AssemblyFrom;