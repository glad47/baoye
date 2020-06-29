import React, { Component } from 'react'
import Step from './step'


export default class index extends Component<any,any> {
    constructor(props: any) {
        super(props)
        this.state = {
            step: 1,
            isShow: true
        }
    }
    closeTitle = () => {
        this.setState({
            isShow: false
        })
        console.log(this.state.isShow)
    }
    render() {
        const { step, isShow } = this.state
        return (
           isShow? <div className='tips'>
                <div className='tips_inner'>
                    <div className='mask_tips'>
                        <div className='close_title'>
                            <div>
                                <img src={require('../images/close.png')} onClick={this.closeTitle} />
                                <p>click here to close</p>
                            </div>
                        </div>
                        <Step current={step} />
                    </div>
                </div>
            </div>:''

        )
    }
}
