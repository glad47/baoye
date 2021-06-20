import React, {useEffect, useRef, useState} from 'react';
// import { withRouter } from 'react-router-dom'
import '../styles/pay-successful.css'
import PcbLayout from "../Components/PcbLayout";
import {Form, Input, Checkbox, Modal, message} from "antd";
import {DescribeInvoiceInfo, SendContactEmail} from "./AjaxService";
import {checkEmail, getQueryVariable} from "../util";
import InvoiceTemp from "../Components/Invoice/InvoiceTemp";

const {TextArea} = Input;
const fieldMatch = {
    filed1: '1.How did you hear about us?%0a%0d',
    filed2: '2.Do you feel satisfied with the customer service specialist exclusively serving you?%0a%0d',
    filed3: '3.Do you want to re-purchase from PCBONLINE?%0a%0d',
    filed4: '4.Weve been working hard to improve the user experience. What do you think we can do to optimize our website?%0a%0d',
}
const PaySuccessful = (props: any) => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [invoiceData, setInvoiceData] = useState();
    const invoRef: any = useRef();
    const [currentOrderId, setCurrentOrderId] = useState<any>();
    const [boxCheck, setBoxCheck] = useState<boolean>(false);
    const [inputVal, setInputVal] = useState<string>('I found a very easy to use website, recommend to you, come to experience it https://www.pcbonline.com');
    const [sendEmail, setSendEmail] = useState<any>();
    const [canSend, setCanSend] = useState<boolean>(false);
    useEffect(() => {
        let _id;
        if (props.location.state) {
            _id = props.location.state.id;
            setCurrentOrderId(_id);
            DescribeInvoiceInfo(_id).then((res: any) => {
                setInvoiceData(res);
            })
        }
    }, []);

    useEffect(() => {
        if (sendEmail) {
            if (checkEmail(sendEmail)) {
                setCanSend(true);
            } else {
                setCanSend(false);
            }
        }
    }, [sendEmail]);

    const handleModalVisible = () => {
        if (invoiceData) setIsModalVisible(true)
    }

    const handleOk = () => {
        invoRef.current.toPDF();
    }

    const submitForm = (values: any) => {
        let str: any = [];
        // @ts-ignore
        Object.keys(values).forEach((key: any) => values[key] && str.push(fieldMatch[key] + values[key] + '%0a%0d'))
        console.log('str', str)
        window.location.href = `mailto:info@pcbonline.com?subject=${str.join(' ')}&body=Hi,Owen Chang`
        // SendContactEmail(values).then(res => {
        //     console.log('res', res)
        // });
    }

    // 发送邮件
    const submitEmail = () => {
        const dtd = {
            content: inputVal,
            email: sendEmail
        }
        const fromData = new FormData();
        fromData.append("content", inputVal);
        fromData.append("email", sendEmail);
        SendContactEmail(fromData).then(res => {
            console.log('res', res);
            message.success('Send successful!')
        })
    }
    return (
        <PcbLayout>
            <div className="p-suc">
                <div className="rig-form">
                    <div className="header">
                        <div className="txt">
                            <strong>THANK YOU</strong>
                            <span>FOR YOUR PURCHASE！</span>
                        </div>
                        <div className="order-num">
                            <span className="num">Order number is: <a href="#">{currentOrderId}</a></span>
                            <span className="n-tips">You will receive an email confirmation shortly at team@pcbonline.com</span>
                            <button onClick={handleModalVisible}>
                                <img src={require('../images/invoice.png')} alt=""/>
                                Print Invoice
                            </button>
                        </div>
                    </div>
                    <div className="form-container">
                        <div className="header">
                            <strong>
                                <img src={require('../images/small-ques.png')} alt=""/>
                                We're Listening !  Let us Know what you think
                            </strong>
                        </div>
                    </div>
                    <Form form={form}
                          onFinish={submitForm}
                          layout="vertical">
                        <Form.Item name="filed1" label="1、How did you hear about us?" required>
                            <Input />
                        </Form.Item>

                        <Form.Item name="filed2" label="2、Do you feel satisfied with the customer service specialist exclusively serving you?">
                            <Input />
                        </Form.Item>

                        <Form.Item name="filed3" label="3、Do you want to re-purchase from PCBONLINE?">
                            <Input />
                        </Form.Item>

                        <Form.Item name="filed4" label="4、We've been working hard to improve the user experience. What do you think we can do to optimize our website?">
                            <TextArea />
                        </Form.Item>

                        <Form.Item style={{textAlign: 'right'}}>
                            <button className="p-submit">SUBMIT</button>
                        </Form.Item>
                    </Form>
                    <div className="join">
                        <div className="check-us">
                            <Checkbox checked={boxCheck} onChange={() => setBoxCheck(!boxCheck)}>
                                Join our referral program and benefit with the referee
                            </Checkbox>
                        </div>
                        {
                            boxCheck &&
                                <>
                                    <div className="p-tips">
                                        <span>Tell a Friend,Know someone who would enjoy our work ? Tell them about it.Click here to send them a quick email</span>
                                        <span className="click"></span>
                                    </div>
                                    <div className="send-email">
                                        <div>
                                            <div className="bac">
                                    <span>
                                        {inputVal}
                                    </span>
                                            </div>
                                            <div className="send-input">
                                                <input type="text" value={sendEmail} onChange={e => {setSendEmail(e.target.value)}}/>
                                                <button onClick={submitEmail} disabled={!canSend}>SEND</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bt-txt">
                            <span>
                                <img src={require('../images/quate_icon24.png')} alt=""/>
                                When the referral is complete and your referee places the order, you will receive our preferential plan and redemption code sent by email. You will enjoy a up to 30% order discount reward. (It depends on your referee's order amount, and we reserve all the right for the final explanation.)
                            </span>
                                    </div>
                                </>
                        }
                    </div>
                </div>
                <div className="lef-img">
                    <img src={require('./../images/paysuc-bac.png')} alt=""/>
                    <div className="concat-info">
                        <div className="concat-lef">
                            <div>
                                <div className="lf">
                                    <img src={require('../images/paysuc-qus.png')} alt="" className="quc"/>
                                </div>
                                <div className="rg">
                                    <strong>Contact your exclusive customer service immediately</strong>
                                    <div className="btn-group">
                                        <button>
                                            <img src={require('../images/paysuc-call.png')} alt=""/>
                                            phone
                                        </button>
                                        <button>
                                            <img src={require('../images/paysuc-email.png')} alt=""/>
                                            email
                                        </button>
                                        <button>
                                            <img src={require('../images/paysuc-skype.png')} alt=""/>
                                            skype
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="concat-rig">
                            <div>
                                <img src={require('../images/dhl.png')} alt=""/>
                                <strong>Tina</strong>
                                <span>Exclusive sales</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                width="85%"
                visible={isModalVisible}
                okText="Download PDF"
                onCancel={() => setIsModalVisible(false)}
                onOk={handleOk}>
                {
                    invoiceData && <InvoiceTemp invoiceData={invoiceData} cRef={invoRef}/>
                }
            </Modal>
        </PcbLayout>
    )
}

export default PaySuccessful;