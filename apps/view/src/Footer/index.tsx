import React, { useEffect, useState } from 'react'
import logoImg from '../images/logo-header.png'
import Icon1 from '../images/footer_icon01.png'
import Icon2 from '../images/footer_icon02.png'
import Icon3 from '../images/footer_icon03.png'
import Icon5 from '../images/footer_icon05.png'

function Foot() {
    const [currentYear,setYear]=useState(2020)
    useEffect(() => {
        let windowWidth = window.innerWidth
        if (windowWidth < 850) { return }
        const site = document.getElementById('siteseal')
        if (site == null || site == undefined) { return }
        let createElement = document.createElement('script')
        createElement.src = 'https://seal.godaddy.com/getSeal?sealID=JyOmqvrJtXawl2GzkTr8Tf8g72riSFgMhkRVxbFC8cMv1lCwC1uwAHAeeklK'
        createElement.type = 'text/javascript'
        site?.appendChild(createElement)
        let Year =new Date().getFullYear()
        setYear(Year)
    }, [])
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
                    <div>
                        <span id="siteseal"></span>
                    </div>
                    <div className='copy-right-font'>@2000-{currentYear} PCB ONLINE LTD. ｜ All Rights Reserved</div>
                </div>

                <div className='pcb-footer-link'>
                    <div className='pcb-footer-link-other'>
                        <a>Star Products</a>
                        <a href='https://www.pcbonline.com/PCB-FAB/Rigid-Flex-PCBs/'>Rigid-flex PCB</a>
                        <a href="https://www.pcbonline.com/PCB-prototype/" target='_blank' rel="nofollow">PCB prototypes</a>
                        <a href="https://www.pcbonline.com/PCB-Assembly/Consigned-PCB-Assembly/">PCB components</a>
                        <a href="https://www.pcbonline.com/ems-solution/turnkey-pcb-assembly/">PCB assembly</a>
                    </div>
                    <div className='pcb-footer-link-other'>
                        <a >Technology</a>
                        <a href="https://www.pcbonline.com/HowWeProduce/Capability/PCB-Capability/" >Capability</a>
                        <a href="https://www.pcbonline.com/HowWeProduce/PCB-material/" >Material</a>
                        {/* <a href="https://www.pcbonline.com/HowWeProduce/PCB-production/" >Production</a> */}
                        <a href="https://www.pcbonline.com/certificate/" >Certificate</a>
                    </div>
                    <div className='pcb-footer-link-other'>
                        <a >Support</a>
                        <a href='https://www.pcbonline.com/support/How-To-Order-Online/'>how to order</a>
                        {/* <a href='https://www.pcbonline.com/support/how-to-order-online/'>How to use</a> */}
                        <a href='https://www.pcbonline.com/terms-of-service/'>Terms of service</a>
                        <a href="https://www.pcbonline.com/HowWeProduce/Delivery/Lead-time/">Refund policy</a>
                    </div>
                    <div className='pcb-footer-link-other'>
                        <a>Company</a>
                        <a href='https://www.pcbonline.com/about/'>About us</a>
                        <a href='https://www.pcbonline.com/factory-live/'>Factory live</a>
                        <a href="https://www.pcbonline.com/HowWeProduce/quality-control/">Quality control</a>
                        <a href="https://www.pcbonline.com/privacy-policy/">Privacy policy</a>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Foot