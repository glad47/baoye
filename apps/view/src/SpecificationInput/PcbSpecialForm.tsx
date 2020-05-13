import React from 'react';
import { Row, Col, Form } from 'antd';
import { Store } from 'antd/lib/form/interface';
import ObserverSwitch from './ObserverSwitch';
import { useAppState, changeSpecialField } from '../state';

interface PcbSpecialFormProps {
    item?: Store;
    onChange?: () => void;
}



const PcbSpecialForm: React.FC<PcbSpecialFormProps> = (props) =>{
    const [form] = Form.useForm();
    const { pcbSpecialField,dispatch } = useAppState();

    const onValuesChange = () =>{
        form.submit();
    }
    const onFinish = (v: Store) =>{
        dispatch(changeSpecialField(v))
    }

    return (
        <Form form={form} initialValues={pcbSpecialField} onValuesChange={onValuesChange} onFinish={onFinish} style={{width:"100%"}}>
            <Row className="special-mar">
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
                <Col span={12} className="ant-col-last">
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