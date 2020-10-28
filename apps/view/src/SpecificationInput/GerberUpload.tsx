import React, { useState } from "react";
import { useAppState, backfillPcbData, showDefault, backToUpload,changeColor, createBoard } from "../state";
import LoadFiles from "../LoadFiles";
import { FileEvent } from "../types";
import Axios from "axios";
import { preventDefault } from "../events";
import { ajaxFileUpload, baseUrl } from "./AjaxService";
import { message,Checkbox } from "antd";

interface GerberUploadProps {
    loginName: any
}

//gerber上传组件
const GerberUpload: React.FC<GerberUploadProps> = (props) => {
    const { dispatch } = useAppState();
    const [progress, changeProgress] = useState(0)
    const [delay,setDelay]=useState(false)
    const handleFiles = (event: FileEvent): void => {
        // if (props.loginName == null) {
        //     message.error('Please login first！！')
        //     return
        // }
        const files =
            'dataTransfer' in event
                ? Array.from(event.dataTransfer.files)
                : Array.from(event.target.files || [])

        if ('value' in event.target) event.target.value = ''
        preventDefault(event)
        if (files.length > 0) {
            //创建板
            dispatch(createBoard(files,false));
            const fileName = files[0].name || ''
            const suffix=fileName.substring(fileName.lastIndexOf('.')+1)
            let isRar=(suffix.toLocaleLowerCase()=='zip' || suffix.toLocaleLowerCase()=='rar') ? true :false
            if (!isRar) {
                message.warning('only accept zip or rar file.')
                return
            }
            const fd = new FormData()
            fd.append('uploads', files[0]);
            Axios.all([
               ajaxFileUpload(files),
               Axios.post(baseUrl+'api/uploads/', fd, {
                onUploadProgress: (ProgressEvent) => {
                    if (ProgressEvent.lengthComputable) {
                        let complete =
                            (((ProgressEvent.loaded / ProgressEvent.total) * 100) | 0);
                        changeProgress(complete)
                        if (complete >= 100) {
                            changeProgress(complete)
                        }
                    }
                },
                headers: { 'Content-Type': 'multipart/form-data' },
                timeout:60000
            })])
            .then(res => {
                console.log(res);
                //todo 数据回填 逻辑判断下
                const [{data:{code,result:{url}}},{data:{success,result}}] = res;
                if (code === "0") {
                    let r: any = {};
                    if(success){
                        // message.info('File upload and analytical data successful！！');
                        r = {...result,fileName:fileName,uploadPath:url,showDefaultImg:true};
                    }else{
                        // message.warning('文件上传成功，但读取资料失败！！');
                        r = {showDefaultImg:false,fileName:fileName,uploadPath:url};
                        // dispatch(changeColor(false));
                    }
                    dispatch(backfillPcbData(r,success));
                } else {
                   message.error('File upload failed, please contact the site administrator!!');
                }
            }).catch(e=>{
                setDelay(true)
                dispatch(backToUpload(false))
            })
        }
    }
    const setItem=(key:string,options:string)=>{
        sessionStorage.setItem(key,options)
    }
    if (true) {
        return (
           
            <>
                <div className="pcb-file">
                    <LoadFiles handleFiles={handleFiles} progress={{progress,delay}}></LoadFiles>
                </div>
                {progress>0 ?<div className='update_status'>
                    <div className='progress'>
                        <div className='progress_inner' style={{ width: progress + '%' }}>
                            <div className='progress_s'><p className='progress_f' style={{ width: progress + '%' }}></p></div>
                        </div>
                    </div>
                    <div className='show_progress_speed'><Checkbox checked={progress==100 ? true :false}/></div>
                </div>:""}
            </>
        )
    } else {
        return null
    }
}

export default GerberUpload