export type CaptchaMode = 'number' | 'letter' | 'mixed'

export interface CaptchaProps {
  /** 验证码长度 */
  length?: number
  /** 验证码模式 */
  mode?: CaptchaMode
  /** 宽度 */
  width?: number
  /** 高度 */
  height?: number
  /** 字体大小 */
  fontSize?: number
  /** 背景色 */
  bgColor?: string
  /** 文字颜色（支持数组，随机选取） */
  textColors?: string[]
  /** 干扰线数量 */
  lineCount?: number
  /** 干扰点数量 */
  dotCount?: number
  /** 是否显示边框 */
  showBorder?: boolean
  /** 边框颜色 */
  borderColor?: string
}

export interface CaptchaInstance {
  /** 获取当前验证码 */
  getCode: () => string
  /** 刷新验证码 */
  refresh: () => void
  /** 验证输入是否正确（忽略大小写） */
  validate: (input: string) => boolean
}
