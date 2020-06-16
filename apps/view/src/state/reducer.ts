import * as actionTypes from './actions'
import {INITIAL_STATE} from './context'
import {Action, State} from './types'
import PcbSizeForm from '../SpecificationInput/PcbSizeForm'
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
        subtotal: {...state.subtotal,urgentFee: action.payload}
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
      const { 
        board_layers,
        board_length, 
        board_width,
        stackup:{bottom,top}
      } = action.payload
      return{
        ...state,
        loading: true,
        pcbSizeField:{...state.pcbSizeField,singleSize:{sizeX:board_width,sizeY:board_length}},
        pcbStandardField:{...state.pcbStandardField,layer:board_layers+'layer',},
        svg:{...state.svg,topSvg:top,bottomSvg:bottom} 
      }
    }
  }
  

  return state
}
