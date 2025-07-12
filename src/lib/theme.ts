export type Theme = 'light' | 'dark' | 'system'

const THEME_STORAGE_KEY = 'webimagecircle-theme'

// 获取系统主题偏好
export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// 获取当前主题
export function getCurrentTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme
  if (savedTheme === 'system') {
    return getSystemTheme()
  }
  return savedTheme || 'light'
}

// 设置主题
export function setTheme(theme: Theme) {
  if (typeof window === 'undefined') return
  
  localStorage.setItem(THEME_STORAGE_KEY, theme)
  
  const currentTheme = theme === 'system' ? getSystemTheme() : theme
  document.documentElement.classList.toggle('dark', currentTheme === 'dark')
  
  // 触发自定义事件，通知其他组件主题变化
  window.dispatchEvent(new CustomEvent('theme-change', { detail: { theme: currentTheme } }))
}

// 初始化主题
export function initializeTheme() {
  if (typeof window === 'undefined') return
  
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme
  const theme = savedTheme || 'system'
  setTheme(theme)
  
  // 监听系统主题变化
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', () => {
    if (savedTheme === 'system') {
      setTheme('system')
    }
  })
}

// 获取主题图标
export function getThemeIcon(theme: Theme): string {
  switch (theme) {
    case 'light':
      return '☀️'
    case 'dark':
      return '🌙'
    case 'system':
      return '🖥️'
    default:
      return '☀️'
  }
}

// 获取下一个主题
export function getNextTheme(currentTheme: Theme): Theme {
  switch (currentTheme) {
    case 'light':
      return 'dark'
    case 'dark':
      return 'system'
    case 'system':
      return 'light'
    default:
      return 'light'
  }
} 