'use client'

import { useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export function MetadataUpdater() {
  const { language, t } = useLanguage()

  useEffect(() => {
    // 动态更新页面标题和描述
    const title = t('meta.title')
    const description = t('meta.description')
    
    // 更新 document.title
    document.title = title
    
    // 更新 meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', description)
    }
    
    // 更新 Open Graph 标签
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', title)
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) {
      ogDescription.setAttribute('content', description)
    }
    
    // 更新 Twitter 标签
    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title)
    }
    
    const twitterDescription = document.querySelector('meta[name="twitter:description"]')
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description)
    }
    
    // 更新 html lang 属性
    document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN'
    
  }, [language, t])

  // 这个组件不渲染任何内容
  return null
} 