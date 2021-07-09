import React, { useState } from 'react';
import { Row, Col, Input } from 'antd';

const img = require('../images/quate_close.png');


interface sizeValue {
    sizeX?: string;
    sizeY?: string;
}

interface ObserverSizeProps {
    value?: sizeValue;
    onChange?: (value: sizeValue) => void;
    isDisabled?: boolean;
    isMobileSize?:boolean
}

const ObserverSize: React.FC<ObserverSizeProps> = (props) => {
    const { value, onChange, isDisabled } = props
    const [numberX, setNumberX] = useState(value?.sizeX);
    const [numberY, setNumberY] = useState(value?.sizeY);

    const triggerChange = (changedValue: sizeValue) => {
        if (onChange) {
            onChange(changedValue);
        }
    }

    const onNumberXChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newNumber = e.target.value;
        setNumberX(newNumber);
        triggerChange({ ...value, sizeX: newNumber });
    }

    const onNumberYChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newNumber = e.target.value;
        setNumberY(newNumber);
        triggerChange({ ...value, sizeY: newNumber });
    }
    return (
        <Input.Group size={!props.isMobileSize ? "large" : "default"}>
            <Row gutter={!props.isMobileSize ? 8 : 4}>
                <Col span={!props.isMobileSize ? 11 : 6}>
                    <Input
                        className="color-yel"
                        type="text"
                        value={value && value.sizeX || numberX}
                        onChange={onNumberXChange}
                        disabled={isDisabled}
                    />
                </Col>
                {
                    !props.isMobileSize &&
                    <Col span={2} style={{display: 'flex', 'alignItems': 'center'}}>
                        <img src={img} alt="" style={{height: '16px'}}/>
                    </Col>
                }
                <Col span={!props.isMobileSize ? 11 : 6}>
                    <Input
                        className="color-yel"
                        type="text"
                        value={value && value.sizeY || numberY}
                        onChange={onNumberYChange}
                        disabled={isDisabled}
                    />
                </Col>
            </Row>
        </Input.Group>
    )
}

export default ObserverSize;
