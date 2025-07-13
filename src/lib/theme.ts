// 主题类型
export type Theme = 'light' | 'dark'

// 主题存储键
const THEME_STORAGE_KEY = 'imagecirclemaker-theme'

// 获取当前主题
export function getCurrentTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  return (localStorage.getItem(THEME_STORAGE_KEY) as Theme) || 'light'
}

// 设置主题
export function setTheme(theme: Theme) {
  if (typeof window === 'undefined') return
  
  localStorage.setItem(THEME_STORAGE_KEY, theme)
  
  document.documentElement.classList.toggle('dark', theme === 'dark')
  
  // 触发自定义事件，通知其他组件主题变化
  window.dispatchEvent(new CustomEvent('theme-change', { detail: { theme } }))
}

// 获取下一个主题
export function getNextTheme(currentTheme: Theme): Theme {
  return currentTheme === 'light' ? 'dark' : 'light'
}

// 获取主题图标
export function getThemeIcon(theme: Theme): string {
  return theme === 'light' ? '☀️' : '🌙'
}

// 初始化主题
export function initializeTheme() {
  if (typeof window === 'undefined') return
  
  const savedTheme = getCurrentTheme()
  setTheme(savedTheme)
} 