"use client"

import type React from "react"

import { useEffect, useState } from "react"
import {
  ResponsiveContainer,
  BarChart,
  Bar as RechartsBar,
  LineChart,
  Line as RechartsLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  type TooltipProps,
} from "recharts"

interface ChartTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
}

export const ChartTooltipContent = ({ active, payload, label }: ChartTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border rounded-md shadow-md p-2">
        <p className="font-bold">{`${label}`}</p>
        {payload.map((item, index) => (
          <p key={`item-${index}`} className="text-gray-700">
            {`${item.name}: ${item.value}`}
          </p>
        ))}
      </div>
    )
  }

  return null
}

interface ChartContainerProps {
  children: React.ReactNode
  config?: any
  className?: string
}

export const ChartContainer = ({ children, config, className }: ChartContainerProps) => {
  return <div className={`w-full h-full ${className}`}>{children}</div>
}

interface BarProps {
  data: any[]
  valueKey: string
  categoryKey: string
  tooltip?: React.ReactNode
}

export const Bar = ({ data, valueKey, categoryKey, tooltip }: BarProps) => {
  // 使用客户端组件状态来确保只在客户端渲染
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="w-full h-full flex items-center justify-center">加载图表中...</div>
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey={categoryKey} />
        <YAxis />
        <Tooltip content={tooltip as React.FunctionComponent<TooltipProps<any, any>>} />
        <RechartsBar dataKey={valueKey} fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

interface LineProps {
  data: any[]
  valueKey: string
  categoryKey: string
  tooltip?: React.ReactNode
  color?: string
}

export const Line = ({ data, valueKey, categoryKey, tooltip, color = "#ef4444" }: LineProps) => {
  // 使用客户端组件状态来确保只在客户端渲染
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="w-full h-full flex items-center justify-center">加载图表中...</div>
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey={categoryKey} />
        <YAxis />
        <Tooltip content={tooltip as React.FunctionComponent<TooltipProps<any, any>>} />
        <RechartsLine
          type="monotone"
          dataKey={valueKey}
          stroke={color}
          strokeWidth={2}
          dot={{ r: 4, strokeWidth: 1 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
