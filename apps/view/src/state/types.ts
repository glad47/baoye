import {
  AppPreferences,
  BoardRender,
  BoardSummary,
  BoardUpdate,
  LayerVisibilityMap,
  Mode,
  ErrorObject,
  QuoteMode,
  FieldStore,
  FieldMode,
  ParseGerber,
  BuildTimeItem,
  SubtotalItem,
  SvgString, OrderSummaryItem, OrderSummaryStatus, orderOptionsItem, UploadGerberItem,
} from '../types'
import { SelectValue } from 'antd/lib/select'


/** 状态 Store对象包含所有数据。如果想得到某个时点的数据，就要对 Store 生成快照。这种时点的数据集合，就叫做 State。当前时刻的 State，可以通过store.getState()拿到。 */
export type State = {
  appPreferences: AppPreferences
  board: BoardRender | null
  savedBoards: Array<BoardSummary>
  mode: Mode
  loading: boolean
  updating: boolean
  downloading: boolean
  layerVisibility: LayerVisibilityMap
  error: null | ErrorObject
  quoteMode: number
  fieldMode: FieldMode
  pcbStandardField: FieldStore
  pcbSpecialField: FieldStore
  pcbSizeField: FieldStore
  subtotal: SubtotalItem
  buildTimeItmes: Array<BuildTimeItem>
  stencilField: FieldStore
  assemblyField: FieldStore
  svg: SvgString | null
  fileName: string | null
  fileUploadPtah: string | null
  singleCopper: string | null
  courier:string | null
  isShow:boolean
  isBackToUpload:boolean
  allKeys:any
  fillData:boolean
  carDrawerStatus:boolean
  uploadGerber: UploadGerberItem // 上传Gerber文件参数
  orderSummary: OrderSummaryItem // 订单结算
  orderSummaryStatus: OrderSummaryStatus // 结算状态管理
  orderOptionsItem: orderOptionsItem // 结算 左侧参数信息
}

/** Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。 */
export type Reducer = (state: State, action: Action) => State

/** store.dispatch()是 View 发出 Action 的唯一方法。 */
export type Dispatch = (action: Action) => Action

/** Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。 */
export type Store = {getState: () => State; dispatch: Dispatch}

/** 中间件 --中间件就是一个函数，对store.dispatch方法进行了改造，在发出 Action 和执行 Reducer 这两步之间，添加了其他功能。*/
export type Middleware = (store: Store) => (next: Dispatch) => Dispatch

/** Action --State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。Action 就是 View 发出的通知，表示 State 应该要发生变化了。Action 是一个对象。其中的type属性是必须的，表示 Action 的名称。*/
export type Action =
  | {type: 'FETCH_APP_PREFERENCES'}
  | {type: 'UPDATE_APP_PREFERENCES'; payload: AppPreferences}
  | {type: 'APP_PREFERENCES'; payload: AppPreferences}
  | {
      type: 'CREATE_BOARD'
      payload: Array<File>
      metadata: {dragAndDrop: boolean}
    }
  | {type: 'CREATE_BOARD_FROM_URL'; payload: string}
  | {type: 'GET_BOARD'; payload: string}
  | {type: 'UPDATE_BOARD'; payload: {id: string; update: BoardUpdate}}
  | {type: 'DELETE_BOARD'; payload: string}
  | {type: 'DELETE_ALL_BOARDS'}
  | {type: 'GET_BOARD_PACKAGE'; payload: string}
  | {type: 'SET_MODE'; payload: Mode}
  | {type: 'TOGGLE_VISIBILITY'; payload: {id: string; solo: boolean}}
  | {type: 'BOARD_RENDERED'; payload: BoardRender; metadata: {time: number}}
  | {type: 'BOARD_UPDATED'; payload: BoardSummary}
  | {type: 'BOARD_DELETED'; payload: string}
  | {type: 'BOARD_PACKAGED'; payload: {id: string; name: string; file: Blob}}
  | {type: 'ALL_BOARDS_DELETED'}
  | {type: 'WORKER_INITIALIZED'; payload: Array<BoardSummary>}
  | {type: 'WORKER_ERRORED'; payload: {request: Action; error: ErrorObject}}
  | {type: 'DISMISS_ERROR'}
  | {type: 'SET_FIELDMODE'; payload: FieldMode}
  | {type: 'CHANGE_STANDARD_FIELD'; payload: FieldStore}
  | {type: 'CHANGE_SPECIAL_FIELD'; payload: FieldStore}
  | {type: 'CHANGE_SIZE_FIELD'; payload: FieldStore}
  | {type: 'COUNT_SUBTOTAL'; payload: SubtotalItem}
  | {type: 'PARSING_GERBER'; payload: ParseGerber}
  | {type: 'COUNT_BUILDTIME'; payload: Array<BuildTimeItem>}
  | {type: 'CHANGE_URGENTCOST'; payload: BuildTimeItem}
  | {type: 'CHANGE_TRANSPORT_COST'; payload: number}
  | {type: 'ADD_QUOTE';}
  | {type: 'CHANGE_QUOTE_MODE'; payload: number}
  | {type: 'CHANGE_STENCIL_FIELD'; payload: FieldStore}
  | {type: 'BACKFILL_PCB_DATA'; payload: any}
  | {type: 'CHOOSE_COURIER';payload:any}
  | {type: 'SHOW_DEFAULT';payload:any}
  | {type: 'BACK_TO_UPLOAD';payload:any}
  | {type: 'CHANGE_ASSEMBLY_FIELD'; payload: FieldStore}
  | {type: 'CHANGE_COLOR'; payload: any}
  | {type: 'BACKFILL_SVG_DATA'; payload: any}
  | {type: 'RELOAD_UPLOAD_SVG'; payload: any}
  | {type: 'BACKFILL_UPLOAD_PATH_DATA'; payload: any}
  | {type: 'CHANGE_CARDRAWER_STATUS'; payload: any}
  | {type: 'ORDER_SUMMARY'; payload: OrderSummaryItem}
  | {type: 'ORDER_SUMMARY_STATUS'; payload: OrderSummaryStatus}
  | {type: 'ORDER_OPTIONS'; payload: orderOptionsItem}
  | {type: 'Upload_GERBER_OPTIONS'; payload: UploadGerberItem}
