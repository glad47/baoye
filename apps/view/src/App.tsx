// root component
import React, { useEffect, useState } from 'react'
import { hot } from 'react-hot-loader/root'

import { useAppState, createBoard, createBoardFromUrl, addQuote, backToUpload } from './state'
import { Main } from './ui'
import { Layout, Checkbox, message } from 'antd'
import PcbSizeForm from './SpecificationInput/PcbSizeForm'
import BuildTimeForm from './SpecificationInput/BuildTimeForm'
import CastCalculation from './SpecificationInput/CostCalculation'
import ShoppingCast from './SpecificationInput/ShoppingCast'
import ShoppingTotal from './SpecificationInput/ShoppingTotal'
import UserLogin from './UserLogin'
// import Head from './Head'
import axios from 'axios'
// import Foot from './Footer/index'
import Tips from './GuideTips/index'
import Foot from './Footer/index'


import { WalletFilled, SlidersFilled, SwitcherFilled, ReconciliationFilled, CalculatorOutlined } from '@ant-design/icons';
import SideNavigation, { SideNavigationTab } from './SpecificationInput/SideNavigation'
import FormControl from './SpecificationInput/FormControl'
import GerberUpload from './SpecificationInput/GerberUpload'
import GerberShow from './SpecificationInput/GerberShow'
import Head from './Head'
import { baseUrl } from './SpecificationInput/AjaxService'

function App(): JSX.Element {
  const { dispatch
    , subtotal
    , quoteMode
    , fileUploadPtah
    , isBackToUpload
    , isShow
    , buildTimeItmes
    , pcbSizeField: { boardType, quantity, panelSize, singleSize } } = useAppState()
  let uname: any = null;
  let userPortrait: any = null;
  let [isFirst, setFirst] = useState(false)
  const [loginName, setLoginName] = useState(uname);
  const [headPortrait, setPortrait] = useState(userPortrait)
  const [isLogin, setLogin] = useState(false)
  //console.log(buildTimeItmes)
  const { Footer, Header, Content } = Layout
  const handleAddQuote = () => {
    if (quoteMode === 0) {
      if (fileUploadPtah === null) {
        message.error('Please upload the gerber file ！！');
        return;
      }
      if (boardType === 'Single') {
        if (quantity === null || singleSize.sizeX === null || singleSize.sizeY === null) {
          message.error('Please fill in the size and quantity ！！');
          return;
        }
      } else {
        if (quantity === null || panelSize.sizeX === null || panelSize.sizeY === null || singleSize.sizeX === null || singleSize.sizeY == null) {
          message.error('Please fill in the size and quantity and panel array ！！');
          return;
        }
      }
      dispatch(addQuote());
    } else if (quoteMode === 1) {
      if (fileUploadPtah === null) {
        message.error('Please upload the gerber file ！！');
        return;
      }
      if (subtotal.stencilFee === 0) {
        message.error('Please fill in the Dimensions !!');
        return;
      }
      dispatch(addQuote());
    } else if (quoteMode === 2) {
      if (fileUploadPtah === null) {
        message.error('Please upload the gerber file ！！');
        return;
      }
      if (subtotal.assemblyFee === 0) {
        message.error('Please fill data !!');
        return;
      }
      dispatch(addQuote());
    }

    // if (isLogin) {

    // } else {
    //   message.warning('Please log in first ！！')
    //   setTimeout(() => {
    //     location.href = '/login?jumpUrl=instant-quote';
    //   }, 500);
    // }
  }
  const aginUpload = () => {
    dispatch(backToUpload(true))
  }
  const setLoginMessage = (e: any) => {
    setLogin(e)
  }
  const getUserInfo = (e: any) => {
    setLoginName(e)
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
  useEffect(() => {
    //获取登录信息
    // axios.defaults.withCredentials = true;
    // axios.post(baseUrl+'loginUserInfo')
    //   .then(rep => {
    //     // setIsLogin(rep.data.success);
    //     if (rep.data.success) {
    //       setLoginName(rep.data.result.email);
    //     }
    //   })
    const from =urlQuery('from')
    let users=sessionStorage.getItem('username')
    setLoginName(sessionStorage.getItem('username'));
    const isFirst = localStorage.getItem('user')
    let userAllInfo: any = JSON.parse(sessionStorage.getItem('userAllInfo') || '{}')
    const { favicon } = userAllInfo
    setPortrait(favicon)
    // console.log(isFirst)
    if (isFirst == undefined) {
      setFirst(true)
    } else {
      setFirst(false)
    }
    if(from==='quote' && users===null){
      setLogin(true)
    }
  }, [])
  const handleGoCar = () => {
    location.href = '/';
  }
  return (
    <>

      <Main>
        {/* <FileList /> */}
        {/* <BoardList /> */}
        <Layout>
          {isFirst ? <Tips /> : ''}
          {/* <Head loginName={loginName}/> */}
          <Head loginName={[loginName, headPortrait]} />
          <Content>
            {/* 左边栏 */}
            <div className="pcb-nav">
              <SideNavigation>
                <SideNavigationTab><div><img src={require('./images/header_one_show.png')} /></div></SideNavigationTab>
                <SideNavigationTab><div><img src={require('./images/header_icon_two.png')} /></div></SideNavigationTab>
                <SideNavigationTab><div><img src={require('./images/header_icon_three.png')} /></div></SideNavigationTab>
                {/* <SideNavigationTab><div><ReconciliationFilled /></div></SideNavigationTab> */}
              </SideNavigation>
            </div>

            <div className="pcb-min-info">

              <div className="pcb-min">
                {isBackToUpload ? <GerberUpload loginName={loginName} setLoginMessage={setLoginMessage} /> : <GerberShow />}
                {quoteMode === 0 ? <PcbSizeForm /> : ''}
                {!isBackToUpload
                  ? <div className={isShow ? 'again_uploads_success' : "again_uploads_fail"}>
                    <p className='title_success_top'>Your files have been successfully uploaded.</p>
                    <button onClick={aginUpload} className='button_to_file'>Back to Upload File</button></div>
                  : ''}
              </div>
              {/* <PcbSizeForm /> */}
              <FormControl quoteMode={quoteMode} />
            </div>


            <div className="pcb-sidebar">

              <div className="pcb-build-time">
                <BuildTimeForm buildItems={buildTimeItmes} />
              </div>

              <div className="pcb-fee">
                <CastCalculation {...subtotal} quoteMode={quoteMode} />
              </div>

              <div className="pcb-cast">
                <ShoppingCast />
              </div>

              <div className="pcb-total">
                <ShoppingTotal total={Number((subtotal.boardFee + subtotal.engineeringFee + subtotal.testFee + subtotal.urgentFee + subtotal.shippingFee + subtotal.stencilFee + subtotal.assemblyFee).toFixed(2))} handleAddQuote={handleAddQuote} handleGoCar={handleGoCar} />
              </div>

            </div>

          </Content>
          <Foot />
          {isLogin ? <UserLogin getUserInfo={getUserInfo} closeThisBox={closeThisBox} /> : ""}
        </Layout>

      </Main>
    </>
  )
}

export default hot(App)
