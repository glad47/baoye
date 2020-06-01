import React, { useState } from 'react'
import { Row,Col,Form, Input, Radio } from 'antd';
import { useAppState } from '../state';

interface AssemblyFormProps {

}

/** 贴片form表格 */
const AssemblyFrom: React.FC<AssemblyFormProps> = (props) =>{
    const [ form ] = Form.useForm();
    const { assemblyField, dispatch} = useAppState();
    return (
        <Row>
         <Form form={form} initialValues={assemblyField}>
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
                       <Input />
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