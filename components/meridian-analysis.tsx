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

// 经络数据
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
  heart: {
    name: "心经",
    chineseName: "手少阴心经",
    element: "火",
    organs: ["心", "小肠"],
    emotions: ["喜悦", "过度兴奋"],
    timeRange: "11:00-13:00",
    description: "主管血脉，储藏神志，控制情绪和精神活动",
    symptoms: ["心悸", "失眠", "多梦", "焦虑", "舌质异常"],
    recommendedElements: ["五味子", "甘草", "镁"],
  },
  spleen: {
    name: "脾经",
    chineseName: "足太阴脾经",
    element: "土",
    organs: ["脾", "胃"],
    emotions: ["思虑", "忧愁"],
    timeRange: "9:00-11:00",
    description: "主管运化，转化食物为气血，维持肌肉和四肢",
    symptoms: ["消化不良", "食欲不振", "腹胀", "疲劳", "水肿"],
    recommendedElements: ["人参", "黄芪", "甘草"],
  },
  liver: {
    name: "肝经",
    chineseName: "足厥阴肝经",
    element: "木",
    organs: ["肝", "胆"],
    emotions: ["怒", "抑郁"],
    timeRange: "1:00-3:00",
    description: "主管疏泄，储藏血液，调节情绪和内分泌",
    symptoms: ["头痛", "眼部问题", "肌腱问题", "情绪波动", "月经不调"],
    recommendedElements: ["枸杞", "菊花", "五味子"],
  },
  kidney: {
    name: "肾经",
    chineseName: "足少阴肾经",
    element: "水",
    organs: ["肾", "膀胱"],
    emotions: ["恐惧"],
    timeRange: "17:00-19:00",
    description: "主管生长发育和生殖，储藏先天之精，控制骨骼和脑髓",
    symptoms: ["腰痛", "耳鸣", "脱发", "骨质问题", "生殖系统问题"],
    recommendedElements: ["枸杞", "人参", "维生素D"],
  },
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
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
                  <div
                    className={`h-full rounded-full ${
                      Number(value) > 80 ? "bg-green-500" : Number(value) > 70 ? "bg-blue-500" : "bg-amber-500"
                    }`}
                    style={{ width: `${value}%` }}
                  ></div>
                </div>
                <span className="text-xl font-bold">{Number(value).toFixed(1)}%</span>
                <span className="text-xs text-muted-foreground mt-1">
                  {meridianInfo[meridian as keyof typeof meridianInfo].element}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="overview">总览</TabsTrigger>
          {Object.keys(data.meridianBalance).map((meridian) => (
            <TabsTrigger key={meridian} value={meridian}>
              {meridianInfo[meridian as keyof typeof meridianInfo].name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>经络系统总览</CardTitle>
              <CardDescription>您的经络系统整体状态分析</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">阴阳平衡</h3>
                  <div className="relative h-12 bg-gradient-to-r from-blue-400 via-purple-200 to-red-400 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 bottom-0 w-6 h-6 bg-white border-2 border-gray-800 rounded-full shadow-lg transform -translate-y-1/2"
                      style={{
                        left: `calc(50% + ${data.yinYangBalance * 50}% - 12px)`,
                        top: "50%",
                      }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-between px-6">
                      <span className="text-white text-sm font-medium">阴</span>
                      <span className="text-white text-sm font-medium">阳</span>
                    </div>
                  </div>
                  <div className="mt-3 text-center text-sm font-medium">
                    {data.yinYangBalance > 0.3
                      ? "您的体质偏阳，建议滋阴清热"
                      : data.yinYangBalance < -0.3
                        ? "您的体质偏阴，建议温阳补气"
                        : "您的阴阳平衡状态良好"}
                    <span className="ml-2 text-muted-foreground">({Number(data.yinYangBalance).toFixed(1)})</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">五行分布</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {Object.entries(data.meridianBalance).map(([meridian, value]) => {
                      const element = meridianInfo[meridian as keyof typeof meridianInfo].element
                      const colorClass =
                        element === "木"
                          ? "text-green-500 bg-green-50"
                          : element === "火"
                            ? "text-red-500 bg-red-50"
                            : element === "土"
                              ? "text-yellow-500 bg-yellow-50"
                              : element === "金"
                                ? "text-gray-500 bg-gray-50"
                                : "text-blue-500 bg-blue-50"

                      return (
                        <div key={meridian} className="text-center">
                          <div
                            className={`w-12 h-12 mx-auto mb-1 rounded-full flex items-center justify-center ${colorClass.split(" ")[1]}`}
                          >
                            <span className={`text-lg ${colorClass.split(" ")[0]}`}>{element}</span>
                          </div>
                          <div className="text-xs">{Number(value).toFixed(1)}%</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">经络系统总体评估</h3>
                <div className="p-4 border rounded-lg">
                  <p className="mb-4">
                    根据您的经络数据分析，您的经络系统整体状态为
                    <span
                      className={`font-medium ${
                        Object.values(data.meridianBalance).every((v) => Number(v) > 80)
                          ? "text-green-600"
                          : Object.values(data.meridianBalance).every((v) => Number(v) > 70)
                            ? "text-blue-600"
                            : "text-amber-600"
                      }`}
                    >
                      {Object.values(data.meridianBalance).every((v) => Number(v) > 80)
                        ? " 优秀"
                        : Object.values(data.meridianBalance).every((v) => Number(v) > 70)
                          ? " 良好"
                          : " 需要调理"}
                    </span>
                    。
                  </p>

                  <div className="space-y-2">
                    {Object.entries(data.meridianBalance)
                      .filter(([_, value]) => Number(value) < 70)
                      .map(([meridian]) => (
                        <div key={meridian} className="flex items-start">
                          <AlertTriangle className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              {meridianInfo[meridian as keyof typeof meridianInfo].name}偏弱 (
                              {Number(data.meridianBalance[meridian]).toFixed(1)}%)
                            </p>
                            <p className="text-sm text-muted-foreground">
                              可能导致
                              {meridianInfo[meridian as keyof typeof meridianInfo].symptoms.slice(0, 3).join("、")}
                              等问题
                            </p>
                          </div>
                        </div>
                      ))}

                    {data.yinYangBalance > 0.3 && (
                      <div className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">阳气偏盛</p>
                          <p className="text-sm text-muted-foreground">可能导致口干、烦躁、失眠等问题</p>
                        </div>
                      </div>
                    )}

                    {data.yinYangBalance < -0.3 && (
                      <div className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">阴气偏盛</p>
                          <p className="text-sm text-muted-foreground">可能导致怕冷、疲倦、精神不振等问题</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">推荐调理方案</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2 flex items-center">
                      <Leaf className="h-4 w-4 mr-2 text-emerald-500" />
                      推荐水疗成分
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(data.meridianBalance)
                        .filter(([_, value]) => Number(value) < 70)
                        .flatMap(
                          ([meridian]) => meridianInfo[meridian as keyof typeof meridianInfo].recommendedElements,
                        )
                        .filter((value, index, self) => self.indexOf(value) === index)
                        .slice(0, 4)
                        .map((element) => (
                          <Badge key={element} className="mr-2 bg-emerald-100 text-emerald-800">
                            {element.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                          </Badge>
                        ))}
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">生活调理建议</h4>
                    <ul className="space-y-1 text-sm">
                      {Object.entries(data.meridianBalance)
                        .filter(([_, value]) => Number(value) < 70)
                        .map(([meridian]) => (
                          <li key={meridian}>
                            • 调理{meridianInfo[meridian as keyof typeof meridianInfo].name}：注意
                            {meridian === "lung"
                              ? "呼吸健康，避免寒冷刺激"
                              : meridian === "heart"
                                ? "情绪管理，保持心情舒畅"
                                : meridian === "spleen"
                                  ? "饮食规律，避免过度思虑"
                                  : meridian === "liver"
                                    ? "情绪调节，避免过度紧张"
                                    : "保暖，避免过度劳累"}
                          </li>
                        ))}
                      {data.yinYangBalance > 0.3 && <li>• 阳气偏盛：多食用滋阴清热食物，如莲子、百合、银耳等</li>}
                      {data.yinYangBalance < -0.3 && <li>• 阴气偏盛：多食用温阳补气食物，如羊肉、生姜、桂圆等</li>}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {Object.entries(data.meridianBalance).map(([meridian, value]) => (
          <TabsContent key={meridian} value={meridian}>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{meridianInfo[meridian as keyof typeof meridianInfo].name}详情</CardTitle>
                    <CardDescription>
                      {meridianInfo[meridian as keyof typeof meridianInfo].chineseName} | 五行属性：
                      {meridianInfo[meridian as keyof typeof meridianInfo].element}
                    </CardDescription>
                  </div>
                  <Badge
                    className={
                      Number(value) > 80
                        ? "bg-green-100 text-green-800"
                        : Number(value) > 70
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                    }
                  >
                    {Number(value) > 80 ? "良好" : Number(value) > 70 ? "正常" : "偏弱"} ({Number(value).toFixed(1)}%)
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-2">基本信息</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <span className="text-muted-foreground">活跃时间：</span>
                        {meridianInfo[meridian as keyof typeof meridianInfo].timeRange}
                      </li>
                      <li>
                        <span className="text-muted-foreground">相关脏腑：</span>
                        {meridianInfo[meridian as keyof typeof meridianInfo].organs.join("、")}
                      </li>
                      <li>
                        <span className="text-muted-foreground">相关情志：</span>
                        {meridianInfo[meridian as keyof typeof meridianInfo].emotions.join("、")}
                      </li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-2">功能描述</h3>
                    <p className="text-sm">{meridianInfo[meridian as keyof typeof meridianInfo].description}</p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-2">常见症状</h3>
                    <div className="flex flex-wrap gap-1">
                      {meridianInfo[meridian as keyof typeof meridianInfo].symptoms.map((symptom) => (
                        <Badge key={symptom} variant="outline">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-4">调理建议</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs font-medium mb-2">推荐水疗成分</h4>
                      <div className="flex flex-wrap gap-2">
                        {meridianInfo[meridian as keyof typeof meridianInfo].recommendedElements.map((element) => (
                          <Badge key={element} className="bg-emerald-100 text-emerald-800">
                            {element.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-medium mb-2">生活调理</h4>
                      <ul className="space-y-1 text-sm">
                        <li>
                          • 饮食：
                          {meridian === "lung"
                            ? "梨、银耳、百合等滋阴润肺食物"
                            : meridian === "heart"
                              ? "莲子、百合、红枣等养心安神食物"
                              : meridian === "spleen"
                                ? "山药、红枣、粳米等健脾食物"
                                : meridian === "liver"
                                  ? "菊花、枸杞、绿叶蔬菜等疏肝食物"
                                  : "黑豆、黑芝麻、核桃等补肾食物"}
                        </li>
                        <li>
                          • 作息：
                          {meridian === "lung"
                            ? "早睡早起，保持室内空气流通"
                            : meridian === "heart"
                              ? "中午适当休息，保持情绪稳定"
                              : meridian === "spleen"
                                ? "规律饮食，避免过度思虑"
                                : meridian === "liver"
                                  ? "保持情绪舒畅，避免熬夜"
                                  : "早睡早起，保持腰部温暖"}
                        </li>
                        <li>
                          • 运动：
                          {meridian === "lung"
                            ? "太极、散步、深呼吸练习"
                            : meridian === "heart"
                              ? "轻度有氧运动，如散步、太极"
                              : meridian === "spleen"
                                ? "适量运动，如散步、慢跑"
                                : meridian === "liver"
                                  ? "舒展运动，如瑜伽、太极"
                                  : "适量运动，如游泳、太极"}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button variant="outline" className="mr-2">
                    查看详细经络图
                  </Button>
                  <Button>生成调理方案</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
