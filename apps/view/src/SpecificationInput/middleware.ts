import * as State from '../state';
import { countSubtotal, countBuildTime } from '../state';
import { stat } from 'fs';
import { ajaxBuildTime, ajaxSubtotal } from './AjaxService';
import Axios from 'axios';
import { identify } from 'mixpanel-browser';

/** 计算报价中间件 */
export function countQuoteMiddleware(): State.Middleware {
    return store => next => action =>{
        const result = next(action);
        // console.log(store.getState());
        const {dispatch} = store;

        switch(action.type){
            case State.CHANGE_SPECIAL_FIELD: {
                const state = store.getState();
                //发送请求计算报价
                if(state.pcbSpecialField && state.pcbStandardField){
                     const modata = []   
                }
                break;
            }
            case State.CHANGE_STANDARD_FIELD: {
               break; 
            }
            case State.CHANGE_SIZE_FIELD: {
                // todo 获取pcb板工期
                // const mockData = {boardFee:100,engineeringFee:1000,testFee:1000}
                // dispatch(countSubtotal(mockData))
                const state = store.getState();
                const { pcbSizeField: {boardType}, pcbStandardField:{layer}} = state;
                console.log("计算尺寸",state);
                let areasq;
                let quantityPcs;
                if(boardType === 'Single'){
                    const { pcbSizeField: {quantity,singleSize:{sizeX,sizeY}} } = state
                    areasq = Number(sizeX) * Number(sizeY) * Number(quantity)/1000000
                }else{
                    const {pcbSizeField:{quantity,singleSize:{sizeX,sizeY},panelSize:{size:psx,siezY:psy}}} = state
                    areasq = Number(sizeX) * Number(sizeY) * Number(quantity)/ 1000000
                    quantityPcs = Number(psx) * Number(psy) * Number(quantity)
                }
                console.log(areasq);
                let layerNum = Number(String(layer).substr(0,1));                
                // let fetchBuildTime = new Promise(ajaxBuildTime);
                const {pcbSizeField,pcbSpecialField,pcbStandardField} = state;
                Axios.all([
                    ajaxBuildTime({areaSq: areasq, layerNum:layerNum}),
                    ajaxSubtotal({pcbSizeField:pcbSizeField,pcbSpecialField:pcbSpecialField,pcbStandardField:pcbStandardField})
                ]).then((v)=>{
                    console.log(v);
                    const [{data:{data,code}},{data:{data:d2,code:c2}}] = v;
                    if(code === 0){
                        console.log(data);
                        dispatch(countBuildTime(data))
                    }
                    if(c2 === 0){
                        console.log(d2);
                        const {newTestQuoteTOUSD,projectQuoteToUSD,totalBoardQuoteToUSD} = d2;
                        dispatch(countSubtotal({boardFee:totalBoardQuoteToUSD,engineeringFee:projectQuoteToUSD,testFee:newTestQuoteTOUSD}))
                    }
                })

                break;

            }
            case State.FETCH_TRANSPORT_COST: {
                //todo 获取运输成本
                
                break;
            }
        }
        return result;
    }
} 