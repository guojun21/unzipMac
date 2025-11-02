import { motion } from "motion/react";
import { 
  DynamicBorderlessCardV9B, 
  DynamicBorderlessCardV9C 
} from "../components/borderless/DynamicBorderlessCardV9";
import { ArrowLeft, FileArchive, Sliders, Layers, Sparkles, XCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface DynamicBorderlessV9GlowFixProps {
  onBack?: () => void;
}

export default function DynamicBorderlessV9GlowFix({ onBack }: DynamicBorderlessV9GlowFixProps) {
  // Interactive control panel state
  const [iconBlur, setIconBlur] = useState(2);
  const [containerBlur, setContainerBlur] = useState(32);
  const [glowSpread, setGlowSpread] = useState(70);
  const [glowBlur, setGlowBlur] = useState(12);

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
                <h1 className="text-5xl">Dynamic Borderless v0.9</h1>
              </div>
              <p className="text-xl text-slate-600">探索：修复光晕显示问题，放弃方案A</p>
              <p className="text-sm text-slate-500 mt-2">Exploration: Fix glow visibility, abandon Solution A</p>
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

        {/* Why Abandon Solution A */}
        <Section title="❌ 为何放弃方案A" subtitle="Why Abandon Solution A">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                <XCircle className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-red-900 mb-2">
                  方案A存在根本性的设计缺陷
                </h3>
                <p className="text-red-700">
                  使用 <code className="bg-red-200 px-2 py-1 rounded">filter: blur()</code> 的理论问题
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg border border-red-300">
                <h4 className="text-sm font-medium text-red-900 mb-2">❌ 问题1：子元素无法抵消父级blur</h4>
                <p className="text-sm text-slate-700">
                  当父元素应用 <code className="bg-slate-100 px-1 rounded">filter: blur(6px)</code> 时，
                  子元素使用 <code className="bg-slate-100 px-1 rounded">filter: blur(0)</code> 
                  <strong className="text-red-700"> 无法抵消模糊效果</strong>。
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  CSS规范：filter作用于整个元素及其所有后代，子元素无法"取消"这个效果。
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-red-300">
                <h4 className="text-sm font-medium text-red-900 mb-2">❌ 问题2：transform: translateZ(0) 无效</h4>
                <p className="text-sm text-slate-700">
                  即使创建新的stacking context，父级blur仍会影响子元素的渲染结果。
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-red-300">
                <h4 className="text-sm font-medium text-red-900 mb-2">❌ 结论：理论上无法实现</h4>
                <p className="text-sm text-slate-700">
                  无法同时做到 <strong>"光晕模糊"</strong> + <strong>"内容清晰"</strong>
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-red-200 rounded-lg">
              <p className="text-sm font-medium text-red-900">
                🚫 因此，v0.9 不再展示方案A，专注于方案B和C
              </p>
            </div>
          </div>
        </Section>

        {/* What Was Fixed */}
        <Section title="🔧 修复内容" subtitle="What Was Fixed">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Before */}
            <div className="p-6 rounded-xl bg-orange-50 border-2 border-orange-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">v0.8</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-orange-900 mb-2">修复前的问题</h3>
                  <p className="text-sm text-orange-700 mb-3">方案B和C的光晕看不见或不明显：</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span className="text-slate-700">光晕颜色太淡 (rgba 0.12)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span className="text-slate-700">z-index为负数 (-2, -3)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span className="text-slate-700">opacity太低 (0.7, 0.8)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span className="text-slate-700">光��层可能被遮挡</span>
                </li>
              </ul>
            </div>

            {/* After */}
            <div className="p-6 rounded-xl bg-green-50 border-2 border-green-200">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-green-900 mb-2">修复后的改进</h3>
                  <p className="text-sm text-green-700 mb-3">所有显示问题已解决：</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-slate-700">光晕颜色增强 (0.25 → 0.35)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-slate-700">z-index改为正数 (1, 2)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-slate-700">opacity提升到 1.0</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-slate-700">光晕清晰可见且可模糊</span>
                </li>
              </ul>
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
              <Sliders className="w-6 h-6 text-rose-600" />
              <div>
                <h3 className="text-xl">调节参数对比方案B和C的光晕模糊效果</h3>
                <p className="text-sm text-slate-600">Adjust sliders to compare glow blur between Solutions B & C</p>
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-6 mb-8">
              {/* Slider 1 */}
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

              {/* Slider 2 */}
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
                <p className="text-xs text-slate-500 mt-1">控制容器背后内容的模糊度（backdrop-filter）</p>
              </div>

              {/* Slider 3 */}
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
                <p className="text-xs text-slate-500 mt-1">控制图标光晕的扩散距离</p>
              </div>

              {/* Slider 4: Glow blur amount */}
              <div className="pt-4 border-t-2 border-rose-200">
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    4️⃣ 光晕模糊度 
                    <span className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded font-medium">核心参数</span>
                  </label>
                  <span className="text-sm font-mono text-rose-600 font-bold">{glowBlur}px</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={glowBlur}
                  onChange={(e) => setGlowBlur(parseInt(e.target.value))}
                  className="w-full h-2 bg-rose-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>0px (清晰光圈)</span>
                  <span>20px (模糊雾气)</span>
                </div>
                <p className="text-xs text-rose-600 mt-2 font-medium">
                  ⭐ 拖动此滑块，观察两个方案的外层光晕从清晰到模糊的变化
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
                      setGlowBlur(12);
                    }}
                    className="px-4 py-2 rounded-lg bg-rose-100 text-rose-700 text-sm hover:bg-rose-200 transition-colors"
                  >
                    推荐 (2/32/70/12)
                  </button>
                  <button 
                    onClick={() => {
                      setIconBlur(0);
                      setContainerBlur(15);
                      setGlowSpread(40);
                      setGlowBlur(5);
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm hover:bg-slate-200 transition-colors"
                  >
                    清晰 (0/15/40/5)
                  </button>
                  <button 
                    onClick={() => {
                      setIconBlur(4);
                      setContainerBlur(45);
                      setGlowSpread(100);
                      setGlowBlur(18);
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm hover:bg-slate-200 transition-colors"
                  >
                    重度雾气 (4/45/100/18)
                  </button>
                  <button 
                    onClick={() => {
                      setIconBlur(1);
                      setContainerBlur(25);
                      setGlowSpread(60);
                      setGlowBlur(0);
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm hover:bg-slate-200 transition-colors"
                  >
                    无光晕模糊 (1/25/60/0)
                  </button>
                </div>
              </div>
            </div>

            {/* Live Preview - 2 Cards side by side */}
            <div>
              <h4 className="text-base font-medium mb-4 text-slate-700">实时预览对比（现在光晕清晰可见！）：</h4>
              <div className="grid md:grid-cols-2 gap-12 p-8 bg-slate-50 rounded-xl">
                {/* Solution B */}
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Layers className="w-5 h-5 text-cyan-600" />
                      <h5 className="text-base font-medium text-cyan-700">方案 B - 双层光晕</h5>
                    </div>
                    <p className="text-xs text-slate-500">Double-layer glow structure</p>
                  </div>
                  <DynamicBorderlessCardV9B
                    title="方案B"
                    subtitle="双层结构"
                    icon={FileArchive}
                    iconColor={{ r: 167, g: 139, b: 250 }}
                    iconBackgroundBlur={iconBlur}
                    containerBackdropBlur={containerBlur}
                    glowSpread={glowSpread}
                    glowBlurAmount={glowBlur}
                  />
                  <div className="text-center pt-2">
                    <p className="text-xs text-slate-600">
                      独立光晕层，最灵活 ⭐⭐⭐⭐
                    </p>
                  </div>
                </div>

                {/* Solution C */}
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-green-600" />
                      <h5 className="text-base font-medium text-green-700">方案 C - 伪元素光晕</h5>
                    </div>
                    <p className="text-xs text-slate-500">Pseudo-element-like glow</p>
                  </div>
                  <DynamicBorderlessCardV9C
                    title="方案C"
                    subtitle="伪元素"
                    icon={FileArchive}
                    iconColor={{ r: 167, g: 139, b: 250 }}
                    iconBackgroundBlur={iconBlur}
                    containerBackdropBlur={containerBlur}
                    glowSpread={glowSpread}
                    glowBlurAmount={glowBlur}
                  />
                  <div className="text-center pt-2">
                    <p className="text-xs text-slate-600">
                      结构简洁 ⭐⭐⭐
                    </p>
                  </div>
                </div>
              </div>

              {/* Observation Tips */}
              <div className="mt-6 p-4 bg-rose-50 rounded-lg border border-rose-200">
                <h5 className="text-sm font-medium text-rose-900 mb-2">👀 观察要点：</h5>
                <ul className="space-y-1 text-xs text-rose-700">
                  <li>• <strong>现在光晕清晰可见了！</strong> 颜色强度提升到 0.25-0.35</li>
                  <li>• 拖动"光晕模糊度"滑块，观察外层青色光晕从清晰到模糊的渐变</li>
                  <li>• 对比方案B和C的光晕模糊效果差异</li>
                  <li>• Hover卡片时，光晕应收紧聚焦（凝结效果）</li>
                  <li>• 图标和文字始终保持清晰</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Technical Fixes Summary */}
        <Section title="🔍 技术修复细节" subtitle="Technical Fix Details">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Solution B fixes */}
            <div className="p-6 rounded-xl bg-cyan-50 border-2 border-cyan-200">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-5 h-5 text-cyan-600" />
                <h3 className="text-lg font-medium text-cyan-900">方案B的修复</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium text-slate-900 mb-1">1. 光晕颜色增强</h4>
                  <div className="pl-3 border-l-2 border-cyan-300">
                    <p className="text-slate-600 mb-1">修复前:</p>
                    <code className="text-xs bg-white px-2 py-1 rounded block mb-2">
                      rgba(6,182,212,0.12) → 看不见
                    </code>
                    <p className="text-slate-600 mb-1">修复后:</p>
                    <code className="text-xs bg-white px-2 py-1 rounded block">
                      rgba(6,182,212,0.30) → 清晰可见
                    </code>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 mb-1">2. z-index调整</h4>
                  <div className="pl-3 border-l-2 border-cyan-300">
                    <p className="text-slate-600">光晕层: -2 → <strong>1</strong></p>
                    <p className="text-slate-600">容器层: -1 → <strong>2</strong></p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 mb-1">3. Opacity提升</h4>
                  <div className="pl-3 border-l-2 border-cyan-300">
                    <p className="text-slate-600">0.8 → <strong>1.0</strong></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution C fixes */}
            <div className="p-6 rounded-xl bg-green-50 border-2 border-green-200">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-medium text-green-900">方案C的修复</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium text-slate-900 mb-1">1. 光晕颜色增强</h4>
                  <div className="pl-3 border-l-2 border-green-300">
                    <p className="text-slate-600 mb-1">修复前:</p>
                    <code className="text-xs bg-white px-2 py-1 rounded block mb-2">
                      rgba(6,182,212,0.15) → 很淡
                    </code>
                    <p className="text-slate-600 mb-1">修复后:</p>
                    <code className="text-xs bg-white px-2 py-1 rounded block">
                      rgba(6,182,212,0.35) → 明显可见
                    </code>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 mb-1">2. z-index调整</h4>
                  <div className="pl-3 border-l-2 border-green-300">
                    <p className="text-slate-600">光晕层: -3 → <strong>1</strong></p>
                    <p className="text-slate-600">容器层: -1 → <strong>2</strong></p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 mb-1">3. Opacity提升</h4>
                  <div className="pl-3 border-l-2 border-green-300">
                    <p className="text-slate-600">0.7 → <strong>1.0</strong></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Comparison: B vs C */}
        <Section title="⚖️ 方案对比结论" subtitle="Solution Comparison Conclusion">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-xl overflow-hidden" style={{
              boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.08)'
            }}>
              <thead>
                <tr className="bg-slate-100">
                  <th className="p-4 text-left text-sm font-medium text-slate-700">特性</th>
                  <th className="p-4 text-left text-sm font-medium text-slate-700">方案B（双层）</th>
                  <th className="p-4 text-left text-sm font-medium text-slate-700">方案C（伪元素）</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-700">光晕可见性</td>
                  <td className="p-4 text-green-600">✓ 清晰可见</td>
                  <td className="p-4 text-green-600">✓ 清晰可见</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-700">光晕可模糊</td>
                  <td className="p-4 text-green-600">✓ 是</td>
                  <td className="p-4 text-green-600">✓ 是</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-700">内���清晰</td>
                  <td className="p-4 text-green-600">✓ 自动保持</td>
                  <td className="p-4 text-green-600">✓ 自动保持</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-700">DOM层级</td>
                  <td className="p-4 text-slate-600">3层</td>
                  <td className="p-4 text-slate-600">3层</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-700">独立控制</td>
                  <td className="p-4 text-green-600 font-medium">✓ 光晕和容器独立</td>
                  <td className="p-4 text-slate-600">容器和光晕耦合度稍高</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-700">推荐度</td>
                  <td className="p-4 text-cyan-600 font-medium text-lg">⭐⭐⭐⭐</td>
                  <td className="p-4 text-green-600">⭐⭐⭐</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-6 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border-2 border-cyan-200">
            <h3 className="text-lg font-medium text-cyan-900 mb-2">💡 最终建议</h3>
            <p className="text-slate-700">
              <strong className="text-cyan-700">方案B（双层光晕）</strong> 
              提供最大的灵活性和控制力，推荐用于生产环境。
              光晕层和容器层完全独立，可以分别控制模糊度、颜色、动画等，最适合实现复杂的雾气效果。
            </p>
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
{`修复v0.8的方案B和C显示问题，放弃方案A。

===  方案A：放弃 ===

原因：CSS的filter: blur()限制
- 父元素blur会影响所有子元素
- 子元素无法通过filter: blur(0)抵消
- 理论上无法实现"光晕模糊，内容清晰"

结论：不再展示方案A

===  方案B & C：修复显示 ===

修复内容：

1. 光晕颜色增强
   - 方案B: 0.12 → 0.30
   - 方案C: 0.15 → 0.35

2. z-index调整
   - 光晕层: -2/-3 → 1
   - 容器层: -1 → 2

3. Opacity提升
   - 0.7/0.8 → 1.0

4. 确保可见性
   - 正确的层级关系
   - 合适的颜色强度
   - 明确的尺寸定位

修复后效果：
- 光晕清晰可见
- 模糊效果正常工作
- 内容保持清晰
- 两个方案都可用

对比结论：
- 方案B（双层）最灵活 ⭐⭐⭐⭐
- 方案C（伪元素）结构简洁 ⭐⭐⭐
- 推荐使用方案B用于生产`}
              </pre>
            </div>
            
            {/* 英文版 */}
            <div>
              <h4 className="text-sm text-slate-400 mb-2">Prompt (English Version)</h4>
              <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap">
{`Fix display issues for Solutions B and C from v0.8, abandon Solution A.

===  SOLUTION A: ABANDON ===

Reason: CSS filter: blur() limitation
- Parent blur affects all children
- Children cannot cancel with filter: blur(0)
- Theoretically impossible: "blurred glow, sharp content"

Conclusion: No longer show Solution A

===  SOLUTIONS B & C: FIX DISPLAY ===

Fixes applied:

1. Glow color enhancement
   - Solution B: 0.12 → 0.30
   - Solution C: 0.15 → 0.35

2. z-index adjustment
   - Glow layer: -2/-3 → 1
   - Container layer: -1 → 2

3. Opacity increase
   - 0.7/0.8 → 1.0

4. Ensure visibility
   - Correct layer hierarchy
   - Appropriate color intensity
   - Explicit sizing/positioning

After fix:
- Glow clearly visible
- Blur effect works properly
- Content stays sharp
- Both solutions usable

Comparison conclusion:
- Solution B (double-layer) most flexible ⭐⭐⭐⭐
- Solution C (pseudo-element) clean structure ⭐⭐⭐
- Recommend Solution B for production`}
              </pre>
            </div>
            
            {/* 元数据 */}
            <div className="text-xs text-slate-400 pt-4 border-t border-slate-700 space-y-1">
              <p>生成日期: 2025-11-02</p>
              <p>Prompt文件: prompt-02.09-blurred-glow-fix.md</p>
              <p>探索方向: 修复方案B和C的显示问题，放弃方案A</p>
              <p>修复内容: 光晕颜色增强(0.25-0.35)、z-index调整(正数)、opacity提升(1.0)</p>
              <p>技术发现: 方案A理论不可行，方案B最灵活</p>
              <p>最终推荐: 方案B（双层光晕）⭐⭐⭐⭐</p>
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
