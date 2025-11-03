import { motion } from "motion/react";
import { BorderlessCardV2 } from "../components/borderless/BorderlessCardV2";
import { 
  ArrowLeft,
  FileArchive,
  Image as ImageIcon,
  Archive,
  Folder as FolderIcon,
  FileText as FileTextIcon,
  Video as VideoIcon,
} from "lucide-react";

interface BorderlessCardV2_0Props {
  onBack?: () => void;
}

export default function BorderlessCardV2_0({ onBack }: BorderlessCardV2_0Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 py-12 px-8">
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
                <h1 className="text-5xl">Borderless Card v2.0</h1>
              </div>
              <p className="text-xl text-slate-600">
                动态无界 + CodePen发光边缘融合版
              </p>
              <p className="text-sm text-slate-500 mt-2">
                Dynamic Borderless + CodePen Glowing Edge Fusion
              </p>
              
              {/* Feature badges */}
              <div className="mt-4 flex gap-3 flex-wrap text-sm">
                <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full font-medium">
                  雾气态：v1.7 边缘模糊
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                  凝结态：v1.9 CodePen发光
                </span>
                <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full font-medium">
                  12层 Box-Shadow
                </span>
                <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full font-medium">
                  鼠标跟随
                </span>
              </div>
            </div>
            {onBack && (
              <motion.button
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-violet-600 text-white flex items-center gap-2"
                style={{
                  boxShadow: '0 0 20px rgba(139,92,246,0.3), 0 0 40px rgba(139,92,246,0.15)'
                }}
                whileHover={{
                  boxShadow: '0 0 30px rgba(139,92,246,0.4), 0 0 60px rgba(139,92,246,0.2)',
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

        {/* Section 1: Main Demo */}
        <Section title="✨ Borderless Cards V2.0" subtitle="雾气态 ↔ 凝结态动态转换">
          <div className="grid md:grid-cols-3 gap-8">
            
            <BorderlessCardV2
              title="项目.zip"
              subtitle="245 个文件"
              icon={FileArchive}
              iconColor={{ r: 167, g: 139, b: 250 }}
              onClick={() => console.log('Click: 项目.zip')}
            />
            
            <BorderlessCardV2
              title="照片.zip"
              subtitle="512 个文件"
              icon={ImageIcon}
              iconColor={{ r: 244, g: 114, b: 182 }}
              onClick={() => console.log('Click: 照片.zip')}
            />
            
            <BorderlessCardV2
              title="备份.rar"
              subtitle="128 个文件"
              icon={Archive}
              iconColor={{ r: 251, g: 146, b: 60 }}
              onClick={() => console.log('Click: 备份.rar')}
            />
            
            <BorderlessCardV2
              title="代码.tar.gz"
              subtitle="1024 个文件"
              icon={FolderIcon}
              iconColor={{ r: 6, g: 182, b: 212 }}
              onClick={() => console.log('Click: 代码.tar.gz')}
            />
            
            <BorderlessCardV2
              title="文档.zip"
              subtitle="89 个文件"
              icon={FileTextIcon}
              iconColor={{ r: 34, g: 197, b: 94 }}
              onClick={() => console.log('Click: 文档.zip')}
            />
            
            <BorderlessCardV2
              title="视频.zip"
              subtitle="36 个文件"
              icon={VideoIcon}
              iconColor={{ r: 239, g: 68, b: 68 }}
              onClick={() => console.log('Click: 视频.zip')}
            />
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-cyan-50 via-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
            <h3 className="text-lg font-medium text-purple-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              <span>使用说明</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• <strong>默认态（雾气）：</strong>蓝色边缘7px重度模糊，雾气感</li>
                <li>• <strong>Hover进入：</strong>蓝色边缘1秒内消失</li>
                <li>• <strong>凝结态显示：</strong>CodePen彩色发光边缘淡入</li>
              </ul>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• <strong>移动鼠标：</strong>发光边缘跟随鼠标位置和角度</li>
                <li>• <strong>靠近边缘：</strong>鼠标越靠近边缘，光晕越明亮</li>
                <li>• <strong>点击反馈：</strong>整体变亮15%，200ms可打断</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Section 2: Technical Implementation */}
        <Section title="🔬 技术实现详解" subtitle="v1.7 + v1.9 完美融合">
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Mist State (v1.7) */}
            <div className="p-6 bg-white rounded-xl border-2 border-cyan-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center">
                  <span className="text-cyan-700 font-bold">v1.7</span>
                </div>
                <div>
                  <h4 className="font-medium text-cyan-900">雾气态（Mist State）</h4>
                  <p className="text-xs text-cyan-600">默认状态</p>
                </div>
              </div>
              
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500 font-bold">•</span>
                  <div>
                    <strong>蓝色边缘：</strong> 7px宽，blur(12px)
                    <p className="text-xs text-slate-500 mt-1">边缘线条独立层，z-index: 3</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500 font-bold">•</span>
                  <div>
                    <strong>图标模糊：</strong> 背景blur(5px)
                    <p className="text-xs text-slate-500 mt-1">双层结构，图标永远清晰</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500 font-bold">•</span>
                  <div>
                    <strong>动画：</strong> 1秒 spring easing
                    <p className="text-xs text-slate-500 mt-1">ease: [0.34, 1.56, 0.64, 1]</p>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Condensed State (v1.9) */}
            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">v1.9</span>
                </div>
                <div>
                  <h4 className="font-medium text-purple-900">凝结态（Condensed State）</h4>
                  <p className="text-xs text-purple-600">Hover后显示</p>
                </div>
              </div>
              
              <ul className="space-y-3 text-sm text-purple-900">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  <div>
                    <strong>Mesh Gradient Border：</strong> 8层radial
                    <p className="text-xs text-purple-600 mt-1">Conic mask跟随鼠标角度，z-index: 5</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  <div>
                    <strong>Glowing Edge：</strong> 12层box-shadow
                    <p className="text-xs text-purple-600 mt-1">6层inset + 6层outer，inset: -40px</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  <div>
                    <strong>鼠标跟踪：</strong> 角度 + 距离
                    <p className="text-xs text-purple-600 mt-1">opacity根据距离动态变化</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  <div>
                    <strong>Mix-Blend-Mode：</strong> plus-lighter
                    <p className="text-xs text-purple-600 mt-1">增强发光效果，z-index: 4</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Section 3: Layer Structure */}
        <Section title="🏗️ 层级结构" subtitle="5层完整实现">
          <div className="space-y-4">
            
            {/* Layer 5 */}
            <div className="p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-purple-600 text-white text-sm flex items-center justify-center font-bold">
                    5
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-900">Mesh Gradient Border</h4>
                    <p className="text-xs text-purple-600">凝结态显示，跟随鼠标</p>
                  </div>
                </div>
                <code className="text-xs text-purple-700 bg-purple-100 px-2 py-1 rounded">z-index: 5</code>
              </div>
              <div className="text-xs text-slate-700 bg-white p-3 rounded font-mono">
                opacity: isHovered ? colorOpacity : 0<br/>
                8个 radial-gradient + conic mask(25%-40%-60%-75%)
              </div>
            </div>
            
            {/* Layer 4 */}
            <div className="p-4 bg-orange-50 rounded-xl border-2 border-orange-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-orange-600 text-white text-sm flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-medium text-orange-900">Glowing Edge</h4>
                    <p className="text-xs text-orange-600">凝结态显示，12层box-shadow</p>
                  </div>
                </div>
                <code className="text-xs text-orange-700 bg-orange-100 px-2 py-1 rounded">z-index: 4</code>
              </div>
              <div className="text-xs text-slate-700 bg-white p-3 rounded font-mono">
                opacity: isHovered ? glowOpacity : 0<br/>
                inset: -40px, mixBlendMode: plus-lighter<br/>
                12层 box-shadow + conic mask(2.5%-10%-90%-97.5%)
              </div>
            </div>
            
            {/* Layer 3 */}
            <div className="p-4 bg-cyan-50 rounded-xl border-2 border-cyan-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-cyan-600 text-white text-sm flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-cyan-900">Blue Blurred Edge</h4>
                    <p className="text-xs text-cyan-600">雾气态显示，motion动画</p>
                  </div>
                </div>
                <code className="text-xs text-cyan-700 bg-cyan-100 px-2 py-1 rounded">z-index: 3</code>
              </div>
              <div className="text-xs text-slate-700 bg-white p-3 rounded font-mono">
                {'borderWidth: 7px → 1px (hover)'}<br/>
                {'filter: blur(12px) → blur(0)'}<br/>
                {'opacity: 1 → 0'}
              </div>
            </div>
            
            {/* Layer 2 */}
            <div className="p-4 bg-green-50 rounded-xl border-2 border-green-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-green-600 text-white text-sm flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-green-900">Main Container + Content</h4>
                    <p className="text-xs text-green-600">主容器，点击态brightness</p>
                  </div>
                </div>
                <code className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded">z-index: 2</code>
              </div>
              <div className="text-xs text-slate-700 bg-white p-3 rounded font-mono">
                radial-gradient背景 + backdrop-filter<br/>
                点击态：brightness(1.0 → 1.15)<br/>
                图标双层 + 文字
              </div>
            </div>
          </div>
        </Section>

        {/* Section 4: Animation Timeline */}
        <Section title="⏱️ 动画时序" subtitle="雾气态 ↔ 凝结态转换过程">
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Mist to Condensed */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-cyan-200">
              <h4 className="font-medium text-cyan-900 mb-4 flex items-center gap-2">
                <span className="text-xl">→</span>
                <span>雾气态 → 凝结态（Hover进入）</span>
              </h4>
              
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-white rounded-lg border-l-4 border-cyan-500">
                  <p className="font-medium text-cyan-900 mb-1">t = 0ms</p>
                  <p className="text-xs text-slate-600">鼠标进入，开始动画</p>
                </div>
                
                <div className="p-3 bg-white rounded-lg border-l-4 border-blue-500">
                  <p className="font-medium text-blue-900 mb-1">t = 0-1000ms</p>
                  <p className="text-xs text-slate-600">
                    蓝色边缘消失：7px→1px, blur(12px)→0, opacity 1→0
                  </p>
                </div>
                
                <div className="p-3 bg-white rounded-lg border-l-4 border-purple-500">
                  <p className="font-medium text-purple-900 mb-1">t = 300ms</p>
                  <p className="text-xs text-slate-600">
                    CodePen效果开始淡入（mesh + glow）
                  </p>
                </div>
                
                <div className="p-3 bg-white rounded-lg border-l-4 border-pink-500">
                  <p className="font-medium text-pink-900 mb-1">t = 1000ms</p>
                  <p className="text-xs text-slate-600">
                    完全凝结态，鼠标移动实时响应
                  </p>
                </div>
              </div>
            </div>
            
            {/* Condensed to Mist */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
              <h4 className="font-medium text-purple-900 mb-4 flex items-center gap-2">
                <span className="text-xl">←</span>
                <span>凝结态 → 雾气态（Hover退出）</span>
              </h4>
              
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-white rounded-lg border-l-4 border-purple-500">
                  <p className="font-medium text-purple-900 mb-1">t = 0ms</p>
                  <p className="text-xs text-slate-600">鼠标离开</p>
                </div>
                
                <div className="p-3 bg-white rounded-lg border-l-4 border-pink-500">
                  <p className="font-medium text-pink-900 mb-1">t = 0-100ms</p>
                  <p className="text-xs text-slate-600">
                    CodePen效果快速消失（opacity→0）
                  </p>
                </div>
                
                <div className="p-3 bg-white rounded-lg border-l-4 border-blue-500">
                  <p className="font-medium text-blue-900 mb-1">t = 0-1000ms</p>
                  <p className="text-xs text-slate-600">
                    蓝色边缘展开：1px→7px, blur(0)→12px, opacity 0→1
                  </p>
                </div>
                
                <div className="p-3 bg-white rounded-lg border-l-4 border-cyan-500">
                  <p className="font-medium text-cyan-900 mb-1">t = 1000ms</p>
                  <p className="text-xs text-slate-600">
                    完全雾气态，等待下次hover
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Prompt记录 */}
        <details className="mt-16 p-6 rounded-xl bg-slate-900 text-white">
          <summary className="cursor-pointer text-lg font-medium mb-4">
            📝 查看生成此页面的 Prompt
          </summary>
          
          <div className="space-y-6">
            {/* 中文版 */}
            <div>
              <h4 className="text-sm text-slate-400 mb-2">Prompt (中文版)</h4>
              <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono">
{`创建 v2.0 - 动态无界 + CodePen发光融合

文件: src/pages/20-BorderlessCardV2.0.tsx
组件: src/components/borderless/BorderlessCardV2.tsx

核心要求：
融合 v1.7 雾气态 + v1.9 凝结态CodePen发光效果

完全复制 v1.9 的实现：
1. Mesh gradient border（8层radial + conic mask）
2. Glowing edge（12层box-shadow + mask）
3. 鼠标跟踪算法（角度+距离）
4. Mix-blend-mode: plus-lighter
5. 动态 opacity 计算

层级结构（5层）：
- Layer 5: Mesh Border (z-index: 5, 凝结态)
- Layer 4: Glowing Edge (z-index: 4, 凝结态)
- Layer 3: Blue Blurred Edge (z-index: 3, 雾气态)
- Layer 2: Main Container (z-index: 2)
- Layer 1: Background (可选)

动画时序：
t=0ms: 鼠标进入
t=0-1000ms: 蓝色边缘消失
t=300ms: CodePen效果淡入
t=1000ms: 完全凝结态

完整代码：350+ 行
完全按照 v1.9 CodePen 实现

组件文件:
- BorderlessCardV2.tsx (新建，融合版)

导航: 第20个按钮，violet-500 to violet-600`}
              </pre>
            </div>
            
            {/* 英文版 */}
            <div>
              <h4 className="text-sm text-slate-400 mb-2">Prompt (English Version)</h4>
              <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono">
{`Create v2.0 - Fusion of Dynamic Borderless + CodePen Glow

File: src/pages/20-BorderlessCardV2.0.tsx
Component: src/components/borderless/BorderlessCardV2.tsx

Core requirement:
Merge v1.7 mist state + v1.9 condensed state CodePen glow

Exact copy of v1.9 implementation:
1. Mesh gradient border (8 radials + conic mask)
2. Glowing edge (12 box-shadows + mask)
3. Mouse tracking algorithm (angle + distance)
4. Mix-blend-mode: plus-lighter
5. Dynamic opacity calculation

Layer structure (5 layers):
- Layer 5: Mesh Border (z-index: 5, condensed)
- Layer 4: Glowing Edge (z-index: 4, condensed)
- Layer 3: Blue Blurred Edge (z-index: 3, mist)
- Layer 2: Main Container (z-index: 2)
- Layer 1: Background (optional)

Animation timeline:
t=0ms: Mouse enter
t=0-1000ms: Blue edge disappears
t=300ms: CodePen effect fades in
t=1000ms: Full condensed state

Complete code: 350+ lines
Exact v1.9 CodePen implementation

Component files:
- BorderlessCardV2.tsx (new, fusion version)

Navigation: Button 20, violet-500 to violet-600`}
              </pre>
            </div>
            
            {/* 元数据 */}
            <div className="text-xs text-slate-400 pt-4 border-t border-slate-700 space-y-1">
              <p>生成日期: 2025-11-02</p>
              <p>Prompt文件: prompt-02.20-borderless-with-codepen-glow-v2.0.md</p>
              <p>探索方向: 融合雾气态和CodePen发光边缘</p>
              <p>技术来源: v1.7边缘模糊 + v1.9 CodePen复刻</p>
              <p>核心技术: 5层结构，12层box-shadow，mesh gradient，鼠标跟踪</p>
              <p>新组件: BorderlessCardV2（完美融合版）</p>
              <p>动画: 雾气态 ↔ CodePen凝结态平滑转换</p>
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
