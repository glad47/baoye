import React, { useState, useEffect } from 'react'

import { useAppState, backToUpload } from '../state'
import { Icon, Fade } from '../ui'
import { FileEvent } from '../types'
import FileInput from './FileInput'
import UrlInput from './UrlInput'

const UPLOAD_MESSAGE = 'Upload your Gerber and drill files to render your board'
const UPLOAD_SUBMESSAGE = 'ZIP files work, too'
const URL_MESSAGE = 'or enter the URL of a ZIP archive'

const WRAPPER_STYLE = 'absolute absolute--center near-black tc'
const MESSAGE_STYLE = 'mt3 mb0 f4 lh-copy'
const SUBMESSAGE_STYLE = 'f5 fw3'

export type LoadFilesProps = {
  handleFiles: (event: FileEvent) => void
  handleUrl?: (url: string) => void
  progress: any,
  loginReady: any
}

export default function LoadFiles(props: LoadFilesProps): JSX.Element {
  const { mode, loading, fillData, dispatch } = useAppState()
  const { progress, delay } = props.progress
  const successful_update = progress === 100 ? require(`../images/successful_updata.gif`) : require(`../images/upload_now.gif`)
  const successful_word = progress === 100 ?
    'Successful Gerber file upload! The system is analyzing data. Please wait and check the specifications.'
    : `Click here to upload your Gerber file.<br/>Only <strong>ZIP</strong> or <strong>RAR</strong> file format.<br/>Please note that your RAR or ZIP file folder has no more than 2 levels.`
  const wordTitle = !delay ? successful_word : 'It takes a little time for analyzing the file. You can also input by your own to get a quote.'
  // dispatch(backToUpload(!delay))
  return (
    <>
      <Fade in={loading}>
        <Icon
          className={`${WRAPPER_STYLE} f1 brand`}
          name="spinner"
          faProps={{ pulse: true }}
        />
      </Fade>
      <Fade in={!mode}>
        <div className={WRAPPER_STYLE}>
          <FileInput handleFiles={props.handleFiles} loginState={props.progress.loginState} loginReady={props.loginReady}>
            <div className='img_show'><img src={successful_update} /></div>
            <div className='mobile-img-show'><img src={require('../images/uploads.png')} /></div>
            <p className='update_font' dangerouslySetInnerHTML={{ __html: wordTitle }}></p>

            {/* <p className={MESSAGE_STYLE}>
              {UPLOAD_MESSAGE}
              <br />
              <span className={SUBMESSAGE_STYLE}>({UPLOAD_SUBMESSAGE})</span>
            </p> */}
          </FileInput>
          {/* <UrlInput handleUrl={props.handleUrl}>{URL_MESSAGE}</UrlInput> */}
        </div>
      </Fade>
    </>
  )
}
