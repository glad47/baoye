import {LogLevel, Logger, LogHandler} from './types'
import {Middleware} from './state'

const STORAGE_KEY = 'logLevel'
const DEFAULT_LEVEL = process.env.NODE_ENV !== 'production' ? 'debug' : 'warn'
const LEVELS: Array<LogLevel> = ['debug', 'info', 'warn', 'error']

let minLevel: LogLevel

const log: Logger = {
  debug: createLogHandler('debug'),
  info: createLogHandler('info'),
  warn: createLogHandler('warn'),
  error: createLogHandler('error'),
}

export default log

/** 生成日志中间件 */
export const createLogMiddleware = (): Middleware => {
  return store => next => action => {
    //这里可以看成 dispatch(action) => action
    const result = next(action)
    log.debug('action --来自于日志中间件', action)
    log.debug('next state --来自于日志中间件', store.getState())
    return result
  }
}

function createLogHandler(level: LogLevel): LogHandler {
  if (!minLevel) minLevel = readLogLevel()

  return LEVELS.indexOf(level) >= LEVELS.indexOf(minLevel)
    ? (msg, ...meta) => console[level](`${level}: ${msg}`, ...meta)
    : () => {}
}

function readLogLevel(): LogLevel {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const maybeLevel = window.localStorage.getItem(STORAGE_KEY)

      if (
        maybeLevel === 'debug' ||
        maybeLevel === 'info' ||
        maybeLevel === 'warn' ||
        maybeLevel === 'error'
      ) {
        return maybeLevel
      }
    } catch (error) {
      console.error('Could not read logLevel from localStorage', error)
    }
  }

  return DEFAULT_LEVEL
}
