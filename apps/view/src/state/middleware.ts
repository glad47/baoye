// all store middleware
import {createAnalyticsMiddleware} from '../analytics'
import {createLogMiddleware} from '../logger'
import {createRenderMiddleware} from '../render'
import {createSettingsMiddleware} from '../settings'
import {Middleware} from './types'
import { countQuoteMiddleware } from '../SpecificationInput/middleware'

/** 中间件list */
export default function createMiddleware(): Array<Middleware> {
  return [
    // createAnalyticsMiddleware(),
    createRenderMiddleware(),
    // createSettingsMiddleware(),
    countQuoteMiddleware(),
    createLogMiddleware(),
  ]
}
