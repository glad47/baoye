import React, { useState } from 'react';
import { Row, Col, Form } from 'antd';
import ObserverSelect from './ObserverSelect';
import { Store } from 'antd/lib/form/interface';
import { useAppState, changeStandardField } from '../state';

interface PcbStandardFromProps {
    onChange?: ()=>void;
    item?: object;
}


//selectData
const materialSelectData = ['FR4','Aluminum'];
const thicknessSelectData = ['0.4mm','0.6mm','0.8mm','1.0mm','1.2mm','1.5mm','1.6mm','2.0mm','2.4mm','3.0mm'];
const tgSelectData = ['135','140','150','170','180'];
const layerSelectData = ['1layer','2layer','4layer','6layer','8layer'];
const innerCopperSelectData = ['none','1oz','2oz','3oz'];
const minTrackSelectData = ['none','3/3mil','4/4mil','5/5mil','6/6mil','7/7mil'];
const minHoleSizeSelectData = ['0.2','0.3','0.35','0.4','0.5','1.5'];
const surfaceFinishSelectData = ['HASL with lead','HASL lead free','Immersion Gold','Immersion tin','Immersion silver','OSP'];
const solderMaskSelectData = ['green','black','white','yellow','red','blue','matte black','matte green']; 
const heatConductivitySelectData = ['1W','2W','3W'];
const outerCopperSelectData = ['1oz','1.5oz','2oz','2.5oz','3oz']; 
const bgaSizeSelectData = ['≥0.22mm','≥0.25mm','≥0.30mm'];
const holeCopperSelectData = ['none','20um','25um']; 
const surfaceThicknessSelectData = ['Ni:120-150u "Au:1u"','Ni:120-150u "Au:2u"','Ni:120-150u "Au:3u"'];
const silkscreenSelectData = ['none','black','white']; 
const ctiSelectData = ['175≤CTI<250','250≤CTI<400','400≤CTI<600','CTI≥600'];
const testsss = ['12312','123123','12312312']



const LINKAGE_SURFACETHICKNESS = []


