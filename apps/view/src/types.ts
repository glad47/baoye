import React from 'react'
import {CoordinateFormat, ZeroSuppression} from 'gerber-parser'
import {Units} from 'gerber-plotter'
import {ConverterResult} from 'gerber-to-svg'
import {Color} from 'pcb-stackup-core'
import {ViewBox} from 'viewbox'
import {GerberSide, GerberType} from 'whats-that-gerber'
import { type } from 'os'
import { Store } from 'antd/lib/form/interface'

export {CoordinateFormat, ZeroSuppression, Units, GerberType, GerberSide}

/** 应用设置 */
export type AppPreferences = Optional<{
  analyticsOptIn: boolean
}>

/** 板显示模型 */
export type Mode = null | 'top' | 'bottom' | 'layers'

/** 报价类型 */
export type QuoteMode = null | 'pcb' | 'stencil' | 'Assembly' | 'manual'

export type SvgSource = string | null

export type Board = {
  id: string
  name: string
  layerIds: Array<string>
  layers: LayersMap
  options: BoardOptions
  gerberOptions: Optional<LayerOptions>
  drillOptions: Optional<LayerOptions>
  thumbnail: string
  sourceUrl?: string
}

export type Layer = {
  id: string
  filename: string
  sourceId: string
  source: Buffer
  side: GerberSide
  type: GerberType
  color: string
  initialOptions: LayerOptions
}

export type LayersMap = {
  [id: string]: Layer
}

export type BoardSummary = Pick<Board, 'id' | 'name' | 'options' | 'thumbnail'>

export type BoardUpdate = Partial<{
  id: Board['id']
  name: Board['name']
  options: Board['options']
  gerberOptions: Board['gerberOptions']
  drillOptions: Board['drillOptions']
  layers: Partial<LayerUpdatesMap>
}>

/**  渲染的板数据 */
export type BoardRender = {
  id: string
  name: string
  options: BoardOptions
  gerberOptions: Optional<LayerOptions>
  drillOptions: Optional<LayerOptions>
  viewBox: ViewBox
  top: SvgSource
  bottom: SvgSource
  layers: Array<LayerRender>
  sourceIds: Array<string>
  sourceUrl: string | null
}

export type LayerRender = {
  id: string
  filename: string
  type: GerberType
  side: GerberSide
  converter: ConverterResult
  initialOptions: LayerOptions
  color: string
  scale: number
}

export type BoardOptions = {
  useOutline: boolean
  outlineGapFill: number
  color: Pick<Color, 'sm' | 'ss' | 'cf'>
}

export type LayerOptions = {
  coordinateFormat: CoordinateFormat
  zeroSuppression: ZeroSuppression
  units: Units
}

export type LayerUpdatesMap = {
  [id: string]: {
    side: GerberSide
    type: GerberType
    color: string
  }
}

/** 各层是否显示Map */
export type LayerVisibilityMap = {[id: string]: boolean}

export type ErrorObject = {
  name: string
  message: string
  error: string
}

export type FileEvent =
  | React.DragEvent<HTMLElement>
  | React.ChangeEvent<HTMLInputElement>

export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export type LogHandler = (message: string, ...meta: Array<unknown>) => void

export type Logger = {[Level in LogLevel]: LogHandler}

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export type Optional<T> = {[P in keyof T]?: T[P] | null | undefined}

/** 字段属性 */
export type FieldStore  = Store
/** 字段类型 */
export type FieldMode = null | 'standard' | 'special'

export type ParseGerber = {
  width: number | string;
  height: number | string;
  units: string;
  layerCount: number;
  quoteFilePath: string | null;
}

/** 交期 */
export type BuildTimeItem = {
  id: number,
  dayNumber: string,
  price: number
}

/**所有费用之和+总重量+交期 */
export type SubtotalItem = {
  boardFee: number,  //板费
  engineeringFee: number,  //工程费
  testFee: number,  //测试费
  subsidy: number,
  originalPrice: number,
  totalWeight: number,  //总重量
  urgentFee: number,  //加急费
  shippingFee: number, //运费
  stencilFee: number,  //钢网费
  buildTime: string | null, //交期
  assemblyFee: number,  //贴片费
}

export type OrderSummaryItem = {
  total: number, // 总费用
  weight : number, // 总重量
  freightCharges: number, // 订单结算 运费
  coupon: {id: number, value: number}, // 订单结算 优惠券
  handlingCharge: number, // 订单结算 手续费
}

/** 订单支付状态 */
export type OrderSummaryStatus = {
  process: number, // 当前流程序号
  description: string // 流程描述
}

/** 订单支付左侧参数管理  */
export type orderOptionsItem = {
  ordersItem: [], // 商品信息
  deliveryAddr: any, // 地址
  expressInfo: any, // 快递信息
  remark: any, // 订单备注
  payWays: any, // 支付方式 3: paypal 4: 信用卡
}

export type SvgString = {
  topSvg: any,
  bottomSvg: any
}

/** 上传Gerber文件参数  */
export type UploadGerberItem = {
  status: any // 文件状态: suc 解析成功  err 失败
  progress: 0 // 上传进度进度
}

/** 用户中心  */
export type UserStatus = {
  message: { // 系统消息
    unread: number,
  }
  cartNum: number,
}