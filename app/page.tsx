import type { Metadata } from "next"
import Dashboard from "@/components/dashboard"

export const metadata: Metadata = {
  title: "沁源·中西智疗系统",
  description: "基于智能手环数据的个性化中西医结合水疗方案",
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 tracking-tight bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            沁源·中西智疗系统
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full mb-4"></div>
          <p className="text-center text-blue-700 mb-2 max-w-3xl mx-auto text-lg">
            融合传统中医理论与现代医学科技，基于智能手环监测的生理数据，为您提供个性化的水疗方案
          </p>
          <p className="text-center text-blue-600 max-w-2xl mx-auto text-sm">
            国家医疗级认证 · 智能配方系统 · 精准健康管理
          </p>
        </div>
        <Dashboard />
      </div>
    </div>
  )
}
