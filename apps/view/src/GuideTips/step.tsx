import React, { Component } from 'react'

const stepOne = 'Upload Geber file in rar or zip format, choose the panelization method and order Qty.'
const stepTwo = 'Check the data detected. Correct the mistake if any.'
const stepThree = 'Choose the delievry time and country.'
const stepFour = 'Add to cart if you want to buy more; checkout directly if you need only this one.'

export default class step1 extends Component<any, any> {
    constructor(props: number) {
        super(props)
        this.state = {
            step: 1
        }
        console.log(this.props.current)
    }
    getStepWord = (id: number) => {
        switch (id) {
            case 1:
                return stepOne
            case 2:
                return stepTwo
            case 3:
                return stepThree
            case 4:
                return stepFour
            default:
                break;
        }
    }
    getStepStyle=(id:number)=>{
        switch (id) {
            case 1:
                return 'random_name'
            case 2:
                return 'random_name_two'
            case 3:
                return 'random_name_three'
            case 4:
                return 'random_name_four'
            default:
                break;
        }
    }
    nextStep=()=>{
        const {step}=this.state
        if(step==4){
            return
        }
        console.log(step)
        this.setState({
            step:step+1
        })
    }
    previousStep=()=>{
        const {step}=this.state
        if(step==1){
            return
        }
        console.log(step)
        this.setState({
            step:step-1
        })
    }
    render() {
        const { step } = this.state
        return (
            <div>
                <div className={this.getStepStyle(step)}>
                    <div></div>
                    <div >
                        <p className='guide_tips'>{this.getStepWord(step)}</p>
                        <div className='guide_position'>
                            {step>1?<p onClick={this.previousStep}>Previous</p>:<div></div>}
                            <p onClick={this.nextStep}>Next</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
