import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Select } from 'antd';
import ObserverSelect from './ObserverSelect';


interface PcbSpecificationProps {
}

type LinkageData = {[index: string]: string[]};

//selectData
const materialSelectData = ['FR4','Aluminum'];
const thinknessSelectData = ['0.4mm','0.6mm','0.8mm','1.0mm','1.2mm','1.5mm','1.6mm','2.0mm','2.4mm','3.0mm'];
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
const testsss = ['12312','123123','12312312'];

const INITIAL = {
    "material":'FR4',
    "tg":'135',
    "layer":'2layer',
    "innerCopper":'none',
    "minTrack":'5/5mil',
    "minHoleSize":'0.3',
    "surfaceFinish":'HASL lead free',
    "solderMask":'green',
    "heatConductivity":'1w', 
    "thinkness":'0.8mm',
    "cti":'175≤CTI<250',
    "outerCopper":'1oz',
    "bgaSize":'≥0.30mm',
    "holeCopper":'20um',
    "surfaceThickness":'0.25-0.5um',
    "silkscreen":'white',
}


const surfaceThicknessLinkageData: LinkageData = {
    "HASL with lead": ['2.54-25.4um'],
    "HASL lead free": ['2.54-25.4um'],
    "Immersion Gold": ['Ni:120-150u "Au:1u"','Ni:120-150u "Au:2u"','Ni:120-150u "Au:3u"'],
    "Immersion tin": ['0.5um-0.7um'],
    "Immersion silver": ['≥0.05um'],
    "OSP": ['0.25-0.5um']
} 

const layerLinkageData: LinkageData = {
    "1layer": ['none'],
    "2layer": ['']
}

const changedData = {
    "layer":'2layer',
    "minHoleSize":'0.3',
    "holeCopper":'20um',
    "solderMask":'green',
    "silkscreen":'white',
    "showCTI": true,
    "surfaceThicknessSelectData": ['2.54-25.4um'],
    "defaultSurfaceThickness": '2.54-25.4um',
}

const PcbSpecification: React.FC<PcbSpecificationProps> = (props) => {
    const [change, setChange] = useState(changedData);
    const [ form ] = Form.useForm();
    const { Option } = Select;

    const hendlMaterialChange = (value: any) =>{
        if(value === 'Aluminum'){
            console.log("ssss",value);
            setChange({...change,"showCTI":false,"layer":"1layer","minHoleSize":'1.5',"holeCopper":"none","solderMask":"white","silkscreen":"black"});
        }else if(value == 'FR4'){
            console.log("fff",value);
            setChange({...change,"showCTI":true,"layer":"2layer","minHoleSize":'0.3', "holeCopper":'20um',"solderMask":'green',"silkscreen":'white'})
        }
    }

    const handleSurfaceThicknessChange = (value: string) =>{
        console.log(value);
        let trst = surfaceThicknessLinkageData['OSP'];
        console.log(trst);
        setChange({...change,"surfaceThicknessSelectData":surfaceThicknessLinkageData[value],"defaultSurfaceThickness":surfaceThicknessLinkageData[value][0]})
    }

    const onChangeDec = (changedFields: any, allFields: any)=>{
        console.log(changedFields);
        console.log(allFields);
    }

    return (
        <>
         <Form>
            <Form.Item name="tset" label="tsts">
                <Select style={{width:100}}>
                    { surfaceThicknessSelectData.map(item => { 
                        <Option key={item} value={item}>{item}</Option>
                    })}
                </Select>
            </Form.Item>
        </Form>
        <Form>
            <Row>
                <Col span={12}>
                    <Form.Item name="material" label="Material">
                        <ObserverSelect item={materialSelectData} hendleChange={hendlMaterialChange} defauleValue={INITIAL.material}/>
                    </Form.Item>
                    <Form.Item name="tg" label="TG(℃)">
                        <ObserverSelect item={tgSelectData} defauleValue={INITIAL.tg}/>
                    </Form.Item>
                    <Form.Item name="layer" label="Layer">
                        <ObserverSelect item={layerSelectData} selectedValue={change.layer} hendleChange={(v)=>{setChange({...change,"layer":v})}}/>
                    </Form.Item>
                    <Form.Item name="innerCopper" label="Inner Copper">
                        <ObserverSelect item={innerCopperSelectData} defauleValue={INITIAL.innerCopper} />
                    </Form.Item>
                    <Form.Item name="minTrack" label="Min Track/Spacing">
                        <ObserverSelect item={minTrackSelectData} defauleValue={INITIAL.minTrack} />
                    </Form.Item>
                    <Form.Item name="minHoleSize" label="Min Hole Size">
                        <ObserverSelect item={minHoleSizeSelectData} selectedValue={change.minHoleSize} hendleChange={(v)=>{setChange({...change,"minHoleSize":v})}}/>
                    </Form.Item>
                    <Form.Item name="surfaceFinish" label="Surface Finish">
                        <ObserverSelect item={surfaceFinishSelectData} defauleValue={INITIAL.surfaceFinish} hendleChange={handleSurfaceThicknessChange}/>
                    </Form.Item>
                    <Form.Item name="solderMask" label="Solder Mask(coverage)">
                        <ObserverSelect item={solderMaskSelectData} selectedValue={change.solderMask} hendleChange={(v)=>{setChange({...change,"solderMask":v})}}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="thinkness" label="Thinkness">
                       <ObserverSelect item={thinknessSelectData} selectedValue={INITIAL.thinkness} />
                    </Form.Item>
                    { change.showCTI ?
                        <Form.Item name="cti" label="CTI">
                          <ObserverSelect item={ctiSelectData} selectedValue={INITIAL.cti}/>
                        </Form.Item> :
                        <Form.Item name="heatConductivity" label="Heat Conductivity">
                            <ObserverSelect item={heatConductivitySelectData} defauleValue={INITIAL.heatConductivity} />
                        </Form.Item>
                    }
                    <Form.Item>

                    </Form.Item>
                    <Form.Item name="outerCopper" label="Outer copper">
                        <ObserverSelect item={outerCopperSelectData} defauleValue={INITIAL.outerCopper} />
                    </Form.Item>
                    <Form.Item name="bgaSize" label="BGA Size">
                        <ObserverSelect item={bgaSizeSelectData} defauleValue={INITIAL.bgaSize} />
                    </Form.Item>
                    <Form.Item name="holeCopper" label="Hole Copper">
                        <ObserverSelect item={holeCopperSelectData} selectedValue={change.holeCopper} hendleChange={(v)=>{setChange({...change,"holeCopper":v})}}/>
                    </Form.Item>
                    <Form.Item name="surfaceThickness" label="Surface Thickness">
                        <ObserverSelect item={change.surfaceThicknessSelectData} selectedValue={change.defaultSurfaceThickness} hendleChange={(v)=>setChange({...change,"defaultSurfaceThickness":v})}/>
                    </Form.Item>
                    <Form.Item name="silkscreen" label="Silkscreen">
                        <ObserverSelect item={silkscreenSelectData} selectedValue={change.silkscreen} hendleChange={(v)=>{setChange({...change,"silkscreen":v})}}/>
                    </Form.Item>
                    
                </Col>
            </Row>
        </Form>
       
        </>
    )
}

export default PcbSpecification;