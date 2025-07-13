'use client'

import { Mail } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export function ContactContent() {
  const { t, mounted } = useLanguage()

  // 在组件完全挂载前，使用默认的中文文本，防止水合不匹配
  const getText = (key: string) => {
    if (!mounted) {
      // 返回默认的中文文本
      const defaultTexts: Record<string, string> = {
        'contact.title': '联系我们',
        'contact.subtitle': '我们随时为您提供帮助和支持',
        'contact.info.title': '联系方式',
        'contact.info.email.title': '邮箱',
        'contact.info.email.description': '发送邮件给我们',
        'contact.faq.title': '常见问题',
        'contact.faq.subtitle': '查看我们的FAQ页面获取更多帮助',
        'contact.faq.link': '查看FAQ',
      }
      return defaultTexts[key] || key
    }
    return t(key)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
        {getText('contact.title')}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        {getText('contact.subtitle')}
      </p>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {getText('contact.info.title')}
        </h2>
        <div className="flex items-center space-x-4 mb-2">
          <Mail className="w-5 h-5 text-blue-500" />
          <span className="font-medium text-gray-900 dark:text-white">
            {getText('contact.info.email.title')}:
          </span>
          <a
            href="mailto:support@imagecirclemaker.com"
            className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
          >
            support@imagecirclemaker.com
          </a>
        </div>
        <p className="text-gray-500 dark:text-gray-400 ml-9">
          {getText('contact.info.email.description')}
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {getText('contact.faq.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          {getText('contact.faq.subtitle')}
        </p>
        <a
          href="/"
          className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
        >
          {getText('contact.faq.link')}
        </a>
      </div>
    </div>
  )
} 