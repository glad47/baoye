import React, { useState } from 'react'
import MobileMenu from '../DownMenu/MobileMenuList'

function MobileHead(props: any) {
    const [isShowMenu, setMenuFlag] = useState(false)
    const showMenus = () => {
        setMenuFlag(true)
    }
    const closeMenus=(e:any)=>{
        setMenuFlag(false)
    }
    return (
        <>
            <div className='mobile-head'>
                <div className='mobile-menu' onClick={showMenus}>
                    <img src={require('../images/menu.png')} alt='menu' />
                </div>
                <div className='mobile-logo'>
                    <img src={require('../images/logo_top.png')} alt='logo' />
                </div>
                <div className='mobile-info'>
                    <img />
                </div>
            </div>
            <MobileMenu openMenu={isShowMenu} closeMenus={closeMenus}/>
        </>
    )
}

export default MobileHead