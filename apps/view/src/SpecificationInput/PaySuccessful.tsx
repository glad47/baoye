import React, {useEffect, useRef, useState} from 'react';
// import { withRouter } from 'react-router-dom'
import '../styles/pay-successful.css'
import PcbLayout from "../Components/PcbLayout";
import {Form, Input, Checkbox, Modal, message, Select} from "antd";
import {DescribeCurrUserMsg, DescribeInvoiceInfo, SendContactEmail} from "./AjaxService";
import {checkEmail, getQueryVariable} from "../util";
import InvoiceTemp from "../Components/Invoice/InvoiceTemp";
import {Option} from "antd/es/mentions";
import {useAppState} from "../state";

const {TextArea} = Input;
const fieldMatch = {
    filed1: '1.How did you hear about us?%0a%0d',
    filed2: '2.Do you feel satisfied with the customer service specialist exclusively serving you?%0a%0d',
    filed3: '3.Do you want to re-purchase from PCBONLINE?%0a%0d',
    filed4: '4.Weve been working hard to improve the user experience. What do you think we can do to optimize our website?%0a%0d',
}

const sel1 = [
    'Google AD',
    'Blog Article',
    'Word of mouth',
    'Friends/Colleagues',
    'Social Networks',
    'Mail Order Catalogue',
    'Other'
]
const sel2 = [
    'Yes, I feel quite satisfied',
    'Basically yes',
    'No, I am not very satisfied',
    'No! I want to change to another specialist',
]
const sel3 = [
    'Yes, I do',
    'No. I won\'t buy from you again',
    'It depends on my needs',
]

const inputVal = (
    <>
        <div>I found a very easy to use website, recommend to you, come to experience it https://www.pcbonline.com</div>
        <div>PCBONLINE automation has delivered high quality builds in just a few days, which gives us that precious extra time for bring-up and debugging, so I am willing to share with you.</div>
        <div>You can get online quotation via the website, or send email to info@pcbonline.com<br />their feedback speed is very fast !</div>
    </>
)

const PaySuccessful = (props: any) => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [invoiceData, setInvoiceData] = useState();
    const invoRef: any = useRef();
    const [currentOrderId, setCurrentOrderId] = useState<any>();
    const [boxCheck, setBoxCheck] = useState<boolean>(false);
    const [sendEmail, setSendEmail] = useState<any>();
    const [canSend, setCanSend] = useState<boolean>(false);
    const [addressDom, setAddressDom] = useState<any>(null);

    const initAddress = () => {
        const res = sessionStorage.getItem("userAllInfo");
        if (res) {
            const addr = JSON.parse(res);
            const {userName, mobilePhone, email} = addr;
            const userDom = (
                <>
                    <div className="userDom">
                        <span style={{paddingTop: '15px'}}>{userName}</span>
                        <span>{mobilePhone}</span>
                        <span>{email}</span>
                    </div>
                </>
            )
            setAddressDom(userDom);
        }
    }

    const initFormValues = {
        filed1: sel1[0],
        filed2: sel2[0],
        filed3: sel3[0],
        filed4: '',
    }
    useEffect(() => {
        let _id;
        if (props.location.state) {
            _id = props.location.state.id;
            setCurrentOrderId(_id);
            DescribeInvoiceInfo(_id).then((res: any) => {
                setInvoiceData(res);
            })
        }
        DescribeCurrUserMsg().then(res => {
            console.log('res', res)
        })
        initAddress();
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
        window.location.href = `mailto:info@pcbonline.com?subject=Customer Feedback Survey&body=${str.join(' ')}`
    }

    // 发送邮件
    const submitEmail = () => {
        const {userName, mobilePhone, email} = JSON.parse(sessionStorage.getItem("userAllInfo") || "");
        const dtd = {
            content: inputVal,
            email: sendEmail,
            userName,
            mobilePhone
        }
        SendContactEmail(dtd).then(res => {
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
                          initialValues={initFormValues}
                          onFinish={submitForm}
                          layout="vertical">
                        <Form.Item name="filed1" label="1、How did you hear about us?" required>
                            <Select defaultValue={sel1[0]}>
                                {
                                    sel1.map(item => (
                                        <Option value={item} key={item}>
                                            {item}
                                        </Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item name="filed2" label="2、Do you feel satisfied with the customer service specialist exclusively serving you?">
                            <Select defaultValue={sel2[0]}>
                                {
                                    sel2.map(item => (
                                        <Option value={item} key={item}>
                                            {item}
                                        </Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item name="filed3" label="3、Do you want to re-purchase from PCBONLINE?">
                            <Select defaultValue={sel3[0]}>
                                {
                                    sel3.map(item => (
                                        <Option value={item} key={item}>
                                            {item}
                                        </Option>
                                    ))
                                }
                            </Select>
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
                                        <a href="">Dear Friend,</a>
                                        {inputVal}
                                        {
                                            addressDom
                                        }
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