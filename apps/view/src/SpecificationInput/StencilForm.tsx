import React, { useState } from 'react';
import { Row, Col, Select, Form, Modal, Input, Table, Radio } from 'antd';
import ObserverSelect from './ObserverSelect';
import Column from 'antd/lib/table/Column';
import { useAppState, changeStencilField } from '../state';
import { Store } from 'antd/lib/form/interface';

interface StencilFormProps {
    isMobileSize?: boolean
}
const { Option } = Select;
const stencilSideSelectData = ['Top And Bottom (On Single Stencil)', 'Top And Bottom (On Separate Stencil)', 'Top', 'Bottom'];
const thincknessSelectData = [
    { id: '0.10', name: '0.10MM' },
    { id: '0.12', name: '0.12MM' },
    { id: '0.15', name: '0.15MM' },
    { id: '0.20', name: '0.20MM' }];
const existingFiducialsSelectData = ['None', 'Half Lasered', 'Lasered Through']

const data = [
    { "id": 1, "stencilSizex": 370, "stencilSizey": 470, "stencilAreax": 190, "stencilAreay": 290, "price": 105, "priceToUSD": 15, "weight": 2.50, "materialName": "Farmework" },
    { "id": 2, "stencilSizex": 420, "stencilSizey": 520, "stencilAreax": 240, "stencilAreay": 340, "price": 155, "priceToUSD": 23, "weight": 3.00, "materialName": "Farmework" },
    { "id": 3, "stencilSizex": 400, "stencilSizey": 600, "stencilAreax": 220, "stencilAreay": 400, "price": 195, "priceToUSD": 29, "weight": 3.50, "materialName": "Farmework" },
    { "id": 4, "stencilSizex": 400, "stencilSizey": 800, "stencilAreax": 220, "stencilAreay": 600, "price": 235, "priceToUSD": 35, "weight": 4.00, "materialName": "Farmework" },
    { "id": 5, "stencilSizex": 450, "stencilSizey": 550, "stencilAreax": 270, "stencilAreay": 370, "price": 235, "priceToUSD": 35, "weight": 3.50, "materialName": "Farmework" },
    { "id": 6, "stencilSizex": 550, "stencilSizey": 650, "stencilAreax": 350, "stencilAreay": 380, "price": 300, "priceToUSD": 44, "weight": 5.00, "materialName": "Farmework" },
    { "id": 7, "stencilSizex": 584, "stencilSizey": 584, "stencilAreax": 380, "stencilAreay": 380, "price": 250, "priceToUSD": 37, "weight": 5.00, "materialName": "Farmework" },
    { "id": 8, "stencilSizex": 736, "stencilSizey": 736, "stencilAreax": 500, "stencilAreay": 500, "price": 390, "priceToUSD": 57, "weight": 7.00, "materialName": "Farmework" },
    { "id": 9, "stencilSizex": 280, "stencilSizey": 380, "stencilAreax": 200, "stencilAreay": 300, "price": 70, "priceToUSD": 10, "weight": 3.00, "materialName": "Non-Framework" },
    { "id": 10, "stencilSizex": 450, "stencilSizey": 550, "stencilAreax": 380, "stencilAreay": 480, "price": 100, "priceToUSD": 15, "weight": 3.00, "materialName": "Non-Framework" },
    { "id": 11, "stencilSizex": 500, "stencilSizey": 800, "stencilAreax": 420, "stencilAreay": 720, "price": 200, "priceToUSD": 29, "weight": 3.00, "materialName": "Non-Framework" }
];
const initSelectedRowKeys: number[] | string[] = []

