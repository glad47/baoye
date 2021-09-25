import {
  AppPreferences,
  BoardSummary,
  BoardUpdate,
  BoardRender,
  Mode,
  FieldMode,
  FieldStore,
  ParseGerber,
  BuildTimeItem,
  SubtotalItem, OrderSummaryStatus,
} from '../types'

import {Action} from './types'
import { SelectValue } from 'antd/lib/select'



export const RESET_STORE = 'RESET_STORE'
export const FETCH_APP_PREFERENCES = 'FETCH_APP_PREFERENCES'
export const UPDATE_APP_PREFERENCES = 'UPDATE_APP_PREFERENCES'
export const APP_PREFERENCES = 'APP_PREFERENCES'
export const CREATE_BOARD = 'CREATE_BOARD'
export const CREATE_BOARD_FROM_URL = 'CREATE_BOARD_FROM_URL'
export const GET_BOARD = 'GET_BOARD'
export const GET_BOARD_PACKAGE = 'GET_BOARD_PACKAGE'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const DELETE_BOARD = 'DELETE_BOARD'
export const DELETE_ALL_BOARDS = 'DELETE_ALL_BOARDS'
export const SET_MODE = 'SET_MODE'
export const TOGGLE_VISIBILITY = 'TOGGLE_VISIBILITY'
export const BOARD_RENDERED = 'BOARD_RENDERED'
export const BOARD_UPDATED = 'BOARD_UPDATED'
export const BOARD_DELETED = 'BOARD_DELETED'
export const BOARD_PACKAGED = 'BOARD_PACKAGED'
export const ALL_BOARDS_DELETED = 'ALL_BOARDS_DELETED'
export const WORKER_INITIALIZED = 'WORKER_INITIALIZED'
export const WORKER_ERRORED = 'WORKER_ERRORED'
export const DISMISS_ERROR = 'DISMISS_ERROR'
export const SET_FIELDMODE = 'SET_FIELDMODE'
export const CHANGE_STANDARD_FIELD = 'CHANGE_STANDARD_FIELD'
export const CHANGE_SPECIAL_FIELD = 'CHANGE_SPECIAL_FIELD' 
export const CHANGE_SIZE_FIELD = 'CHANGE_SIZE_FIELD'
export const COUNT_SUBTOTAL = 'COUNT_SUBTOTAL'
export const PARSING_GERBER = 'PARSING_GERBER'
export const COUNT_BUILDTIME = 'COUNT_BUILDTIME'
export const CHANGE_URGENTCOST = 'CHANGE_URGENTCOST'
export const CHANGE_TRANSPORT_COST = 'CHANGE_TRANSPORT_COST'
export const ADD_QUOTE = 'ADD_QUOTE'
export const CHANGE_QUOTE_MODE = 'CHANGE_QUOTE_MODE'
export const CHANGE_STENCIL_FIELD = 'CHANGE_STENCIL_FIELD'
export const BACKFILL_PCB_DATA = 'BACKFILL_PCB_DATA'
export const CHOOSE_COURIER='CHOOSE_COURIER'
export const SHOW_DEFAULT='SHOW_DEFAULT'
export const BACK_TO_UPLOAD='BACK_TO_UPLOAD'
export const CHANGE_ASSEMBLY_FIELD = 'CHANGE_ASSEMBLY_FIELD'
export const CHANGE_COLOR='CHANGE_COLOR'
export const BACKFILL_SVG_DATA = 'BACKFILL_SVG_DATA'
export const RELOAD_UPLOAD_SVG = 'RELOAD_UPLOAD_SVG'
export const BACKFILL_UPLOAD_PATH_DATA = 'BACKFILL_UPLOAD_PATH_DATA'
export const CHANGE_CARDRAWER_STATUS = 'CHANGE_CARDRAWER_STATUS';
export const ORDER_SUMMARY = 'ORDER_SUMMARY';
export const ORDER_SUMMARY_STATUS = 'ORDER_SUMMARY_STATUS';
export const ORDER_OPTIONS = 'ORDER_OPTIONS';
export const Upload_GERBER_OPTIONS = 'Upload_GERBER_OPTIONS';
export const SET_USER = 'SET_USER';
export const FLAG_QUOTE_PARAMS = 'FLAG_QUOTE_PARAMS';
export const SAVE_FILE_FORMDATA = 'SAVE_FILE_FORMDATA';
export const CHANGE_ADDQUOTESTATUS = 'CHANGE_ADDQUOTESTATUS';
export const Flag_ISCHECKCOURIERACCOUNT = 'Flag_ISCHECKCOURIERACCOUNT';
export const SET_DELIVERYADDR = 'SET_DELIVERYADDR';
export const SET_ORDERS_BUY_NOW = 'SET_ORDERS_BUY_NOW';
export const SET_CART_PROCESS_AL_CHECK = 'SET_CART_PROCESS_AL_CHECK';

