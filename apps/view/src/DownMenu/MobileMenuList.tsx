import React, { useState } from 'react'

interface getType {
    openMenu: boolean,
    closeMenus:any
}

function MobileMenu(props: getType) {
    const { openMenu } = props
    const [isProductShow, setProductFlag] = useState(false)
    const [isAssemblyShow, setAssemblyFlag] = useState(false)
    const [isSolutionShow, setSolutionFlag] = useState(false)
    const [isResourcesShow, setResourcesFlag] = useState(false)
    const [isCompanyShow, setCompanyFlag] = useState(false)
    // 展示 product
    const showProduct = () => {
        setProductFlag(true)
    }
    // 展示 Assembly
    const showAssembly = () => {
        setAssemblyFlag(true)
    }
    // 展示 solution
    const showSolution = () => {
        setSolutionFlag(true)
    }
    // 展示 resources
    const showResources = () => {
        setResourcesFlag(true)
    }
    // 展示 company
    const showCompany = () => {
        setCompanyFlag(true)
    }
    // 关闭 product
    const closeProduct=()=>{
        setProductFlag(false)
    }
    // 关闭 Assembly
    const closeAssembly=()=>{
        setAssemblyFlag(false)
    }
    // 关闭solution
    const closeSolution=()=>{
        setSolutionFlag(false)
    }
    // 关闭 Resources
    const closeResources=()=>{
        setResourcesFlag(false)
    }
    // 关闭 company
    const closeCompany=()=>{
        setCompanyFlag(false)
    }
    // 关闭展示菜单
    const closeMenus=()=>{
        props?.closeMenus(false)
    }
    return (
        openMenu ? <div className='mobile-menu-list'>
            <div className="mobile-show">
                <div className="mobile-home" onClick={closeMenus}>
                    <a href='/' className="mobile-link">Home</a>
                </div>
                <div className="mobile-product" onClick={showProduct}>
                    <p className="mobile-link">PCB Fab</p>
                    <p className="mobile-link">16 <img src={require('../images/navigation_icon2.png')} alt='right arrow' /></p>
                </div>
                <div className="mobile-product" onClick={showAssembly}>
                    <p className="mobile-link">PCB Assembly</p>
                    <p className="mobile-link">6 <img src={require('../images/navigation_icon2.png')} alt='right arrow' /></p>
                </div>
                <div className="mobile-product" onClick={showSolution}>
                    <p className="mobile-link">EMS Solution</p>
                    <p className="mobile-link">3 <img src={require('../images/navigation_icon2.png')} alt='right arrow' /></p>
                </div>
                <div className="mobile-product" onClick={showResources}>
                    <p className="mobile-link">Resources</p>
                    <p className="mobile-link">3 <img src={require('../images/navigation_icon2.png')} alt='right arrow' /></p>
                </div>
                <div className="mobile-product" onClick={showCompany}>
                    <p className="mobile-link">Company</p>
                    <p className="mobile-link">2 <img src={require('../images/navigation_icon2.png')} alt='right arrow' /></p>
                </div>
                <div className="mobile-product">
                    <p className="mobile-link">Get a Quote</p>
                </div>
                <div className="mobile-sign">
                    <a href='/' className="mobile-link">SIGN IN</a>
                </div>
                {isProductShow ? <div className="down-product" onClick={closeProduct}>
                    <div className="down-right"><p><img src={require('../images/navigation_icon3.png')} alt='left arrow' /></p> <p>PCB Products</p><p /></div>
                    <ul onClick={closeMenus}>
                        <li><a href='https://www.pcbonline.com/PCB-FAB/PCB-prototype/'>PCB Prototype</a></li>
                        <li><a href='https://www.pcbonline.com/PCB-FAB/HDI-PCB/'>HDI PCB</a></li>
                        <li><a href='https://www.pcbonline.com/PCB-FAB/Flexible-PCBs/'>Flexible PCB</a></li>
                        <li><a href='https://www.pcbonline.com/PCB-FAB/High-TG-PCBs/'>High-TG PCB</a></li>
                        <li><a href='https://www.pcbonline.com/PCB-FAB/Multilayer-PCBs/'>Multilayer PCB</a></li>
                        <li><a href='https://www.pcbonline.com/PCB-FAB/Halogen-Free-PCBs/'>Halogen-Free PCB</a></li>
                        <li><a href='https://www.pcbonline.com/PCB-FAB/Aluminum-Nitride/'>Ceramic PCB</a></li>
                        <li><a href='https://www.pcbonline.com/PCB-FAB/Carbon-Nanotube/'>Carbon Nanotube</a></li>
                        <li><a href='https://www.pcbonline.com/PCB-FAB/Rigid-Flex-PCBs/'>Rigid- Flex PCB</a></li>
                        <li><a href='https://www.pcbonline.com/PCB-FAB/High-Frequency-PCBs/'>High Frequency PCB</a></li>
                        <li><a href='https://www.pcbonline.com/PCB-FAB/Thick-Copper-PCBs/'>Thick- Copper PCB</a></li>
                        <li><a href='https://www.pcbonline.com/PCB-FAB/Lead-Free-PCBs/'>Lead-Free PCB</a></li>
                        <li><a href='https://www.pcbonline.com/PCB-FAB/LED-PCB/'>LED PCB</a></li>
                        <li><a href='https://www.pcbonline.com/PCB-FAB/Aluminum-PCB/'>Aluminum PCB</a></li>
                        <li><a href='https://www.pcbonline.com/PCB-FAB/Carbon-PCBs/'>Carbon PCB</a></li>
                        <li><a href='https://www.pcbonline.com/pcb-material/'>PCB Material</a></li>
                    </ul>
                </div> : null}

                {isAssemblyShow ? <div className="down-product" onClick={closeAssembly}>
                    <div className="down-right"><p><img src={require('../images/navigation_icon3.png')} alt='left arrow' /></p> <p>PCB Assembly</p></div>
                    <ul onClick={closeMenus}>
                        <li><a href='https://www.pcbonline.com/PCB-Assembly/PCB-Assembly-Overview/'>Prototype PCB Assembly</a></li>
                        <li><a href='https://www.pcbonline.com/PCB-Assembly/Low-Volume-PCB-Assembly/'>Low Volume PCB Assembly</a></li>
                        <li><a href='https://www.pcbonline.com/PCB-Assembly/High-Volume-PCB-Assembly/'>High Volume PCB Assembly</a></li>
                        <li><a href='https://www.pcbonline.com/PCB-Assembly/Consigned-PCB-Assembly/'>Consigned PCB Assembly</a></li>
                        <li><a href='https://www.pcbonline.com/pcba-process/'>PCBA Process</a></li>
                        <li><a href='https://www.pcbonline.com/PCB-FAB/SMT-Stencil/'>SMT Stencil</a></li>
                    </ul>
                </div> : null}

                {isSolutionShow ? <div className="down-product" onClick={closeSolution}>
                    <div className="down-right" ><p><img src={require('../images/navigation_icon3.png')} alt='left arrow' /></p> <p>EMS Solution</p></div>
                    <ul onClick={closeMenus}>
                        <li><a href='https://www.pcbonline.com/Ems-Solution/turnkey-pcb-assembly/'>Turnkey PCB Assembly</a></li>
                        <li><a href='https://www.pcbonline.com/ems-solution/circuit-board-components/'>Circuit Board Components</a></li>
                        <li><a href='https://www.pcbonline.com/PCB-FAB/PCB-layout/'>PCB Layout</a></li>
                    </ul>
                </div> : null}

                {isResourcesShow ? <div className="down-product" onClick={closeResources}>
                    <div className="down-right" ><p><img src={require('../images/navigation_icon3.png')} alt='left arrow' /></p> <p>Resources</p></div>
                    <ul onClick={closeMenus}>
                        <li><a href='https://www.pcbonline.com/blog/'>Blog</a></li>
                        <li><a href='https://www.pcbonline.com/support/home'>Support</a></li>
                        <li><a href='https://www.pcbonline.com/feedback/'>Feedback</a></li>
                    </ul>
                </div> : null}

                {isCompanyShow ? <div className="down-product" onClick={closeCompany}>
                    <div className="down-right" ><p><img src={require('../images/navigation_icon3.png')} alt='left arrow' /></p> <p>Company</p></div>
                    <ul onClick={closeMenus}>
                        <li><a href='https://www.pcbonline.com/about/'>About</a></li>
                        <li><a href='https://www.pcbonline.com/quality-control/'>Quality Control</a></li>
                    </ul>
                </div> : null}
            </div>
            <div className="mobile-close" onClick={closeMenus}>
                <img src={require('../images/navigation_icon1.png')} alt='close' />
            </div>
        </div> : null
    )
}

export default MobileMenu