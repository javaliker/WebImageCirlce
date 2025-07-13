'use client'

import { useState, useRef } from 'react'
import { ImageUpload } from './image-upload'
import { CircleCrop, CropData } from './circle-crop'
import { ImageExport } from './image-export'
import { useLanguage } from '@/contexts/LanguageContext'

export function ImageEditor() {
  const { t } = useLanguage()
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [cropData, setCropData] = useState<CropData>({
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0
  })
  const [currentStep, setCurrentStep] = useState<'upload' | 'crop' | 'export'>('upload')

  // 用于裁剪页的隐藏上传
  const uploadRef = useRef<{ open: () => void }>(null)

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
      {/* 步骤内容 */}
      <div className="min-h-[500px]">
        {currentStep === 'upload' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('editor.upload.title')}
            </h2>
            <ImageUpload onImageSelect={handleImageSelect} />
            <p className="text-gray-600 dark:text-gray-400 mt-6">
              {t('editor.upload.subtitle')}
            </p>
            {/* 步骤指示器 */}
            <div className="mt-8 mb-8">
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center text-blue-600">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold bg-blue-600 text-white">
                    1
                  </div>
                  <span className="ml-2">{t('editor.upload.step1')}</span>
                </div>
                <div className="w-8 h-1 bg-gray-300"></div>
                <div className="flex items-center text-gray-400">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold bg-gray-200 dark:bg-gray-700">
                    2
                  </div>
                  <span className="ml-2">{t('editor.upload.step2')}</span>
                </div>
                <div className="w-8 h-1 bg-gray-300"></div>
                <div className="flex items-center text-gray-400">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold bg-gray-200 dark:bg-gray-700">
                    3
                  </div>
                  <span className="ml-2">{t('editor.upload.step3')}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'crop' && imageSrc && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('editor.crop.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                {t('editor.crop.subtitle')}
              </p>
            </div>
            
            <CircleCrop
              imageSrc={imageSrc}
              onCropChange={handleCropChange}
              size={300}
            />
            
            {/* 隐藏的图片上传组件，用于重新选择图片 */}
            <div style={{ display: 'none' }}>
              <ImageUpload
                ref={uploadRef as any}
                onImageSelect={handleImageSelect}
              />
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => uploadRef.current?.open()}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {t('editor.crop.reselectButton')}
              </button>
              <button
                onClick={handleExport}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                {t('editor.crop.nextButton')}
              </button>
            </div>
          </div>
        )}

        {currentStep === 'export' && selectedImage && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('editor.export.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                {t('editor.export.subtitle')}
              </p>
            </div>
            
            <ImageExport
              key={`${selectedImage.name}-${selectedImage.size}`}
              originalImage={selectedImage}
              cropData={cropData}
              size={300}
            />
            
            <div className="flex justify-center">
              <button
                onClick={handleRestart}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                {t('editor.export.restartButton')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 