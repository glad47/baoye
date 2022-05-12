
/*
 * @Descripttion: 程序入口
 * @version: 1.0
 * @Author:
 * @Date: 2021-08-18 22:06:41
 * @LastEditors: aziz
 * @LastEditTime: 2022-03-23 18:17:19
 */
import React, { useEffect, useRef, useState } from 'react'
import { hot } from 'react-hot-loader/root'

import {
    useAppState,
    createBoard,
    createBoardFromUrl,
    addQuote,
    backToUpload,
    backfillUploadPathData,
    reduxUser
} from './state'
import { Main } from './ui'
import { Layout, message } from 'antd'
import PcbSizeForm from './SpecificationInput/PcbSizeForm'
import BuildTimeForm from './SpecificationInput/BuildTimeForm'
import CastCalculation from './SpecificationInput/CostCalculation'
import ShoppingCast from './SpecificationInput/ShoppingCast'
import ShoppingTotal from './SpecificationInput/ShoppingTotal'
import UserLogin from './UserLogin'

import Foot from './Footer/index'
import MobileFoot from './Footer/MobileFoot'
import ReactGA from 'react-ga'

import SideNavigation, { SideNavigationTab } from './SpecificationInput/SideNavigation'
import FormControl from './SpecificationInput/FormControl'
import GerberUpload from './SpecificationInput/GerberUpload'
import Head from './Head/index'
import MobileHead from './Head/MobileHead'
import PcbBuildFee from "./SpecificationInput/PcbBuildFee";
import GerberProgress from "./SpecificationInput/GerberProgress";
import { ajaxFileUpload } from "./SpecificationInput/AjaxService";
import YouTubeVideo from "./Components/Youtube/YouTubeVideo";
import FormTips from "./Components/FormTips/FormTips";

