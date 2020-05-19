import React from 'react';
import { Row, Col, Select } from 'antd';
import { FilterOutlined, MailOutlined, CustomerServiceOutlined, FileDoneOutlined } from '@ant-design/icons';


interface ManualFormProps { }

const { Option } = Select;

const ManualForm: React.FC<ManualFormProps> = (props) =>{
    return (
    
        <div className="manual-cont">
            <div className="manual-plate">
            <Row className="manual-title">
                <Col span={24}>
                    <h4><FilterOutlined /> <i>Assemble Specification</i></h4>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Row>
                        <Col span={12}>PCB Dimensions  type</Col>
                        <Col span={12}>
                            <Select defaultValue="lucy">
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row>
                        <Col span={12}>quantity in Panel </Col>
                        <Col span={12}>
                            <Select defaultValue="lucy">
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Row>
                        <Col span={12}>PCB Dimensions  type</Col>
                        <Col span={12}>
                            <Select defaultValue="lucy">
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row>
                        <Col span={12}>quantity in Panel </Col>
                        <Col span={12}>
                            <Select defaultValue="lucy">
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                        </Col>
                    </Row>
                </Col>
            </Row>
            </div> 
            <div className="manual-plate">
            <Row className="manual-title">
                <Col span={24}>
                    <h4><FileDoneOutlined /> <i>SMT Information</i></h4>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Row>
                        <Col span={12}>PCB Dimensions  type</Col>
                        <Col span={12}>
                            <Select defaultValue="lucy">
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row>
                        <Col span={12}>quantity in Panel </Col>
                        <Col span={12}>
                            <Select defaultValue="lucy">
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Row>
                        <Col span={12}>PCB Dimensions  type</Col>
                        <Col span={12}>
                            <Select defaultValue="lucy">
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row>
                        <Col span={12}>quantity in Panel </Col>
                        <Col span={12}>
                            <Select defaultValue="lucy">
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                        </Col>
                    </Row>
                </Col>
            </Row>
            </div> 
            <div className="manual-plate">
            <Row className="manual-title">
                <Col span={24}>
                    <h4><MailOutlined /> <i>THT Information</i></h4>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Row>
                        <Col span={12}>PCB Dimensions  type</Col>
                        <Col span={12}>
                            <Select defaultValue="lucy">
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row>
                        <Col span={12}>quantity in Panel </Col>
                        <Col span={12}>
                            <Select defaultValue="lucy">
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Row>
                        <Col span={12}>PCB Dimensions  type</Col>
                        <Col span={12}>
                            <Select defaultValue="lucy">
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row>
                        <Col span={12}>quantity in Panel </Col>
                        <Col span={12}>
                            <Select defaultValue="lucy">
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                        </Col>
                    </Row>
                </Col>
            </Row>
            </div> 
            <div className="manual-plate">
            <Row className="manual-title">
                <Col span={24}>
                    <h4><CustomerServiceOutlined /> <i>Service options</i></h4>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Row>
                        <Col span={12}>PCB Dimensions  type</Col>
                        <Col span={12}>
                            <Select defaultValue="lucy">
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row>
                        <Col span={12}>quantity in Panel </Col>
                        <Col span={12}>
                            <Select defaultValue="lucy">
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Row>
                        <Col span={12}>PCB Dimensions  type</Col>
                        <Col span={12}>
                            <Select defaultValue="lucy">
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row>
                        <Col span={12}>quantity in Panel </Col>
                        <Col span={12}>
                            <Select defaultValue="lucy">
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                        </Col>
                    </Row>
                </Col>
            </Row>
            </div> 
       </div>
    )
}

export default ManualForm;