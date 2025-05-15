"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, Droplet, UserCircle, Settings, Bluetooth, AlertTriangle, FileText, Leaf, Pill } from "lucide-react"
import WaterGenerator from "./water-generator"
import HealthMetrics from "./health-metrics"
import UserProfile from "./user-profile"
import DeviceConnection from "./device-connection"
import MedicalReport from "./medical-report"
import { useToast } from "@/hooks/use-toast"
import RecommendationEngine from "./recommendation-engine"
import MeridianAnalysis from "./meridian-analysis"

// 模拟智能手环数据 - 扩展版
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
  // 中医相关指标
  meridianBalance: {
    lung: 86.3,
    heart: 74.5,
    spleen: 67.3,
    liver: 62.3,
    kidney: 58.6,
  },
  yinYangBalance: 0.2, // -1到1，0是平衡，负值偏阴，正值偏阳
  // 西医相关指标
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
  const [activeTab, setActiveTab] = useState("dashboard")
  const [recommendations, setRecommendations] = useState<any>(null)
  const { toast } = useToast()
  const [analysisComplete, setAnalysisComplete] = useState(false)

  // 模拟连接智能手环
  const connectDevice = () => {
    toast({
      title: "正在连接设备...",
      description: "请确保您的智能手环已开启并在范围内",
    })

    // 模拟连接延迟
    setTimeout(() => {
      setIsDeviceConnected(true)
      toast({
        title: "设备连接成功",
        description: "已成功连接到您的智能手环",
      })

      // 模拟分析过程
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

  // 模拟断开连接
  const disconnectDevice = () => {
    setIsDeviceConnected(false)
    setAnalysisComplete(false)
    toast({
      title: "设备已断开连接",
      description: "您的智能手环已断开连接",
      variant: "destructive",
    })
  }

  // 模拟数据更新
  useEffect(() => {
    if (!isDeviceConnected) return

    const interval = setInterval(() => {
      setWristbandData((prev) => ({
        ...prev,
        heartRate: Math.floor(prev.heartRate + (Math.random() * 4 - 2)),
        hydrationLevel: Number(Math.max(0, Math.min(100, prev.hydrationLevel + (Math.random() * 6 - 3))).toFixed(1)),
        stressLevel: Number(Math.max(0, Math.min(100, prev.stressLevel + (Math.random() * 8 - 4))).toFixed(1)),
        bodyTemperature: Number((prev.bodyTemperature + (Math.random() * 0.4 - 0.2)).toFixed(1)),
        // 中医指标波动
        meridianBalance: {
          lung: Number(Math.max(0, Math.min(100, prev.meridianBalance.lung + (Math.random() * 6 - 3))).toFixed(1)),
          heart: Number(Math.max(0, Math.min(100, prev.meridianBalance.heart + (Math.random() * 6 - 3))).toFixed(1)),
          spleen: Number(Math.max(0, Math.min(100, prev.meridianBalance.spleen + (Math.random() * 6 - 3))).toFixed(1)),
          liver: Number(Math.max(0, Math.min(100, prev.meridianBalance.liver + (Math.random() * 6 - 3))).toFixed(1)),
          kidney: Number(Math.max(0, Math.min(100, prev.meridianBalance.kidney + (Math.random() * 6 - 3))).toFixed(1)),
        },
        yinYangBalance: Number(Math.max(-1, Math.min(1, prev.yinYangBalance + (Math.random() * 0.2 - 0.1))).toFixed(1)),
        // 西医指标波动
        bloodGlucose: Number((prev.bloodGlucose + (Math.random() * 0.4 - 0.2)).toFixed(1)),
        cortisol: Number((prev.cortisol + (Math.random() * 1 - 0.5)).toFixed(1)),
        inflammation: Number((prev.inflammation + (Math.random() * 0.4 - 0.2)).toFixed(1)),
        immuneActivity: Number(Math.max(0, Math.min(100, prev.immuneActivity + (Math.random() * 6 - 3))).toFixed(1)),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [isDeviceConnected])

  // 生成水分推荐
  useEffect(() => {
    if (isDeviceConnected && analysisComplete) {
      const newRecommendations = RecommendationEngine.generateRecommendations(wristbandData)
      setRecommendations(newRecommendations)
    }
  }, [wristbandData, isDeviceConnected, analysisComplete])

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card
          className={`${wristbandData.hydrationLevel < 50 ? "border-red-300 bg-gradient-to-br from-red-50 to-white" : "bg-gradient-to-br from-blue-50 to-white"} shadow-md hover:shadow-lg transition-shadow duration-300`}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Droplet
                className={`mr-2 h-4 w-4 ${wristbandData.hydrationLevel < 50 ? "text-red-500" : "text-blue-500"}`}
              />
              水分水平
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="w-full bg-gray-200 h-2 rounded-full mb-2 overflow-hidden">
                <div
                  className={`h-full rounded-full ${wristbandData.hydrationLevel < 50 ? "bg-red-500" : "bg-blue-500"}`}
                  style={{ width: `${wristbandData.hydrationLevel}%` }}
                ></div>
              </div>
              <span className="text-xl font-bold">
                {isDeviceConnected ? `${Number(wristbandData.hydrationLevel).toFixed(1)}%` : "--"}
              </span>
              <Droplet
                className={`h-5 w-5 mt-1 ${wristbandData.hydrationLevel < 50 ? "text-red-500" : "text-blue-500"}`}
              />
              {wristbandData.hydrationLevel < 50 && isDeviceConnected && (
                <p className="text-xs text-red-500 mt-1 flex items-center">
                  <AlertTriangle className="h-3 w-3 mr-1" /> 水分水平偏低
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-white shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Leaf className="mr-2 h-4 w-4 text-emerald-500" />
              阴阳平衡
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="w-full bg-gray-200 h-2 rounded-full mb-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-red-400 rounded-full"
                  style={{
                    width: `50%`,
                    marginLeft: `${wristbandData.yinYangBalance <= 0 ? 0 : 50}%`,
                  }}
                ></div>
              </div>
              <span className="text-lg font-medium">
                {isDeviceConnected
                  ? wristbandData.yinYangBalance > 0.3
                    ? "偏阳"
                    : wristbandData.yinYangBalance < -0.3
                      ? "偏阴"
                      : "平衡"
                  : "--"}
              </span>
              <Leaf className="h-5 w-5 mt-1 text-emerald-500" />
              <span className="text-xs text-muted-foreground">
                {isDeviceConnected ? Number(wristbandData.yinYangBalance).toFixed(1) : "--"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-white shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Pill className="mr-2 h-4 w-4 text-amber-500" />
              炎症指数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="w-full bg-gray-200 h-2 rounded-full mb-2 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    wristbandData.inflammation < 2
                      ? "bg-green-500"
                      : wristbandData.inflammation < 3
                        ? "bg-amber-500"
                        : "bg-red-500"
                  }`}
                  style={{ width: `${(wristbandData.inflammation / 5) * 100}%` }}
                ></div>
              </div>
              <span className="text-xl font-bold">
                {isDeviceConnected ? Number(wristbandData.inflammation).toFixed(1) : "--"}
              </span>
              <Pill className="h-5 w-5 mt-1 text-amber-500" />
              {isDeviceConnected && (
                <p className="text-xs text-muted-foreground mt-1">
                  {wristbandData.inflammation < 2 ? "正常" : wristbandData.inflammation < 3 ? "轻度" : "中度"}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-white shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Shield className="mr-2 h-4 w-4 text-teal-500" />
              免疫活性
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="w-full bg-gray-200 h-2 rounded-full mb-2 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    wristbandData.immuneActivity < 60
                      ? "bg-amber-500"
                      : wristbandData.immuneActivity > 85
                        ? "bg-green-500"
                        : "bg-blue-500"
                  }`}
                  style={{ width: `${wristbandData.immuneActivity}%` }}
                ></div>
              </div>
              <span className="text-xl font-bold">
                {isDeviceConnected ? `${Number(wristbandData.immuneActivity).toFixed(1)}%` : "--"}
              </span>
              <Shield className="h-5 w-5 mt-1 text-teal-500" />
              {isDeviceConnected && (
                <p className="text-xs text-muted-foreground mt-1">
                  {wristbandData.immuneActivity < 60 ? "偏低" : wristbandData.immuneActivity > 85 ? "优秀" : "良好"}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          个人健康中心
        </h2>
        <Button
          variant={isDeviceConnected ? "destructive" : "default"}
          onClick={isDeviceConnected ? disconnectDevice : connectDevice}
          className={`flex items-center ${!isDeviceConnected ? "bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600" : ""}`}
        >
          <Bluetooth className="mr-2 h-4 w-4" />
          {isDeviceConnected ? "断开设备" : "连接智能手环"}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6 mb-8 rounded-xl bg-gradient-to-r from-blue-50 to-teal-50 p-1 shadow-sm">
          <TabsTrigger
            value="dashboard"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <Activity className="mr-2 h-4 w-4" />
            健康数据
          </TabsTrigger>
          <TabsTrigger value="water" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Droplet className="mr-2 h-4 w-4" />
            甜润沁方
          </TabsTrigger>
          <TabsTrigger
            value="meridian"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <Leaf className="mr-2 h-4 w-4" />
            博络解析
          </TabsTrigger>
          <TabsTrigger
            value="medical"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <FileText className="mr-2 h-4 w-4" />
            章衡报告
          </TabsTrigger>
          <TabsTrigger
            value="profile"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <UserCircle className="mr-2 h-4 w-4" />
            个人档案
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <Settings className="mr-2 h-4 w-4" />
            设备设置
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <HealthMetrics data={wristbandData} isConnected={isDeviceConnected} />
        </TabsContent>

        <TabsContent value="water">
          <WaterGenerator
            recommendations={recommendations}
            isDeviceConnected={isDeviceConnected}
            healthData={wristbandData}
            analysisComplete={analysisComplete}
          />
        </TabsContent>

        <TabsContent value="meridian">
          <MeridianAnalysis data={wristbandData} isConnected={isDeviceConnected} />
        </TabsContent>

        <TabsContent value="medical">
          <MedicalReport data={wristbandData} isConnected={isDeviceConnected} recommendations={recommendations} />
        </TabsContent>

        <TabsContent value="profile">
          <UserProfile />
        </TabsContent>

        <TabsContent value="settings">
          <DeviceConnection isConnected={isDeviceConnected} onConnect={connectDevice} onDisconnect={disconnectDevice} />
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
