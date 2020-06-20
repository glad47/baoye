// root component
import React, { useEffect, useState } from 'react'
import { hot } from 'react-hot-loader/root'

import { useAppState, createBoard, createBoardFromUrl, addQuote } from './state'
import { Main } from './ui'
import { Layout, Checkbox, message } from 'antd'
import PcbSizeForm from './SpecificationInput/PcbSizeForm'
import BuildTimeForm from './SpecificationInput/BuildTimeForm'
import CastCalculation from './SpecificationInput/CostCalculation'
import ShoppingCast from './SpecificationInput/ShoppingCast'
import ShoppingTotal from './SpecificationInput/ShoppingTotal'
import axios from 'axios'
import Foot from './Foot/index'


import { WalletFilled, SlidersFilled, SwitcherFilled, ReconciliationFilled, CalculatorOutlined } from '@ant-design/icons';
import SideNavigation, { SideNavigationTab } from './SpecificationInput/SideNavigation'
import FormControl from './SpecificationInput/FormControl'
import GerberUpload from './SpecificationInput/GerberUpload'
import GerberShow from './SpecificationInput/GerberShow'
import Head from './Login'

function App(): JSX.Element {
  const { dispatch
    , subtotal
    , quoteMode
    , fileUploadPtah
    , isBackToUpload
    ,pcbSizeField:{boardType,quantity,panelSize,singleSize} } = useAppState()

  const [isLogin, setIsLogin] = useState(false);  
  
  const { Footer, Header, Content } = Layout

  const handleAddQuote = () => {
    if(fileUploadPtah === null){
      message.error('Please upload the gerber file ！！');
      return;
    }
    if(boardType === 'Single'){
      if(quantity === null || singleSize.sizeX === null || singleSize.sizeY === null){
        message.error('Please fill in the size and quantity ！！');
        return;
      }
    }else{
      if(quantity === null || panelSize.sizeX === null || panelSize.sizeY === null || singleSize.sizeX === null || singleSize.sizeY == null ){
        message.error('Please fill in the size and quantity and panel array ！！'); 
        return;
      }
    }
    if(isLogin){
      dispatch(addQuote());
    }else{
      message.warning('Please log in first ！！')
      setTimeout(() => {
        location.href = '/login';   
      }, 500);
    }
  }

  useEffect(()=>{
    //获取登录信息
    // axios.defaults.withCredentials = true;
    axios.post('/loginUserInfo')
    .then(rep=>{
      console.log(rep)
      setIsLogin(rep.data.success);
      if(rep.data.success){
          //todo 登录信息
      }else{

      }
    })
  },[])

  const handleGoCar = ()=>{
    location.href = 'http://localhost:8882/car/goToCart';
  }

  const login = () => {
    location.href = 'https://www.pcbonline.com/login'
  }

  return (
    <Main>
      {/* <FileList /> */}
      {/* <BoardList /> */}

      <Layout>
        <Head />
        <Content>
          {/* 左边栏 */}
          <div className="pcb-nav">
            <SideNavigation>
              <SideNavigationTab><div><img src={require('./images/header_icon_one.png')}/></div></SideNavigationTab>
              <SideNavigationTab><div><img src={require('./images/header_icon_two.png')}/></div></SideNavigationTab>
              <SideNavigationTab><div><img src={require('./images/header_icon_three.png')}/></div></SideNavigationTab>
              {/* <SideNavigationTab><div><ReconciliationFilled /></div></SideNavigationTab> */}
            </SideNavigation>
          </div>

          <div className="pcb-min-info">

            <div className="pcb-min">
              {isBackToUpload ?<GerberUpload />:  <GerberShow /> }
              {quoteMode === 0 ? <PcbSizeForm /> : ''}
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

  )
}

export default hot(App)
