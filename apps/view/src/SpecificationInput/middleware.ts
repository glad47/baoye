import * as State from '../state';
import { countSubtotal, countBuildTime } from '../state';
import { ajaxBuildTime, ajaxSubtotal, ajaxAddQuote } from './AjaxService';
import Axios from 'axios';

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
               
                console.log("计算尺寸",state);
                const { pcbSizeField: {boardType,quantity,singleSize:{sizeX,sizeY},panelSize:{size:psx,siezY:psy}}, pcbStandardField:{layer}} = state;
                console.log(sizeX);
                console.log(sizeY);
                console.log(quantity);
                if(!(sizeX && sizeY && quantity)) break;
                let areasq = Number(sizeX) * Number(sizeY) * Number(quantity)/1000000
                let quantityPcs;
                if(boardType === 'Panel'){
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
                        const {newTestQuoteTOUSD,projectQuoteToUSD,totalBoardQuoteToUSD,totalQuoteWeight} = d2;
                        dispatch(countSubtotal({boardFee:totalBoardQuoteToUSD,engineeringFee:projectQuoteToUSD,testFee:newTestQuoteTOUSD,totalWeight:totalQuoteWeight,urgentFee:null,shippingFee:null}))
                    }
                })
                break;

            }
            case State.ADD_QUOTE: {
                console.log('添加报价',state);
                const {pcbSizeField,pcbSpecialField,pcbStandardField,subtotal} = state;
                Axios.all([
                    ajaxAddQuote({pcbSizeField:pcbSizeField,pcbSpecialField:pcbSpecialField,pcbStandardField:pcbStandardField,subtotal:subtotal})
                ])
                break;
            }
        }
        return result;
    }
} 