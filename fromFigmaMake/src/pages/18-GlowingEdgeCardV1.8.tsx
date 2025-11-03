import { motion } from "motion/react";
import { BorderlessCardV1_6 } from "../components/borderless/BorderlessCardV1_6";
import { BorderlessCardWithGlowingEdge } from "../components/borderless/BorderlessCardWithGlowingEdge";
import { 
  ArrowLeft,
  FileArchive,
  Image as ImageIcon,
  Archive,
  Folder as FolderIcon,
  FileText as FileTextIcon,
  Video as VideoIcon,
  Music as MusicIcon,
  Code as CodeIcon,
} from "lucide-react";

interface GlowingEdgeCardV1_8Props {
  onBack?: () => void;
}

export default function GlowingEdgeCardV1_8({ onBack }: GlowingEdgeCardV1_8Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30 py-12 px-8">
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
                <h1 className="text-5xl">Glowing Edge Card v1.8</h1>
              </div>
              <p className="text-xl text-slate-600">
                发光边缘卡片 · 彩虹边缘跟随鼠标 · 基于CodePen效果
              </p>
              <p className="text-sm text-slate-500 mt-2">
                Rainbow Glowing Edge · Mouse Following · Based on CodePen
              </p>
              
              {/* Feature badges */}
              <div className="mt-4 flex gap-3 flex-wrap text-sm">
                <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full font-medium">
                  ✨ 彩虹发光边缘
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                  🎯 跟随鼠标位置
                </span>
                <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full font-medium">
                  🎨 CSS Mask技术
                </span>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full font-medium">
                  💫 多层光晕效果
                </span>
              </div>
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

        {/* Section 1: Effect Comparison */}
        <Section title="📊 效果对比" subtitle="v1.7 普通边缘 vs v1.8 发光边缘">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* v1.7 Normal edge */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                  <span className="text-slate-700 font-bold">v1.7</span>
                </div>
                <div>
                  <h3 className="font-medium text-slate-900">普通凝结态</h3>
                  <p className="text-xs text-slate-500">Normal Condensed State</p>
                </div>
              </div>
              
              <BorderlessCardV1_6
                title="项目.zip"
                subtitle="245 个文件"
                icon={FileArchive}
                iconColor={{ r: 167, g: 139, b: 250 }}
                onClick={() => console.log('Click: v1.7 card')}
              />
              
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-sm text-slate-700 mb-2">
                  <strong>边缘效果：</strong>
                </p>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li>• 雾气态：7px 蓝色模糊边缘</li>
                  <li>• 凝结态：1px 青色边缘（静态）</li>
                  <li>• 光晕：固定位置，不跟随鼠标</li>
                </ul>
              </div>
            </div>
            
            {/* v1.8 Glowing edge */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">v1.8</span>
                </div>
                <div>
                  <h3 className="font-medium text-slate-900">发光边缘凝结态</h3>
                  <p className="text-xs text-slate-500">Glowing Edge Condensed State</p>
                </div>
              </div>
              
              <BorderlessCardWithGlowingEdge
                title="项目.zip"
                subtitle="245 个文件"
                icon={FileArchive}
                iconColor={{ r: 167, g: 139, b: 250 }}
                onClick={() => console.log('Click: v1.8 card')}
              />
              
              <div className="p-4 bg-gradient-to-r from-cyan-50 via-purple-50 to-pink-50 rounded-lg border-2 border-cyan-200">
                <p className="text-sm text-slate-700 mb-2">
                  <strong>边缘效果：</strong>
                </p>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li>• 雾气态：7px 蓝色模糊边缘</li>
                  <li>• 凝结态：1px 彩虹发光边缘（动态）</li>
                  <li>• 光晕：跟随鼠标位置，靠近边缘更亮</li>
                  <li>• 渐变：根据鼠标角度动态调整</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-cyan-100 via-purple-100 to-pink-100 rounded-xl border-2 border-cyan-300">
            <h4 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">✨</span>
              <span>试试移动鼠标到 v1.8 卡片边缘附近</span>
            </h4>
            <p className="text-sm text-slate-700">
              观察彩色发光边缘如何跟随鼠标位置变化，越靠近边缘光晕越明亮。
              渐变方向会随着鼠标角度旋转，创造动态的发光效果。
            </p>
          </div>
        </Section>

        {/* Section 2: Glowing Edge Cards Grid */}
        <Section title="✨ 发光边缘卡片示例" subtitle="6个不同颜色的发光卡片">
          <div className="grid md:grid-cols-3 gap-8">
            <BorderlessCardWithGlowingEdge
              title="文档.zip"
              subtitle="89 个文件"
              icon={FileTextIcon}
              iconColor={{ r: 34, g: 197, b: 94 }}
              onClick={() => console.log('Click: 文档.zip')}
            />
            
            <BorderlessCardWithGlowingEdge
              title="项目.zip"
              subtitle="245 个文件"
              icon={FileArchive}
              iconColor={{ r: 167, g: 139, b: 250 }}
              onClick={() => console.log('Click: 项目.zip')}
            />
            
            <BorderlessCardWithGlowingEdge
              title="照片.zip"
              subtitle="512 个文件"
              icon={ImageIcon}
              iconColor={{ r: 244, g: 114, b: 182 }}
              onClick={() => console.log('Click: 照片.zip')}
            />
            
            <BorderlessCardWithGlowingEdge
              title="备份.rar"
              subtitle="128 个文件"
              icon={Archive}
              iconColor={{ r: 251, g: 146, b: 60 }}
              onClick={() => console.log('Click: 备份.rar')}
            />
            
            <BorderlessCardWithGlowingEdge
              title="代码.tar.gz"
              subtitle="1024 个文件"
              icon={CodeIcon}
              iconColor={{ r: 6, g: 182, b: 212 }}
              onClick={() => console.log('Click: 代码.tar.gz')}
            />
            
            <BorderlessCardWithGlowingEdge
              title="音乐.zip"
              subtitle="36 个文件"
              icon={MusicIcon}
              iconColor={{ r: 239, g: 68, b: 68 }}
              onClick={() => console.log('Click: 音乐.zip')}
            />
          </div>
          
          <div className="mt-8 p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
            <h4 className="font-medium text-purple-900 mb-3">💡 交互提示</h4>
            <div className="space-y-2 text-sm text-purple-800">
              <p>• <strong>移动鼠标：</strong>观察彩虹边缘如何跟随鼠标位置和角度变化</p>
              <p>• <strong>靠近边缘：</strong>鼠标越靠近卡片边缘，发光效果越明显</p>
              <p>• <strong>移出卡片：</strong>彩色边缘快速消失，蓝色模糊边缘重新展开</p>
            </div>
          </div>
        </Section>

        {/* Section 3: Technical Implementation */}
        <Section title="🛠️ 技术实现详解" subtitle="基于 CodePen 的 Glowing Edge 效果">
          
          {/* Core Technologies */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Technology 1: conic-gradient */}
            <div className="p-6 rounded-xl bg-white border-2 border-cyan-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-700 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-medium text-cyan-900">conic-gradient 彩虹渐变</h3>
                  <p className="text-xs text-cyan-700 mt-1">Radial Rainbow Colors</p>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <p className="text-slate-700">
                  使用 CSS conic-gradient 创建彩虹色的圆锥渐变：
                </p>
                
                <div className="p-3 bg-slate-900 rounded-lg">
                  <code className="text-xs font-mono text-cyan-400 block whitespace-pre">
{`conic-gradient(
  from 0deg at 50% 50%,
  cyan 0deg,
  purple 60deg,
  pink 120deg,
  orange 180deg,
  green 240deg,
  cyan 360deg
)`}
                  </code>
                </div>
                
                <p className="text-xs text-slate-600">
                  从中心点辐射出彩虹色，覆盖整个360度
                </p>
              </div>
            </div>
            
            {/* Technology 2: CSS Mask */}
            <div className="p-6 rounded-xl bg-white border-2 border-purple-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-700 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-medium text-purple-900">CSS Mask 边缘显示</h3>
                  <p className="text-xs text-purple-700 mt-1">1px Edge Only</p>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <p className="text-slate-700">
                  使用 CSS mask 技术只显示 1px 边缘：
                </p>
                
                <div className="p-3 bg-slate-900 rounded-lg">
                  <code className="text-xs font-mono text-purple-400 block whitespace-pre">
{`padding: 1px;  /* 边缘宽度 */

mask: 
  linear-gradient(#fff 0 0) content-box,
  linear-gradient(#fff 0 0);
  
mask-composite: exclude;`}
                  </code>
                </div>
                
                <p className="text-xs text-slate-600">
                  排除内容区域，只显示 padding 区域的渐变
                </p>
              </div>
            </div>
            
            {/* Technology 3: Mouse Tracking */}
            <div className="p-6 rounded-xl bg-white border-2 border-pink-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-pink-700 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-medium text-pink-900">鼠标位置跟踪</h3>
                  <p className="text-xs text-pink-700 mt-1">Mouse Position Tracking</p>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <p className="text-slate-700">
                  实时计算鼠标相对卡片的角度和距离：
                </p>
                
                <div className="p-3 bg-slate-900 rounded-lg">
                  <code className="text-xs font-mono text-pink-400 block whitespace-pre">
{`// 计算角度
const angle = Math.atan2(dy, dx);

// 计算到边缘距离
const closeness = 1 / Math.min(kx, ky);

// 应用到渐变
from \${pointerAngle}deg`}
                  </code>
                </div>
                
                <p className="text-xs text-slate-600">
                  角度控制渐变方向，距离控制透明度
                </p>
              </div>
            </div>
            
            {/* Technology 4: Multi-layer Glow */}
            <div className="p-6 rounded-xl bg-white border-2 border-amber-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-700 font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-medium text-amber-900">多层光晕效果</h3>
                  <p className="text-xs text-amber-700 mt-1">Multi-layer Box Shadow</p>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <p className="text-slate-700">
                  叠加多层 box-shadow 创造丰富的光晕：
                </p>
                
                <div className="p-3 bg-slate-900 rounded-lg">
                  <code className="text-xs font-mono text-amber-400 block whitespace-pre">
{`boxShadow: \`
  0 0 2px 0 cyan,
  0 0 4px 1px purple,
  0 0 8px 1px pink,
  0 0 16px 2px orange
\``}
                  </code>
                </div>
                
                <p className="text-xs text-slate-600">
                  不同颜色和尺寸的阴影层层叠加
                </p>
              </div>
            </div>
          </div>
          
          {/* Complete Code Example */}
          <div className="mt-8 p-6 bg-slate-900 text-white rounded-xl">
            <h4 className="text-sm font-medium mb-4 text-slate-300">完整实现代码示例：</h4>
            <pre className="text-xs font-mono overflow-auto whitespace-pre-wrap">
{`// 彩虹发光边缘层
<motion.div
  animate={{
    opacity: isHovered ? Math.min(1, pointerDistance * 1.2 + 0.3) : 0,
  }}
  style={{
    position: 'absolute',
    inset: 0,
    borderRadius: '24px',
    padding: '1px',
    
    // 彩虹渐变背景
    background: \`conic-gradient(
      from 0deg,
      rgba(6,182,212,0.9) 0deg,
      rgba(167,139,250,0.9) 60deg,
      rgba(244,114,182,0.9) 120deg,
      rgba(251,146,60,0.9) 180deg,
      rgba(34,197,94,0.9) 240deg,
      rgba(6,182,212,0.9) 360deg
    )\`,
    
    // CSS mask 只显示边缘
    mask: \`linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)\`,
    maskComposite: 'exclude',
    
    // 多层光晕
    boxShadow: \`
      0 0 2px 0px rgba(6,182,212,0.7),
      0 0 4px 1px rgba(167,139,250,0.5),
      0 0 8px 1px rgba(244,114,182,0.4),
      0 0 16px 2px rgba(251,146,60,0.3)
    \`,
  }}
>
  {/* 跟随鼠标的渐变层 */}
  <div style={{
    background: \`conic-gradient(
      from \${pointerAngle}deg,
      transparent 0deg,
      transparent 20deg,
      rgba(6,182,212,0.9) 40deg,
      rgba(167,139,250,0.9) 80deg,
      transparent 140deg,
      transparent 360deg
    )\`,
  }} />
</motion.div>`}
            </pre>
          </div>
        </Section>

        {/* Section 4: Animation States */}
        <Section title="🎬 动画状态详解" subtitle="雾气态 ↔ 凝结态转换">
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Mist to Condensed */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-cyan-200">
              <h4 className="font-medium text-cyan-900 mb-4 flex items-center gap-2">
                <span className="text-xl">→</span>
                <span>雾气态 → 凝结态</span>
              </h4>
              
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-white rounded-lg">
                  <p className="font-medium text-cyan-900 mb-2">阶段1 (0-1000ms)</p>
                  <p className="text-xs text-slate-600">蓝色模糊边缘收缩消失</p>
                  <ul className="mt-2 space-y-1 text-xs text-slate-600">
                    <li>• borderWidth: 7px → 1px</li>
                    <li>• filter: blur(12px) → blur(0)</li>
                    <li>• opacity: 1 → 0</li>
                  </ul>
                </div>
                
                <div className="p-3 bg-white rounded-lg">
                  <p className="font-medium text-cyan-900 mb-2">阶段2 (300ms延迟后)</p>
                  <p className="text-xs text-slate-600">彩色发光边缘淡入</p>
                  <ul className="mt-2 space-y-1 text-xs text-slate-600">
                    <li>• opacity: 0 → 1（根据鼠标距离）</li>
                    <li>• 渐变跟随鼠标角度</li>
                    <li>• 多层光晕激活</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Condensed to Mist */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
              <h4 className="font-medium text-purple-900 mb-4 flex items-center gap-2">
                <span className="text-xl">←</span>
                <span>凝结态 → 雾气态</span>
              </h4>
              
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-white rounded-lg">
                  <p className="font-medium text-purple-900 mb-2">阶段1 (立即)</p>
                  <p className="text-xs text-slate-600">彩色发光边缘快速消失</p>
                  <ul className="mt-2 space-y-1 text-xs text-slate-600">
                    <li>• opacity: 1 → 0（无延迟）</li>
                    <li>• 光晕立即关闭</li>
                  </ul>
                </div>
                
                <div className="p-3 bg-white rounded-lg">
                  <p className="font-medium text-purple-900 mb-2">阶段2 (0-1000ms)</p>
                  <p className="text-xs text-slate-600">蓝色模糊边缘展开</p>
                  <ul className="mt-2 space-y-1 text-xs text-slate-600">
                    <li>• borderWidth: 1px → 7px</li>
                    <li>• filter: blur(0) → blur(12px)</li>
                    <li>• opacity: 0 → 1</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Prompt记录 */}
        <details className="mt-16 p-6 rounded-xl bg-slate-900 text-white">
          <summary className="cursor-pointer text-lg font-medium mb-4">
            📝 查看生成此页面的Prompt
          </summary>
          
          <div className="space-y-6">
            {/* 中文版 */}
            <div>
              <h4 className="text-sm text-slate-400 mb-2">Prompt (中文版)</h4>
              <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono">
{`创建 v1.8 - 发光边缘卡片

文件: src/pages/18-GlowingEdgeCardV1.8.tsx
组件: src/components/borderless/BorderlessCardWithGlowingEdge.tsx

新组件：Borderless Card WITH GLOWING EDGE

基于CodePen的Glowing Edge效果
凝结态带彩色发光边缘，跟随鼠标位置

核心技术：
1. conic-gradient 创建彩虹渐变
2. CSS mask 只显示1px边缘
3. 鼠标位置跟踪（角度+距离）
4. 多层box-shadow发光效果
5. opacity根据距离边缘远近变化

动画效果：
- 雾气态：蓝色7px模糊边缘
- 凝结态：彩虹1px发光边缘
- 过渡：300ms延迟出现彩色边缘
- 跟随：渐变方向随鼠标角度旋转

完整代码包含：
- 鼠标位置计算（角度、距离）
- CSS mask技术实现
- conic-gradient双层渐变
- 多层光晕叠加
- 动画时序控制

组件文件:
- BorderlessCardWithGlowingEdge.tsx (新建)
- 复用 v1.6/v1.7 的其他组件

导航: 第18个按钮，pink-400 to pink-500`}
              </pre>
            </div>
            
            {/* 英文版 */}
            <div>
              <h4 className="text-sm text-slate-400 mb-2">Prompt (English Version)</h4>
              <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono">
{`Create v1.8 - Glowing Edge Card

File: src/pages/18-GlowingEdgeCardV1.8.tsx
Component: src/components/borderless/BorderlessCardWithGlowingEdge.tsx

New component: Borderless Card WITH GLOWING EDGE

Based on CodePen Glowing Edge effect
Condensed state with colored glowing edge following mouse

Core technologies:
1. conic-gradient for rainbow colors
2. CSS mask for 1px edge only
3. Mouse position tracking (angle + distance)
4. Multi-layer box-shadow glow
5. Opacity based on distance to edge

Animation effects:
- Mist state: Blue 7px blurred edge
- Condensed state: Rainbow 1px glowing edge
- Transition: 300ms delay for colored edge
- Following: Gradient direction rotates with mouse angle

Complete code includes:
- Mouse position calculation (angle, distance)
- CSS mask technique implementation
- conic-gradient double-layer gradient
- Multi-layer glow stacking
- Animation timing control

Component files:
- BorderlessCardWithGlowingEdge.tsx (new)
- Reuse other components from v1.6/v1.7

Navigation: Button 18, pink-400 to pink-500`}
              </pre>
            </div>
            
            {/* 元数据 */}
            <div className="text-xs text-slate-400 pt-4 border-t border-slate-700 space-y-1">
              <p>生成日期: 2025-11-02</p>
              <p>Prompt文件: prompt-02.18-glowing-edge-card-v1.8.md</p>
              <p>探索方向: 凝结态彩色发光边缘，跟随鼠标位置</p>
              <p>技术来源: CodePen Glowing Edge Card</p>
              <p>核心技术: CSS mask, conic-gradient, 鼠标跟踪, 多层光晕</p>
              <p>新组件: BorderlessCardWithGlowingEdge</p>
              <p>动画效果: 雾气态 ↔ 彩虹发光边缘</p>
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
