import React from 'react';
import { Row } from 'antd';
import { WalletOutlined, SettingOutlined, DashboardOutlined } from '@ant-design/icons';
import { Fade } from '../ui';

interface CastCalculationProps {
    boardFee?: number
    engineeringFee?: number
    testFee?: number
    quoteMode: number
    stencilFee: number
    assemblyFee: number
}



const CastCalculation: React.FC<CastCalculationProps> = (props) =>{
    const {boardFee,engineeringFee,testFee,quoteMode,stencilFee,assemblyFee} = props

    let feeLoading;
    if(quoteMode === 0){
        feeLoading = true;
    } else if(quoteMode === 1){
        //钢网
        if(boardFee === 0){
            feeLoading = false;            
        }else{
            feeLoading = true;
        }        
    } ;
    return (
        <div className="fee-cont">
            <Fade in={feeLoading}>
            <Row>
                <div><WalletOutlined /><span>Board Fee</span></div><span>${boardFee}</span>  
            </Row>
            </Fade>
            <Fade in={feeLoading}>
            <Row>
                <div><SettingOutlined /><span>Engineering Fee</span></div><span>${engineeringFee}</span>
            </Row>
            </Fade>
            <Fade in={feeLoading}>
            <Row>
                <div><DashboardOutlined /><span>Test Fee</span></div><span>${testFee}</span>
            </Row>
            </Fade>

            <Fade in={quoteMode === 1}>
                <Row>
                <div><WalletOutlined /><span>Stencil Fee</span></div><span>${stencilFee}</span> 
                </Row>
            </Fade>            

            <Fade in={quoteMode === 2}>
                <Row>
                <div><WalletOutlined /><span>Assembly Fee</span></div><span>${assemblyFee}</span> 
                </Row> 
            </Fade> 
        </div>       
    )
}

CastCalculation.defaultProps = {boardFee:0,engineeringFee:0,testFee:0}

export default CastCalculation;