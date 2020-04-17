import React, { useState } from 'react';
import { Row, Col, Form, Select } from 'antd';


interface PcbSpecificationProps {
}


//selectData
const materialSelectData = ['FR4','Aluminum'];
const thinknessSelectData = ['0.4mm','0.6mm','0.8mm','1.0mm','1.2mm','1.5mm','1.6mm','2.0mm','2.4mm','3.0mm'];
const tgSelectData = [135,140,150,170,180];
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

const INITIAL = {
    "material":'FR4',
    "tg":135,
    "layer":'2layer',
    "innerCopper":'none',
    "minTrack":'5/5mil',
    "minHoleSize":'0.3',
    "surfaceFinish":'OSP',
    "solderMask":'green',
    "heatConductivity":'1w', 
    "thinkness":'0.8mm',
    "cti":'175≤CTI<250',
    "outerCopper":'1oz',
    "bgaSize":'≥0.30mm',
    "holeCopper":'20um',
    // "surfaceThickness":'0.25-0.5um',
    "silkscreen":'white',
}

const surfaceThicknessSelectDataTwo = {
    "HASL with lead": ['2.54-25.4um'],
    "HASL lead free": ['2.54-25.4um'],
    "Immersion Gold": ['Ni:120-150u "Au:1u"','Ni:120-150u "Au:2u"','Ni:120-150u "Au:3u"'],
    "Immersion tin": ['0.5um-0.7um'],
    "Immersion silver": ['≥0.05um'],
    "OSP": ['0.25-0.5um']
} 

const test = {
    "material": 'FR4',
    "surfaceThicknessT": surfaceFinishSelectData[5],
}

const PcbSpecification: React.FC<PcbSpecificationProps> = (props) => {
    const { Option } = Select;    
    const [state, setState] = useState(test);
    const [surfaceThicknessData, setSurfaceThicknessData] = useState(surfaceThicknessSelectDataTwo[surfaceFinishSelectData[5]])
    const [sufaceThicknessValue, setSufaceThicknessValue] = useState(surfaceThicknessSelectDataTwo[surfaceFinishSelectData[5]][0])
    const [form] = Form.useForm();

    console.log(surfaceThicknessData);
    // const hendlValuewChange = (changedValues, allValues)=>{
    //     console.log(changedValues);
    //     if(changedValues.material === 'Aluminum'){
    //         // from.setFieldsValue({"minHoleSize":'1.5'});
    //     }
        
    //     setState({...changedValues});
    // }

    const hendlSurfaceFinishChange = value =>{
        console.log(value);
        // setSurfaceThicknessData(surfaceThicknessSelectDataTwo[value])
        // setSufaceThicknessValue(surfaceThicknessSelectDataTwo[value][0])
        form.setFieldsValue({surfaceThickness:surfaceThicknessSelectDataTwo[value][0]})
    }

    const hendlSurfaceThicknessChange = value =>{
        setSufaceThicknessValue(value)
    }

    return (
        <Form initialValues={INITIAL}>
            <Row>
                <Col span={12}>
                    <Form.Item name="material" label="Material">
                        <Select style={{width: 'auto'}}>
                        {materialSelectData.map(material =>(
                            <Option value={material} key={material}>{material}</Option> 
                        ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="tg" label="TG(℃)">
                        <Select style={{width: 'auto'}}>
                        {tgSelectData.map(tg =>(
                            <Option value={tg} key={tg}>{tg}</Option> 
                        ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="layer" label="Layer">
                        <Select style={{width: 'auto'}}>
                        {layerSelectData.map(layer =>(
                            <Option value={layer} key={layer}>{layer}</Option> 
                        ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="innerCopper" label="Inner Copper">
                        <Select style={{width: 'auto'}}>
                        {innerCopperSelectData.map(innerCopper =>(
                            <Option value={innerCopper} key={innerCopper}>{innerCopper}</Option> 
                        ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="minTrack" label="Min Track/Spacing">
                        <Select style={{width: 'auto'}}>
                        {minTrackSelectData.map(material =>(
                            <Option value={material} key={material}>{material}</Option> 
                        ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="minHoleSize" label="Min Hole Size">
                        <Select style={{width: 'auto'}}>
                        {minHoleSizeSelectData.map(material =>(
                            <Option value={material} key={material}>{material}</Option> 
                        ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="surfaceFinish" label="Surface Finish">
                        <Select style={{width: 'auto'}} onChange={hendlSurfaceFinishChange}>
                        {surfaceFinishSelectData.map(material =>(
                            <Option value={material} key={material}>{material}</Option> 
                        ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="solderMask" label="Solder Mask(coverage)">
                        <Select style={{width: 'auto'}}>
                        {solderMaskSelectData.map(material =>(
                            <Option value={material} key={material}>{material}</Option> 
                        ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="thinkness" label="Thinkness">
                        <Select style={{width: 'auto'}}>
                        { thinknessSelectData.map(thinkness =>(
                            <Option value={thinkness} key={thinkness}>{thinkness}</Option> 
                        ))}
                        </Select>
                    </Form.Item>
                    { state.material === 'FR4' ?
                        <Form.Item name="cti" label="CTI">
                            <Select style={{width: 'auto'}}>
                            { ctiSelectData.map(cti =>(
                                <Option value={cti} key={cti}>{cti}</Option> 
                            ))}
                            </Select>
                        </Form.Item> : 
                        <Form.Item name="heatConductivity" label="Heat Conductivity">
                        <Select style={{width: 'auto'}}>
                        { heatConductivitySelectData.map(thinkness =>(
                            <Option value={thinkness} key={thinkness}>{thinkness}</Option> 
                        ))}
                        </Select>
                        </Form.Item>
                    }
                    
                    <Form.Item>
                        {/* <Select style={{width: '100px'}} defaultValue={thinknessSelectData[0]}>
                        { thinknessSelectData.map(thinkness =>(
                            <Option value={thinkness} key={thinkness}>{thinkness}</Option> 
                        ))}
                        </Select> */}
                    </Form.Item>
                    <Form.Item name="outerCopper" label="Outer copper">
                        <Select style={{width: 'auto'}}>
                        { outerCopperSelectData.map(thinkness =>(
                            <Option value={thinkness} key={thinkness}>{thinkness}</Option> 
                        ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="bgaSize" label="BGA Size">
                        <Select style={{width: 'auto'}}>
                        { bgaSizeSelectData.map(thinkness =>(
                            <Option value={thinkness} key={thinkness}>{thinkness}</Option> 
                        ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="holeCopper" label="Hole Copper">
                        <Select style={{width: 'auto'}}>
                        { holeCopperSelectData.map(thinkness =>(
                            <Option value={thinkness} key={thinkness}>{thinkness}</Option> 
                        ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="surfaceThickness" label="Surface Thickness">
                        <Select style={{width: 'auto'}} onChange={hendlSurfaceThicknessChange} value={sufaceThicknessValue}>
                        { surfaceThicknessData.map(surfaceThickness =>(
                            <Option value={surfaceThickness} key={surfaceThickness}>{surfaceThickness}</Option> 
                        ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="silkscreen" label="Silkscreen">
                        <Select style={{width: 'auto'}}>
                        { silkscreenSelectData.map(thinkness =>(
                            <Option value={thinkness} key={thinkness}>{thinkness}</Option> 
                        ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default PcbSpecification;