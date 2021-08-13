import React from 'react';
import {useAppState} from "../../state";
const failedImg = require(`../../images/file_timeout.png`);
const fileSucM23 = require(`../../images/file_sucM23.png`);

export default () => {
    const {quoteMode} = useAppState();
    return (
        <div className="FileFailed">
            <div>
                <img src={quoteMode === 0 ? failedImg : fileSucM23} alt=""/>
                <span>
                    {
                        quoteMode === 0 ?
                        <>
                            Your file has been uploaded, but its format cannot be identified<br />
                            Please input the board's parameters to get a quote</>
                        : 'Your file has been uploaded,Please input the parameters to get a quote.'
                    }
                </span>
            </div>
        </div>
    )
}