// all store middleware
import {createAnalyticsMiddleware} from '../analytics'
import {createLogMiddleware} from '../logger'
import {createRenderMiddleware} from '../render'
import {createSettingsMiddleware} from '../settings'
import {Middleware} from './types'

/** 中间件list */
export default function createMiddleware(): Array<Middleware> {
  return [
    // createAnalyticsMiddleware(),
    createRenderMiddleware(),
    // createSettingsMiddleware(),
    createLogMiddleware(),
  ]
}
