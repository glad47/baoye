import React from 'react';
const failedImg = require(`../../images/file_fail.png`);
export default () => {
    return (
        <div className="FileFailed">
            <div>
                <img src={failedImg} alt=""/>
                <span>
                    Your file format is wrong，You can send an email to us and get a quote in two hours
                </span>
                <div className="btn-gp">
                    <button className="upload-btn gerber">Upload Again</button>
                        or
                    <button className="upload-btn gerber">Email Quote</button>
                </div>
            </div>
        </div>
    )
}