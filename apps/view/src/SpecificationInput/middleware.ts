import * as State from '../state';
import { countSubtotal } from '../state';

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
                const mockData = {boardFee:100,engineeringFee:1000,testFee:1000}
                const rep =     
                dispatch(countSubtotal(mockData))
                break;
            }
        }
        return result;
    }
} 