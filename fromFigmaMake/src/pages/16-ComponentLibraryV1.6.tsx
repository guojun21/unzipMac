import { motion } from "motion/react";
import { BorderlessCardV1_6 } from "../components/borderless/BorderlessCardV1_6";
import { BorderlessButtonV1_6 } from "../components/borderless/BorderlessButtonV1_6";
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
} from "lucide-react";
import { useState } from "react";

interface ComponentLibraryV1_6Props {
  onBack?: () => void;
}

export default function ComponentLibraryV1_6({ onBack }: ComponentLibraryV1_6Props) {
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
                <h1 className="text-5xl">Component Library v1.6</h1>
              </div>
              <p className="text-xl text-slate-600">
                修正：Hover完美回退 · 按钮无边缘线条
              </p>
              <p className="text-sm text-slate-500 mt-2">
                Fixed: Perfect Hover Leave · Button No Edge Line
              </p>
              
              {/* Fix badges */}
              <div className="mt-4 flex gap-3 flex-wrap text-sm">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                  ✅ Hover完美回退
                </span>
                <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full font-medium">
                  ✅ 按钮无边缘
                </span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">
                  ✅ 纯净图标背景
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

        {/* Section 1: Cards - Test Hover Leave */}
        <Section title="📦 Borderless Cards" subtitle="测试 Hover 回退 · 控制台查看日志">
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
            
            <BorderlessCardV1_6
              title="备份.rar"
              subtitle="128 个文件"
              icon={Archive}
              iconColor={{ r: 251, g: 146, b: 60 }}
              onClick={() => console.log('Click: 备份.rar')}
            />
            
            <BorderlessCardV1_6
              title="代码.tar.gz"
              subtitle="1024 个文件"
              icon={FolderIcon}
              iconColor={{ r: 6, g: 182, b: 212 }}
              onClick={() => console.log('Click: 代码.tar.gz')}
            />
            
            <BorderlessCardV1_6
              title="视频.zip"
              subtitle="36 个文件"
              icon={VideoIcon}
              iconColor={{ r: 239, g: 68, b: 68 }}
              onClick={() => console.log('Click: 视频.zip')}
            />
          </div>
          
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800 mb-2">
              <strong>✅ 修复验证：</strong>Hover到卡片再移开，应该能回到雾气态（边缘7px模糊）
            </p>
            <p className="text-xs text-green-700">
              打开浏览器控制台，观察 "Mouse Enter" 和 "Mouse Leave" 日志，以及边缘状态变化。
            </p>
            <div className="mt-3 space-y-1 text-xs font-mono text-green-800 bg-green-100 p-3 rounded">
              <div>修复方法：</div>
              <div>1. Hover事件绑定在最外层div</div>
              <div>2. 所有内层元素 pointerEvents: 'none'</div>
              <div>3. useEffect 完整处理 else 分支</div>
            </div>
          </div>
        </Section>

        {/* Section 2: Buttons - No Edge Line */}
        <Section title="🔘 Borderless Buttons" subtitle="无边缘线条 · 纯净图标背景">
          <div className="space-y-8">
            
            {/* Size examples */}
            <div className="space-y-3">
              <h3 className="text-base font-medium text-slate-700">尺寸示例</h3>
              <p className="text-xs text-slate-500">sm (40×40px) · md (56×56px) · lg (72×72px)</p>
              <div className="flex gap-6 items-center">
                <BorderlessButtonV1_6 
                  icon={UploadIcon} 
                  size="sm" 
                  color={{ r: 6, g: 182, b: 212 }}
                  onClick={() => console.log('Upload (sm)')}
                />
                <BorderlessButtonV1_6 
                  icon={UploadIcon} 
                  size="md" 
                  color={{ r: 6, g: 182, b: 212 }}
                  onClick={() => console.log('Upload (md)')}
                />
                <BorderlessButtonV1_6 
                  icon={UploadIcon} 
                  size="lg" 
                  color={{ r: 6, g: 182, b: 212 }}
                  onClick={() => console.log('Upload (lg)')}
                />
              </div>
            </div>
            
            {/* Color examples */}
            <div className="space-y-4">
              <h3 className="text-base font-medium text-slate-700">颜色区分用途</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Primary - Cyan */}
                <div className="space-y-3">
                  <p className="text-xs text-slate-500 font-medium">主要操作（青色）</p>
                  <div className="flex gap-3 flex-wrap">
                    <BorderlessButtonV1_6 
                      icon={UploadIcon} 
                      color={{ r: 6, g: 182, b: 212 }}
                      onClick={() => console.log('Upload')}
                    />
                    <BorderlessButtonV1_6 
                      icon={DownloadIcon} 
                      color={{ r: 6, g: 182, b: 212 }}
                      onClick={() => console.log('Download')}
                    />
                    <BorderlessButtonV1_6 
                      icon={FolderPlusIcon} 
                      color={{ r: 6, g: 182, b: 212 }}
                      onClick={() => console.log('New Folder')}
                    />
                  </div>
                </div>
                
                {/* Success - Green */}
                <div className="space-y-3">
                  <p className="text-xs text-slate-500 font-medium">成功操作（绿色）</p>
                  <div className="flex gap-3 flex-wrap">
                    <BorderlessButtonV1_6 
                      icon={CheckIcon} 
                      color={{ r: 34, g: 197, b: 94 }}
                      onClick={() => console.log('Check')}
                    />
                    <BorderlessButtonV1_6 
                      icon={CheckCircleIcon} 
                      color={{ r: 34, g: 197, b: 94 }}
                      onClick={() => console.log('Confirm')}
                    />
                  </div>
                </div>
                
                {/* Danger - Red */}
                <div className="space-y-3">
                  <p className="text-xs text-slate-500 font-medium">危险操作（红色）</p>
                  <div className="flex gap-3 flex-wrap">
                    <BorderlessButtonV1_6 
                      icon={TrashIcon} 
                      color={{ r: 239, g: 68, b: 68 }}
                      onClick={() => console.log('Delete')}
                    />
                    <BorderlessButtonV1_6 
                      icon={XIcon} 
                      color={{ r: 239, g: 68, b: 68 }}
                      onClick={() => console.log('Close')}
                    />
                  </div>
                </div>
                
                {/* Secondary - Gray */}
                <div className="space-y-3">
                  <p className="text-xs text-slate-500 font-medium">次要操作（灰色）</p>
                  <div className="flex gap-3 flex-wrap">
                    <BorderlessButtonV1_6 
                      icon={SettingsIcon} 
                      color={{ r: 100, g: 116, b: 139 }}
                      onClick={() => console.log('Settings')}
                    />
                    <BorderlessButtonV1_6 
                      icon={MoreHorizontalIcon} 
                      color={{ r: 100, g: 116, b: 139 }}
                      onClick={() => console.log('More')}
                    />
                  </div>
                </div>
              </div>
              
              {/* Other colors */}
              <div className="space-y-3">
                <p className="text-xs text-slate-500 font-medium">其他颜色</p>
                <div className="flex gap-3 flex-wrap">
                  <BorderlessButtonV1_6 
                    icon={StarIcon} 
                    color={{ r: 167, g: 139, b: 250 }}
                    onClick={() => console.log('Favorite')}
                  />
                  <BorderlessButtonV1_6 
                    icon={AlertTriangleIcon} 
                    color={{ r: 251, g: 146, b: 60 }}
                    onClick={() => console.log('Warning')}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-sky-50 rounded-lg border border-sky-200">
            <p className="text-sm text-sky-800 mb-2">
              <strong>✅ 按钮完全重新设计：</strong>无任何边缘线条层！就是纯净的彩色图标背景。
            </p>
            <p className="text-xs text-sky-700">
              按钮 = 彩色圆角矩形 + 模糊效果 + 白色图标，完全等同于卡片内部的图标部分。
            </p>
            <div className="mt-3 space-y-1 text-xs font-mono text-sky-800 bg-sky-100 p-3 rounded">
              <div>结构：motion.button（无��层容器）</div>
              <div>雾气态：blur(5px) + 30px 光晕</div>
              <div>凝结态：blur(0px) + 20px 光晕</div>
              <div>点击态：brightness(0.92) + 150ms</div>
            </div>
          </div>
        </Section>

        {/* Section 3: Inputs */}
        <Section title="📝 Borderless Inputs" subtitle="输入框（边缘重合）">
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
          
          <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-sm text-purple-800">
              ✅ v1.5 已修复：凝结态（focus）时，边缘和输入框边界完美重合。
            </p>
          </div>
        </Section>

        {/* Section 4: v1.6 Fixes Summary */}
        <Section title="🔧 v1.6 修复总结" subtitle="2 Critical Fixes">
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Fix 1: Hover Leave */}
            <div className="p-6 rounded-xl bg-white border-2 border-green-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-700 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-medium text-green-900">Hover 完美回退</h3>
                  <p className="text-xs text-green-700 mt-1">Perfect Hover Leave</p>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-red-700 font-medium mb-1">❌ v1.5 问题：</p>
                  <p className="text-xs text-slate-600">
                    onMouseLeave 可能不触发，或被子元素阻挡
                  </p>
                </div>
                
                <div>
                  <p className="text-green-700 font-medium mb-1">✅ v1.6 修复：</p>
                  <p className="text-xs text-slate-600">
                    Hover事件在最外层div，所有内层元素 pointerEvents: 'none'，确保事件不被阻挡
                  </p>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <code className="text-xs font-mono text-green-800 block">
                    最外层div: hover事件<br/>
                    所有内层: pointerEvents: 'none'<br/>
                    结果: 完美触发 leave
                  </code>
                </div>
              </div>
            </div>
            
            {/* Fix 2: No Edge Line */}
            <div className="p-6 rounded-xl bg-white border-2 border-cyan-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-700 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-medium text-cyan-900">按钮无边缘线条</h3>
                  <p className="text-xs text-cyan-700 mt-1">Button No Edge Line</p>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-red-700 font-medium mb-1">❌ v1.5 问题：</p>
                  <p className="text-xs text-slate-600">
                    按钮有独立的边缘线条层，结构复杂
                  </p>
                </div>
                
                <div>
                  <p className="text-cyan-700 font-medium mb-1">✅ v1.6 修复：</p>
                  <p className="text-xs text-slate-600">
                    完全移除边缘线条层！按钮就是纯净的图标背景：彩色圆角矩形 + 模糊 + 图标
                  </p>
                </div>
                
                <div className="p-3 bg-cyan-50 rounded-lg">
                  <code className="text-xs font-mono text-cyan-800 block">
                    结构: motion.button<br/>
                    无边缘层<br/>
                    = 卡片的图标背景部分
                  </code>
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
{`创建 v1.6 - 修复hover回退 + 按钮简化

文件: src/pages/16-ComponentLibraryV1.6.tsx

===  修复1: 卡片hover回退问题 ===

问题诊断：
- onMouseLeave可能没有绑定到正确的元素
- 或者hover区域冲突
- 或者z-index导致事件被阻挡

修复方案：
- Hover事件在最外层div
- 所有内层元素 pointerEvents: 'none'
- 确保useEffect的else分支完整
- console.log验证事件触发

===  修复2: 按钮移除边缘线条 ===

按钮就是卡片中心的图标背景部分！
不需要外层边缘线条，只需要图标背景的模糊效果。

按钮特点：
- 无边缘线条层（完全移除）
- 只有彩色背景 + 模糊效果 + 图标
- 等同于卡片的图标背景部分
- 更简洁，更纯粹

雾气态：
  - filter: blur(5px) → 背景模糊
  - boxShadow: 30px spread光晕
  - 无边缘线条！

凝结态（hover）：
  - filter: blur(0px) → 背景清晰
  - boxShadow: 20px spread光晕收紧
  - 无边缘线条！

点击态：
  - filter: brightness(0.92) → 变暗
  - 150ms快速

组件文件:
- BorderlessCardV1_6.tsx (新建，hover修复)
- BorderlessButtonV1_6.tsx (新建，无边缘线条)
- BorderlessInputV1_5.tsx (复用v1.5)

导航: 第16个按钮，emerald-500 to emerald-600`}
              </pre>
            </div>
            
            {/* 英文版 */}
            <div>
              <h4 className="text-sm text-slate-400 mb-2">Prompt (English Version)</h4>
              <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono">
{`Create v1.6 - Fix hover leave + Simplify buttons

File: src/pages/16-ComponentLibraryV1.6.tsx

===  FIX 1: Card onMouseLeave not triggering ===

Fix approach:
- Bind hover events to outermost container
- All inner layers: pointerEvents: 'none'
- Ensure useEffect else branch complete
- Add console.log to verify

===  FIX 2: Button has no edge line ===

Button = Card's center icon background part!
No edge blur line, only icon background blur effect.

Button features:
- NO edge line layer (completely removed)
- Only colored background + blur + icon
- Same as card's icon background
- More pure, more clean

Mist state:
  - filter: blur(5px) → background blur
  - boxShadow: 30px spread glow
  - NO edge line!

Condensed state (hover):
  - filter: blur(0px) → background clear
  - boxShadow: 20px spread glow tighten
  - NO edge line!

Pressed state:
  - filter: brightness(0.92) → darken
  - 150ms fast

Component files:
- BorderlessCardV1_6.tsx (new, hover fixed)
- BorderlessButtonV1_6.tsx (new, no edge line)
- BorderlessInputV1_5.tsx (reuse v1.5)

Navigation: Button 16, emerald-500 to emerald-600`}
              </pre>
            </div>
            
            {/* 元数据 */}
            <div className="text-xs text-slate-400 pt-4 border-t border-slate-700 space-y-1">
              <p>生成日期: 2025-11-02</p>
              <p>Prompt文件: prompt-02.16-component-fixes-v1.6.md</p>
              <p>探索方向: 修复hover回退、按钮简化（无边缘）</p>
              <p>修复问题: 2个关键交互问题</p>
              <p>新组件: BorderlessCardV1_6, BorderlessButtonV1_6</p>
              <p>复用组件: BorderlessInputV1_5</p>
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
