'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ImageEditor } from '@/components/image-editor'

export default function HomePage() {
  const [showEditor, setShowEditor] = useState(false)

  return (
    <>
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            ImageCircleMaker
            <span className="block text-2xl md:text-3xl font-normal text-blue-600 dark:text-blue-400 mt-2">
              免费在线圆形头像制作工具
            </span>
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              onClick={() => setShowEditor(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg"
            >
              开始制作圆形头像
            </Button>
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg text-lg">
              查看使用教程
            </Button>
          </div>
          {showEditor && (
            <div className="mt-8 mb-16">
              <ImageEditor />
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 mx-auto">
                🔒
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">无需注册</h3>
              <p className="text-gray-600 dark:text-gray-300">即开即用，保护隐私，所有图片在本地处理</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 mx-auto">
                🌍
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">多平台支持</h3>
              <p className="text-gray-600 dark:text-gray-300">微信、微博、Instagram、LinkedIn等20+平台</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 mx-auto">
                🎨
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">专业编辑</h3>
              <p className="text-gray-600 dark:text-gray-300">滤镜、边框、尺寸调整等丰富功能</p>
            </div>
          </div>
          
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">如何使用？</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  1
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">上传图片</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">支持拖拽、点击、粘贴</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  2
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">选择尺寸</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">平台预设尺寸</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  3
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">调整裁剪</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">拖拽缩放调整</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  4
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">应用滤镜</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">选择滤镜效果</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  5
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">预览下载</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">查看效果下载</p>
              </div>
            </div>
          </div>
          
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              立即开始制作您的圆形头像
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              无需注册，免费使用，保护隐私
            </p>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg"
              onClick={() => setShowEditor(true)}
            >
              开始制作
            </Button>
          </div>
        </div>
        {/* 编辑器区域 */}
        {showEditor && (
          <div className="mt-24">
            <ImageEditor />
          </div>
        )}
      </div>
      
      <footer className="bg-gray-800 text-white py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 ImageCircleMaker. All rights reserved.</p>
          <p className="mt-2 text-gray-400">免费在线圆形头像制作工具</p>
        </div>
      </footer>
    </>
  )
} 