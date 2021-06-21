import React from 'react';
const initImg = require(`../../images/quate_icon2.png`);


export default () => {
    return (
        <div className="file-init">
            <div>
                <img src={initImg} alt=""/>
                <span>Click here to upload your Gerber file.</span>
                <label>ZIP/RAR &gt;2M </label>
                <span className="upload-btn gerber">Browse Files</span>
            </div>
        </div>
    )
}