'use client'

import { useState, useRef, useEffect } from 'react'
import { ThemeToggle } from './theme-toggle'
import { useLanguage } from '@/contexts/LanguageContext'

export function Header() {
  const { language, setLanguage, t, mounted } = useLanguage()
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const languageMenuRef = useRef<HTMLDivElement>(null)
  
  const scrollToFAQ = () => {
    const faqSection = document.getElementById('faq-section')
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: 'smooth' })
    } else {
      // 如果不在首页，先跳转到首页，然后滚动到FAQ
      window.location.href = '/#faq-section'
    }
  }

  const scrollToHowTo = () => {
    const howToSection = document.getElementById('how-to-section')
    if (howToSection) {
      howToSection.scrollIntoView({ behavior: 'smooth' })
    } else {
      // 如果不在首页，先跳转到首页，然后滚动到如何使用
      window.location.href = '/#how-to-section'
    }
  }

  // 处理点击外部关闭菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false)
      }
    }

    if (isLanguageMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isLanguageMenuOpen])

  // 处理语言切换
  const handleLanguageChange = (newLanguage: 'zh' | 'en') => {
    console.log('Language change requested:', newLanguage)
    setLanguage(newLanguage)
    setIsLanguageMenuOpen(false)
  }

  // 在组件完全挂载前，使用默认的中文文本，防止水合不匹配
  const getText = (key: string) => {
    if (!mounted) {
      // 返回默认的中文文本
      const defaultTexts: Record<string, string> = {
        'nav.home': '首页',
        'nav.help': '使用帮助',
        'nav.faq': '常见问题',
        'nav.about': '关于我们',
        'nav.contact': '联系我们'
      }
      return defaultTexts[key] || key
    }
    return t(key)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo和产品名称 */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">WC</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              ImageCircleMaker
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {mounted ? t('header.slogan') : '圆形头像制作工具'}
            </p>
          </div>
        </div>

        {/* 导航菜单 */}
        <nav className="hidden md:flex space-x-8">
          <a href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" title={getText('nav.home')}>
            {getText('nav.home')}
          </a>
          <button onClick={scrollToHowTo} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {getText('nav.help')}
          </button>
          <button onClick={scrollToFAQ} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {getText('nav.faq')}
          </button>
          <a href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" title={getText('nav.blog')}>
            {getText('nav.blog')}
          </a>
          <a href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" title={getText('nav.contact')}>
            {getText('nav.contact')}
          </a>
          <a href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" title={getText('nav.about')}>
            {getText('nav.about')}
          </a>
        </nav>

        {/* 右侧导航 */}
        <div className="flex items-center space-x-2">
          {/* 主题切换按钮 */}
          <ThemeToggle />
          {/* 语言切换按钮 */}
          <div className="relative" ref={languageMenuRef}>
            <button 
              onClick={() => {
                console.log('Language menu button clicked')
                setIsLanguageMenuOpen(!isLanguageMenuOpen)
              }}
              className="w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center cursor-pointer"
            >
              <span className="text-lg">🌐</span>
            </button>
            {isLanguageMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-[9999] animate-in fade-in-0 zoom-in-95 duration-200">
                <ul className="py-2">
                  <li>
                    <button 
                      onClick={() => handleLanguageChange('en')}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${language === 'en' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-700 dark:text-gray-300'}`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">🇺🇸</span>
                        <span>English</span>
                        {language === 'en' && <span className="text-blue-600">✓</span>}
                      </div>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handleLanguageChange('zh')}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${language === 'zh' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-700 dark:text-gray-300'}`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">🇨🇳</span>
                        <span>简体中文</span>
                        {language === 'zh' && <span className="text-blue-600">✓</span>}
                      </div>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
} 