/** Action Creator 获取应用程序首选项 */
export const fetchAppPreferences = (): Action => ({
  type: FETCH_APP_PREFERENCES,
})

/** Action Creator 更新应用程序首选项 */
export const updateAppPreferences = (prefs: AppPreferences): Action => ({
  type: UPDATE_APP_PREFERENCES,
  payload: prefs,
})

/** Action Creator 应用程序首选项 */
export const appPreferences = (prefs: AppPreferences): Action => ({
  type: APP_PREFERENCES,
  payload: prefs,
})

/** Action Creator 生成电路板 */
export const createBoard = (
  files: Array<File>,
  dragAndDrop: boolean = false
): Action => ({
  type: CREATE_BOARD,
  payload: files,
  metadata: {dragAndDrop},
})

/** Action Creator解析gerber资料 */
export const parsingGerber = (gerberInfo: ParseGerber): Action =>({
  type: PARSING_GERBER,
  payload: gerberInfo,
})

/** Action Creator 生成电路板通过url */
export const createBoardFromUrl = (url: string): Action => ({
  type: CREATE_BOARD_FROM_URL,
  payload: url,
})

/** Action Creator 获取电路板 */
export const getBoard = (id: string): Action => ({
  type: GET_BOARD,
  payload: id,
})

/** Action Creator  更新电路板 */
export const updateBoard = (id: string, update: BoardUpdate): Action => ({
  type: UPDATE_BOARD,
  payload: {id, update},
})

/** Action Creator 删除电路板 */
export const deleteBoard = (id: string): Action => ({
  type: DELETE_BOARD,
  payload: id,
})

/** Action Creator 删除所有电路板 */
export const deleteAllBoards = (): Action => ({
  type: DELETE_ALL_BOARDS,
})

/** Action Creator  获取板包路径*/
export const getBoardPackage = (id: string): Action => ({
  type: GET_BOARD_PACKAGE,
  payload: id,
})

/** Action Creator 设置显示mod */
export const setMode = (mode: Mode): Action => ({
  type: SET_MODE,
  payload: mode,
})

/** Action Creator  可见切换 */
export const toggleVisibility = (id: string, solo: boolean): Action => ({
  type: TOGGLE_VISIBILITY,
  payload: {id, solo},
})

/** Action Creator 板渲染呈现 */
export const boardRendered = (render: BoardRender, time: number): Action => ({
  type: BOARD_RENDERED,
  payload: render,
  metadata: {time},
})

/** Action Creator 渲染更新板 */
export const boardUpdated = (board: BoardSummary): Action => ({
  type: BOARD_UPDATED,
  payload: board,
})

/** Action Creator 删除板 */
export const boardDeleted = (id: string): Action => ({
  type: BOARD_DELETED,
  payload: id,
})

/** Action Creator  打包下载*/
export const boardPackaged = (
  id: string,
  name: string,
  file: Blob
): Action => ({
  type: BOARD_PACKAGED,
  payload: {id, name, file},
})

/** Action Creator 删除所有板 */
export const allBoardsDeleted = (): Action => ({
  type: ALL_BOARDS_DELETED,
})

/** Action Creator worker初始化 */
export const workerInitialized = (boards: Array<BoardSummary>): Action => ({
  type: WORKER_INITIALIZED,
  payload: boards,
})

/** Action Creator worker错误 */
export const workerErrored = (request: Action, error: Error): Action => ({
  type: WORKER_ERRORED,
  payload: {
    request,
    error: {name: error.name, message: error.message, error: error.toString()},
  },
})

/** Action Creator 显示错误信息 */
export const dismissError = (): Action => ({
  type: DISMISS_ERROR,
})

/**  Action Creator 切换普通特殊字段 */
export const setFieldMode = (fieldMode: FieldMode): Action => ({
  type: SET_FIELDMODE,
  payload: fieldMode
})

/** 修改标准字段 */
export const changeStandardField = (field: FieldStore): Action =>({
  type: CHANGE_STANDARD_FIELD,
  payload: field
})
/** 修改特殊字段 */
export const changeSpecialField = (field: FieldStore): Action => ({
  type: CHANGE_SPECIAL_FIELD,
  payload: field
})

/** 修改尺寸字段 */
export const changeSizeField = (field: FieldStore): Action => ({
  type: CHANGE_SIZE_FIELD,
  payload: field
})

