/*
 * @Descripttion: PCB特殊工艺输入面板
 * @version: 1.0
 * @Author: 
 * @Date: 2021-07-17 11:10:06
 * @LastEditors: ho huang
 * @LastEditTime: 2021-09-04 20:46:43
 */
import React from 'react';
import { Row, Col, Form } from 'antd';
import { Store } from 'antd/lib/form/interface';
import ObserverSwitch from './ObserverSwitch';
import { useAppState, changeSpecialField } from '../state';

interface PcbSpecialFormProps {
    item?: Store;
    onChange?: () => void;
    isMobileSize?: boolean
}

const PcbSpecialForm: React.FC<PcbSpecialFormProps> = (props) => {
    const [form] = Form.useForm();
    const { pcbSpecialField, dispatch } = useAppState();

    const onValuesChange = (v: Store, value: Store) => {
        dispatch(changeSpecialField(value))
    }
    const onFinish = (v: Store) => {
        dispatch(changeSpecialField(v))
    }
    return (
        !props.isMobileSize ? <Form form={form} initialValues={pcbSpecialField} onValuesChange={onValuesChange} style={{ width: "100%" }}>
            <Row className="special-mar">
                <Col span={12}>
                    <Form.Item label="HDI">
                        <ObserverSwitch name="hdi" />
                    </Form.Item>
                    <Form.Item label="Bevelling (Camfer)">
                        <ObserverSwitch name="bevellingCamfer" />
                    </Form.Item>
                    <Form.Item label="Peelable Solder Mask" >
                        <ObserverSwitch name="peelableSolderMask" />
                    </Form.Item>
                    <Form.Item label="Edge Plating" >
                        <ObserverSwitch name="edgePlating" />
                    </Form.Item>
                    <Form.Item label="Via in Pad" >
                        <ObserverSwitch name="viaInPad" />
                    </Form.Item>
                    <Form.Item label="Negative Postitive Copper" >
                        <ObserverSwitch name="negativePostitiveCopper" />
                    </Form.Item>
                    <Form.Item label="Countersinks" >
                        <ObserverSwitch name="countersinks" />
                    </Form.Item>
                </Col>
                <Col span={12} className="ant-col-last">
                    <Form.Item label="Control Concave Routing" >
                        <ObserverSwitch name="controlConcaveRouting" />
                    </Form.Item>
                    <Form.Item label="Back Drill" >
                        <ObserverSwitch name="backDrill" />
                    </Form.Item>
                    <Form.Item label="Carbon Mask" >
                        <ObserverSwitch name="carbonMask" />
                    </Form.Item>
                    <Form.Item label="Impedance Control" >
                        <ObserverSwitch name="impedanceControl" />
                    </Form.Item>
                    <Form.Item label="Half Hole Plated" >
                        <ObserverSwitch name="halfHolePlated" />
                    </Form.Item>
                    <Form.Item label="Press-fit Holes" >
                        <ObserverSwitch name="pressHoles" />
                    </Form.Item>
                    <Form.Item label="Acceptable Quality Levels" >
                        <ObserverSwitch name="acceptableQualityLevels" />
                    </Form.Item>
                </Col>
            </Row>
        </Form> :
            <Form form={form} initialValues={pcbSpecialField} onValuesChange={onValuesChange} style={{ width: "100%" }}>
                <Form.Item label="HDI">
                    <ObserverSwitch name="hdi" />
                </Form.Item>

                <Form.Item label="Bevelling (Camfer)">
                    <ObserverSwitch name="bevellingCamfer" />
                </Form.Item>

                <Form.Item label="Peelable Solder Mask" >
                    <ObserverSwitch name="peelableSolderMask" />
                </Form.Item>

                <Form.Item label="Edge Plating" >
                    <ObserverSwitch name="edgePlating" />
                </Form.Item>
                <Form.Item label="Via in Pad" >
                    <ObserverSwitch name="viaInPad" />
                </Form.Item>
                <Form.Item label="Negative Postitive Copper" >
                    <ObserverSwitch name="negativePostitiveCopper" />
                </Form.Item>
                <Form.Item label="Countersinks" >
                    <ObserverSwitch name="countersinks" />
                </Form.Item>

                <Form.Item label="Control Concave Routing" >
                    <ObserverSwitch name="controlConcaveRouting" />
                </Form.Item>
                <Form.Item label="Back Drill" >
                    <ObserverSwitch name="backDrill" />
                </Form.Item>
                <Form.Item label="Carbon Mask" >
                    <ObserverSwitch name="carbonMask" />
                </Form.Item>
                <Form.Item label="Impedance Control" >
                    <ObserverSwitch name="impedanceControl" />
                </Form.Item>
                <Form.Item label="Half Hole Plated" >
                    <ObserverSwitch name="halfHolePlated" />
                </Form.Item>
                <Form.Item label="Press-fit Holes" >
                    <ObserverSwitch name="pressHoles" />
                </Form.Item>
                <Form.Item label="Acceptable Quality Levels" >
                    <ObserverSwitch name="acceptableQualityLevels" />
                </Form.Item>
            </Form>
    )
}

export default PcbSpecialForm;