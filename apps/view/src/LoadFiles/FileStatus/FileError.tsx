import React from 'react';
import FileInput from "../FileInput";
const errImg = require('../../images/quate_icon31.png')

export type FileErrorProps = {
    // handleFiles: (event: FileEvent) => void
    // handleUrl?: (url: string) => void
    // progress: any,
    // loginReady: any,
    handleFilesRef: any
}

export default (props: FileErrorProps) => {
    const {handleFilesRef} = props;
    return (
        <div className="file-error">
            <div>
                <img src={errImg} alt=""/>
                <span className="txt">Upload failed, you can click the button below to try again</span>
                <FileInput handleFiles={handleFilesRef?.handleFiles} loginState={true} loginReady={true}>
                    <span className="upload-btn gerber">Upload Again</span>
                </FileInput>
            </div>
        </div>
    )
}