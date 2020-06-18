import React, { useState } from "react";
import { Fade } from "../ui";
import { useAppState, backfillPcbData } from "../state";
import LoadFiles from "../LoadFiles";
import { FileEvent } from "../types";
import Axios from "axios";
import { preventDefault } from "../events";
import { gerberUploadUrl } from "./AjaxService";
import { message } from "antd";

interface GerberUploadProps {

}

//gerber上传组件
const GerberUpload: React.FC<GerberUploadProps> = (props) =>{
    const {loading, dispatch} = useAppState();
    const [progress, changeProgress] = useState(0)
    const handleFiles = (event: FileEvent): void=>{
        const files =
          'dataTransfer' in event
            ? Array.from(event.dataTransfer.files)
            : Array.from(event.target.files || [])
    
        if ('value' in event.target) event.target.value = ''
        preventDefault(event)
        if (files.length > 0) {
            const fileName = files[0].name || ''
            const fd = new FormData()
            fd.append('uploads', files[0])
            Axios.post(gerberUploadUrl+'api/uploads',fd,{
                onUploadProgress: (ProgressEvent) =>{
                    let percentCompleted = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
                    changeProgress(percentCompleted)
                },
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then(res =>{
                console.log(res.data)
                //todo 数据回填
                if(res.data.success){
                    message.info('文件上传成功，正在解析资料！！');
                    console.log(res);
                    let result = res.data.result;
                    result.fileName = fileName;
                    dispatch(backfillPcbData(result));   
                }else{
                    message.warning('文件上传成功，但读取资料失败！！');
                }
            })
        }
    }
    return (
        <>
        <Fade in = {!loading}>
            <>
            <div className="pcb-file">
            <LoadFiles handleFiles={handleFiles}></LoadFiles>
            </div>            
            <div className='update_status'>
                <div className='progress'>
                    <div className='progress_inner' style={{ width: progress + '%' }}>
                        <div className='progress_s'><p className='progress_f' style={{ width: progress + '%' }}></p></div>
                    </div>
                </div>
                {/* <Checkbox className='is_checked' /> */}
            </div>
            </>
        </Fade>
        </>
    )
}

export default GerberUpload