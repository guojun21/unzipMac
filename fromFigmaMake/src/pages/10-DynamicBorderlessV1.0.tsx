import { motion } from "motion/react";
import { DynamicBorderlessCardV1 } from "../components/borderless/DynamicBorderlessCardV1";
import { ArrowLeft, FileArchive, Sliders, Sparkles, Zap } from "lucide-react";
import { useState } from "react";

interface DynamicBorderlessV1Props {
  onBack?: () => void;
}

export default function DynamicBorderlessV1({ onBack }: DynamicBorderlessV1Props) {
  // Interactive control panel state
  const [iconBlur, setIconBlur] = useState(2);
  const [containerBlur, setContainerBlur] = useState(6);
  const [glowSpread, setGlowSpread] = useState(20);
  const [glowIntensity, setGlowIntensity] = useState(0.15);

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
                <h1 className="text-5xl">Dynamic Borderless v1.0 🎉</h1>
              </div>
              <p className="text-xl text-slate-600">核心突破：光晕紧贴容器边缘，整体施加模糊</p>
              <p className="text-sm text-slate-500 mt-2">Core breakthrough: Glow tightly hugs container edges, blur applied to whole unit</p>
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

        {/* Core Insight */}
        <Section title="💡 核心洞察" subtitle="Core Insight">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-amber-900 mb-2">
                  光晕应该紧贴容器边缘，而非独立大光团
                </h3>
                <p className="text-amber-700">
                  v0.8-v0.9的方案B和C使用独立的大椭圆光晕层，但真实的"边缘雾化"应该是光晕紧随容器轮廓向外扩散。
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg border border-amber-300">
                <h4 className="text-sm font-medium text-amber-900 mb-2">✨ 关键改进 1：使用 box-shadow spread</h4>
                <p className="text-sm text-slate-700 mb-2">
                  <code className="bg-slate-100 px-2 py-1 rounded">box-shadow: 0 0 20px 6px rgba(...)</code>
                </p>
                <p className="text-xs text-slate-600">
                  第4个参数（spread）让光晕从边缘向外扩散，紧贴容器形状，不是独立的圆形光团。
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-amber-300">
                <h4 className="text-sm font-medium text-amber-900 mb-2">✨ 关键改进 2：整体模糊</h4>
                <p className="text-sm text-slate-700 mb-2">
                  对"容器+光晕"整体施加 <code className="bg-slate-100 px-1 rounded">filter: blur()</code>
                </p>
                <p className="text-xs text-slate-600">
                  不再分开模糊光晕层和容器层，而是一次性模糊整个视觉单元，效果更统一。
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-amber-300">
                <h4 className="text-sm font-medium text-amber-900 mb-2">✨ 关键改进 3：内容独立清晰</h4>
                <p className="text-sm text-slate-700 mb-2">
                  内容层使用 <code className="bg-slate-100 px-1 rounded">transform: translateZ(0)</code> 创建独立渲染层
                </p>
                <p className="text-xs text-slate-600">
                  通过创建新的stacking context，内容可以保持清晰，不受父层模糊影响。
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Technical Advantages */}
        <Section title="🎯 技术优势" subtitle="Technical Advantages">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-green-50 border-2 border-green-200">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-medium text-green-900 mb-2">更简洁的结构</h3>
              <ul className="space-y-1 text-sm text-green-800">
                <li>• 单层容器（不是3层）</li>
                <li>• box-shadow实现光晕</li>
                <li>• DOM层级减少</li>
                <li>• 代码更易维护</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-cyan-50 border-2 border-cyan-200">
              <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-medium text-cyan-900 mb-2">光晕紧贴边缘</h3>
              <ul className="space-y-1 text-sm text-cyan-800">
                <li>• 跟随容器形状</li>
                <li>• 只在外部扩散</li>
                <li>• 不渗透到内部</li>
                <li>• 扩散范围可控（0-40px）</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-purple-50 border-2 border-purple-200">
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-purple-900 mb-2">统一的模糊</h3>
              <ul className="space-y-1 text-sm text-purple-800">
                <li>• 容器和光晕一起模糊</li>
                <li>• 视觉效果统一</li>
                <li>• 雾气更自然</li>
                <li>• 参数调节更直观</li>
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
              <Sliders className="w-6 h-6 text-amber-600" />
              <div>
                <h3 className="text-xl">调节参数观察光晕紧贴边缘效果</h3>
                <p className="text-sm text-slate-600">Adjust parameters to see edge-hugging glow effect</p>
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

              {/* Slider 2: Overall blur - CHANGED */}
              <div className="pt-4 border-t-2 border-amber-200">
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    2️⃣ 整体模糊度
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded font-medium">合并参数</span>
                  </label>
                  <span className="text-sm font-mono text-amber-600 font-bold">{containerBlur}px</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="15"
                  step="1"
                  value={containerBlur}
                  onChange={(e) => setContainerBlur(parseInt(e.target.value))}
                  className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>0px (完全清晰)</span>
                  <span>15px (重度模糊)</span>
                </div>
                <p className="text-xs text-amber-600 mt-2 font-medium">
                  ⭐ 对"容器+光晕"整体施加模糊，合并了原来的"容器模糊"和"光晕模糊"两个参数
                </p>
              </div>

              {/* Slider 3: Glow spread - CHANGED range */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    3️⃣ 光晕扩散范围
                    <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded font-medium">可调至0</span>
                  </label>
                  <span className="text-sm font-mono text-cyan-600 font-bold">{glowSpread}px</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="40"
                  step="2"
                  value={glowSpread}
                  onChange={(e) => setGlowSpread(parseInt(e.target.value))}
                  className="w-full h-2 bg-cyan-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>0px (无光晕)</span>
                  <span>40px (扩散光晕)</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  光晕从容器边缘向外扩散的距离（box-shadow spread参数）
                </p>
              </div>

              {/* Slider 4: Glow intensity - NEW */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    4️⃣ 光晕强度
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">🆕 NEW</span>
                  </label>
                  <span className="text-sm font-mono text-green-600 font-bold">{glowIntensity.toFixed(2)}</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="0.3"
                  step="0.01"
                  value={glowIntensity}
                  onChange={(e) => setGlowIntensity(parseFloat(e.target.value))}
                  className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>0 (透明)</span>
                  <span>0.3 (明显)</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">控制光晕的颜色强度（透明度）</p>
              </div>

              {/* Preset buttons */}
              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500 mb-3">快速预设：</p>
                <div className="flex gap-2 flex-wrap">
                  <button 
                    onClick={() => {
                      setIconBlur(2);
                      setContainerBlur(6);
                      setGlowSpread(20);
                      setGlowIntensity(0.15);
                    }}
                    className="px-4 py-2 rounded-lg bg-amber-100 text-amber-700 text-sm hover:bg-amber-200 transition-colors"
                  >
                    推荐 (2/6/20/0.15)
                  </button>
                  <button 
                    onClick={() => {
                      setIconBlur(0);
                      setContainerBlur(0);
                      setGlowSpread(10);
                      setGlowIntensity(0.2);
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm hover:bg-slate-200 transition-colors"
                  >
                    完全清晰 (0/0/10/0.2)
                  </button>
                  <button 
                    onClick={() => {
                      setIconBlur(4);
                      setContainerBlur(12);
                      setGlowSpread(30);
                      setGlowIntensity(0.25);
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm hover:bg-slate-200 transition-colors"
                  >
                    重度雾气 (4/12/30/0.25)
                  </button>
                  <button 
                    onClick={() => {
                      setIconBlur(1);
                      setContainerBlur(3);
                      setGlowSpread(0);
                      setGlowIntensity(0);
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm hover:bg-slate-200 transition-colors"
                  >
                    无光晕 (1/3/0/0)
                  </button>
                </div>
              </div>
            </div>

            {/* Live Preview */}
            <div>
              <h4 className="text-base font-medium mb-4 text-slate-700">实时预览：</h4>
              <div className="flex justify-center p-8 bg-slate-50 rounded-xl">
                <DynamicBorderlessCardV1
                  title="v1.0"
                  subtitle="光晕紧贴边缘"
                  icon={FileArchive}
                  iconColor={{ r: 167, g: 139, b: 250 }}
                  iconBackgroundBlur={iconBlur}
                  containerBlur={containerBlur}
                  glowSpread={glowSpread}
                  glowIntensity={glowIntensity}
                />
              </div>

              {/* Observation Tips */}
              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h5 className="text-sm font-medium text-amber-900 mb-2">👀 观察要点：</h5>
                <ul className="space-y-1 text-xs text-amber-700">
                  <li>• <strong>光晕紧贴边缘：</strong>不是独立的大光团，而是沿着容器形状向外扩散</li>
                  <li>• <strong>调节扩散范围：</strong>从0px（无光晕）到40px（明显扩散）</li>
                  <li>• <strong>整体模糊：</strong>容器和光晕一起变模糊，效果统一自然</li>
                  <li>• <strong>内容清晰：</strong>图标和文字始终保持锐利</li>
                  <li>• <strong>Hover效果：</strong>光晕收紧，边缘清晰（凝结）</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Technical Details */}
        <Section title="🔧 技术实现细节" subtitle="Technical Implementation Details">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Box-shadow explanation */}
            <div className="p-6 rounded-xl bg-cyan-50 border-2 border-cyan-200">
              <h3 className="text-lg font-medium text-cyan-900 mb-4">box-shadow 参数详解</h3>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg">
                  <code className="text-xs block mb-2">
                    box-shadow: 0 0 20px 6px rgba(6,182,212,0.15);
                  </code>
                  <div className="space-y-1 text-xs text-slate-700">
                    <p><span className="font-mono bg-slate-100 px-1 rounded">0 0</span> - x, y 偏移（居中）</p>
                    <p><span className="font-mono bg-cyan-100 px-1 rounded">20px</span> - blur radius（模糊半径）</p>
                    <p><span className="font-mono bg-amber-100 px-1 rounded">6px</span> - <strong>spread</strong>（向外扩散）</p>
                    <p><span className="font-mono bg-slate-100 px-1 rounded">rgba(...)</span> - 颜色和透明度</p>
                  </div>
                </div>
                <div className="text-sm text-cyan-800">
                  <p className="font-medium mb-1">关键：spread 参数</p>
                  <p className="text-xs">
                    正值让光晕从边缘向外扩散，紧贴容器形状。
                    这是实现"边缘雾化"的关键技术。
                  </p>
                </div>
              </div>
            </div>

            {/* Filter blur explanation */}
            <div className="p-6 rounded-xl bg-purple-50 border-2 border-purple-200">
              <h3 className="text-lg font-medium text-purple-900 mb-4">整体模糊实现</h3>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-xs font-medium text-slate-700 mb-2">容器层：</p>
                  <code className="text-xs block mb-3">
                    filter: blur(6px)
                  </code>
                  <p className="text-xs text-slate-600 mb-3">
                    对整个容器（包括背景、边框、box-shadow光晕）施加模糊
                  </p>
                  
                  <p className="text-xs font-medium text-slate-700 mb-2">内容层：</p>
                  <code className="text-xs block mb-2">
                    filter: blur(0)<br/>
                    transform: translateZ(0)<br/>
                    willChange: transform
                  </code>
                  <p className="text-xs text-slate-600">
                    创建独立的stacking context，内容保持清晰
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Comparison with v0.9 */}
        <Section title="📊 与 v0.9 对比" subtitle="Comparison with v0.9">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-xl overflow-hidden" style={{
              boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.08)'
            }}>
              <thead>
                <tr className="bg-slate-100">
                  <th className="p-4 text-left text-sm font-medium text-slate-700">特性</th>
                  <th className="p-4 text-left text-sm font-medium text-slate-700">v0.9（方案B）</th>
                  <th className="p-4 text-left text-sm font-medium text-slate-700">v1.0（边缘光晕）</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-700">光晕实现</td>
                  <td className="p-4 text-slate-600">独立大椭圆层</td>
                  <td className="p-4 text-green-600 font-medium">✓ box-shadow紧贴边缘</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-700">光晕形状</td>
                  <td className="p-4 text-slate-600">固定圆形</td>
                  <td className="p-4 text-green-600 font-medium">✓ 跟随容器形状</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-700">DOM层级</td>
                  <td className="p-4 text-slate-600">3层</td>
                  <td className="p-4 text-green-600 font-medium">✓ 2层（更简洁）</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-700">模糊方式</td>
                  <td className="p-4 text-slate-600">光晕层独立模糊</td>
                  <td className="p-4 text-green-600 font-medium">✓ 整体统一模糊</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-700">扩散范围</td>
                  <td className="p-4 text-slate-600">20-120px（固定大范围）</td>
                  <td className="p-4 text-green-600 font-medium">✓ 0-40px（可调至0）</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-700">内容清晰</td>
                  <td className="p-4 text-green-600">✓ 是</td>
                  <td className="p-4 text-green-600">✓ 是</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-700">代码复杂度</td>
                  <td className="p-4 text-slate-600">较复杂</td>
                  <td className="p-4 text-green-600 font-medium">✓ 更简洁</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-6 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border-2 border-amber-200">
            <h3 className="text-lg font-medium text-amber-900 mb-2">🎉 v1.0 里程碑</h3>
            <p className="text-slate-700">
              通过使用 <code className="bg-amber-100 px-2 py-1 rounded">box-shadow spread</code> 参数，
              实现了光晕紧贴容器边缘向外扩散的效果，这是"无界设计"的核心突破。
              光晕不再是独立的大光团，而是容器边缘的自然延伸，
              整体模糊效果更统一，代码结构更简洁。
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
{`创建 v1.0 - 光晕紧贴边缘方案

核心改进：

1. 合并方案B和C（它们本质相同）
2. 光晕紧贴容器边缘（不是独立大椭圆）
3. 光晕只在容器外部，不渗透到内部
4. 光晕贴合容器形状（不是圆形，而是跟随容器轮廓）
5. 模糊施加在"容器边缘+光晕"整体上

技术实现：

使用 box-shadow 的 spread 参数：
box-shadow: 0 0 [blur] [spread] [color];

- blur: 光晕的模糊范围
- spread: 光晕向外扩散的距离（正值向外）
- 通过spread控制，光晕只在边缘外，不渗透内部
- 形状跟随容器的border-radius

整体模糊：
- 对"容器+光晕"整体施加 filter: blur()
- 内容层使用 transform: translateZ(0) 创建独立渲染层
- 内容保持清晰

滑块调整：
1. 紫色背景模糊: 0-5px
2. 整体模糊度: 0-15px（合并了原来的"容器"和"光晕模糊"）
3. 光晕扩散范围: 0-40px（可以很小，甚至0）
4. 光晕强度: 0-0.3（新增，控制透明度）

优势：
- 光晕紧贴容器，不是独立大光团
- 光晕跟随容器形状
- 扩散范围可以很小（0-40px）
- 光晕只在外部，内部干净
- 模糊作用在整体上，效果统一
- DOM层级减少（2层 vs 3层）
- 代码更简洁`}
              </pre>
            </div>
            
            {/* 英文版 */}
            <div>
              <h4 className="text-sm text-slate-400 mb-2">Prompt (English Version)</h4>
              <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap">
{`Create v1.0 - Edge-hugging glow approach

Core improvements:

1. Merge Solutions B and C (essentially the same)
2. Glow tightly hugs container edges (not independent large ellipse)
3. Glow only outside container, not bleeding inside
4. Glow follows container shape (via box-shadow, not separate layer)
5. Blur applied to "container + glow" as a whole

Technical implementation:

Use box-shadow spread parameter:
box-shadow: 0 0 [blur] [spread] [color];

- blur: Glow blur range
- spread: Outward expansion distance (positive = outward)
- Via spread, glow stays outside edge, doesn't penetrate inside
- Shape follows container's border-radius

Overall blur:
- Apply filter: blur() to entire "container + glow"
- Content layer uses transform: translateZ(0) for independent rendering
- Content stays sharp

Sliders:
1. Icon background blur: 0-5px
2. Overall blur: 0-15px (merged "container" and "glow blur")
3. Glow spread: 0-40px (can be very small, even 0)
4. Glow intensity: 0-0.3 (new, controls opacity)

Advantages:
- Glow hugs container, not independent blob
- Glow follows container shape
- Spread range can be very small (0-40px)
- Glow only outside, inside clean
- Blur acts on whole, unified effect
- Reduced DOM layers (2 vs 3)
- Cleaner code`}
              </pre>
            </div>
            
            {/* 元数据 */}
            <div className="text-xs text-slate-400 pt-4 border-t border-slate-700 space-y-1">
              <p>生成日期: 2025-11-02</p>
              <p>Prompt文件: prompt-02.10-v1.0-edge-hugging-glow.md</p>
              <p>版本: v1.0 🎉</p>
              <p>核心突破: 光晕紧贴容器边缘（box-shadow spread）</p>
              <p>技术改进: 整体模糊、更简洁的结构、可调至0的扩散范围</p>
              <p>里程碑: "无界设计"的核心实现</p>
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
