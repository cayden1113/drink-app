"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Heart, Droplet, Clock } from "lucide-react"
import { useState, useEffect } from "react"
import { ChartContainer, Bar, ChartTooltipContent, Line } from "@/components/ui/chart"

interface HealthMetricsProps {
  data: any
  isConnected: boolean
}

// 模拟历史数据
const generateHistoryData = (current: number, days: number, variance: number) => {
  return Array.from({ length: days }).map((_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (days - i - 1))
    return {
      date: date.toISOString().split("T")[0],
      value: Number(Math.max(0, current + Math.floor(Math.random() * variance * 2) - variance).toFixed(1)),
      day: date.getDate().toString().padStart(2, "0"),
    }
  })
}

export default function HealthMetrics({ data, isConnected }: HealthMetricsProps) {
  const [historyData, setHistoryData] = useState<any>({
    hydration: [],
    heartRate: [],
    steps: [],
    sleep: [],
  })

  useEffect(() => {
    if (isConnected) {
      setHistoryData({
        hydration: generateHistoryData(data.hydrationLevel, 7, 15),
        heartRate: generateHistoryData(data.heartRate, 7, 10),
        steps: generateHistoryData(8000, 7, 3000),
        sleep: generateHistoryData(7, 7, 2).map((item) => ({ ...item, value: Number((item.value + 0.5).toFixed(1)) })),
      })
    }
  }, [isConnected, data])

  if (!isConnected) {
    return (
      <Card className="backdrop-blur-sm bg-white/80 border border-gray-100 shadow-lg">
        <CardHeader>
          <CardTitle>健康指标</CardTitle>
          <CardDescription>连接您的智能手环以查看健康数据</CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Activity className="mx-auto h-12 w-12 text-muted-foreground opacity-20 mb-4" />
            <p>未检测到设备连接</p>
            <p className="text-sm mt-2">请连接您的智能手环以查看详细的健康指标</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Tabs defaultValue="overview">
      <TabsList className="grid w-full grid-cols-4 rounded-xl bg-gray-100/80 backdrop-blur-sm p-1">
        <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
          总览
        </TabsTrigger>
        <TabsTrigger
          value="hydration"
          className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
        >
          水分
        </TabsTrigger>
        <TabsTrigger value="activity" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
          活动
        </TabsTrigger>
        <TabsTrigger value="sleep" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
          睡眠
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="backdrop-blur-sm bg-white/80 border border-gray-100 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Droplet className="mr-2 h-5 w-5 text-blue-500" />
                水分趋势
              </CardTitle>
              <CardDescription>过去7天的水分水平</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <ChartContainer
                config={{
                  value: {
                    label: "水分水平",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-full"
              >
                <Bar
                  data={historyData.hydration.map((item: any) => ({
                    name: item.day,
                    value: item.value,
                  }))}
                  valueKey="value"
                  categoryKey="name"
                  tooltip={<ChartTooltipContent />}
                />
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/80 border border-gray-100 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="mr-2 h-5 w-5 text-rose-500" />
                心率监测
              </CardTitle>
              <CardDescription>过去7天的平均心率</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <ChartContainer
                config={{
                  value: {
                    label: "心率",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-full"
              >
                <Line
                  data={historyData.heartRate.map((item: any) => ({
                    name: item.day,
                    value: item.value,
                  }))}
                  valueKey="value"
                  categoryKey="name"
                  tooltip={<ChartTooltipContent />}
                  color="#ef4444"
                />
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Card className="backdrop-blur-sm bg-white/80 border border-gray-100 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">血压</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {data.bloodPressure.systolic}/{data.bloodPressure.diastolic}
                  </div>
                  <p className="text-xs text-muted-foreground">mmHg</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-rose-100 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-rose-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/80 border border-gray-100 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">血氧饱和度</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{data.oxygenSaturation}%</div>
                  <p className="text-xs text-muted-foreground">SpO2</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Droplet className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/80 border border-gray-100 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">睡眠时间</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{data.sleepHours} 小时</div>
                  <p className="text-xs text-muted-foreground">昨晚</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="hydration">
        <Card className="backdrop-blur-sm bg-white/80 border border-gray-100 shadow-lg">
          <CardHeader>
            <CardTitle>水分详情</CardTitle>
            <CardDescription>您的水分水平和建议</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-2">当前水分水平</h3>
                  <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`absolute inset-y-0 left-0 ${data.hydrationLevel < 50 ? "bg-red-400" : "bg-blue-400"}`}
                      style={{ width: `${data.hydrationLevel}%` }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                      {Number(data.hydrationLevel).toFixed(1)}%
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-1">状态评估</h4>
                    <p className="text-sm">
                      {data.hydrationLevel >= 80
                        ? "优秀 - 您的水分水平非常好"
                        : data.hydrationLevel >= 60
                          ? "良好 - 您的水分水平处于健康范围"
                          : data.hydrationLevel >= 40
                            ? "注意 - 您的水分水平略低，建议补充水分"
                            : "警告 - 您的水分水平过低，请立即补充水分"}
                    </p>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-2">建议</h3>
                  <ul className="space-y-2 text-sm">
                    {data.hydrationLevel < 60 && (
                      <li className="flex items-start">
                        <Droplet className="h-4 w-4 mr-2 text-blue-500 mt-0.5" />
                        <span>立即饮用250-500ml水</span>
                      </li>
                    )}
                    <li className="flex items-start">
                      <Droplet className="h-4 w-4 mr-2 text-blue-500 mt-0.5" />
                      <span>每天饮用至少2升水</span>
                    </li>
                    <li className="flex items-start">
                      <Droplet className="h-4 w-4 mr-2 text-blue-500 mt-0.5" />
                      <span>运动前后额外补充水分</span>
                    </li>
                    <li className="flex items-start">
                      <Droplet className="h-4 w-4 mr-2 text-blue-500 mt-0.5" />
                      <span>使用我们的定制水配方增强水分吸收</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">水分趋势</h3>
                <div className="h-64">
                  <ChartContainer className="h-full">
                    <Bar
                      data={historyData.hydration.map((item: any) => ({
                        name: item.day,
                        value: item.value,
                      }))}
                      valueKey="value"
                      categoryKey="name"
                      tooltip={<ChartTooltipContent />}
                    />
                  </ChartContainer>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="activity">
        <Card className="backdrop-blur-sm bg-white/80 border border-gray-100 shadow-lg">
          <CardHeader>
            <CardTitle>活动详情</CardTitle>
            <CardDescription>您的活动水平和运动数据</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-muted-foreground mb-1">今日步数</div>
                  <div className="text-2xl font-bold">{data.steps}</div>
                  <div className="text-xs text-muted-foreground">目标: 10,000</div>
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                      style={{ width: `${Math.min(100, (data.steps / 10000) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-muted-foreground mb-1">消耗卡路里</div>
                  <div className="text-2xl font-bold">{data.caloriesBurned}</div>
                  <div className="text-xs text-muted-foreground">目标: 2,000</div>
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-400 to-amber-500"
                      style={{ width: `${Math.min(100, (data.caloriesBurned / 2000) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-muted-foreground mb-1">活动时间</div>
                  <div className="text-2xl font-bold">45 分钟</div>
                  <div className="text-xs text-muted-foreground">目标: 60 分钟</div>
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-400 to-violet-500"
                      style={{ width: `${Math.min(100, (45 / 60) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">步数趋势</h3>
                <div className="h-64">
                  <ChartContainer className="h-full">
                    <Bar
                      data={historyData.steps.map((item: any) => ({
                        name: item.day,
                        value: item.value,
                      }))}
                      valueKey="value"
                      categoryKey="name"
                      tooltip={<ChartTooltipContent />}
                    />
                  </ChartContainer>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">活动建议</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Activity className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>增加日常步行，尽量达到每天10,000步</span>
                  </li>
                  <li className="flex items-start">
                    <Activity className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>每周进行至少150分钟的中等强度有氧运动</span>
                  </li>
                  <li className="flex items-start">
                    <Activity className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>运动后使用我们的电解质配方水以促进恢复</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="sleep">
        <Card className="backdrop-blur-sm bg-white/80 border border-gray-100 shadow-lg">
          <CardHeader>
            <CardTitle>睡眠详情</CardTitle>
            <CardDescription>您的睡眠质量和模式</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-muted-foreground mb-1">睡眠时长</div>
                  <div className="text-2xl font-bold">{data.sleepHours} 小时</div>
                  <div className="text-xs text-muted-foreground">目标: 8 小时</div>
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-400 to-indigo-500"
                      style={{ width: `${Math.min(100, (data.sleepHours / 8) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-muted-foreground mb-1">深度睡眠</div>
                  <div className="text-2xl font-bold">1.5 小时</div>
                  <div className="text-xs text-muted-foreground">
                    占总睡眠的 {Math.round((1.5 / data.sleepHours) * 100)}%
                  </div>
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-400 to-blue-500"
                      style={{ width: `${Math.min(100, (1.5 / 2) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-sky-50 p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-muted-foreground mb-1">睡眠质量</div>
                  <div className="text-2xl font-bold">72%</div>
                  <div className="text-xs text-muted-foreground">良好</div>
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-400 to-sky-500" style={{ width: `72%` }}></div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">睡眠趋势</h3>
                <div className="h-64">
                  <ChartContainer className="h-full">
                    <Bar
                      data={historyData.sleep.map((item: any) => ({
                        name: item.day,
                        value: item.value,
                      }))}
                      valueKey="value"
                      categoryKey="name"
                      tooltip={<ChartTooltipContent />}
                    />
                  </ChartContainer>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">睡眠建议</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Clock className="h-4 w-4 mr-2 text-purple-500 mt-0.5" />
                    <span>保持规律的睡眠时间表，包括周末</span>
                  </li>
                  <li className="flex items-start">
                    <Clock className="h-4 w-4 mr-2 text-purple-500 mt-0.5" />
                    <span>睡前1小时避免使用电子设备</span>
                  </li>
                  <li className="flex items-start">
                    <Clock className="h-4 w-4 mr-2 text-purple-500 mt-0.5" />
                    <span>睡前饮用我们的镁强化水配方有助于改善睡眠质量</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
