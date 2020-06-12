import React, { useState } from 'react';
import { Row, Col, Input } from 'antd';


interface sizeValue {
    sizeX?: string;
    sizeY?: string;
}

interface ObserverSizeProps {
    value?: sizeValue;
    onChange?: (value: sizeValue) => void;
    isDisabled? : boolean;
}

const ObserverSize: React.FC<ObserverSizeProps> = (props) =>{
    const { value, onChange, isDisabled ,circuit} = props
    const {width,length,quantity}=circuit || 0
    const [numberX, setNumberX] = useState(value?.sizeX);
    const [numberY, setNumberY] = useState(value?.sizeY); 

    const triggerChange = (changedValue: sizeValue) =>{
        if(onChange){
            onChange(changedValue);
        }
    }

    const onNumberXChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const newNumber = e.target.value;
        setNumberX(newNumber);
        triggerChange({...value, sizeX: newNumber});
    }

    const onNumberYChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const newNumber = e.target.value;
        setNumberY(newNumber);
        triggerChange({...value, sizeY: newNumber });
    }
    return(
        <Input.Group size="large">
            <Row gutter={8}>
                <Col span={12}>
                        <Input
                        type="text"
                        // value={value && value.sizeX || numberX}
                        value={width}
                        onChange={onNumberXChange}
                        disabled = {isDisabled}
                    />
                </Col>
                <Col span={12}>
                    <Input
                    type="text"
                    // value={value && value.sizeY || numberY}
                    value={length}
                    onChange={onNumberYChange}
                    disabled = { isDisabled }
                />
                </Col>
            </Row>
        </Input.Group>
    )
}

export default ObserverSize;
