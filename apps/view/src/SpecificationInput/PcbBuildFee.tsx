import React, {useEffect} from 'react'
import {Select} from "antd";

const { Option } = Select;
const _style = {
    pcbBuildContainer: {
        width: '344px',
        height: '588px',
        background: '#FFFFFF',
        boxShadow: '0 2px 20px 0 rgba(0,0,0,0.10)',
        borderRadius: '30px',
        padding: '30px 20px 28px 20px',
    }
}

const PcbBuildFee: React.FC<any> = (props) => {
    const buildData: any[] = ['1days'];
    const DOM = (
        <div className="pcb-build-container">
            <div className="model-1">
                <div className="cost-d">Cost Details</div>
                <div className="cost-det">
                    <div>
                        <span>Board Price:</span>
                        <span>$0</span>
                    </div>
                    <div>
                        <span>Engineering Price:</span>
                        <span>$0</span>
                    </div>
                    <div>
                        <span>Test Price:</span>
                        <span>$0</span>
                    </div>
                </div>
            </div>
            <div className="model-2">
                <strong>Lead Time:</strong>
                <div className="cost-det">
                    <div>
                        <span className="selector">
                            <Select style={{ width: 120 }}>
                                {buildData.map(item => (
                                    <Option key={item} value={item}>{item}</Option>
                                ))}
                            </Select>
                        </span>
                        <span>$0</span>
                    </div>
                </div>
            </div>
            <div className="model-3">
                <div className="cost-det">
                    <div>
                        <span>Estimated Cost</span>
                        <span className="m-price">$3500</span>
                    </div>
                </div>
            </div>
            <div className="model-4">
                <span>Add to cart</span>
                <span>Buy Now</span>
            </div>
        </div>
    )
    return DOM;
}

export default PcbBuildFee;
