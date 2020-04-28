import React, { useState } from 'react';
import { Row, Col, Form } from 'antd';
import ObserverSelect from './ObserverSelect';
import { Store } from 'antd/lib/form/interface';
import SpecificationHead from './SpecificationHead';
import PcbSpecialForm from './PcbSpecialForm';
import PcbStandardFrom from './PcbStandardForm';


interface PcbSpecificationProps {
    item?: object;
    onChange?: (value: Store)=>void;
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

    const handleSurfaceThicknessChange = (value: string) =>{
       // specificationRef.current = {...INITIAL,"surfaceThickness":surfaceThicknessLinkageData[value][0]}
        console.log(value);
        let trst = surfaceThicknessLinkageData['OSP'];
        console.log(trst);
        setChange({...change,"surfaceThicknessSelectData":surfaceThicknessLinkageData[value]});
        form.setFieldsValue({"surfaceThickness":surfaceThicknessLinkageData[value][0]});
    }

    const onValuesChange = (changedValues: Store, allValues: Store)=>{
        // console.log(changedValues);
        // console.log(Object.values(changedValues));
        switch(Object.values(changedValues)[0]){
            case "Aluminum": {
                form.setFieldsValue({"layer":"1layer","minHoleSize":'1.5',"holeCopper":"none","solderMask":"white","silkscreen":"black"});
                break;
            }
            case "FR4": {
                form.setFieldsValue({"layer":"2layer","minHoleSize":'0.3', "holeCopper":'20um',"solderMask":'green',"silkscreen":'white'}); 
                break;
            }
        }
        form.submit();
        // console.log(allValues);
        // console.log(specificationRef.current);
    }

    return (
        <>
        <SpecificationHead icon="" title="PCB Specification"/>
        <Row>
            <PcbStandardFrom />
        </Row>
        {/* <Row>
            <PcbSpecialForm />
        </Row> */}
        </>

    )
}

export default PcbSpecification;