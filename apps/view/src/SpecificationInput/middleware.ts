/*
 * @Descripttion: 计算价格
 * @version: 1.0
 * @Author: 
 * @Date: 2021-07-17 11:10:06
 * @LastEditors: ho huang
 * @LastEditTime: 2021-09-04 19:35:27
 */
import * as State from '../state';
import {countSubtotal, countBuildTime, reduxChangeAddQuoteStatus, reduxSetOrdersBuyNow} from '../state';
import { ajaxBuildTime, ajaxSubtotal, ajaxAddQuote, ajaxAssemblyCast } from './AjaxService';
import Axios from 'axios';
import { message } from 'antd';

interface call_buy {
    pcbQuoteInfo: object | null
    stencilQuoteInfo: object | null
    assemblyQuoteInfo: object | null
}

/**
 * 添加购物车 字段验证
 * @param obj
 */
const verifyAddQuote = (obj: any) => {
    // 需要验证的字段
    const verifyFields = ['fileName', 'fileUploadPtah'];
    let flag = true;
    for (const key in obj) {
        if (verifyFields.indexOf(key) > -1 && !obj[key]) {
            flag = false;
            if (key === 'fileName') {
                message.error("please upload gerber!");
            }
            break;
        }
    }
    return flag;
}

/** 计算报价中间件 */
export function countQuoteMiddleware(): State.Middleware {
    return store => next => action =>{
        const result = next(action);
        // console.log(store.getState());
        const {dispatch} = store;
        const state = store.getState();
        switch(action.type){
            case State.CHANGE_SPECIAL_FIELD:
            case State.CHANGE_STANDARD_FIELD:
            case State.CHANGE_SIZE_FIELD: {
                // console.log("计算尺寸",state);
                const { pcbSizeField: {boardType,quantity,singleSize:{sizeX,sizeY},panelSize:{size:psx,siezY:psy}}, pcbStandardField:{layer}} = state;
                // console.log(sizeX);
                // console.log(sizeY);
                // console.log(quantity);
                if(!(sizeX && sizeY && quantity)) break;
                let areasq = Number(sizeX) * Number(sizeY) * Number(quantity)/1000000
                let quantityPcs;
                if(boardType === 'Panel'){
                    quantityPcs = Number(psx) * Number(psy) * Number(quantity)
                }
                // console.log('计算出面积',areasq);
                let layerNum = Number(String(layer).substr(0,1));
                // let fetchBuildTime = new Promise(ajaxBuildTime);
                const {
                    pcbSizeField,
                    pcbSpecialField,
                    pcbStandardField,
                    subtotal
                } = state;
                Axios.all([
                    ajaxBuildTime({areaSq: areasq, layerNum:layerNum}),
                    ajaxSubtotal({
                        pcbSizeField:pcbSizeField,
                        pcbSpecialField:pcbSpecialField,
                        pcbStandardField:pcbStandardField,
                    })
                ]).then((v)=>{
                    // console.log(v);
                    const [{data:{data,code}},{data:{data:d2,code:c2}}] = v;
                    if(code === 0){
                        // console.log(data);
                        dispatch(countBuildTime(data))
                    }
                    if(c2 === 0){
                        // console.log(d2);
                        const {newTestQuoteTOUSD,projectQuoteToUSD,totalBoardQuoteToUSD,totalQuoteWeight} = d2;
                        dispatch(countSubtotal({
                            ...subtotal,
                            boardFee:totalBoardQuoteToUSD,
                            engineeringFee:projectQuoteToUSD,
                            testFee:newTestQuoteTOUSD,
                            totalWeight:totalQuoteWeight,
                            buildTime:data[0].dayNumber,
                        }))
                    }
                })
                break;

            }
            case State.ADD_QUOTE: {
                const {
                    pcbSizeField,
                    pcbSpecialField,
                    pcbStandardField,
                    subtotal,
                    stencilField,
                    assemblyField,
                    fileName,
                    fileUploadPtah
                } = state;
                const fields = {
                    pcbSizeField,
                    pcbSpecialField,
                    pcbStandardField,
                    subtotal,
                    stencilField,
                    assemblyField,
                    fileName,
                    fileUploadPtah
                }
                console.log('verifyAddQuote(fields)======>', verifyAddQuote(fields))
                if (verifyAddQuote(fields)) {
                    Axios.all([
                        ajaxAddQuote({
                            pcbSizeField:pcbSizeField,
                            pcbSpecialField:pcbSpecialField,
                            pcbStandardField:pcbStandardField,
                            subtotal:subtotal,
                            stencilField: stencilField,
                            assemblyField: assemblyField,
                            fileName: fileName,
                            fileUploadPtah: fileUploadPtah
                        })
                    ]).then((rep)=>{
                        const [{data:{success,code, result}}] = rep;
                        if(success){
                            let buyData;
                            for(const key in result)  {
                                if (result[key]) {
                                    buyData = result[key];
                                    break;
                                }
                            }
                            dispatch(reduxSetOrdersBuyNow(buyData))
                            message.success("Add Quote Success!!");
                            dispatch(reduxChangeAddQuoteStatus(true));
                            setTimeout(() => {
                                dispatch(reduxChangeAddQuoteStatus(false));
                            }, 10*1000)
                            // setTimeout(() => {
                            //     location.reload();
                            // }, 1000);
                        }else{
                            if (code === "403") {
                                location.href = 'user/login';
                            }else{
                                dispatch(reduxChangeAddQuoteStatus(false));
                                // message.error("Add Quote Failure !!");
                            }
                        }
                    })
                }
                break;
            }
            case State.CHANGE_ASSEMBLY_FIELD: {
                // console.log('计算贴片报价',state);
                const {assemblyField,subtotal} = state;
                Axios.all([
                    ajaxAssemblyCast(assemblyField)
                ]).then(v =>{
                    // console.log('vvv',v);
                    const [{data:{data:{totalAssemblyQuote}}}] = v;
                    dispatch(countSubtotal({...subtotal,assemblyFee: totalAssemblyQuote}));
                })
            }
        }
        return result;
    }
}