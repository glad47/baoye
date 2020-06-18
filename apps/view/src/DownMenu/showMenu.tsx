import React, { Component } from 'react'

export default class showMenu extends Component {
    render() {
        return (
            <div className="down_two">
                <p className='down_sw'></p>
                <div className='down_nav_two'>
                    <a>PCB Assembly Overview</a>
                    <a>Prototype PCB Assembly</a>
                    <a>Low Volume PCB Assembly</a>
                    <a>High Volume PCB-Assembly</a>
                    <a>Consigned PCB Assembly</a>
                </div>
            </div>
        )
    }
}
