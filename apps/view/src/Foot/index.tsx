import React, { Component } from 'react'
import logoImg from '../images/logo-bxsd.png'
import Icon1 from '../images/footer_icon01.png'
import Icon2 from '../images/footer_icon02.png'
import Icon3 from '../images/footer_icon03.png'
import Icon4 from '../images/footer_icon04.png'
import Icon5 from '../images/footer_icon05.png'

export default class index extends Component {
    render() {
        return (
            <div className='foot_bottom'>
                <div className='footer'>
                    <div className='footer_main'>
                        <div className='main_left'>
                            <div className='footer_title'><img src={logoImg} /></div>
                            <p>Tel: <a>+86 755 27398155</a></p>
                            <p>Fax: <a>+86 755 27398155</a></p>
                            <div className='info_footer'>info@pcbonline.com</div>
                            <div className='footer_link_icon'>
                                <img src={Icon1} />
                                <img src={Icon2} />
                                <img src={Icon3} />
                                <img src={Icon4} />
                                <img src={Icon5} />
                            </div>
                        </div>
                        <div className='main_right'>
                            <div className='footer_link' id='footer_link_to'>
                                <a>PCB Fabrication</a>
                                <a>Resources</a>
                                <a>Support</a>
                            </div>
                            <div className='footer_link'>
                                <a href='https://www.pcbonline.com/PCB-FAB/PCB-prototype'>PCB Prototype</a>
                                <a href='https://www.pcbonline.com/support/FR4-Materials'>Material</a>
                                <a href='https://www.pcbonline.com/support/How-To-Order-Online'>How to use</a>
                            </div>
                            <div className='footer_link'>
                                <a href='https://www.pcbonline.com/PCB-FAB/PCB-layout'>PCB Layout</a>
                                <a href='https://www.pcbonline.com/support/File-Format'>Capability</a>
                                <a href='https://www.pcbonline.com/support/FAQ-order'>FAQ</a>
                            </div>
                            <div className='footer_link'>
                                <a href='https://www.pcbonline.com/PCB-FAB/HDI-PCB'>HDI PCB</a>
                                <a href='https://www.pcbonline.com/support/Rigid-Flex-PCBs'>Production</a>
                                <a href='https://www.pcbonline.com/support/FR4-Materials'>PCB school</a>
                            </div>
                            <div className='footer_link'>
                                <a href='https://www.pcbonline.com/PCB-FAB/Rigid-Flex-PCBs'>Rigid-Flex PCB</a>
                                <a href='https://www.pcbonline.com/support/FAQ-order'>Lead Time</a>
                                <a href='https://www.pcbonline.com/support/Rigid-Flex-PCBs'>PCB center</a>
                            </div>
                            <div className='footer_link'>
                                <a href='https://www.pcbonline.com/PCB-FAB/Flexible-PCBs'>Flexible PCB</a>
                                <a></a>
                                <a href='https://www.pcbonline.com/support/PCB-Glossary'>PCB glossary</a>
                            </div>
                            <div className='footer_link'>
                                <a href='https://www.pcbonline.com/PCB-FAB/Aluminum-PCB'>Aluminum PCB</a>
                                <a></a>
                                <a href='https://www.pcbonline.com/about'>About us</a>
                            </div>
                        </div>
                    </div>

                    <div className='copyright'>
                        <p>@2018 PCB online LTD.All Right Reserved</p>
                        <div className='copyright_right'>
                            <div>PRIVACY POLICY</div>
                            <a href='https://www.globalsuccess.com.cn/'>Member GLOBAL SUCCESS Group</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
