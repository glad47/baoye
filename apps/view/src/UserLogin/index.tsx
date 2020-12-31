import React, { useState } from 'react'
import { Form, Input, Button, Checkbox,message } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import Recaptcha from 'react-recaptcha'
import axios from 'axios'
import Cookies from 'js-cookie';
import PrivacyPolicy from "../PrivacyPolicy"

function UserLogin(props: any) {
    const [recaptchaResponse, setRecaptch] = useState<string | null>("")
    const [isLogin, setLogin] = useState(true)
    const [isCheckedClause,setIsCheckedClause] = useState(false)
    const [isChecked,setIsChecked] =useState(true)
    const [isPolicyShow,setIsPolicyShow]=useState(false)
    // 用户登录
    const onFinish = (e: any) => {
        const { username, password, remember } = e || {}
        let fd = new FormData()
        fd.append('username', username)
        fd.append('password', password)
        if (!recaptchaResponse) {
            return
        }
        fd.append('recaptchaResponse', recaptchaResponse)
        axios.post(sysUrl + 'api/auth/login', fd).then(res => {
            const { success, result } = res.data
            Cookies.set('token', result, { expires: 7 })
            if (success) {
                axios({
                    method: "GET",
                    url: sysUrl+"api/users/info",
                    headers: {
                        "Authorization": result
                    }
                }).then(res => {
                    const { result, success } = res.data
                   
                    if (success) {
                        const { userName,favicon } = result || []
                        let users=userName!==null ? userName : 'defaultName' // 预防出现用户名为null 的情况
                        let heads=favicon!==null ?favicon:require('../images/Mask.png')
                        result.favicon=heads
                        props.getUserInfo(users)
                        props.getUserHead(heads)
                        sessionStorage.setItem('username', JSON.stringify(users))
                        sessionStorage.setItem('userAllInfo',JSON.stringify(result))
                        props.closeThisBox(false)
                        props.isLoginReady(true)
                        message.info('Login successful',6)
                    }else{
                        message.error('Something error')
                    }

                })
                Cookies.set('token', result, { expires: 7 })
            }

        })
    }
    // 设置谷歌机器人回传的字符串
    const verifyCallback = (response: any) => {
        console.log(response)
        setRecaptch(response)
    }
    const callback = () => {

    }
    // 是否展示登录框
    const closeUserLogin = () => {
        props.closeThisBox(false)
    }

    const registerAccount = () => {
        setLogin(false)
    }
    // 注册
    const registeredForm=(e:any)=>{
        const {password, email,  code, remember} =e 
        if (!recaptchaResponse) {
            return
        }
        if (!isChecked) {
            setIsCheckedClause(true)
            return
        }
        const fd = new FormData()
        fd.append('username', email)
        fd.append('password', password)
        fd.append('recaptchaResponse', recaptchaResponse)
        fd.append('from','quote')

        if(code){
            fd.append('invite', code)
        }
  
        axios.post(sysUrl+'api/auth/register',fd).then(res=>{
            const { success } = res.data
            console.log(res)
            if(success){
                message.info("An email was sent to you. Please verify your email address.")
                props.closeThisBox(false)
            }else{
                message.warn("Registration fails. Your account already exists, please login.")
            }
        })
    }
    // 切换至登录
    const toLoginIn=()=>{
        setLogin(true)
    }
    // 隐私政策单选框
    const changeIdea=()=>{
        setIsChecked(!isChecked)
    }
    // 展示隐私政策页面
    const showPolicy=()=>{
        setIsPolicyShow(true)
    }
    // 传递到隐私政策页面的方法
    const isAgreePrivacyPolicy=(e:any)=>{
        setIsPolicyShow(false)
        setIsChecked(e)
    }
    return (
        isLogin ?
            <div className='user-login-page'>
                <div className='user-login-box'>
                    <h3 className='user-login-title'>Login In</h3>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <div className='login_email'>Email:</div>
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Input your Email here',
                                },
                                {
                                    pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                                    message: 'Incorrect email format',
                                },
                            ]}
                        >
                            <Input placeholder="Input your Email here" className='user-login-input' />
                        </Form.Item>
                        <div className='login_password'>Password:</div>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Input your password',
                                },
                            ]}
                        >
                            <Input
                                type="password"
                                placeholder="Input your password"
                                className='user-login-input'
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <span className='forget_password_go'> </span>
                        </Form.Item>
                        <>
                            <Recaptcha
                                sitekey="6LdM76QZAAAAAI3w4p5NullSi3-ClMmGWGygh-8v"
                                render="explicit"
                                verifyCallback={verifyCallback}
                                onloadCallback={callback}
                            />
                        </>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">Login In</Button>
                            {/* <GoogleLogin
                            clientId="795023029692-snobcijskr3qhh7n9c063u6r1j6qb3sb.apps.googleusercontent.com"
                            render={renderProps => (
                                <button onClick={renderProps.onClick} disabled={renderProps.disabled} className='continue_with_Google'>{local.user_management_login_continue_with_google}</button>
                            )}
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={false}
                        /> */}
                        </Form.Item>

                        <Form.Item>
                            <p>
                                No Account ? &nbsp;
                            <span className='register_now_go' onClick={registerAccount}>
                                    Register Now !
                            </span>
                            </p>
                        </Form.Item>
                    </Form>
                </div>
                <div className="user-new-close" onClick={closeUserLogin}>
                    <CloseOutlined />
                </div>
            </div>
            :
            <div className='registered'>
                <div className='registered_inner'>
                    <h3 className='user-login-title'>Sign Up</h3>
                    <Form
                        name="normal_login"
                        className="sin-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={registeredForm}
                    >
                        <div className='sin_in_title'><span className='add_icon' />Email:</div>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                                {
                                    pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                                    message: 'Incorrect email format',
                                },
                            ]}
                        >
                            <Input placeholder="input your Email here" className='user-login-input' />
                        </Form.Item>
                        <div className='sin_in_title'><span className='add_icon' />Password:</div>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input.Password type="password" placeholder="Input your password" className='user-sign-input' />
                        </Form.Item>
                        <div className='sin_in_title'><span className='add_icon' />Repassword:</div>
                        <Form.Item
                            name="confirm"
                            dependencies={['password']}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('The two passwords that you entered do not match!');
                                    },
                                }),
                            ]}
                        >
                            <Input.Password type="password" placeholder="input your password" className='user-sign-input' />
                        </Form.Item>
                        <div className='sin_in_title'>Invite code:</div>
                        <Form.Item
                            name="code"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input invite code!',
                                },
                            ]}
                        >
                            <Input type="text" placeholder="input your invite code" className='user-login-input' />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <>
                                    <Checkbox checked={isChecked} defaultChecked={true} onChange={changeIdea}>I have read and agree to the</Checkbox>
                                    <span className='privacy' onClick={showPolicy}>Privacy Policy</span>
                                </>
                            </Form.Item>
                            {isCheckedClause ? <p className='checked_clause'>{}</p> : ""}
                        </Form.Item>
                        <>
                            <Recaptcha
                                sitekey="6LdM76QZAAAAAI3w4p5NullSi3-ClMmGWGygh-8v"
                                render="explicit"
                                verifyCallback={verifyCallback}
                                onloadCallback={callback}
                            />
                        </>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Sign in
                            </Button>
                            <p>Already have account?  <span className='go_sin_in' onClick={toLoginIn}>Login In</span></p>
                        </Form.Item>
                    </Form>
                </div>
                {isPolicyShow ? <PrivacyPolicy isAgreeOurPolicy={isAgreePrivacyPolicy}/> : null}
                <div className="user-new-close" onClick={closeUserLogin}>
                    <CloseOutlined />
                </div>
            </div>
    )
}

export default UserLogin