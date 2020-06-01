// root component
import React from 'react'
import {hot} from 'react-hot-loader/root'

import {useAppState, createBoard, createBoardFromUrl, addQuote} from './state'
import BoardDisplay from './BoardDisplay'
import Nav from './Nav'
import LoadFiles from './LoadFiles'
import ErrorToast from './ErrorToast'
import {preventDefault} from './events'
import {Main} from './ui'
import {FileEvent} from './types'
import { Layout } from 'antd'
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
import { BrowserRouter as Router} from 'react-router-dom';

import { WalletFilled, SlidersFilled, SwitcherFilled, ReconciliationFilled, CalculatorOutlined } from '@ant-design/icons';
import SideNavigation, { SideNavigationTab } from './SpecificationInput/SideNavigation'
import FormControl from './SpecificationInput/FormControl'

function App(): JSX.Element {
  const {dispatch,subtotal,buildTimeItmes,quoteMode} = useAppState()
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
  const { Footer,Header,Content } = Layout

  const handleAddQuote = () =>{
    dispatch(addQuote());
  }

  const handleGoCar = ()=>{
    location.href = 'http://localhost:8882/quote1/goToCart';
  }

  return (
    <Main>
      {/* <FileList /> */}
      {/* <BoardList /> */}
     
      <Layout>
        <Header>
        <div className="logo"><img src={ img } alt=""/></div>  
          <div className="sign-btn">
            <CalculatorOutlined />
            <span className="sign-in">Sign in</span>  
          </div>     
        </Header>
        <Content>
            {/* 左边栏 */}
            <div className="pcb-nav">
              <SideNavigation>
                <SideNavigationTab><div><WalletFilled /></div></SideNavigationTab>
                <SideNavigationTab><div><SlidersFilled /></div></SideNavigationTab>
                <SideNavigationTab><div><SwitcherFilled /></div></SideNavigationTab>
                <SideNavigationTab><div><ReconciliationFilled /></div></SideNavigationTab>
              </SideNavigation>
            </div>
        
            <div className="pcb-min-info">

              <div className="pcb-min">
                <Nav/>
                <div className="pcb-file">
                  <BoardDisplay />
                  <LoadFiles handleFiles={handleFiles}/>
                  <ErrorToast />
                </div>
                {quoteMode === 0 ? <PcbSizeForm/> : ''}
              </div>
              {/* <PcbSizeForm /> */}
              <FormControl quoteMode={quoteMode}/>
            </div>
              

            <div className="pcb-sidebar">

              <div className="pcb-build-time">
                <BuildTimeForm buildItems={buildTimeItmes}/>
              </div>

              <div className="pcb-fee">
                <CastCalculation {...subtotal} quoteMode={quoteMode}/>
              </div>

              <div className="pcb-cast">
                <ShoppingCast />
              </div>  

              <div className="pcb-total">
                <ShoppingTotal total={Number((subtotal.boardFee+subtotal.engineeringFee+subtotal.testFee+subtotal.urgentFee+subtotal.shippingFee+subtotal.stencilFee).toFixed(2))} handleAddQuote={handleAddQuote} handleGoCar={handleGoCar}/>
              </div>
              
            </div>

        </Content>
        <Footer>
          尾
        </Footer>
      </Layout>
     
    </Main>
   
  )
}

export default hot(App)
