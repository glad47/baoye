import React, { useState, useEffect } from 'react'

import { useAppState } from '../state'
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
  progress: number
}

export default function LoadFiles(props: LoadFilesProps): JSX.Element {
  const { mode, loading, isBackToUpload, svg } = useAppState()
  const [timeOut,setTime]=useState(true)
  const successful_update = props.progress === 100 ? require(`../images/successful_updata.gif`) : require(`../images/update_loader.gif`)
  const successful_word = props.progress === 100 ? 'Successful geber file upload ！ Analyzing data, please wait and then check.' : 'Upload your gerber file, only accept zip or rar file.'
  useEffect(() => {
    var timer:any
    let isTimeOut=new Promise(function(resolve,reject){
      timer=setTimeout(() => {
        if(svg!=null){
          resolve(true)
        }else{
          reject(false)
        }
      }, 60000);
    }).then(function(data){
      setTime(true)
    }).catch(function(data){
      setTime(false)
    })
    return () => {
      if(isBackToUpload){
        clearTimeout(timer)
      }
    }
  }, [])
  const wordTitle=timeOut ? successful_word : 'It takes a little time for analyzing the file. You can also input by your own to get a quote.'
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
          <FileInput handleFiles={props.handleFiles}>
            <div className='img_show'><img src={successful_update} /></div>
            <p className='update_font'>{wordTitle}</p>

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
