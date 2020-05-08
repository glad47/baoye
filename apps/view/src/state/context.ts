import React, {useContext} from 'react'

import {Store, State, Dispatch} from './types'
import { INITIAL_STANDARD, INITIAL_SPECIAL } from '../SpecificationInput/PcbSpecification'
/** 初始状态 */
export const INITIAL_STATE: State = {
  appPreferences: {},
  board: null,
  savedBoards: [],
  mode: null,
  loading: false,
  updating: false,
  downloading: false,
  layerVisibility: {},
  error: null,
  quoteMode: null,
  pcbSpecialField: INITIAL_SPECIAL,
  pcbStandardField: INITIAL_STANDARD,
  fieldMode: 'standard',
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
