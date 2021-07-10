import React, {useEffect, useImperativeHandle, useState} from 'react';
import {backToUpload, useAppState} from "../state";
const checkIcon = require('../images/check-circle.png');
const closeIcon = require('../images/close-circle.png');
const errIcon = require('../images/quate_icon33.png');
const zipIcon = require('../images/zip_icon.png');

export default (props: any) => {
    const {cRef, aginUpload} = props;
    const { fillData, dispatch, uploadGerber } = useAppState();
    const [process, setProcess] = useState<number>(0);
    const [fileName, setFileName] = useState<any>(null);
    const [fileSize, setFileSize] = useState<any>(null);

    useImperativeHandle(cRef, () => ({
        handleProgress: (fileName: any, fileSize: any,count: any) => {
            setProcess(count);
            setFileName(fileName);
            setFileSize(parseInt(String(Number(fileSize) / 1024)));
        }
    }));

    const handleCloseFile = () => {
        setProcess(0);
        if (aginUpload) {
            aginUpload();
        }
        dispatch(backToUpload(true))
    }

    return (
        process > 0 ?
        <div className="GerberProgress">
            <div className={`container ${uploadGerber.status === 'suc' && 'active'}`} style={{width: process + '%'}}>
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
                        {
                            uploadGerber.status && <img src={closeIcon} alt="" onClick={handleCloseFile}/>
                        }
                    </div>
                }
            </div>
        </div> : <></>
    )
}