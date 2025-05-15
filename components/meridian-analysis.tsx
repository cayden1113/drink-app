"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Info, Leaf } from "lucide-react"

interface MeridianAnalysisProps {
  data: any
  isConnected: boolean
}

// 经络数据（保持英文键名，中文值）
const meridianInfo = {
  lung: {
    name: "肺经",
    chineseName: "手太阴肺经",
    element: "金",
    organs: ["肺", "大肠"],
    emotions: ["悲伤"],
    timeRange: "3:00-5:00",
    description: "主管呼吸，调节水液代谢，连接皮肤和毛孔",
    symptoms: ["咳嗽", "气短", "胸闷", "感冒", "皮肤问题"],
    recommendedElements: ["黄芪", "五味子", "甘草"],
  },
  // 其他经络数据保持一致格式...
}

export default function MeridianAnalysis({ data, isConnected }: MeridianAnalysisProps) {
  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>经络解析</CardTitle>
          <CardDescription>连接您的智能手环以查看经络数据</CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Leaf className="mx-auto h-12 w-12 text-muted-foreground opacity-20 mb-4" />
            <p>未检测到设备连接</p>
            <p className="text-sm mt-2">请连接您的智能手环以查看详细的经络分析</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Alert className="bg-amber-50 border-amber-200">
        <Info className="h-4 w-4 text-amber-600" />
        <AlertTitle className="text-amber-800">经络分析</AlertTitle>
        <AlertDescription className="text-amber-700">
          经络是中医理论中气血运行的通道，连接脏腑和体表。本分析基于您的生理数据，评估五大主要经络的状态，并提供相应的调理建议。
        </AlertDescription>
      </Alert>

      {/* 以下内容保持中文不变，仅调整标点符号一致性 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Object.entries(data.meridianBalance).map(([meridian, value]) => (
          <Card key={meridian} className={Number(value) < 70 ? "border-amber-300 bg-amber-50" : ""}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span>{meridianInfo[meridian as keyof typeof meridianInfo].name}</span>
                <Badge
                  className={
                    Number(value) > 80
                      ? "bg-green-100 text-green-800"
                      : Number(value) > 70
                        ? "bg-blue-100 text-blue-800"
                        : "bg-amber-100 text-amber-800"
                  }
                >
                  {Number(value) > 80 ? "良好" : Number(value) > 70 ? "正常" : "偏弱"}
                </Badge>
              </CardTitle>
            </CardHeader>
            {/* 卡片内容保持中文不变... */}
          </Card>
        ))}
      </div>

      {/* Tabs内容保持中文不变... */}
    </div>
  )
}
