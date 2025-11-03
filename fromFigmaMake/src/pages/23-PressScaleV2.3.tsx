import { motion } from "motion/react";
import { BorderlessButtonV2_3 } from "../components/borderless/BorderlessButtonV2_3";
import { BorderlessCardV2_3 } from "../components/borderless/BorderlessCardV2_3";
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

interface PressScaleV2_3Props {
  onBack?: () => void;
}

export default function PressScaleV2_3({ onBack }: PressScaleV2_3Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900/30 py-12 px-8">
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
                <h1 className="text-5xl text-white">Press Scale Test v2.3</h1>
              </div>
              <p className="text-xl text-slate-300">
                点击态测试：按钮 brightness 1.5 + scale 0.96，卡片 brightness 1.15 + scale 0.96
              </p>
              <p className="text-sm text-slate-400 mt-2">
                Testing press state with enhanced brightness and scale effects
              </p>
              
              {/* Feature badges */}
              <div className="mt-4 flex gap-3 flex-wrap text-sm">
                <span className="px-3 py-1 bg-emerald-900/50 text-emerald-300 rounded-full font-medium border border-emerald-700">
                  Button: brightness 1.5
                </span>
                <span className="px-3 py-1 bg-teal-900/50 text-teal-300 rounded-full font-medium border border-teal-700">
                  Button: scale 0.96
                </span>
                <span className="px-3 py-1 bg-cyan-900/50 text-cyan-300 rounded-full font-medium border border-cyan-700">
                  Card: brightness 1.15
                </span>
                <span className="px-3 py-1 bg-lime-900/50 text-lime-300 rounded-full font-medium border border-lime-700">
                  Card: scale 0.96
                </span>
              </div>
            </div>
            {onBack && (
              <motion.button
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white flex items-center gap-2"
                style={{
                  boxShadow: '0 0 20px rgba(16,185,129,0.3), 0 0 40px rgba(16,185,129,0.15)'
                }}
                whileHover={{
                  boxShadow: '0 0 30px rgba(16,185,129,0.4), 0 0 60px rgba(16,185,129,0.2)',
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

        {/* Section 1: Buttons with brightness 1.5 + scale 0.96 */}
        <Section title="🔘 Buttons" subtitle="brightness 1.5 + scale 0.96">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 justify-items-center">
            
            <div className="text-center">
              <BorderlessButtonV2_3 
                icon={Upload} 
                color={{ r: 6, g: 182, b: 212 }} 
                size="sm"
                onClick={() => console.log('Upload (sm) clicked!')}
              />
              <p className="text-xs text-slate-400 mt-2">sm · 40px</p>
            </div>
            
            <div className="text-center">
              <BorderlessButtonV2_3 
                icon={Download} 
                color={{ r: 34, g: 197, b: 94 }} 
                size="sm"
                onClick={() => console.log('Download (sm) clicked!')}
              />
              <p className="text-xs text-slate-400 mt-2">sm · 40px</p>
            </div>
            
            <div className="text-center">
              <BorderlessButtonV2_3 
                icon={Trash2} 
                color={{ r: 239, g: 68, b: 68 }} 
                size="sm"
                onClick={() => console.log('Delete (sm) clicked!')}
              />
              <p className="text-xs text-slate-400 mt-2">sm · 40px</p>
            </div>
            
            <div className="text-center">
              <BorderlessButtonV2_3 
                icon={Search} 
                color={{ r: 6, g: 182, b: 212 }} 
                size="md"
                onClick={() => console.log('Search (md) clicked!')}
              />
              <p className="text-xs text-slate-400 mt-2">md · 56px</p>
            </div>
            
            <div className="text-center">
              <BorderlessButtonV2_3 
                icon={Check} 
                color={{ r: 34, g: 197, b: 94 }} 
                size="md"
                onClick={() => console.log('Check (md) clicked!')}
              />
              <p className="text-xs text-slate-400 mt-2">md · 56px</p>
            </div>
            
            <div className="text-center">
              <BorderlessButtonV2_3 
                icon={X} 
                color={{ r: 239, g: 68, b: 68 }} 
                size="md"
                onClick={() => console.log('Close (md) clicked!')}
              />
              <p className="text-xs text-slate-400 mt-2">md · 56px</p>
            </div>
            
            <div className="text-center">
              <BorderlessButtonV2_3 
                icon={Star} 
                color={{ r: 167, g: 139, b: 250 }} 
                size="lg"
                onClick={() => console.log('Star (lg) clicked!')}
              />
              <p className="text-xs text-slate-400 mt-2">lg · 72px</p>
            </div>
            
            <div className="text-center">
              <BorderlessButtonV2_3 
                icon={Heart} 
                color={{ r: 244, g: 114, b: 182 }} 
                size="lg"
                onClick={() => console.log('Heart (lg) clicked!')}
              />
              <p className="text-xs text-slate-400 mt-2">lg · 72px</p>
            </div>
            
            <div className="text-center">
              <BorderlessButtonV2_3 
                icon={Zap} 
                color={{ r: 251, g: 146, b: 60 }} 
                size="lg"
                onClick={() => console.log('Zap (lg) clicked!')}
              />
              <p className="text-xs text-slate-400 mt-2">lg · 72px</p>
            </div>
            
            <div className="text-center">
              <BorderlessButtonV2_3 
                icon={Eye} 
                color={{ r: 6, g: 182, b: 212 }} 
                size="md"
                onClick={() => console.log('View clicked!')}
              />
              <p className="text-xs text-slate-400 mt-2">查看</p>
            </div>
            
            <div className="text-center">
              <BorderlessButtonV2_3 
                icon={Share2} 
                color={{ r: 167, g: 139, b: 250 }} 
                size="md"
                onClick={() => console.log('Share clicked!')}
              />
              <p className="text-xs text-slate-400 mt-2">分享</p>
            </div>
            
            <div className="text-center">
              <BorderlessButtonV2_3 
                icon={Settings} 
                color={{ r: 100, g: 116, b: 139 }} 
                size="md"
                onClick={() => console.log('Settings clicked!')}
              />
              <p className="text-xs text-slate-400 mt-2">设置</p>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-xl border-2 border-emerald-500">
            <div className="flex items-start gap-3">
              <span className="text-3xl">⚡</span>
              <div>
                <p className="text-emerald-300 mb-2">
                  <strong className="text-white">点击任意按钮测试效果：</strong>
                </p>
                <ul className="text-sm text-emerald-200 space-y-1">
                  <li>• <strong>brightness 1.5</strong> - 变亮50%（比v2.2的15%更明显）</li>
                  <li>• <strong>scale 0.96</strong> - 缩小4%（新增物理感）</li>
                  <li>• <strong>CodePen发光边缘</strong> - 同步变亮和缩放</li>
                  <li>• <strong>200ms动画</strong> - 快速响应，可打断</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Section 2: Cards with brightness 1.15 + scale 0.96 */}
        <Section title="📦 Cards" subtitle="brightness 1.15 + scale 0.96">
          <div className="grid md:grid-cols-3 gap-8">
            
            <BorderlessCardV2_3
              title="项目.zip"
              subtitle="245 个文件"
              icon={FileArchive}
              iconColor={{ r: 167, g: 139, b: 250 }}
              onClick={() => console.log('项目.zip clicked!')}
            />
            
            <BorderlessCardV2_3
              title="照片.zip"
              subtitle="512 个文件"
              icon={ImageIcon}
              iconColor={{ r: 244, g: 114, b: 182 }}
              onClick={() => console.log('照片.zip clicked!')}
            />
            
            <BorderlessCardV2_3
              title="备份.rar"
              subtitle="128 个文件"
              icon={Archive}
              iconColor={{ r: 251, g: 146, b: 60 }}
              onClick={() => console.log('备份.rar clicked!')}
            />
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl border-2 border-purple-500">
            <div className="flex items-start gap-3">
              <span className="text-3xl">💎</span>
              <div>
                <p className="text-purple-300 mb-2">
                  <strong className="text-white">点击任意卡片测试效果：</strong>
                </p>
                <ul className="text-sm text-purple-200 space-y-1">
                  <li>• <strong>brightness 1.15</strong> - 保持原值（卡片大，15%已够）</li>
                  <li>• <strong>scale 0.96</strong> - 新增缩小4%</li>
                  <li>• <strong>尺寸320×240px</strong> - 测试大组件的scale效果</li>
                  <li>• <strong>对比观察</strong> - 大卡片的缩放是否比小按钮更明显</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Section 3: Comparison */}
        <Section title="📊 点击态参数对比" subtitle="v2.2 vs v2.3">
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Button params */}
            <div className="p-6 bg-gradient-to-br from-cyan-900/40 to-blue-900/40 rounded-xl border-2 border-cyan-500">
              <h4 className="text-white mb-4 text-lg flex items-center gap-2">
                <span className="text-xl">🔘</span>
                <span>按钮点击态（v2.3）</span>
              </h4>
              <div className="space-y-3">
                <div className="p-4 bg-slate-900/60 rounded-lg">
                  <p className="text-cyan-400 font-medium mb-2">brightness</p>
                  <div className="space-y-1 text-sm">
                    <p className="text-slate-300">
                      v2.2: <code className="text-red-400">1.15</code> (变亮15%) → 不够明显 ❌
                    </p>
                    <p className="text-cyan-300 font-medium">
                      v2.3: <code className="text-emerald-400">1.5</code> (变亮50%) → 明显 ✨
                    </p>
                  </div>
                </div>
                
                <div className="p-4 bg-slate-900/60 rounded-lg">
                  <p className="text-cyan-400 font-medium mb-2">scale</p>
                  <div className="space-y-1 text-sm">
                    <p className="text-slate-300">
                      v2.2: <code className="text-red-400">无</code> → 缺少物理感 ❌
                    </p>
                    <p className="text-cyan-300 font-medium">
                      v2.3: <code className="text-emerald-400">0.96</code> (缩小4%) → 有按下感 ✨
                    </p>
                  </div>
                </div>
                
                <div className="p-4 bg-cyan-900/50 rounded-lg border border-cyan-600">
                  <pre className="text-xs font-mono text-cyan-200">
{`animate={{
  filter: 'brightness(1.5)',
  scale: 0.96,
}}
transition={{
  duration: 0.2,
  ease: 'easeOut',
}}`}
                  </pre>
                </div>
              </div>
            </div>
            
            {/* Card params */}
            <div className="p-6 bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-xl border-2 border-purple-500">
              <h4 className="text-white mb-4 text-lg flex items-center gap-2">
                <span className="text-xl">📦</span>
                <span>卡片点击态（v2.3）</span>
              </h4>
              <div className="space-y-3">
                <div className="p-4 bg-slate-900/60 rounded-lg">
                  <p className="text-purple-400 font-medium mb-2">brightness</p>
                  <div className="space-y-1 text-sm">
                    <p className="text-slate-300">
                      v2.0: <code className="text-green-400">1.15</code> (变亮15%) → 已够 ✅
                    </p>
                    <p className="text-purple-300 font-medium">
                      v2.3: <code className="text-green-400">1.15</code> (保持不变)
                    </p>
                  </div>
                </div>
                
                <div className="p-4 bg-slate-900/60 rounded-lg">
                  <p className="text-purple-400 font-medium mb-2">scale</p>
                  <div className="space-y-1 text-sm">
                    <p className="text-slate-300">
                      v2.0: <code className="text-slate-400">无</code>
                    </p>
                    <p className="text-purple-300 font-medium">
                      v2.3: <code className="text-emerald-400">0.96</code> (新增缩小4%) → 测试效果
                    </p>
                  </div>
                </div>
                
                <div className="p-4 bg-purple-900/50 rounded-lg border border-purple-600">
                  <pre className="text-xs font-mono text-purple-200">
{`animate={{
  filter: 'brightness(1.15)',
  scale: 0.96,  // ⭐ 新增
}}
transition={{
  duration: 0.2,
  ease: 'easeOut',
}}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-6 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-xl border-2 border-yellow-500">
            <h4 className="text-yellow-300 mb-4 flex items-center gap-2 text-lg">
              <span className="text-2xl">🎯</span>
              <span>测试重点</span>
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-sm text-yellow-200">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  <span>对比按钮（小）和卡片（大）的scale效果差异</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  <span>观察brightness 1.5 是否比 1.15 更明显</span>
                </li>
              </ul>
              <ul className="space-y-2 text-sm text-yellow-200">
                <li className="flex items-start gap-2">
                  <span className="text-orange-400">•</span>
                  <span>测试scale 0.96配合CodePen发光边缘的视觉效果</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400">•</span>
                  <span>验证哪个组合的点击反馈最好</span>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Section 4: Code Changes */}
        <Section title="💻 代码变化" subtitle="从 v2.2 到 v2.3">
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* v2.2 */}
            <div className="p-6 bg-slate-800 rounded-xl border border-slate-600">
              <h4 className="text-white mb-4 flex items-center gap-2">
                <span className="text-red-400">❌</span>
                <span>v2.2 点击态</span>
              </h4>
              <pre className="text-xs font-mono text-slate-300 bg-slate-900 p-4 rounded-lg overflow-auto">
{`<motion.button
  animate={{
    filter: isPressed 
      ? 'brightness(1.15)' 
      : 'brightness(1.0)',
    // 无 scale
  }}
  transition={{
    duration: 0.2,
    ease: 'easeOut',
  }}
>
  <Icon />
</motion.button>

// 效果：
// - 变亮15%（小按钮不明显）
// - 无缩放（缺少物理感）
// - 只有brightness单一反馈`}
              </pre>
            </div>
            
            {/* v2.3 */}
            <div className="p-6 bg-gradient-to-br from-emerald-900/40 to-cyan-900/40 rounded-xl border-2 border-emerald-500">
              <h4 className="text-white mb-4 flex items-center gap-2">
                <span className="text-emerald-400">✅</span>
                <span>v2.3 点击态（按钮）</span>
              </h4>
              <pre className="text-xs font-mono text-emerald-200 bg-slate-900 p-4 rounded-lg overflow-auto">
{`<motion.button
  animate={{
    filter: isPressed 
      ? 'brightness(1.5)'    // ⭐ 提高到1.5
      : 'brightness(1.0)',
    scale: isPressed 
      ? 0.96                 // ⭐ 新增缩放
      : 1.0,
  }}
  transition={{
    duration: 0.2,
    ease: 'easeOut',
  }}
>
  <Icon />
</motion.button>

// 效果：
// - 变亮50%（更明显 ✨）
// - 缩小4%（物理感 ✨）
// - 双重反馈更清晰`}
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
{`创建 v2.3 - 点击态加scale缩放

文件: src/pages/23-PressScaleV2.3.tsx
组件: 
- BorderlessButtonV2_3.tsx
- BorderlessCardV2_3.tsx

修改点击态效果，添加scale缩放测试。

按钮（BorderlessButtonV2_3）：
- brightness: 1.15 → 1.5（提高到50%）
- 新增 scale: 0.96（缩小4%）
- 更明显的点击反馈

卡片（BorderlessCardV2_3）：
- brightness: 保持 1.15（已够）
- 新增 scale: 0.96
- 测试大组件的scale效果

页面布局：
1. 按钮网格（brightness 1.5 + scale 0.96）
2. 卡片网格（brightness 1.15 + scale 0.96）
3. 参数对比说明
4. 代码变化展示

测试重点：
- 对比小按钮和大卡片的scale差异
- brightness 1.5 vs 1.15 视觉效果
- scale配合CodePen发光边缘
- 验证最佳点击反馈组合

导航: 第23个按钮，emerald-500 to-emerald-600`}
              </pre>
            </div>
            
            {/* 英文版 */}
            <div>
              <h4 className="text-sm text-slate-400 mb-2">Prompt (English Version)</h4>
              <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono">
{`Create v2.3 - Press State Enhanced with Scale

File: src/pages/23-PressScaleV2.3.tsx
Components:
- BorderlessButtonV2_3.tsx
- BorderlessCardV2_3.tsx

Modify press state effects, add scale testing.

Button (BorderlessButtonV2_3):
- brightness: 1.15 → 1.5 (increase to 50%)
- Add scale: 0.96 (4% smaller)
- More obvious press feedback

Card (BorderlessCardV2_3):
- brightness: keep 1.15 (enough)
- Add scale: 0.96
- Test scale effect on large component

Page layout:
1. Button grid (brightness 1.5 + scale 0.96)
2. Card grid (brightness 1.15 + scale 0.96)
3. Parameter comparison
4. Code changes demo

Test focus:
- Compare scale effect: small buttons vs large cards
- brightness 1.5 vs 1.15 visual effect
- scale with CodePen glowing edge
- Verify best press feedback combination

Navigation: Button 23, emerald-500 to-emerald-600`}
              </pre>
            </div>
            
            {/* 元数据 */}
            <div className="text-xs text-slate-400 pt-4 border-t border-slate-700 space-y-1">
              <p>生成日期: 2025-11-02</p>
              <p>Prompt文件: prompt-02.23-press-scale-v2.3.md</p>
              <p>探索方向: 测试点击态scale效果，增强视觉反馈</p>
              <p>技术来源: v2.2按钮 + v2.0卡片 + scale缩放</p>
              <p>核心改进: brightness 1.5（按钮）+ scale 0.96（全部）</p>
              <p>新组件: BorderlessButtonV2_3, BorderlessCardV2_3</p>
              <p>特色: 双重反馈（亮度+缩放），对比测试</p>
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
