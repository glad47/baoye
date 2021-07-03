import * as actionTypes from './actions'
import {INITIAL_STATE} from './context'
import {Action, State} from './types'
import PcbSizeForm from '../SpecificationInput/PcbSizeForm'
import { INITIAL_STANDARD } from '../SpecificationInput/PcbSpecification'
import {ORDER_SUMMARY_STATUS} from "./actions";
/** Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。 */
export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case actionTypes.APP_PREFERENCES: {
      return {...state, appPreferences: action.payload}
    }

    case actionTypes.CREATE_BOARD:
    case actionTypes.CREATE_BOARD_FROM_URL: {
      return {...state, loading: true}
    }

    case actionTypes.GET_BOARD:
    case actionTypes.DELETE_BOARD:
    case actionTypes.DELETE_ALL_BOARDS: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_BOARD: {
      const {id, update} = action.payload
      if (!state.board || state.board.id !== id) return state

      return {
        ...state,
        updating: true,
        board: {
          ...state.board,
          name: update.name || state.board.name,
        },
      }
    }

    case actionTypes.GET_BOARD_PACKAGE: {
      return {...state, downloading: true}
    }

    case actionTypes.SET_MODE: {
      return {...state, mode: action.payload}
    }

    case actionTypes.SET_FIELDMODE: {
      return {...state, fieldMode: action.payload}
    }

    case actionTypes.TOGGLE_VISIBILITY: {
      const {id, solo} = action.payload
      const {board} = state
      let layerVisibility = {
        ...state.layerVisibility,
        [id]: solo || !state.layerVisibility[id],
      }

      if (solo) {
        const layers = board ? board.layers : []
        const otherIds = layers.map(ly => ly.id).filter(lyId => lyId !== id)
        const nextVisibilty = otherIds.every(lyId => !layerVisibility[lyId])

        layerVisibility = otherIds.reduce(
          (result, id) => ({...result, [id]: nextVisibilty}),
          layerVisibility
        )
      }

      return {...state, layerVisibility}
    }

    case actionTypes.WORKER_INITIALIZED: {
      return {...state, savedBoards: action.payload}
    }

    case actionTypes.BOARD_RENDERED: {
      const {mode, layerVisibility: prevLayerVisibility} = state
      const board = action.payload
      const layerVisibility = board.layers.reduce((result, ly) => {
        const prevVisibility = prevLayerVisibility[ly.id]
        return {
          ...result,
          [ly.id]: prevVisibility != null ? prevVisibility : true,
        }
      }, {})

      return {
        ...state,
        board,
        layerVisibility,
        mode: mode || 'top',
        loading: false,
        updating: false,
      }
    }

    case actionTypes.BOARD_UPDATED: {
      const updatedBoard = action.payload
      const savedBoards = state.savedBoards.map(b =>
        b.id === updatedBoard.id ? updatedBoard : b
      )

      if (savedBoards.indexOf(updatedBoard) < 0) savedBoards.push(updatedBoard)

      return {...state, savedBoards}
    }

    case actionTypes.BOARD_DELETED: {
      const id = action.payload
      const savedBoards = state.savedBoards.filter(b => b.id !== id)
      let {board, mode} = state

      if (board && board.id === id) {
        board = null
        mode = null
      }

      return {...state, mode, board, savedBoards, loading: false}
    }

    case actionTypes.BOARD_PACKAGED: {
      return {...state, downloading: false}
    }

    case actionTypes.ALL_BOARDS_DELETED: {
      return INITIAL_STATE
    }

    case actionTypes.DISMISS_ERROR: {
      return {...state, error: null}
    }

    case actionTypes.WORKER_ERRORED: {
      const nextState = {...state, error: action.payload.error}

      switch (action.payload.request.type) {
        case actionTypes.CREATE_BOARD:
        case actionTypes.CREATE_BOARD_FROM_URL:
        case actionTypes.DELETE_BOARD:
        case actionTypes.DELETE_ALL_BOARDS:
          return {...nextState, loading: false}

        case actionTypes.UPDATE_BOARD:
          return {...nextState, updating: false}

        case actionTypes.GET_BOARD_PACKAGE:
          return {...nextState, downloading: false}
      }

      return nextState
    }

    case actionTypes.CHANGE_SPECIAL_FIELD: {
      return {...state, pcbSpecialField: action.payload}
    }

    case actionTypes.CHANGE_STANDARD_FIELD: {
      return {...state, pcbStandardField: action.payload}
    }

    case actionTypes.CHANGE_SIZE_FIELD: {
      return {...state, pcbSizeField: action.payload}
    }

    case actionTypes.COUNT_SUBTOTAL: {
      return {...state, subtotal: action.payload}
    }

    case actionTypes.PARSING_GERBER: {
      return {
        ...state, 
        pcbSizeField: {...state.pcbSizeField,singleSize:{sizeX: action.payload.width, sizeY: action.payload.height}},
        pcbStandardField: {...state.pcbStandardField,layer: action.payload.layerCount+'layer',quoteUploadPath: action.payload.quoteFilePath}
      }
    }
    case actionTypes.COUNT_BUILDTIME: {
      return {
        ...state,
        buildTimeItmes: action.payload
      }
    }
    case actionTypes.CHANGE_URGENTCOST: {
      return {
        ...state,
        subtotal: {...state.subtotal,urgentFee: action.payload.price,buildTime: action.payload.dayNumber}
      }
    }
    case actionTypes.CHANGE_TRANSPORT_COST: {
      return {
        ...state,
        subtotal: {...state.subtotal,shippingFee:action.payload}
      }
    }
    case actionTypes.CHANGE_QUOTE_MODE: {
      return{
        ...state,
        quoteMode: action.payload
      }
    }
    case actionTypes.CHANGE_STENCIL_FIELD: {
      //计算钢网总价
      const {quantity,detailed:{priceToUSD,weight}} = action.payload
      const {subtotal:{totalWeight}} = state
      const sq = Number((quantity*priceToUSD).toFixed(2));
      const w = Number((quantity*weight).toFixed(2)+totalWeight);
      return{
        ...state,
        stencilField: action.payload,
        subtotal: {...state.subtotal,stencilFee:sq,totalWeight:w}
      }
    }
    case actionTypes.BACKFILL_PCB_DATA: {
      // console.log(action.payload);
      const {parseResult,field} = action.payload;
      // console.log(parseResult);
      // console.log(field);
      //解析结果返回是否成功
      if(parseResult){ 
        const { customerInfoResult,layer,minHoleSize,boardLength,boardWidth,svg:{topSvg,bottomSvg},singleCopper} = field;
        //是否解析成功资料里的数据
        let allkeys,psf;
        if(Object.keys(customerInfoResult).length === 0){
          allkeys = {...customerInfoResult,layer,minHoleSize};
          psf = {
            ...state.pcbStandardField,
            layer:layer+'layer',
            minHoleSize:minHoleSize+''
          }
        }else{
          const {material,thickness,outerCopper,surfaceFinish,color} = customerInfoResult;
          allkeys = {...customerInfoResult,layer,minHoleSize};
          psf = {
            ...state.pcbStandardField,
            layer:layer+'layer',
            minHoleSize:minHoleSize,
            material:material,
            thickness:thickness,
            outerCopper:outerCopper,
            surfaceFinish:surfaceFinish,
          }
        }
        
        // let copper
        // if(layer === 1){
        //   copper = layers.filter((item: { type: string })=>item.type === 'copper')[0].side;
        // }
        return{
          ...state,
          loading: true,
          pcbSizeField:{...state.pcbSizeField,singleSize:{sizeX:boardWidth,sizeY:boardLength}},
          pcbStandardField:psf,
          singleCopper: singleCopper,
          isShow: parseResult,
          isBackToUpload:false,
          allKeys:allkeys,
          fillData:true,
          svg:{...state.svg,topSvg:topSvg,bottomSvg:bottomSvg},
          uploadGerber: {...state.uploadGerber, status: 'suc'}
        }
      }else{
        return {
          ...state,
          // fileName: fileName,
          // fileUploadPtah: uploadPath,
          isShow: parseResult,
          isBackToUpload:false,
          uploadGerber: {...state.uploadGerber, status: 'fail'},
          fillData:false
        }
      }
      
    }
    case actionTypes.CHOOSE_COURIER: {
      return {
        ...state,
        courier: action.payload
      }
    }
    case actionTypes.SHOW_DEFAULT: {
      return {
        ...state,
        isShow: action.payload
      }
    }
    case actionTypes.BACK_TO_UPLOAD: {
      return {
        ...state,
        isBackToUpload: action.payload,
        pcbSizeField: {boardType:'Single',panelSize: {sizeX:null,sizeY:null},quantity:null,singleSize:{sizeX:null,sizeY:null}},
        pcbStandardField: INITIAL_STANDARD,
        allKeys:{},
        svg:null,
        fillData:action.payload,
        uploadGerber: {...state.uploadGerber, progress: 0}
      }
    }
    case actionTypes.CHANGE_COLOR: {
      return {
        ...state,
        fillData: action.payload
      }
    }
    case actionTypes.CHANGE_ASSEMBLY_FIELD: {
      return {...state, assemblyField: action.payload }
    }
    case actionTypes.BACKFILL_SVG_DATA: {
      const {svg:{topSvg,bottomSvg},showDefaultImg,singleCopper} = action.payload;
      if (showDefaultImg) {
        return {
          ...state, 
          svg:{topSvg:topSvg,bottomSvg:bottomSvg},
          singleCopper: singleCopper,
          isShow: showDefaultImg,
          isBackToUpload:false 
        }
      }else{
        return{...state}
      }
      
    }
    case actionTypes.RELOAD_UPLOAD_SVG: {
      return {
        ...state,
        isBackToUpload:action.payload
      }
    }
    case actionTypes.BACKFILL_UPLOAD_PATH_DATA: {
      return {
        ...state,
        fileName: action.payload.name,
        fileUploadPtah: action.payload.url
      }
    }
    // 购物车抽屉
    case actionTypes.CHANGE_CARDRAWER_STATUS: {
      return {
        ...state,
        carDrawerStatus: action.payload
      }
    }
    // 结算 => 右侧订单信息
    case actionTypes.ORDER_SUMMARY: {
      return {
        ...state,
        orderSummary: {...state.orderSummary, ...action.payload},
      }
    }
    // 结算 => 折叠面板 状态管理
    case actionTypes.ORDER_SUMMARY_STATUS: {
      return {
        ...state,
        orderSummaryStatus: {...state.orderSummaryStatus, ...action.payload},
      }
    }
    // 结算 => 左侧参数信息
    case actionTypes.ORDER_OPTIONS: {
      return {
        ...state,
        orderOptionsItem: {...state.orderOptionsItem, ...action.payload},
      }
    }
    // 结算 => 左侧参数信息
    case actionTypes.Upload_GERBER_OPTIONS: {
      return {
        ...state,
        uploadGerber: {...state.uploadGerber, ...action.payload},
      }
    }
    // 用户信息
    case actionTypes.SET_USER: {
      return {
        ...state,
        user: {...state.user, ...action.payload},
      }
    }
    // 报价参数是否验证
    case actionTypes.FLAG_QUOTE_PARAMS: {
      return {
        ...state,
        flagQuoteParams: action.payload
      }
    }
  }
  

  return state
}
