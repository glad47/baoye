import React, {Ref, useEffect, useState} from 'react';
import FileInput from "../FileInput";
import {FileEvent} from "../../types";
import FileUpdating from "./FileUpdating";
import {useAppState} from "../../state";
const errImg = require('../../images/quate_icon31.png')

export type FileErrorProps = {
    // handleFiles: (event: FileEvent) => void
    // handleUrl?: (url: string) => void
    // progress: any,
    // loginReady: any,
    handleFilesRef: any
}

export default (props: FileErrorProps) => {
    const {uploadGerber} = useAppState();
    const {handleFilesRef} = props;
    useEffect(() => {
        console.log('uploadGerber.process', uploadGerber.progress)
    }, [uploadGerber])
    return (
        0 < uploadGerber.progress && uploadGerber.progress < 100 ? <FileUpdating />
            :
            <div className="file-error">
                <div>
                    <img src={errImg} alt=""/>
                    <span className="txt">Upload failed, you can click the button below to try again</span>
                    <FileInput handleFiles={handleFilesRef?.handleFiles} loginState={true} loginReady={props.loginReady}>
                        {/*<FileInput loginState={true} loginReady={props.loginReady}>*/}
                        <span className="upload-btn gerber">Upload Again</span>
                    </FileInput>
                </div>
            </div>
    )
}