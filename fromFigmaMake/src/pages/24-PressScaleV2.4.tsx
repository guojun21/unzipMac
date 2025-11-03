import { motion } from "motion/react";
import { BorderlessButtonV2_4 } from "../components/borderless/BorderlessButtonV2_4";
import { BorderlessCardV2_4 } from "../components/borderless/BorderlessCardV2_4";
import { 
  ArrowLeft,
  Upload,
  Download,
  Search,
  Check,
  Trash2,
  X,
  Star,
  Heart,
  Zap,
  FileArchive,
  Image as ImageIcon,
  Archive,
  Settings,
  Eye,
  Share2,
} from "lucide-react";

interface PressScaleV2_4Props {
  onBack?: () => void;
}

export default function PressScaleV2_4({ onBack }: PressScaleV2_4Props) {
  return (
    // ⭐⭐⭐ Light background (slate-50 → white → emerald-50)
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 py-12 px-8">
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
                <h1 className="text-5xl text-slate-900">Press Scale v2.4</h1>
              </div>
              <p className="text-xl text-slate-700">
                修复：浅色背景 + 按钮背景同步动画
              </p>
              <p className="text-sm text-slate-500 mt-2">
                Fixed: Light background + synced button background animation
              </p>
              
              {/* Feature badges */}
              <div className="mt-4 flex gap-3 flex-wrap text-sm">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium border border-green-300">
                  ✅ 按钮背景同步
                </span>
                <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full font-medium border border-cyan-300">
                  ✅ 浅色背景
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium border border-purple-300">
                  ✅ CodePen正常显示
                </span>
              </div>
            </div>
            {onBack && (
              <motion.button
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white flex items-center gap-2"
                style={{
                  boxShadow: '0 0 20px rgba(20,184,166,0.3), 0 0 40px rgba(20,184,166,0.15)'
                }}
                whileHover={{
                  boxShadow: '0 0 30px rgba(20,184,166,0.4), 0 0 60px rgba(20,184,166,0.2)',
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
        <Section title="✅ v2.4 修复内容" subtitle="3个关键问题修复">
          <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-300">
            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Fix 1 */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🔧</span>
                  <h3 className="text-lg text-slate-900">修复1: 背景同步</h3>
                </div>
                <div className="p-4 bg-white rounded-lg border border-green-200">
                  <p className="text-sm text-slate-700 mb-2">
                    <strong className="text-green-700">问题：</strong>v2.3 按钮背景层不动
                  </p>
                  <p className="text-xs text-slate-600 mb-3">
                    只有图标变亮缩放，背景色块不变
                  </p>
                  <p className="text-sm text-slate-700 mb-2">
                    <strong className="text-green-700">解决：</strong>背景层添加动画
                  </p>
                  <code className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded block">
                    brightness: 1.5<br/>
                    scale: 0.96
                  </code>
                </div>
              </div>
              
              {/* Fix 2 */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🎨</span>
                  <h3 className="text-lg text-slate-900">修复2: 浅色背景</h3>
                </div>
                <div className="p-4 bg-white rounded-lg border border-cyan-200">
                  <p className="text-sm text-slate-700 mb-2">
                    <strong className="text-cyan-700">问题：</strong>深色背景异常
                  </p>
                  <p className="text-xs text-slate-600 mb-3">
                    CodePen效果在深色下显示不正常
                  </p>
                  <p className="text-sm text-slate-700 mb-2">
                    <strong className="text-cyan-700">解决：</strong>改为浅色背景
                  </p>
                  <code className="text-xs bg-cyan-100 text-cyan-800 px-2 py-1 rounded block">
                    slate-50 → white<br/>
                    → emerald-50
                  </code>
                </div>
              </div>
              
              {/* Fix 3 */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">✨</span>
                  <h3 className="text-lg text-slate-900">修复3: 发光正常</h3>
                </div>
                <div className="p-4 bg-white rounded-lg border border-purple-200">
                  <p className="text-sm text-slate-700 mb-2">
                    <strong className="text-purple-700">问题：</strong>mix-blend异常
                  </p>
                  <p className="text-xs text-slate-600 mb-3">
                    发光边缘在深色背景下混合错误
                  </p>
                  <p className="text-sm text-slate-700 mb-2">
                    <strong className="text-purple-700">解决：</strong>自动修复
                  </p>
                  <code className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded block">
                    浅色背景 →<br/>
                    CodePen正常✓
                  </code>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Section 2: Buttons with synced background */}
        <Section title="🔘 Buttons · 背景同步动画" subtitle="点击测试整体变化">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 justify-items-center">
            
            <div className="text-center">
              <BorderlessButtonV2_4 
                icon={Upload} 
                color={{ r: 6, g: 182, b: 212 }} 
                size="sm"
                onClick={() => console.log('Upload (sm) clicked!')}
              />
              <p className="text-xs text-slate-600 mt-2">sm · 40px</p>
            </div>
            
            <div className="text-center">
              <BorderlessButtonV2_4 
                icon={Download} 
                color={{ r: 34, g: 197, b: 94 }} 
                size="sm"
                onClick={() => console.log('Download (sm) clicked!')}
              />
              <p className="text-xs text-slate-600 mt-2">sm · 40px</p>
            </div>
            
            <div className="text-center">
              <BorderlessButtonV2_4 
                icon={Trash2} 
                color={{ r: 239, g: 68, b: 68 }} 
                size="sm"
                onClick={() => console.log('Delete (sm) clicked!')}
              />
              <p className="text-xs text-slate-600 mt-2">sm · 40px</p>
            </div>
            
            <div className="text-center">
              <BorderlessButtonV2_4 
                icon={Search} 
                color={{ r: 6, g: 182, b: 212 }} 
                size="md"
                onClick={() => console.log('Search (md) clicked!')}
              />
              <p className="text-xs text-slate-600 mt-2">md · 56px</p>
            </div>
            
            <div className="text-center">
              <BorderlessButtonV2_4 
                icon={Check} 
                color={{ r: 34, g: 197, b: 94 }} 
                size="md"
                onClick={() => console.log('Check (md) clicked!')}
              />
              <p className="text-xs text-slate-600 mt-2">md · 56px</p>
            </div>
            
            <div className="text-center">
              <BorderlessButtonV2_4 
                icon={X} 
                color={{ r: 239, g: 68, b: 68 }} 
                size="md"
                onClick={() => console.log('Close (md) clicked!')}
              />
              <p className="text-xs text-slate-600 mt-2">md · 56px</p>
            </div>
            
            <div className="text-center">
              <BorderlessButtonV2_4 
                icon={Star} 
                color={{ r: 167, g: 139, b: 250 }} 
                size="lg"
                onClick={() => console.log('Star (lg) clicked!')}
              />
              <p className="text-xs text-slate-600 mt-2">lg · 72px</p>
            </div>
            
            <div className="text-center">
              <BorderlessButtonV2_4 
                icon={Heart} 
                color={{ r: 244, g: 114, b: 182 }} 
                size="lg"
                onClick={() => console.log('Heart (lg) clicked!')}
              />
              <p className="text-xs text-slate-600 mt-2">lg · 72px</p>
            </div>
            
            <div className="text-center">
              <BorderlessButtonV2_4 
                icon={Zap} 
                color={{ r: 251, g: 146, b: 60 }} 
                size="lg"
                onClick={() => console.log('Zap (lg) clicked!')}
              />
              <p className="text-xs text-slate-600 mt-2">lg · 72px</p>
            </div>
            
            <div className="text-center">
              <BorderlessButtonV2_4 
                icon={Eye} 
                color={{ r: 6, g: 182, b: 212 }} 
                size="md"
                onClick={() => console.log('View clicked!')}
              />
              <p className="text-xs text-slate-600 mt-2">查看</p>
            </div>
            
            <div className="text-center">
              <BorderlessButtonV2_4 
                icon={Share2} 
                color={{ r: 167, g: 139, b: 250 }} 
                size="md"
                onClick={() => console.log('Share clicked!')}
              />
              <p className="text-xs text-slate-600 mt-2">分享</p>
            </div>
            
            <div className="text-center">
              <BorderlessButtonV2_4 
                icon={Settings} 
                color={{ r: 100, g: 116, b: 139 }} 
                size="md"
                onClick={() => console.log('Settings clicked!')}
              />
              <p className="text-xs text-slate-600 mt-2">设置</p>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border-2 border-emerald-300">
            <div className="flex items-start gap-3">
              <span className="text-3xl">⚡</span>
              <div>
                <p className="text-slate-800 mb-2">
                  <strong className="text-emerald-800">点击任意按钮测试效果：</strong>
                </p>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• <strong>背景和图标同步</strong> - 背景色块和图标一起变亮+缩放</li>
                  <li>• <strong>brightness 1.5</strong> - 整体变亮50%（包括背景层）</li>
                  <li>• <strong>scale 0.96</strong> - 整体缩小4%（背景层同步）</li>
                  <li>• <strong>200ms快速响应</strong> - 两层动画完全同步</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Section 3: Cards on light background */}
        <Section title="📦 Cards · 浅色背景下发光" subtitle="CodePen效果正常显示">
          <div className="grid md:grid-cols-3 gap-8">
            
            <BorderlessCardV2_4
              title="项目.zip"
              subtitle="245 个文件"
              icon={FileArchive}
              iconColor={{ r: 167, g: 139, b: 250 }}
              onClick={() => console.log('项目.zip clicked!')}
            />
            
            <BorderlessCardV2_4
              title="照片.zip"
              subtitle="512 个文件"
              icon={ImageIcon}
              iconColor={{ r: 244, g: 114, b: 182 }}
              onClick={() => console.log('照片.zip clicked!')}
            />
            
            <BorderlessCardV2_4
              title="备份.rar"
              subtitle="128 个文件"
              icon={Archive}
              iconColor={{ r: 251, g: 146, b: 60 }}
              onClick={() => console.log('备份.rar clicked!')}
            />
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-300">
            <div className="flex items-start gap-3">
              <span className="text-3xl">💎</span>
              <div>
                <p className="text-slate-800 mb-2">
                  <strong className="text-purple-800">浅色背景下CodePen发光边缘显示正常：</strong>
                </p>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• <strong>mix-blend-mode正常</strong> - 发光边缘混合效果正确</li>
                  <li>• <strong>box-shadow柔和</strong> - 青色光晕在浅色背景下柔和</li>
                  <li>• <strong>Mesh gradient可见</strong> - 彩色渐变在白色背景上清晰</li>
                  <li>• <strong>点击效果</strong> - brightness 1.15 + scale 0.96</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Section 4: Code Changes */}
        <Section title="💻 代码修复" subtitle="v2.3 → v2.4">
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Before: v2.3 */}
            <div className="p-6 bg-white rounded-xl border-2 border-red-300">
              <h4 className="text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-red-500">❌</span>
                <span>v2.3 背景层（不同步）</span>
              </h4>
              <pre className="text-xs font-mono text-slate-800 bg-slate-50 p-4 rounded-lg overflow-auto border border-slate-200">
{`{/* Layer 3: 背景层 */}
<motion.div
  animate={{
    // 只有hover动画
    filter: isHovered 
      ? 'blur(0px)' 
      : 'blur(5px)',
    boxShadow: isHovered 
      ? '大' 
      : '小',
    // ❌ 没有 brightness
    // ❌ 没有 scale
  }}
  transition={{ 
    duration: 1,
    ease: [0.34, 1.56, 0.64, 1]
  }}
/>

// 结果：
// - 点击时背景不变
// - 只有图标变亮缩放
// - 视觉效果不统一`}
              </pre>
            </div>
            
            {/* After: v2.4 */}
            <div className="p-6 bg-white rounded-xl border-2 border-green-300">
              <h4 className="text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-green-500">✅</span>
                <span>v2.4 背景层（同步）</span>
              </h4>
              <pre className="text-xs font-mono text-slate-800 bg-slate-50 p-4 rounded-lg overflow-auto border border-slate-200">
{`{/* Layer 3: 背景层 */}
<motion.div
  animate={{
    // Hover动画（慢，1s）
    filter: isHovered 
      ? 'blur(0px)' 
      : 'blur(5px)',
    boxShadow: isHovered 
      ? '大' 
      : '小',
    
    // ✅ Press动画（快，0.2s）
    brightness: isPressed 
      ? 1.5 
      : 1.0,
    scale: isPressed 
      ? 0.96 
      : 1.0,
  }}
  transition={{
    filter: { duration: 1, ... },
    boxShadow: { duration: 1, ... },
    brightness: { duration: 0.2, ... },
    scale: { duration: 0.2, ... },
  }}
/>

// 结果：
// - 背景和图标同步变化 ✨
// - 整体统一的点击反馈
// - 分别设置动画时长`}
              </pre>
            </div>
          </div>
          
          {/* Background change */}
          <div className="mt-6 p-6 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border-2 border-cyan-300">
            <h4 className="text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">🎨</span>
              <span>背景色修复</span>
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border border-red-200">
                <p className="text-sm text-red-700 font-medium mb-2">❌ v2.3 深色背景</p>
                <code className="text-xs bg-slate-800 text-slate-200 px-3 py-2 rounded block">
                  from-slate-900<br/>
                  via-slate-800<br/>
                  to-emerald-900/30
                </code>
                <p className="text-xs text-slate-600 mt-2">
                  CodePen效果显示异常
                </p>
              </div>
              
              <div className="p-4 bg-white rounded-lg border border-green-200">
                <p className="text-sm text-green-700 font-medium mb-2">✅ v2.4 浅色背景</p>
                <code className="text-xs bg-slate-100 text-slate-800 px-3 py-2 rounded block">
                  from-slate-50<br/>
                  via-white<br/>
                  to-emerald-50/30
                </code>
                <p className="text-xs text-slate-600 mt-2">
                  CodePen效果正常显示 ✨
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Section 5: Test Guide */}
        <Section title="🧪 测试指南" subtitle="验证修复效果">
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Button tests */}
            <div className="p-6 bg-white rounded-xl border-2 border-emerald-300">
              <h4 className="text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-xl">🔘</span>
                <span>按钮测试</span>
              </h4>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg">
                  <span className="text-emerald-600">1</span>
                  <div>
                    <strong className="text-slate-900">点击任意按钮</strong>
                    <p className="text-xs text-slate-600 mt-1">
                      观察背景色块和图标是否同时变亮+缩放
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3 p-3 bg-teal-50 rounded-lg">
                  <span className="text-teal-600">2</span>
                  <div>
                    <strong className="text-slate-900">对比v2.3</strong>
                    <p className="text-xs text-slate-600 mt-1">
                      v2.3只有图标变化，v2.4整体变化
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3 p-3 bg-cyan-50 rounded-lg">
                  <span className="text-cyan-600">3</span>
                  <div>
                    <strong className="text-slate-900">观察CodePen边缘</strong>
                    <p className="text-xs text-slate-600 mt-1">
                      浅色背景下发光边缘显示正常
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Card tests */}
            <div className="p-6 bg-white rounded-xl border-2 border-purple-300">
              <h4 className="text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-xl">📦</span>
                <span>卡片测试</span>
              </h4>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                  <span className="text-purple-600">1</span>
                  <div>
                    <strong className="text-slate-900">Hover移动鼠标</strong>
                    <p className="text-xs text-slate-600 mt-1">
                      CodePen发光边缘跟随鼠标移动
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3 p-3 bg-pink-50 rounded-lg">
                  <span className="text-pink-600">2</span>
                  <div>
                    <strong className="text-slate-900">观察Mesh渐变</strong>
                    <p className="text-xs text-slate-600 mt-1">
                      浅色背景下彩色渐变清晰可见
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3 p-3 bg-fuchsia-50 rounded-lg">
                  <span className="text-fuchsia-600">3</span>
                  <div>
                    <strong className="text-slate-900">点击测试缩放</strong>
                    <p className="text-xs text-slate-600 mt-1">
                      大卡片的scale效果更明显
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Prompt记录 */}
        <details className="mt-16 p-6 rounded-xl bg-white border-2 border-slate-300">
          <summary className="cursor-pointer text-lg font-medium mb-4 text-slate-900">
            📝 查看生成此页面的 Prompt
          </summary>
          
          <div className="space-y-6">
            {/* 中文版 */}
            <div>
              <h4 className="text-sm text-slate-600 mb-2">Prompt (中文版)</h4>
              <pre className="text-xs bg-slate-50 text-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono border border-slate-200">
{`创建 v2.4 - 浅色背景 + 按钮背景同步动画

文件: src/pages/24-PressScaleV2.4.tsx
组件:
- BorderlessButtonV2_4.tsx
- BorderlessCardV2_4.tsx

修复3个问题：

1. 按钮背景层同步点击态动画
   问题：v2.3背景层不动，只有图标变化
   解决：背景层添加brightness和scale动画
   共享isPressed state，分别设置transition

2. 页面背景改为浅色
   问题：深色背景CodePen效果异常
   解决：from-slate-900 → from-slate-50
        via-slate-800 → via-white
        to-emerald-900/30 → to-emerald-50/30

3. CodePen效果正常显示
   问题：mix-blend-mode在深色背景异常
   解决：浅色背景自动修复

核心修复：
- 背景层animate添加brightness和scale
- 分别设置hover和press的transition
- 页面背景改为浅灰→白色→淡绿渐变

测试重点：
- 点击按钮观察背景色块同步变化
- 对比v2.3只有图标变化
- CodePen发光边缘在浅色背景正常

导航: 第24个按钮，teal-500 to-teal-600`}
              </pre>
            </div>
            
            {/* 英文版 */}
            <div>
              <h4 className="text-sm text-slate-600 mb-2">Prompt (English Version)</h4>
              <pre className="text-xs bg-slate-50 text-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono border border-slate-200">
{`Create v2.4 - Light Background + Synced Button Animation

File: src/pages/24-PressScaleV2.4.tsx
Components:
- BorderlessButtonV2_4.tsx
- BorderlessCardV2_4.tsx

Fix 3 issues:

1. Button background layer syncs press state
   Issue: v2.3 background doesn't animate
   Fix: Add brightness + scale to background layer
   Share isPressed state, separate transitions

2. Page background to light
   Issue: Dark background CodePen abnormal
   Fix: slate-900 → slate-50
        slate-800 → white
        emerald-900/30 → emerald-50/30

3. CodePen effect displays correctly
   Issue: mix-blend-mode wrong on dark
   Fix: Light background auto-fixes

Core fixes:
- Background layer animate + brightness + scale
- Separate transitions for hover/press
- Page background: light gray → white → light green

Test focus:
- Click buttons observe background sync
- Compare v2.3 icon-only change
- CodePen glow normal on light background

Navigation: Button 24, teal-500 to-teal-600`}
              </pre>
            </div>
            
            {/* 元数据 */}
            <div className="text-xs text-slate-600 pt-4 border-t border-slate-300 space-y-1">
              <p>生成日期: 2025-11-02</p>
              <p>Prompt文件: prompt-02.24-light-background-v2.4.md</p>
              <p>探索方向: 修复按钮背景同步和浅色背景显示</p>
              <p>技术来源: v2.3 + 背景层动画同步 + 浅色背景</p>
              <p>核心修复: 背景层brightness+scale / 浅色背景 / CodePen正常</p>
              <p>新组件: BorderlessButtonV2_4, BorderlessCardV2_4</p>
              <p>特色: 3个关键问题完整修复，整体同步动画</p>
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
        <h2 className="text-3xl text-slate-900 mb-1">{title}</h2>
        <p className="text-slate-600">{subtitle}</p>
      </div>
      {children}
    </motion.section>
  );
}
