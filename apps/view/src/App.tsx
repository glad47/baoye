// root component
import React, { useEffect, useState } from 'react'
import { hot } from 'react-hot-loader/root'

import { useAppState, createBoard, createBoardFromUrl, addQuote } from './state'
import BoardDisplay from './BoardDisplay'
import Nav from './Nav'
import LoadFiles from './LoadFiles'
import ErrorToast from './ErrorToast'
import { preventDefault } from './events'
import { Main } from './ui'
import { FileEvent } from './types'
import { Layout, Checkbox } from 'antd'
import PcbSpecification from './SpecificationInput/PcbSpecification'
import SpecificationHead from './SpecificationInput/SpecificationHead'
import PcbSizeForm from './SpecificationInput/PcbSizeForm'
import BuildTimeForm from './SpecificationInput/BuildTimeForm'
import CastCalculation from './SpecificationInput/CostCalculation'
import ShoppingCast from './SpecificationInput/ShoppingCast'
import ShoppingTotal from './SpecificationInput/ShoppingTotal'
import StencilForm from './SpecificationInput/StencilForm'
import ManualForm from './SpecificationInput/ManualForm'
import img from './images/logo.png'
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios'
import logoImg from './images/logo-bxsd.png'
import Icon1 from './images/footer_icon01.png'
import Icon2 from './images/footer_icon02.png'
import Icon3 from './images/footer_icon03.png'
import Icon4 from './images/footer_icon04.png'
import Icon5 from './images/footer_icon05.png'


import { WalletFilled, SlidersFilled, SwitcherFilled, ReconciliationFilled, CalculatorOutlined } from '@ant-design/icons';
import SideNavigation, { SideNavigationTab } from './SpecificationInput/SideNavigation'
import FormControl from './SpecificationInput/FormControl'
import GerberUpload from './SpecificationInput/GerberUpload'
import GerberShow from './SpecificationInput/GerberShow'
import Head from './Login'

function App(): JSX.Element {
  const { dispatch, subtotal, buildTimeItmes, quoteMode } = useAppState()
  
  const handleFiles = (event: FileEvent): void => {
    const files =
      'dataTransfer' in event
        ? Array.from(event.dataTransfer.files)
        : Array.from(event.target.files || [])

    if (files.length > 0) dispatch(createBoard(files, 'dataTransfer' in event))
    if ('value' in event.target) event.target.value = ''
    preventDefault(event)
  }

  const handleUrl = (url: string): void => {
    if (url) dispatch(createBoardFromUrl(url))
  }
  const { Footer, Header, Content } = Layout

  const handleAddQuote = () => {
    dispatch(addQuote());
  }

  const handleGoCar = ()=>{
    location.href = 'http://localhost:8882/car/goToCart';
  }
   
  const login =()=>{
    location.href='https://www.pcbonline.com/login'
  }

  return (
    <Main>
      {/* <FileList /> */}
      {/* <BoardList /> */}

      <Layout>
        {/* <Header>
          <div className="logo"><img src={img} alt="" /></div>
          <div className="sign-btn">
            <CalculatorOutlined />
            <span className="sign-in" onClick={login}>Sign in</span>
          </div>
        </Header> */}
        <Head/>
        <Content>
          {/* 左边栏 */}
          <div className="pcb-nav">
            <SideNavigation>
              <SideNavigationTab><div><WalletFilled /></div></SideNavigationTab>
              <SideNavigationTab><div><SlidersFilled /></div></SideNavigationTab>
              <SideNavigationTab><div><SwitcherFilled /></div></SideNavigationTab>
              {/* <SideNavigationTab><div><ReconciliationFilled /></div></SideNavigationTab> */}
            </SideNavigation>
          </div>

          <div className="pcb-min-info">

            <div className="pcb-min">
              <GerberUpload />
              <GerberShow />
              {quoteMode === 0 ? <PcbSizeForm/> : ''}
            </div>
            {/* <PcbSizeForm /> */}
            <FormControl quoteMode={quoteMode} />
          </div>


          <div className="pcb-sidebar">

            <div className="pcb-build-time">
              <BuildTimeForm/>
            </div>

            <div className="pcb-fee">
              <CastCalculation {...subtotal} quoteMode={quoteMode} />
            </div>

            <div className="pcb-cast">
              <ShoppingCast />
            </div>

            <div className="pcb-total">
              <ShoppingTotal total={Number((subtotal.boardFee + subtotal.engineeringFee + subtotal.testFee + subtotal.urgentFee + subtotal.shippingFee + subtotal.stencilFee).toFixed(2))} handleAddQuote={handleAddQuote} handleGoCar={handleGoCar} />
            </div>

          </div>

        </Content>
        <Footer className='footer'>
          <div className='footer_title'><img src={logoImg} /></div>
          <div className='footer_main'>
            <div className='main_left'>
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
              <div className='footer_link'>
                <a>PRIVACY POLICY</a>
                <a>ABOUT US </a>
              </div>
              <div className='footer_link'>
                <a>TERMS OF SERVICE</a>
                <a>ONLINE ORDERING </a>
              </div>
              <div className='footer_link'>
                <a>PCB Laminate datasheet</a>
                <a>FEEDBACK</a>
              </div>
            </div>
          </div>

          <div className='copyright'>
            <p>@2018 PCB online LTD.All Right Reserved</p>
            <div className='copyright_right'>
              <div className='show_link_country'><span>Japanese</span><img src={require('./images/footer_country_icon001.png')}/></div>
              <div className='show_link_country'><span>German</span><img src={require('./images/footer_country_icon002.png')}/></div>
              <div className='show_link_country'><span>Spanish</span><img src={require('./images/footer_country_icon003.png')}/></div>
              <div className='show_link_country'><span>United States</span><img src={require('./images/footer_country_icon004.png')}/></div>
            </div>
          </div>
        </Footer>
      </Layout>

    </Main>

  )
}

export default hot(App)
