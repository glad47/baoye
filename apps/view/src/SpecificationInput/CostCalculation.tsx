import React from 'react';
import { Row } from 'antd';
import { WalletOutlined, SettingOutlined, DashboardOutlined } from '@ant-design/icons';

interface CastCalculationProps {
    boardFee?: number
    engineeringFee?: number
    testFee?: number
}

const CastCalculation: React.FC<CastCalculationProps> = (props) =>{
    const {boardFee,engineeringFee,testFee} = props
    return (
        <div className="fee-cont">
            <Row>
                <div><WalletOutlined /><span>Board Fee</span></div><span>${boardFee}</span>  
            </Row>
            <Row>
                <div><SettingOutlined /><span>Engineering Fee</span></div><span>${engineeringFee}</span>
            </Row>
            <Row>
                <div><DashboardOutlined /><span>Test Fee</span></div><span>${testFee}</span>
            </Row>
        </div>       
    )
}

CastCalculation.defaultProps = {boardFee:0,engineeringFee:0,testFee:0}

export default CastCalculation;