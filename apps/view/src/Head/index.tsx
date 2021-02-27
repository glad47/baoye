import React from 'react'
import Product from '../Menus/product'
import Assembly from '../Menus/AssemblyAllMenu'
import Solution from '../Menus/Solution'
import Resource from '../Menus/Resource'
import Company from '../Menus/Company'
import LoginShow from '../DownMenu/loginShow'

function Head(props: any) {
    const handleManage = () => {
        window.open('https://sys.pcbonline.com/home')
    }
    return (
        <div id='pcb-header'>
            <div className='pcb-header-inner'>
                <div className='pcb-header-logo'>
                    <div className='pcb-header-logo-bg'>
                        <a href="https://www.pcbonline.com" title="PCBONLINE">PCBONLINE</a>
                    </div>
                </div>
                <div className='pcb-header-menu'>
                    <ul className='pcb-header-menu-all'>
                        <li className='pcb-menu-one'>
                            <a>PCB Fab</a>
                            <div className="pcb-instructions" />
                            <Product />
                        </li>
                        <li className='pcb-menu-two'>
                            <a>PCB Assembly</a>
                            <div className="pcb-instructions" />
                            <Assembly />
                        </li>
                        <li className='pcb-menu-three'>
                            <a>EMS Solution</a>
                            <div className="pcb-instructions" />
                            <Solution />
                        </li>
                        <li className='pcb-menu-four'>
                            <a>Resources</a>
                            <div className="pcb-instructions" />
                            <Resource />
                        </li>
                        <li className='pcb-menu-five'>
                            <a>Company</a>
                            <div className="pcb-instructions" />
                            <Company />
                        </li>
                        <li className='pcb-menu-six'>
                            <a>Get a Quote</a>
                            <img
                                src={require('../images/new-t.gif')}
                                alt="active"
                                className="new-active"
                            />
                        </li>
                        <div className="sign-btn">
                            {props.loginName[0] === null
                                ? <span className="sign-in">
                                    <a href='http://sys.pcbonline.com//login?jumpUrl=/blog'>
                                        SIGN IN
                                </a>
                                </span>
                                : <div className='use_name' onClick={handleManage}>
                                    {props.loginName[1] ?
                                        <img src={props.loginName[1]} />
                                        : ''}
                                </div>
                            }
                            {props.loginName === null ? null : <LoginShow />}
                        </div>
                        <div className="pcb-search">
                            <img src={require('../images/ocb-search.png')} alt="search" />
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Head