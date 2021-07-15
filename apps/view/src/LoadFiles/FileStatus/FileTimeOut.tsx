import React from 'react';
const failedImg = require(`../../images/file_timeout.png`);

export default () => {
    return (
        <div className="FileFailed">
            <div>
                <img src={failedImg} alt=""/>
                <span>
                    Your file has been uploaded, but its format cannot be identified<br />
                    Please input the board's parameters to get a quote
                </span>
            </div>
        </div>
    )
}