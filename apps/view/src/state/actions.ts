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
  SubtotalItem,
} from '../types'

import {Action} from './types'
import { SelectValue } from 'antd/lib/select'

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
export const changeUrgentCost = (field: number): Action =>({
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
export const backfillPcbData = (field: any): Action =>({
  type: BACKFILL_PCB_DATA,
  payload: field
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
