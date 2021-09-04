/*
 * @Descripttion: 报价页面的FROM控制
 * @version: 1.0
 * @Author: 
 * @Date: 2021-07-17 11:10:06
 * @LastEditors: ho huang
 * @LastEditTime: 2021-09-04 18:12:11
 */
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
            return <div className="pcb-spec" id="pcbSpec"><SpecificationHead icon={"123"} title="PCB Specifications" description="Please carefully check or adjust the parameters"/><PcbSpecification isMobileSize={props.isMobileSize}/></div>
        case 1:
            return <div className="pcb-stencil"><StencilForm isMobileSize={props.isMobileSize}/></div>
        case 2:
            return <div className="pcb-assembly"><SpecificationTitle title="Information" /><AssemblyFrom isMobileSize={props.isMobileSize}/></div>
        default:
            return null;
    }
}

export default FormControl;