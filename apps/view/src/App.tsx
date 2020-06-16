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

function App(): JSX.Element {
  const [progress, changeProgress] = useState(0)
  let [formShow, changeShowState] = useState(false)
  let [borderWidth, setBorderWidth] = useState(0)
  let [borderLength, setBorderLength] = useState(0)
  let [topSvg, setTopSvg] = useState(String);
  let [bottomSvg, setBottom] = useState(String)
  let [circuitBoardSize,setBoardSize]=useState(Object)

  const { dispatch, subtotal, buildTimeItmes, quoteMode } = useAppState()
  
  const handleFiles = (event: FileEvent): void => {
    const files =
      'dataTransfer' in event
        ? Array.from(event.dataTransfer.files)
        : Array.from(event.target.files || [])

    if (files.length > 0) dispatch(createBoard(files, 'dataTransfer' in event))
    if ('value' in event.target) event.target.value = ''
    preventDefault(event)
    // const {name} =files[0] || ''
    // // PersistentData('uploadName',name,true)
    // const fd = new FormData()
    // fd.append('uploads', files[0])

    // axios.post('http://localhost:8888/api/uploads', fd, {
    //   onUploadProgress: (ProgressEvent) => {
    //     var percentCompleted = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
    //     changeProgress(percentCompleted)
    //   },
    //   headers: { 'Content-Type': 'multipart/form-data' }
    // }).then(res => {
    //   console.log(res.data)
    //   const { board_length, board_width, stackup, uploadPath,toolsCount } = res.data
    //   const { bottom, top, id } = stackup
    //   const topSvgG = top.svg
    //   const bottomSvgG = bottom.svg
    //   formShow = true
    //   changeShowState(formShow)
    //   setTopSvg(topSvgG)
    //   setBottom(bottomSvgG)
    //   setBorderWidth(board_width)
    //   setBorderLength(board_length)
    //   // PersistentData('uploadPath',uploadPath,true)
    //   let circuitSize={
    //     width:board_width,
    //     length:board_length,
    //     quantity:toolsCount
    //   }
    //   setBoardSize(circuitSize)
    // })
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
    /**
     * @description: 数据本地持久化处理（暂时使用，未封装完整）
     * @param :name：持久化数据ID（唯一性）；items：具体存储的数据；type：类型：为永久化存储还是本次存储，布尔值（true，false）
     * @return: none
    */
  // function PersistentData(name,items,type){
  //   const {localStorage,sessionStorage} =window
  //   if(type){
  //     localStorage.setItem(name,items)
  //   }else{
  //     sessionStorage.setItem(name,items)
  //   }
  // }


  return (
    <Main>
      {/* <FileList /> */}
      {/* <BoardList /> */}

      <Layout>
        <Header>
          <div className="logo"><img src={img} alt="" /></div>
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
              {/* <Nav/> */}
              {/* {formShow ? "" : <div className="pcb-file">
                <BoardDisplay />
                <LoadFiles handleFiles={handleFiles} />
                <ErrorToast />
              </div>}
              {formShow
                ? (borderLength>70) ? <>
                  <div className='vertical_svg'>
                    <div className='vertical_svg_first'>
                      <div dangerouslySetInnerHTML={{ __html: topSvg }} />
                    </div>
                    <div className='vertical_svg_first'>
                      <div dangerouslySetInnerHTML={{ __html: bottomSvg }} />
                    </div>
                  </div>

                </> :
                  <div className='transverse_svg'>
                    <div className='transverse_svg_first'>
                      <div dangerouslySetInnerHTML={{ __html: topSvg }} />
                    </div>
                    <div className='transverse_svg_first'>
                      <div dangerouslySetInnerHTML={{ __html: bottomSvg }} />
                    </div>
                  </div>
                : ""
              }
              {formShow ? "" : <div className='update_status'>
                <div className='progress'>
                  <div className='progress_inner' style={{ width: progress + '%' }}>
                    <div className='progress_s'><p className='progress_f' style={{ width: progress + '%' }}></p></div>
                  </div>
                </div>
                <Checkbox className='is_checked' />
              </div>} */}
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
