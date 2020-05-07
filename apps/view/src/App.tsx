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
import { Layout  } from 'antd'
import PcbSpecification from './SpecificationInput/PcbSpecification'
import SpecificationHead from './SpecificationInput/SpecificationHead'
import FormDemo from './SpecificationInput/FormDemo'
import CustomizedForm from './SpecificationInput/CustomizedForm'
import { Store } from 'antd/lib/form/interface'
import PcbSpecialForm from './SpecificationInput/PcbSpecialForm'
import PcbStandardFrom from './SpecificationInput/PcbStandardForm'
import PcbSizeForm from './SpecificationInput/PcbSizeForm'

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

  const onchange = (v: Store): void =>{
    console.log(v);
  } 
  return (
    <Main>
      {/* <FileList /> */}
      {/* <BoardList /> */}
     
      <Layout>
        <Header>
          头    
        </Header>
        <Content style={{height:'500px'}}>
           {/* <PcbSpecification onChange={onchange}/> */}
           <PcbSizeForm/>
        </Content>
        <Footer>
          尾
        </Footer>
      </Layout>
      {/* <SpecificationHead icon={"sdfasdf"} title="PCBSpecification"/> */}
     
      {/* <PcbSpecialForm onChange={onchange}/> */}
      {/* <FormDemo /> */}
      {/* <BoardDisplay />
      <Nav/>
      <LoadFiles handleFiles={handleFiles}/>
      <ErrorToast /> */}
    </Main>
    
  )
}

export default hot(App)
