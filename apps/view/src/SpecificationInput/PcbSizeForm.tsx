import React, {useState, useEffect, useImperativeHandle} from 'react';
import {Row, Col, Form, Input, Select, Tooltip, message, Button} from 'antd';
import { Store } from 'antd/lib/form/interface';
import ObserverSize from './ObserverSize';
import {useAppState, changeSizeField, reduxSetFlagQuoteParams} from '../state';
import emitter from "../eventBus";

interface PcbSizeFormProps {
    isMobileSize?: boolean
    cRef?: any
}
const boardType = [{ id: 1, name: 'Single' }, { id: 2, name: 'Panel' }];
const diffDesigns = [
    {name: '1', value: '1'},
    {name: '2', value: '2'},
    {name: '3', value: '3'},
    {name: '4', value: '4'},
    {name: '5', value: '5'},
    {name: '6', value: '6'},
    {name: '7', value: '7'},
    {name: '8', value: '8'}
];

// const INITIAL = {boardType:'Single'}
const PcbSizeForm: React.FC<PcbSizeFormProps> = (props) => {
    const { Option } = Select;
    const [form] = Form.useForm();
    const [singleMode, setSingleMode] = useState(true);
    const { dispatch, pcbSizeField } = useAppState();
    const [tipShowPanel, setTipShowPanel] = useState(false);
    // 表单key值，必要时刷新避免表单无法重新渲染
    const [formKey, setFormKey] = useState<number>(0);

    const onValuesChange = (v: Store) => {
        // console.log(Object.values(v)[0])
        switch (Object.values(v)[0]) {
            case 'Panel': {
                setSingleMode(false)
                break;
            }
            case 'Single': {
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
        setTipShowPanel(false);
        onFinish(form.getFieldsValue());
    }

    const onFinish = (v: Store) => {
        dispatch(reduxSetFlagQuoteParams(true));
        let {singleSize, panelSize, boardType} = v;
        if (boardType === 1 || boardType === 'Single') { // single
            if (!singleSize.sizeX || !singleSize.sizeY) {
                emitter.emit('Emi_HandleMyTips', {tip: 'Please check singleSize!', time: 2000});
                return false;
            }
            if (Object.values(v)[2] && Object.values(v)[3]) {
                dispatch(changeSizeField(v));
            } else {
                handleFormSubmitTips1();
            }
        } else {
            if (!panelSize.sizeX || !panelSize.sizeY) {
                emitter.emit('Emi_HandleMyTips', {tip: 'Please check panelSize!', time: 2000});
                return false;
            }
            if (Object.values(v)[1] && Object.values(v)[2] && Object.values(v)[3]) {
            } else if (!Object.values(v)[3]) {
                handleFormSubmitTips1();
                // message.info('Please fill full parameters(Sizt and Quantity and Panel Array)');
            } else {
                handleFormSubmitTips2();
            }
            dispatch(changeSizeField(v));
        }
        return true;
    }

    const handleFormSubmitTips1 = () => {
        const formData = form.getFieldsValue();
        const {quantity, singleSize} = formData;
        if (quantity === '' || quantity === null) {
            emitter.emit('Emi_HandleMyTips', {tip: 'Please pay attention to enter the board quantity', time: 2000});
            return false;
        }
        return quantity;
    }

    const handleFormSubmitTips2 = () => {
        emitter.emit('Emi_HandleMyTips', {tip: 'Please enter the panel details', time: 2000});
    }

    useImperativeHandle(props.cRef, () => ({
        // 主要弹出input require
        formSubmit () {
            return onFinish(form.getFieldsValue());
        },
        tipsPanel () {
            handleFormSubmitTips2();
        }
    }));

    /**
     * 清除表单
     */
    const clearForm = () => {
        setFormKey(formKey+1)
        setTimeout(() => {
            form.resetFields();
        }, 500)
    }

    useEffect(() => {
        // form.validateFields(['panelSize'])
        form.setFieldsValue({ ...pcbSizeField });
    }, [pcbSizeField])

    useEffect(() => {
        emitter.addListener('Emi_ClearPcbSizeForm', () => {
            clearForm()
        })
    }, [])

    return (
        !props.isMobileSize ? <Form form={form} initialValues={pcbSizeField} onValuesChange={onValuesChange} onFinish={onFinish} key={formKey}>
            <Row>
                <Col span={12}  className={`item-panel`} id="panelArray">
                    <Form.Item label="Dimension" name="boardType">
                        <Select className="color-yel">
                            {
                                boardType.map(item => (
                                    <Option key={item.id} value={item.name}>{item.name}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="Panel Array" name="panelSize" className={`item-quantity`} style={{display: singleMode ? 'none': ''}}>
                        <ObserverSize isDisabled={singleMode} />
                    </Form.Item>
                </Col>
                <Col span={12}  className={`item-quantity`} id="qtyTipsID">
                    <Form.Item label="Size" name="singleSize">
                        <ObserverSize />
                    </Form.Item>
                    <Form.Item label="Quantity" name="quantity">
                        <Input placeholder='Enter the Qty' className='enter_quantity color-yel' suffix={singleMode ? 'PCS' : 'PANEL'} autoComplete='off' />
                    </Form.Item>
                    <img src={require('../images/quate_icon1.png')} alt="" className="flag"/>
                </Col>
                {
                    !singleMode &&
                    <Col span={12}>
                        <Form.Item label="Different Design in Panel" name="differentDesign" labelCol={{span: 14}}>
                            <Select className="color-yel" defaultValue={1}>
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