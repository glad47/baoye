import React, {useState, useEffect, useImperativeHandle} from 'react';
import { Row, Col, Form, Input, Select, Tooltip } from 'antd';
import { Store } from 'antd/lib/form/interface';
import ObserverSize from './ObserverSize';
import {useAppState, changeSizeField, reduxSetFlagQuoteParams} from '../state';

interface PcbSizeFormProps {
    isMobileSize?: boolean
    cRef?: any
}
const boardType = [{ id: 1, name: 'Single' }, { id: 2, name: 'Panel' }];
const diffDesigns = [
    {name: '1oz', value: '1'},
    {name: '2oz', value: '2'},
    {name: '3oz', value: '3'},
    {name: '4oz', value: '4'},
    {name: '5oz', value: '5'},
    {name: '6oz', value: '6'},
    {name: '7oz', value: '7'},
    {name: '8oz', value: '8'}
];

// const INITIAL = {boardType:'Single'}
const PcbSizeForm: React.FC<PcbSizeFormProps> = (props) => {
    const { Option } = Select;
    const [form] = Form.useForm();
    const [singleMode, setSingleMode] = useState(true);
    const { dispatch, pcbSizeField } = useAppState();
    const [tipShow, setTipShow] = useState(false);

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
        // form.validateFields().then(value => {
        //     // 验证成功
        //     console.log('成功values', value)
        // }).catch(errorInfo => { // 表单验证失败依然提交，否则不会触发报价
        //     console.log('errorInfo', errorInfo)
        //     form.submit();
        // })
        // onFinish(form.getFieldsValue())
        if (JSON.stringify(v).indexOf('quantity') > -1) {
            if (!v.quantity) {
                dispatch(reduxSetFlagQuoteParams(false));
            } else {
                onFinish(form.getFieldsValue());
            }
        } else {
            form.submit();
        }
    }
    const onFinish = (v: Store) => {
        dispatch(reduxSetFlagQuoteParams(true));
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
        formSubmit () {
            // console.log('validateFields', await form.validateFields)
            // form.submit();
            const formData = form.getFieldsValue();
            const {quantity} = formData;
            setTipShow(!quantity)
            console.log('!quantity', !quantity)
            return quantity;
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
                        <Select className="color-yel">
                            {
                                boardType.map(item => (
                                    <Option key={item.id} value={item.id}>{item.name}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="Panel Array" name="panelSize" style={{display: singleMode ? 'none': ''}}>
                        <ObserverSize isDisabled={singleMode} />
                    </Form.Item>
                </Col>
                <Col span={12}  className={`item-quantity`}>
                    <Form.Item label="Size" name="singleSize">
                        <ObserverSize />
                    </Form.Item>
                    <Form.Item label="Quantity" name="quantity">
                        <Input placeholder='Enter the Qty' className='enter_quantity color-yel' suffix={singleMode ? 'PCS' : 'PANEL'} autoComplete='off' />
                    </Form.Item>
                    <Tooltip visible={tipShow} placement="top" title="Please pay attention to enter the board quantity">
                        <img onMouseEnter={() => setTipShow(true)}
                             onMouseLeave={() => setTipShow(false)}
                             src={require('../images/quate_icon1.png')} alt="" className="flag"/>
                    </Tooltip>
                </Col>
                {
                    !singleMode &&
                    <Col span={12}>
                        <Form.Item label="Different Design in Panel" name="differentDesign" labelCol={{span: 14}}>
                            <Select className="color-yel">
                                {
                                    diffDesigns.map(item => <Option key={item.value} value={item.value}>{item.name}</Option>)
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                }
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