/** 计算小计 */
export const countSubtotal = (field: SubtotalItem): Action => ({
  type: COUNT_SUBTOTAL,
  payload: field
})

/** 获取建造时间 */
export const countBuildTime = (field: Array<BuildTimeItem>) : Action =>({
  type: COUNT_BUILDTIME,
  payload: field
})

/** 修改加急 */
export const changeUrgentCost = (field: BuildTimeItem): Action =>({
  type: CHANGE_URGENTCOST,
  payload: field
})

/** 设置运费 */
export const changeTransportCost = (field: number): Action =>({
  type: CHANGE_TRANSPORT_COST,
  payload: field
})

/** 添加报价 */
export const addQuote = (): Action =>({
  type: ADD_QUOTE,
})

/** 修改报价模型 */
export const changeQuoteMode = (field: number): Action =>({
  type: CHANGE_QUOTE_MODE,
  payload: field
})

/** 修改钢网字段 */
export const changeStencilField= (field: FieldStore): Action =>({
  type: CHANGE_STENCIL_FIELD,
  payload: field
})

/** 回填上传文件返回的数据 */
export const backfillPcbData = (field: any,parseResult: boolean): Action =>({
  type: BACKFILL_PCB_DATA,
  payload: {field,parseResult}
})
 /** 选择的快递 */
export const chooseCourier=(field:any):Action=>({
  type:CHOOSE_COURIER,
  payload:field
})
 /** 是否显示默认图片 */
export const showDefault=(field:any):Action=>({
  type:SHOW_DEFAULT,
  payload:field
})
 /** 返回上传文件页面 */
 export const backToUpload=(field:any):Action=>({
   type:BACK_TO_UPLOAD,
   payload:field
 })
/** 更改颜色 */
export const changeColor=(field:any):Action=>({
  type:CHANGE_COLOR,
  payload:field
})
/** 修改钢网字段 */
export const changeAssemblyField = (field: FieldStore): Action =>({
  type: CHANGE_ASSEMBLY_FIELD,
  payload: field 
})

/** 回填本地解析的svg数据 */
export const backfillSvgData = (field:any): Action =>({
  type: BACKFILL_SVG_DATA,
  payload: field
})

/** 回填本地解析的svg数据 */
export const REDUX_SET_isBackToUpload = (field:any): Action =>({
  type: RELOAD_UPLOAD_SVG,
  payload: field
})

/** 回填上传后的路径 */
export const backfillUploadPathData = (field:any): Action =>({
  type: BACKFILL_UPLOAD_PATH_DATA,
  payload: field
})

/** 购物车抽屉 */
export const changeCarDrawer = (field:any): Action =>({
  type: CHANGE_CARDRAWER_STATUS,
  payload: field
})

/** 结算 右侧价格信息 */
export const orderSummaryFun = (field:any): Action => ({
  type: ORDER_SUMMARY,
  payload: field
});

/** 结算 支付状态管理 */
export const setOrderSummaryStatus = (field: any): Action => ({
  type: ORDER_SUMMARY_STATUS,
  payload: field
})

/** 结算 左侧信息 */
export const orderOptions = (field:any): Action => ({
  type: ORDER_OPTIONS,
  payload: field
});

/** 上传Gerber */
export const reduxUploadGerber = (field:any): Action => ({
  type: Upload_GERBER_OPTIONS,
  payload: field
});

export const saveUploadGerberFileFormData = (field: any): Action => ({
  type: SAVE_FILE_FORMDATA,
  payload: field
});

export const reduxUser = (field:any): Action => ({
  type: SET_USER,
  payload: field
});

export const reduxSetFlagQuoteParams = (field:any): Action => ({
  type: FLAG_QUOTE_PARAMS,
  payload: field
});

export const reduxChangeAddQuoteStatus = (field: any): Action => ({
  type: CHANGE_ADDQUOTESTATUS,
  payload: field
})

export const reduxCheckCourierAccount = (field: boolean): Action => ({
  type: Flag_ISCHECKCOURIERACCOUNT,
  payload: field
})

export const reduxSetDeliveryAddr = (field: any): Action => ({
  type: SET_DELIVERYADDR,
  payload: field
})

export const resetState = (): Action => ({
  type: RESET_STORE
})

/** 直接购买  保存返回当前的信息 */
export const reduxSetOrdersBuyNow = (field: any): Action => ({
  type: SET_ORDERS_BUY_NOW,
  payload: field
})

/** 直接购买  保存返回当前的信息 */
export const reduxSetCartProcessHasCheck = (field: any): Action => ({
  type: SET_CART_PROCESS_AL_CHECK,
  payload: field
})