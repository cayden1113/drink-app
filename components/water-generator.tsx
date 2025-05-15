"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Heart, AlertTriangle, Check, Leaf, Pill, Droplet } from "lucide-react"
import WaterVisualization from "./water-visualization"
import { useToast } from "@/hooks/use-toast"
import FormulaDetails from "./formula-details"

// 定义微量元素及其属性 - 扩展版
const traceElements = [
  // 中医相关元素
  {
    id: "ginseng",
    name: "人参提取物",
    color: "#f59e0b",
    benefits: "补气养阴，提高免疫力，缓解疲劳",
    defaultLevel: 0,
    maxLevel: 30,
    unit: "mg/L",
    category: "tcm",
    healthConditions: ["气虚", "免疫力低下", "疲劳"],
    properties: "温补",
    meridians: ["脾", "肺"],
  },
  {
    id: "astragalus",
    name: "黄芪提取物",
    color: "#fbbf24",
    benefits: "补气固表，提高免疫力，增强体力",
    defaultLevel: 0,
    maxLevel: 40,
    unit: "mg/L",
    category: "tcm",
    healthConditions: ["气虚", "免疫力低下", "水肿"],
    properties: "温补",
    meridians: ["脾", "肺"],
  },
  {
    id: "licorice",
    name: "甘草提取物",
    color: "#d97706",
    benefits: "调和诸药，补脾益气，清热解毒",
    defaultLevel: 0,
    maxLevel: 20,
    unit: "mg/L",
    category: "tcm",
    healthConditions: ["脾胃不和", "咳嗽", "炎症"],
    properties: "平和",
    meridians: ["脾", "肺", "心"],
  },
  {
    id: "goji",
    name: "枸杞提取物",
    color: "#ef4444",
    benefits: "滋补肝肾，明目，增强免疫力",
    defaultLevel: 0,
    maxLevel: 25,
    unit: "mg/L",
    category: "tcm",
    healthConditions: ["肝肾阴虚", "视力疲劳", "免疫力低下"],
    properties: "平和",
    meridians: ["肝", "肾"],
  },
  {
    id: "chrysanthemum",
    name: "菊花提取物",
    color: "#fcd34d",
    benefits: "清热解毒，平肝明目，降血压",
    defaultLevel: 0,
    maxLevel: 20,
    unit: "mg/L",
    category: "tcm",
    healthConditions: ["肝火上炎", "头痛目赤", "高血压"],
    properties: "凉性",
    meridians: ["肺", "肝"],
  },
  {
    id: "schisandra",
    name: "五味子提取物",
    color: "#ec4899",
    benefits: "收敛固涩，益气生津，安神",
    defaultLevel: 0,
    maxLevel: 15,
    unit: "mg/L",
    category: "tcm",
    healthConditions: ["气虚自汗", "心悸失眠", "肺虚咳嗽"],
    properties: "温性",
    meridians: ["肺", "心", "肾"],
  },
  // 新增中医成分
  {
    id: "angelica",
    name: "当归提取物",
    color: "#7c3aed",
    benefits: "补血活血，调经止痛，润肠通便",
    defaultLevel: 0,
    maxLevel: 25,
    unit: "mg/L",
    category: "tcm",
    healthConditions: ["血虚", "月经不调", "贫血"],
    properties: "温性",
    meridians: ["肝", "心", "脾"],
  },
  {
    id: "poria",
    name: "茯苓提取物",
    color: "#f9a8d4",
    benefits: "利水渗湿，健脾安神",
    defaultLevel: 0,
    maxLevel: 30,
    unit: "mg/L",
    category: "tcm",
    healthConditions: ["水肿", "脾虚", "失眠"],
    properties: "平和",
    meridians: ["心", "脾", "肾"],
  },
  {
    id: "atractylodes",
    name: "白术提取物",
    color: "#fde68a",
    benefits: "健脾益气，燥湿利水，止汗安胎",
    defaultLevel: 0,
    maxLevel: 25,
    unit: "mg/L",
    category: "tcm",
    healthConditions: ["脾虚", "水肿", "自汗"],
    properties: "温性",
    meridians: ["脾", "胃"],
  },
  {
    id: "rehmannia",
    name: "熟地黄提取物",
    color: "#4b5563",
    benefits: "滋阴补血，益精填髓",
    defaultLevel: 0,
    maxLevel: 30,
    unit: "mg/L",
    category: "tcm",
    healthConditions: ["阴虚", "血虚", "肾虚"],
    properties: "温性",
    meridians: ["肝", "肾"],
  },
  {
    id: "cinnamon",
    name: "肉桂提取物",
    color: "#92400e",
    benefits: "补火助阳，引火归元，散寒止痛",
    defaultLevel: 0,
    maxLevel: 15,
    unit: "mg/L",
    category: "tcm",
    healthConditions: ["阳虚", "寒症", "腹痛"],
    properties: "热性",
    meridians: ["肾", "脾", "心"],
  },
  {
    id: "honeysuckle",
    name: "金银花提取物",
    color: "#fef3c7",
    benefits: "清热解毒，疏散风热",
    defaultLevel: 0,
    maxLevel: 20,
    unit: "mg/L",
    category: "tcm",
    healthConditions: ["热毒", "感冒", "咽喉肿痛"],
    properties: "寒性",
    meridians: ["肺", "胃", "大肠"],
  },

  // 西医相关元素
  {
    id: "magnesium",
    name: "镁",
    color: "#a3e635",
    benefits: "支持肌肉和神经功能，能量产生和骨骼健康",
    defaultLevel: 0,
    maxLevel: 50,
    unit: "mg/L",
    category: "western",
    healthConditions: ["肌肉疲劳", "压力", "运动恢复"],
    clinicalUses: ["高血压", "心律不齐", "偏头痛预防"],
  },
  {
    id: "calcium",
    name: "钙",
    color: "#d1d5db",
    benefits: "对骨骼健康，肌肉功能和神经传导至关重要",
    defaultLevel: 0,
    maxLevel: 100,
    unit: "mg/L",
    category: "western",
    healthConditions: ["骨骼健康", "肌肉收缩", "神经传导"],
    clinicalUses: ["骨质疏松", "肌肉痉挛", "高血压"],
  },
  {
    id: "potassium",
    name: "钾",
    color: "#fbbf24",
    benefits: "调节体液平衡，肌肉收缩和神经信号",
    defaultLevel: 0,
    maxLevel: 30,
    unit: "mg/L",
    category: "western",
    healthConditions: ["血压调节", "肌肉功能", "心脏健康"],
    clinicalUses: ["高血压", "心律不齐", "肌肉无力"],
  },
  {
    id: "zinc",
    name: "锌",
    color: "#60a5fa",
    benefits: "支持免疫功能，伤口愈合和DNA合成",
    defaultLevel: 0,
    maxLevel: 15,
    unit: "mg/L",
    category: "western",
    healthConditions: ["免疫系统", "伤口愈合", "细胞生长"],
    clinicalUses: ["免疫功能障碍", "皮肤问题", "味觉障碍"],
  },
  {
    id: "selenium",
    name: "硒",
    color: "#c084fc",
    benefits: "抗氧化剂，有助于保护细胞免受损害",
    defaultLevel: 0,
    maxLevel: 10,
    unit: "μg/L",
    category: "western",
    healthConditions: ["抗氧化", "甲状腺功能", "免疫系统"],
    clinicalUses: ["甲状腺功能减退", "免疫系统疾病", "心血管疾病预防"],
  },
  {
    id: "vitamin_d",
    name: "维生素D",
    color: "#fef08a",
    benefits: "促进钙吸收，支持骨骼健康和免疫功能",
    defaultLevel: 0,
    maxLevel: 25,
    unit: "μg/L",
    category: "western",
    healthConditions: ["骨骼健康", "免疫功能", "情绪调节"],
    clinicalUses: ["骨质疏松", "免疫功能障碍", "季节性情绪障碍"],
  },
  {
    id: "omega3",
    name: "Omega-3脂肪酸",
    color: "#93c5fd",
    benefits: "支持心血管健康，减轻炎症，促进大脑功能",
    defaultLevel: 0,
    maxLevel: 50,
    unit: "mg/L",
    category: "western",
    healthConditions: ["心血管健康", "炎症", "认知功能"],
    clinicalUses: ["高血脂", "关节炎", "抑郁症"],
  },
  {
    id: "coq10",
    name: "辅酶Q10",
    color: "#f87171",
    benefits: "细胞能量产生，抗氧化，支持心脏健康",
    defaultLevel: 0,
    maxLevel: 30,
    unit: "mg/L",
    category: "western",
    healthConditions: ["能量水平", "心脏健康", "抗氧化"],
    clinicalUses: ["心力衰竭", "高血压", "他汀类药物副作用"],
  },
]

