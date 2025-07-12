// 图片处理相关类型
export interface ImageData {
  id: string
  file: File
  url: string
  width: number
  height: number
  size: number
}

export interface CropData {
  x: number
  y: number
  width: number
  height: number
  scale: number
  rotation: number
}

export interface FilterData {
  brightness: number
  contrast: number
  saturation: number
  sharpness: number
  filter: string
}

export interface BorderData {
  enabled: boolean
  color: string
  width: number
  style: 'solid' | 'dashed' | 'dotted'
}

export interface ExportData {
  format: 'png' | 'jpg' | 'webp'
  quality: number
  width: number
  height: number
  filename: string
}

// 平台尺寸类型
export interface PlatformSize {
  width: number
  height: number
  name: string
}

export type PlatformKey = keyof typeof import('@/lib/utils').PLATFORM_SIZES

// 用户反馈类型
export interface FeedbackData {
  id: string
  type: 'feature' | 'bug' | 'experience' | 'other'
  title: string
  description: string
  screenshot?: string
  contact?: string
  status: 'pending' | 'processing' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high'
  createdAt: string
  updatedAt: string
}

// 历史记录类型
export interface HistoryItem {
  id: string
  imageData: ImageData
  cropData: CropData
  filterData: FilterData
  borderData: BorderData
  platform: PlatformKey
  createdAt: string
}

// 主题类型
export type Theme = 'light' | 'dark' | 'system'

// 语言类型
export type Language = 'zh' | 'en' | 'es' | 'fr' | 'de' | 'ja' | 'ko'

// 设备类型
export type DeviceType = 'mobile' | 'tablet' | 'desktop'

// 浏览器支持类型
export interface BrowserSupport {
  canvas: boolean
  fileApi: boolean
}

// 用户设置类型
export interface UserSettings {
  theme: Theme
  language: Language
  autoSave: boolean
  defaultFormat: 'png' | 'jpg' | 'webp'
  defaultQuality: number
}

// 错误类型
export interface AppError {
  code: string
  message: string
  details?: string
}

// 成功响应类型
export interface SuccessResponse<T = any> {
  success: true
  data: T
  message?: string
}

// 错误响应类型
export interface ErrorResponse {
  success: false
  error: AppError
}

export type ApiResponse<T = any> = SuccessResponse<T> | ErrorResponse

// 组件Props类型
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

// 按钮类型
export interface ButtonProps extends BaseComponentProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
}

// 输入框类型
export interface InputProps extends BaseComponentProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'file'
  placeholder?: string
  value?: string
  defaultValue?: string
  disabled?: boolean
  required?: boolean
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
}

// 选择器类型
export interface SelectProps<T = string> extends BaseComponentProps {
  value?: T
  defaultValue?: T
  options: Array<{ value: T; label: string; disabled?: boolean }>
  placeholder?: string
  disabled?: boolean
  onChange?: (value: T) => void
}

// 滑块类型
export interface SliderProps extends BaseComponentProps {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  onChange?: (value: number) => void
}

// 开关类型
export interface SwitchProps extends BaseComponentProps {
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
}

// 对话框类型
export interface DialogProps extends BaseComponentProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  description?: string
}

// 标签页类型
export interface TabProps extends BaseComponentProps {
  value?: string
  defaultValue?: string
  tabs: Array<{ value: string; label: string; content: React.ReactNode }>
  onChange?: (value: string) => void
}

// 工具提示类型
export interface TooltipProps extends BaseComponentProps {
  content: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  delayDuration?: number
}

// 通知类型
export interface ToastProps {
  id: string
  title: string
  description?: string
  type?: 'default' | 'success' | 'error' | 'warning'
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
} 