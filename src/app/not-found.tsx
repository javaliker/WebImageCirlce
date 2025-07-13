'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">🔍</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          页面未找到
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          抱歉，您访问的页面不存在。请检查URL是否正确，或返回首页。
        </p>
        <div className="space-y-3">
          <Link href="/">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              返回首页
            </Button>
          </Link>
          <Button 
            onClick={() => window.history.back()}
            variant="outline"
            className="w-full"
          >
            返回上一页
          </Button>
        </div>
      </div>
    </div>
  )
} 