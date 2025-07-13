'use client'

import Link from 'next/link'

export default function TestLinkPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Link组件测试页面</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">测试Link组件：</h2>
          <Link href="/" className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 no-underline">
            返回首页
          </Link>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">测试普通a标签：</h2>
          <a href="/" className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 no-underline">
            返回首页 (a标签)
          </a>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">测试按钮：</h2>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            返回首页 (按钮)
          </button>
        </div>
      </div>
    </div>
  )
} 