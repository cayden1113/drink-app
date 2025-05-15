"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Pill, AlertTriangle, Check, Info } from "lucide-react"

interface FormulaDetailsProps {
  formula: any
  healthData: any
  onClose: () => void
}

export default function FormulaDetails({ formula, healthData, onClose }: FormulaDetailsProps) {
  if (!formula) return null

  // 获取配方中的中医和西医成分
  const tcmIngredients = Object.entries(formula.elementLevels)
    .filter(
      ([key]) =>
        key.includes("ginseng") ||
        key.includes("astragalus") ||
        key.includes("licorice") ||
        key.includes("goji") ||
        key.includes("chrysanthemum") ||
        key.includes("schisandra"),
    )
    .filter(([_, value]) => (value as number) > 0)
    .map(([key, value]) => ({ id: key, level: value as number }))

  const westernIngredients = Object.entries(formula.elementLevels)
    .filter(
      ([key]) =>
        key.includes("magnesium") ||
        key.includes("calcium") ||
        key.includes("potassium") ||
        key.includes("zinc") ||
        key.includes("selenium") ||
        key.includes("vitamin") ||
        key.includes("omega") ||
        key.includes("coq10"),
    )
    .filter(([_, value]) => (value as number) > 0)
    .map(([key, value]) => ({ id: key, level: value as number }))

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center">
            <span className="mr-2">{formula.name}</span>
            <Badge className="bg-green-100 text-green-800">适合: {formula.forCondition}</Badge>
            {formula.type && (
              <Badge className="ml-2 bg-blue-100 text-blue-800">
                {formula.type === "balanced" ? "平衡配方" : formula.type === "tcm-focused" ? "中医为主" : "西医为主"}
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>基于您的健康数据分析生成的个性化水疗方案</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">配方概览</TabsTrigger>
            <TabsTrigger value="tcm">中医分析</TabsTrigger>
            <TabsTrigger value="western">西医分析</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>配方组成</CardTitle>
                <CardDescription>此配方的主要活性成分及其含量</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <Leaf className="h-4 w-4 mr-1 text-emerald-500" />
                      中医成分
                    </h3>
                    <ul className="space-y-2">
                      {tcmIngredients.length > 0 ? (
                        tcmIngredients.map((ingredient) => (
                          <li key={ingredient.id} className="flex justify-between text-sm">
                            <span>{ingredient.id.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}</span>
                            <span>{ingredient.level} mg/L</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-muted-foreground">无中医成分</li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <Pill className="h-4 w-4 mr-1 text-blue-500" />
                      西医成分
                    </h3>
                    <ul className="space-y-2">
                      {westernIngredients.length > 0 ? (
                        westernIngredients.map((ingredient) => (
                          <li key={ingredient.id} className="flex justify-between text-sm">
                            <span>{ingredient.id.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}</span>
                            <span>{ingredient.level} mg/L</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-muted-foreground">无西医成分</li>
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>健康数据分析</CardTitle>
                <CardDescription>基于您的生理指标生成的配方推荐理由</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-medium mb-2">关键健康指标</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span>水分水平:</span>
                          <span className={healthData.hydrationLevel < 60 ? "text-red-500" : "text-green-500"}>
                            {healthData.hydrationLevel}%
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span>阴阳平衡:</span>
                          <span>
                            {healthData.yinYangBalance > 0.3
                              ? "偏阳"
                              : healthData.yinYangBalance < -0.3
                                ? "偏阴"
                                : "平衡"}
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span>炎症指数:</span>
                          <span className={healthData.inflammation > 2.5 ? "text-red-500" : "text-green-500"}>
                            {healthData.inflammation}
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span>免疫活性:</span>
                          <span className={healthData.immuneActivity < 70 ? "text-amber-500" : "text-green-500"}>
                            {healthData.immuneActivity}%
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-medium mb-2">配方匹配度</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>整体匹配度</span>
                            <span>92%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: "92%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>中医理论匹配度</span>
                            <span>88%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: "88%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>西医理论匹配度</span>
                            <span>95%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: "95%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-2">配方推荐理由</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <p>
                          基于您的{formula.forCondition}状况，此配方特别添加了
                          {formula.highlightedElements?.includes("ginseng") && "人参提取物"}
                          {formula.highlightedElements?.includes("astragalus") && "、黄芪提取物"}
                          {formula.highlightedElements?.includes("magnesium") && "、镁"}
                          {formula.highlightedElements?.includes("selenium") && "、硒"}
                          等成分，有助于改善您的健康状况。
                        </p>
                      </div>

                      {healthData.yinYangBalance > 0.3 && (
                        <div className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <p>您的体质偏阳，配方中添加了具有滋阴作用的成分，如枸杞提取物和菊花提取物，帮助平衡阴阳。</p>
                        </div>
                      )}

                      {healthData.yinYangBalance < -0.3 && (
                        <div className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <p>
                            您的体质偏阴，配方中添加了具有温阳作用的成分，如人参提取物和五味子提取物，帮助平衡阴阳。
                          </p>
                        </div>
                      )}

                      {healthData.inflammation > 2.5 && (
                        <div className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <p>
                            您的炎症指数偏高，配方中添加了具有抗炎作用的成分，如Omega-3脂肪酸和硒，帮助降低炎症水平。
                          </p>
                        </div>
                      )}

                      {healthData.hydrationLevel < 60 && (
                        <div className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <p>您的水分水平偏低，配方中添加了电解质和矿物质，帮助提高水分吸收和保持。</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tcm" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>中医辨证分析</CardTitle>
                <CardDescription>基于传统中医理论的体质分析和配方设计</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-2">体质辨识</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-xs font-medium mb-1">主要体质类型</h4>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-amber-100 text-amber-800">
                            {healthData.yinYangBalance > 0.3
                              ? "阳盛体质"
                              : healthData.yinYangBalance < -0.3
                                ? "阴虚体质"
                                : "平和体质"}
                          </Badge>
                          {healthData.meridianBalance.liver < 70 && (
                            <Badge className="bg-green-100 text-green-800">肝气郁结</Badge>
                          )}
                          {healthData.meridianBalance.spleen < 70 && (
                            <Badge className="bg-yellow-100 text-yellow-800">脾虚湿盛</Badge>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-medium mb-1">次要体质特征</h4>
                        <div className="flex items-center space-x-2">
                          {healthData.stressLevel > 50 && <Badge variant="outline">气郁体质</Badge>}
                          {healthData.hydrationLevel < 60 && <Badge variant="outline">津液不足</Badge>}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-2">经络分析</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {Object.entries(healthData.meridianBalance).map(([meridian, value]) => (
                        <div key={meridian} className="text-center">
                          <div className="text-xs mb-1">{meridian}经</div>
                          <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div
                              className={`h-full rounded-full ${
                                Number(value) > 80 ? "bg-green-500" : Number(value) > 60 ? "bg-blue-500" : "bg-red-500"
                              }`}
                              style={{ width: `${value}%` }}
                            ></div>
                          </div>
                          <div className="text-xs mt-1">{value}%</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-2">中医配方设计原理</h3>
                    <div className="space-y-2 text-sm">
                      <p>根据您的体质特点，本配方采用以下中医理论设计：</p>

                      {healthData.yinYangBalance > 0.3 && (
                        <div className="flex items-start">
                          <Info className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                          <p>
                            <span className="font-medium">滋阴清热：</span>
                            您体内阳气偏盛，配方中添加了枸杞、菊花等滋阴清热的药材，帮助平衡阴阳。
                          </p>
                        </div>
                      )}

                      {healthData.yinYangBalance < -0.3 && (
                        <div className="flex items-start">
                          <Info className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                          <p>
                            <span className="font-medium">温阳补气：</span>
                            您体内阴气偏盛，配方中添加了人参、黄芪等温阳补气的药材，帮助平衡阴阳。
                          </p>
                        </div>
                      )}

                      {healthData.meridianBalance.liver < 70 && (
                        <div className="flex items-start">
                          <Info className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                          <p>
                            <span className="font-medium">疏肝理气：</span>
                            您的肝经气血运行不畅，配方中添加了疏肝理气的成分，帮助改善肝气郁结。
                          </p>
                        </div>
                      )}

                      {healthData.meridianBalance.spleen < 70 && (
                        <div className="flex items-start">
                          <Info className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                          <p>
                            <span className="font-medium">健脾祛湿：</span>
                            您的脾经功能偏弱，配方中添加了健脾祛湿的成分，帮助改善脾虚湿盛。
                          </p>
                        </div>
                      )}

                      <div className="flex items-start">
                        <Info className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                        <p>
                          <span className="font-medium">配伍原则：</span>
                          本配方遵循"君臣佐使"原则，主要药材为君药，辅助药材为臣药，调和药性的为佐药，引药入经的为使药，形成协同作用。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="western" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>西医科学分析</CardTitle>
                <CardDescription>基于现代医学理论的生理指标分析和配方设计</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-2">生化指标分析</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>血糖水平</span>
                            <span className={healthData.bloodGlucose > 6.1 ? "text-red-500" : "text-green-500"}>
                              {healthData.bloodGlucose} mmol/L
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div
                              className={`h-full rounded-full ${
                                healthData.bloodGlucose > 6.1
                                  ? "bg-red-500"
                                  : healthData.bloodGlucose > 5.6
                                    ? "bg-amber-500"
                                    : "bg-green-500"
                              }`}
                              style={{ width: `${(healthData.bloodGlucose / 10) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>正常</span>
                            <span>偏高</span>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>皮质醇水平</span>
                            <span className={healthData.cortisol > 20 ? "text-red-500" : "text-green-500"}>
                              {healthData.cortisol} μg/dL
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div
                              className={`h-full rounded-full ${
                                healthData.cortisol > 20
                                  ? "bg-red-500"
                                  : healthData.cortisol > 15
                                    ? "bg-amber-500"
                                    : "bg-green-500"
                              }`}
                              style={{ width: `${(healthData.cortisol / 30) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>正常</span>
                            <span>偏高</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>炎症指数</span>
                            <span className={healthData.inflammation > 2.5 ? "text-red-500" : "text-green-500"}>
                              {healthData.inflammation}
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div
                              className={`h-full rounded-full ${
                                healthData.inflammation > 3
                                  ? "bg-red-500"
                                  : healthData.inflammation > 2
                                    ? "bg-amber-500"
                                    : "bg-green-500"
                              }`}
                              style={{ width: `${(healthData.inflammation / 5) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>正常</span>
                            <span>偏高</span>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>免疫活性</span>
                            <span className={healthData.immuneActivity < 70 ? "text-amber-500" : "text-green-500"}>
                              {healthData.immuneActivity}%
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div
                              className={`h-full rounded-full ${
                                healthData.immuneActivity < 60
                                  ? "bg-red-500"
                                  : healthData.immuneActivity < 70
                                    ? "bg-amber-500"
                                    : "bg-green-500"
                              }`}
                              style={{ width: `${healthData.immuneActivity}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>偏低</span>
                            <span>正常</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-2">电解质平衡</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(healthData.electrolytes).map(([electrolyte, value]) => (
                        <div key={electrolyte} className="text-center">
                          <div className="text-xs mb-1">{electrolyte}</div>
                          <div className="text-sm font-medium">{value} mmol/L</div>
                          <div className="text-xs text-muted-foreground">
                            {electrolyte === "sodium"
                              ? value < 135
                                ? "偏低"
                                : value > 145
                                  ? "偏高"
                                  : "正常"
                              : electrolyte === "potassium"
                                ? value < 3.5
                                  ? "偏低"
                                  : value > 5.0
                                    ? "偏高"
                                    : "正常"
                                : electrolyte === "chloride"
                                  ? value < 98
                                    ? "偏低"
                                    : value > 106
                                      ? "偏高"
                                      : "正常"
                                  : value < 22
                                    ? "偏低"
                                    : value > 29
                                      ? "偏高"
                                      : "正常"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-2">西医配方设计原理</h3>
                    <div className="space-y-2 text-sm">
                      <p>根据您的生理指标，本配方采用以下现代医学理论设计：</p>

                      {healthData.inflammation > 2.5 && (
                        <div className="flex items-start">
                          <Info className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                          <p>
                            <span className="font-medium">抗炎作用：</span>
                            您的炎症指数偏高，配方中添加了Omega-3脂肪酸、硒等具有抗炎作用的成分，帮助降低体内炎症水平。
                          </p>
                        </div>
                      )}

                      {healthData.immuneActivity < 70 && (
                        <div className="flex items-start">
                          <Info className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                          <p>
                            <span className="font-medium">免疫调节：</span>
                            您的免疫活性偏低，配方中添加了锌、维生素D等具有免疫调节作用的成分，帮助提高免疫功能。
                          </p>
                        </div>
                      )}

                      {healthData.cortisol > 15 && (
                        <div className="flex items-start">
                          <Info className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                          <p>
                            <span className="font-medium">压力管理：</span>
                            您的皮质醇水平偏高，配方中添加了镁、B族维生素等具有缓解压力作用的成分，帮助调节神经系统功能。
                          </p>
                        </div>
                      )}

                      {healthData.hydrationLevel < 60 && (
                        <div className="flex items-start">
                          <Info className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                          <p>
                            <span className="font-medium">水分平衡：</span>
                            您的水分水平偏低，配方中添加了电解质和矿物质，帮助维持细胞内外的水分平衡和渗透压。
                          </p>
                        </div>
                      )}

                      <div className="flex items-start">
                        <Info className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                        <p>
                          <span className="font-medium">协同作用：</span>
                          本配方中的各种成分经过精确计算，确保它们之间的协同作用最大化，同时避免潜在的拮抗作用。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            <AlertTriangle className="h-3 w-3 inline-block mr-1" />
            本分析仅供参考，不能替代专业医疗建议
          </div>
          <Button onClick={onClose}>关闭</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
