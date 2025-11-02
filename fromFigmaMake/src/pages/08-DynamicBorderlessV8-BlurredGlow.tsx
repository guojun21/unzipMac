import { motion } from "motion/react";
import { 
  DynamicBorderlessCardV8A, 
  DynamicBorderlessCardV8B, 
  DynamicBorderlessCardV8C 
} from "../components/borderless/DynamicBorderlessCardV8";
import { ArrowLeft, FileArchive, Sliders, Zap, Layers, Sparkles } from "lucide-react";
import { useState } from "react";

interface DynamicBorderlessV8BlurredGlowProps {
  onBack?: () => void;
}

export default function DynamicBorderlessV8BlurredGlow({ onBack }: DynamicBorderlessV8BlurredGlowProps) {
  // Interactive control panel state
  const [iconBlur, setIconBlur] = useState(2);
  const [containerBlur, setContainerBlur] = useState(32);
  const [glowSpread, setGlowSpread] = useState(70);
  const [glowBlur, setGlowBlur] = useState(8); // NEW: Glow blur amount

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50/30 py-12 px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="mb-2">
                <h1 className="text-5xl">Dynamic Borderless v0.8</h1>
              </div>
              <p className="text-xl text-slate-600">探索：让光晕本身也被模糊，实现真正的雾气扩散效果</p>
              <p className="text-sm text-slate-500 mt-2">Exploration: Making the glow itself blurred for true mist diffusion</p>
            </div>
            {onBack && (
              <motion.button
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-slate-500 to-slate-600 text-white flex items-center gap-2"
                style={{
                  boxShadow: '0 0 20px rgba(100,116,139,0.3), 0 0 40px rgba(100,116,139,0.15)'
                }}
                whileHover={{
                  boxShadow: '0 0 30px rgba(100,116,139,0.4), 0 0 60px rgba(100,116,139,0.2)',
                  y: -2
                }}
                whileTap={{ scale: 0.98 }}
                onClick={onBack}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>返回</span>
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Problem Statement */}
        <Section title="🎯 核心问题" subtitle="The Problem">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white">❌</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-orange-900 mb-2">
                    backdrop-filter: blur() 只模糊背景，不模糊光晕
                  </h3>
                  <p className="text-orange-700 text-sm">
                    <code className="bg-orange-200 px-2 py-1 rounded">backdrop-filter: blur()</code> 只会模糊元素"背后"的内容，
                    不会影响元素自己的 <code className="bg-orange-200 px-2 py-1 rounded">box-shadow</code> (光晕)。
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white">⚡</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-orange-900 mb-2">
                    导致光晕边缘清晰，不符合"雾气"的感觉
                  </h3>
                  <p className="text-orange-700 text-sm">
                    即使容器很模糊，光晕依然是清晰的光圈，无法实现真正的雾气弥散效果。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Solution Comparison */}
        <Section title="💡 3种技术方案对比" subtitle="Technical Solutions Comparison">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Solution A */}
            <div className="p-6 rounded-2xl bg-white border-2 border-purple-200">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-medium text-purple-900">方案 A</h3>
              </div>
              <h4 className="text-base font-medium text-slate-900 mb-2">filter: blur()</h4>
              <p className="text-sm text-slate-600 mb-4">
                使用 <code className="bg-purple-100 px-1 rounded">filter</code> 替代 <code className="bg-purple-100 px-1 rounded">backdrop-filter</code>，
                模糊整个元素（包括光晕）
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-slate-700">光晕确实会被模糊</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-slate-700">实现简单直接</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-600">⚠</span>
                  <span className="text-slate-700">需要嵌套保护内容清晰</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-600">⚠</span>
                  <span className="text-slate-700">性能：中等（2层）</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-purple-200">
                <p className="text-xs text-purple-700 font-medium">推荐度: ⭐⭐⭐</p>
              </div>
            </div>

            {/* Solution B */}
            <div className="p-6 rounded-2xl bg-white border-2 border-cyan-200">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-5 h-5 text-cyan-600" />
                <h3 className="text-lg font-medium text-cyan-900">方案 B</h3>
              </div>
              <h4 className="text-base font-medium text-slate-900 mb-2">双层光晕结构</h4>
              <p className="text-sm text-slate-600 mb-4">
                独立的光晕层 + 容器层，各自独立控制模糊
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-slate-700">光晕和容器独立控制</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-slate-700">效果最灵活</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-slate-700">内容自动清晰</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-600">⚠</span>
                  <span className="text-slate-700">多一层DOM</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-cyan-200">
                <p className="text-xs text-cyan-700 font-medium">推荐度: ⭐⭐⭐⭐</p>
              </div>
            </div>

            {/* Solution C */}
            <div className="p-6 rounded-2xl bg-white border-2 border-green-200">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-medium text-green-900">方案 C</h3>
              </div>
              <h4 className="text-base font-medium text-slate-900 mb-2">伪元素光晕</h4>
              <p className="text-sm text-slate-600 mb-4">
                使用类似伪元素的独立层作为光晕
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-slate-700">HTML结构简洁</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-slate-700">光晕可模糊</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-600">⚠</span>
                  <span className="text-slate-700">React中难以真正用伪元素</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-600">⚠</span>
                  <span className="text-slate-700">控制性��弱</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-green-200">
                <p className="text-xs text-green-700 font-medium">推荐度: ⭐⭐⭐</p>
              </div>
            </div>
          </div>
        </Section>

        {/* Interactive Control Panel */}
        <Section title="🎛️ 实时参数调节面板" subtitle="Real-time Parameter Control">
          <div className="p-8 rounded-2xl backdrop-blur-lg" style={{
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 70%, transparent 100%)',
            boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.08)'
          }}>
            <div className="flex items-center gap-3 mb-8">
              <Sliders className="w-6 h-6 text-indigo-600" />
              <div>
                <h3 className="text-xl">调节参数观察3种方案的光晕模糊效果</h3>
                <p className="text-sm text-slate-600">All sliders apply to all 3 solutions - compare the results</p>
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-6 mb-8">
              {/* Slider 1: Icon background blur */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">
                    1️⃣ 紫色背景模糊
                  </label>
                  <span className="text-sm font-mono text-purple-600 font-bold">{iconBlur.toFixed(1)}px</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={iconBlur}
                  onChange={(e) => setIconBlur(parseFloat(e.target.value))}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <p className="text-xs text-slate-500 mt-1">控制紫色图标背景的边缘柔和度</p>
              </div>

              {/* Slider 2: Container backdrop blur */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">
                    2️⃣ 容器背景模糊
                  </label>
                  <span className="text-sm font-mono text-cyan-600 font-bold">{containerBlur}px</span>
                </div>
                <input 
                  type="range"
                  min="10"
                  max="50"
                  step="1"
                  value={containerBlur}
                  onChange={(e) => setContainerBlur(parseInt(e.target.value))}
                  className="w-full h-2 bg-cyan-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                />
                <p className="text-xs text-slate-500 mt-1">控制容器背后内容的模糊度（方案B/C）</p>
              </div>

              {/* Slider 3: Glow spread */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">
                    3️⃣ 光晕扩散范围
                  </label>
                  <span className="text-sm font-mono text-orange-600 font-bold">{glowSpread}px</span>
                </div>
                <input 
                  type="range"
                  min="20"
                  max="120"
                  step="5"
                  value={glowSpread}
                  onChange={(e) => setGlowSpread(parseInt(e.target.value))}
                  className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <p className="text-xs text-slate-500 mt-1">控制光晕的扩散距离</p>
              </div>

              {/* Slider 4: Glow blur amount - NEW! */}
              <div className="pt-4 border-t-2 border-indigo-200">
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    4️⃣ 光晕模糊度 
                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded font-medium">🆕 NEW</span>
                  </label>
                  <span className="text-sm font-mono text-indigo-600 font-bold">{glowBlur}px</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={glowBlur}
                  onChange={(e) => setGlowBlur(parseInt(e.target.value))}
                  className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>0px (清晰光圈)</span>
                  <span>20px (模糊雾气)</span>
                </div>
                <p className="text-xs text-indigo-600 mt-2 font-medium">
                  ⭐ 核心参数：控制光晕本身的模糊程度，实现真正的雾气扩散效果
                </p>
              </div>

              {/* Preset buttons */}
              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500 mb-3">快速预设：</p>
                <div className="flex gap-2 flex-wrap">
                  <button 
                    onClick={() => {
                      setIconBlur(2);
                      setContainerBlur(32);
                      setGlowSpread(70);
                      setGlowBlur(8);
                    }}
                    className="px-4 py-2 rounded-lg bg-indigo-100 text-indigo-700 text-sm hover:bg-indigo-200 transition-colors"
                  >
                    推荐 (2/32/70/8)
                  </button>
                  <button 
                    onClick={() => {
                      setIconBlur(0);
                      setContainerBlur(15);
                      setGlowSpread(40);
                      setGlowBlur(3);
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm hover:bg-slate-200 transition-colors"
                  >
                    清晰 (0/15/40/3)
                  </button>
                  <button 
                    onClick={() => {
                      setIconBlur(4);
                      setContainerBlur(45);
                      setGlowSpread(100);
                      setGlowBlur(15);
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm hover:bg-slate-200 transition-colors"
                  >
                    重度雾气 (4/45/100/15)
                  </button>
                  <button 
                    onClick={() => {
                      setIconBlur(1);
                      setContainerBlur(25);
                      setGlowSpread(60);
                      setGlowBlur(12);
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm hover:bg-slate-200 transition-colors"
                  >
                    柔和雾气 (1/25/60/12)
                  </button>
                </div>
              </div>
            </div>

            {/* Live Preview - 3 Cards */}
            <div>
              <h4 className="text-base font-medium mb-4 text-slate-700">实时预览对比：</h4>
              <div className="grid md:grid-cols-3 gap-8 p-8 bg-slate-50 rounded-xl">
                {/* Solution A */}
                <div className="space-y-3">
                  <div className="text-center">
                    <h5 className="text-sm font-medium text-purple-700">方案 A</h5>
                    <p className="text-xs text-slate-500">filter: blur()</p>
                  </div>
                  <DynamicBorderlessCardV8A
                    title="方案A"
                    subtitle="filter模糊"
                    icon={FileArchive}
                    iconColor={{ r: 167, g: 139, b: 250 }}
                    iconBackgroundBlur={iconBlur}
                    glowSpread={glowSpread}
                    glowBlurAmount={glowBlur}
                  />
                </div>

                {/* Solution B */}
                <div className="space-y-3">
                  <div className="text-center">
                    <h5 className="text-sm font-medium text-cyan-700">方案 B</h5>
                    <p className="text-xs text-slate-500">双层光晕</p>
                  </div>
                  <DynamicBorderlessCardV8B
                    title="方案B"
                    subtitle="双层结构"
                    icon={FileArchive}
                    iconColor={{ r: 167, g: 139, b: 250 }}
                    iconBackgroundBlur={iconBlur}
                    containerBackdropBlur={containerBlur}
                    glowSpread={glowSpread}
                    glowBlurAmount={glowBlur}
                  />
                </div>

                {/* Solution C */}
                <div className="space-y-3">
                  <div className="text-center">
                    <h5 className="text-sm font-medium text-green-700">方案 C</h5>
                    <p className="text-xs text-slate-500">伪元素光晕</p>
                  </div>
                  <DynamicBorderlessCardV8C
                    title="方案C"
                    subtitle="伪元素"
                    icon={FileArchive}
                    iconColor={{ r: 167, g: 139, b: 250 }}
                    iconBackgroundBlur={iconBlur}
                    containerBackdropBlur={containerBlur}
                    glowSpread={glowSpread}
                    glowBlurAmount={glowBlur}
                  />
                </div>
              </div>

              {/* Observation Tips */}
              <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <h5 className="text-sm font-medium text-indigo-900 mb-2">👀 观察要点：</h5>
                <ul className="space-y-1 text-xs text-indigo-700">
                  <li>• 拖动"光晕模糊度"滑块，观察3种方案的光晕边缘变化</li>
                  <li>• 光晕从清晰光圈(0px) → 模糊雾气(20px) 的过渡效果</li>
                  <li>• 比较3种方案在不同参数下的视觉差异</li>
                  <li>• Hover卡片时，观察光晕的凝结效果</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Technical Comparison Table */}
        <Section title="📊 技术方案对比表" subtitle="Technical Comparison">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-xl overflow-hidden" style={{
              boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.08)'
            }}>
              <thead>
                <tr className="bg-slate-100">
                  <th className="p-4 text-left text-sm font-medium text-slate-700">方案</th>
                  <th className="p-4 text-left text-sm font-medium text-slate-700">光晕可模糊</th>
                  <th className="p-4 text-left text-sm font-medium text-slate-700">内容清晰度</th>
                  <th className="p-4 text-left text-sm font-medium text-slate-700">DOM层级</th>
                  <th className="p-4 text-left text-sm font-medium text-slate-700">实现复杂度</th>
                  <th className="p-4 text-left text-sm font-medium text-slate-700">推荐度</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-purple-50 transition-colors">
                  <td className="p-4">
                    <span className="font-medium text-purple-700">方案 A</span>
                    <br />
                    <span className="text-xs text-slate-500">filter: blur()</span>
                  </td>
                  <td className="p-4 text-green-600 font-medium">✓ 是</td>
                  <td className="p-4">
                    <span className="text-green-600">✓</span> 需嵌套
                  </td>
                  <td className="p-4 text-slate-600">2层</td>
                  <td className="p-4 text-slate-600">中等</td>
                  <td className="p-4">⭐⭐⭐</td>
                </tr>
                <tr className="hover:bg-cyan-50 transition-colors">
                  <td className="p-4">
                    <span className="font-medium text-cyan-700">方案 B</span>
                    <br />
                    <span className="text-xs text-slate-500">双层光晕</span>
                  </td>
                  <td className="p-4 text-green-600 font-medium">✓ 是</td>
                  <td className="p-4 text-green-600 font-medium">✓ 自动</td>
                  <td className="p-4 text-slate-600">3层</td>
                  <td className="p-4 text-slate-600">简单</td>
                  <td className="p-4 text-cyan-600 font-medium">⭐⭐⭐⭐</td>
                </tr>
                <tr className="hover:bg-green-50 transition-colors">
                  <td className="p-4">
                    <span className="font-medium text-green-700">方案 C</span>
                    <br />
                    <span className="text-xs text-slate-500">伪元素光晕</span>
                  </td>
                  <td className="p-4 text-green-600 font-medium">✓ 是</td>
                  <td className="p-4 text-green-600 font-medium">✓ 自动</td>
                  <td className="p-4 text-slate-600">2层</td>
                  <td className="p-4 text-orange-600">较复杂</td>
                  <td className="p-4">⭐⭐⭐</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* Key Findings */}
        <Section title="🔑 关键发现" subtitle="Key Findings">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
              <h3 className="text-lg font-medium text-green-900 mb-3">✅ 成功实现</h3>
              <ul className="space-y-2 text-sm text-green-800">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>光晕本身可以被模糊，不再是清晰的光圈</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>实现了真正的雾气扩散效果</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>3种方案都能独立控制光晕模糊度</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>内容（图标+文字）在所有方案中都保持清晰</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
              <h3 className="text-lg font-medium text-blue-900 mb-3">💡 最佳实践</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span><strong>方案B（双层光晕）</strong>最灵活，推荐用于生产</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>光晕模糊度 8-12px 最接近真实雾气效果</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Hover时光晕模糊度应减小（凝结效果）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>光晕模糊 + 背景模糊 = 完整的雾气系统</span>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Prompt记录（页面底部）*/}
        <details className="mt-16 p-6 rounded-xl bg-slate-900 text-white">
          <summary className="cursor-pointer text-lg font-medium mb-4">
            📝 查看生成此页面的Prompt
          </summary>
          
          <div className="space-y-6">
            {/* 中文版 */}
            <div>
              <h4 className="text-sm text-slate-400 mb-2">Prompt (中文版)</h4>
              <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap">
{`探索让光晕本身也被模糊的技术方案。

问题分析：
- backdrop-filter: blur() 只模糊元素"背后"的内容
- 不会模糊元素自己的 box-shadow（光晕）
- 导致光晕边缘清晰，不够"雾气"

目标：
- 雾气态时，光晕应该是弥散模糊的
- 凝结态时，光晕可以清晰聚焦
- 实现光晕的"扩散 ↔ 收紧"效果

3种技术方案：

方案A: 使用 filter: blur() 替代 backdrop-filter
- 模糊整个元素（包括box-shadow）
- 内层用 filter: blur(0) 抵消模糊
- 需要嵌套保护内容清晰度

方案B: 双层光晕结构
- 独立的光晕层（可独立blur）
- 容器层（backdrop-filter）
- 光晕和容器模糊独立控制

方案C: 伪元素光晕层
- 使用类似伪元素的独立层
- HTML结构简洁
- React中实现略复杂

新增滑块：
4️⃣ 光晕模糊度（0-20px）
- 控制光晕本身的模糊程度
- 实现真正的雾气扩散效果

对比结果：
- 方案B（双层光晕）最灵活，推荐 ⭐⭐⭐⭐
- 光晕模糊度 8-12px 效果最佳
- 所有方案都能保持内容清晰`}
              </pre>
            </div>
            
            {/* 英文版 */}
            <div>
              <h4 className="text-sm text-slate-400 mb-2">Prompt (English Version)</h4>
              <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap">
{`Explore techniques to make the glow itself blurred.

Problem analysis:
- backdrop-filter: blur() only blurs content "behind" the element
- Does NOT blur the element's own box-shadow (glow)
- Results in sharp glow edges, not misty enough

Goal:
- Mist state: Glow should be diffused and blurred
- Condensed state: Glow can be sharp and focused
- Achieve glow "diffusion ↔ condensation" effect

3 Technical Solutions:

Solution A: Use filter: blur() instead of backdrop-filter
- Blurs entire element (including box-shadow)
- Inner layer uses filter: blur(0) to cancel blur
- Needs nesting to protect content sharpness

Solution B: Double-layer glow structure
- Independent glow layer (can blur independently)
- Container layer (backdrop-filter)
- Independent control of glow and container blur

Solution C: Pseudo-element glow layer
- Uses independent layer like pseudo-element
- Clean HTML structure
- Slightly complex in React

New Slider:
4️⃣ Glow Blur Amount (0-20px)
- Controls blur of glow itself
- Achieves true mist diffusion effect

Comparison Results:
- Solution B (double-layer) most flexible, recommended ⭐⭐⭐⭐
- Glow blur 8-12px works best
- All solutions maintain content sharpness`}
              </pre>
            </div>
            
            {/* 元数据 */}
            <div className="text-xs text-slate-400 pt-4 border-t border-slate-700 space-y-1">
              <p>生成日期: 2025-11-02</p>
              <p>Prompt文件: prompt-02.08-blurred-glow.md</p>
              <p>探索方向: 让光晕本身也被模糊，实现真正的雾气扩散效果</p>
              <p>技术方案: 探索3种实现方式（filter/双层/伪元素）</p>
              <p>新增功能: 光晕模糊度滑块（0-20px）</p>
              <p>推荐方案: 方案B（双层光晕）⭐⭐⭐⭐</p>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}

// Helper Components
function Section({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-3xl mb-1">{title}</h2>
        <p className="text-slate-500">{subtitle}</p>
      </div>
      {children}
    </motion.section>
  );
}
