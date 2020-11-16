import React, { useState } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import Recaptcha from 'react-recaptcha'
import axios from 'axios'


function UserLogin(props: any) {
    const [recaptchaResponse, setRecaptch] = useState<string | null>("")
    const onFinish = (e: any) => {
        const { username, password, remember } = e || {}
        let fd = new FormData()
        fd.append('username', username)
        fd.append('password', password)
        if (!recaptchaResponse) {
            return
        }
        fd.append('recaptchaResponse', recaptchaResponse)
        axios.post('https://sys.pcbonline.com/api/auth/login', fd).then(res => {
            const { success, result } = res.data
            if (success) {
                axios({
                    method: "GET",
                    url: "https://sys.pcbonline.com/api/users/info",
                    headers: {
                        "Authorization": result
                    }
                }).then(res => {
                    const { result, success } = res.data
                    if (success) {
                        const { userName } = result || []
                        props.getUserInfo(userName)
                        sessionStorage.setItem('username', JSON.stringify(userName))
                        props.closeThisBox(false)
                    }

                })
            }

        })
    }
    const verifyCallback = (response: any) => {
        console.log(response)
        setRecaptch(response)
    }
    const callback = () => {

    }

    const closeUserLogin=()=>{
        props.closeThisBox(false)
    }

    const registerAccount=()=>{
        // window.location.href="http://localhost:3001/user/login/registered?form=quote"
        window.open("http://localhost:3001/user/registered?form=quote")
    }
    return (
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
    )
}

export default UserLogin