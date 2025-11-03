import { motion } from "motion/react";
import { DynamicBorderlessCardV1_2 } from "../components/borderless/DynamicBorderlessCardV1_2";
import { ArrowLeft, FileArchive, Sliders, CheckCircle2, XCircle, Zap } from "lucide-react";
import { useState } from "react";

interface DynamicBorderlessV1_2Props {
  onBack?: () => void;
}

export default function DynamicBorderlessV1_2({ onBack }: DynamicBorderlessV1_2Props) {
  // Interactive control panel state
  const [edgeLineWidth, setEdgeLineWidth] = useState(10);
  const [edgeBlurAmount, setEdgeBlurAmount] = useState(18);
  const [glowSpread, setGlowSpread] = useState(8);
  const [iconBackgroundBlur, setIconBackgroundBlur] = useState(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 py-12 px-8">
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
                <h1 className="text-5xl">Dynamic Borderless v1.2</h1>
              </div>
              <p className="text-xl text-slate-600">探索：固定尺寸 + 光晕恒定存在</p>
              <p className="text-sm text-slate-500 mt-2">Exploration: Fixed size + Constant glow</p>
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

        {/* Improvements from v1.1 */}
        <Section title="🔧 与v1.1的区别" subtitle="Improvements from v1.1">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Issue 1: Size */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="w-6 h-6 text-red-600" />
                <h3 className="text-lg font-medium text-red-900">v1.1 问题：卡片尺寸变大</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-sm text-red-800 mb-2">问题描述：</p>
                  <ul className="text-xs text-slate-700 space-y-1">
                    <li>• border层让卡片总尺寸超过320×240px</li>
                    <li>• 边缘线条越粗，卡片越大</li>
                    <li>• 没有使用box-sizing: border-box</li>
                  </ul>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border-2 border-green-300">
                  <p className="text-sm text-green-800 mb-2">✅ v1.2 修正：</p>
                  <ul className="text-xs text-green-700 space-y-1">
                    <li>• 使用 box-sizing: border-box</li>
                    <li>• 外层容器固定 320×240px</li>
                    <li>• border和padding在尺寸内部</li>
                    <li>• 无论参数如何调节，尺寸恒定</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Issue 2: Glow */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="w-6 h-6 text-red-600" />
                <h3 className="text-lg font-medium text-red-900">v1.1 问题：光晕淡入淡出</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-sm text-red-800 mb-2">问题描述：</p>
                  <ul className="text-xs text-slate-700 space-y-1">
                    <li>• 光晕从opacity: 0淡入到1</li>
                    <li>• 需要额外的光晕层和动画控制</li>
                    <li>• 300ms延迟后才开始淡入</li>
                    <li>• 代码更复杂（3层结构）</li>
                  </ul>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border-2 border-green-300">
                  <p className="text-sm text-green-800 mb-2">✅ v1.2 修正：</p>
                  <ul className="text-xs text-green-700 space-y-1">
                    <li>• 光晕始终存在（boxShadow恒定）</li>
                    <li>• 雾气态被模糊线条遮住（z-index）</li>
                    <li>• Hover时线条消失，光晕瞬间可见</li>
                    <li>• 无淡入动画，响应更快</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Technical comparison */}
          <div className="mt-6 p-6 rounded-xl bg-slate-900 text-white">
            <h4 className="text-base font-medium mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              核心技术对比
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-red-400 mb-2">❌ v1.1:</p>
                <pre className="text-xs bg-slate-800 p-3 rounded overflow-x-auto">
{`// 尺寸不固定
<div style={{ padding: '80px' }}>
  <div style={{
    width: '320px',
    border: '10px solid cyan'
    // 实际总宽 = 320 + 10*2 = 340px
  }}>

// 光晕淡入
const glowControls = useAnimation();
glowControls.start({
  opacity: 1,  // 0 → 1
  transition: { duration: 0.1 }
});`}
                </pre>
              </div>
              <div>
                <p className="text-xs text-green-400 mb-2">✅ v1.2:</p>
                <pre className="text-xs bg-slate-800 p-3 rounded overflow-x-auto">
{`// 尺寸固定
<div style={{
  width: '320px',
  height: '240px',
  padding: '0'
}}>
  <div style={{
    width: '320px',
    boxSizing: 'border-box'
    // 总宽 = 320px（固定）
  }}>

// 光晕恒定
variants: {
  default: {
    boxShadow: '0 0 15px 8px cyan'
  },
  hover: {
    boxShadow: '0 0 15px 8px cyan'  // 相同值
  }
}`}
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
              <Sliders className="w-6 h-6 text-violet-600" />
              <div>
                <h3 className="text-xl">调节参数观察固定尺寸和恒定光晕效果</h3>
                <p className="text-sm text-slate-600">Adjust parameters to see fixed size and constant glow</p>
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
                  <span>4px (细线)</span>
                  <span>16px (粗线)</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">控制雾气态的蓝色边缘线条宽度（卡片尺寸不变）</p>
              </div>

              {/* Slider 2: Edge blur amount - CORE FEATURE */}
              <div className="pt-4 border-t-2 border-violet-200">
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    2️⃣ 边缘模糊强度
                    <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded font-medium">核心参数</span>
                  </label>
                  <span className="text-sm font-mono text-violet-600 font-bold">{edgeBlurAmount}px</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="30"
                  step="1"
                  value={edgeBlurAmount}
                  onChange={(e) => setEdgeBlurAmount(parseInt(e.target.value))}
                  className="w-full h-2 bg-violet-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>0px (清晰线条)</span>
                  <span>30px (重度雾化)</span>
                </div>
                <p className="text-xs text-violet-600 mt-2 font-medium">
                  ⭐ 控制蓝色边缘线条的模糊程度，只作用在线条层上
                </p>
              </div>

              {/* Slider 3: Glow spread */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    3️⃣ 凝结态光晕扩散
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">恒定存在</span>
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
                  <span>0px (无光晕)</span>
                  <span>20px (明显光晕)</span>
                </div>
                <p className="text-xs text-green-600 mt-2 font-medium">
                  💡 光晕始终存在不淡入，此值控制box-shadow的spread大小
                </p>
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
                <p className="text-xs text-slate-500 mt-1">控制紫色图标背景的边缘柔和度</p>
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
                    }}
                    className="px-4 py-2 rounded-lg bg-violet-100 text-violet-700 text-sm hover:bg-violet-200 transition-colors"
                  >
                    推荐值 (10/18/8/2)
                  </button>
                  <button 
                    onClick={() => {
                      setEdgeLineWidth(6);
                      setEdgeBlurAmount(12);
                      setGlowSpread(5);
                      setIconBackgroundBlur(1);
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm hover:bg-slate-200 transition-colors"
                  >
                    轻度 (6/12/5/1)
                  </button>
                  <button 
                    onClick={() => {
                      setEdgeLineWidth(14);
                      setEdgeBlurAmount(25);
                      setGlowSpread(12);
                      setIconBackgroundBlur(3);
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm hover:bg-slate-200 transition-colors"
                  >
                    重度雾气 (14/25/12/3)
                  </button>
                  <button 
                    onClick={() => {
                      setEdgeLineWidth(8);
                      setEdgeBlurAmount(0);
                      setGlowSpread(15);
                      setIconBackgroundBlur(0);
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm hover:bg-slate-200 transition-colors"
                  >
                    无模糊 (8/0/15/0)
                  </button>
                </div>
              </div>
            </div>

            {/* Live Preview */}
            <div>
              <h4 className="text-base font-medium mb-4 text-slate-700">实时预览 - 观察固定尺寸和光晕瞬间显现：</h4>
              <div className="flex justify-center p-8 bg-slate-50 rounded-xl">
                <DynamicBorderlessCardV1_2
                  title="v1.2"
                  subtitle="固定尺寸 + 恒定光晕"
                  icon={FileArchive}
                  iconColor={{ r: 167, g: 139, b: 250 }}
                  edgeLineWidth={edgeLineWidth}
                  edgeBlurAmount={edgeBlurAmount}
                  glowSpread={glowSpread}
                  iconBackgroundBlur={iconBackgroundBlur}
                />
              </div>

              {/* Observation Tips */}
              <div className="mt-6 p-4 bg-violet-50 rounded-lg border border-violet-200">
                <h5 className="text-sm font-medium text-violet-900 mb-2">👀 观察要点：</h5>
                <ul className="space-y-1 text-xs text-violet-700">
                  <li>• <strong>卡片尺寸：</strong>无论如何调节滑块，卡片始终是320×240px</li>
                  <li>• <strong>光晕显现：</strong>Hover瞬间光晕立即可见，不是淡入（无延迟）</li>
                  <li>• <strong>边缘线条：</strong>调节粗细和模糊不会让卡片变大</li>
                  <li>• <strong>响应速度：</strong>比v1.1更快，无300ms光晕淡入等待</li>
                  <li>• <strong>DevTools验证：</strong>检查box-shadow在default和hover状态都存在</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Animation Timeline */}
        <Section title="📊 动画时间轴" subtitle="Animation Timeline">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-200">
            <div className="space-y-6">
              {/* Hover In */}
              <div>
                <h3 className="text-lg font-medium text-violet-900 mb-4">雾气态 → Hover凝结态</h3>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {[
                    { time: '0ms', desc: '粗线', blur: '18px', width: '10px' },
                    { time: '75ms', desc: '中线', blur: '13.5px', width: '7.5px' },
                    { time: '150ms', desc: '细线', blur: '9px', width: '5px' },
                    { time: '225ms', desc: '微线', blur: '4.5px', width: '2.5px' },
                    { time: '300ms', desc: '消失', blur: '0px', width: '0px' },
                  ].map((step, i) => (
                    <div key={i} className="p-3 bg-white rounded-lg text-center">
                      <p className="text-xs font-medium text-violet-900 mb-2">{step.time}</p>
                      <div 
                        className="mx-auto mb-2 bg-cyan-400 rounded"
                        style={{
                          width: `${Math.max(parseInt(step.width), 2)}px`,
                          height: '40px',
                          filter: `blur(${step.blur})`,
                        }}
                      />
                      <p className="text-xs text-slate-600">{step.desc}</p>
                      <p className="text-xs text-slate-400 mt-1">blur: {step.blur}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-300">
                  <p className="text-sm text-green-800">
                    ✅ <strong>300ms时：</strong>边缘线条完全消失 → 光晕瞬间可见（一直存在，z-index下层）
                  </p>
                </div>
              </div>

              {/* Hover Out */}
              <div>
                <h3 className="text-lg font-medium text-violet-900 mb-4">Hover凝结态 → 雾气态</h3>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {[
                    { time: '0ms', desc: '无线', blur: '0px', width: '0px' },
                    { time: '75ms', desc: '微线', blur: '4.5px', width: '2.5px' },
                    { time: '150ms', desc: '细线', blur: '9px', width: '5px' },
                    { time: '225ms', desc: '中线', blur: '13.5px', width: '7.5px' },
                    { time: '300ms', desc: '粗线', blur: '18px', width: '10px' },
                  ].map((step, i) => (
                    <div key={i} className="p-3 bg-white rounded-lg text-center">
                      <p className="text-xs font-medium text-violet-900 mb-2">{step.time}</p>
                      <div 
                        className="mx-auto mb-2 bg-cyan-400 rounded"
                        style={{
                          width: `${Math.max(parseInt(step.width) || 2, 2)}px`,
                          height: '40px',
                          filter: `blur(${step.blur})`,
                        }}
                      />
                      <p className="text-xs text-slate-600">{step.desc}</p>
                      <p className="text-xs text-slate-400 mt-1">blur: {step.blur}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-300">
                  <p className="text-sm text-orange-800">
                    ⚡ <strong>立即：</strong>线条开始展开并模糊，逐渐遮住下方的光晕（z-index上层）
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Technical Details */}
        <Section title="🔧 技术实现细节" subtitle="Technical Implementation Details">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Size control */}
            <div className="p-6 rounded-xl bg-cyan-50 border-2 border-cyan-200">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-6 h-6 text-cyan-600" />
                <h3 className="text-lg font-medium text-cyan-900">固定尺寸技术</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-xs font-medium text-cyan-900 mb-2">外层容器:</p>
                  <code className="text-xs block">
                    width: 320px<br/>
                    height: 240px<br/>
                    padding: 0  {/* 无padding */}
                  </code>
                </div>

                <div className="p-3 bg-white rounded-lg">
                  <p className="text-xs font-medium text-cyan-900 mb-2">边缘线条层:</p>
                  <code className="text-xs block">
                    position: absolute<br/>
                    inset: 0  {/* 完全贴合外层 */}<br/>
                    border: 10px solid cyan<br/>
                    boxSizing: border-box  {/* 关键！ */}
                  </code>
                </div>

                <div className="p-3 bg-white rounded-lg">
                  <p className="text-xs font-medium text-cyan-900 mb-2">主容器:</p>
                  <code className="text-xs block">
                    width: 320px<br/>
                    height: 240px<br/>
                    padding: 32px<br/>
                    boxSizing: border-box  {/* 关键！ */}
                  </code>
                </div>

                <div className="p-3 bg-cyan-100 rounded-lg">
                  <p className="text-xs text-cyan-800">
                    <strong>结果：</strong>总尺寸固定320×240px，border和padding在内部，不溢出
                  </p>
                </div>
              </div>
            </div>

            {/* Constant glow */}
            <div className="p-6 rounded-xl bg-green-50 border-2 border-green-200">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-medium text-green-900">恒定光晕技术</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-xs font-medium text-green-900 mb-2">容器variants (关键):</p>
                  <code className="text-xs block">
                    default: &#123;<br/>
                    &nbsp;&nbsp;boxShadow: '0 0 15px 8px cyan',<br/>
                    &nbsp;&nbsp;{/* 光晕始终存在！ */}<br/>
                    &#125;,<br/>
                    hover: &#123;<br/>
                    &nbsp;&nbsp;boxShadow: '0 0 15px 8px cyan',<br/>
                    &nbsp;&nbsp;{/* 相同值，不淡入淡出 */}<br/>
                    &#125;
                  </code>
                </div>

                <div className="p-3 bg-white rounded-lg">
                  <p className="text-xs font-medium text-green-900 mb-2">z-index层级:</p>
                  <code className="text-xs block">
                    边缘线条层: z-index: 3 (最上)<br/>
                    主容器层: z-index: 2 (有光晕)<br/>
                    <br/>
                    雾气态：线条遮住光晕<br/>
                    凝结态：线条消失，光晕可见
                  </code>
                </div>

                <div className="p-3 bg-green-100 rounded-lg">
                  <p className="text-xs text-green-800">
                    <strong>效果：</strong>光晕恒定存在，通过z-index遮盖/显现，无淡入动画
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Advantages */}
        <Section title="✨ v1.2 优势" subtitle="v1.2 Advantages">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-cyan-50 border-2 border-cyan-200">
              <h3 className="text-lg font-medium text-cyan-900 mb-3">尺寸完全可控</h3>
              <ul className="space-y-2 text-sm text-cyan-800">
                <li>✓ 固定320×240px</li>
                <li>✓ border不增加尺寸</li>
                <li>✓ padding在内部</li>
                <li>✓ 参数调节不影响尺寸</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-green-50 border-2 border-green-200">
              <h3 className="text-lg font-medium text-green-900 mb-3">光晕响应更快</h3>
              <ul className="space-y-2 text-sm text-green-800">
                <li>✓ 无淡入动画</li>
                <li>✓ 瞬间显现</li>
                <li>✓ 无300ms延迟</li>
                <li>✓ 交互更流畅</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-purple-50 border-2 border-purple-200">
              <h3 className="text-lg font-medium text-purple-900 mb-3">代码更简洁</h3>
              <ul className="space-y-2 text-sm text-purple-800">
                <li>✓ 只需2层（不是3层）</li>
                <li>✓ 无需glowControls</li>
                <li>✓ 无需setTimeout延迟</li>
                <li>✓ 逻辑更清晰</li>
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
              <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono">
{`创建 v1.2 - 固定尺寸 + 光晕恒定存在

修正v1.1的2个问题：
1. 卡片尺寸固定为 320×240px（不因border变大）
   - 使用 box-sizing: border-box
   - border和padding在尺寸内部
   - inset: 0 让边缘层贴合容器

2. 光晕始终存在，不淡入淡出
   - default和hover的boxShadow值相同
   - 无opacity动画
   - 雾气态被模糊线条遮住（z-index层级）
   - Hover态线条消失，光晕瞬间显现

关键代码：
- 外层容器: width: 320px, height: 240px, padding: 0
- 边缘层: inset: 0, boxSizing: border-box, zIndex: 3
- 主容器: width: 320px, boxSizing: border-box, zIndex: 2
- 光晕: boxShadow在default和hover都存在

动画：
- 边缘线条: borderWidth 10px→0, filter blur(18px)→0
- 主容器: 渐变位置、borderRadius、y位置变化
- 光晕: 无动画，恒定存在

优势：
- 尺寸完全可控（固定320×240）
- 光晕响应更快（无淡入延迟）
- 代码更简洁（2层而非3层）
- 交互更流畅（瞬间显现）`}
              </pre>
            </div>
            
            {/* 英文版 */}
            <div>
              <h4 className="text-sm text-slate-400 mb-2">Prompt (English Version)</h4>
              <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono">
{`Create v1.2 - Fixed size + Constant glow

Fix 2 issues from v1.1:
1. Card size fixed at 320×240px (not enlarged by border)
   - Use box-sizing: border-box
   - Border and padding inside dimensions
   - inset: 0 makes edge layer fit container

2. Glow always exists, no fade in/out
   - Same boxShadow value in default and hover
   - No opacity animation
   - Mist: glow covered by blurred line (z-index)
   - Hover: line disappears, glow instantly visible

Key code:
- Outer: width: 320px, height: 240px, padding: 0
- Edge layer: inset: 0, boxSizing: border-box, zIndex: 3
- Main: width: 320px, boxSizing: border-box, zIndex: 2
- Glow: boxShadow exists in both default and hover

Animation:
- Edge line: borderWidth 10px→0, filter blur(18px)→0
- Container: gradient position, borderRadius, y change
- Glow: no animation, constant

Advantages:
- Size fully controllable (fixed 320×240)
- Glow responds faster (no fade delay)
- Code simpler (2 layers not 3)
- Interaction smoother (instant appearance)`}
              </pre>
            </div>
            
            {/* 元数据 */}
            <div className="text-xs text-slate-400 pt-4 border-t border-slate-700 space-y-1">
              <p>生成日期: 2025-11-02</p>
              <p>Prompt文件: prompt-02.12-edge-blur-v1.2.md</p>
              <p>探索方向: 固定卡片尺寸，光晕恒定存在被线条遮盖</p>
              <p>修复问题: v1.1卡片变大、光晕淡入淡出</p>
              <p>关键技术: box-sizing: border-box, z-index层级遮盖, 光晕恒定</p>
              <p>尺寸定义: 外层320×240, border在内部, padding在内部</p>
              <p>动画时长: 边缘线条300ms, 容器400ms</p>
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
