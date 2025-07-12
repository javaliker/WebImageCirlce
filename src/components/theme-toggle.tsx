'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Theme, getCurrentTheme, setTheme, getNextTheme, getThemeIcon } from '@/lib/theme'

export function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('system')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // 从localStorage获取保存的主题
    const savedTheme = localStorage.getItem('imagecirclemaker-theme') as Theme
    setCurrentTheme(savedTheme || 'system')
    
    // 监听主题变化事件
    const handleThemeChange = () => {
      const savedTheme = localStorage.getItem('imagecirclemaker-theme') as Theme
      setCurrentTheme(savedTheme || 'system')
    }
    
    window.addEventListener('theme-change', handleThemeChange)
    
    // 监听键盘快捷键
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault()
        const nextTheme = getNextTheme(currentTheme)
        setTheme(nextTheme)
        setCurrentTheme(nextTheme)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('theme-change', handleThemeChange)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentTheme])

  const handleThemeToggle = () => {
    const nextTheme = getNextTheme(currentTheme)
    setTheme(nextTheme)
    setCurrentTheme(nextTheme)
  }

  // 防止服务端渲染不匹配
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="w-10 h-10 rounded-lg"
        disabled
      >
        <span className="text-lg">☀️</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleThemeToggle}
      className="w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      title={`切换主题 (Ctrl+T) - 当前: ${currentTheme === 'system' ? '跟随系统' : currentTheme === 'light' ? '浅色' : '深色'}`}
    >
      <span className="text-lg transition-transform hover:scale-110">
        {getThemeIcon(currentTheme)}
      </span>
    </Button>
  )
} 