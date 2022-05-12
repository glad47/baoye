/*
 * @Descripttion:gerber上传
 * @version: 1.0
 * @Author: 
 * @Date: 2021-08-14 10:36:12
 * @LastEditors: aziz
 * @LastEditTime: 2022-05-11 09:41:41
 */
import React, {useState, useEffect, useImperativeHandle} from "react";
import {
    useAppState,
    createBoard,
    backfillUploadPathData,
    backfillPcbData,
    backToUpload,
    backfillSvgData,
    reduxUploadGerber, BACKFILL_SVG_DATA, REDUX_SET_isBackToUpload, saveUploadGerberFileFormData, changeSizeField
} from "../state";
import LoadFiles from "../LoadFiles";
import { FileEvent } from "../types";
import Axios from "axios";
import { preventDefault } from "../events";
import { sysUrl1 } from "./AjaxService";
import { message,Checkbox } from "antd";
import Cookies from 'js-cookie';
import GerberShow from "./GerberShow";
import {DOM} from "@fortawesome/fontawesome-svg-core";
import FileError from "../LoadFiles/FileStatus/FileError";

interface GerberUploadProps {
    loginName: any,
    setLoginMessage: any
    cRef: any
    progressCallBack: Function
}

//gerber上传组件
const GerberUpload: React.FC<GerberUploadProps> = (props) => {
    const { dispatch,subtotal:{boardFee,stencilFee,assemblyFee},quoteMode, isBackToUpload, uploadGerber } = useAppState();
    const [progress, changeProgress] = useState(0)
    const [delay,setDelay]=useState(false)
    const [loginState,setLoginState]=useState(false)
    const [fileName, setFileName] = useState<any>(null);
    const [fileSize, setFileSize] = useState<any>(null);

    const initState = () => {
        changeProgress(0);
    }

    useEffect(() => {
        if (props.progressCallBack) {
            props.progressCallBack(fileName, fileSize, progress);
        }
    }, [progress])

    useEffect(()=>{
        if(props.loginName==null){
            setLoginState(false)
        }else{
            setLoginState(true)
        }
    },[props.loginName])

    const loginReady=(e:any)=>{
        if(e){
            props.setLoginMessage(true)
        }
    }
    const handleFiles = (event: FileEvent): void => {
        // if (props.loginName == null) {
        //     message.error('Please login first！！')
        //     props.setLoginMessage(true)
        //     return
        // }
        dispatch(REDUX_SET_isBackToUpload(true))
        const files =
            'dataTransfer' in event
                ? Array.from(event.dataTransfer.files)
                : Array.from(event.target.files || [])
        const token = Cookies.get('token');

        // console.log('token',token);

        if ('value' in event.target) event.target.value = ''
        preventDefault(event)
        if (files.length > 0) {
            //创建板 2020年12月31 15:07:28 先取消。使用接口返回的svg
            // dispatch(createBoard(files,false));
            const fileName = files[0].name || '';
            setFileName(fileName);
            setFileSize(files[0].size);
            const suffix=fileName.substring(fileName.lastIndexOf('.')+1)
            let isRar=(suffix.toLocaleLowerCase()=='zip' || suffix.toLocaleLowerCase()=='rar') ? true :false
            if (!isRar) {
                message.warning('only accept zip or rar file.');
                dispatch(REDUX_SET_isBackToUpload(false))
                dispatch(reduxUploadGerber({status: 'err'}));
                return
            }
            //上传资料拆两步分开, 上传资料
            const fromData = new FormData();
            fromData.append('file',files[0]);
            const fd = new FormData()
            fd.append('uploads', files[0]);
            dispatch(reduxUploadGerber({process: 1, status: 'init'}));
            changeProgress(1);
            dispatch(saveUploadGerberFileFormData(files[0]));
            Axios.post(sysUrl1+'parsegerber',fd,{
                headers: { 'Content-Type': 'multipart/form-data' },
                timeout:60000,
                onUploadProgress: (ProgressEvent) => {
                    if (ProgressEvent.lengthComputable) {
                        let complete =
                            (((ProgressEvent.loaded / ProgressEvent.total) * 100) | 0);
                        changeProgress(complete)
                        if (complete >= 100) {
                            changeProgress(complete)
                        }
                    }
                }
            }).then(res=>{
                // console.log(res);
                //解析gerber资料
                let {data:{success,result}} = res, r: any = {};
                if(success){
                    r = {...result,showDefaultImg:true};
                }else{
                    r = {showDefaultImg:false}; 
                }
                //没有报价时回填数据，否则显示svg
                if(quoteMode === 0 && boardFee === 0){
                    //回填解析数据
                    dispatch(backfillPcbData(r,success))
                }else if(quoteMode === 1 && stencilFee === 0){
                    dispatch(backfillPcbData(r,success))
                }else if(quoteMode === 2 && assemblyFee === 0){
                    dispatch(backfillPcbData(r,success))
                }else{
                    dispatch(backfillSvgData(r))
                }
                // 解析后回调
                handleSuccessCall();
            }).catch(e=>{
                if (quoteMode === 1 || quoteMode === 2) {
                    // dispatch(backfillPcbData(r,success))
                }
                // console.log('上传文件出错！！');
                setDelay(true)
                dispatch(backToUpload(false))
                // dispatch(reduxUploadGerber({status: 'fail'}));
                dispatch(reduxUploadGerber({status: 'timeout'}));
            })


            // Axios.all([
            //    ajaxFileUpload(files),
            //    Axios.post(baseUrl+'parsegerber', fd, {
            //     onUploadProgress: (ProgressEvent) => {
            //         if (ProgressEvent.lengthComputable) {
            //             let complete =
            //                 (((ProgressEvent.loaded / ProgressEvent.total) * 100) | 0);
            //             changeProgress(complete)
            //             if (complete >= 100) {
            //                 changeProgress(complete)
            //             }
            //         }
            //     },
            //     headers: { 'Content-Type': 'multipart/form-data' },
            //     timeout:60000
            // })]).then(Axios.spread((r1, r2) =>{
            //     console.log(r1);
            //     console.log(r2);
            // }))
            // .then(res => {
            //     console.log(res);
            //     //todo 数据回填 逻辑判断下
            //     let [{data:{code,result:{url}}},{data:{success,result}}] = res;
            //     if (code === "0") {
            //         let r: any = {};
            //         if(success){
            //             // message.info('File upload and analytical data successful！！');
            //             r = {...result,fileName:fileName,uploadPath:url,showDefaultImg:true};
            //         }else{
            //             // message.warning('文件上传成功，但读取资料失败！！');
            //             r = {showDefaultImg:false,fileName:fileName,uploadPath:url};
            //             // dispatch(changeColor(false));
            //         }
            //         //2010年12 31日19:14:51 修改如果为0不计算
            //         // if (boardFee === 0 || stencilFee === 0) {
            //         //     success = false;
            //         // }
            //         dispatch(backfillPcbData(r,success));
            //         props.isShowLoad(false)
            //     } else {
            //        message.error('File upload failed, please contact the site administrator!!');
            //     }
            // })
            // .catch(e=>{
            //     console.log('上传文件出错！！');
            //     setDelay(true)
            //     dispatch(backToUpload(false))
            // })
        }
    }

    const handleSuccessCall = ():void => {
        // 传一个空对象，再次触发报价逻辑
        dispatch(changeSizeField({}))
        const hDM: any = document.getElementById('specificationHeadDesc');
        const bDM: any = document.getElementById('pcbSpec');
        hDM.style.color = 'red';
        hDM.style.border = 'solid 1px red';
        bDM.style.boxShadow = '0px 7px 21px 0px #ff00005c';
        setTimeout(() => {
            hDM.style.color = '#666666';
            bDM.style.boxShadow = '0 7px 21px 0 rgb(172 189 253 / 77%)';
            hDM.style.border = 'unset';
        }, 15*1000)
    }

    const setItem=(key:string,options:string)=>{
        sessionStorage.setItem(key,options)
    }

    useImperativeHandle(props.cRef, () => ({
        handleFiles(event: FileEvent) {
            handleFiles(event)
        },
        getStateProcess() {
            return progress;
        },
        initGerberUploadState() {
            initState();
        }
    }));
    return (
        isBackToUpload ?
            <>
                <div className="pcb-file" id="pcbFile">
                    <LoadFiles handleFiles={handleFiles} progress={{progress,delay,loginState}} loginReady={loginReady}></LoadFiles>
                </div>
                {/*{progress>0 ?<div className='update_status'>*/}
                {/*    <div className='progress'>*/}
                {/*        <div className='progress_inner' style={{ width: progress + '%' }}>*/}
                {/*            <div className='progress_s'><p className='progress_f' style={{ width: progress + '%' }}></p></div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className='show_progress_speed'><Checkbox checked={progress==100 ? true :false}/></div>*/}
                {/*</div>:""}*/}
                {/* <UserLogin/> */}
            </>
            : <GerberShow handleFilesRef={handleFiles}/>
        // : (uploadGerber.status === 'err' ? <FileError handleFilesRef={handleFiles}/> :<GerberShow handleFilesRef={handleFiles}/>)
    )

}

export default GerberUpload