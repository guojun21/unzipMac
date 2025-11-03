import { motion } from "motion/react";
import { DynamicBorderlessCardV1_3 } from "../components/borderless/DynamicBorderlessCardV1_3";
import { ArrowLeft, FileArchive, Sliders, Zap, XCircle, CheckCircle2, Target } from "lucide-react";
import { useState } from "react";

interface DynamicBorderlessV1_3Props {
  onBack?: () => void;
}

export default function DynamicBorderlessV1_3({ onBack }: DynamicBorderlessV1_3Props) {
  // Interactive control panel state (5 sliders now!)
  const [edgeLineWidth, setEdgeLineWidth] = useState(10);
  const [edgeBlurAmount, setEdgeBlurAmount] = useState(18);
  const [glowSpread, setGlowSpread] = useState(8);
  const [iconBackgroundBlur, setIconBackgroundBlur] = useState(2);
  const [animationSpeed, setAnimationSpeed] = useState(300);  // NEW!

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-fuchsia-50/30 py-12 px-8">
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
                <h1 className="text-5xl">Dynamic Borderless v1.3</h1>
              </div>
              <p className="text-xl text-slate-600">探索：外层容器完全静态</p>
              <p className="text-sm text-slate-500 mt-2">Exploration: Fully static outer container</p>
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

        {/* Core concept */}
        <Section title="🎯 核心理念" subtitle="Core Concept">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200">
            <div className="flex items-start gap-4 mb-6">
              <Target className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-medium text-amber-900 mb-2">
                  极简动画：只动边缘，容器静止
                </h3>
                <p className="text-amber-800 mb-4">
                  v1.3 的核心思想是"焦点清晰"——移除容器的所有形状、位置、模糊度动画，
                  让用户的注意力完全集中在"边缘线条消失"这一个动画上。
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-lg">
                    <p className="text-sm font-medium text-red-700 mb-2">❌ v1.2 有5个动画元素：</p>
                    <ul className="text-xs text-slate-700 space-y-1">
                      <li>• 边缘线条：宽度 + 模糊</li>
                      <li>• 容器：圆角、位置、背景模糊、渐变</li>
                      <li>• 图标：背景模糊 + 阴影</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border-2 border-green-300">
                    <p className="text-sm font-medium text-green-700 mb-2">✅ v1.3 只有2个动画元素：</p>
                    <ul className="text-xs text-green-800 space-y-1">
                      <li>• 边缘线条：宽度 + 模糊（主角）</li>
                      <li>• 图标：背景模糊 + 阴影（配角）</li>
                      <li><strong>• 容器：完全静止！</strong></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* What changed from v1.2 */}
        <Section title="🔧 从v1.2到v1.3的改动" subtitle="Changes from v1.2 to v1.3">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Removed animations */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="w-6 h-6 text-red-600" />
                <h3 className="text-lg font-medium text-red-900">移除的容器动画</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-xs font-medium text-red-800 mb-2">❌ borderRadius 动画：</p>
                  <code className="text-xs text-slate-700">24px → 16px</code>
                  <p className="text-xs text-slate-500 mt-1">现在固定为 24px</p>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-xs font-medium text-red-800 mb-2">❌ Y位置动画：</p>
                  <code className="text-xs text-slate-700">0 → -4px</code>
                  <p className="text-xs text-slate-500 mt-1">现在固定为 0</p>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-xs font-medium text-red-800 mb-2">❌ backdropFilter 动画：</p>
                  <code className="text-xs text-slate-700">blur(32px) → blur(10px)</code>
                  <p className="text-xs text-slate-500 mt-1">现在固定为 blur(32px)</p>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-xs font-medium text-red-800 mb-2">❌ background 渐变动画：</p>
                  <code className="text-xs text-slate-700">35% → 70%</code>
                  <p className="text-xs text-slate-500 mt-1">现在固定为 35%</p>
                </div>
              </div>
            </div>

            {/* Kept animations */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-medium text-green-900">保留的动画</h3>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-lg border-2 border-green-300">
                  <p className="text-xs font-medium text-green-800 mb-2">✅ 边缘线条（主角）：</p>
                  <div className="space-y-1 text-xs text-slate-700">
                    <div>• borderWidth: <code>10px → 0px</code></div>
                    <div>• filter: <code>blur(18px) → blur(0px)</code></div>
                  </div>
                  <p className="text-xs text-green-600 mt-2 font-medium">
                    这是唯一的外层动画
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <p className="text-xs font-medium text-green-800 mb-2">✅ 图标背景（配角）：</p>
                  <div className="space-y-1 text-xs text-slate-700">
                    <div>• filter: <code>blur(2px) → blur(0px)</code></div>
                    <div>• boxShadow: <code>阴影变化</code></div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    和v1.0一样的紫色背景动画
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Code comparison */}
          <div className="mt-6 p-6 rounded-xl bg-slate-900 text-white">
            <h4 className="text-base font-medium mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              代码对比：motion.div → div
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-red-400 mb-2">❌ v1.2 (有动画):</p>
                <pre className="text-xs bg-slate-800 p-3 rounded overflow-x-auto">
{`<motion.div
  animate={isHovered ? "hover" : "default"}
  variants={containerVariants}
  transition={{ duration: 0.4 }}
  style={{
    width: '320px',
    // ...动态属性
  }}
>
  {/* 内容 */}
</motion.div>`}
                </pre>
              </div>
              <div>
                <p className="text-xs text-green-400 mb-2">✅ v1.3 (无动画):</p>
                <pre className="text-xs bg-slate-800 p-3 rounded overflow-x-auto">
{`<div
  style={{
    width: '320px',
    // 所有属性都是固定值！
    background: '固定渐变',
    backdropFilter: 'blur(32px)',
    borderRadius: '24px',
    transform: 'translateY(0)',
    // 无variants，无animate
  }}
>
  {/* 内容 */}
</div>`}
                </pre>
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
              <Sliders className="w-6 h-6 text-fuchsia-600" />
              <div>
                <h3 className="text-xl">5个滑块：新增动画速度控制</h3>
                <p className="text-sm text-slate-600">5 sliders: New animation speed control</p>
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-6 mb-8">
              {/* Slider 1: Edge line width */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">
                    1️⃣ 边缘线条粗细
                  </label>
                  <span className="text-sm font-mono text-cyan-600 font-bold">{edgeLineWidth}px</span>
                </div>
                <input 
                  type="range"
                  min="4"
                  max="16"
                  step="1"
                  value={edgeLineWidth}
                  onChange={(e) => setEdgeLineWidth(parseInt(e.target.value))}
                  className="w-full h-2 bg-cyan-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>4px</span>
                  <span>16px</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">控制雾气态的蓝色边缘线条宽度</p>
              </div>

              {/* Slider 2: Edge blur amount */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">
                    2️⃣ 边缘模糊强度
                  </label>
                  <span className="text-sm font-mono text-teal-600 font-bold">{edgeBlurAmount}px</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="30"
                  step="1"
                  value={edgeBlurAmount}
                  onChange={(e) => setEdgeBlurAmount(parseInt(e.target.value))}
                  className="w-full h-2 bg-teal-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>0px</span>
                  <span>30px</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">控制蓝色边缘线条的模糊程度</p>
              </div>

              {/* Slider 3: Glow spread */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">
                    3️⃣ 光晕扩散范围
                  </label>
                  <span className="text-sm font-mono text-green-600 font-bold">{glowSpread}px</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={glowSpread}
                  onChange={(e) => setGlowSpread(parseInt(e.target.value))}
                  className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>0px</span>
                  <span>20px</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">控制光晕的扩散大小</p>
              </div>

              {/* Slider 4: Icon background blur */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">
                    4️⃣ 图标背景模糊
                  </label>
                  <span className="text-sm font-mono text-purple-600 font-bold">{iconBackgroundBlur.toFixed(1)}px</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={iconBackgroundBlur}
                  onChange={(e) => setIconBackgroundBlur(parseFloat(e.target.value))}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>0px</span>
                  <span>5px</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">控制紫色图标背景的边缘柔和度</p>
              </div>

              {/* Slider 5: Animation speed - NEW! */}
              <div className="pt-6 border-t-2 border-amber-300">
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    5️⃣ 动画速度
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded font-medium">
                      🆕 NEW
                    </span>
                  </label>
                  <span className="text-sm font-mono text-amber-600 font-bold">{animationSpeed}ms</span>
                </div>
                <input 
                  type="range"
                  min="100"
                  max="1000"
                  step="50"
                  value={animationSpeed}
                  onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
                  className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>100ms (极快)</span>
                  <span>1000ms (慢动作)</span>
                </div>
                <p className="text-xs text-amber-600 mt-2 font-medium">
                  ⭐ 控制边缘线条收缩和紫色图标背景的动画速度（整体快慢）
                </p>
              </div>

              {/* Preset buttons */}
              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500 mb-3">快速预设：</p>
                <div className="flex gap-2 flex-wrap">
                  <button 
                    onClick={() => {
                      setEdgeLineWidth(10);
                      setEdgeBlurAmount(18);
                      setGlowSpread(8);
                      setIconBackgroundBlur(2);
                      setAnimationSpeed(300);
                    }}
                    className="px-4 py-2 rounded-lg bg-amber-100 text-amber-700 text-sm hover:bg-amber-200 transition-colors"
                  >
                    推荐值 (10/18/8/2/300ms)
                  </button>
                  <button 
                    onClick={() => {
                      setEdgeLineWidth(6);
                      setEdgeBlurAmount(12);
                      setGlowSpread(5);
                      setIconBackgroundBlur(1);
                      setAnimationSpeed(200);
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm hover:bg-slate-200 transition-colors"
                  >
                    快速 (6/12/5/1/200ms)
                  </button>
                  <button 
                    onClick={() => {
                      setEdgeLineWidth(14);
                      setEdgeBlurAmount(25);
                      setGlowSpread(12);
                      setIconBackgroundBlur(3);
                      setAnimationSpeed(500);
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm hover:bg-slate-200 transition-colors"
                  >
                    重度雾气 (14/25/12/3/500ms)
                  </button>
                  <button 
                    onClick={() => {
                      setEdgeLineWidth(10);
                      setEdgeBlurAmount(18);
                      setGlowSpread(8);
                      setIconBackgroundBlur(2);
                      setAnimationSpeed(800);
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm hover:bg-slate-200 transition-colors"
                  >
                    慢动作观察 (10/18/8/2/800ms)
                  </button>
                </div>
              </div>
            </div>

            {/* Live Preview */}
            <div>
              <h4 className="text-base font-medium mb-4 text-slate-700">实时预览 - 容器完全静止：</h4>
              <div className="flex justify-center p-8 bg-slate-50 rounded-xl">
                <DynamicBorderlessCardV1_3
                  title="v1.3"
                  subtitle="静态容器"
                  icon={FileArchive}
                  iconColor={{ r: 167, g: 139, b: 250 }}
                  edgeLineWidth={edgeLineWidth}
                  edgeBlurAmount={edgeBlurAmount}
                  glowSpread={glowSpread}
                  iconBackgroundBlur={iconBackgroundBlur}
                  animationSpeed={animationSpeed}
                />
              </div>

              {/* Observation Tips */}
              <div className="mt-6 p-4 bg-fuchsia-50 rounded-lg border border-fuchsia-200">
                <h5 className="text-sm font-medium text-fuchsia-900 mb-2">👀 观察要点：</h5>
                <ul className="space-y-1 text-xs text-fuchsia-700">
                  <li>• <strong>容器静止：</strong>Hover时容器不动（无位移、无圆角变化、无模糊度变化）</li>
                  <li>• <strong>焦点清晰：</strong>注意力完全在边缘线条的收缩消失上</li>
                  <li>• <strong>速度可调：</strong>调节速度滑块到800ms观察慢动作</li>
                  <li>• <strong>极简动画：</strong>只有2个动画元素（边缘线条 + 图标背景）</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Animation speed demonstration */}
        <Section title="⚡ 动画速度演示" subtitle="Animation Speed Demonstration">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { speed: 150, label: '极快', desc: 'Ultra Fast', color: 'cyan' },
              { speed: 300, label: '推荐', desc: 'Recommended', color: 'violet' },
              { speed: 700, label: '慢动作', desc: 'Slow Motion', color: 'orange' },
            ].map((preset) => (
              <div key={preset.speed} className={`p-6 rounded-xl bg-${preset.color}-50 border-2 border-${preset.color}-200`}>
                <div className="mb-4 text-center">
                  <h3 className={`text-lg font-medium text-${preset.color}-900`}>{preset.label}</h3>
                  <p className="text-sm text-slate-600">{preset.desc}</p>
                  <p className={`text-2xl font-mono font-bold text-${preset.color}-600 mt-2`}>{preset.speed}ms</p>
                </div>
                <div className="flex justify-center">
                  <DynamicBorderlessCardV1_3
                    title={preset.label}
                    subtitle={`${preset.speed}ms`}
                    icon={FileArchive}
                    iconColor={{ r: 167, g: 139, b: 250 }}
                    edgeLineWidth={10}
                    edgeBlurAmount={18}
                    glowSpread={8}
                    iconBackgroundBlur={2}
                    animationSpeed={preset.speed}
                  />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Advantages */}
        <Section title="✨ v1.3 优势" subtitle="v1.3 Advantages">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-cyan-50 border-2 border-cyan-200">
              <h3 className="text-lg font-medium text-cyan-900 mb-3">焦点清晰</h3>
              <ul className="space-y-2 text-sm text-cyan-800">
                <li>✓ 容器完全静止</li>
                <li>✓ 注意力集中在边缘</li>
                <li>✓ 动画意图明确</li>
                <li>✓ 不分散注意力</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-green-50 border-2 border-green-200">
              <h3 className="text-lg font-medium text-green-900 mb-3">视觉稳定</h3>
              <ul className="space-y-2 text-sm text-green-800">
                <li>✓ 位置固定不跳动</li>
                <li>✓ 形状恒定不变化</li>
                <li>✓ 模糊度统一</li>
                <li>✓ 整体感更强</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-purple-50 border-2 border-purple-200">
              <h3 className="text-lg font-medium text-purple-900 mb-3">代码简洁</h3>
              <ul className="space-y-2 text-sm text-purple-800">
                <li>✓ 普通div，非motion</li>
                <li>✓ 无variants对象</li>
                <li>✓ 少一个动画层</li>
                <li>✓ 性能更好</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Layer structure */}
        <Section title="📐 层级结构" subtitle="Layer Structure">
          <div className="p-8 rounded-2xl bg-slate-50">
            <div className="space-y-4">
              {/* Layer 3: Edge line */}
              <div className="p-6 rounded-xl bg-cyan-100 border-2 border-cyan-300">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-medium text-cyan-900">z-index: 3 - 边缘线条层</h3>
                  <span className="text-xs bg-cyan-200 text-cyan-800 px-3 py-1 rounded-full font-medium">
                    有动画 ✓
                  </span>
                </div>
                <div className="text-sm text-cyan-800 space-y-1">
                  <p>• <strong>动画：</strong>borderWidth (10px → 0), filter blur (18px → 0)</p>
                  <p>• <strong>静态：</strong>borderRadius (24px), position (inset: 0)</p>
                  <p>• <strong>作用：</strong>唯一的外层动画，雾气效果的核心</p>
                </div>
              </div>

              {/* Layer 2: Main container */}
              <div className="p-6 rounded-xl bg-slate-200 border-2 border-slate-400">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-medium text-slate-900">z-index: 2 - 主容器层</h3>
                  <span className="text-xs bg-red-200 text-red-800 px-3 py-1 rounded-full font-medium">
                    完全静态 ✗
                  </span>
                </div>
                <div className="text-sm text-slate-700 space-y-1">
                  <p>• <strong>无动画！</strong>所有属性固定不变</p>
                  <p>• background: 固定渐变 (35% 位置)</p>
                  <p>• backdropFilter: 固定 blur(32px)</p>
                  <p>• borderRadius: 固定 24px</p>
                  <p>• transform: 固定 translateY(0)</p>
                  <p>• boxShadow: 固定光晕</p>
                </div>
              </div>

              {/* Layer 10: Icon */}
              <div className="p-6 rounded-xl bg-purple-100 border-2 border-purple-300">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-medium text-purple-900">z-index: 10 - 图标层</h3>
                  <span className="text-xs bg-purple-200 text-purple-800 px-3 py-1 rounded-full font-medium">
                    有动画 ✓
                  </span>
                </div>
                <div className="text-sm text-purple-800 space-y-1">
                  <p>• <strong>背景动画：</strong>filter blur (2px → 0), boxShadow变化</p>
                  <p>• <strong>图标：</strong>永远清晰</p>
                  <p>• <strong>作用：</strong>内部动画，增加细节</p>
                </div>
              </div>
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
              <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono">
{`创建 v1.3 - 外层容器完全静态

核心改动：
1. 主容器从 <motion.div> 改为 <div>
2. 移除所有容器动画：
   - borderRadius: 固定24px
   - y: 固定0
   - backdropFilter: 固定blur(32px)
   - background: 固定渐变位置35%
   - boxShadow: 固定光晕

3. 只保留2个动画：
   - 边缘线条: borderWidth 10px→0, filter blur(18px)→0
   - 紫色背景: filter blur(2px)→0, boxShadow变化

4. 新增动画速度滑块：
   - 范围: 100-1000ms
   - 默认: 300ms
   - 控制所有动画的速度
   - 可以看慢动作观察细节

优势：
- 焦点清晰：容器静止，注意力在边缘
- 视觉稳定：无位置、形状、模糊度变化
- 代码简洁：少一个motion.div和variants`}
              </pre>
            </div>
            
            {/* 英文版 */}
            <div>
              <h4 className="text-sm text-slate-400 mb-2">Prompt (English Version)</h4>
              <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono">
{`Create v1.3 - Fully static outer container

Core changes:
1. Main container from <motion.div> to <div>
2. Remove all container animations:
   - borderRadius: fixed 24px
   - y: fixed 0
   - backdropFilter: fixed blur(32px)
   - background: fixed gradient position 35%
   - boxShadow: fixed glow

3. Keep only 2 animations:
   - Edge line: borderWidth 10px→0, filter blur(18px)→0
   - Purple background: filter blur(2px)→0, boxShadow change

4. New animation speed slider:
   - Range: 100-1000ms
   - Default: 300ms
   - Controls all animation speed
   - Can see slow motion for details

Advantages:
- Clear focus: Container static, attention on edge
- Visual stability: No position, shape, blur changes
- Code simplicity: One less motion.div and variants`}
              </pre>
            </div>
            
            {/* 元数据 */}
            <div className="text-xs text-slate-400 pt-4 border-t border-slate-700 space-y-1">
              <p>生成日期: 2025-11-02</p>
              <p>Prompt文件: prompt-02.13-static-container-v1.3.md</p>
              <p>探索方向: 外层容器完全静态，只有边缘线条动画</p>
              <p>新增功能: 动画速度滑块（100-1000ms）</p>
              <p>动画数量: 2个（边缘线条 + 图标背景）</p>
              <p>静态属性: borderRadius, y, backdropFilter, background全部固定</p>
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
