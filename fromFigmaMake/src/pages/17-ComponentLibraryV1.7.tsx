import { motion } from "motion/react";
import { BorderlessCardV1_6 } from "../components/borderless/BorderlessCardV1_6";
import { BorderlessButtonV1_7 } from "../components/borderless/BorderlessButtonV1_7";
import { BorderlessInputV1_5 } from "../components/borderless/BorderlessInputV1_5";
import { 
  ArrowLeft,
  FileArchive,
  Image as ImageIcon,
  Archive,
  Folder as FolderIcon,
  FileText as FileTextIcon,
  Video as VideoIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  Trash as TrashIcon,
  Settings as SettingsIcon,
  Search as SearchIcon,
  Filter as FilterIcon,
  FolderPlus as FolderPlusIcon,
  Check as CheckIcon,
  CheckCircle2 as CheckCircleIcon,
  X as XIcon,
  MoreHorizontal as MoreHorizontalIcon,
  Star as StarIcon,
  AlertTriangle as AlertTriangleIcon,
  Heart as HeartIcon,
} from "lucide-react";
import { useState } from "react";

interface ComponentLibraryV1_7Props {
  onBack?: () => void;
}

export default function ComponentLibraryV1_7({ onBack }: ComponentLibraryV1_7Props) {
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [inputValue, setInputValue] = useState("");

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
                <h1 className="text-5xl">Component Library v1.7</h1>
              </div>
              <p className="text-xl text-slate-600">
                修正：按钮双层结构 · 图标清晰 · 点击变亮可打断
              </p>
              <p className="text-sm text-slate-500 mt-2">
                Fixed: Button Double-Layer · Icon Sharp · Press Brighten Interruptible
              </p>
              
              {/* Fix badges */}
              <div className="mt-4 flex gap-3 flex-wrap text-sm">
                <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full font-medium">
                  ✅ 双层结构
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                  ✅ 图标清晰
                </span>
                <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full font-medium">
                  ✅ 变亮15%
                </span>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full font-medium">
                  ✅ 200ms可打断
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

        {/* Section 1: Button Structure Explanation */}
        <Section title="🔘 Borderless Buttons v1.7" subtitle="双层结构 · 点击变亮200ms可打断">
          
          {/* Double-layer structure explanation */}
          <div className="mb-8 p-6 bg-cyan-50 rounded-xl border-2 border-cyan-200">
            <h3 className="text-lg font-medium text-cyan-900 mb-3">
              ✅ v1.7 改进：双层结���（图标永远清晰）
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div className="p-4 bg-white rounded-lg">
                <h4 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-cyan-600 text-white text-xs flex items-center justify-center">1</span>
                  层1 - 彩色背景（可模糊）
                </h4>
                <ul className="text-slate-700 space-y-2 text-xs">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600">•</span>
                    <span><code className="bg-slate-100 px-1 rounded">position: absolute</code></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600">•</span>
                    <span><code className="bg-slate-100 px-1 rounded">filter: blur(5px) → blur(0)</code></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600">•</span>
                    <span><code className="bg-slate-100 px-1 rounded">boxShadow: 光晕效果</code></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600">•</span>
                    <span><code className="bg-slate-100 px-1 rounded">pointerEvents: none</code></span>
                  </li>
                </ul>
              </div>
              
              <div className="p-4 bg-white rounded-lg">
                <h4 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-purple-600 text-white text-xs flex items-center justify-center">2</span>
                  层2 - 白色图标（永远清晰）
                </h4>
                <ul className="text-slate-700 space-y-2 text-xs">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span><code className="bg-slate-100 px-1 rounded">background: transparent</code></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span><code className="bg-slate-100 px-1 rounded">position: relative, zIndex: 10</code></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span>图标永远清晰（不受blur影响）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span>点击态: <code className="bg-slate-100 px-1 rounded">brightness(1.15)</code></span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-white rounded-lg">
              <p className="text-sm text-slate-700">
                <strong className="text-cyan-900">核心原则：</strong>边缘如雾（背景模糊），核心如晶（图标清晰）
              </p>
            </div>
          </div>
          
          {/* Press state explanation */}
          <div className="mb-8 p-6 bg-rose-50 rounded-xl border-2 border-rose-200">
            <h3 className="text-lg font-medium text-rose-900 mb-3">
              ⚡ 点击态：变亮15% · 200ms · 可打断
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-rose-600 font-medium">•</span>
                <span><strong>按下：</strong>brightness(1.15) 变亮15%（不是变暗）</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-rose-600 font-medium">•</span>
                <span><strong>时长：</strong>200ms（从 v1.6 的 150ms 改进）</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-rose-600 font-medium">•</span>
                <span><strong>范围：</strong>整个按钮（背景 + 光晕 + 图标）</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-rose-600 font-medium">•</span>
                <span className="font-medium text-rose-800">
                  <strong>可打断：</strong>按下100ms就松开，动画从中间值（约1.075）平滑回退到1.0，不会跳跃
                </span>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-white rounded-lg">
              <p className="text-xs font-medium text-rose-900 mb-2">动画打断机制示例：</p>
              <div className="space-y-2 text-xs font-mono text-rose-700">
                <div className="p-2 bg-rose-50 rounded">
                  <div className="font-medium mb-1">场景A：按下完整200ms</div>
                  <div>0ms: 按下 → brightness 1.0 → 1.15 开始</div>
                  <div>200ms: 到达 1.15（完成）</div>
                  <div>200ms: 松开 → brightness 1.15 → 1.0 开始</div>
                  <div>400ms: 回到 1.0</div>
                </div>
                
                <div className="p-2 bg-rose-50 rounded">
                  <div className="font-medium mb-1">场景B：按下100ms被打断</div>
                  <div>0ms: 按下 → brightness 1.0 → 1.15 开始</div>
                  <div>100ms: 到达约 1.075（动画一半）</div>
                  <div className="text-rose-800 font-bold">100ms: 松开！从当前值1.075 → 1.0</div>
                  <div>300ms: 回到 1.0（平滑过渡，无跳跃）</div>
                </div>
                
                <div className="p-2 bg-rose-50 rounded">
                  <div className="font-medium mb-1">场景C：快速点击50ms</div>
                  <div>0ms: 按下 → brightness 1.0 → 1.15 开始</div>
                  <div>50ms: 到达约 1.0375（刚开始）</div>
                  <div className="text-rose-800 font-bold">50ms: 松开！立即从1.0375 → 1.0</div>
                  <div>250ms: 回到 1.0（超快速回退）</div>
                </div>
              </div>
              
              <div className="mt-3 p-2 bg-amber-50 rounded border border-amber-200">
                <p className="text-xs text-amber-800">
                  <strong>技术原理：</strong>Framer Motion 自动处理，动画从"当前值"开始新过渡，无需手动控制
                </p>
              </div>
            </div>
          </div>
          
          {/* Size examples */}
          <div className="space-y-4">
            <h4 className="text-base font-medium text-slate-700">尺寸示例</h4>
            <p className="text-xs text-slate-500">sm (40×40px) · md (56×56px) · lg (72×72px)</p>
            <div className="flex gap-8 items-end">
              <div className="text-center">
                <BorderlessButtonV1_7 
                  icon={UploadIcon} 
                  size="sm" 
                  color={{ r: 6, g: 182, b: 212 }}
                  onClick={() => console.log('Upload (sm)')}
                />
                <p className="text-xs text-slate-500 mt-3">sm · 40px</p>
              </div>
              <div className="text-center">
                <BorderlessButtonV1_7 
                  icon={UploadIcon} 
                  size="md" 
                  color={{ r: 6, g: 182, b: 212 }}
                  onClick={() => console.log('Upload (md)')}
                />
                <p className="text-xs text-slate-500 mt-3">md · 56px</p>
              </div>
              <div className="text-center">
                <BorderlessButtonV1_7 
                  icon={UploadIcon} 
                  size="lg" 
                  color={{ r: 6, g: 182, b: 212 }}
                  onClick={() => console.log('Upload (lg)')}
                />
                <p className="text-xs text-slate-500 mt-3">lg · 72px</p>
              </div>
            </div>
          </div>
          
          {/* Color semantics */}
          <div className="space-y-4 mt-12">
            <h4 className="text-base font-medium text-slate-700">颜色语义示例</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Primary - Cyan */}
              <div className="space-y-3">
                <p className="text-xs text-slate-500 font-medium">主要操作（青色 Cyan）</p>
                <div className="flex gap-3 flex-wrap">
                  <BorderlessButtonV1_7 
                    icon={UploadIcon} 
                    color={{ r: 6, g: 182, b: 212 }}
                    onClick={() => console.log('Upload')}
                  />
                  <BorderlessButtonV1_7 
                    icon={DownloadIcon} 
                    color={{ r: 6, g: 182, b: 212 }}
                    onClick={() => console.log('Download')}
                  />
                  <BorderlessButtonV1_7 
                    icon={FolderPlusIcon} 
                    color={{ r: 6, g: 182, b: 212 }}
                    onClick={() => console.log('New Folder')}
                  />
                </div>
              </div>
              
              {/* Success - Green */}
              <div className="space-y-3">
                <p className="text-xs text-slate-500 font-medium">成功操作（绿色 Green）</p>
                <div className="flex gap-3 flex-wrap">
                  <BorderlessButtonV1_7 
                    icon={CheckIcon} 
                    color={{ r: 34, g: 197, b: 94 }}
                    onClick={() => console.log('Check')}
                  />
                  <BorderlessButtonV1_7 
                    icon={CheckCircleIcon} 
                    color={{ r: 34, g: 197, b: 94 }}
                    onClick={() => console.log('Confirm')}
                  />
                </div>
              </div>
              
              {/* Danger - Red */}
              <div className="space-y-3">
                <p className="text-xs text-slate-500 font-medium">危险操作（红色 Red）</p>
                <div className="flex gap-3 flex-wrap">
                  <BorderlessButtonV1_7 
                    icon={TrashIcon} 
                    color={{ r: 239, g: 68, b: 68 }}
                    onClick={() => console.log('Delete')}
                  />
                  <BorderlessButtonV1_7 
                    icon={XIcon} 
                    color={{ r: 239, g: 68, b: 68 }}
                    onClick={() => console.log('Close')}
                  />
                </div>
              </div>
              
              {/* Secondary - Gray */}
              <div className="space-y-3">
                <p className="text-xs text-slate-500 font-medium">次要操作（灰色 Slate）</p>
                <div className="flex gap-3 flex-wrap">
                  <BorderlessButtonV1_7 
                    icon={SettingsIcon} 
                    color={{ r: 100, g: 116, b: 139 }}
                    onClick={() => console.log('Settings')}
                  />
                  <BorderlessButtonV1_7 
                    icon={MoreHorizontalIcon} 
                    color={{ r: 100, g: 116, b: 139 }}
                    onClick={() => console.log('More')}
                  />
                </div>
              </div>
            </div>
            
            {/* Other colors */}
            <div className="space-y-3 mt-6">
              <p className="text-xs text-slate-500 font-medium">其他颜色示例</p>
              <div className="flex gap-4 flex-wrap">
                <BorderlessButtonV1_7 
                  icon={StarIcon} 
                  color={{ r: 167, g: 139, b: 250 }}
                  onClick={() => console.log('Favorite')}
                />
                <BorderlessButtonV1_7 
                  icon={AlertTriangleIcon} 
                  color={{ r: 251, g: 146, b: 60 }}
                  onClick={() => console.log('Warning')}
                />
                <BorderlessButtonV1_7 
                  icon={HeartIcon} 
                  color={{ r: 244, g: 114, b: 182 }}
                  onClick={() => console.log('Like')}
                />
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800 mb-2">
              <strong>✅ 测试指南：</strong>尝试快速点击按钮（按下少于200ms），观察动画如何从中间值平滑回退
            </p>
            <p className="text-xs text-green-700">
              按钮图标始终清晰！只有背景模糊，图标永远锐利。和卡片中心图标完全一样的双层结构。
            </p>
          </div>
        </Section>

        {/* Section 2: Cards (reuse v1.6) */}
        <Section title="📦 Borderless Cards" subtitle="复用 v1.6 卡片（Hover 回退正常）">
          <div className="grid md:grid-cols-3 gap-8">
            <BorderlessCardV1_6
              title="文档.zip"
              subtitle="89 个文件"
              icon={FileTextIcon}
              iconColor={{ r: 34, g: 197, b: 94 }}
              onClick={() => console.log('Click: 文档.zip')}
            />
            
            <BorderlessCardV1_6
              title="项目.zip"
              subtitle="245 个文件"
              icon={FileArchive}
              iconColor={{ r: 167, g: 139, b: 250 }}
              onClick={() => console.log('Click: 项目.zip')}
            />
            
            <BorderlessCardV1_6
              title="照片.zip"
              subtitle="512 个文件"
              icon={ImageIcon}
              iconColor={{ r: 244, g: 114, b: 182 }}
              onClick={() => console.log('Click: 照片.zip')}
            />
          </div>
          
          <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-sm text-purple-800">
              ✅ 卡片组件复用 v1.6 版本（Hover 回退已修复）
            </p>
          </div>
        </Section>

        {/* Section 3: Inputs (reuse v1.5) */}
        <Section title="📝 Borderless Inputs" subtitle="复用 v1.5 输入框（边缘重合已修复）">
          <div className="space-y-6 max-w-md">
            <BorderlessInputV1_5
              placeholder="搜索"
              icon={SearchIcon}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            
            <BorderlessInputV1_5
              placeholder="筛选"
              icon={FilterIcon}
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />
            
            <BorderlessInputV1_5
              placeholder="输入文件名"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        </Section>

        {/* Section 4: v1.7 Changes Summary */}
        <Section title="🔧 v1.7 修改总结" subtitle="2 Critical Improvements">
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Change 1: Double-layer */}
            <div className="p-6 rounded-xl bg-white border-2 border-cyan-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-700 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-medium text-cyan-900">按钮双层结构</h3>
                  <p className="text-xs text-cyan-700 mt-1">Button Double-Layer Structure</p>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-red-700 font-medium mb-1">❌ v1.6 问题：</p>
                  <p className="text-xs text-slate-600">
                    按钮是单层结构，filter: blur(5px) 作用在整个按钮上，导致图标也被模糊
                  </p>
                </div>
                
                <div>
                  <p className="text-cyan-700 font-medium mb-1">✅ v1.7 修正：</p>
                  <p className="text-xs text-slate-600">
                    双层结构：层1彩色背景（可模糊），层2透明容器+白色图标（永远清晰），完全遵循"核心如晶"原则
                  </p>
                </div>
                
                <div className="p-3 bg-cyan-50 rounded-lg">
                  <code className="text-xs font-mono text-cyan-800 block">
                    层1: absolute, blur(5px)<br/>
                    层2: relative, zIndex:10, 图标清晰<br/>
                    = 卡片图标结构
                  </code>
                </div>
              </div>
            </div>
            
            {/* Change 2: Press brighten */}
            <div className="p-6 rounded-xl bg-white border-2 border-rose-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-rose-700 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-medium text-rose-900">点击态变亮可打断</h3>
                  <p className="text-xs text-rose-700 mt-1">Press Brighten Interruptible</p>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-red-700 font-medium mb-1">❌ v1.6 问题：</p>
                  <p className="text-xs text-slate-600">
                    brightness(0.92) 变暗，150ms，不符合"发光"的视觉语言
                  </p>
                </div>
                
                <div>
                  <p className="text-rose-700 font-medium mb-1">✅ v1.7 修正：</p>
                  <p className="text-xs text-slate-600">
                    brightness(1.15) 变亮15%，200ms，像发光一样。动画可被打断，从当前值平滑过渡
                  </p>
                </div>
                
                <div className="p-3 bg-rose-50 rounded-lg">
                  <code className="text-xs font-mono text-rose-800 block">
                    变亮: 1.0 → 1.15<br/>
                    200ms可打断<br/>
                    作用范围: 背景+光晕+图标
                  </code>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-6 bg-gradient-to-r from-cyan-50 to-rose-50 rounded-xl border-2 border-cyan-200">
            <h4 className="font-medium text-slate-900 mb-3">核心设计原则</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-white rounded-lg">
                <p className="font-medium text-cyan-900 mb-1">边缘如雾（Edges Like Mist）</p>
                <p className="text-xs text-slate-600">背景层可以模糊，创造雾气般的边缘效果</p>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <p className="font-medium text-rose-900 mb-1">核心如晶（Core Like Crystal）</p>
                <p className="text-xs text-slate-600">图标层永远清晰，像水晶一样锐利透明</p>
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
{`创建 v1.7 - 按钮双层结构 + 点击态变亮

文件: src/pages/17-ComponentLibraryV1.7.tsx

===  修改1: 按钮双层结构（图标清晰）===

问题：
  v1.6按钮是单层，filter: blur(5px) 作用在整个按钮
  导致图标也被模糊，不符合"核心如晶"原则

解决方案：
  按钮分为2层（和卡片图标部分完全一样的结构）
  
层1 - 彩色背景层（可模糊）：
  - motion.div, position: absolute
  - filter: blur(5px) 作用在这层
  - boxShadow: 光晕在这层
  - pointerEvents: none

层2 - 白色图标层（永远清晰）：
  - motion.button, position: relative, zIndex: 10
  - background: transparent
  - Icon 组件，永远清晰
  - 事件绑定在这层

===  修改2: 点击态变亮 ===

v1.6问题：
  - brightness(0.92) → 变暗8%
  - 150ms

v1.7修正：
  - brightness(1.15) → 变亮15%
  - 200ms
  - 可被打断

技术实现：
  - 变亮作用在整个按钮容器（包括下层背景和光晕）
  - Framer Motion自动处理打断
  - 动画从"当前值"开始新过渡，无需手动控制

动画打断示例：
  按下100ms: 1.0 → 1.075（中间值）→ 松开 → 1.075 → 1.0
  按下200ms: 1.0 → 1.15（完整）→ 松开 → 1.15 → 1.0
  快速50ms: 1.0 → 1.0375 → 松开 → 1.0375 → 1.0

关键点：
  - onMouseLeave重置isPressed（避免状态卡住）
  - 动画从当前值平滑过渡，不跳跃
  - 无需特殊配置，Framer Motion默认实现

组件文件:
- BorderlessButtonV1_7.tsx (新建，双层结构)
- BorderlessCardV1_6.tsx (复用v1.6)
- BorderlessInputV1_5.tsx (复用v1.5)

导航: 第17个按钮，rose-500 to rose-600`}
              </pre>
            </div>
            
            {/* 英文版 */}
            <div>
              <h4 className="text-sm text-slate-400 mb-2">Prompt (English Version)</h4>
              <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono">
{`Create v1.7 - Button double-layer structure + Press brighten

File: src/pages/17-ComponentLibraryV1.7.tsx

===  Fix 1: Button double-layer structure (icon sharp) ===

Problem:
  v1.6 button is single layer, filter: blur(5px) affects whole button
  Icon also gets blurred, violates "core like crystal" principle

Solution:
  Button split into 2 layers (same as card icon structure)
  
Layer 1 - Color background (can blur):
  - motion.div, position: absolute
  - filter: blur(5px) acts on this layer
  - boxShadow: glow on this layer
  - pointerEvents: none

Layer 2 - White icon (always sharp):
  - motion.button, position: relative, zIndex: 10
  - background: transparent
  - Icon component, always sharp
  - Events bound to this layer

===  Fix 2: Press state brightens ===

v1.6 issue:
  - brightness(0.92) → darken 8%
  - 150ms

v1.7 fix:
  - brightness(1.15) → brighten 15%
  - 200ms
  - Interruptible

Technical implementation:
  - Brighten affects whole button container (including background and glow)
  - Framer Motion automatically handles interruption
  - Animation starts from "current value" for new transition, no manual control

Animation interruption examples:
  Press 100ms: 1.0 → 1.075 (middle) → Release → 1.075 → 1.0
  Press 200ms: 1.0 → 1.15 (complete) → Release → 1.15 → 1.0
  Quick 50ms: 1.0 → 1.0375 → Release → 1.0375 → 1.0

Key points:
  - onMouseLeave resets isPressed (avoid stuck state)
  - Animation smoothly transitions from current value, no jumps
  - No special configuration, Framer Motion default behavior

Component files:
- BorderlessButtonV1_7.tsx (new, double-layer structure)
- BorderlessCardV1_6.tsx (reuse v1.6)
- BorderlessInputV1_5.tsx (reuse v1.5)

Navigation: Button 17, rose-500 to rose-600`}
              </pre>
            </div>
            
            {/* 元数据 */}
            <div className="text-xs text-slate-400 pt-4 border-t border-slate-700 space-y-1">
              <p>生成日期: 2025-11-02</p>
              <p>Prompt文件: prompt-02.17-button-structure-v1.7.md</p>
              <p>探索方向: 按钮双层结构，图标清晰，点击态��亮可打断</p>
              <p>技术突破: 动画打断机制（从当前值平滑回退）</p>
              <p>核心原则: 边缘如雾，核心如晶</p>
              <p>新组件: BorderlessButtonV1_7</p>
              <p>复用组件: BorderlessCardV1_6, BorderlessInputV1_5</p>
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
