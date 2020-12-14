import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'antd';
import { Store } from 'antd/lib/form/interface';
import PcbStandardFrom from './PcbStandardForm';
import PcbSpecialForm from './PcbSpecialForm';
import { useAppState, setFieldMode } from '../state';


interface PcbSpecificationProps {
    item?: object;
    onChange?: () => void;
    isMobileSize?: boolean
}

type LinkageData = { [index: string]: string[] };

const surfaceThicknessLinkageData: LinkageData = {
    "HASL with lead": ['2.54-25.4um'],
    "HASL lead free": ['2.54-25.4um'],
    "Immersion Gold": ['Ni:120-150u "Au:1u"', 'Ni:120-150u "Au:2u"', 'Ni:120-150u "Au:3u"'],
    "Immersion tin": ['0.5um-0.7um'],
    "Immersion silver": ['≥0.05um'],
    "OSP": ['0.25-0.5um']
}

const layerLinkageData: LinkageData = {
    "1layer": ['none'],
    "2layer": ['']
}

const changedData = {
    "layer": '2layer',
    "minHoleSize": '0.3',
    "holeCopper": '20um',
    "solderMask": 'green',
    "silkscreen": 'white',
    "showCTI": true,
    "surfaceThicknessSelectData": ['2.54-25.4um'],
    "defaultSurfaceThickness": '2.54-25.4um',
}

export const INITIAL_STANDARD: Store = {
    "material": 'FR4',
    "tg": '135',
    "layer": '2layer',
    "innerCopper": 'none',
    "minTrack": '5/5mil',
    "minHoleSize": '0.3',
    "surfaceFinish": 'HASL lead free',
    "solderMask": 'green',
    "heatConductivity": '1w',
    "thickness": '1.6mm',
    "cti": '175≤CTI<250',
    "outerCopper": '1oz',
    "bgaSize": '≥0.30mm',
    "holeCopper": '20um',
    "surfaceThickness": '0.25-0.5um',
    "silkscreen": 'white',
}

export const INITIAL_SPECIAL: Store = {
    hdi: false,
    customStackup: false,
    peelableSolderMask: false,
    edgePlating: false,
    viaInPad: false,
    negativePostitiveCopper: false,
    countersinks: false,
    controlConcaveRouting: false,
    backDrill: false,
    carbonMask: false,
    impedanceControl: false,
    halfHolePlated: false,
    pressHoles: false,
    acceptableQualityLevels: false,
    bevellingCamfer: false,
};

export const INITIAL_STENCIL: Store = {
    quantity: 1,
    stencilSide: 'Top And Bottom (On Single Stencil)',
    dimensions: null,
    thickness: '0.15',
    existingFiducials: 'None',
    detailed: null,

}

export const INITIAL_ASSEMBLY: Store = {
    assemblyType: 1,
    uniquePartNum: null,
    smtPartNum: null,
    throughHolePartNum: null,
    assemblySide: 'Single Side',
    quantity: null,
}

const PcbSpecification: React.FC<PcbSpecificationProps> = (props) => {
    // const [ selectedRadio, setSelectedRadio ] =useState("standard");
    // const [ standardFrom, setStandardFrom ] = useState(INITIAL_STANDARD);
    // const [ specialFrom, setSpecialFrom ] = useState(INITIAL_SPECIAL);
    const [isShowFlag,setShowFlag]=useState(false)
    const { fieldMode } = useAppState()
    const isShowMobileSpecial = () => {
        setShowFlag(!isShowFlag)
    }
    return (
        <>
            {/* <SpecificationHead icon="" title="PCB Specification" /> */}
            {!props.isMobileSize ? <Row>
                {
                    fieldMode === "standard" ?
                        <PcbStandardFrom onChange={props.onChange} /> :
                        <PcbSpecialForm onChange={props.onChange} />
                }
            </Row> :
                <div>
                    <PcbStandardFrom onChange={props.onChange} />
                    <div className='mobile-special-flags' onClick={isShowMobileSpecial}>
                        <div className='mobile-special-content'>
                            <span>Special</span>
                            <div></div>
                        </div>
                    </div>
                    {isShowFlag? <div className='mobile-special-form'>
                        <PcbSpecialForm onChange={props.onChange} isMobileSize={props.isMobileSize} />
                    </div> : null}

                </div>
            }
        </>

    )
}

export default PcbSpecification;