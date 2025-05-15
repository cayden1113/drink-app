"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Share2, Printer, Leaf, Pill, Activity } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MedicalReportProps {
  data: any
  isConnected: boolean
  recommendations: any
}

export default function MedicalReport({ data, isConnected, recommendations }: MedicalReportProps) {
  const { toast } = useToast()
  
  const handleDownload = () => {
    toast({
      title: "报告下载中",
      description: "您的健康报告正在准备下载",
    })
  }
  
  const handleShare = () => {
    toast({
      title: "分享功能",
      description: "分享功能即将上线，敬请期待",
    })
  }
  
  const handlePrint = () => {
    toast({
      title: "打印报告",
      description: "正在准备打印您的健康报告",
    })
  }

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>章衡报告</CardTitle>
          <CardDescription>连接您的智能手环以生成章衡报告</CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-20 mb-4" />
            <p>未检测到设备连接</p>
            <p className="text-sm mt-2">请连接您的智能手环以生成详细的医疗报告</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const currentDate = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const currentTime = new Date().toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">章衡健康评估</CardTitle>
              <CardDescription>
                生成时间: {currentDate} {currentTime}
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-1" />
                下载
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-1" />
                分享
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-1" />
                打印
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="summary">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="summary">综合评估</TabsTrigger>
              <TabsTrigger value="tcm">中医诊断</TabsTrigger>
              <TabsTrigger value="western">西医诊断</TabsTrigger>
              <TabsTrigger value="recommendations">治疗建议</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary" className="mt-4 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">综合健康评分</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center">
                      <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-3xl font-bold">82.0</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-2">
                      <Badge className="bg-blue-100 text-blue-800">良好</Badge>
                      <p className="text-xs text-muted-foreground mt-1">高于78%的同龄人</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">中医体质评估</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center">
                      <Leaf className="h-8 w-8 text-emerald-500 mb-2" />
                      <div className="text-center">
                        <div className="font-medium">
                          {data.yinYangBalance > 0.3 ? "阳盛体质" : 
                           data.yinYangBalance < -0.3 ? "阴虚体质" : "平和体质"}
                        </div>
                        <div className="flex flex-wrap justify-center gap-1 mt-2">
                          {data.meridianBalance.liver < 70 && (
                            <Badge className="bg-green-100 text-green-800">肝气郁结</Badge>
                          )}
                          {data.meridianBalance.spleen < 70 && (
                            <Badge className="bg-yellow-100 text-yellow-800">脾虚湿盛</Badge>
                          )}
                          {data.stressLevel > 50 && (
                            <Badge className="bg-purple-100 text-purple-800">气郁体质</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">西医健康状态</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center">
                      <Pill className="h-8 w-8 text-blue-500 mb-2" />
                      <div className="text-center">
                        <div className="font-medium">
                          {data.inflammation > 3 ? "轻度炎症状态" : 
                           data.hydrationLevel < 60 ? "轻度脱水状态" : "基本健康"}
                        </div>
                        <div className="flex flex-wrap justify-center gap-1 mt-2">
                          {data.inflammation > 2.5 && (
                            <Badge className="bg-red-100 text-red-800">炎症指数↑</Badge>
                          )}
                          {data.cortisol > 15 && (
                            <Badge className="bg-amber-100 text-amber-800">压力激素↑</Badge>
                          )}
                          {data.immuneActivity < 70 && (
                            <Badge className="bg-blue-100 text-blue-800">免疫力↓</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>健康风险评估</CardTitle>
                  <CardDescription>基于您的生理数据分析的潜在健康风险</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <Activity className="h-5 w-5 text-amber-500 mr-2" />
                          <h3 className="font-medium">压力管理</h3>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
                          <div 
                            className={`h-full rounded-full ${
                              data.stressLevel > 60 ? "bg-red-500" : 
                              data.stressLevel > 40 ? "bg-amber-500" : "bg-green-500"
                            }`} 
                            style={{ width: `${data.stressLevel}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {data.stressLevel > 60 ? "高风险" : 
                           data.stressLevel > 40 ? "中等风险" : "低风险"} ({Number(data.stressLevel).toFixed(1)}%)
                        </p>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <Leaf className="h-5 w-5 text-emerald-500 mr-2" />
                          <h3 className="font-medium">阴阳平衡</h3>
                        </div>
                        <div className="relative h-2 bg-gradient-to-r from-blue-400 via-purple-200 to-red-400 rounded-full mb-2">
                          <div 
                            className="absolute top-0 bottom-0 w-2 h-2 bg-white border border-gray-800 rounded-full"
                            style={{
                              left: `calc(50% + ${data.yinYangBalance * 50}% - 4px)`,
                            }}
                          ></div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {data.yinYangBalance > 0.3 ? "偏阳" : 
                           data.yinYangBalance < -0.3 ? "偏阴" : "平衡"} ({Number(data.yinYangBalance).toFixed(1)})
                        </p>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <Pill className="h-5 w-5 text-blue-500 mr-2" />
                          <h3 className="font-medium">炎症指数</h3>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
                          <div 
                            className={`h-full rounded-full ${
                              data.inflammation > 3 ? "bg-red-500" : 
                              data.inflammation > 2 ? "bg-amber-500" : "bg-green-500"
                            }`} 
                            style={{ width: `${(data.inflammation / 5) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {data.inflammation > 3 ? "高风险" : 
                           data.inflammation > 2 ? "中等风险" : "低风险"} ({Number(data.inflammation).toFixed(1)})
                        </p>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">综合评估结果</h3>
                      <p className="text-sm">
                        根据您的生理数据分析，您的整体健康状况为<span className="font-medium text-blue-600">良好</span>。
                        您的主要健康风险点在于{data.stressLevel > 50 ? "压力管理" : 
                        data.inflammation > 2.5 ? "炎症水平" : 
                        data.hydrationLevel < 60 ? "水分水平" : "免疫功能"}，
                        建议您关注这一方面并采取相应的改善措施。
                      </p>
                      <div className="mt-2 text-sm">
                        <h4 className="font-medium mb-1">建议关注：</h4>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          {data.stressLevel > 50 && <li>减轻压力，增加放松活动</li>}
                          {data.inflammation > 2.5 && <li>调整饮食，增加抗炎食物摄入</li>}
                          {data.hydrationLevel < 60 && <li>增加水分摄入，使用定制水疗方案</li>}
                          {data.immuneActivity < 70 && <li>增强免疫力，保持充足睡眠</li>}
                          <li>定期监测健康指标变化</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tcm">
              <Card>
                <CardHeader>
                  <CardTitle>中医诊断报告</CardTitle>
                  <CardDescription>基于传统中医理论的体质分析</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">体质辨识</h3>
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center mb-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                              <Leaf className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">
                                {data.yinYangBalance > 0.3 ? "阳盛体质" : 
                                 data.yinYangBalance < -0.3 ? "阴虚体质" : "平和体质"}
                              </h4>
                              <p className="text-xs text-muted-foreground">阴阳平衡: {Number(data.yinYangBalance).toFixed(1)}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>阴阳平衡</span>
                                <span>{Number(data.yinYangBalance).toFixed(1)}</span>
                              </div>
                              <div className="relative h-2 bg-gradient-to-r from-blue-400 via-purple-200 to-red-400 rounded-full">
                                <div 
                                  className="absolute top-0 bottom-0 w-2 h-2 bg-white border border-gray-800 rounded-full"
                                  style={{
                                    left: `calc(50% + ${data.yinYangBalance * 50}% - 4px)`,
                                  }}
                                ></div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium mt-3 mb-2">体质特征</h4>
                              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                {data.yinYangBalance > 0.3 && (
                                  <>
                                    <li>面色偏红，容易口干舌燥</li>
                                    <li>性格急躁，易出汗</li>
                                    <li>偏好冷饮，不耐热</li>
                                  </>
                                )}
                                {data.yinYangBalance < -0.3 && (
                                  <>
                                    <li>面色偏白，手脚易冰凉</li>
                                    <li>精神疲倦，怕冷</li>
                                    <li>偏好热饮，不耐寒</li>
                                  </>
                                )}
                                {data.yinYangBalance >= -0.3 && data.yinYangBalance <= 0.3 && (
                                  <>
                                    <li>面色红润，精力充沛</li>
                                    <li>情绪稳定，适应力强</li>
                                    <li>饮食规律，睡眠良好</li>
                                  </>
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">经络状态</h3>
                        <div className="border rounded-lg p-4">
                          <div className="grid grid-cols-5 gap-2 mb-3">
                            {Object.entries(data.meridianBalance).map(([meridian, value]) => (
                              <div key={meridian} className="text-center">
                                <div className="w-full bg-gray-200 h-2 rounded-full mb-1">
                                  <div
                                    className={`h-full rounded-full ${
                                      Number(value) > 80 ? "bg-green-500" : Number(value) > 70 ? "bg-blue-500" : "bg-amber-500"
                                    }`}
                                    style={{ width: `${value}%` }}
                                  ></div>
                                </div>
                                <div className="text-xs">{meridian}经</div>
                                <div className="text-xs font-medium">{Number(value).toFixed(1)}%</div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="space-y-2 mt-4">
                            <h4 className="text-sm font-medium mb-2">经络异常</h4>
                            {Object.entries(data.meridianBalance)
                              .filter(([_, value]) => Number(value) < 70)
                              .map(([meridian]) => (
                                <div key={meridian} className="flex items-start">
                                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 mr-2"></div>
                                  <div>
                                    <p className="text-sm font-medium">{meridian}经不足</p>
                                    <p className="text-xs text-muted-foreground">
                                      {meridian === "lung" ? "可能导致呼吸系统问题，易感冒" : 
                                       meridian === "heart" ? "可能导致心悸、失眠、多梦" : 
                                       meridian === "spleen" ? "可能导致消化不良、疲劳乏力" : 
                                       meridian === "liver" ? "可能导致情绪波动、头痛目眩" : 
                                       "可能导致腰膝酸软、耳鸣健忘"}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            {Object.entries(data.meridianBalance).every(([_, value]) => Number(value) >= 70) && (
                              <p className="text-sm text-muted-foreground">经络状态良好，无明显异常</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium mb-3">中医调理建议</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">饮食调理</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            {data.yinYangBalance > 0.3 && (
                              <>
                                <li>多食用滋阴清热食物：莲子、百合、银耳</li>
                                <li>少食辛辣刺激性食物</li>
                                <li>建议饮用菊花、枸杞茶</li>
                              </>
                            )}
                            {data.yinYangBalance < -0.3 && (
                              <>
                                <li>多食用温阳补气食物：羊肉、生姜、桂圆</li>
                                <li>少食生冷寒凉食物</li>
                                <li>建议饮用红枣、黄芪茶</li>
                              </>
                            )}
                            {data.meridianBalance.liver < 70 && (
                              <li>多食用疏肝理气食物：柑橘、玫瑰花、白萝卜</li>
                            )}
                            {data.meridianBalance.spleen < 70 && (
                              <li>多食用健脾益气食物：山药、红枣、小米</li>
                            )}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">生活起居</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            {data.yinYangBalance > 0.3 && (
                              <li>保持情绪平和，避免过度劳累和熬夜</li>
                            )}
                            {data.yinYangBalance < -0.3 && (
                              <li>注意保暖，避免受寒，适当运动增强体质</li>
                            )}
                            <li>保持规律作息，早睡早起</li>
                            <li>适当进行太极、八段锦等传统养生运动</li>
                            <li>使用定制水疗方案调理体质</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">推荐水疗方案</h4>
                        <div className="flex flex-wrap gap-2">
                          {data.yinYangBalance > 0.3 && (
                            <>
                              <Badge className="bg-emerald-100 text-emerald-800">菊花提取物</Badge>
                              <Badge className="bg-emerald-100 text-emerald-800">枸杞提取物</Badge>
                            </>
                          )}
                          {data.yinYangBalance < -0.3 && (
                            <>
                              <Badge className="bg-emerald-100 text-emerald-800">人参提取物</Badge>
                              <Badge className="bg-emerald-100 text-emerald-800">黄芪提取物</Badge>
                            </>
                          )}
                          {data.meridianBalance.liver < 70 && (
                            <Badge className="bg-emerald-100 text-emerald-800">菊花提取物</Badge>
                          )}
                          {data.meridianBalance.spleen < 70 && (
                            <Badge className="bg-emerald-100 text-emerald-800">黄芪提取物</Badge>
                          )}
                          {data.meridianBalance.kidney < 70 && (
                            <Badge className="bg-emerald-100 text-emerald-800">枸杞提取物</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="western">
              <Card>
                <CardHeader>
                  <CardTitle>西医诊断报告</CardTitle>
                  <CardDescription>基于现代医学理论的生理指标分析</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">生理指标</h3>
                        <div className="border rounded-lg p-4">
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>心率</span>
                                <span className={data.heartRate > 100 || data.heartRate < 60 ? "text-red-500" : "text-green-500"}>
                                  {Number(data.heartRate).toFixed(1)} bpm
                                </span>
                              </div>
                              <div className="w-full h-2 bg-gray-200 rounded-full">
                                <div
                                  className={`h-full rounded-full ${
                                    data.heartRate > 100 || data.heartRate < 60 ? "bg-red-500" : "bg-green-500"
                                  }`}
                                  style={{ width: `${(data.heartRate / 200) * 100}%` }}
                                ></div>
                              </div>
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>偏低</span>
                                <span>正常</span>
                                <span>偏高</span>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>血压</span>
                                <span className={
                                  data.bloodPressure.systolic > 140 || data.bloodPressure.systolic < 90 || 
                                  data.bloodPressure.diastolic > 90 || data.bloodPressure.diastolic < 60 
                                    ? "text-red-500" : "text-green-500"
                                }>
                                  {data.bloodPressure.systolic}/{data.bloodPressure.diastolic} mmHg
                                </span>
                              </div>
                              <div className="w-full h-2 bg-gray-200 rounded-full">
                                <div
                                  className={`h-full rounded-full ${
                                    data.bloodPressure.systolic > 140 || data.bloodPressure.systolic < 90 ? "bg-red-500" : "bg-green-500"
                                  }`}
                                  style={{ width: `${(data.bloodPressure.systolic / 200) * 100}%` }}
                                ></div>
                              </div>
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>偏低</span>
                                <span>正常</span>
                                <span>偏高</span>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>血糖</span>
                                <span className={data.bloodGlucose > 6.1 ? "text-red-500" : "text-green-500"}>
                                  {Number(data.bloodGlucose).toFixed(1)} mmol/L
                                </span>
                              </div>
                              <div className="w-full h-2 bg-gray-200 rounded-full">
                                <div
                                  className={`h-full rounded-full ${
                                    data.bloodGlucose > 6.1 ? "bg-red-500" : data.bloodGlucose > 5.6 ? "bg-amber-500" : "bg-green-500"
                                  }`}
                                  style={{ width: `${(data.bloodGlucose / 10) * 100}%` }}
                                ></div>
                              </div>
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>正常</span>
                                <span>偏高</span>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>炎症指数</span>
                                <span className={data.inflammation > 2.5 ? "text-red-500" : "text-green-500"}>
                                  {Number(data.inflammation).toFixed(1)}
                                </span>
                              </div>
                              <div className="w-full h-2 bg-gray-200 rounded-full">
                                <div
                                  className={`h-full rounded-full ${
                                    data.inflammation > 3 ? "bg-red-500" : data.inflammation > 2 ? "bg-amber-500" : "bg-green-500"
                                  }`}
                                  style={{ width: `${(data.inflammation / 5) * 100}%` }}
                                ></div>
                              </div>
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>正常</span>
                                <span>偏高</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">电解质平衡</h3>
                        <div className="border rounded-lg p-4">
                          <div className="grid grid-cols-2 gap-4">
                            {Object.entries(data.electrolytes).map(([electrolyte, value]) => (
                              <div key={electrolyte} className="text-center">
                                <div className="text-xs mb-1">{electrolyte}</div>
                                <div className="text-sm font-medium">{Number(value).toFixed(1)} mmol/L</div>
                                <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                                  <div
                                    className={`h-full rounded-full ${
                                      electrolyte === "sodium"
                                        ? value < 135 || value > 145 ? "bg-amber-500" : "bg-green-500"
                                        : electrolyte === "potassium"
                                          ? value < 3.5 || value > 5.0 ? "bg-amber-500" : "bg-green-500"
                                          : electrolyte === "chloride"
                                            ? value < 98 || value > 106 ? "bg-amber-500" : "bg-green-500"
                                            : value < 22 || value > 29 ? "bg-amber-500" : "bg-green-500"
                                    }`}
                                    style={{ 
                                      width: electrolyte === "sodium" 
                                        ? `${(value / 150) * 100}%` 
                                        : electrolyte === "potassium"
                                          ? `${(value / 6) * 100}%`
                                          : electrolyte === "chloride"
                                            ? `${(value / 110) * 100}%`
                                            : `${(value / 30) * 100}%`
                                    }}
                                  ></div>
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
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
                        
                        <h3 className="text-lg font-medium mb-3 mt-4">免疫功能</h3>
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center mb-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                              <Pill className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">
                                {data.immuneActivity > 85 ? "优秀" : data.immuneActivity > 70 ? "良好" : "偏低"}
                              </h4>
                              <p className="text-xs text-muted-foreground">免疫活性: {Number(data.immuneActivity).toFixed(1)}%</p>
                            </div>
                          </div>
                          
                          <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
                            <div
                              className={`h-full rounded-full ${
                                data.immuneActivity > 85 ? "bg-green-500" : data.immuneActivity > 70 ? "bg-blue-500" : "bg-amber-500"
                              }`}
                              style={{ width: `${data.immuneActivity}%` }}
                            ></div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground">
                            {data.immuneActivity > 85 
                              ? "您的免疫系统功能优秀，抵抗力强。" 
                              : data.immuneActivity > 70 
                                ? "您的免疫系统功能良好，具有正常的抵抗力。" 
                                : "您的免疫系统功能偏低，抵抗力可能不足。"}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium mb-3">西医调理建议</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">营养建议</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            {data.hydrationLevel < 60 && (
                              <li>增加水分摄入，每天至少饮用2升水</li>
                            )}
                            {data.inflammation > 2.5 && (
                              <li>增加抗炎食物摄入：富含Omega-3的鱼类、橄榄油、坚果</li>
                            )}
                            {data.immuneActivity < 70 && (
                              <li>增加富含维生素C、D和锌的食物：柑橘类水果、鱼类、坚果</li>
                            )}
                            <li>保持均衡饮食，摄入足够的蛋白质、维生素和矿物质</li>
                            <li>限制精制糖和加工食品的摄入</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">生活方式建议</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            {data.stressLevel > 50 && (
                              <li>采用压力管理技巧：深呼吸、冥想、瑜伽</li>
                            )}
                            <li>保持规律运动，每周至少150分钟中等强度有氧运动</li>
                            <li>确保充足睡眠，每晚7-8小时
