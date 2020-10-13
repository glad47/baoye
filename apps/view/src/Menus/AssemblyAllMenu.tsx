import React from 'react'

function AssemblyAllMenu() {
    return (
        <div id='pcb-assembly'>
            <div className="navigation">
                <ul className='navigation-left'>
                    <li>
                        <a href='https://www.pcbonline.com/PCB-Assembly/PCB-Assembly-Overview'>Prototype PCB Assembly</a>
                        <div className="instructions" />
                    </li>
                    <li>
                        <a href='https://www.pcbonline.com/PCB-Assembly/Low-Volume-PCB-Assembly'>Low Volume PCB Assembly</a>
                        <div className="instructions" />
                    </li>
                    <li>
                        <a href='https://www.pcbonline.com/PCB-Assembly/High-Volume-PCB-Assembly'>High Volume PCB Assembly</a>
                        <div className="instructions" />
                    </li>
                    <li>
                        <a href='https://www.pcbonline.com/PCB-Assembly/Consigned-PCB-Assembly'>Consigned PCB Assembly</a>
                        <div className="instructions" />
                    </li>
                    <li>
                        <a href='https://www.pcbonline.com/PCB-FAB/SMT-Stencil'>SMT Stencil</a>
                        <div className="instructions" />
                    </li>
                </ul>
            </div>
        </div >
    )
}

export default AssemblyAllMenu