import React, { Component } from 'react'

export default class showMenu extends Component {
    render() {
        return (
            <div className="down_two">
                <p className='down_sw'></p>
                <div className='down_nav_two'>
                    <a href='https://www.pcbonline.com/PCB-Assembly/PCB-Assembly-Overview/'>PCB Assembly Overview</a>
                    <a href='https://www.pcbonline.com/PCB-Assembly/Prototype-PCB-Assembly/'>Prototype PCB Assembly</a>
                    <a href='https://www.pcbonline.com/PCB-Assembly/Low-Volume-PCB-Assembly/'>Low Volume PCB Assembly</a>
                    <a href='https://www.pcbonline.com/PCB-Assembly/High-Volume-PCB-Assembly/'>High Volume PCB-Assembly</a>
                    <a href='https://www.pcbonline.com/PCB-Assembly/Consigned-PCB-Assembly/'>Consigned PCB Assembly</a>
                </div>
            </div>
        )
    }
}
