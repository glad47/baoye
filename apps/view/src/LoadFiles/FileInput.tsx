import React from 'react'

import {HiddenInput, Icon} from '../ui'
import {FileEvent} from '../types'

export type FileInputProps = {
  children?: React.ReactNode
  handleFiles: (event: FileEvent) => unknown,
  loginState:boolean,
  loginReady:any
}

export default function FileInput(props: FileInputProps): JSX.Element {
  const {children, handleFiles,loginState} = props
  const readyLogin=()=>{
    props.loginReady(true)
  }
  return (
    <label className="db pv4 pointer">
      {loginState?<HiddenInput type="file" onChange={handleFiles} multiple />:<HiddenInput type="text" onClick={readyLogin} />}
      <Icon name="plus" className="dib f1 brand" />
      {children}
    </label>
  )
}
