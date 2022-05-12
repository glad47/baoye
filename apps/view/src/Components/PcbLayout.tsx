import React, {useEffect, useState} from 'react'
import Head from "../Head";
import MobileHead from "../Head/MobileHead";
import Foot from "../Footer";
import MobileFoot from "../Footer/MobileFoot";
import UserLogin from "../UserLogin";
import ReactGA from "react-ga";
import YouTubeVideo from "../Components/Youtube/YouTubeVideo";

const _style = {
    width: '1200px',
    margin: '0 auto'
}

const PcbLayout:React.FC<any> = (props: any) => {
    const {children} = props;
    let uname: any = null;
    let userPortrait: any = null;
    const [isMobileSize, setMobileSize] = useState(false);
    const [loginName, setLoginName] = useState(uname);
    const [headPortrait, setPortrait] = useState(userPortrait);
    const [isLogin, setLogin] = useState(false);
    let [isFirst, setFirst] = useState(false);
    const [showYoutube, setShowYoutube] = useState<boolean>(false);

    const handleVideo = (type: any) => {
        setShowYoutube(type)
    }

    const getUserInfo = (e: any) => {
        setLoginName(e)
    }

    const closeThisBox = (e: any) => {
        setLogin(e)
    }

    // 实时更新头像
    const getUserHead = (e: any) => {
        let heads = require('../images/Mask.png')
        if (!!e) {
            setPortrait(e)
        } else {
            setPortrait(heads)
        }
    }

    async function loginReady(e?: any) {
        let result = await e
        return result
    }

    //  获取窗口的宽度
    const getWindowWidth = () => {
        let windowWidth = window.innerWidth
        if (windowWidth < 850) {
            setMobileSize(true)
            setFirst(false)
        } else {
            setMobileSize(false)
        }
    }

    // 获取URL地址栏上面的参数
    const urlQuery = (key: string, url?: any) => {
        if (!window.location) {
            return
        }
        url = url || window.location.href
        const reg = new RegExp('[?&]' + key + '=([^&]*)', 'i')
        const match = url.match(reg)
        let result = ''
        if (match) {
            try {
                result = decodeURIComponent(match[1]) || ''
            } catch (e) {
            }
        }
        return result
    }

    useEffect(() => {
        const from = urlQuery('from')
        let users = sessionStorage.getItem('username')
        setLoginName(sessionStorage.getItem('username'));
        const isFirst = localStorage.getItem('user')
        let userAllInfo: any = JSON.parse(sessionStorage.getItem('userAllInfo') || '{}')
        const {favicon} = userAllInfo
        setPortrait(favicon)
        if (isFirst == undefined) {
            setFirst(true)
        } else {
            setFirst(false)
        }
        if (from === 'quote' && users === null) {
            setLogin(true)
        }
        getWindowWidth()
        window.addEventListener('resize', getWindowWidth)
        ReactGA.initialize('G-3V6Y7YZNEE')
        ReactGA.ga('set', 'page', 'https://sys.pcbonline.com/instant-quote/')
        return () => {
            window.removeEventListener('resize', getWindowWidth)
        }
    }, []);

    return (
        <div className="pac-layout">
            {!isMobileSize ? <Head  getUserInfo={getUserInfo} closeThisBox={closeThisBox} getUserHead={getUserHead}
                                  isLoginReady={loginReady}  closeVideo={handleVideo} loginName={[loginName, headPortrait]}/> : <MobileHead/>}
            <div className="layout-container" style={_style}>
                {children}
            </div>
            {!isMobileSize ? <Foot/> : <MobileFoot/>}
            {isLogin ? <UserLogin getUserInfo={getUserInfo} closeThisBox={closeThisBox} getUserHead={getUserHead}
                                  isLoginReady={loginReady}/> : ""}
            {
                showYoutube && <YouTubeVideo closeVideo={() => handleVideo(null)}/>
            }
        </div>
    )
};

export default PcbLayout;