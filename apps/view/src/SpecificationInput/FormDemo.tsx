import React from 'react';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const  tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const nnnnn: Array<string> = ['adaf','asdfadf','asdf'];


const FormDemo = ()=>{
    const teste = ['male','female','other'];
    const [form] = Form.useForm();
    const onGenderChange = (value: string) =>{
        switch (value) {
            case "male":
              form.setFieldsValue({ note: "Hi, man!" });
              return;
            case "female":
              form.setFieldsValue({ note: "Hi, lady!" });
              return;
            case "other":
              form.setFieldsValue({ note: "Hi there!" });
              return;
        }
    };

    const onFinish = (v: any)=>{
        console.log(v);
    }

    const onReset = ()=>{
        form.resetFields();
    }

    const onFill = () =>{
        form.setFieldsValue({
            note: 'Hello world',
            gender: 'male',
        })
    }

    const onValuesChange = (changedValues: any, allValues: any)=>{
        console.log(changedValues);
        console.log(allValues);
    }

    

    return (
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} onValuesChange={onValuesChange}>
            <Form.Item name="note" label="Note" rules={[{ required: true}]}>
                <Input />
            </Form.Item>
            <Form.Item name="gender" label="Gender" rules={[{ required: true}]}>
                <Select placeholder="选择一个选项,改变输入文本!" onChange={onGenderChange} allowClear>
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option>
                </Select>
            </Form.Item>
            <Form.Item name="test" label="Test">
                <Select>
                    { nnnnn.map( i => (
                        <Option key={i} value={i}>{i}</Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
            >
                {({ getFieldValue }) => {
                return getFieldValue('gender') === 'other' ? (
                    <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
                    <Input />
                    </Form.Item>
                ) : null;
                }}
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                Reset
                </Button>
                <Button type="link" htmlType="button" onClick={onFill}>
                Fill form
                </Button>
            </Form.Item>
        </Form>
    )
}

export default FormDemo;