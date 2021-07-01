import React, {useState, useEffect, useImperativeHandle} from 'react';
import { Row, Col, Form, Input, Select, message } from 'antd';
// import { useForm } from 'antd/lib/form/util';
import { Store } from 'antd/lib/form/interface';
import ObserverSize from './ObserverSize';
import { useAppState, changeSizeField } from '../state';

interface PcbSizeFormProps {
    isMobileSize?: boolean
    cRef?: any
}
const boardType = [{ id: 1, name: 'Single' }, { id: 2, name: 'Panel' }];

// const INITIAL = {boardType:'Single'}
const PcbSizeForm: React.FC<PcbSizeFormProps> = (props) => {
    const { Option } = Select;
    const [form] = Form.useForm();
    const [singleMode, setSingleMode] = useState(true);
    const { dispatch, pcbSizeField } = useAppState();
    const onValuesChange = (v: Store) => {
        // console.log(Object.values(v)[0])
        switch (Object.values(v)[0]) {
            case 2: {
                setSingleMode(false)
                break;
            }
            case 1: {
                setSingleMode(true)
                break;
            }
        }
        form.submit();
    }
    const onFinish = (v: Store) => {
        if (Object.values(v)[0] === 'Single') {
            if (Object.values(v)[2] && Object.values(v)[3]) {
                dispatch(changeSizeField(v));
            } else {
                // message.info('Please fill full parameters(Sizt and Quantity)');
            }
        } else {
            if (Object.values(v)[1] && Object.values(v)[2] && Object.values(v)[3]) {
                dispatch(changeSizeField(v));
            } else {
                // message.info('Please fill full parameters(Sizt and Quantity and Panel Array)');
            }
        }
    }

    useImperativeHandle(props.cRef, () => ({
        // 主要弹出input require
        formSubmit() {
            form.submit();
        }
    }));

    useEffect(() => {
        // form.validateFields(['panelSize'])
        form.setFieldsValue({ ...pcbSizeField });
    }, [pcbSizeField])

    return (
        !props.isMobileSize ? <Form form={form} initialValues={pcbSizeField} onValuesChange={onValuesChange} onFinish={onFinish}>
            <Row>
                <Col span={12} >
                    <Form.Item label="Dimension" name="boardType">
                        <Select>
                            {
                                boardType.map(item => (
                                    <Option key={item.id} value={item.id}>{item.name}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="Panel Array" name="panelSize">
                        <ObserverSize isDisabled={singleMode} />
                    </Form.Item>
                </Col>
                <Col span={12}  className={`item-quantity`}>
                    <Form.Item label="Size" name="singleSize">
                        <ObserverSize />
                    </Form.Item>
                    <Form.Item label="Quantity" name="quantity" rules={[{ required: true }]}>
                        <Input placeholder='Enter the Qty' className='enter_quantity' suffix={singleMode ? 'PCS' : 'PANEL'} autoComplete='off' />
                    </Form.Item>
                    <img src={require('../images/quate_icon1.png')} alt=""/>
                </Col>
            </Row>
        </Form> :
            <div className='mobile-size-form'>
                <Form
                    form={form}
                    initialValues={pcbSizeField}
                    onValuesChange={onValuesChange}
                    onFinish={onFinish}
                    className='mobile-size-form-pcb'
                >
                    <Row className='mobile-size-box'>
                        <Form.Item label="Dimensions" name="boardType">
                            <Select>
                                {
                                    boardType.map(item => (
                                        <Option key={item.id} value={item.id}>{item.name}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Row>
                    <Row>
                        <Form.Item label="Size" name="singleSize">
                            <ObserverSize isMobileSize={props.isMobileSize} />
                        </Form.Item>
                    </Row>


                    <Row className='mobile-size-box'>
                        <Form.Item label="Quantity" name="quantity" required>
                            <Input
                                placeholder={!props.isMobileSize ? 'Enter the Qty' : ""}
                                className='enter_quantity'
                                suffix={!props.isMobileSize ? (singleMode ? 'PCS' : 'PANEL') : ''}
                                autoComplete='off'
                            />
                        </Form.Item>
                    </Row>
                    <Row>
                        <Form.Item label="Panel Array" name="panelSize">
                            <ObserverSize isDisabled={singleMode} isMobileSize={props.isMobileSize} />
                        </Form.Item>
                    </Row>
                </Form>
            </div>
    )
}

export default PcbSizeForm;