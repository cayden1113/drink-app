"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserCircle, Settings, Bell } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

export default function UserProfile() {
  const [profile, setProfile] = useState({
    name: "喻博闻",
    age: "20",
    gender: "male",
    weight: "70",
    height: "180",
    activityLevel: "moderate",
    healthGoals: ["hydration", "sleep"],
    notifications: {
      hydrationReminders: true,
      activityAlerts: true,
      sleepReports: true,
      weeklyReports: true,
    },
  })

  const { toast } = useToast()

  const handleProfileUpdate = () => {
    toast({
      title: "个人资料已更新",
      description: "您的个人资料信息已成功保存",
    })
  }

  const handleNotificationUpdate = () => {
    toast({
      title: "通知设置已更新",
      description: "您的通知偏好已成功保存",
    })
  }

  return (
    <Tabs defaultValue="profile">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="profile">
          <UserCircle className="mr-2 h-4 w-4" />
          个人资料
        </TabsTrigger>
        <TabsTrigger value="preferences">
          <Settings className="mr-2 h-4 w-4" />
          偏好设置
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <Bell className="mr-2 h-4 w-4" />
          通知
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card className="bg-gradient-to-br from-white to-blue-50">
          <CardHeader className="border-b pb-6">
            <CardTitle className="text-xl text-blue-900">个人资料</CardTitle>
            <CardDescription className="text-blue-700">管理您的个人信息和健康数据</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-blue-900">
                  姓名
                </Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="border-blue-200 focus:border-blue-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="text-blue-900">
                  年龄
                </Label>
                <Input
                  id="age"
                  value={profile.age}
                  onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                  className="border-blue-200 focus:border-blue-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender" className="text-blue-900">
                  性别
                </Label>
                <Select value={profile.gender} onValueChange={(value) => setProfile({ ...profile, gender: value })}>
                  <SelectTrigger id="gender" className="border-blue-200 focus:border-blue-400">
                    <SelectValue placeholder="选择性别" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">男</SelectItem>
                    <SelectItem value="female">女</SelectItem>
                    <SelectItem value="other">其他</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight" className="text-blue-900">
                  体重 (kg)
                </Label>
                <Input
                  id="weight"
                  value={profile.weight}
                  onChange={(e) => setProfile({ ...profile, weight: e.target.value })}
                  className="border-blue-200 focus:border-blue-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="height" className="text-blue-900">
                  身高 (cm)
                </Label>
                <Input
                  id="height"
                  value={profile.height}
                  onChange={(e) => setProfile({ ...profile, height: e.target.value })}
                  className="border-blue-200 focus:border-blue-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="activityLevel" className="text-blue-900">
                  活动水平
                </Label>
                <Select
                  value={profile.activityLevel}
                  onValueChange={(value) => setProfile({ ...profile, activityLevel: value })}
                >
                  <SelectTrigger id="activityLevel" className="border-blue-200 focus:border-blue-400">
                    <SelectValue placeholder="选择活动水平" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">久坐不动</SelectItem>
                    <SelectItem value="light">轻度活动</SelectItem>
                    <SelectItem value="moderate">中度活动</SelectItem>
                    <SelectItem value="active">活跃</SelectItem>
                    <SelectItem value="very_active">非常活跃</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3 bg-white p-4 rounded-lg shadow-sm">
              <Label className="text-blue-900 font-medium">健康目标</Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2 bg-blue-50 p-3 rounded-md">
                  <input
                    type="checkbox"
                    id="hydration"
                    checked={profile.healthGoals.includes("hydration")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setProfile({ ...profile, healthGoals: [...profile.healthGoals, "hydration"] })
                      } else {
                        setProfile({ ...profile, healthGoals: profile.healthGoals.filter((g) => g !== "hydration") })
                      }
                    }}
                    className="rounded border-blue-300 text-blue-600"
                  />
                  <Label htmlFor="hydration" className="font-normal text-blue-800">
                    改善水分摄入
                  </Label>
                </div>

                <div className="flex items-center space-x-2 bg-blue-50 p-3 rounded-md">
                  <input
                    type="checkbox"
                    id="sleep"
                    checked={profile.healthGoals.includes("sleep")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setProfile({ ...profile, healthGoals: [...profile.healthGoals, "sleep"] })
                      } else {
                        setProfile({ ...profile, healthGoals: profile.healthGoals.filter((g) => g !== "sleep") })
                      }
                    }}
                    className="rounded border-blue-300 text-blue-600"
                  />
                  <Label htmlFor="sleep" className="font-normal text-blue-800">
                    改善睡眠
                  </Label>
                </div>

                <div className="flex items-center space-x-2 bg-blue-50 p-3 rounded-md">
                  <input
                    type="checkbox"
                    id="fitness"
                    checked={profile.healthGoals.includes("fitness")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setProfile({ ...profile, healthGoals: [...profile.healthGoals, "fitness"] })
                      } else {
                        setProfile({ ...profile, healthGoals: profile.healthGoals.filter((g) => g !== "fitness") })
                      }
                    }}
                    className="rounded border-blue-300 text-blue-600"
                  />
                  <Label htmlFor="fitness" className="font-normal text-blue-800">
                    提高健身水平
                  </Label>
                </div>

                <div className="flex items-center space-x-2 bg-blue-50 p-3 rounded-md">
                  <input
                    type="checkbox"
                    id="stress"
                    checked={profile.healthGoals.includes("stress")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setProfile({ ...profile, healthGoals: [...profile.healthGoals, "stress"] })
                      } else {
                        setProfile({ ...profile, healthGoals: profile.healthGoals.filter((g) => g !== "stress") })
                      }
                    }}
                    className="rounded border-blue-300 text-blue-600"
                  />
                  <Label htmlFor="stress" className="font-normal text-blue-800">
                    减轻压力
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6 flex justify-end">
            <Button onClick={handleProfileUpdate} className="bg-blue-600 hover:bg-blue-700">
              保存更改
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="preferences">
        <Card className="bg-gradient-to-br from-white to-blue-50">
          <CardHeader className="border-b pb-6">
            <CardTitle className="text-xl text-blue-900">偏好设置</CardTitle>
            <CardDescription className="text-blue-700">自定义您的应用体验和水分推荐</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-3 bg-white p-4 rounded-lg shadow-sm">
              <Label htmlFor="waterIntake" className="text-blue-900">
                每日水分摄入目标 (ml)
              </Label>
              <Input id="waterIntake" defaultValue="2500" className="border-blue-200 focus:border-blue-400" />
              <p className="text-xs text-blue-600">根据您的体重和活动水平，建议每日摄入2000-3000ml水</p>
            </div>

            <div className="space-y-3 bg-white p-4 rounded-lg shadow-sm">
              <Label htmlFor="reminderFrequency" className="text-blue-900">
                提醒频率
              </Label>
              <Select defaultValue="hourly">
                <SelectTrigger id="reminderFrequency" className="border-blue-200 focus:border-blue-400">
                  <SelectValue placeholder="选择提醒频率" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30min">每30分钟</SelectItem>
                  <SelectItem value="hourly">每小时</SelectItem>
                  <SelectItem value="2hours">每2小时</SelectItem>
                  <SelectItem value="3hours">每3小时</SelectItem>
                  <SelectItem value="4hours">每4小时</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3 bg-white p-4 rounded-lg shadow-sm">
              <Label className="text-blue-900">偏好的微量元素</Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2 bg-blue-50 p-3 rounded-md">
                  <input
                    type="checkbox"
                    id="magnesium"
                    defaultChecked
                    className="rounded border-blue-300 text-blue-600"
                  />
                  <Label htmlFor="magnesium" className="font-normal text-blue-800">
                    镁
                  </Label>
                </div>

                <div className="flex items-center space-x-2 bg-blue-50 p-3 rounded-md">
                  <input
                    type="checkbox"
                    id="calcium"
                    defaultChecked
                    className="rounded border-blue-300 text-blue-600"
                  />
                  <Label htmlFor="calcium" className="font-normal text-blue-800">
                    钙
                  </Label>
                </div>

                <div className="flex items-center space-x-2 bg-blue-50 p-3 rounded-md">
                  <input
                    type="checkbox"
                    id="potassium"
                    defaultChecked
                    className="rounded border-blue-300 text-blue-600"
                  />
                  <Label htmlFor="potassium" className="font-normal text-blue-800">
                    钾
                  </Label>
                </div>

                <div className="flex items-center space-x-2 bg-blue-50 p-3 rounded-md">
                  <input type="checkbox" id="zinc" className="rounded border-blue-300 text-blue-600" />
                  <Label htmlFor="zinc" className="font-normal text-blue-800">
                    锌
                  </Label>
                </div>

                <div className="flex items-center space-x-2 bg-blue-50 p-3 rounded-md">
                  <input type="checkbox" id="selenium" className="rounded border-blue-300 text-blue-600" />
                  <Label htmlFor="selenium" className="font-normal text-blue-800">
                    硒
                  </Label>
                </div>

                <div className="flex items-center space-x-2 bg-blue-50 p-3 rounded-md">
                  <input
                    type="checkbox"
                    id="electrolytes"
                    defaultChecked
                    className="rounded border-blue-300 text-blue-600"
                  />
                  <Label htmlFor="electrolytes" className="font-normal text-blue-800">
                    电解质
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-3 bg-white p-4 rounded-lg shadow-sm">
              <Label className="text-blue-900">健康状况</Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2 bg-blue-50 p-3 rounded-md">
                  <input type="checkbox" id="hypertension" className="rounded border-blue-300 text-blue-600" />
                  <Label htmlFor="hypertension" className="font-normal text-blue-800">
                    高血压
                  </Label>
                </div>

                <div className="flex items-center space-x-2 bg-blue-50 p-3 rounded-md">
                  <input type="checkbox" id="diabetes" className="rounded border-blue-300 text-blue-600" />
                  <Label htmlFor="diabetes" className="font-normal text-blue-800">
                    糖尿病
                  </Label>
                </div>

                <div className="flex items-center space-x-2 bg-blue-50 p-3 rounded-md">
                  <input type="checkbox" id="kidney" className="rounded border-blue-300 text-blue-600" />
                  <Label htmlFor="kidney" className="font-normal text-blue-800">
                    肾脏问题
                  </Label>
                </div>

                <div className="flex items-center space-x-2 bg-blue-50 p-3 rounded-md">
                  <input type="checkbox" id="athlete" className="rounded border-blue-300 text-blue-600" />
                  <Label htmlFor="athlete" className="font-normal text-blue-800">
                    运动员
                  </Label>
                </div>
              </div>
              <p className="text-xs text-blue-600">这些信息将用于定制您的水分推荐</p>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6 flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700">保存偏好</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card className="bg-gradient-to-br from-white to-blue-50">
          <CardHeader className="border-b pb-6">
            <CardTitle className="text-xl text-blue-900">通知设置</CardTitle>
            <CardDescription className="text-blue-700">管理您接收的提醒和通知</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-0.5">
                  <Label htmlFor="hydrationReminders" className="text-blue-900 font-medium">
                    水分提醒
                  </Label>
                  <p className="text-xs text-blue-600">定期提醒您补充水分</p>
                </div>
                <Switch
                  id="hydrationReminders"
                  checked={profile.notifications.hydrationReminders}
                  onCheckedChange={(checked) =>
                    setProfile({
                      ...profile,
                      notifications: { ...profile.notifications, hydrationReminders: checked },
                    })
                  }
                  className="data-[state=checked]:bg-blue-600"
                />
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="space-y-0.5">
                  <Label htmlFor="activityAlerts" className="text-blue-900 font-medium">
                    活动提醒
                  </Label>
                  <p className="text-xs text-blue-600">提醒您起身活动和锻炼</p>
                </div>
                <Switch
                  id="activityAlerts"
                  checked={profile.notifications.activityAlerts}
                  onCheckedChange={(checked) =>
                    setProfile({
                      ...profile,
                      notifications: { ...profile.notifications, activityAlerts: checked },
                    })
                  }
                  className="data-[state=checked]:bg-blue-600"
                />
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="space-y-0.5">
                  <Label htmlFor="sleepReports" className="text-blue-900 font-medium">
                    睡眠报告
                  </Label>
                  <p className="text-xs text-blue-600">每天早上收到您的睡眠质量报告</p>
                </div>
                <Switch
                  id="sleepReports"
                  checked={profile.notifications.sleepReports}
                  onCheckedChange={(checked) =>
                    setProfile({
                      ...profile,
                      notifications: { ...profile.notifications, sleepReports: checked },
                    })
                  }
                  className="data-[state=checked]:bg-blue-600"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="weeklyReports" className="text-blue-900 font-medium">
                    每周健康报告
                  </Label>
                  <p className="text-xs text-blue-600">每周收到您的健康数据摘要</p>
                </div>
                <Switch
                  id="weeklyReports"
                  checked={profile.notifications.weeklyReports}
                  onCheckedChange={(checked) =>
                    setProfile({
                      ...profile,
                      notifications: { ...profile.notifications, weeklyReports: checked },
                    })
                  }
                  className="data-[state=checked]:bg-blue-600"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6 flex justify-end">
            <Button onClick={handleNotificationUpdate} className="bg-blue-600 hover:bg-blue-700">
              保存通知设置
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
