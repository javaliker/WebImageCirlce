'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Move, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CircleCropProps {
  imageSrc: string
  onCropChange: (cropData: CropData) => void
  size?: number
}

export interface CropData {
  x: number
  y: number
  scale: number
  rotation: number
}

const DEFAULT_SIZE = 300

export function CircleCrop({ 
  imageSrc, 
  onCropChange, 
  size = DEFAULT_SIZE 
}: CircleCropProps) {
  const [cropData, setCropData] = useState<CropData>({
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0
  })
  const [imgSize, setImgSize] = useState<{width: number, height: number}>({width: size, height: size})
  const [imgLoaded, setImgLoaded] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  // 初始化图片并设置初始居中
  useEffect(() => {
    const img = new window.Image()
    img.onload = () => {
      setImgSize({ width: img.width, height: img.height })
      setImgLoaded(true)
      
      // scale默认为1（原图大小），只在图片比画布小的时候才放大
      let initialScale = 1
      if (img.width < size && img.height < size) {
        const scaleX = size / img.width
        const scaleY = size / img.height
        initialScale = Math.min(scaleX, scaleY, 1)
      }
      // 居中定位（基于缩放后尺寸）
      const scaledWidth = img.width * initialScale
      const scaledHeight = img.height * initialScale
      const initialX = (size - scaledWidth) / 2
      const initialY = (size - scaledHeight) / 2
      const initialCropData = {
        x: initialX,
        y: initialY,
        scale: initialScale,
        rotation: 0
      }
      setCropData(initialCropData)
      onCropChange(initialCropData)
    }
    img.src = imageSrc
  }, [imageSrc, size])

  // 绘制圆形裁剪预览
  const drawCropPreview = useCallback(() => {
    if (!imgLoaded) return
    const canvas = canvasRef.current
    if (!canvas || !imageRef.current) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, size, size)
    ctx.save()
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2 - 10, 0, 2 * Math.PI)
    ctx.clip()
    ctx.save()
    ctx.translate(size / 2, size / 2)
    ctx.rotate((cropData.rotation * Math.PI) / 180)
    ctx.translate(-size / 2, -size / 2)
    ctx.drawImage(
      imageRef.current,
      0, 0, imgSize.width, imgSize.height,
      cropData.x, cropData.y,
      imgSize.width * cropData.scale,
      imgSize.height * cropData.scale
    )
    ctx.restore()
    ctx.restore()
    ctx.strokeStyle = '#3b82f6'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2 - 10, 0, 2 * Math.PI)
    ctx.stroke()
    // 控制点
    const centerX = size / 2
    const centerY = size / 2
    const radius = size / 2 - 10
    const controlPoints = [
      { x: centerX, y: centerY - radius },
      { x: centerX, y: centerY + radius },
      { x: centerX - radius, y: centerY },
      { x: centerX + radius, y: centerY }
    ]
    ctx.fillStyle = '#3b82f6'
    controlPoints.forEach(point => {
      ctx.beginPath()
      ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI)
      ctx.fill()
    })
  }, [cropData, size, imgLoaded, imgSize])

  useEffect(() => {
    drawCropPreview()
  }, [drawCropPreview])

  // 处理指针事件
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (!canvasRef.current) return
    setIsDragging(true)
    // 计算指针在canvas内的坐标
    const rect = canvasRef.current.getBoundingClientRect()
    const pointerX = e.clientX - rect.left
    const pointerY = e.clientY - rect.top
    // 记录指针点与图片左上角的差值
    setDragOffset({
      x: pointerX - cropData.x,
      y: pointerY - cropData.y
    })
  }, [cropData])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging || !canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const pointerX = e.clientX - rect.left
    const pointerY = e.clientY - rect.top
    // 拖动时，新的x/y = 指针点 - 拖动起始偏移
    const newX = pointerX - dragOffset.x
    const newY = pointerY - dragOffset.y
    const newCropData = { ...cropData, x: newX, y: newY }
    setCropData(newCropData)
    onCropChange(newCropData)
  }, [isDragging, dragOffset, cropData, onCropChange])

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    setIsDragging(false)
  }, [])

  // 处理滚轮缩放
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    const newScale = Math.max(0.1, Math.min(3, cropData.scale * delta))
    const newCropData = { ...cropData, scale: newScale }
    setCropData(newCropData)
    onCropChange(newCropData)
  }, [cropData, onCropChange])

  // 控制按钮
  const handleZoomIn = useCallback(() => {
    const newScale = Math.min(3, cropData.scale * 1.1)
    const newCropData = { ...cropData, scale: newScale }
    setCropData(newCropData)
    onCropChange(newCropData)
  }, [cropData, onCropChange])

  const handleZoomOut = useCallback(() => {
    const newScale = Math.max(0.1, cropData.scale * 0.9)
    const newCropData = { ...cropData, scale: newScale }
    setCropData(newCropData)
    onCropChange(newCropData)
  }, [cropData, onCropChange])

  const handleRotate = useCallback(() => {
    const newRotation = (cropData.rotation + 90) % 360
    const newCropData = { ...cropData, rotation: newRotation }
    setCropData(newCropData)
    onCropChange(newCropData)
  }, [cropData, onCropChange])

  const handleReset = useCallback(() => {
    // scale默认为1（原图大小），只在图片比画布小的时候才放大
    let resetScale = 1
    if (imgSize.width < size && imgSize.height < size) {
      const scaleX = size / imgSize.width
      const scaleY = size / imgSize.height
      resetScale = Math.min(scaleX, scaleY, 1)
    }
    const scaledWidth = imgSize.width * resetScale
    const scaledHeight = imgSize.height * resetScale
    const resetX = (size - scaledWidth) / 2
    const resetY = (size - scaledHeight) / 2
    const resetCropData = { x: resetX, y: resetY, scale: resetScale, rotation: 0 }
    setCropData(resetCropData)
    onCropChange(resetCropData)
  }, [onCropChange, size, imgSize])

  // 指针移出canvas也要取消拖动
  const handlePointerLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  return (
    <div className="flex justify-center items-center">
      {/* 隐藏的图片元素用于绘制 */}
      <img
        ref={imageRef}
        src={imageSrc}
        alt="原图"
        className="hidden"
        onLoad={() => setImgLoaded(true)}
      />
      {/* 裁剪预览区域 */}
      <div className="relative mx-auto">
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          className="border border-gray-300 dark:border-gray-600 rounded-lg cursor-move bg-black/10"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          onWheel={handleWheel}
        />
        {/* 操作提示 */}
        <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
          拖拽移动 · 滚轮缩放 · 右键旋转
        </div>
      </div>
      {/* 控制按钮和信息 */}
      <div className="flex flex-col items-center ml-6 space-y-2">
        <div className="flex space-x-2 mb-2">
          <Button variant="outline" size="sm" onClick={handleZoomOut} title="缩小"><ZoomOut className="w-4 h-4" /></Button>
          <Button variant="outline" size="sm" onClick={handleZoomIn} title="放大"><ZoomIn className="w-4 h-4" /></Button>
          <Button variant="outline" size="sm" onClick={handleRotate} title="旋转90度"><RotateCcw className="w-4 h-4" /></Button>
          <Button variant="outline" size="sm" onClick={handleReset} title="重置">重置</Button>
        </div>
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <p>缩放: {Math.round(cropData.scale * 100)}%</p>
          <p>旋转: {cropData.rotation}°</p>
        </div>
      </div>
    </div>
  )
} 