'use client'

import { ThemeToggle } from './theme-toggle'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo和产品名称 */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">WC</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              WebImageCircle
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              圆形头像制作工具
            </p>
          </div>
        </div>

        {/* 右侧导航 */}
        <div className="flex items-center space-x-2">
          {/* 主题切换按钮 */}
          <ThemeToggle />
          
          {/* 语言切换按钮 */}
          <button className="w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center">
            <span className="text-lg">🌐</span>
          </button>
          
          {/* 帮助按钮 */}
          <button className="w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center">
            <span className="text-lg">❓</span>
          </button>
        </div>
      </div>
    </header>
  )
} 