import { motion } from "motion/react";
import { DynamicBorderlessCardV7Fixed } from "../components/borderless/DynamicBorderlessCardV7Fixed";
import { ArrowLeft, FileArchive, Sliders, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";

interface DynamicBorderlessV7SliderFixProps {
  onBack?: () => void;
}

export default function DynamicBorderlessV7SliderFix({ onBack }: DynamicBorderlessV7SliderFixProps) {
  // Interactive control panel state
  const [iconBlurValue, setIconBlurValue] = useState(2);
  const [containerBlurValue, setContainerBlurValue] = useState(32);
  const [glowSpreadValue, setGlowSpreadValue] = useState(70);

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
                <h1 className="text-5xl">Dynamic Borderless v0.7 · 滑块修复</h1>
              </div>
              <p className="text-xl text-slate-600">探索：修复所有滑块功能，实现参数实时可调</p>
              <p className="text-sm text-slate-500 mt-2">Exploration: Fix all slider functionality for real-time parameter adjustment</p>
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

        {/* Problem & Solution Banner */}
        <Section title="🔧 修复内容" subtitle="What Was Fixed">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Before */}
            <div className="p-6 rounded-xl bg-orange-50 border-2 border-orange-200">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-medium text-orange-900 mb-2">修复前的问题</h3>
                  <p className="text-sm text-orange-700 mb-3">v0.7 原版本有2个滑块无效：</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-slate-700">紫色背景模糊滑块：<strong>有效</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span className="text-slate-700">外层容器模糊滑块：<strong>无效</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span className="text-slate-700">光晕扩散范围滑块：<strong>无效</strong></span>
                </li>
              </ul>
            </div>

            {/* After */}
            <div className="p-6 rounded-xl bg-green-50 border-2 border-green-200">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-medium text-green-900 mb-2">修复后的效果</h3>
                  <p className="text-sm text-green-700 mb-3">所有滑块都能实时控制效果：</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-slate-700">紫色背景模糊滑块：<strong>有效</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-slate-700">外层容器模糊滑块：<strong>已修复</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-slate-700">光晕扩散范围滑块：<strong>已修复</strong></span>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Technical Fix Explanation */}
        <Section title="🛠️ 技术修复说明" subtitle="Technical Solution">
          <div className="p-6 rounded-xl bg-slate-50">
            <h3 className="text-lg font-medium mb-4 text-slate-900">问题原因</h3>
            <p className="text-slate-700 mb-4">
              Motion 的 variants 对象在组件挂载时只评估一次，不会在 props 改变时自动重新评估。
            </p>
            
            <h3 className="text-lg font-medium mb-4 text-slate-900 mt-6">解决方案</h3>
            <div className="space-y-3 text-sm">
              <div className="p-4 bg-white rounded-lg border border-slate-200">
                <p className="font-mono text-purple-600 mb-2">使用 useMemo 创建动态 variants</p>
                <pre className="text-xs bg-slate-900 text-slate-100 p-3 rounded overflow-x-auto">
{`const outerVariants = useMemo(() => ({
  default: {
    backdropFilter: \`blur(\${containerBackdropBlur}px)\`,
    boxShadow: \`0 0 \${glowSpread}px rgba(...)\`,
  }
}), [containerBackdropBlur, glowSpread]);`}
                </pre>
              </div>

              <div className="p-4 bg-white rounded-lg border border-slate-200">
                <p className="font-mono text-cyan-600 mb-2">当 props 改变时，variants 会重新创建</p>
                <p className="text-slate-600">
                  通过 <code className="bg-slate-100 px-1 rounded">useMemo</code> 的依赖数组，确保 variants 在参数改变时更新
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-slate-200">
                <p className="font-mono text-green-600 mb-2">实现实时响应</p>
                <p className="text-slate-600">
                  滑块改变 → state 更新 → variants 重新创建 → 动画平滑过渡
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Interactive Blur Adjustment Panel */}
        <Section title="🎛️ 实时参数调节面板" subtitle="Real-time Parameter Control">
          <div className="p-8 rounded-2xl backdrop-blur-lg" style={{
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 70%, transparent 100%)',
            boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.08)'
          }}>
            <div className="flex items-center gap-3 mb-6">
              <Sliders className="w-6 h-6 text-green-600" />
              <div>
                <h3 className="text-xl">拖动滑块观察效果变化</h3>
                <p className="text-sm text-slate-600">All three sliders now work properly</p>
              </div>
            </div>

            {/* Live preview card */}
            <div className="mb-8 p-8 bg-slate-50 rounded-xl flex justify-center">
              <DynamicBorderlessCardV7Fixed
                title="实时预览"
                subtitle="拖动滑块"
                icon={FileArchive}
                iconColor={{ r: 167, g: 139, b: 250 }}
                iconBackgroundBlur={iconBlurValue}
                containerBackdropBlur={containerBlurValue}
                glowSpread={glowSpreadValue}
              />
            </div>

            {/* Sliders */}
            <div className="space-y-6">
              {/* Slider 1: Icon background blur */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">
                    1️⃣ 紫色背景模糊 <span className="text-xs text-green-600">(已修复 ✓)</span>
                  </label>
                  <span className="text-sm font-mono text-purple-600 font-bold">{iconBlurValue.toFixed(1)}px</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={iconBlurValue}
                  onChange={(e) => setIconBlurValue(parseFloat(e.target.value))}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>0px (完全清晰)</span>
                  <span>5px (重度模糊)</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  控制紫色图标背景的边缘柔和度
                </p>
              </div>

              {/* Slider 2: Outer container blur */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">
                    2️⃣ 外层容器模糊 <span className="text-xs text-green-600 font-medium">(本次修复 ✓)</span>
                  </label>
                  <span className="text-sm font-mono text-cyan-600 font-bold">{containerBlurValue}px</span>
                </div>
                <input 
                  type="range"
                  min="10"
                  max="50"
                  step="1"
                  value={containerBlurValue}
                  onChange={(e) => setContainerBlurValue(parseInt(e.target.value))}
                  className="w-full h-2 bg-cyan-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>10px (轻度)</span>
                  <span>50px (极重度)</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  控制整个卡片的雾气效果 (backdrop-filter)
                </p>
              </div>

              {/* Slider 3: Glow spread */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">
                    3️⃣ 光晕扩散范围 <span className="text-xs text-green-600 font-medium">(本次修复 ✓)</span>
                  </label>
                  <span className="text-sm font-mono text-orange-600 font-bold">{glowSpreadValue}px</span>
                </div>
                <input 
                  type="range"
                  min="20"
                  max="120"
                  step="5"
                  value={glowSpreadValue}
                  onChange={(e) => setGlowSpreadValue(parseInt(e.target.value))}
                  className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>20px (收紧)</span>
                  <span>120px (扩散)</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  控制卡片外围光晕的扩散距离
                </p>
              </div>

              {/* Preset buttons */}
              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500 mb-3">快速预设：</p>
                <div className="flex gap-2 flex-wrap">
                  <button 
                    onClick={() => {
                      setIconBlurValue(2);
                      setContainerBlurValue(32);
                      setGlowSpreadValue(70);
                    }}
                    className="px-4 py-2 rounded-lg bg-purple-100 text-purple-700 text-sm hover:bg-purple-200 transition-colors"
                  >
                    推荐值 (2/32/70)
                  </button>
                  <button 
                    onClick={() => {
                      setIconBlurValue(1);
                      setContainerBlurValue(20);
                      setGlowSpreadValue(40);
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm hover:bg-slate-200 transition-colors"
                  >
                    轻度 (1/20/40)
                  </button>
                  <button 
                    onClick={() => {
                      setIconBlurValue(3);
                      setContainerBlurValue(45);
                      setGlowSpreadValue(100);
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm hover:bg-slate-200 transition-colors"
                  >
                    重度 (3/45/100)
                  </button>
                  <button 
                    onClick={() => {
                      setIconBlurValue(0);
                      setContainerBlurValue(15);
                      setGlowSpreadValue(30);
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm hover:bg-slate-200 transition-colors"
                  >
                    清晰 (0/15/30)
                  </button>
                </div>
              </div>

              {/* Current values display */}
              <div className="mt-6 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                <p className="text-xs font-medium text-cyan-900 mb-2">当前参数代码：</p>
                <code className="text-xs text-cyan-700 block font-mono">
                  iconBackgroundBlur: {iconBlurValue.toFixed(1)}px<br/>
                  containerBackdropBlur: {containerBlurValue}px<br/>
                  glowSpread: {glowSpreadValue}px
                </code>
              </div>
            </div>
          </div>
        </Section>

        {/* Verification Section */}
        <Section title="✅ 修复验证" subtitle="Fix Verification">
          <div className="grid md:grid-cols-3 gap-6">
            <VerificationCard
              number="1"
              title="紫色背景模糊"
              description="拖动滑块1，观察紫色背景边缘"
              test="从清晰 (0px) 到模糊 (5px)"
              status="working"
            />
            <VerificationCard
              number="2"
              title="外层容器模糊"
              description="拖动滑块2，观察整个卡片雾气"
              test="从轻度 (10px) 到重度 (50px)"
              status="fixed"
            />
            <VerificationCard
              number="3"
              title="光晕扩散范围"
              description="拖动滑块3，观察外围光晕"
              test="从收紧 (20px) 到扩散 (120px)"
              status="fixed"
            />
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
{`修复 v0.7 页面的滑块功能问题。

当前问题：
- "紫色背景模糊"滑块：✓ 有效
- "外层容器模糊"滑块：✗ 无效
- "光晕扩散范围"滑块：✗ 无效

修复方案：
1. 确保组件接受 containerBackdropBlur prop
2. 确保组件接受 glowSpread prop
3. 在 variants 的 backdropFilter 中使用 containerBackdropBlur
4. 在 variants 的 boxShadow 中使用 glowSpread
5. 使用 useMemo 让 variants 在 props 改变时重新创建

技术细节：
- Motion 的 variants 对象在组件挂载时只评估一次
- 需要用 useMemo 包裹 variants 并设置依赖数组
- 当 props 改变时，variants 会重新创建，动画会平滑过渡

修复后效果：
- 所有3个滑块都能实时控制对应效果
- 拖动滑块即可看到卡片参数变化
- 可以通过滑块找到最佳视觉效果组合`}
              </pre>
            </div>
            
            {/* 英文版 */}
            <div>
              <h4 className="text-sm text-slate-400 mb-2">Prompt (English Version)</h4>
              <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap">
{`Fix slider functionality issues in v0.7 page.

Current issues:
- "Icon background blur" slider: ✓ Working
- "Outer container blur" slider: ✗ Not working
- "Glow spread" slider: ✗ Not working

Fix approach:
1. Ensure component accepts containerBackdropBlur prop
2. Ensure component accepts glowSpread prop
3. Use containerBackdropBlur in variants backdropFilter
4. Use glowSpread in variants boxShadow
5. Use useMemo to recreate variants when props change

Technical details:
- Motion's variants are evaluated once on component mount
- Need to wrap variants with useMemo and set dependency array
- When props change, variants recreate and animation transitions smoothly

After fix:
- All 3 sliders control their effects in real-time
- Drag sliders to see card parameters change
- Can find optimal visual effect combination via sliders`}
              </pre>
            </div>
            
            {/* 元数据 */}
            <div className="text-xs text-slate-400 pt-4 border-t border-slate-700 space-y-1">
              <p>生成日期: 2025-11-02</p>
              <p>Prompt文件: prompt-02.07-dynamic-borderless-v0.7-fix.md</p>
              <p>探索方向: 修复滑块功能，实现所有参数实时可调节</p>
              <p>修复问题: 外层容器模糊滑块和光晕扩散滑块无效</p>
              <p>技术方案: 使用 useMemo 创建动态 variants</p>
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

function VerificationCard({
  number,
  title,
  description,
  test,
  status
}: {
  number: string;
  title: string;
  description: string;
  test: string;
  status: 'working' | 'fixed';
}) {
  const statusConfig = {
    working: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      badge: 'bg-blue-100 text-blue-700',
      label: '原本有效'
    },
    fixed: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      badge: 'bg-green-100 text-green-700',
      label: '已修复 ✓'
    }
  };

  const config = statusConfig[status];

  return (
    <div className={`p-6 rounded-xl ${config.bg} border-2 ${config.border}`}>
      <div className="flex items-start justify-between mb-3">
        <span className={`text-2xl font-bold ${config.text}`}>{number}</span>
        <span className={`px-2 py-1 rounded text-xs font-medium ${config.badge}`}>
          {config.label}
        </span>
      </div>
      <h3 className={`text-lg font-medium mb-2 ${config.text}`}>{title}</h3>
      <p className="text-sm text-slate-600 mb-3">{description}</p>
      <div className={`p-3 rounded-lg bg-white border ${config.border}`}>
        <p className="text-xs text-slate-600 font-medium mb-1">测试方法：</p>
        <p className="text-xs text-slate-700">{test}</p>
      </div>
    </div>
  );
}
