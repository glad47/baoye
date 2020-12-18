import React from 'react'
import { Row, Col, Form, Input, Radio, Select } from 'antd';
import { useAppState, changeAssemblyField } from '../state';
import { Store } from 'antd/lib/form/interface';

interface AssemblyFormProps {
    isMobileSize?: boolean
}

/** 贴片form表格 */
const AssemblyFrom: React.FC<AssemblyFormProps> = (props) => {
    const [form] = Form.useForm();
    const { assemblyField, dispatch } = useAppState();
    const { Option } = Select;

    const onValuesChange = (v: Store, values: Store) => {
        if (values.assemblySide && values.quantity && values.throughHolePartNum && values.uniquePartNum && values.assemblySide) {
            console.info(values);
            dispatch(changeAssemblyField(values));
        }
    }

    return (
        !props.isMobileSize ? <Row>
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
                        <span>Number of Through-Hole Parts</span>
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
                                    You Supply Parts, PCBONLINE only Assembles
                           </Radio>
                                <Radio value={2}>
                                    PCBONLINE Supplies Some Parts and Assembly
                           </Radio>
                                <Radio value={3}>
                                    PCBONLINE Supplies All Parts and Assembly
                           </Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Row> :
            <Form form={form} initialValues={assemblyField} onValuesChange={onValuesChange}>
                <div className='mobile-assembly-form mobile-assembly-form-service'>
                    <span className='mobile-assembly-form-label'>Assembly Service</span>
                    <Form.Item name="assemblyType">
                        <Radio.Group>
                            <Radio value={1}>
                                You Supply Parts, PCBONLINE only Assembles
                                </Radio>
                            <Radio value={2}>
                                PCBONLINE Supplies Some Parts and Assembly
                                </Radio>
                            <Radio value={3}>
                                PCBONLINE Supplies All Parts and Assembly
                                </Radio>
                        </Radio.Group>
                    </Form.Item>
                </div>
                <div className='mobile-assembly-form'>
                    <span className='mobile-assembly-form-label'>Number of SMT Parts</span>
                    <Form.Item name="smtPartNum">
                        <Input />
                    </Form.Item>
                </div>



                <div className='mobile-assembly-form'>
                    <span className='mobile-assembly-form-label'>Number of Unique Parts</span>
                    <Form.Item name="uniquePartNum">
                        <Input />
                    </Form.Item>
                </div>

                <div className='mobile-assembly-form'>
                    <span className='mobile-assembly-form-label'>Number of Throug-Hole Parts</span>
                    <Form.Item name="throughHolePartNum">
                        <Input />
                    </Form.Item>
                </div>

                <div className='mobile-assembly-form'>
                    <span className='mobile-assembly-form-label'>Assembly Side</span>
                    <Form.Item name="assemblySide">
                        <Select>
                            <Option value="Single Side">Single Side</Option>
                            <Option value="Double Side">Double Side</Option>
                        </Select>
                    </Form.Item>
                </div>

                <div className='mobile-assembly-form'>
                    <span className='mobile-assembly-form-label'>Quantity</span>
                    <Form.Item name="quantity">
                        <Input />
                    </Form.Item>
                </div>
            </Form>
    )
}

export default AssemblyFrom;