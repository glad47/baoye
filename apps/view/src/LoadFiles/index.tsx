import React from 'react'

import {useAppState} from '../state'
import {Icon, Fade} from '../ui'
import {FileEvent} from '../types'
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
}

export default function LoadFiles(props: LoadFilesProps): JSX.Element {
  const {mode, loading,isBackToUpload} = useAppState()

  return (
    <>
      <Fade in={loading}>
        <Icon
          className={`${WRAPPER_STYLE} f1 brand`}
          name="spinner"
          faProps={{pulse: true}}
        />
      </Fade>
      <Fade in={!mode}>
        <div className={WRAPPER_STYLE}>
          <FileInput handleFiles={props.handleFiles}>
            <div className='img_show'><img  src={require('../images/upload_now.gif')}/></div>
            <p className='update_font'>Only accept zip or rar file</p>
            
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
