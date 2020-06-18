import React, { Component } from 'react'

export default class lastMenu extends Component {
    constructor(props:any){
        super(props)
        this.state={
            oneShow:false,
            twoShow:false,
            threeShow:false
        }
    }
    render() {
        return (
            <div className="nav_three">
                 <p className='down_sh'></p>
                <div className='nav_inner_three'>
                    <div className='nav_inner_one'  >
                        <p>Capability</p>
                        <div className='capability'>
                            <a href='https://www.pcbonline.com/HowWeProduce/Capability/PCB-Capability'>PCB Capability</a>
                        </div>
                    </div>
                    <div  className='nav_inner_two' >
                        <p>PCB Capability</p>
                        <div className='delivery'>
                            <a href='https://www.pcbonline.com/HowWeProduce/Delivery/Lead-time'>Lead Time</a>
                        </div> 
                    </div>
                    <div className='nav_inner_threes' >
                        <p>PCB Capability</p>
                        <div className='support'>
                            <p><a href='https://www.pcbonline.com/support/FAQ-order'>PCB FAQ</a></p>
                            <p><a href='https://www.pcbonline.com/support/How-To-Register'>Using Help</a></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
