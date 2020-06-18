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
                            <a>Capability</a>
                        </div>
                    </div>
                    <div  className='nav_inner_two' >
                        <p>PCB Capability</p>
                        <div className='delivery'>
                            <a>delivery</a>
                        </div> 
                    </div>
                    <div className='nav_inner_threes' >
                        <p>PCB Capability</p>
                        <div className='support'>
                            <a>support</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
