'use client'

import { useState, useRef, useCallback, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'

interface ImageUploadProps {
  onImageSelect: (file: File) => void
  maxSize?: number // 最大文件大小（MB）
  acceptedFormats?: string[]
}

const DEFAULT_MAX_SIZE = 10 // 10MB
const DEFAULT_ACCEPTED_FORMATS = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']

export const ImageUpload = forwardRef(function ImageUpload({ 
  onImageSelect, 
  maxSize = DEFAULT_MAX_SIZE, 
  acceptedFormats = DEFAULT_ACCEPTED_FORMATS 
}: ImageUploadProps, ref) {
  const { t } = useLanguage()
  const [isDragOver, setIsDragOver] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 暴露open方法给父组件
  useImperativeHandle(ref, () => ({
    open: () => {
      if (fileInputRef.current) {
        fileInputRef.current.value = '' // 重置value，确保即使选择同一文件也能触发onChange
        fileInputRef.current.click()
      }
    }
  }))

  // 验证文件
  const validateFile = useCallback((file: File): string | null => {
    // 检查文件格式
    if (!acceptedFormats.includes(file.type)) {
      const formats = acceptedFormats.map(f => f.split('/')[1]).join(', ')
      return t('editor.upload.errors.unsupportedFormat').replace('{formats}', formats)
    }

    // 检查文件大小
    if (file.size > maxSize * 1024 * 1024) {
      return t('editor.upload.errors.fileTooLarge').replace('{maxSize}', maxSize.toString())
    }

    return null
  }, [acceptedFormats, maxSize, t])

  // 优化图片质量（针对移动端拍照）
  const optimizeImage = useCallback((file: File): Promise<File> => {
    return new Promise((resolve) => {
      const img = new Image()
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      img.onload = () => {
        // 计算最佳预览尺寸（保持宽高比）
        const maxPreviewSize = 800 // 最大预览尺寸
        let { width, height } = img
        
        // 如果图片尺寸过大，进行缩放
        if (width > maxPreviewSize || height > maxPreviewSize) {
          const ratio = Math.min(maxPreviewSize / width, maxPreviewSize / height)
          width = Math.round(width * ratio)
          height = Math.round(height * ratio)
        }
        
        // 设置canvas尺寸
        canvas.width = width
        canvas.height = height
        
        // 绘制图片（使用高质量设置）
        if (ctx) {
          // 启用图像平滑
          ctx.imageSmoothingEnabled = true
          ctx.imageSmoothingQuality = 'high'
          
          // 绘制图片
          ctx.drawImage(img, 0, 0, width, height)
        }
        
        // 转换为Blob
        canvas.toBlob((blob) => {
          if (blob) {
            // 创建新的File对象
            const optimizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            })
            resolve(optimizedFile)
          } else {
            resolve(file) // 如果转换失败，返回原文件
          }
        }, file.type, 0.9) // 保持90%质量
      }
      
      img.src = URL.createObjectURL(file)
    })
  }, [])

  // 处理文件选择
  const handleFileSelect = useCallback(async (file: File) => {
    setError(null)
    setIsProcessing(true)
    
    try {
      const validationError = validateFile(file)
      if (validationError) {
        setError(validationError)
        setIsProcessing(false)
        return
      }

      // 优化图片质量（特别是移动端拍照的图片）
      const optimizedFile = await optimizeImage(file)
      
      // 创建预览
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
        setIsProcessing(false)
      }
      reader.readAsDataURL(optimizedFile)

      // 通知父组件（传递优化后的文件）
      onImageSelect(optimizedFile)
    } catch (error) {
      console.error('图片处理失败:', error)
      setError('图片处理失败，请重试')
      setIsProcessing(false)
    }
  }, [validateFile, optimizeImage, onImageSelect])

  // 处理拖拽事件
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }, [handleFileSelect])

  // 处理点击上传
  const handleClickUpload = useCallback(() => {
    if (!isProcessing) {
      fileInputRef.current?.click()
    }
  }, [isProcessing])

  // 处理文件输入变化
  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
    // 重置input的value，确保下次选择同一文件也能触发onChange
    e.target.value = ''
  }, [handleFileSelect])

  // 处理粘贴事件
  const handlePaste = useCallback((e: ClipboardEvent) => {
    const items = Array.from(e.clipboardData?.items || [])
    const imageItem = items.find(item => item.type.startsWith('image/'))
    
    if (imageItem) {
      const file = imageItem.getAsFile()
      if (file) {
        handleFileSelect(file)
      }
    }
  }, [handleFileSelect])

  // 监听粘贴事件
  useEffect(() => {
    document.addEventListener('paste', handlePaste)
    return () => {
      document.removeEventListener('paste', handlePaste)
    }
  }, [handlePaste])

  // 清除预览
  const clearPreview = useCallback(() => {
    setPreview(null)
    setError(null)
    setIsProcessing(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  if (preview) {
    return (
      <div className="relative">
        <div className="relative w-full max-w-md mx-auto">
          <img 
            src={preview} 
            alt="预览" 
            className="w-full h-64 md:h-80 object-contain rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
            style={{
              imageRendering: '-webkit-optimize-contrast'
            }}
          />
          <Button
            onClick={clearPreview}
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 w-8 h-8 rounded-full"
            disabled={isProcessing}
          >
            <X className="w-4 h-4" />
          </Button>
          {isProcessing && (
            <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
              <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 text-sm">
                处理中...
              </div>
            </div>
          )}
        </div>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
          {t('editor.upload.previewText')}
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragOver 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClickUpload}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats.join(',')}
          onChange={handleFileInputChange}
          className="hidden"
          capture="environment" // 移动端优先使用后置摄像头
        />
        
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            {isProcessing ? (
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <ImageIcon className="w-8 h-8 text-gray-400" />
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {isProcessing ? '处理中...' : t('editor.upload.uploadButton')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('editor.upload.dragText')}
            </p>
            
            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <p>{t('editor.upload.supportedFormats')}</p>
              <p>{t('editor.upload.maxSize')}</p>
              <p>{t('editor.upload.pasteTip')}</p>
              <p className="text-blue-600 dark:text-blue-400">
                💡 移动端拍照自动优化图片质量
              </p>
            </div>
          </div>
          
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isProcessing}
          >
            <Upload className="w-4 h-4 mr-2" />
            {isProcessing ? '处理中...' : t('editor.upload.uploadButton')}
          </Button>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}
    </div>
  )
}) 