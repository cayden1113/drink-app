"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Activity,
  Droplet,
  UserCircle,
  Settings,
  Bluetooth,
  AlertTriangle,
  FileText,
  Leaf,
  Pill,
} from "lucide-react"
import WaterGenerator from "./water-generator"
import HealthMetrics from "./health-metrics"
import UserProfile from "./user-profile"
import DeviceConnection from "./device-connection"
import MedicalReport from "./medical-report"
import { useToast } from "@/hooks/use-toast"
import MeridianAnalysis from "./meridian-analysis"
// import RecommendationEngine from "./recommendation-engine" // 暂时注释，防止构建失败

const mockWristbandData = {
  heartRate: 72,
  steps: 8432,
  caloriesBurned: 1240,
  sleepHours: 6.5,
  hydrationLevel: 65.0,
  bodyTemperature: 36.7,
  bloodPressure: { systolic: 120, diastolic: 80 },
  oxygenSaturation: 98,
  stressLevel: 35.0,
  meridianBalance: {
    lung: 86.3,
    heart: 74.5,
    spleen: 67.3,
    liver: 62.3,
    kidney: 58.6,
  },
  yinYangBalance: 0.2,
  bloodGlucose: 5.2,
  cortisol: 14.2,
  inflammation: 2.1,
  immuneActivity: 82.0,
  electrolytes: {
    sodium: 140,
    potassium: 4.2,
    chloride: 102,
    bicarbonate: 24,
  },
}

export default function Dashboard() {
  const [isDeviceConnected, setIsDeviceConnected] = useState(false)
  const [wristbandData, setWristbandData] = useState(mockWristbandData)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  // const [recommendations, setRecommendations] = useState<any>(null)
  const { toast } = useToast()

  const connectDevice = () => {
    toast({
      title: "正在连接设备...",
      description: "请确保您的智能手环已开启并在范围内",
    })

    setTimeout(() => {
      setIsDeviceConnected(true)
      toast({
        title: "设备连接成功",
        description: "已成功连接到您的智能手环",
      })

      toast({
        title: "正在分析生理数据...",
        description: "系统正在分析您的中西医指标，请稍候",
      })

      setTimeout(() => {
        setAnalysisComplete(true)
        toast({
          title: "分析完成",
          description: "您的健康数据分析已完成，正在生成个性化水疗方案",
        })
      }, 3000)
    }, 2000)
  }

  const disconnectDevice = () => {
    setIsDeviceConnected(false)
    setAnalysisComplete(false)
    toast({
      title: "设备已断开连接",
      description: "您的智能手环已断开连接",
      variant: "destructive",
    })
  }

  useEffect(() => {
    if (!isDeviceConnected) return

    const interval = setInterval(() => {
      setWristbandData((prev) => ({
        ...prev,
        heartRate: Math.floor(prev.heartRate + (Math.random() * 4 - 2)),
        hydrationLevel: Number(Math.max(0, Math.min(100, prev.hydrationLevel + (Math.random() * 6 - 3))).toFixed(1)),
        stressLevel: Number(Math.max(0, Math.min(100, prev.stressLevel + (Math.random() * 8 - 4))).toFixed(1)),
        bodyTemperature: Number((prev.bodyTemperature + (Math.random() * 0.4 - 0.2)).toFixed(1)),
        meridianBalance: {
          lung: Number(Math.max(0, Math.min(100, prev.meridianBalance.lung + (Math.random() * 6 - 3))).toFixed(1)),
          heart: Number(Math.max(0, Math.min(100, prev.meridianBalance.heart + (Math.random() * 6 - 3))).toFixed(1)),
          spleen: Number(Math.max(0, Math.min(100, prev.meridianBalance.spleen + (Math.random() * 6 - 3))).toFixed(1)),
          liver: Number(Math.max(0, Math.min(100, prev.meridianBalance.liver + (Math.random() * 6 - 3))).toFixed(1)),
          kidney: Number(Math.max(0, Math.min(100, prev.meridianBalance.kidney + (Math.random() * 6 - 3))).toFixed(1)),
        },
        yinYangBalance: Number(Math.max(-1, Math.min(1, prev.yinYangBalance + (Math.random() * 0.2 - 0.1))).toFixed(1)),
        bloodGlucose: Number((prev.bloodGlucose + (Math.random() * 0.4 - 0.2)).toFixed(1)),
        cortisol: Number((prev.cortisol + (Math.random() * 1 - 0.5)).toFixed(1)),
        inflammation: Number((prev.inflammation + (Math.random() * 0.4 - 0.2)).toFixed(1)),
        immuneActivity: Number(Math.max(0, Math.min(100, prev.immuneActivity + (Math.random() * 6 - 3))).toFixed(1)),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [isDeviceConnected])

  // useEffect(() => {
  //   if (isDeviceConnected && analysisComplete) {
  //     const newRecommendations = RecommendationEngine.generateRecommendations(wristbandData)
  //     setRecommendations(newRecommendations)
  //   }
  // }, [wristbandData, isDeviceConnected, analysisComplete])

  return (
    <div className="max-w-6xl mx-auto">
      {/* 你的 UI 内容保持不变 */}
      {/* Tabs 下内容示例 */}
      <Tabs defaultValue="dashboard">
        <TabsList className="grid w-full grid-cols-6 mb-8 rounded-xl bg-gradient-to-r from-blue-50 to-teal-50 p-1 shadow-sm">
          <TabsTrigger value="dashboard">健康数据</TabsTrigger>
          <TabsTrigger value="water">甜润沁方</TabsTrigger>
          <TabsTrigger value="meridian">博络解析</TabsTrigger>
          <TabsTrigger value="medical">章衡报告</TabsTrigger>
          <TabsTrigger value="profile">个人档案</TabsTrigger>
          <TabsTrigger value="settings">设备设置</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <HealthMetrics data={wristbandData} isConnected={isDeviceConnected} />
        </TabsContent>
        <TabsContent value="water">
          <WaterGenerator
            healthData={wristbandData}
            isDeviceConnected={isDeviceConnected}
            analysisComplete={analysisComplete}
            recommendations={[]} // 临时传空数组防止未定义报错
          />
        </TabsContent>
        <TabsContent value="meridian">
          <MeridianAnalysis data={wristbandData} isConnected={isDeviceConnected} />
        </TabsContent>
        <TabsContent value="medical">
          <MedicalReport
            data={wristbandData}
            isConnected={isDeviceConnected}
            recommendations={[]} // 同样传空数组避免报错
          />
        </TabsContent>
        <TabsContent value="profile">
          <UserProfile />
        </TabsContent>
        <TabsContent value="settings">
          <DeviceConnection onConnect={connectDevice} onDisconnect={disconnectDevice} isConnected={isDeviceConnected} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Shield(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  )
}
