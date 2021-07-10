import React, { useState } from 'react'
import SpecificationHead from './SpecificationHead';
import PcbSpecification from './PcbSpecification';
import StencilForm from './StencilForm';
import AssemblyFrom from './AssemblyForm';
import SpecificationTitle from './SpecificationTitle';

interface FormControlProps {
    quoteMode: number
    isMobileSize?:boolean
}

const FormControl: React.FC<FormControlProps> = (props) =>{
    const { quoteMode } = props; 
    switch (quoteMode) {
        case 0:
            return <div className="pcb-spec" id="pcbSpec"><SpecificationHead icon={"123"} title="PCB Specification" description="Please carefully check or adjust the parameters"/><PcbSpecification isMobileSize={props.isMobileSize}/></div>
        case 1:
            return <div className="pcb-stencil"><StencilForm isMobileSize={props.isMobileSize}/></div>
        case 2:
            return <div className="pcb-assembly"><SpecificationTitle title="Information" /><AssemblyFrom isMobileSize={props.isMobileSize}/></div>
        default:
            return null;
    }
}

export default FormControl;