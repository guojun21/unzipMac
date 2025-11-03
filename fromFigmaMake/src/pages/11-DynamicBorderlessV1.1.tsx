import { motion } from "motion/react";
import { DynamicBorderlessCardV1_1 } from "../components/borderless/DynamicBorderlessCardV1_1";
import { ArrowLeft, FileArchive, Sliders, Clock, Zap } from "lucide-react";
import { useState } from "react";

interface DynamicBorderlessV1_1Props {
  onBack?: () => void;
}

export default function DynamicBorderlessV1_1({ onBack }: DynamicBorderlessV1_1Props) {
  // Interactive control panel state
  const [edgeLineWidth, setEdgeLineWidth] = useState(10);
  const [edgeBlurAmount, setEdgeBlurAmount] = useState(18);
  const [glowSpread, setGlowSpread] = useState(8);
  const [iconBackgroundBlur, setIconBackgroundBlur] = useState(2);

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
                <h1 className="text-5xl">Dynamic Borderless v1.1</h1>
              </div>
              <p className="text-xl text-slate-600">探索：边缘线条重度模糊，分阶段动画过渡</p>
              <p className="text-sm text-slate-500 mt-2">Exploration: Heavy edge blur with phased animation transition</p>
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

        {/* Animation Timeline Visualization */}
        <Section title="⏱️ 动画时间轴可视化" subtitle="Animation Timeline Visualization">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Mist State */}
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-32 h-32 mx-auto rounded-2xl border-8 border-cyan-400 relative overflow-hidden" style={{ filter: 'blur(8px)' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/50"></div>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-teal-900 mb-2">雾气态</h3>
                <p className="text-sm text-teal-700 mb-2">Mist State</p>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li>• 粗蓝色边缘线条 (10px)</li>
                  <li>• 重度模糊 (18px)</li>
                  <li>• 只作用在线条上</li>
                </ul>
              </div>

              {/* Transition */}
              <div className="text-center">
                <div className="mb-4 flex items-center justify-center">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 justify-center">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <span className="text-xs text-orange-700 font-medium">0-300ms</span>
                    </div>
                    <div className="w-32 h-32 mx-auto rounded-2xl border-4 border-cyan-300 relative overflow-hidden" style={{ filter: 'blur(4px)', opacity: 0.6 }}>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/50"></div>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      <Clock className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-green-700 font-medium">300-400ms</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-orange-900 mb-2">过渡中</h3>
                <p className="text-sm text-orange-700 mb-2">Transition</p>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li>• 线条收缩消失</li>
                  <li>• 模糊度降至0</li>
                  <li>• 光晕开始淡入</li>
                </ul>
              </div>

              {/* Condensed State */}
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-32 h-32 mx-auto rounded-xl relative overflow-hidden" style={{ boxShadow: '0 0 20px 8px rgba(6,182,212,0.25)' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-white/70"></div>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-green-900 mb-2">凝结态</h3>
                <p className="text-sm text-green-700 mb-2">Condensed State</p>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li>• 清晰边缘</li>
                  <li>• box-shadow光晕 (8px)</li>
                  <li>• 边角更圆润 (16px)</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-4 bg-white rounded-lg border border-teal-300">
              <h4 className="text-sm font-medium text-teal-900 mb-2">🎬 动画设计理念</h4>
              <p className="text-xs text-slate-700">
                <strong>两阶段过渡：</strong>先让边缘线条收缩并去除模糊（视觉重点），然后光晕淡入（补充细节）。
                这种分层动画比简单的淡入淡出更有层次感，模拟了水滴从雾气凝结的物理过程。
              </p>
            </div>
          </div>
        </Section>

        {/* Core Innovation */}
        <Section title="💡 核心创新" subtitle="Core Innovation">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Edge blur technique */}
            <div className="p-6 rounded-xl bg-cyan-50 border-2 border-cyan-200">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-cyan-600" />
                <h3 className="text-lg font-medium text-cyan-900">独立边缘线条层</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg">
                  <code className="text-xs block mb-2">
                    border: 10px solid rgba(6,182,212,0.8);<br/>
                    filter: blur(18px);
                  </code>
                  <p className="text-xs text-slate-700 mt-2">
                    <strong>关键：</strong>blur只作用在border层，不影响内容区域
                  </p>
                </div>
                <ul className="text-sm text-cyan-800 space-y-1">
                  <li>• 粗蓝色线条 (10px solid)</li>
                  <li>• 重度模糊 (18px blur)</li>
                  <li>• 模糊范围约36-40px</li>
                  <li>• 严格沿着边缘扩散</li>
                </ul>
              </div>
            </div>

            {/* Phased animation */}
            <div className="p-6 rounded-xl bg-purple-50 border-2 border-purple-200">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-medium text-purple-900">分阶段动画控制</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-xs font-medium text-purple-900 mb-2">使用 useAnimation + setTimeout</p>
                  <code className="text-xs block">
                    edgeControls.start(&#123;...&#125;);<br/>
                    setTimeout(() =&gt; &#123;<br/>
                    &nbsp;&nbsp;glowControls.start(&#123;...&#125;);<br/>
                    &#125;, 300);
                  </code>
                </div>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• 阶段1: 线条收缩 (0-300ms)</li>
                  <li>• 阶段2: 光晕淡入 (300-400ms)</li>
                  <li>• 精确时序控制</li>
                  <li>• 更有层次感</li>
                </ul>
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
              <Sliders className="w-6 h-6 text-teal-600" />
              <div>
                <h3 className="text-xl">调节参数观察边缘模糊动画效果</h3>
                <p className="text-sm text-slate-600">Adjust parameters to see edge blur animation effect</p>
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
                <p className="text-xs text-slate-500 mt-1">控制雾气态的蓝色边缘线条宽度</p>
              </div>

              {/* Slider 2: Edge blur amount - CORE FEATURE */}
              <div className="pt-4 border-t-2 border-teal-200">
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    2️⃣ 边缘模糊强度
                    <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded font-medium">核心参数</span>
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
                  <span>0px (清晰线条)</span>
                  <span>30px (重度雾化)</span>
                </div>
                <p className="text-xs text-teal-600 mt-2 font-medium">
                  ⭐ 控制蓝色边缘线条的模糊程度，只作用在线条层上，不影响内容
                </p>
              </div>

              {/* Slider 3: Glow spread */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">
                    3️⃣ 凝结态光晕扩散
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
                <p className="text-xs text-slate-500 mt-1">控制hover后的box-shadow光晕大小（凝结态）</p>
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
                    className="px-4 py-2 rounded-lg bg-teal-100 text-teal-700 text-sm hover:bg-teal-200 transition-colors"
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
                    清晰边缘 (8/0/15/0)
                  </button>
                </div>
              </div>
            </div>

            {/* Live Preview */}
            <div>
              <h4 className="text-base font-medium mb-4 text-slate-700">实时预览 - Hover观察动画过渡：</h4>
              <div className="flex justify-center p-8 bg-slate-50 rounded-xl">
                <DynamicBorderlessCardV1_1
                  title="v1.1"
                  subtitle="边缘模糊动画"
                  icon={FileArchive}
                  iconColor={{ r: 167, g: 139, b: 250 }}
                  edgeLineWidth={edgeLineWidth}
                  edgeBlurAmount={edgeBlurAmount}
                  glowSpread={glowSpread}
                  iconBackgroundBlur={iconBackgroundBlur}
                />
              </div>

              {/* Observation Tips */}
              <div className="mt-6 p-4 bg-teal-50 rounded-lg border border-teal-200">
                <h5 className="text-sm font-medium text-teal-900 mb-2">👀 观察要点：</h5>
                <ul className="space-y-1 text-xs text-teal-700">
                  <li>• <strong>雾气态：</strong>注意边缘的粗蓝色线条和重度模糊效果</li>
                  <li>• <strong>Hover过渡：</strong>观察线条收缩消失（0-300ms）→ 光晕淡入（300-400ms）的两阶段动画</li>
                  <li>• <strong>凝结态：</strong>边缘清晰，只有细腻的box-shadow光晕</li>
                  <li>• <strong>内容始终清晰：</strong>图标和文字不受边缘模糊影响</li>
                  <li>• <strong>调节滑块2：</strong>改变边缘模糊强度，观察雾气效果变化</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Technical Implementation */}
        <Section title="🔧 技术实现细节" subtitle="Technical Implementation Details">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Layer structure */}
            <div className="p-6 rounded-xl bg-slate-50 border-2 border-slate-200">
              <h3 className="text-lg font-medium text-slate-900 mb-4">层级结构（3层）</h3>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg border-l-4 border-cyan-500">
                  <p className="text-xs font-medium text-slate-900 mb-1">层1: 边缘线条层（z-index: 3）</p>
                  <code className="text-xs block text-slate-600">
                    border: 10px solid cyan<br/>
                    filter: blur(18px)<br/>
                    独立模糊，不影响其他层
                  </code>
                </div>

                <div className="p-3 bg-white rounded-lg border-l-4 border-slate-400">
                  <p className="text-xs font-medium text-slate-900 mb-1">层2: 主容器层（z-index: 2）</p>
                  <code className="text-xs block text-slate-600">
                    background: radial-gradient(...)<br/>
                    backdropFilter: blur(32px)<br/>
                    包含所有内容
                  </code>
                </div>

                <div className="p-3 bg-white rounded-lg border-l-4 border-green-500">
                  <p className="text-xs font-medium text-slate-900 mb-1">层3: 光晕层（z-index: 1）</p>
                  <code className="text-xs block text-slate-600">
                    boxShadow: 0 0 15px 8px cyan<br/>
                    opacity: 0 → 1 (淡入)<br/>
                    凝结态显示
                  </code>
                </div>
              </div>
            </div>

            {/* Animation timing */}
            <div className="p-6 rounded-xl bg-slate-50 border-2 border-slate-200">
              <h3 className="text-lg font-medium text-slate-900 mb-4">动画时序控制</h3>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-xs font-medium text-orange-900 mb-2">进入凝结态（Hover）</p>
                  <div className="space-y-1 text-xs text-slate-700">
                    <p><strong>0-300ms:</strong> 边缘线条收缩</p>
                    <code className="block pl-2 border-l-2 border-orange-300">
                      borderWidth: 10px → 0px<br/>
                      filter: blur(18px) → blur(0px)<br/>
                      opacity: 1 → 0
                    </code>
                  </div>
                  <div className="space-y-1 text-xs text-slate-700 mt-2">
                    <p><strong>300-400ms:</strong> 光晕淡入</p>
                    <code className="block pl-2 border-l-2 border-green-300">
                      opacity: 0 → 1<br/>
                      boxShadow: fade in
                    </code>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg">
                  <p className="text-xs font-medium text-blue-900 mb-2">退回雾气态（Leave）</p>
                  <div className="space-y-1 text-xs text-slate-700">
                    <p><strong>0-100ms:</strong> 光晕快速消失</p>
                    <p className="text-xs pl-2 border-l-2 border-blue-300">
                      opacity: 1 → 0
                    </p>
                  </div>
                  <div className="space-y-1 text-xs text-slate-700 mt-2">
                    <p><strong>100-400ms:</strong> 边缘线条展开</p>
                    <code className="block pl-2 border-l-2 border-cyan-300">
                      borderWidth: 0px → 10px<br/>
                      filter: blur(0px) → blur(18px)
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Advantages */}
        <Section title="✨ v1.1 优势" subtitle="v1.1 Advantages">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-cyan-50 border-2 border-cyan-200">
              <h3 className="text-lg font-medium text-cyan-900 mb-3">更真实的雾气</h3>
              <ul className="space-y-2 text-sm text-cyan-800">
                <li>✓ 边缘线条模糊更自然</li>
                <li>✓ 模糊严格沿着边缘</li>
                <li>✓ 不会扩散到远处</li>
                <li>✓ 内容始终清晰</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-purple-50 border-2 border-purple-200">
              <h3 className="text-lg font-medium text-purple-900 mb-3">分层动画效果</h3>
              <ul className="space-y-2 text-sm text-purple-800">
                <li>✓ 两阶段过渡更有层次</li>
                <li>✓ 视觉重点明确</li>
                <li>✓ 模拟物理凝结过程</li>
                <li>✓ 比简单淡入更生动</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-green-50 border-2 border-green-200">
              <h3 className="text-lg font-medium text-green-900 mb-3">精确控制</h3>
              <ul className="space-y-2 text-sm text-green-800">
                <li>✓ 独立控制线条粗细</li>
                <li>✓ 独立控制模糊强度</li>
                <li>✓ 精确的时序控制</li>
                <li>✓ 可调节性强</li>
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
{`创建 v1.1 - 边缘模糊线条动画方案

核心设计：
雾气态：粗蓝色边缘线条(10px) + 重度模糊(18px)，只在线条上
过渡：线条收缩消失 + 模糊撤销(0-300ms) → 光晕淡入(300-400ms)
凝结态：清晰box-shadow光晕

技术方案：
- 独立border层，只对这层应用filter: blur()
- useAnimation控制分阶段动画
- 边缘线条和模糊紧密结合
- 内容区域完全不受影响

层级结构（3层）：
1. 边缘线条层（z-index: 3）- 粗蓝色线 + 模糊
2. 主容器层（z-index: 2）- 背景渐变 + 内容
3. 光晕层（z-index: 1）- box-shadow，淡入淡出

动画时序：
进入凝结态：
  0-300ms: 线条收缩(10px→0) + 模糊撤销(18px→0)
  300-400ms: 光晕淡入(opacity 0→1)

退回雾气态：
  0-100ms: 光晕消失
  100-400ms: 线条展开 + 模糊出现

4个滑块：
1. 边缘线条粗细: 4-16px (控制线条宽度)
2. 边缘模糊强度: 0-30px (核心参数，只作用在线条上)
3. 凝结态光晕扩散: 0-20px (hover后的光晕)
4. 图标背景模糊: 0-5px (紫色背景柔和度)

优势：
- 更真实的雾气效果（边缘线条模糊）
- 分层动画更有层次感
- 精确的时序控制
- 内容始终清晰`}
              </pre>
            </div>
            
            {/* 英文版 */}
            <div>
              <h4 className="text-sm text-slate-400 mb-2">Prompt (English Version)</h4>
              <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap">
{`Create v1.1 - Edge blur line animation approach

Core design:
Mist: Thick cyan edge line(10px) + heavy blur(18px), only on line
Transition: Line shrinks & blur removes(0-300ms) → Glow fades in(300-400ms)
Condensed: Sharp box-shadow glow

Technical approach:
- Independent border layer, filter: blur() only on this layer
- useAnimation controls phased animation
- Edge line and blur tightly coupled
- Content area completely unaffected

Layer structure (3 layers):
1. Edge line layer (z-index: 3) - Thick cyan + blur
2. Main container (z-index: 2) - Background gradient + content
3. Glow layer (z-index: 1) - box-shadow, fades in/out

Animation timing:
Enter condensed:
  0-300ms: Line shrinks(10px→0) + blur removes(18px→0)
  300-400ms: Glow fades in(opacity 0→1)

Return to mist:
  0-100ms: Glow disappears
  100-400ms: Line expands + blur appears

4 sliders:
1. Edge line width: 4-16px (line thickness)
2. Edge blur amount: 0-30px (core param, only on line)
3. Condensed glow spread: 0-20px (hover glow)
4. Icon background blur: 0-5px (purple bg softness)

Advantages:
- More realistic mist effect (edge line blur)
- Layered animation with depth
- Precise timing control
- Content always sharp`}
              </pre>
            </div>
            
            {/* 元数据 */}
            <div className="text-xs text-slate-400 pt-4 border-t border-slate-700 space-y-1">
              <p>生成日期: 2025-11-02</p>
              <p>Prompt文件: prompt-02.11-edge-blur-animation-v1.1.md</p>
              <p>探索方向: 边缘线条模糊动画，分阶段过渡效果</p>
              <p>技术创新: 独立border层模糊、useAnimation时序控制、两阶段动画</p>
              <p>核心特性: 边缘线条重度模糊(18px)、线条收缩→光晕淡入</p>
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
