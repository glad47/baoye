import React, {useEffect, useState} from 'react';
import '../styles/pay-successful.css'
import PcbLayout from "../Components/PcbLayout";
import {Form, Input, Checkbox} from "antd";
import {DescribeInvoiceInfo} from "./AjaxService";

const {TextArea} = Input;
const PaySuccessful = () => {
    const [form] = Form.useForm();
    useEffect(() => {
        DescribeInvoiceInfo('175').then(res => {
            console.log('res', res)
        })
    }, [])
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
                            <span className="num">Order number is: <a href="#">P67493764837</a></span>
                            <span className="n-tips">You will receive an email confirmation shortly at team@pcbonline.com</span>
                            <button>
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
                          layout="vertical">
                        <Form.Item label="1、How did you hear about us?">
                            <Input />
                        </Form.Item>

                        <Form.Item label="2、Do you feel satisfied with the customer service specialist exclusively serving you?">
                            <Input />
                        </Form.Item>

                        <Form.Item label="3、Do you want to re-purchase from PCBONLINE?">
                            <Input />
                        </Form.Item>

                        <Form.Item label="4、We've been working hard to improve the user experience. What do you think we can do to optimize our website?">
                            <TextArea />
                        </Form.Item>

                        <Form.Item style={{textAlign: 'right'}}>
                            <button className="p-submit">SUBMIT</button>
                        </Form.Item>
                    </Form>
                    <div className="join">
                        <div className="check-us">
                            <Checkbox>
                                Join our referral program and benefit with the referee
                            </Checkbox>
                        </div>
                        <div className="p-tips">
                            <span>Tell a Friend,Know someone who would enjoy our work ? Tell them about it.</span>
                            <span className="click">
                                Click here to send them a quick email
                            </span>
                        </div>
                        <div className="send-email">
                            <div>
                                <div className="bac">
                                    <span>
                                        I found a very easy to use website, recommend to you, come to experience it
                                    </span>
                                </div>
                                <div className="send-input">
                                    <input type="text"/>
                                    <button>SEND</button>
                                </div>
                            </div>
                        </div>
                        <div className="bt-txt">
                            <span>
                                <img src={require('../images/quate_icon24.png')} alt=""/>
                                When the referral is complete and your referee places the order, you will receive our preferential plan and redemption code sent by email. You will enjoy a up to 30% order discount reward. (It depends on your referee's order amount, and we reserve all the right for the final explanation.)
                            </span>
                        </div>
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
        </PcbLayout>
    )
}

export default PaySuccessful;