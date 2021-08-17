
import React, {useContext} from 'react'

import {Store, State, Dispatch} from './types'
import { INITIAL_STANDARD, INITIAL_SPECIAL, INITIAL_STENCIL, INITIAL_ASSEMBLY } from '../SpecificationInput/PcbSpecification'
/** 初始状态 */
export const INITIAL_STATE: State = {
  flagQuoteParams: false,
  appPreferences: {},
  board: null,
  addQuoteStatus: false,
  savedBoards: [],
  mode: null,
  loading: false,
  updating: false,
  downloading: false,
  layerVisibility: {},
  error: null,
  quoteMode: 0,
  pcbSpecialField: INITIAL_SPECIAL,
  pcbStandardField: INITIAL_STANDARD,
  fieldMode: 'standard',
  pcbSizeField: {boardType:'Single',panelSize: {sizeX:null,sizeY:null},quantity:null,singleSize:{sizeX:null,sizeY:null}},
  subtotal: {boardFee:0,engineeringFee:0,testFee:0,totalWeight:0,urgentFee:0,shippingFee:0,stencilFee:0,buildTime:null,assemblyFee:0},
  buildTimeItmes: [{id: 1,dayNumber:"3 day",price:0},{id: 2,dayNumber:"48 hours",price:22},{id: 3,dayNumber:"24 hours",price:38},],
  stencilField: INITIAL_STENCIL,
  assemblyField: INITIAL_ASSEMBLY,
  svg: null,
  fileName: null,
  fileUploadPtah: null,
  singleCopper: null,
  courier:null,
  isShow:false,
  isBackToUpload:true,
  allKeys:{},
  fillData:true,
  user: {message: {unread: 0}, cartNum: 0},
  carDrawerStatus:false,
  uploadGerber: {progress: 0, status: 'init'},
  orderSummary: {total: 0, freightCharges: 0, weight: 0, coupon: {id: -1, value: 0}, handlingCharge: 0},
  orderSummaryStatus: {process: 1, description: ''},
  orderOptionsItem: {deliveryAddr: null, expressInfo: {id: null, name: null}, payWays: 1, ordersItem: []},
  fileFormData: null,
}

// const INITIAL_STANDARD = {
//   "material":'FR4',
//   "tg":'135',
//   "layer":'2layer',
//   "innerCopper":'none',
//   "minTrack":'5/5mil',
//   "minHoleSize":'0.3',
//   "surfaceFinish":'HASL lead free',
//   "solderMask":'green',
//   "heatConductivity":'1w', 
//   "thinkness":'0.8mm',
//   "cti":'175≤CTI<250',
//   "outerCopper":'1oz',
//   "bgaSize":'≥0.30mm',
//   "holeCopper":'20um',
//   "surfaceThickness":'0.25-0.5um',
//   "silkscreen":'white',
// }

export const StoreContext = React.createContext<Store>({
  getState: () => INITIAL_STATE,
  dispatch: a => a,
})

/** 使用app状态 */
export const useAppState = (): State & {dispatch: Dispatch} => {
  const {getState, dispatch} = useContext(StoreContext)
  return {...getState(), dispatch}
}
