'use client'

import { useState, useRef, useCallback } from 'react'
import { Download, Settings, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CropData } from './circle-crop'

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
  const [exportSettings, setExportSettings] = useState<ExportSettings>({
    format: 'png',
    quality: 0.9,
    size: size
  })
  const [isExporting, setIsExporting] = useState(false)
  const [exportedImageUrl, setExportedImageUrl] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
        // 清空画布
        ctx.clearRect(0, 0, exportSettings.size, exportSettings.size)

        // 创建圆形裁剪路径
        ctx.save()
        ctx.beginPath()
        ctx.arc(
          exportSettings.size / 2, 
          exportSettings.size / 2, 
          exportSettings.size / 2, 
          0, 
          2 * Math.PI
        )
        ctx.clip()

        // 应用变换
        ctx.save()
        ctx.translate(exportSettings.size / 2, exportSettings.size / 2)
        ctx.rotate((cropData.rotation * Math.PI) / 180)
        ctx.scale(cropData.scale, cropData.scale)
        ctx.translate(-exportSettings.size / 2, -exportSettings.size / 2)

        // 绘制图片
        ctx.drawImage(
          img,
          cropData.x,
          cropData.y,
          size,
          size,
          0,
          0,
          exportSettings.size,
          exportSettings.size
        )

        ctx.restore()
        ctx.restore()

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
            导出设置
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 格式选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              导出格式
            </label>
            <select
              value={exportSettings.format}
              onChange={(e) => updateExportSettings({ format: e.target.value as ExportFormat })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="png">PNG (透明背景)</option>
              <option value="jpg">JPG (高质量)</option>
              <option value="webp">WebP (现代格式)</option>
            </select>
          </div>

          {/* 质量设置 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              质量: {Math.round(exportSettings.quality * 100)}%
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
              导出尺寸
            </label>
            <select
              value={exportSettings.size}
              onChange={(e) => updateExportSettings({ size: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={132}>微信头像 (132x132)</option>
              <option value={180}>微博头像 (180x180)</option>
              <option value={150}>Instagram (150x150)</option>
              <option value={400}>LinkedIn (400x400)</option>
              <option value={200}>抖音头像 (200x200)</option>
              <option value={300}>自定义 (300x300)</option>
            </select>
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
                正在导出...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                生成圆形头像
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
              导出成功
            </h3>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* 预览 */}
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                预览效果
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
                文件信息
              </h4>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>格式: {exportSettings.format.toUpperCase()}</p>
                <p>尺寸: {exportSettings.size} x {exportSettings.size}px</p>
                <p>质量: {Math.round(exportSettings.quality * 100)}%</p>
              </div>

              <Button
                onClick={downloadImage}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                下载头像
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