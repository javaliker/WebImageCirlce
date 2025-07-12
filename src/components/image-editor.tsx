'use client'

import { useState } from 'react'
import { ImageUpload } from './image-upload'
import { CircleCrop, CropData } from './circle-crop'
import { ImageExport } from './image-export'

export function ImageEditor() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [cropData, setCropData] = useState<CropData>({
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0
  })
  const [currentStep, setCurrentStep] = useState<'upload' | 'crop' | 'export'>('upload')

  // 处理图片选择
  const handleImageSelect = (file: File) => {
    setSelectedImage(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      setImageSrc(e.target?.result as string)
      setCurrentStep('crop')
    }
    reader.readAsDataURL(file)
  }

  // 处理裁剪数据变化
  const handleCropChange = (newCropData: CropData) => {
    setCropData(newCropData)
  }

  // 进入导出步骤
  const handleExport = () => {
    setCurrentStep('export')
  }

  // 重新开始
  const handleRestart = () => {
    setSelectedImage(null)
    setImageSrc(null)
    setCropData({ x: 0, y: 0, scale: 1, rotation: 0 })
    setCurrentStep('upload')
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* 步骤指示器 */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          <div className={`flex items-center ${currentStep === 'upload' ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              currentStep === 'upload' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
            }`}>
              1
            </div>
            <span className="ml-2">上传图片</span>
          </div>
          
          <div className={`w-8 h-1 ${currentStep === 'crop' || currentStep === 'export' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          
          <div className={`flex items-center ${currentStep === 'crop' ? 'text-blue-600' : currentStep === 'export' ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              currentStep === 'crop' ? 'bg-blue-600 text-white' : currentStep === 'export' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
            }`}>
              2
            </div>
            <span className="ml-2">裁剪调整</span>
          </div>
          
          <div className={`w-8 h-1 ${currentStep === 'export' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
          
          <div className={`flex items-center ${currentStep === 'export' ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              currentStep === 'export' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
            }`}>
              3
            </div>
            <span className="ml-2">导出下载</span>
          </div>
        </div>
      </div>

      {/* 步骤内容 */}
      <div className="min-h-[500px]">
        {currentStep === 'upload' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              上传您的图片
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              支持拖拽、点击或粘贴上传图片
            </p>
            <ImageUpload onImageSelect={handleImageSelect} />
          </div>
        )}

        {currentStep === 'crop' && imageSrc && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                调整圆形裁剪
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                拖拽移动图片，滚轮缩放，按钮旋转
              </p>
            </div>
            
            <CircleCrop
              imageSrc={imageSrc}
              onCropChange={handleCropChange}
              size={300}
            />
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleRestart}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                重新选择图片
              </button>
              <button
                onClick={handleExport}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                下一步：导出头像
              </button>
            </div>
          </div>
        )}

        {currentStep === 'export' && selectedImage && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                导出圆形头像
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                选择格式、质量和尺寸，生成完美头像
              </p>
            </div>
            
            <ImageExport
              originalImage={selectedImage}
              cropData={cropData}
              size={300}
            />
            
            <div className="flex justify-center">
              <button
                onClick={handleRestart}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                制作新头像
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 