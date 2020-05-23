import React, {useContext} from 'react'

import {Store, State, Dispatch} from './types'
//初始状态
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
}

//商店上下文，作用在各个组件间传递变量
export const StoreContext = React.createContext<Store>({
  getState: () => INITIAL_STATE,
  dispatch: a => a,
})

export const useAppState = (): State & {dispatch: Dispatch} => {
  const {getState, dispatch} = useContext(StoreContext)
  return {...getState(), dispatch}
}
