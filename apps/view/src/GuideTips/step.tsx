import React, { Component } from 'react'

const stepWord1 = 'Upload Gerber file in rar or zip format, choose the panelization method and order Qty.'
const stepWord2 = 'Check the data detected. Correct the mistake if any.'
const stepWord3 = 'Choose the delievry time and country.'
const stepWord4 = 'Add to cart if you want to buy more; checkout directly if you need only this one.'

export default class step1 extends Component<any, any> {
    constructor(props: number) {
        super(props)
        this.state = {
            step: 1
        }
    }
    getStepWord = (id: number) => {
        switch (id) {
            case 1:
                return stepWord1
            case 2:
                return stepWord2
            case 3:
                return stepWord3
            case 4:
                return stepWord4
            default:
                break;
        }
    }
    nextStep = () => {
        const { step } = this.state
        if (step == 4) {
            localStorage.setItem('user', '1')
            this.props.current(step)
            return
        }
        this.setState({
            step: step + 1
        })
    }
    previousStep = () => {
        const { step } = this.state
        if (step == 1) {
            return
        }
        this.setState({
            step: step - 1
        })
    }
    render() {
        const { step } = this.state
        const leftName = `get_left_${step}`
        const rightName = `get_right_${step}`
        let positionTitle = `random_name_${step}`
        return (
            <div>
                <div className={positionTitle}>
                    <div>
                        <img src={require(`../images/left${step}.png`)} className={leftName} />
                        {step == 4
                            ? ''
                            : <img src={require(`../images/right${step}.png`)} className={rightName} />
                        }
                    </div>
                    <div >
                        <p className='guide_tips'>{this.getStepWord(step)}</p>
                        <div className='guide_position'>
                            {step > 1
                                ? <p onClick={this.previousStep} >
                                    <span><img src={require('../images/left_arrow.png')} /></span>
                                    Previous
                                </p>
                                : <div></div>
                            }
                            <p onClick={this.nextStep}>
                                Next
                                <span><img src={require('../images/right_arrow.png')} /></span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
