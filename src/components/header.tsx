'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './theme-toggle'
import { useLanguage } from '@/contexts/LanguageContext'

export function Header() {
  const { language, setLanguage, t, mounted } = useLanguage()
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const languageMenuRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  
  const scrollToFAQ = () => {
    const faqSection = document.getElementById('faq-section')
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: 'smooth' })
    } else {
      // 如果不在首页，先跳转到首页，然后滚动到FAQ
      window.location.href = '/#faq-section'
    }
    setIsMobileMenuOpen(false)
  }

  const scrollToHowTo = () => {
    const howToSection = document.getElementById('how-to-section')
    if (howToSection) {
      howToSection.scrollIntoView({ behavior: 'smooth' })
    } else {
      // 如果不在首页，先跳转到首页，然后滚动到如何使用
      window.location.href = '/#how-to-section'
    }
    setIsMobileMenuOpen(false)
  }

  // 处理点击外部关闭菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false)
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isLanguageMenuOpen || isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isLanguageMenuOpen, isMobileMenuOpen])

  // 处理语言切换
  const handleLanguageChange = (newLanguage: 'zh' | 'en') => {
    console.log('Language change requested:', newLanguage)
    setLanguage(newLanguage)
    setIsLanguageMenuOpen(false)
  }

  // 在组件完全挂载前，使用默认的英文文本，防止水合不匹配
  const getText = (key: string) => {
    if (!mounted) {
      // 返回默认的英文文本
      const defaultTexts: Record<string, string> = {
        'nav.home': 'Home',
        'nav.help': 'Help',
        'nav.faq': 'FAQ',
        'nav.about': 'About',
        'nav.contact': 'Contact',
        'nav.blog': 'Blog'
      }
      return defaultTexts[key] || key
    }
    return t(key)
  }

  // 判断当前页面是否为指定路径
  const isActivePage = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  // 获取菜单项的样式类
  const getMenuClass = (path: string) => {
    const isActive = isActivePage(path)
    
    if (isActive) {
      return "text-blue-600 dark:text-blue-400 font-medium transition-colors no-underline"
    }
    return "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors no-underline"
  }

  // 获取移动端菜单项的样式类
  const getMobileMenuClass = (path: string) => {
    const isActive = isActivePage(path)
    
    if (isActive) {
      return "text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/20"
    }
    return "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo和产品名称 */}
        <Link 
          href="/" 
          className="flex items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer no-underline" 
          title={getText('nav.home')}
          onClick={() => console.log('Logo clicked!')}
        >
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">WC</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              ImageCircleMaker
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {mounted ? t('header.slogan') : 'Circle Avatar Maker'}
            </p>
          </div>
        </Link>

        {/* 桌面端导航菜单 */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className={getMenuClass('/')} title={getText('nav.home')}>
            {getText('nav.home')}
          </Link>
          <button onClick={scrollToHowTo} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {getText('nav.help')}
          </button>
          <button onClick={scrollToFAQ} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {getText('nav.faq')}
          </button>
          <Link href="/blog" className={getMenuClass('/blog')} title={getText('nav.blog')}>
            {getText('nav.blog')}
          </Link>
          <Link href="/contact" className={getMenuClass('/contact')} title={getText('nav.contact')}>
            {getText('nav.contact')}
          </Link>
          <Link href="/about" className={getMenuClass('/about')} title={getText('nav.about')}>
            {getText('nav.about')}
          </Link>
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

          {/* 移动端汉堡菜单按钮 */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            <div className="w-5 h-5 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
              <span className={`block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* 移动端导航菜单 */}
      {isMobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg animate-in slide-in-from-top-2 duration-200"
        >
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className={`block px-4 py-3 rounded-lg transition-colors ${getMobileMenuClass('/')}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {getText('nav.home')}
                </Link>
              </li>
              <li>
                <button 
                  onClick={scrollToHowTo}
                  className="w-full text-left px-4 py-3 rounded-lg transition-colors text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {getText('nav.help')}
                </button>
              </li>
              <li>
                <button 
                  onClick={scrollToFAQ}
                  className="w-full text-left px-4 py-3 rounded-lg transition-colors text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {getText('nav.faq')}
                </button>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className={`block px-4 py-3 rounded-lg transition-colors ${getMobileMenuClass('/blog')}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {getText('nav.blog')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className={`block px-4 py-3 rounded-lg transition-colors ${getMobileMenuClass('/contact')}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {getText('nav.contact')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className={`block px-4 py-3 rounded-lg transition-colors ${getMobileMenuClass('/about')}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {getText('nav.about')}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
} 