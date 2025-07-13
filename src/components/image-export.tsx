'use client'

import { useState, useRef, useCallback } from 'react'
import { Download, Settings, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CropData } from './circle-crop'
import { useLanguage } from '@/contexts/LanguageContext'

interface ImageExportProps {
  originalImage: File
  cropData: CropData
  size: number
}

type ExportFormat = 'png' | 'jpg' | 'webp'

interface ExportSettings {
  format: ExportFormat
  quality: number
  size: number
}

export function ImageExport({ originalImage, cropData, size }: ImageExportProps) {
  const { t } = useLanguage()
  const [exportSettings, setExportSettings] = useState<ExportSettings>({
    format: 'png',
    quality: 0.9,
    size: size
  })
  const [isExporting, setIsExporting] = useState(false)
  const [exportedImageUrl, setExportedImageUrl] = useState<string | null>(null)
  const [customSize, setCustomSize] = useState<number>(300)
  const [useCustomSize, setUseCustomSize] = useState<boolean>(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const customSizeInputRef = useRef<HTMLInputElement>(null)

  // 导出图片
  const exportImage = useCallback(async () => {
    setIsExporting(true)
    
    try {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // 设置画布尺寸
      canvas.width = exportSettings.size
      canvas.height = exportSettings.size

      // 创建图片对象
      const img = new Image()
      img.onload = () => {
        ctx.clearRect(0, 0, exportSettings.size, exportSettings.size)
        ctx.save()
        ctx.beginPath()
        ctx.arc(exportSettings.size / 2, exportSettings.size / 2, exportSettings.size / 2, 0, 2 * Math.PI)
        ctx.clip()
        ctx.save()
        ctx.translate(exportSettings.size / 2, exportSettings.size / 2)
        ctx.rotate((cropData.rotation * Math.PI) / 180)
        ctx.translate(-exportSettings.size / 2, -exportSettings.size / 2)
        // 计算缩放比例（如果导出尺寸和裁剪区尺寸不一致，需要缩放 cropData）
        const scaleRatio = exportSettings.size / size;
        ctx.drawImage(
          img,
          0, 0, img.width, img.height,
          cropData.x * scaleRatio,
          cropData.y * scaleRatio,
          img.width * cropData.scale * scaleRatio,
          img.height * cropData.scale * scaleRatio
        );
        ctx.restore();
        ctx.restore();
        // 导出图片
        let dataUrl: string
        if (exportSettings.format === 'png') {
          dataUrl = canvas.toDataURL('image/png')
        } else if (exportSettings.format === 'jpg') {
          dataUrl = canvas.toDataURL('image/jpeg', exportSettings.quality)
        } else {
          dataUrl = canvas.toDataURL('image/webp', exportSettings.quality)
        }
        setExportedImageUrl(dataUrl)
        setIsExporting(false)
      }

      img.src = URL.createObjectURL(originalImage)
    } catch (error) {
      console.error('导出失败:', error)
      setIsExporting(false)
    }
  }, [originalImage, cropData, size, exportSettings])

  // 下载图片
  const downloadImage = useCallback(() => {
    if (!exportedImageUrl) return

    const link = document.createElement('a')
    link.href = exportedImageUrl
    link.download = `avatar.${exportSettings.format}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [exportedImageUrl, exportSettings.format])

  // 更新导出设置
  const updateExportSettings = useCallback((updates: Partial<ExportSettings>) => {
    setExportSettings(prev => ({ ...prev, ...updates }))
  }, [])

  return (
    <div className="space-y-6">
      {/* 导出设置 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('editor.export.settings')}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 格式选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('editor.export.format')}
            </label>
            <select
              value={exportSettings.format}
              onChange={(e) => updateExportSettings({ format: e.target.value as ExportFormat })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="png">{t('editor.export.formats.png')}</option>
              <option value="jpg">{t('editor.export.formats.jpg')}</option>
              <option value="webp">{t('editor.export.formats.webp')}</option>
            </select>
          </div>

          {/* 质量设置 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('editor.export.quality')}: {Math.round(exportSettings.quality * 100)}%
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={exportSettings.quality}
              onChange={(e) => updateExportSettings({ quality: parseFloat(e.target.value) })}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* 尺寸设置 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('editor.export.size')}
            </label>
            <div className="space-y-2">
              <select
                value={useCustomSize ? 'custom' : exportSettings.size}
                onChange={(e) => {
                  if (e.target.value === 'custom') {
                    setUseCustomSize(true)
                    updateExportSettings({ size: customSize })
                  } else {
                    setUseCustomSize(false)
                    updateExportSettings({ size: parseInt(e.target.value) })
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={150}>{t('editor.export.sizes.instagram')}</option>
                <option value={400}>{t('editor.export.sizes.linkedin')}</option>
                <option value={170}>{t('editor.export.sizes.facebook')}</option>
                <option value={400}>{t('editor.export.sizes.twitter')}</option>
                <option value={200}>{t('editor.export.sizes.tiktok')}</option>
                <option value={800}>{t('editor.export.sizes.youtube')}</option>
                <option value={128}>{t('editor.export.sizes.discord')}</option>
                <option value={512}>{t('editor.export.sizes.telegram')}</option>
                <option value={192}>{t('editor.export.sizes.whatsapp')}</option>
                <option value={320}>{t('editor.export.sizes.snapchat')}</option>
                <option value={165}>{t('editor.export.sizes.pinterest')}</option>
                <option value={256}>{t('editor.export.sizes.reddit')}</option>
                <option value={400}>{t('editor.export.sizes.github')}</option>
                <option value={512}>{t('editor.export.sizes.slack')}</option>
                <option value={96}>{t('editor.export.sizes.zoom')}</option>
                <option value={400}>{t('editor.export.sizes.resume')}</option>
                <option value={300}>{t('editor.export.sizes.website')}</option>
                <option value="custom">{t('editor.export.sizes.custom')}</option>
              </select>
              
              {useCustomSize && (
                <div className="flex items-center space-x-2">
                  <input
                    ref={customSizeInputRef}
                    type="number"
                    min="50"
                    max="2000"
                    value={customSize}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 300
                      setCustomSize(value)
                      updateExportSettings({ size: value })
                    }}
                    onFocus={() => {
                      // 使用setTimeout确保在DOM更新后执行选中
                      setTimeout(() => {
                        if (customSizeInputRef.current) {
                          customSizeInputRef.current.select()
                        }
                      }, 0)
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('editor.export.customSize') + ' (50-2000)'}
                  />
                  <span className="text-sm text-gray-500 dark:text-gray-400">px</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 导出按钮 */}
        <div className="mt-6">
          <Button
            onClick={exportImage}
            disabled={isExporting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isExporting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {t('editor.export.exporting')}
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                {t('editor.export.exportButton')}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* 导出预览 */}
      {exportedImageUrl && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Check className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('editor.export.success')}
            </h3>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* 预览 */}
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('editor.export.preview')}
              </h4>
              <div className="w-32 h-32 mx-auto">
                <img
                  src={exportedImageUrl}
                  alt="导出预览"
                  className="w-full h-full object-cover rounded-full border-2 border-gray-200 dark:border-gray-600"
                />
              </div>
            </div>

            {/* 下载信息 */}
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('editor.export.fileInfo')}
              </h4>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>{t('editor.export.format')}: {exportSettings.format.toUpperCase()}</p>
                <p>{t('editor.export.size')}: {exportSettings.size} x {exportSettings.size}px</p>
                <p>{t('editor.export.quality')}: {Math.round(exportSettings.quality * 100)}%</p>
              </div>

              <Button
                onClick={downloadImage}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                {t('editor.export.downloadButton')}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 隐藏的Canvas用于导出 */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
} 