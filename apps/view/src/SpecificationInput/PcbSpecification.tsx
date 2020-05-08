import React, { useState } from 'react';
import { Row, Col, Form } from 'antd';
import { Store } from 'antd/lib/form/interface';
import SpecificationHead from './SpecificationHead';
import PcbStandardFrom from './PcbStandardForm';
import PcbSpecialForm from './PcbSpecialForm';
import { useAppState, setFieldMode } from '../state';


interface PcbSpecificationProps {
    item?: object;
    onChange?: (value: Store)=>void;
}

type LinkageData = {[index: string]: string[]};

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

export const INITIAL_STANDARD: Store = {
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

export const INITIAL_SPECIAL: Store = {
    hdi: true,
    customStackup: false,
    peelableSolderMask: true,
    edgePlating: true,
    viaInPad: false,
    negativePostitiveCopper: false,
    countersinks: false,
    controlConcaveRouting: true,
    backDrill: true,
    carbonMask: true,
    impedanceControl: true,
    halfHolePlated: false,  
    pressHoles: false,
    acceptableQualityLevels: false   
};

const PcbSpecification: React.FC<PcbSpecificationProps> = (props) => {
    // const [ selectedRadio, setSelectedRadio ] =useState("standard");
    // const [ standardFrom, setStandardFrom ] = useState(INITIAL_STANDARD);
    // const [ specialFrom, setSpecialFrom ] = useState(INITIAL_SPECIAL);

    const { fieldMode } = useAppState()

    return (
        <>
        {/* <SpecificationHead icon="" title="PCB Specification" /> */}
        <Row>
            { 
            fieldMode === "standard" ? 
            <PcbStandardFrom  onChange={(v)=>{}}/> : 
            <PcbSpecialForm onChange={(v)=> {}}/>
            }
        </Row>
        </>

    )
}

export default PcbSpecification;