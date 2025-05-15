"use client"

import { useEffect, useRef } from "react"
import { Droplet } from "lucide-react"

interface Element {
  id: string
  name: string
  color: string
  maxLevel: number
  category?: string
}

interface WaterVisualizationProps {
  elements: Element[]
  levels: Record<string, number>
}

export default function WaterVisualization({ elements, levels }: WaterVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // 设置高DPI画布
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // 清除画布
    ctx.clearRect(0, 0, rect.width, rect.height)

    // 绘制水基础 - 使用更高级的渐变
    const gradient = ctx.createRadialGradient(
      rect.width / 2,
      rect.height / 2,
      0,
      rect.width / 2,
      rect.height / 2,
      rect.width / 2,
    )
    gradient.addColorStop(0, "rgba(236, 252, 255, 0.9)")
    gradient.addColorStop(0.7, "rgba(224, 242, 254, 0.8)")
    gradient.addColorStop(1, "rgba(186, 230, 253, 0.7)")

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, rect.width, rect.height)

    // 分离中医和西医元素
    const tcmElements = elements.filter((e) => e.category === "tcm" && levels[e.id] > 0)
    const westernElements = elements.filter((e) => e.category === "western" && levels[e.id] > 0)

    // 计算总活性成分量
    const totalTCM = tcmElements.reduce((sum, e) => sum + levels[e.id], 0)
    const totalWestern = westernElements.reduce((sum, e) => sum + levels[e.id], 0)
    const total = totalTCM + totalWestern

    // 如果有活性成分，绘制阴阳分区
    if (total > 0) {
      const tcmRatio = totalTCM / total

      // 绘制阴阳分区背景 - 使用更精细的渐变
      ctx.save()
      ctx.globalAlpha = 0.15

      // 阴区域（中医）
      const tcmGradient = ctx.createLinearGradient(0, 0, rect.width * tcmRatio, rect.height)
      tcmGradient.addColorStop(0, "#10b981")
      tcmGradient.addColorStop(1, "#059669")
      ctx.fillStyle = tcmGradient
      ctx.fillRect(0, 0, rect.width * tcmRatio, rect.height)

      // 阳区域（西医）
      const westernGradient = ctx.createLinearGradient(rect.width * tcmRatio, 0, rect.width, rect.height)
      westernGradient.addColorStop(0, "#3b82f6")
      westernGradient.addColorStop(1, "#2563eb")
      ctx.fillStyle = westernGradient
      ctx.fillRect(rect.width * tcmRatio, 0, rect.width * (1 - tcmRatio), rect.height)

      // 添加阴阳分界线
      if (tcmRatio > 0 && tcmRatio < 1) {
        ctx.beginPath()
        ctx.moveTo(rect.width * tcmRatio, 0)
        ctx.lineTo(rect.width * tcmRatio, rect.height)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
        ctx.lineWidth = 1
        ctx.stroke()
      }

      ctx.restore()
    }

    // 为每个元素绘制粒子效果
    elements.forEach((element) => {
      const level = levels[element.id]
      if (level <= 0) return

      const particleCount = Math.floor((level / element.maxLevel) * 25) + 5
      const baseSize = Math.min(rect.width, rect.height) / 30

      // 创建渐变色
      const color = element.color
      const rgbMatch = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
      let r, g, b
      if (rgbMatch) {
        r = Number.parseInt(rgbMatch[1], 16)
        g = Number.parseInt(rgbMatch[2], 16)
        b = Number.parseInt(rgbMatch[3], 16)
      } else {
        // 默认颜色
        r = 100
        g = 100
        b = 255
      }

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * rect.width
        const y = Math.random() * rect.height
        const size = (Math.random() * baseSize + baseSize * 0.5) * ((level / element.maxLevel) * 0.7 + 0.3)

        // 使用径向渐变创建更真实的粒子
        const particleGradient = ctx.createRadialGradient(x, y, 0, x, y, size)

        // 内部更亮，外部更透明
        particleGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.8)`)
        particleGradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, 0.4)`)
        particleGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

        ctx.fillStyle = particleGradient
        ctx.beginPath()
        ctx.arc(x, y, size, 0, 2 * Math.PI)
        ctx.fill()
      }
    })

    // 添加水波纹效果
    const drawWave = (yOffset: number, amplitude: number, frequency: number, speed: number, time: number) => {
      ctx.beginPath()
      ctx.moveTo(0, yOffset)

      for (let x = 0; x < rect.width; x++) {
        const y = yOffset + Math.sin(x * frequency + time * speed) * amplitude
        ctx.lineTo(x, y)
      }

      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
      ctx.lineWidth = 1.5
      ctx.stroke()
    }

    const time = Date.now() / 1000
    drawWave(rect.height * 0.3, 3, 0.02, 1, time)
    drawWave(rect.height * 0.5, 4, 0.03, 0.8, time)
    drawWave(rect.height * 0.7, 2.5, 0.01, 1.2, time)

    // 添加光晕效果
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const glowRadius = Math.min(rect.width, rect.height) * 0.4

    const glowGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowRadius)
    glowGradient.addColorStop(0, "rgba(255, 255, 255, 0.4)")
    glowGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.1)")
    glowGradient.addColorStop(1, "rgba(255, 255, 255, 0)")

    ctx.fillStyle = glowGradient
    ctx.beginPath()
    ctx.arc(centerX, centerY, glowRadius, 0, 2 * Math.PI)
    ctx.fill()

    // 添加水滴图标
    const dropSize = Math.min(rect.width, rect.height) * 0.15
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
    ctx.beginPath()
    ctx.arc(centerX, centerY, dropSize, 0, 2 * Math.PI)
    ctx.fill()

    // 添加分子式
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
    ctx.font = "bold 14px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("H₂O+", centerX, centerY)

    // 请求动画帧以创建动态效果
    const animationId = requestAnimationFrame(() => {
      if (canvas) {
        // 重新渲染以创建动态效果
      }
    })

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [elements, levels])

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={240}
        height={240}
        className="rounded-lg shadow-lg border border-blue-100"
        style={{ width: "240px", height: "240px" }}
      />
      <div className="absolute top-2 right-2 flex space-x-1">
        <Droplet className="h-6 w-6 text-blue-400 drop-shadow-md" />
      </div>
      <div className="absolute bottom-2 right-2 text-xs bg-white/70 px-2 py-1 rounded-full text-blue-600 font-mono shadow-sm">
        H<sub>2</sub>O+
      </div>
    </div>
  )
}
