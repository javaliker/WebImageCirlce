import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 平台尺寸预设
export const PLATFORM_SIZES = {
  // 国内平台
  wechat: { width: 132, height: 132, name: '微信头像' },
  weibo: { width: 180, height: 180, name: '微博头像' },
  qq: { width: 100, height: 100, name: 'QQ头像' },
  dingtalk: { width: 120, height: 120, name: '钉钉头像' },
  douyin: { width: 200, height: 200, name: '抖音头像' },
  xiaohongshu: { width: 160, height: 160, name: '小红书头像' },
  
  // 国际平台
  instagram: { width: 150, height: 150, name: 'Instagram头像' },
  linkedin: { width: 400, height: 400, name: 'LinkedIn头像' },
  facebook: { width: 170, height: 170, name: 'Facebook头像' },
  twitter: { width: 400, height: 400, name: 'Twitter/X头像' },
  tiktok: { width: 200, height: 200, name: 'TikTok头像' },
  youtube: { width: 800, height: 800, name: 'YouTube头像' },
  discord: { width: 128, height: 128, name: 'Discord头像' },
  telegram: { width: 512, height: 512, name: 'Telegram头像' },
  whatsapp: { width: 192, height: 192, name: 'WhatsApp头像' },
  snapchat: { width: 200, height: 200, name: 'Snapchat头像' },
  pinterest: { width: 165, height: 165, name: 'Pinterest头像' },
  reddit: { width: 256, height: 256, name: 'Reddit头像' },
  github: { width: 260, height: 260, name: 'GitHub头像' },
  slack: { width: 192, height: 192, name: 'Slack头像' },
  zoom: { width: 200, height: 200, name: 'Zoom头像' },
  
  // 专业平台
  email: { width: 200, height: 200, name: '企业邮箱头像' },
  resume: { width: 300, height: 300, name: '简历头像' },
  business_card: { width: 150, height: 150, name: '名片头像' },
  website: { width: 300, height: 300, name: '网站头像' },
} as const

// 支持的图片格式
export const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

// 文件大小格式化
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 验证文件格式
export function isValidImageFormat(file: File): boolean {
  return SUPPORTED_FORMATS.includes(file.type)
}

// 验证文件大小
export function isValidFileSize(file: File): boolean {
  return file.size <= MAX_FILE_SIZE
}

// 生成唯一ID
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

// 防抖函数
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// 节流函数
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// 本地存储工具
export const storage = {
  get: (key: string) => {
    if (typeof window === 'undefined') return null
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },
  set: (key: string, value: any) => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // 忽略存储错误
    }
  },
  remove: (key: string) => {
    if (typeof window === 'undefined') return
    try {
      localStorage.removeItem(key)
    } catch {
      // 忽略删除错误
    }
  }
}

// 下载文件
export function downloadFile(dataUrl: string, filename: string) {
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// 复制到剪贴板
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // 降级方案
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    const success = document.execCommand('copy')
    document.body.removeChild(textArea)
    return success
  }
}

// 获取设备类型
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop'
  const width = window.innerWidth
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

// 检测浏览器支持
export function getBrowserSupport() {
  if (typeof window === 'undefined') return { canvas: false, fileApi: false }
  
  return {
    canvas: !!document.createElement('canvas').getContext,
    fileApi: !!(window.File && window.FileReader && window.FileList && window.Blob),
  }
} 