const StencilForm: React.FC<StencilFormProps> = (props) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState(initSelectedRowKeys);
    const { dispatch, stencilField } = useAppState();
    const onOpenMode = () => {
        setVisible(true);
    }
    const handleCancel = () => {
        setVisible(false);
    }
    const onSelectedRowKeysChange = (selectedRowKeys: any, selectedRows: {}[]) => {
        setSelectedRowKeys(selectedRowKeys);
    }

    const handleTableRowClick = (record: any) => {
        console.log(record);
        setSelectedRowKeys([record.id]);
        //把数据赋值到form表单中
        const dimen = record.materialName + ' ' + record.stencilSizex + '*' + record.stencilSizey + '(Valid area ' + record.stencilAreax + '*' + record.stencilAreay + ')';
        form.setFieldsValue({ "dimensions": dimen, "detailed": record })

        //关闭model
        setVisible(false);
        form.submit();
    }

    const onValuesChange = () => {
        form.submit()
    }

    const onFinish = (v: Store) => {
        dispatch(changeStencilField(v))
    }

    const defaultSelectStyle = !props.isMobileSize ? { width: '280px' } : { width: '100%' };

    return (
        !props.isMobileSize ? <div>
            <Form form={form} initialValues={stencilField} onValuesChange={onValuesChange} onFinish={onFinish}>
                <Row>
                    <Col span={12}><span>Quantity</span></Col>
                    <Col span={12}>
                        <Form.Item name="quantity">
                            <Input style={defaultSelectStyle} />
                        </Form.Item>
                        <Form.Item noStyle name="detailed">
                            <Input type="hidden" />
                        </Form.Item>
                    </Col>
                </Row>
                
                <Row>
                    <Col span={12}><span>Stencil Side</span></Col>
                    <Col span={12}>
                        <Form.Item>
                            <ObserverSelect item={stencilSideSelectData} name="stencilSide" selectStyle={defaultSelectStyle} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}><span>Dimensions</span></Col>
                    <Col span={12}>
                        <Form.Item name="dimensions">
                            {/* <ObserverSelect item={stencilSideSelectData} name="stencilSide" onChange={onOpenMode}/> */}
                            <Input onClick={onOpenMode} style={defaultSelectStyle} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}><span>Thickness</span></Col>
                    <Col span={12}>
                        <Form.Item name="thickness">
                            <Select style={{ width: '280px' }}>
                                {
                                    thincknessSelectData.map(item => (
                                        <Option key={item.id} value={item.id}>{item.name}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}><span>Existing Fiducials</span></Col>
                    <Col span={12}>
                        <Form.Item>
                            <ObserverSelect item={existingFiducialsSelectData} name="existingFiducials" selectStyle={defaultSelectStyle} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Modal visible={visible}
                onCancel={handleCancel}
                footer={null}
                width={600}
            >
                <Row>
                    <Table
                        dataSource={data}
                        pagination={false}
                        size={"small"}
                        rowSelection={{ type: 'radio', onChange: onSelectedRowKeysChange, selectedRowKeys }}
                        rowKey="id"
                        onRow={record => {
                            return {
                                onClick: event => { handleTableRowClick(record) }
                            }
                        }}
                    >
                        {/* <Column title="Choose" dataIndex="choose" key="id" /> */}
                        <Column title="Type" dataIndex="materialName" />
                        <Column title="SizeX" dataIndex="stencilSizex" />
                        <Column title="SizeY" dataIndex="stencilSizey" />
                        <Column title="AreayX" dataIndex="stencilAreax" />
                        <Column title="AreayY" dataIndex="stencilAreay" />
                        <Column title="Weight" dataIndex="weight" />
                        <Column title="Preice" dataIndex="priceToUSD" />
                    </Table>
                </Row>

            </Modal>
        </div> :
            <div>
                <Form form={form} initialValues={stencilField} onValuesChange={onValuesChange} onFinish={onFinish}>

                    <div className='mobile-stencil-form'>
                        <span>Stencil Side</span>

                        <Form.Item>
                            <ObserverSelect item={stencilSideSelectData} name="stencilSide" selectStyle={defaultSelectStyle} />
                        </Form.Item>
                    </div>
                    <div className='mobile-stencil-form'>
                        <span>Dimensions</span>
                        <Form.Item name="dimensions">
                            <Input onClick={onOpenMode} style={defaultSelectStyle} />
                        </Form.Item>
                    </div>


                    <div className='mobile-stencil-form'>
                        <span>Thickness</span>
                        <Form.Item name="thickness" className='mobile-thickness'>
                            <Radio.Group>
                                {
                                    thincknessSelectData.map(item => (
                                        <Radio key={item.id} value={item.id}>{item.name}</Radio>
                                    ))
                                }
                            </Radio.Group>
                        </Form.Item>
                    </div>

                    <div className='mobile-stencil-form'>
                        <span>Existing Fiducials</span>
                        <Form.Item>
                            <ObserverSelect item={existingFiducialsSelectData} name="existingFiducials" selectStyle={defaultSelectStyle} />
                        </Form.Item>
                    </div>

                    <div className='mobile-stencil-form'>
                        <span>Quantity</span>
                        <Form.Item name="quantity">
                            <Input style={defaultSelectStyle} />
                        </Form.Item>
                        <Form.Item noStyle name="detailed">
                            <Input type="hidden" />
                        </Form.Item>
                    </div>
                    <Modal visible={visible}
                        onCancel={handleCancel}
                        footer={null}
                        width={600}
                    >
                        <Table
                            dataSource={data}
                            pagination={false}
                            size={"small"}
                            rowSelection={{ type: 'radio', onChange: onSelectedRowKeysChange, selectedRowKeys }}
                            rowKey="id"
                            onRow={record => {
                                return {
                                    onClick: event => { handleTableRowClick(record) }
                                }
                            }}
                        >
                            <Column title="Type" dataIndex="materialName" />
                            <Column title="SizeX" dataIndex="stencilSizex" />
                            <Column title="SizeY" dataIndex="stencilSizey" />
                            <Column title="AreayX" dataIndex="stencilAreax" />
                            <Column title="AreayY" dataIndex="stencilAreay" />
                            <Column title="Weight" dataIndex="weight" />
                            <Column title="Preice" dataIndex="priceToUSD" />
                        </Table>
                    </Modal>
                </Form>
            </div>
    )
}

export default StencilForm;