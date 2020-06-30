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
import axios from 'axios'
import Foot from './Foot/index'
import Tips from './GuideTips/index'


import { WalletFilled, SlidersFilled, SwitcherFilled, ReconciliationFilled, CalculatorOutlined } from '@ant-design/icons';
import SideNavigation, { SideNavigationTab } from './SpecificationInput/SideNavigation'
import FormControl from './SpecificationInput/FormControl'
import GerberUpload from './SpecificationInput/GerberUpload'
import GerberShow from './SpecificationInput/GerberShow'
import Head from './Login'
import { baseUrl } from './SpecificationInput/AjaxService'

function App(): JSX.Element {
  const { dispatch
    , subtotal
    , quoteMode
    , fileUploadPtah
    , isBackToUpload
    , isShow
    , pcbSizeField: { boardType, quantity, panelSize, singleSize } } = useAppState()

  const [isLogin, setIsLogin] = useState(false);
  let [isFirst,setFirst]=useState(false)

  const { Footer, Header, Content } = Layout

  const handleAddQuote = () => {
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
    if (isLogin) {
      dispatch(addQuote());
    } else {
      message.warning('Please log in first ！！')
      setTimeout(() => {
        location.href = '/login';
      }, 500);
    }
  }
  const aginUpload = () => {
    dispatch(backToUpload(true))
  }
  useEffect(() => {
    //获取登录信息
    // axios.defaults.withCredentials = true;
    // axios.post('http://192.168.0.181:8882/loginUserInfo')
    //   .then(rep => {
    //     setIsLogin(rep.data.success);
    //     if (rep.data.success) {
    //     } else {
    //     }
    //   })
      const isFirst =localStorage.getItem('user')
      console.log(isFirst)
      if(isFirst==undefined){
        setFirst(true)
      }
  }, [])
  const handleGoCar = () => {
    location.href = 'https://www.pcbonline/car/goToCart';
  }
  return (
    <>
      
      <Main>
        {/* <FileList /> */}
        {/* <BoardList /> */}
        <Layout>
        {isFirst?<Tips />:''}
          <Head />
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
                {isBackToUpload ? <GerberUpload /> : <GerberShow />}
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
                <BuildTimeForm />
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
        </Layout>

      </Main>
    </>
  )
}

export default hot(App)