function App(): JSX.Element {
    const { dispatch
        , subtotal
        , quoteMode
        , fileUploadPtah
        , isBackToUpload
        , isShow
        , fileFormData
        , flagQuoteParams
        , buildTimeItmes: buildTimeItems
        , pcbSizeField: { boardType, quantity, panelSize, singleSize } } = useAppState()
    let uname: any = null;
    let userPortrait: any = null;
    let [isFirst, setFirst] = useState(false)
    const [loginName, setLoginName] = useState(uname);
    const [headPortrait, setPortrait] = useState(userPortrait)
    const [isLogin, setLogin] = useState(false)
    // const [showUpload, setUpload] = useState(isBackToUpload)
    const [isMobileSize, setMobileSize] = useState(false)
    const [isQuoteFlags, setQuote] = useState(true)
    const [isStencilFlags, setStencil] = useState(false)
    const [isAssembly, setAssembly] = useState(false)
    const [isMobileOrder, setOrderState] = useState(false)
    const { Footer, Header, Content } = Layout
    const gerberUploadRef = useRef(null);
    const gerberGerberProgress = useRef(null);
    const pcbSizeFormRef = useRef(null);
    const [showYoutube, setShowYoutube] = useState<boolean>(false);

    const handleAddQuote = async (link?: boolean) => {
        // @ts-ignore
        pcbSizeFormRef?.current.formSubmit(); // 触发表单，避免表单验证不提示。返回Boolean类型，当前未阻塞后面的代码运行
        // 添加报价前先上传state保存的gerber文件
        const _f_file = await uploadZipFile('check');
        
       

        if (!_f_file) {
            // console.log("i am here *******************")
            return false;
        }
        if (quoteMode === 0) {
            if (boardType === 'Single') {
                // @ts-ignore
                const flag = await pcbSizeFormRef?.current.formSubmit(); // 主要弹出input require
               
                if (flag !== false) {
                    if (checkLogin()) {
                        await uploadZipFile('upload');
                    } else {
                        return false
                    }
                } else {
                    return false
                }
            } else {
                if (panelSize.sizeX === null || panelSize.sizeX === '' || panelSize.sizeY === null || panelSize.sizeY === '' || singleSize.sizeX === null || singleSize.sizeY == null) {
                    // @ts-ignore
                    pcbSizeFormRef?.current.tipsPanel();
                    // message.error('Please fill in the size and quantity and panel array ！！');
                    return false;
                }
                await uploadZipFile('upload');
            }
            if (fileUploadPtah === null) {
                // message.error('Please upload the gerber file ！！');
                // return;
                if (!loginName) {
                    let result = loginReady()
                    if (!!result) {
                        // setUpload(false)
                        dispatch(addQuote());
                        if (link) { location.href = '/audit'; }
                    }
                } else {
                    // setUpload(false)
                    dispatch(addQuote());
                    if (link) { location.href = '/audit'; }
                }
                return
            }
            dispatch(addQuote());
            if (link) { location.href = '/audit'; }
        } else if (quoteMode === 1) {
            // if (fileUploadPtah === null) {
            //     message.error('Please upload the gerber file ！！');
            //     return;
            // }
            if (subtotal.stencilFee === 0) {
                message.error('Please fill in the Dimensions !!');
                return;
            }
           
            await uploadZipFile('upload');
            dispatch(addQuote());
            if (link) { location.href = '/audit'; }
        } else if (quoteMode === 2) {
            // if (fileUploadPtah === null) {
            //     message.error('Please upload the gerber file ！！');
            //     return;
            // }
            if (subtotal.assemblyFee === 0) {
                message.error('Please fill data !!');
                return;
            }
            await uploadZipFile('upload');
            dispatch(addQuote());
            if (link) { location.href = '/audit'; }
            return true;
        }
        return true;
    }
    // const isShowLoad = (item:any) => {
    //     console.log(item)
    //     setUpload(false)
    // }

    // 文件上传 或者 检查文件
    const uploadZipFile = async (type: 'check' | 'upload') => {
        if (type === 'check') {
            const fileEL: any = document.getElementById("pcbFile");
            if (fileEL) {
                fileEL.style.borderColor = "red";
                return false;
            } else {
                return true;
            }
        } else if (type === 'upload') {
            if (fileFormData) {
                if (checkLogin()) {
                    const fileRes = await ajaxFileUpload(fileFormData);
                    if (fileRes.data.success) {
                        const { result } = fileRes.data
                        dispatch(backfillUploadPathData(result));
                    } else {
                        return false;
                    }
                }
            } else {
                await uploadZipFile('check');
            }
        }
    }

    const checkLogin = () => {
        const isLogin = sessionStorage.getItem('username');
        if (!isLogin) {
            setLogin(true);
            return false;
        }
        return true;
    }

    const aginUpload = () => {
        //   setUpload(true)
        // @ts-ignore
        gerberUploadRef?.current?.initGerberUploadState();
        dispatch(backToUpload(true))
    }
    const setLoginMessage = (e: any) => {
        setLogin(e)
    }
    const getUserInfo = (e: any) => {
        setLoginName(e)
    }
    // 实时更新头像
    const getUserHead = (e: any) => {
        let heads = require('./images/Mask.png')
        if (!!e) {
            setPortrait(e)
        } else {
            setPortrait(heads)
        }
    }

    const closeThisBox = (e: any) => {
        setLogin(e)
    }
    // 获取URL地址栏上面的参数
    const urlQuery = (key: string, url?: any) => {
        if (!window.location) {
            return
        }
        url = url || window.location.href
        var reg = new RegExp('[?&]' + key + '=([^&]*)', 'i')
        var match = url.match(reg)
        var result = ''
        if (match) {
            try {
                result = decodeURIComponent(match[1]) || ''
            } catch (e) { }
        }
        return result
    }

    const handMobileTool = () => {
        setOrderState(!isMobileOrder)
        window.scrollTo(0, document.body.offsetHeight)
    }

    useEffect(() => {
        const from = urlQuery('from')
        let users = sessionStorage.getItem('username')
        setLoginName(sessionStorage.getItem('username'));
        const isFirst = localStorage.getItem('user')
        let userAllInfo: any = JSON.parse(sessionStorage.getItem('userAllInfo') || '{}')
        const { favicon } = userAllInfo
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
        DragFileUpload();
        return () => {
            window.removeEventListener('resize', getWindowWidth);
        }
    }, []);

    // 拖拽上传
    const DragFileUpload = () => {
        const UPLOAD_DOM: any = document.getElementById('pcbMain');
        UPLOAD_DOM.addEventListener('dragover', function (e: any) {
            e.stopPropagation();
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
        });
        UPLOAD_DOM.addEventListener('drop', function (e: any) {
            e.stopPropagation();
            e.preventDefault();
            // @ts-ignore
            gerberUploadRef?.current?.handleFiles(e);
        });
    }

    const handleGoCar = () => {
        let link = true
        handleAddQuote(link)
        // location.href = '/audit';
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
    const isShowQuote = () => {
        setQuote(!isQuoteFlags)
    }
    const isShowStencil = () => {
        setStencil(!isStencilFlags)
    }
    const isShowAssembly = () => {
        setAssembly(!isAssembly)
    }
    const progressCallBack = (fileName: any, fileSize: any, progress: any) => {
        // @ts-ignore
        return gerberGerberProgress?.current.handleProgress(fileName, fileSize, progress)
    }

    const handleVideo = (type: any) => {
        setShowYoutube(type)
    }

    return (
        <>
            <Main>
                {/* <FileList /> */}
                {/* <BoardList /> */}
                <Layout>
                    {/* <Head loginName={loginName}/> */}
                    {
                        !isMobileSize ?
                            <Head getUserInfo={getUserInfo}
                            closeThisBox={closeThisBox}
                            getUserHead={getUserHead}
                            loginCallBack={handleAddQuote}
                            isLoginReady={loginReady}  closeVideo={handleVideo} loginName={[loginName, headPortrait]} />
                            : <MobileHead />
                    }
                    {!isMobileSize ? <Content>
                        {/* 左边栏 */}
                        <div className="pcb-nav">
                            <SideNavigation>
                                <SideNavigationTab><div className='pcb-title'><img src={require('./images/header_one_show.png')} /><p className='pcb-word'>PCB</p></div></SideNavigationTab>
                                <SideNavigationTab><div className='stencil-title'><img src={require('./images/header_icon_two.png')} /><p className='stencil-word'>Stencil</p></div></SideNavigationTab>
                                <SideNavigationTab><div className='assembly-title'><img src={require('./images/header_icon_three.png')} /><p className='assembly-word'>Assembly</p></div></SideNavigationTab>
                                {/* <SideNavigationTab><div><ReconciliationFilled /></div></SideNavigationTab> */}
                            </SideNavigation>
                        </div>

                        <div className="pcb-min-info">
                            <div className="pcb-min" id="pcbMain">
                                {/*{*/}
                                {/*    isBackToUpload ? <GerberUpload cRef={gerberUploadRef} loginName={loginName} setLoginMessage={setLoginMessage}/>*/}
                                {/*    :*/}
                                {/*        <GerberShow handleFilesRef={gerberUploadRef?.current}/>*/}
                                {/*}*/}
                                <GerberUpload progressCallBack={progressCallBack} cRef={gerberUploadRef} loginName={loginName} setLoginMessage={setLoginMessage} />
                                <GerberProgress cRef={gerberGerberProgress} aginUpload={aginUpload} />
                                <div className="quantity-con">
                                    <FormTips tip={"666"} />
                                    {quoteMode === 0 ? <PcbSizeForm cRef={pcbSizeFormRef} /> : ''}
                                </div>
                                {/*{!isBackToUpload*/}
                                {/*    ? <div className={isShow ? 'again_uploads_success' : "again_uploads_fail"}>*/}
                                {/*        <p className='title_success_top'>Your files have been successfully uploaded.</p>*/}
                                {/*        <button onClick={aginUpload} className='button_to_file'>Back to Upload File</button></div>*/}
                                {/*    : ''}*/}
                            </div>
                            {/* <PcbSizeForm /> */}
                            <FormControl quoteMode={quoteMode} isMobileSize={isMobileSize} />
                        </div>


                        <div className="pcb-sidebar">
                            <PcbBuildFee
                                handleAddQuote={handleAddQuote}
                                setIsLogin={() => { setLogin(true) }} />
                            {/*<div className="pcb-build-time">*/}
                            {/*    <BuildTimeForm buildItems={buildTimeItems} />*/}
                            {/*</div>*/}
                            {/*<div className="pcb-fee">*/}
                            {/*    <CastCalculation {...subtotal} quoteMode={quoteMode} />*/}
                            {/*</div>*/}
                            {/*<div className="pcb-cast">*/}
                            {/*    <ShoppingCast isMobileSize={isMobileSize} />*/}
                            {/*</div>*/}
                            {/*<div className="pcb-total">*/}
                            {/*    <ShoppingTotal total={Number((subtotal.boardFee + subtotal.engineeringFee + subtotal.testFee + subtotal.urgentFee + subtotal.shippingFee + subtotal.stencilFee + subtotal.assemblyFee).toFixed(2))} handleAddQuote={handleAddQuote} handleGoCar={handleGoCar} />*/}
                            {/*</div>*/}
                        </div>
                        {
                            showYoutube && <YouTubeVideo closeVideo={() => handleVideo(null)} />
                        }
                    </Content>
                        :
                        <Content>
                            <div className='mobile-nav-online'>
                                <div className='mobile-quote' onClick={isShowQuote}>
                                    <div className='mobile-quote-float'>
                                        <p>Online Quote</p>
                                        <div className='mobile-arrow'>
                                            {isQuoteFlags ?
                                                <img src={require('./images/hide_hover_content.png')} alt='hide content' /> :
                                                <img src={require('./images/show_content.png')} alt='show content' />
                                            }
                                        </div>
                                    </div>
                                </div>
                                {isQuoteFlags ? <>
                                    <PcbSizeForm isMobileSize={isMobileSize} />
                                    <FormControl quoteMode={0} isMobileSize={isMobileSize} />
                                </> : null}
                            </div>
                            <div className='mobile-nav-online'>
                                <div className='mobile-quote' onClick={isShowStencil}>
                                    <div className='mobile-quote-float'>
                                        <p>Order Together With SMT-Stencil</p>
                                        <div className='mobile-arrow'>
                                            {isStencilFlags ?
                                                <img src={require('./images/hide_hover_content.png')} alt='hide content' /> :
                                                <img src={require('./images/show_content.png')} alt='show content' />
                                            }
                                        </div>
                                    </div>
                                </div>
                                {isStencilFlags ? <FormControl quoteMode={1} isMobileSize={isMobileSize} /> : null}
                            </div>
                            <div className='mobile-nav-online'>
                                <div className='mobile-quote' onClick={isShowAssembly}>
                                    <div className='mobile-quote-float'>
                                        <p>The above PCBs need Assembly</p>
                                        <div className='mobile-arrow'>
                                            {isAssembly ? <img src={require('./images/hide_hover_content.png')} alt='hide content' /> :
                                                <img src={require('./images/show_content.png')} alt='show content' />}
                                        </div>
                                    </div>
                                </div>
                                {isAssembly ? <FormControl quoteMode={2} isMobileSize={isMobileSize} /> : null}
                            </div>

                            {isMobileOrder && <div>
                                <div className='mobile-hand-style'>
                                    <BuildTimeForm buildItems={buildTimeItems} />
                                    <CastCalculation {...subtotal} quoteMode={quoteMode} />
                                </div>
                                <ShoppingCast isMobileSize={isMobileSize} />

                            </div>}
                            <div>
                                <ShoppingTotal
                                    total={Number((subtotal.boardFee + subtotal.engineeringFee + subtotal.testFee + subtotal.urgentFee + subtotal.shippingFee + subtotal.stencilFee + subtotal.assemblyFee - subtotal.subsidy).toFixed(2))}
                                    handleAddQuote={handleAddQuote}
                                    handleGoCar={handleGoCar}
                                    isMobileSize={isMobileSize}
                                    handMobileTool={handMobileTool}
                                    isTool={isMobileOrder}
                                    loginName={loginName}
                                    setLoginMessage={setLoginMessage}
                                />
                            </div>
                        </Content>
                    }
                    {!isMobileSize ? <Foot /> : <MobileFoot />}
                    {isLogin ? <UserLogin
                        getUserInfo={getUserInfo}
                        closeThisBox={closeThisBox}
                        getUserHead={getUserHead}
                        loginCallBack={handleAddQuote}
                        isLoginReady={loginReady} /> : ""}
                </Layout>
            </Main>
        </>
    )
}

export default hot(App)
