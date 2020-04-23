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
  return (
    <Main>
    
      {/* <FileList /> */}
      {/* <BoardList /> */}
      {/* <Layout>
        <Header>
          头    
        </Header>
        <Content>
          <BoardDisplay />
          <Nav/>
          <LoadFiles handleFiles={handleFiles}/>
          <ErrorToast />
        </Content>
        <Footer>
          尾
        </Footer>
      </Layout> */}
      {/* <SpecificationHead icon={"sdfasdf"} title="PCBSpecification"/> */}
      {/* <PcbSpecification /> */}
      <FormDemo />
    </Main>
    
  )
}

export default hot(App)