// 药物相互作用数据
const medicationInteractions = {
  ginseng: ["抗凝血药", "降血糖药", "兴奋剂"],
  astragalus: ["免疫抑制剂", "利尿剂"],
  licorice: ["降血压药", "利尿剂", "强的松"],
  goji: ["抗凝血药", "降血压药"],
  chrysanthemum: ["抗凝血药"],
  schisandra: ["镇静剂", "抗抑郁药"],
  angelica: ["抗凝血药", "激素类药物"],
  poria: ["利尿剂", "镇静剂"],
  atractylodes: ["降血糖药", "利尿剂"],
  rehmannia: ["抗凝血药", "降血压药"],
  cinnamon: ["降血糖药", "抗凝血药"],
  honeysuckle: ["免疫抑制剂", "抗生素"],
  magnesium: ["某些抗生素", "双膦酸盐类药物"],
  calcium: ["某些抗生素", "甲状腺药物"],
  potassium: ["ACE抑制剂", "钾保留利尿剂"],
  zinc: ["抗生素", "青霉胺"],
  selenium: ["他汀类药物", "抗凝血药"],
  vitamin_d: ["秋水仙碱", "泻药"],
  omega3: ["抗凝血药", "降血压药"],
  coq10: ["抗凝血药", "降血压药", "他汀类药物"],
}

