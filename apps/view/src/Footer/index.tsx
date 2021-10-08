import React, { useEffect, useState } from 'react'
import logoFooter from '../images/logo_footer.png'
import home_img20 from '../images/home_img20.png'
import home_img21 from '../images/home_img21.png'
import home_img22 from '../images/home_img22.png'
import home_img23 from '../images/home_img23.png'
import home_img24 from '../images/home_img24.png'

function Foot() {

    useEffect(() => {
        verifySeal()
    }, [])
    const nav = [
            {title: 'Star Products', child: [
                    {name: 'Rigid-flex PCB', route: '/PCB-FAB/Rigid-Flex-PCBs/', alt: "Rigid-flex PCB"},
                    {name: 'Ceramic PCB', route: '/PCB-FAB/Aluminum-Nitride/', alt: 'nofollow'},
                    {name: 'Aluminum PCB', route: '/PCB-FAB/Aluminum-PCB/', alt: 'components'},
                    {name: 'PCB assembly', route: '/ems-solution/turnkey-pcb-assembly/', alt: 'assembly'}
                ]},
            {title: 'Technology', child: [
                    {name: 'Capability', route: '/HowWeProduce/Capability/PCB-Capability/', alt: 'Capability'},
                    {name: 'Materials', route: '/pcb-material/', alt: 'Material'},
                    {name: 'Quality Control', route: '/quality-control/', alt: 'Quality control'},
                    {name: 'Certificates', route: '/certificate/', alt: 'Certificate'}
                ]},
            {title: 'Support', child: [
                    {name: 'How to order', route: '/support/How-To-Order-Online/', alt: 'ow to order'},
                    {name: 'FAQ', route: '/support/home/'},
                    {name: 'Terms of service', route: '/terms-of-service/'},
                    {name: 'Refund policy', route: '/refund-policy/'}
                ]},
            {title: 'Company', child: [
                    {name: 'About Us', route: '/about/'},
                    {name: 'Factory live', route: '/factory-live/', alt: 'Factory live'},
                    {name: 'Privacy policy', route: '/privacy-policy/', alt: 'policy'},
                    {name: 'Member of Global Success', route: 'https://www.globalsuccess.com.cn/', alt: '', rel: 'nofollow'}
                ]}
        ]

    const jump = (route: any) => {
        if (route.indexOf('http') < 0) {
            window.location.href = `https://pcbonline.com${route}`
        } else {
            window.open(route)
        }
    }

    const verifySeal = () => {
        const srciptElement = document.createElement("script");
        srciptElement.type = "text/javascript";
        srciptElement.src = "https://seal.godaddy.com/getSeal?sealID=JyOmqvrJtXawl2GzkTr8Tf8g72riSFgMhkRVxbFC8cMv1lCwC1uwAHAeeklK";
        const siteseal: any = document.getElementById("siteseal");
        siteseal.appendChild(srciptElement);
    }

    return (
        <div className="BotNav">
            <div className="bot-container body-width">
                <div>
                    <div className="cols">
                        <div className="col-1">
                            <div className="log">
                                <img src={logoFooter} />
                            </div>
                            <div className="icons">
                                <a
                                    href="https://www.facebook.com/pcbonlinelimited"
                                    target="_blank"
                                    rel="nofollow"
                                >
                                    <img src={home_img20} alt="" />
                                </a>
                                <a
                                    href="https://www.facebook.com/pcbonlinelimited"
                                    target="_blank"
                                    rel="nofollow"
                                >
                                    <img src={home_img21} alt="" />
                                </a>
                                <a
                                    href="mailto:info@pcbonline.com?subject=I want to share my feedback and discuss to you&body=Hi,Owen Chang"
                                    target="_blank"
                                >
                                    <img src={home_img22} alt="" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/20454706/admin/"
                                    target="_blank"
                                    rel="nofollow"
                                >
                                    <img src={home_img23} alt="" />
                                </a>
                            </div>
                            <div className="self">
                                <img src={home_img24} alt="" />
                                <span id="siteseal" style={{display: 'none'}}></span>
                            </div>
                            <div className="desc">
                                <span>
                                  Copyright @2000-{new Date().getFullYear()} PCB ONLINE LIMITED. | All Rights Reserved.
                                </span>
                            </div>
                        </div>
                        {
                            nav.map((item: any, inx) => (
                                <div className="col-2" key={inx}>
                                    <div className="titles">
                                        <strong>{item.title}</strong>
                                        <ul>
                                            {
                                                item.child.map((itemc: any, inxc: any) => (
                                                    <li key={inxc}>
                                                        <a rel={itemc.rel || ''}
                                                           onClick={() => jump(itemc.route)}
                                                           href="javascript:void(0)">
                                                            {itemc.name}
                                                        </a>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Foot