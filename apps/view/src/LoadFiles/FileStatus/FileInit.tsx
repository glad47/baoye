import React from 'react';
import {useAppState} from "../../state";
const initImg = require(`../../images/quate_icon2.png`);


export default () => {
    const {quoteMode} = useAppState();
    return (
        <div className="file-init">
            <div>
                <img src={initImg} alt=""/>
                {
                    quoteMode !== 2 ?
                        <>
                            <span>Click here to upload your Gerber file.</span>
                            <label>ZIP/RAR &lt;2M </label>
                        </>
                        :
                        <>
                            <span>Click here to upload your Gerber file or BOM file.</span>
                            <label>ZIP/ RAR / XLS&lt;2M </label>
                        </>
                }
                <span className="upload-btn gerber">Browse Files</span>
            </div>
        </div>
    )
}