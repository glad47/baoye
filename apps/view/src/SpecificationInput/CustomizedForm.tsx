import React from 'react';
import { Form, Input } from 'antd';

interface FieldData {
    name: string[];
    value: any;
    touched?: boolean;
    validating?: boolean;
    errors?: string[];
}

interface CustomizedFormProps {
    onChange: (fields: FieldData[]) => void;
    fields: FieldData[];
}

const CustomizedForm: React.FC<CustomizedFormProps> = ({onChange,fields}) =>{
    return (
        <Form
        name="global_state"
        layout="inline"
        fields={fields}
        onFieldsChange={(changedFields, allFields) => {onChange}}
        >
        <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Username is required!' }]}>
            <Input />
        </Form.Item>
        </Form>
    );
};

export default CustomizedForm;