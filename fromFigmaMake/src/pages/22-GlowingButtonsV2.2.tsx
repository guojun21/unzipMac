import { motion } from "motion/react";
import { BorderlessButtonV2_2 } from "../components/borderless/BorderlessButtonV2_2";
import { 
  ArrowLeft,
  Upload,
  Download,
  Search,
  Check,
  Trash2,
  X,
  Settings,
  Star,
  Heart,
  Zap,
  Eye,
  Share2,
  Filter,
} from "lucide-react";

interface GlowingButtonsV2_2Props {
  onBack?: () => void;
}

export default function GlowingButtonsV2_2({ onBack }: GlowingButtonsV2_2Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900/30 py-12 px-8">
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
                <h1 className="text-5xl text-white">Borderless Buttons v2.2</h1>
              </div>
              <p className="text-xl text-slate-300">
                修复：添加点击态效果
              </p>
              <p className="text-sm text-slate-400 mt-2">
                Fix: Added Press State Effect
              </p>
              
              {/* Feature badges */}
              <div className="mt-4 flex gap-3 flex-wrap text-sm">
                <span className="px-3 py-1 bg-green-900/50 text-green-300 rounded-full font-medium border border-green-700">
                  ✓ isPressed State
                </span>
                <span className="px-3 py-1 bg-lime-900/50 text-lime-300 rounded-full font-medium border border-lime-700">
                  ✓ onMouseDown/Up
                </span>
                <span className="px-3 py-1 bg-emerald-900/50 text-emerald-300 rounded-full font-medium border border-emerald-700">
                  ✓ brightness(1.15)
                </span>
                <span className="px-3 py-1 bg-teal-900/50 text-teal-300 rounded-full font-medium border border-teal-700">
                  ✓ 200ms 快速响应
                </span>
              </div>
            </div>
            {onBack && (
              <motion.button
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-lime-500 to-lime-600 text-white flex items-center gap-2"
                style={{
                  boxShadow: '0 0 20px rgba(132,204,22,0.3), 0 0 40px rgba(132,204,22,0.15)'
                }}
                whileHover={{
                  boxShadow: '0 0 30px rgba(132,204,22,0.4), 0 0 60px rgba(132,204,22,0.2)',
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

        {/* Section 1: Fix Highlights */}
        <Section title="✅ v2.2 修复内容" subtitle="Press State Implementation">
          <div className="p-6 bg-gradient-to-br from-green-900/30 to-lime-900/30 rounded-xl border-2 border-green-500">
            <div className="grid md:grid-cols-2 gap-6">
              
              <div className="space-y-4">
                <h3 className="text-lg text-white mb-3 flex items-center gap-2">
                  <span className="text-2xl">🔧</span>
                  <span>代码修复</span>
                </h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg">
                    <span className="text-green-400 font-bold">1</span>
                    <div>
                      <p className="text-white font-medium">添加 isPressed State</p>
                      <code className="text-xs text-green-400">const [isPressed, setIsPressed] = useState(false)</code>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg">
                    <span className="text-lime-400 font-bold">2</span>
                    <div>
                      <p className="text-white font-medium">添加鼠标事件处理器</p>
                      <code className="text-xs text-lime-400">onMouseDown, onMouseUp</code>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg">
                    <span className="text-emerald-400 font-bold">3</span>
                    <div>
                      <p className="text-white font-medium">添加 brightness 动画</p>
                      <code className="text-xs text-emerald-400">filter: brightness(1.0 → 1.15)</code>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg">
                    <span className="text-teal-400 font-bold">4</span>
                    <div>
                      <p className="text-white font-medium">onMouseLeave 重置状态</p>
                      <code className="text-xs text-teal-400">setIsPressed(false)</code>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg text-white mb-3 flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  <span>视觉效果</span>
                </h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="p-3 bg-slate-900/50 rounded-lg">
                    <p className="text-white font-medium mb-2">整体变亮 15%</p>
                    <p className="text-xs text-slate-400">
                      点击时所有视觉层都变亮，包括背景、CodePen发光边缘、图标
                    </p>
                  </li>
                  
                  <li className="p-3 bg-slate-900/50 rounded-lg">
                    <p className="text-white font-medium mb-2">200ms 快速响应</p>
                    <p className="text-xs text-slate-400">
                      即时反馈，符合呼应性设计原则（100ms内响应）
                    </p>
                  </li>
                  
                  <li className="p-3 bg-slate-900/50 rounded-lg">
                    <p className="text-white font-medium mb-2">平滑过渡</p>
                    <p className="text-xs text-slate-400">
                      可被打断，快速点击也能平滑过渡，无跳跃
                    </p>
                  </li>
                  
                  <li className="p-3 bg-slate-900/50 rounded-lg">
                    <p className="text-white font-medium mb-2">闪光效果 ✨</p>
                    <p className="text-xs text-slate-400">
                      像能量脉冲、闪光灯、按钮"发光"
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Section 2: Test Instructions */}
        <Section title="🧪 测试方法" subtitle="验证点击态效果">
          <div className="p-6 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl border-2 border-purple-500">
            <div className="grid md:grid-cols-2 gap-6">
              
              <div>
                <h3 className="text-lg text-white mb-4 flex items-center gap-2">
                  <span className="text-xl">👆</span>
                  <span>基础测试</span>
                </h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400">•</span>
                    <div>
                      <strong className="text-white">点击任意按钮</strong>
                      <p className="text-xs text-slate-400 mt-1">
                        应该看到整体变亮的闪光效果（包括背景和发光边缘）
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <span className="text-pink-400">•</span>
                    <div>
                      <strong className="text-white">快速连续点击</strong>
                      <p className="text-xs text-slate-400 mt-1">
                        多次快速点击，每次都应该有即时反馈
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <span className="text-fuchsia-400">•</span>
                    <div>
                      <strong className="text-white">长按</strong>
                      <p className="text-xs text-slate-400 mt-1">
                        按住不放，应该保持变亮状态
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg text-white mb-4 flex items-center gap-2">
                  <span className="text-xl">🔍</span>
                  <span>高级测试</span>
                </h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-400">•</span>
                    <div>
                      <strong className="text-white">按住拖出</strong>
                      <p className="text-xs text-slate-400 mt-1">
                        按住后拖出按钮区域，应该恢复正常（onMouseLeave重置）
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400">•</span>
                    <div>
                      <strong className="text-white">动画打断</strong>
                      <p className="text-xs text-slate-400 mt-1">
                        按下100ms就松开，动画应该从中间值平滑回退
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <span className="text-green-400">•</span>
                    <div>
                      <strong className="text-white">控制台日志</strong>
                      <p className="text-xs text-slate-400 mt-1">
                        打开控制台，点击按钮查看 "Button pressed/released" 日志
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Section 3: Button Grid - All sizes with press state */}
        <Section title="🎨 发光边缘按钮" subtitle="全部支持点击态 · 点击测试">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 justify-items-center">
            
            {/* Row 1: sm size */}
            <div className="text-center">
              <BorderlessButtonV2_2 
                icon={Upload} 
                color={{ r: 6, g: 182, b: 212 }} 
                size="sm"
                onClick={() => console.log('Upload (sm) clicked!')}
              />
              <p className="text-xs text-slate-400 mt-2">上传 · sm</p>
            </div>
            
            <div className="text-center">
              <BorderlessButtonV2_2 
                icon={Download} 
                color={{ r: 34, g: 197, b: 94 }} 
                size="sm"
                onClick={() => console.log('Download (sm) clicked!')}
              />
              <p className="text-xs text-slate-400 mt-2">下载 · sm</p>
            </div>
            
            <div className="text-center">
              <BorderlessButtonV2_2 
                icon={Trash2} 
                color={{ r: 239, g: 68, b: 68 }} 
                size="sm"
                onClick={() => console.log('Delete (sm) clicked!')}
              />
              <p className="text-xs text-slate-400 mt-2">删除 · sm</p>
            </div>
            
            {/* Row 2: md size */}
            <div className="text-center">
              <BorderlessButtonV2_2 
                icon={Search} 
                color={{ r: 6, g: 182, b: 212 }} 
                size="md"
                onClick={() => console.log('Search (md) clicked!')}
              />
              <p className="text-xs text-slate-400 mt-2">搜索 · md</p>
            </div>
            
            <div className="text-center">
              <BorderlessButtonV2_2 
                icon={Check} 
                color={{ r: 34, g: 197, b: 94 }} 
                size="md"
                onClick={() => console.log('Check (md) clicked!')}
              />
              <p className="text-xs text-slate-400 mt-2">确认 · md</p>
            </div>
            
            <div className="text-center">
              <BorderlessButtonV2_2 
                icon={X} 
                color={{ r: 239, g: 68, b: 68 }} 
                size="md"
                onClick={() => console.log('Close (md) clicked!')}
              />
              <p className="text-xs text-slate-400 mt-2">关闭 · md</p>
            </div>
            
            {/* Row 3: lg size */}
            <div className="text-center">
              <BorderlessButtonV2_2 
                icon={Star} 
                color={{ r: 167, g: 139, b: 250 }} 
                size="lg"
                onClick={() => console.log('Star (lg) clicked!')}
              />
              <p className="text-xs text-slate-400 mt-2">收藏 · lg</p>
            </div>
            
            <div className="text-center">
              <BorderlessButtonV2_2 
                icon={Heart} 
                color={{ r: 244, g: 114, b: 182 }} 
                size="lg"
                onClick={() => console.log('Heart (lg) clicked!')}
              />
              <p className="text-xs text-slate-400 mt-2">喜欢 · lg</p>
            </div>
            
            <div className="text-center">
              <BorderlessButtonV2_2 
                icon={Zap} 
                color={{ r: 251, g: 146, b: 60 }} 
                size="lg"
                onClick={() => console.log('Zap (lg) clicked!')}
              />
              <p className="text-xs text-slate-400 mt-2">快速 · lg</p>
            </div>
            
            {/* More buttons */}
            <div className="text-center">
              <BorderlessButtonV2_2 
                icon={Eye} 
                color={{ r: 6, g: 182, b: 212 }} 
                size="md"
                onClick={() => console.log('View clicked!')}
              />
              <p className="text-xs text-slate-400 mt-2">查看</p>
            </div>
            
            <div className="text-center">
              <BorderlessButtonV2_2 
                icon={Share2} 
                color={{ r: 167, g: 139, b: 250 }} 
                size="md"
                onClick={() => console.log('Share clicked!')}
              />
              <p className="text-xs text-slate-400 mt-2">分享</p>
            </div>
            
            <div className="text-center">
              <BorderlessButtonV2_2 
                icon={Settings} 
                color={{ r: 100, g: 116, b: 139 }} 
                size="md"
                onClick={() => console.log('Settings clicked!')}
              />
              <p className="text-xs text-slate-400 mt-2">设置</p>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-cyan-900/30 rounded-xl border border-cyan-500">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="text-slate-300 text-sm mb-2">
                  <strong className="text-white">所有按钮都支持点击态：</strong>
                </p>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li>• brightness(1.15) 整体闪亮效果</li>
                  <li>• 200ms 快速响应，可打断</li>
                  <li>• 点击控制台查看事件日志</li>
                  <li>• Hover 移动鼠标观察 CodePen 发光边缘跟随</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Section 4: Code Comparison */}
        <Section title="💻 代码对比" subtitle="v2.1 vs v2.2">
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Before */}
            <div className="p-6 bg-red-900/20 rounded-xl border border-red-500">
              <h4 className="text-white mb-4 flex items-center gap-2">
                <span className="text-xl">❌</span>
                <span>v2.1 - 问题代码</span>
              </h4>
              <pre className="text-xs font-mono text-slate-300 overflow-auto bg-slate-900 p-4 rounded-lg">
{`// Missing press state implementation
<motion.button
  onClick={onClick}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
  // ❌ No onMouseDown/Up
  // ❌ No brightness animation
  style={{...}}
>
  <Icon />
</motion.button>`}
              </pre>
            </div>
            
            {/* After */}
            <div className="p-6 bg-green-900/20 rounded-xl border border-green-500">
              <h4 className="text-white mb-4 flex items-center gap-2">
                <span className="text-xl">✅</span>
                <span>v2.2 - 修复代码</span>
              </h4>
              <pre className="text-xs font-mono text-slate-300 overflow-auto bg-slate-900 p-4 rounded-lg">
{`// Complete press state implementation
<motion.button
  onClick={onClick}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => {
    setIsHovered(false);
    setIsPressed(false);  // ✅ Reset
  }}
  // ✅ Press event handlers
  onMouseDown={() => setIsPressed(true)}
  onMouseUp={() => setIsPressed(false)}
  // ✅ Brightness animation
  animate={{
    filter: isPressed 
      ? 'brightness(1.15)' 
      : 'brightness(1.0)',
  }}
  transition={{
    duration: 0.2,
    ease: 'easeOut',
  }}
  style={{...}}
>
  <Icon />
</motion.button>`}
              </pre>
            </div>
          </div>
        </Section>

        {/* Prompt记录 */}
        <details className="mt-16 p-6 rounded-xl bg-slate-900 text-white border border-slate-700">
          <summary className="cursor-pointer text-lg font-medium mb-4">
            📝 查看生成此页面的 Prompt
          </summary>
          
          <div className="space-y-6">
            {/* 中文版 */}
            <div>
              <h4 className="text-sm text-slate-400 mb-2">Prompt (中文版)</h4>
              <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono">
{`创建 v2.2 - 修复按钮点击态

文件: src/pages/22-GlowingButtonsV2.2.tsx
组件: src/components/borderless/BorderlessButtonV2_2.tsx

问题：v2.1的按钮没有点击态效果

修复内容：
1. 添加 isPressed state
2. 添加 onMouseDown/Up 事件处理器
3. 添加 brightness(1.15) 动画
4. onMouseLeave 时重置 isPressed
5. 200ms 快速响应，可打断

效果：
- 点击时整体变亮15%（背景+发光边缘+图标）
- 即时反馈，符合呼应性设计原则
- 平滑过渡，无跳跃
- 像闪光、能量脉冲效果

测试方法：
1. 点击任意按钮 - 查看闪光效果
2. 快速连续点击 - 验证即时反馈
3. 长按 - 验证保持变亮
4. 按住拖出 - 验证状态重置
5. 控制台日志 - 查看事件触发

组件文件:
- BorderlessButtonV2_2.tsx (修复版)

导航: 第22个按钮，lime-500 to-lime-600`}
              </pre>
            </div>
            
            {/* 英文版 */}
            <div>
              <h4 className="text-sm text-slate-400 mb-2">Prompt (English Version)</h4>
              <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono">
{`Create v2.2 - Fix Button Press State

File: src/pages/22-GlowingButtonsV2.2.tsx
Component: src/components/borderless/BorderlessButtonV2_2.tsx

Issue: v2.1 buttons have no press state effect

Fix:
1. Add isPressed state
2. Add onMouseDown/Up event handlers
3. Add brightness(1.15) animation
4. Reset isPressed on onMouseLeave
5. 200ms quick response, interruptible

Effect:
- Overall brighten 15% on press (bg + glow + icon)
- Instant feedback, responsive design principle
- Smooth transition, no jumping
- Flash/energy pulse effect

Test methods:
1. Click any button - observe flash effect
2. Rapid clicks - verify instant feedback
3. Long press - verify sustained brightness
4. Press and drag out - verify state reset
5. Console logs - check event triggers

Component files:
- BorderlessButtonV2_2.tsx (fixed version)

Navigation: Button 22, lime-500 to-lime-600`}
              </pre>
            </div>
            
            {/* 元数据 */}
            <div className="text-xs text-slate-400 pt-4 border-t border-slate-700 space-y-1">
              <p>生成日期: 2025-11-02</p>
              <p>Prompt文件: prompt-02.22-button-press-state-fix-v2.2.md</p>
              <p>探索方向: 修复v2.1按钮缺少点击态的问题</p>
              <p>技术来源: v2.1 + 完整点击态实现</p>
              <p>核心修复: isPressed state + onMouseDown/Up + brightness(1.15)</p>
              <p>新组件: BorderlessButtonV2_2（修复点击态）</p>
              <p>特色: 完整的点击反馈，200ms快速响应</p>
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
        <h2 className="text-3xl text-white mb-1">{title}</h2>
        <p className="text-slate-400">{subtitle}</p>
      </div>
      {children}
    </motion.section>
  );
}
