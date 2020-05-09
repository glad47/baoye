import React from 'react';
import { Row } from 'antd';

interface CastCalculationProps {
    boardFee?: number
    engineeringFee?: number
    testFee?: number
}

const CastCalculation: React.FC<CastCalculationProps> = (props) =>{
    const {boardFee,engineeringFee,testFee} = props
    return (
        <div>
            <Row>
                Board Fee      ${boardFee}
            </Row>
            <Row>
                Engineering Fee  ${engineeringFee}
            </Row>
            <Row>
                Test Fee    ${testFee}
            </Row>
        </div>       
    )
}

CastCalculation.defaultProps = {boardFee:0,engineeringFee:0,testFee:0}

export default CastCalculation;