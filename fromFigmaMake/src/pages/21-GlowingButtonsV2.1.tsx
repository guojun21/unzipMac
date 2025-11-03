import { motion } from "motion/react";
import { BorderlessButtonV2 } from "../components/borderless/BorderlessButtonV2";
import { 
  ArrowLeft,
  Upload,
  Download,
  Search,
  Check,
  Trash2,
  X,
  Settings,
  MoreHorizontal,
  Star,
  AlertTriangle,
  Heart,
  Eye,
  Share2,
  FolderPlus,
  Zap,
  Save,
  Filter,
  SortAsc,
} from "lucide-react";

interface GlowingButtonsV2_1Props {
  onBack?: () => void;
}

export default function GlowingButtonsV2_1({ onBack }: GlowingButtonsV2_1Props) {
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
                <h1 className="text-5xl text-white">Borderless Buttons v2.1</h1>
              </div>
              <p className="text-xl text-slate-300">
                发光边缘按钮 · 3种尺寸 · CodePen效果
              </p>
              <p className="text-sm text-slate-400 mt-2">
                Glowing Edge Buttons · 3 Sizes · CodePen Effect
              </p>
              
              {/* Feature badges */}
              <div className="mt-4 flex gap-3 flex-wrap text-sm">
                <span className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full font-medium border border-purple-700">
                  ✓ Mesh Gradient Border
                </span>
                <span className="px-3 py-1 bg-orange-900/50 text-orange-300 rounded-full font-medium border border-orange-700">
                  ✓ 12层 Box-Shadow
                </span>
                <span className="px-3 py-1 bg-cyan-900/50 text-cyan-300 rounded-full font-medium border border-cyan-700">
                  ✓ 鼠标跟随
                </span>
                <span className="px-3 py-1 bg-pink-900/50 text-pink-300 rounded-full font-medium border border-pink-700">
                  ✓ 点击态 brightness(1.15)
                </span>
              </div>
            </div>
            {onBack && (
              <motion.button
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 text-white flex items-center gap-2"
                style={{
                  boxShadow: '0 0 20px rgba(217,70,239,0.3), 0 0 40px rgba(217,70,239,0.15)'
                }}
                whileHover={{
                  boxShadow: '0 0 30px rgba(217,70,239,0.4), 0 0 60px rgba(217,70,239,0.2)',
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

        {/* Section 1: Size Examples */}
        <Section title="📏 尺寸示例" subtitle="全部带 CodePen 发光边缘">
          <div className="flex gap-12 items-end justify-center py-8">
            
            <div className="text-center">
              <BorderlessButtonV2 
                icon={Upload} 
                color={{ r: 6, g: 182, b: 212 }} 
                size="sm"
              />
              <p className="text-white text-sm mt-4">sm</p>
              <p className="text-slate-400 text-xs">40×40px</p>
              <p className="text-slate-500 text-xs mt-1">icon: 20px</p>
              <p className="text-slate-500 text-xs">inset: -20px</p>
            </div>
            
            <div className="text-center">
              <BorderlessButtonV2 
                icon={Upload} 
                color={{ r: 6, g: 182, b: 212 }} 
                size="md"
              />
              <p className="text-white text-sm mt-4">md (默认)</p>
              <p className="text-slate-400 text-xs">56×56px</p>
              <p className="text-slate-500 text-xs mt-1">icon: 28px</p>
              <p className="text-slate-500 text-xs">inset: -28px</p>
            </div>
            
            <div className="text-center">
              <BorderlessButtonV2 
                icon={Upload} 
                color={{ r: 6, g: 182, b: 212 }} 
                size="lg"
              />
              <p className="text-white text-sm mt-4">lg</p>
              <p className="text-slate-400 text-xs">72×72px</p>
              <p className="text-slate-500 text-xs mt-1">icon: 36px</p>
              <p className="text-slate-500 text-xs">inset: -36px</p>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-500">
            <h3 className="text-lg text-white mb-3 flex items-center gap-2">
              <span className="text-2xl">✨</span>
              <span>尺寸自适应技术</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-300">
              <div className="p-3 bg-slate-900/50 rounded-lg">
                <p className="text-cyan-400 font-medium mb-2">sm - 小按钮</p>
                <p className="text-xs">box: 40px, icon: 20px</p>
                <p className="text-xs">radius: 10px</p>
                <p className="text-xs text-orange-400">glow inset: -20px</p>
              </div>
              <div className="p-3 bg-slate-900/50 rounded-lg">
                <p className="text-purple-400 font-medium mb-2">md - 中按钮</p>
                <p className="text-xs">box: 56px, icon: 28px</p>
                <p className="text-xs">radius: 14px</p>
                <p className="text-xs text-orange-400">glow inset: -28px</p>
              </div>
              <div className="p-3 bg-slate-900/50 rounded-lg">
                <p className="text-pink-400 font-medium mb-2">lg - 大按钮</p>
                <p className="text-xs">box: 72px, icon: 36px</p>
                <p className="text-xs">radius: 18px</p>
                <p className="text-xs text-orange-400">glow inset: -36px</p>
              </div>
            </div>
          </div>
        </Section>

        {/* Section 2: Color Semantics Grid */}
        <Section title="🎨 颜色语义" subtitle="全部带发光边缘 · Hover移动鼠标观察">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-6 justify-items-center">
            
            {/* Primary - Cyan */}
            <div className="text-center">
              <BorderlessButtonV2 icon={Upload} color={{ r: 6, g: 182, b: 212 }} />
              <p className="text-xs text-slate-400 mt-2">上传</p>
            </div>
            <div className="text-center">
              <BorderlessButtonV2 icon={Download} color={{ r: 6, g: 182, b: 212 }} />
              <p className="text-xs text-slate-400 mt-2">下载</p>
            </div>
            <div className="text-center">
              <BorderlessButtonV2 icon={Search} color={{ r: 6, g: 182, b: 212 }} />
              <p className="text-xs text-slate-400 mt-2">搜索</p>
            </div>
            <div className="text-center">
              <BorderlessButtonV2 icon={Eye} color={{ r: 6, g: 182, b: 212 }} />
              <p className="text-xs text-slate-400 mt-2">查看</p>
            </div>
            
            {/* Success - Green */}
            <div className="text-center">
              <BorderlessButtonV2 icon={Check} color={{ r: 34, g: 197, b: 94 }} />
              <p className="text-xs text-slate-400 mt-2">确认</p>
            </div>
            <div className="text-center">
              <BorderlessButtonV2 icon={Save} color={{ r: 34, g: 197, b: 94 }} />
              <p className="text-xs text-slate-400 mt-2">保存</p>
            </div>
            <div className="text-center">
              <BorderlessButtonV2 icon={FolderPlus} color={{ r: 34, g: 197, b: 94 }} />
              <p className="text-xs text-slate-400 mt-2">新建</p>
            </div>
            
            {/* Danger - Red */}
            <div className="text-center">
              <BorderlessButtonV2 icon={Trash2} color={{ r: 239, g: 68, b: 68 }} />
              <p className="text-xs text-slate-400 mt-2">删除</p>
            </div>
            <div className="text-center">
              <BorderlessButtonV2 icon={X} color={{ r: 239, g: 68, b: 68 }} />
              <p className="text-xs text-slate-400 mt-2">关闭</p>
            </div>
            
            {/* Secondary - Gray */}
            <div className="text-center">
              <BorderlessButtonV2 icon={Settings} color={{ r: 100, g: 116, b: 139 }} />
              <p className="text-xs text-slate-400 mt-2">设置</p>
            </div>
            <div className="text-center">
              <BorderlessButtonV2 icon={MoreHorizontal} color={{ r: 100, g: 116, b: 139 }} />
              <p className="text-xs text-slate-400 mt-2">更多</p>
            </div>
            <div className="text-center">
              <BorderlessButtonV2 icon={Filter} color={{ r: 100, g: 116, b: 139 }} />
              <p className="text-xs text-slate-400 mt-2">筛选</p>
            </div>
            
            {/* Other colors */}
            <div className="text-center">
              <BorderlessButtonV2 icon={Star} color={{ r: 167, g: 139, b: 250 }} />
              <p className="text-xs text-slate-400 mt-2">收藏</p>
            </div>
            <div className="text-center">
              <BorderlessButtonV2 icon={AlertTriangle} color={{ r: 251, g: 146, b: 60 }} />
              <p className="text-xs text-slate-400 mt-2">警告</p>
            </div>
            <div className="text-center">
              <BorderlessButtonV2 icon={Heart} color={{ r: 244, g: 114, b: 182 }} />
              <p className="text-xs text-slate-400 mt-2">喜欢</p>
            </div>
            <div className="text-center">
              <BorderlessButtonV2 icon={Share2} color={{ r: 6, g: 182, b: 212 }} />
              <p className="text-xs text-slate-400 mt-2">分享</p>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-slate-800 rounded-xl border border-purple-500">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <p className="text-slate-300 text-sm">
                  <strong className="text-white">使用说明：</strong> Hover到任意按钮，移动鼠标观察 CodePen 彩色发光边缘跟随效果。
                  点击按钮查看 brightness(1.15) 整体变亮效果。
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  每个按钮都有：Mesh Gradient Border（8层radial）+ 12层 Box-Shadow + Conic Mask + 鼠标跟踪
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Section 3: Button Groups */}
        <Section title="🎯 实际应用" subtitle="按钮组和工具栏">
          <div className="space-y-8">
            
            {/* Toolbar */}
            <div className="p-6 bg-slate-800 rounded-xl">
              <h4 className="text-white mb-4 flex items-center gap-2">
                <span>工具栏 - 小尺寸</span>
                <code className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded">size="sm"</code>
              </h4>
              <div className="flex gap-3">
                <BorderlessButtonV2 icon={Search} color={{ r: 6, g: 182, b: 212 }} size="sm" />
                <BorderlessButtonV2 icon={Filter} color={{ r: 6, g: 182, b: 212 }} size="sm" />
                <BorderlessButtonV2 icon={SortAsc} color={{ r: 6, g: 182, b: 212 }} size="sm" />
                <BorderlessButtonV2 icon={MoreHorizontal} color={{ r: 100, g: 116, b: 139 }} size="sm" />
              </div>
            </div>
            
            {/* File actions */}
            <div className="p-6 bg-slate-800 rounded-xl">
              <h4 className="text-white mb-4 flex items-center gap-2">
                <span>文件操作 - 中尺寸</span>
                <code className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded">size="md"</code>
              </h4>
              <div className="flex gap-4">
                <BorderlessButtonV2 icon={Eye} color={{ r: 6, g: 182, b: 212 }} size="md" />
                <BorderlessButtonV2 icon={Download} color={{ r: 34, g: 197, b: 94 }} size="md" />
                <BorderlessButtonV2 icon={Share2} color={{ r: 167, g: 139, b: 250 }} size="md" />
                <BorderlessButtonV2 icon={Trash2} color={{ r: 239, g: 68, b: 68 }} size="md" />
              </div>
            </div>
            
            {/* Primary actions */}
            <div className="p-6 bg-slate-800 rounded-xl">
              <h4 className="text-white mb-4 flex items-center gap-2">
                <span>主要操作 - 大尺寸</span>
                <code className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded">size="lg"</code>
              </h4>
              <div className="flex gap-6">
                <BorderlessButtonV2 
                  icon={Upload} 
                  color={{ r: 6, g: 182, b: 212 }} 
                  size="lg"
                  onClick={() => console.log('Upload clicked!')}
                />
                <BorderlessButtonV2 
                  icon={FolderPlus} 
                  color={{ r: 34, g: 197, b: 94 }} 
                  size="lg"
                  onClick={() => console.log('New folder clicked!')}
                />
                <BorderlessButtonV2 
                  icon={Zap} 
                  color={{ r: 251, g: 146, b: 60 }} 
                  size="lg"
                  onClick={() => console.log('Quick action clicked!')}
                />
              </div>
            </div>
          </div>
        </Section>

        {/* Section 4: Technical Implementation */}
        <Section title="🛠️ 技术实现" subtitle="4层结构 + 尺寸自适应">
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Layer structure */}
            <div className="p-6 bg-slate-800 rounded-xl border border-purple-500">
              <h4 className="text-white mb-4">4层结构（v2.0技术）</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 p-3 bg-slate-900 rounded-lg border-l-4 border-purple-500">
                  <span className="text-purple-400 font-bold">5</span>
                  <div>
                    <p className="text-white font-medium">Mesh Gradient Border</p>
                    <p className="text-slate-400 text-xs">8层 radial + conic mask</p>
                    <code className="text-xs text-purple-400">z-index: 5</code>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-slate-900 rounded-lg border-l-4 border-orange-500">
                  <span className="text-orange-400 font-bold">4</span>
                  <div>
                    <p className="text-white font-medium">Glowing Edge</p>
                    <p className="text-slate-400 text-xs">12层 box-shadow（6 inset + 6 outer）</p>
                    <code className="text-xs text-orange-400">{'inset: -{s.inset}px, z-index: 4'}</code>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-slate-900 rounded-lg border-l-4 border-cyan-500">
                  <span className="text-cyan-400 font-bold">1</span>
                  <div>
                    <p className="text-white font-medium">彩色背景</p>
                    <p className="text-slate-400 text-xs">{'filter: blur(5px) → blur(0)'}</p>
                    <code className="text-xs text-cyan-400">z-index: 1</code>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-slate-900 rounded-lg border-l-4 border-green-500">
                  <span className="text-green-400 font-bold">10</span>
                  <div>
                    <p className="text-white font-medium">白色图标 + 点击态</p>
                    <p className="text-slate-400 text-xs">{'brightness(1.0 → 1.15) on press'}</p>
                    <code className="text-xs text-green-400">z-index: 10</code>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Press state */}
            <div className="p-6 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl border border-pink-500">
              <h4 className="text-white mb-4 flex items-center gap-2">
                <span className="text-xl">⭐</span>
                <span>点击态效果（核心特色）</span>
              </h4>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="p-3 bg-slate-900/50 rounded-lg">
                  <p className="text-pink-400 font-medium mb-2">整体变亮 15%</p>
                  <code className="text-xs font-mono text-pink-300">
                    {'filter: brightness(1.15)'}
                  </code>
                  <p className="text-xs text-slate-400 mt-2">
                    作用在 button 容器上，影响所有下层
                  </p>
                </div>
                
                <div className="p-3 bg-slate-900/50 rounded-lg">
                  <p className="text-purple-400 font-medium mb-2">200ms 快速响应</p>
                  <code className="text-xs font-mono text-purple-300">
                    {'duration: 0.2s, ease: easeOut'}
                  </code>
                  <p className="text-xs text-slate-400 mt-2">
                    可打断，平滑过渡
                  </p>
                </div>
                
                <div className="p-3 bg-slate-900/50 rounded-lg">
                  <p className="text-orange-400 font-medium mb-2">视觉效果</p>
                  <ul className="text-xs text-slate-400 space-y-1">
                    <li>• 彩色背景变亮</li>
                    <li>• CodePen 发光边缘变亮</li>
                    <li>• Mesh gradient 变亮</li>
                    <li>• 整体像"闪光"效果 ⚡</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-6 bg-slate-900 rounded-xl border border-slate-700">
            <h4 className="text-white mb-4">尺寸自适应代码</h4>
            <pre className="text-xs font-mono text-slate-300 overflow-auto">
{`const sizeMap = {
  sm: { box: 40, icon: 20, radius: 10, inset: 20 },
  md: { box: 56, icon: 28, radius: 14, inset: 28 },
  lg: { box: 72, icon: 36, radius: 18, inset: 36 },
};

// Glow layer inset
inset: \`-\${s.inset}px\`  // sm: -20px, md: -28px, lg: -36px`}
            </pre>
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
{`创建 v2.1 - 发光边缘按钮

文件: src/pages/21-GlowingButtonsV2.1.tsx
组件: src/components/borderless/BorderlessButtonV2.tsx

将 v2.0 的 CodePen 发光效果应用到按钮！

核心要求：
1. 支持3种尺寸：sm(40×40), md(56×56), lg(72×72)
2. 每种尺寸都有完整的 CodePen 发光效果
3. 4层结构：
   - Layer 5: Mesh Gradient Border (z-index: 5)
   - Layer 4: Glowing Edge 12层box-shadow (z-index: 4)
   - Layer 1: 彩色背景可模糊 (z-index: 1)
   - Layer 10: 白色图标 + 点击态 (z-index: 10)
4. 尺寸自适应 inset：sm(-20px), md(-28px), lg(-36px)
5. 点击态：brightness(1.15) 整体变亮

完全复制 v2.0 的实现：
- Mesh gradient border（8层radial）
- 12层 box-shadow（6 inset + 6 outer）
- Conic mask 跟随鼠标
- Mix-blend-mode: plus-lighter
- 鼠标跟踪算法

组件文件:
- BorderlessButtonV2.tsx (新建，3尺寸发光按钮)

导航: 第21个按钮，fuchsia-500 to fuchsia-600`}
              </pre>
            </div>
            
            {/* 英文版 */}
            <div>
              <h4 className="text-sm text-slate-400 mb-2">Prompt (English Version)</h4>
              <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono">
{`Create v2.1 - Glowing Edge Buttons

File: src/pages/21-GlowingButtonsV2.1.tsx
Component: src/components/borderless/BorderlessButtonV2.tsx

Apply v2.0 CodePen glowing edge to buttons!

Core requirements:
1. Support 3 sizes: sm(40×40), md(56×56), lg(72×72)
2. Each size has complete CodePen glow effect
3. 4-layer structure:
   - Layer 5: Mesh Gradient Border (z-index: 5)
   - Layer 4: Glowing Edge 12-layer box-shadow (z-index: 4)
   - Layer 1: Colored background blur (z-index: 1)
   - Layer 10: White icon + press state (z-index: 10)
4. Size-adaptive inset: sm(-20px), md(-28px), lg(-36px)
5. Press state: brightness(1.15) overall brighten

Exact copy of v2.0 implementation:
- Mesh gradient border (8 radials)
- 12-layer box-shadow (6 inset + 6 outer)
- Conic mask following mouse
- Mix-blend-mode: plus-lighter
- Mouse tracking algorithm

Component files:
- BorderlessButtonV2.tsx (new, 3-size glowing buttons)

Navigation: Button 21, fuchsia-500 to fuchsia-600`}
              </pre>
            </div>
            
            {/* 元数据 */}
            <div className="text-xs text-slate-400 pt-4 border-t border-slate-700 space-y-1">
              <p>生成日期: 2025-11-02</p>
              <p>Prompt文件: prompt-02.21-glowing-buttons-v2.1.md</p>
              <p>探索方向: 将CodePen发光边缘应用到按钮3种尺寸</p>
              <p>技术来源: v2.0 CodePen发光 + v1.7按钮</p>
              <p>核心技术: 4层结构, 12层box-shadow, 尺寸自适应inset, 点击态brightness</p>
              <p>新组件: BorderlessButtonV2（3尺寸发光按钮）</p>
              <p>特色: 每个按钮都有完整的鼠标跟随发光效果</p>
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
