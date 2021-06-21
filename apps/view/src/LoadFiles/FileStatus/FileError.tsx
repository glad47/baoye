import React from 'react';
const errImg = require('../../images/quate_icon31.png')

export default () => {
    return (
        <div className="file-error">
            <div>
                <img src={errImg} alt=""/>
                <span className="txt">Upload failed, you can click the button below to try again</span>
                <span className="upload-btn gerber">Upload Again</span>
            </div>
        </div>
    )
}