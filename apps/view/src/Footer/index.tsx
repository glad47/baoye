import React from 'react'
import logoImg from '../images/logo-header.png'
import Icon1 from '../images/footer_icon01.png'
import Icon2 from '../images/footer_icon02.png'
import Icon3 from '../images/footer_icon03.png'
import Icon5 from '../images/footer_icon05.png'

function Foot() {
    return (
        <div id='pcb-footer'>
            <div className='pcb-footer-inner'>
                <div className='pcb-footer-logo'>
                    <div className='pcb-footer-header'>
                        <a><img src={logoImg} title='logo' alt='logo' /></a>
                    </div>
                    <div className='pcb-footer-other'>
                        <a href="https://twitter.com/PCBONLINELTD" target="_blank" rel="nofollow"><img src={Icon1} title='icon' alt='icon' /></a>
                        <a href="https://www.facebook.com/pcbonlinelimited" target="_blank" rel="nofollow"><img src={Icon2} title='icon' alt='icon' /></a>
                        <a href="mailto:info@pcbonline.com?subject=I want to share my feedback and discuss to you&body=Hi,Owen Chang" target="_blank"><img src={Icon3} title='icon' alt='icon' /></a>
                        <a href="https://www.linkedin.com/company/20454706/admin/" target="_blank" rel="nofollow"><img src={Icon5} title='icon' alt='icon' /></a>
                    </div>
                </div>

                <div className='pcb-footer-link'>
                    <div className='pcb-footer-link-other'>
                        <a>Company</a>
                        <a>About</a>
                        <a href="https://www.globalsuccess.com.cn/" target='_blank' rel="nofollow">Member GLOBAL SUCCESS Group</a>
                        <a href="https://www.pcbonline.com/privacypolicy">Privacy Policy</a>
                    </div>
                    <div className='pcb-footer-link-other'>
                        <a >Star PCB</a>
                        <a href="https://www.pcbonline.com/PCB-FAB/HDI-PCB" >HDI PCB</a>
                        <a href="https://www.pcbonline.com/PCB-FAB/Rigid-Flex-PCBs" >Rigid-Flex PCB</a>
                        <a href="https://www.pcbonline.com/PCB-FAB/Hight-Frequency-PCBs" >High Frequency PCB</a>
                        <a href="https://www.pcbonline.com/PCB-FAB/Aluminum-PCB" >Aluminum PCB</a>
                        <a href="https://www.pcbonline.com/PCB-FAB/PCB-layout" >PCB Layout</a>
                        <a href="https://www.pcbonline.com/PCB-Assembly/High-Volume-PCB-Assembly" >High-Volume PCB Assembly</a>
                    </div>
                    <div className='pcb-footer-link-other'>
                        <a >Resources</a>
                        <a href='https://www.pcbonline.com/support/FR4-Materials'>PCB School</a>
                        <a href='https://www.pcbonline.com/HowWeProduce/Capability/PCB-Capability'>Capability</a>
                        <a href='https://www.pcbonline.com/blog'>Blog</a>
                        <a href="https://www.pcbonline.com/HowWeProduce/Delivery/Lead-time">Delivery Time</a>
                        <a href='https://www.pcbonline.com/support/PCB-Glossary'>PCB Glossary</a>
                        <a href='https://www.pcbonline.com/support/PCB-Glossary'>Feedback</a>
                    </div>
                    <div className='pcb-footer-link-other'>
                        <a>Support</a>
                        <a href='https://www.pcbonline.com/support/Rigid-Flex-PCBs'>PCB FAQ</a>
                        <a href='https://www.pcbonline.com/support/FAQ-order'>Order FAQ</a>
                        <a >Generate Gerber</a>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Foot