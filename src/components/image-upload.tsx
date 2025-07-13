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

  // 处理文件选择
  const handleFileSelect = useCallback((file: File) => {
    setError(null)
    
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    // 创建预览
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // 通知父组件
    onImageSelect(file)
  }, [validateFile, onImageSelect])

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
    fileInputRef.current?.click()
  }, [])

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
            className="w-full h-64 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700"
          />
          <Button
            onClick={clearPreview}
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 w-8 h-8 rounded-full"
          >
            <X className="w-4 h-4" />
          </Button>
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
        />
        
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-gray-400" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t('editor.upload.uploadButton')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('editor.upload.dragText')}
            </p>
            
            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <p>{t('editor.upload.supportedFormats')}</p>
              <p>{t('editor.upload.maxSize')}</p>
              <p>{t('editor.upload.pasteTip')}</p>
            </div>
          </div>
          
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Upload className="w-4 h-4 mr-2" />
            {t('editor.upload.uploadButton')}
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