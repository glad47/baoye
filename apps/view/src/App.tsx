// root component
import React from 'react'
import {hot} from 'react-hot-loader/root'

import {useAppState, createBoard, createBoardFromUrl} from './state'
import BoardDisplay from './BoardDisplay'
import FileList from './FileList'
import BoardList from './BoardList'
import Nav from './Nav'
import LoadFiles from './LoadFiles'
import ErrorToast from './ErrorToast'
import {preventDefault} from './events'
import {Main} from './ui'
import {FileEvent} from './types'
import { Layout } from 'antd'
import PcbSpecification from './SpecificationInput/PcbSpecification'
import SpecificationHead from './SpecificationInput/SpecificationHead'
import FormDemo from './SpecificationInput/FormDemo'
import CustomizedForm from './SpecificationInput/CustomizedForm'
import { Store } from 'antd/lib/form/interface'
import PcbSpecialForm from './SpecificationInput/PcbSpecialForm'
import PcbStandardFrom from './SpecificationInput/PcbStandardForm'
import PcbSizeForm from './SpecificationInput/PcbSizeForm'
import BuildTimeForm from './SpecificationInput/BuildTimeForm'
import CastCalculation from './SpecificationInput/CostCalculation'
import ShoppingCast from './SpecificationInput/ShoppingCast'
import ShoppingTotal from './SpecificationInput/ShoppingTotal'

import { WalletFilled, SlidersFilled, SwitcherFilled,ReconciliationFilled } from '@ant-design/icons';

function App(): JSX.Element {
  const {dispatch} = useAppState()

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

  const onchange = (): void =>{
    console.log('ssssssssssssss');
  } 
  return (
    <Main>
      {/* <FileList /> */}
      {/* <BoardList /> */}
     
      <Layout>
        <Header>
          头    
        </Header>
        <Content>
            
            {/* 左边栏 */}
            <div className="pcb-nav">
              <ul>
                <li className="cur"><div><WalletFilled /></div></li>
                <li><div><SlidersFilled /></div></li>
                <li><div><SwitcherFilled /></div></li>
                <li><div><ReconciliationFilled /></div></li>
              </ul>
            </div>
            <div className="pcb-min">
              <Nav/>
              <div className="pcb-file">
                <BoardDisplay />
                <LoadFiles handleFiles={handleFiles}/>
                <ErrorToast />
              </div>
              <PcbSizeForm/>
            </div>

            <div className="pcb-spec">
              <SpecificationHead icon={"123"} title="PCBSpecification"/>
              <PcbSpecification onChange={onchange}/>
            </div>

            <div className="pcb-sidebar">

              <div className="pcb-build-time">
                <BuildTimeForm />
              </div>

              <div className="pcb-fee">
                <CastCalculation />
              </div>

              <div className="pcb-cast">
                <ShoppingCast />
              </div>

              <div className="pcb-total">
                <ShoppingTotal />
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
