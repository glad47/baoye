import React, {useEffect, useImperativeHandle, useState} from 'react';
const checkIcon = require('../images/check-circle.png');
const closeIcon = require('../images/close-circle.png');
const zipIcon = require('../images/zip_icon.png');

export default (props: any) => {
    const {cRef} = props;
    const [process, setProcess] = useState<number>(0);
    const [fileName, setFileName] = useState<any>(null);
    const [fileSize, setFileSize] = useState<any>(null);

    useImperativeHandle(cRef, () => ({
        handleProgress: (fileName: any, fileSize: any,count: any) => {
            setProcess(count);
            setFileName(fileName);
            setFileSize(parseInt(String(Number(fileSize) / 1024)));
        }
    }))

    useEffect(() => {
        let count: number = 0;
        // console.log('aa', aa)
        // setInterval(() => {
        //     if (process < 100) {
        //         count ++;
        //         setProcess(count);
        //         console.log('count', count)
        //     }
        // }, 1000);
    }, [])
    return (
        process > 0 ?
        <div className="GerberProgress">
            <div className="container" style={{width: process + '%'}}>
                <div className="lef-img">
                    <img src={zipIcon} alt=""/>
                    <div className="infos">
                        <span className="file-name">
                            {fileName}
                        </span>
                        <span className="file-size">
                            {fileSize}kb
                        </span>
                    </div>
                </div>
                {
                    process === 100 &&
                    <div className="rig-icon">
                        <img src={checkIcon} alt=""/>
                    </div>
                }
            </div>
        </div> : <div></div>
    )
}