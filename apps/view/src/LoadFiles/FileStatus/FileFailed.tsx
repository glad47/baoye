import React from 'react';
import FileInput from "../FileInput";
const failedImg = require(`../../images/file_fail.png`);

export type ppp = {
    handleFilesRef: any
}

export default (props: ppp) => {
    const {handleFilesRef} = props;
    const upAgain = (eve: any) => {
        handleFilesRef(eve);
    }
    return (
        <div className="FileFailed">
            <div>
                <img src={failedImg} alt=""/>
                <span>
                    Your file format is wrong，You can send an email to us and get a quote in two hours
                </span>
                <div className="btn-gp">
                    <FileInput handleFiles={upAgain} loginState={true} loginReady={true}>
                        <span className="upload-btn gerber">Upload Again</span>
                    </FileInput>
                        <span>or</span>
                    <button className="upload-btn gerber">Email Quote</button>
                </div>
            </div>
        </div>
    )
}