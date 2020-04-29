import React, { useState } from 'react';
import { Row, Col, Form, Switch } from 'antd';
import ObserverSelect from './ObserverSelect';
import { Store } from 'antd/lib/form/interface';
import ObserverSwitch from './ObserverSwitch';

interface PcbSpecialFormProps {
    item?: Store;
    onChange?: (v: Store) => void;
}



const PcbSpecialForm: React.FC<PcbSpecialFormProps> = (props) =>{
    const [form] = Form.useForm();

    const onValuesChange = (changedValues: Store, values: Store) =>{
        form.submit();
    }

    return (
        <Form form={form} initialValues={props.item} onValuesChange={onValuesChange} onFinish={props.onChange} style={{width:"100%"}}>
            <Row>
                <Col span={12}>
                    <Form.Item label="HDI">
                        <ObserverSwitch name="hdi" />
                    </Form.Item>
                    <Form.Item label="Custom Stackup">
                        <ObserverSwitch name="customStackup"/>
                    </Form.Item>
                    <Form.Item label="Peelable Solder Mask" >
                        <ObserverSwitch name="peelableSolderMask"/>
                    </Form.Item>
                    <Form.Item label="Edge Plating" >
                        <ObserverSwitch name="edgePlating"/>
                    </Form.Item>
                    <Form.Item label="Via in pad" >
                        <ObserverSwitch name="viaInPad"/>
                    </Form.Item>
                    <Form.Item label="Negative postitive copper" >
                        <ObserverSwitch name="negativePostitiveCopper"/>
                    </Form.Item>
                    <Form.Item label="Countersinks" >
                        <ObserverSwitch name="countersinks"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Control Concave Routing" >
                        <ObserverSwitch name="controlConcaveRouting"/>
                    </Form.Item>
                    <Form.Item label="Back Drill" >
                        <ObserverSwitch name="backDrill"/>
                    </Form.Item>
                    <Form.Item label="Carbon Mask" >
                        <ObserverSwitch name="carbonMask"/>
                    </Form.Item>
                    <Form.Item label="Impedance Control" >
                        <ObserverSwitch name="impedanceControl"/>
                    </Form.Item>
                    <Form.Item label="Half Hole Plated" >
                        <ObserverSwitch name="halfHolePlated"/>
                    </Form.Item>
                    <Form.Item label="Press-fit Holes" >
                        <ObserverSwitch name="pressHoles"/>
                    </Form.Item>
                    <Form.Item label="Acceptable Quality Levels" >
                        <ObserverSwitch name="acceptableQualityLevels"/>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default PcbSpecialForm;