const PcbStandardFrom: React.FC<PcbStandardFromProps> = (props) =>{
    const [ form ] = Form.useForm();
    const { pcbStandardField,dispatch } = useAppState();
    const [ surfaceThicknessSelect, setSurfaceThicknessSelect] = useState(surfaceThicknessSelectData)
    const [ holeCopperSelectDisabled, setHoleCopperSelectDisabled ] = useState(false);
    const [ innerCopperSelectDisabled, setInnerCopperSelectDisabled ] = useState(true);
    const [ layerSelect, setLayerSelect] = useState(layerSelectData);
    const [ ctiSelect, setCtiSelect ] = useState(ctiSelectData);
    const [ showTg, setShowTg ] = useState(true);

    const onValuesChange = (v: Store) =>{
        switch(Object.values(v)[0]){
            case "Aluminum": {
                setShowTg(false);
                form.setFieldsValue(
                    {
                        "layer":"1layer",
                        "minHoleSize":'1.5',
                        "holeCopper":"none",
                        "solderMask":"white",
                        "silkscreen":"black",
                        "cti":"CTI≥600",
                        "heatConductivity": "1W",
                    });
                setLayerSelect(['1layer','2layer']);
                setCtiSelect(['CTI≥600']);
                break;
            }
            case "FR4": {
                setShowTg(true);
                form.setFieldsValue(
                    {
                        "layer":"2layer",
                        "minHoleSize":'0.3',
                        "holeCopper":'20um',
                        "solderMask":'green',
                        "silkscreen":'white',
                        "cti":"175≤CTI<250",
                        "tg": "135",
                    });
                setLayerSelect(layerSelectData);
                setCtiSelect(ctiSelectData);
                break;
            }
            case "HASL with lead":{
                form.setFieldsValue({"surfaceThickness":"2.54-25.4um"})
                setSurfaceThicknessSelect(['2.54-25.4um'])
                break;
            }
            case "HASL lead free":{
                form.setFieldsValue({"surfaceThickness":"2.54-25.4um"})
                setSurfaceThicknessSelect(['2.54-25.4um'])
                break;
            }
            case "Immersion tin" : {
                form.setFieldsValue({"surfaceThickness":"0.5um-0.7um"})
                setSurfaceThicknessSelect(['0.5um-0.7um'])
                break;
            }
            case "Immersion silver" : {
                form.setFieldsValue({"surfaceThickness":"≥0.05um"})
                setSurfaceThicknessSelect(['≥0.05um'])
                break; 
            }
            case "OSP" : {
                form.setFieldsValue({"surfaceThickness":"0.25-0.5um"})
                setSurfaceThicknessSelect(['0.25-0.5um'])
                break; 
            }
            case "Immersion Gold" :{
                form.setFieldsValue({"surfaceThickness":'Ni:120-150u "Au:1u"'})
                setSurfaceThicknessSelect(surfaceThicknessSelectData)
                break;  
            }
            case "1layer" : {
                form.setFieldsValue({
                  "holeCopper": "none",
                  "innerCopper": "none",  
                })
                setHoleCopperSelectDisabled(true);
                setInnerCopperSelectDisabled(true);
                break;
            }
            case "2layer" : {
                form.setFieldsValue({
                    "holeCopper": "20um",
                    "innerCopper": "none",  
                })
                setHoleCopperSelectDisabled(false);
                setInnerCopperSelectDisabled(true);
                break;
            }
            case "4layer":
            case "6layer":
            case "8layer":{
                form.setFieldsValue({
                    "holeCopper": "20um",
                    "innerCopper": "1oz",   
                });
                setHoleCopperSelectDisabled(false);
                setInnerCopperSelectDisabled(false);
                break;
            }
        }
        form.submit();
    }

    const onFinish = (v: Store) => {
        console.log(v);
        dispatch(changeStandardField(v));
    }

    return(
        <Form form={form} initialValues={pcbStandardField} onValuesChange={onValuesChange} onFinish={onFinish} style={{width:"100%"}} labelAlign="left">
            <Row>
                <Col span={12}>
                    <Form.Item label="Material">
                        <ObserverSelect item={materialSelectData} name={"material"} />
                    </Form.Item>
                    {/* <Fade in={pcbStandardField.material === 'FR4'}>
                    <Form.Item label="TG(℃)">
                        <ObserverSelect item={tgSelectData} name={"tg"}/>
                    </Form.Item>
                    </Fade>
                    <Fade in={pcbStandardField.material === 'Aluminum'}>
                    <Form.Item label="Heat Conductivity">
                        <ObserverSelect item={heatConductivitySelectData} name={"heatConductivity"}/>
                    </Form.Item> 
                    </Fade> */}
                    <Form.Item noStyle shouldUpdate={(prevValues: Store, nextValues: Store)=> prevValues.material !== nextValues.material}>
                        {({getFieldValue})=>{
                            return getFieldValue('material') === 'FR4' ? (
                                <Form.Item label="TG(℃)">
                                    <ObserverSelect item={tgSelectData} name={"tg"}/>
                                </Form.Item> 
                            ) : (
                                <Form.Item label="Heat Conductivity">
                                    <ObserverSelect item={heatConductivitySelectData} name={"heatConductivity"}/>
                                </Form.Item>  
                            )
                        }}
                    </Form.Item>
                    {/* {
                        showTg ? (
                        <Form.Item label="TG(℃)">
                            <ObserverSelect item={tgSelectData} name={"tg"}/>
                        </Form.Item>
                        ) : (
                        <Form.Item label="Heat Conductivity">
                            <ObserverSelect item={heatConductivitySelectData} name={"heatConductivity"}/>
                        </Form.Item>  
                        ) 
                    } */}
                    <Form.Item  label="Layer">
                        <ObserverSelect item={layerSelect} name={"layer"} />
                    </Form.Item>
                    <Form.Item label="Solder Mask">
                        <ObserverSelect item={solderMaskSelectData} name={"solderMask"}/>
                    </Form.Item>
                    <Form.Item  label="Inner Copper">
                        <ObserverSelect item={innerCopperSelectData} name={"innerCopper"} disabled={innerCopperSelectDisabled}/>
                    </Form.Item>
                    <Form.Item label="Min Track/Spacing">
                        <ObserverSelect item={minTrackSelectData} name={"minTrack"} />
                    </Form.Item>
                    <Form.Item label="Surface Finish">
                        <ObserverSelect item={surfaceFinishSelectData} name={"surfaceFinish"}/>
                    </Form.Item>
                </Col>
                <Col span={12} className="ant-col-last">
                    <Form.Item label="Thickness">
                       <ObserverSelect item={thicknessSelectData} name={"thickness"}/>
                    </Form.Item>
                    <Form.Item label="CTI">
                       <ObserverSelect item={ctiSelect} name={"cti"}/>
                    </Form.Item>
                    <Form.Item label="Hole Copper">
                        <ObserverSelect item={holeCopperSelectData} name={"holeCopper"} disabled={holeCopperSelectDisabled}/>
                    </Form.Item>
                    <Form.Item label="Silkscreen">
                        <ObserverSelect item={silkscreenSelectData}  name="silkscreen" />
                    </Form.Item>
                    <Form.Item label="Outer copper">
                        <ObserverSelect item={outerCopperSelectData} name={"outerCopper"} />
                    </Form.Item>
                    {/* <Form.Item label="BGA Size">
                        <ObserverSelect item={bgaSizeSelectData} name={"bgaSize"}/>
                    </Form.Item> */}
                    <Form.Item label="Min Hole Size">
                        <ObserverSelect item={minHoleSizeSelectData} name={"minHoleSize"} />
                    </Form.Item>
                    <Form.Item label="Surface Thickness">
                        <ObserverSelect item={surfaceThicknessSelect} name="surfaceThickness" />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default PcbStandardFrom;