interface WaterGeneratorProps {
  recommendations?: any
  isDeviceConnected: boolean
  healthData: any
  analysisComplete: boolean
}

export default function WaterGenerator({
  recommendations,
  isDeviceConnected,
  healthData,
  analysisComplete,
}: WaterGeneratorProps) {
  const [elementLevels, setElementLevels] = useState(
    traceElements.reduce(
      (acc, element) => {
        acc[element.id] = element.defaultLevel
        return acc
      },
      {} as Record<string, number>,
    ),
  )

  const [savedRecipes, setSavedRecipes] = useState<
    Array<{ name: string; levels: Record<string, number>; forCondition?: string; type?: string }>
  >([])
  const [recipeName, setRecipeName] = useState("我的定制水疗方案")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedFormula, setSelectedFormula] = useState<any>(null)
  const [showFormulaDetails, setShowFormulaDetails] = useState(false)
  const { toast } = useToast()

  // 当有推荐时更新元素水平
  useEffect(() => {
    if (recommendations) {
      setElementLevels(recommendations.elementLevels)
      setRecipeName(recommendations.name)
      setSelectedFormula(recommendations)
    }
  }, [recommendations])

  const handleSliderChange = (elementId: string, value: number[]) => {
    setElementLevels((prev) => ({
      ...prev,
      [elementId]: value[0],
    }))
  }

  const saveRecipe = () => {
    const newRecipe = {
      name: recipeName,
      levels: { ...elementLevels },
      forCondition: recommendations?.forCondition,
      type: recommendations?.type,
    }
    setSavedRecipes([...savedRecipes, newRecipe])

    toast({
      title: "配方已保存",
      description: `"${recipeName}" 已添加到您的保存配方中`,
    })
  }

  const resetLevels = () => {
    if (recommendations) {
      setElementLevels(recommendations.elementLevels)
      setRecipeName(recommendations.name)
    } else {
      setElementLevels(
        traceElements.reduce(
          (acc, element) => {
            acc[element.id] = element.defaultLevel
            return acc
          },
          {} as Record<string, number>,
        ),
      )
      setRecipeName("我的定制水疗方案")
    }
  }

  const applyRecommendedLevels = () => {
    if (recommendations) {
      setElementLevels(recommendations.elementLevels)
      setRecipeName(recommendations.name)
      setSelectedFormula(recommendations)

      toast({
        title: "已应用推荐配方",
        description: "基于您的健康数据的个性化配方已应用",
      })
    }
  }

  const viewFormulaDetails = () => {
    setShowFormulaDetails(true)
  }

  // 过滤元素基于当前活动标签
  const filteredElements = traceElements.filter((element) => {
    if (activeTab === "all") return true
    if (activeTab === "tcm") return element.category === "tcm"
    if (activeTab === "western") return element.category === "western"
    return true
  })

  // 计算当前配方的中西医比例
  const calculateRatio = () => {
    let tcmTotal = 0
    let westernTotal = 0

    traceElements.forEach((element) => {
      const level = elementLevels[element.id] || 0
      if (element.category === "tcm") {
        tcmTotal += level
      } else {
        westernTotal += level
      }
    })

    const total = tcmTotal + westernTotal
    if (total === 0) return { tcm: 50, western: 50 }

    return {
      tcm: Math.round((tcmTotal / total) * 100),
      western: Math.round((westernTotal / total) * 100),
    }
  }

  const ratio = calculateRatio()

  return (
    <div className="space-y-8">
      {isDeviceConnected && !analysisComplete && (
        <Alert className="bg-blue-50 border-blue-200">
          <AlertTriangle className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">正在分析您的健康数据</AlertTitle>
          <AlertDescription className="text-blue-700">
            系统正在分析您的中西医指标，这可能需要几分钟时间。分析完成后，我们将为您提供个性化的水疗方案建议。
          </AlertDescription>
        </Alert>
      )}

      {isDeviceConnected && analysisComplete && recommendations && (
        <Alert className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <Check className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">个性化水疗方案推荐</AlertTitle>
          <AlertDescription className="text-blue-700">
            基于您的生理数据，我们推荐 "{recommendations.name}" 配方，特别适合您当前的 {recommendations.forCondition}{" "}
            状况。此配方结合了
            {recommendations.type === "balanced"
              ? "平衡的中西医元素"
              : recommendations.type === "tcm-focused"
                ? "传统中医理论"
                : "现代医学理论"}
            。
          </AlertDescription>
          <div className="flex space-x-2 mt-2">
            <Button
              variant="outline"
              className="bg-white border-blue-300 text-blue-700 hover:bg-blue-50"
              onClick={applyRecommendedLevels}
            >
              应用推荐配方
            </Button>
            <Button
              variant="outline"
              className="bg-white border-blue-300 text-blue-700 hover:bg-blue-50"
              onClick={viewFormulaDetails}
            >
              查看详细分析
            </Button>
          </div>
        </Alert>
      )}

      {!isDeviceConnected && (
        <Alert variant="destructive" className="bg-amber-50 border-amber-200">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-800">设备未连接</AlertTitle>
          <AlertDescription className="text-amber-700">连接您的智能手环以获取个性化水疗方案推荐。</AlertDescription>
        </Alert>
      )}

      {showFormulaDetails && selectedFormula && (
        <FormulaDetails
          formula={selectedFormula}
          healthData={healthData}
          onClose={() => setShowFormulaDetails(false)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="backdrop-blur-sm bg-white/80 border border-gray-100 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>甜润沁方定制</span>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-amber-50 text-amber-800 hover:bg-amber-100 border-amber-200">
                    <Leaf className="mr-1 h-3 w-3" />
                    中医 {ratio.tcm}%
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-800 hover:bg-blue-100 border-blue-200">
                    <Pill className="mr-1 h-3 w-3" />
                    西医 {ratio.western}%
                  </Badge>
                </div>
              </CardTitle>
              <CardDescription>根据您的需求调整水疗方案中的活性成分</CardDescription>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
                <TabsList>
                  <TabsTrigger value="all">全部成分</TabsTrigger>
                  <TabsTrigger value="tcm">中医成分</TabsTrigger>
                  <TabsTrigger value="western">西医成分</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="max-h-[500px] overflow-y-auto pr-6">
              <div className="space-y-6">
                {filteredElements.map((element) => (
                  <div key={element.id} className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: element.color }}></div>
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {element.name}
                        </label>
                        {recommendations?.highlightedElements?.includes(element.id) && (
                          <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-200">推荐</Badge>
                        )}
                        {element.category === "tcm" ? (
                          <Badge variant="outline" className="ml-2 text-xs">
                            中医
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="ml-2 text-xs">
                            西医
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {Number(elementLevels[element.id]).toFixed(1)} {element.unit}
                      </span>
                    </div>
                    <Slider
                      value={[elementLevels[element.id]]}
                      max={element.maxLevel}
                      step={1}
                      onValueChange={(value) => handleSliderChange(element.id, value)}
                      className={recommendations?.highlightedElements?.includes(element.id) ? "accent-green-500" : ""}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{element.benefits}</span>
                      {element.category === "tcm" && <span>归经: {element.meridians?.join(", ")}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={resetLevels}>
                重置
              </Button>
              <Button onClick={saveRecipe}>
                <Save className="mr-2 h-4 w-4" />
                保存配方
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="backdrop-blur-sm bg-white/80 border border-gray-100 shadow-lg">
            <CardHeader>
              <CardTitle>您的定制水疗方案</CardTitle>
              <CardDescription>
                <input
                  type="text"
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                  className="w-full bg-transparent border-b border-muted focus:border-primary outline-none"
                />
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              <WaterVisualization elements={traceElements} levels={elementLevels} />

              <div className="mt-6 w-full">
                <h3 className="text-sm font-medium mb-2">成分组成:</h3>
                <div className="flex flex-wrap gap-2">
                  {traceElements.map(
                    (element) =>
                      elementLevels[element.id] > 0 && (
                        <Badge
                          key={element.id}
                          style={{
                            backgroundColor: element.color,
                            color: "#000",
                            opacity: recommendations?.highlightedElements?.includes(element.id) ? 1 : 0.7,
                          }}
                        >
                          {element.name}: {elementLevels[element.id]} {element.unit}
                        </Badge>
                      ),
                  )}
                </div>
              </div>

              {isDeviceConnected && healthData && (
                <div className="mt-6 w-full">
                  <h3 className="text-sm font-medium mb-2">健康益处:</h3>
                  <div className="text-sm space-y-2">
                    {healthData.hydrationLevel < 70 && (
                      <div className="flex items-start">
                        <Droplet className="h-4 w-4 mr-2 text-blue-500 mt-0.5" />
                        <span>提高水分水平 ({Number(healthData.hydrationLevel).toFixed(1)}%)</span>
                      </div>
                    )}
                    {healthData.stressLevel > 50 && (
                      <div className="flex items-start">
                        <Heart className="h-4 w-4 mr-2 text-purple-500 mt-0.5" />
                        <span>帮助缓解压力 ({Number(healthData.stressLevel).toFixed(1)}%)</span>
                      </div>
                    )}
                    {healthData.yinYangBalance > 0.3 && (
                      <div className="flex items-start">
                        <Leaf className="h-4 w-4 mr-2 text-emerald-500 mt-0.5" />
                        <span>调节阴阳平衡 (当前偏阳)</span>
                      </div>
                    )}
                    {healthData.yinYangBalance < -0.3 && (
                      <div className="flex items-start">
                        <Leaf className="h-4 w-4 mr-2 text-emerald-500 mt-0.5" />
                        <span>调节阴阳平衡 (当前偏阴)</span>
                      </div>
                    )}
                    {healthData.inflammation > 2.5 && (
                      <div className="flex items-start">
                        <Pill className="h-4 w-4 mr-2 text-rose-500 mt-0.5" />
                        <span>降低炎症指数 ({Number(healthData.inflammation).toFixed(1)})</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-6 w-full">
                <h3 className="text-sm font-medium mb-2">注意事项:</h3>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• 本配方仅供参考，不能替代医疗建议</p>
                  <p>• 如有慢性疾病，请在医生指导下使用</p>
                  <p>• 孕妇、哺乳期妇女及儿童请谨慎使用</p>
                  <p>• 如有不适，请立即停止使用并咨询医生</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">
                <Heart className="inline-block mr-1 h-4 w-4 text-red-500" />
                基于您的选择的健康益处
              </div>
            </CardFooter>
          </Card>

          <Card className="mt-4 backdrop-blur-sm bg-white/80 border border-gray-100 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">药物相互作用检查</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs space-y-2">
                <p className="text-muted-foreground">请输入您正在服用的药物，系统将检查可能的相互作用:</p>
                <div className="flex space-x-2">
                  <input type="text" placeholder="输入药物名称" className="flex-1 px-2 py-1 border rounded text-xs" />
                  <Button size="sm" variant="outline" className="text-xs h-6">
                    检查
                  </Button>
                </div>
                <div className="pt-2">
                  <p className="font-medium">潜在相互作用:</p>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {Object.entries(elementLevels)
                      .filter(([_, value]) => value > 0)
                      .slice(0, 2)
                      .map(([key]) => {
                        const interactions = medicationInteractions[key as keyof typeof medicationInteractions]
                        if (!interactions || interactions.length === 0) return null
                        return (
                          <li key={key}>
                            {traceElements.find((e) => e.id === key)?.name} 可能与 {interactions.slice(0, 2).join(", ")}{" "}
                            有相互作用
                          </li>
                        )
                      })}
                    <li>请咨询医生以获取完整的药物相互作用信息</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {savedRecipes.length > 0 && (
        <Card className="mt-8 backdrop-blur-sm bg-white/80 border border-gray-100 shadow-lg">
          <CardHeader>
            <CardTitle>已保存的配方</CardTitle>
            <CardDescription>您的自定义水疗方案</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {savedRecipes.map((recipe, index) => (
                <Card key={index} className="overflow-hidden shadow-md">
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{recipe.name}</h3>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {recipe.forCondition && (
                        <Badge className="bg-green-100 text-green-800">适合: {recipe.forCondition}</Badge>
                      )}
                      {recipe.type && (
                        <Badge className="bg-blue-100 text-blue-800">
                          {recipe.type === "balanced"
                            ? "平衡配方"
                            : recipe.type === "tcm-focused"
                              ? "中医为主"
                              : "西医为主"}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
