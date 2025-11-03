import { motion } from "motion/react";
import { BorderlessCard } from "../components/borderless/BorderlessCard";
import { BorderlessButtonV1_5 } from "../components/borderless/BorderlessButtonV1_5";
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
  Share2 as ShareIcon,
  Edit as EditIcon,
} from "lucide-react";
import { useState } from "react";

interface ComponentLibraryV1_5Props {
  onBack?: () => void;
}

export default function ComponentLibraryV1_5({ onBack }: ComponentLibraryV1_5Props) {
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
                <h1 className="text-5xl">Component Library v1.5</h1>
              </div>
              <p className="text-xl text-slate-600">
                修正：Hover可回退 · 按钮=图标背景 · 颜色区分 · 边缘重合
              </p>
              <p className="text-sm text-slate-500 mt-2">
                Fixed: Hover Revertible · Button=Icon · Color-based · Edge Aligned
              </p>
              
              {/* Fix badges */}
              <div className="mt-4 flex gap-3 flex-wrap text-sm">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                  ✅ Hover可回退
                </span>
                <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full font-medium">
                  ✅ 按钮=图标背景
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                  ✅ 颜色区分用途
                </span>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full font-medium">
                  ✅ 边缘完美重合
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

        {/* Section 1: Cards - Hover Revertible */}
        <Section title="📦 Borderless Cards" subtitle="无界卡片 · Hover可回退到雾气态">
          <div className="grid md:grid-cols-3 gap-8">
            <BorderlessCard
              title="文档.zip"
              subtitle="89 个文件"
              icon={FileTextIcon}
              iconColor={{ r: 34, g: 197, b: 94 }}  // Green
              onClick={() => console.log('Click: 文档.zip')}
            />
            
            <BorderlessCard
              title="项目.zip"
              subtitle="245 个文件"
              icon={FileArchive}
              iconColor={{ r: 167, g: 139, b: 250 }}  // Purple
              onClick={() => console.log('Click: 项目.zip')}
            />
            
            <BorderlessCard
              title="照片.zip"
              subtitle="512 个文件"
              icon={ImageIcon}
              iconColor={{ r: 244, g: 114, b: 182 }}  // Pink
              onClick={() => console.log('Click: 照片.zip')}
            />
            
            <BorderlessCard
              title="备份.rar"
              subtitle="128 个文件"
              icon={Archive}
              iconColor={{ r: 251, g: 146, b: 60 }}  // Orange
              onClick={() => console.log('Click: 备份.rar')}
            />
            
            <BorderlessCard
              title="代码.tar.gz"
              subtitle="1024 个文件"
              icon={FolderIcon}
              iconColor={{ r: 6, g: 182, b: 212 }}  // Cyan
              onClick={() => console.log('Click: 代码.tar.gz')}
            />
            
            <BorderlessCard
              title="视频.zip"
              subtitle="36 个文件"
              icon={VideoIcon}
              iconColor={{ r: 239, g: 68, b: 68 }}  // Red
              onClick={() => console.log('Click: 视频.zip')}
            />
          </div>
          
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800">
              ✅ <strong>修复验证：</strong>Hover到卡片再移开，应该能回到雾气态（边缘线条重新展开并模糊）。
              onMouseLeave正确触发，useEffect的else分支完整执行。
            </p>
          </div>
        </Section>

        {/* Section 2: Buttons - Icon Background Only */}
        <Section title="🔘 Borderless Buttons" subtitle="无界按钮 · 就是图标背景部分">
          <div className="space-y-8">
            
            {/* Primary actions - Cyan */}
            <div className="space-y-3">
              <h3 className="text-base font-medium text-slate-700">主要操作（青色 Cyan）</h3>
              <div className="flex gap-4 flex-wrap items-end">
                <BorderlessButtonV1_5 
                  icon={UploadIcon} 
                  color={{ r: 6, g: 182, b: 212 }}
                  size="lg"
                  onClick={() => console.log('Upload')}
                />
                <BorderlessButtonV1_5 
                  icon={DownloadIcon} 
                  color={{ r: 6, g: 182, b: 212 }}
                  size="md"
                  onClick={() => console.log('Download')}
                />
                <BorderlessButtonV1_5 
                  icon={FolderPlusIcon} 
                  color={{ r: 6, g: 182, b: 212 }}
                  size="sm"
                  onClick={() => console.log('New Folder')}
                />
              </div>
            </div>
            
            {/* Success actions - Green */}
            <div className="space-y-3">
              <h3 className="text-base font-medium text-slate-700">成功操作（绿色 Green）</h3>
              <div className="flex gap-4 flex-wrap">
                <BorderlessButtonV1_5 
                  icon={CheckIcon} 
                  color={{ r: 34, g: 197, b: 94 }}
                  size="md"
                  onClick={() => console.log('Check')}
                />
                <BorderlessButtonV1_5 
                  icon={CheckCircleIcon} 
                  color={{ r: 34, g: 197, b: 94 }}
                  size="md"
                  onClick={() => console.log('Confirm')}
                />
              </div>
            </div>
            
            {/* Danger actions - Red */}
            <div className="space-y-3">
              <h3 className="text-base font-medium text-slate-700">危险操作（红色 Red）</h3>
              <div className="flex gap-4 flex-wrap">
                <BorderlessButtonV1_5 
                  icon={TrashIcon} 
                  color={{ r: 239, g: 68, b: 68 }}
                  size="md"
                  onClick={() => console.log('Delete')}
                />
                <BorderlessButtonV1_5 
                  icon={XIcon} 
                  color={{ r: 239, g: 68, b: 68 }}
                  size="md"
                  onClick={() => console.log('Close')}
                />
              </div>
            </div>
            
            {/* Secondary actions - Gray */}
            <div className="space-y-3">
              <h3 className="text-base font-medium text-slate-700">次要操作（灰色 Slate）</h3>
              <div className="flex gap-4 flex-wrap">
                <BorderlessButtonV1_5 
                  icon={SettingsIcon} 
                  color={{ r: 100, g: 116, b: 139 }}
                  size="md"
                  onClick={() => console.log('Settings')}
                />
                <BorderlessButtonV1_5 
                  icon={MoreHorizontalIcon} 
                  color={{ r: 100, g: 116, b: 139 }}
                  size="md"
                  onClick={() => console.log('More')}
                />
                <BorderlessButtonV1_5 
                  icon={ShareIcon} 
                  color={{ r: 100, g: 116, b: 139 }}
                  size="md"
                  onClick={() => console.log('Share')}
                />
              </div>
            </div>
            
            {/* Other actions - Purple/Orange */}
            <div className="space-y-3">
              <h3 className="text-base font-medium text-slate-700">其他操作（紫色 Purple / 橙色 Orange）</h3>
              <div className="flex gap-4 flex-wrap">
                <BorderlessButtonV1_5 
                  icon={StarIcon} 
                  color={{ r: 167, g: 139, b: 250 }}
                  size="md"
                  onClick={() => console.log('Favorite')}
                />
                <BorderlessButtonV1_5 
                  icon={AlertTriangleIcon} 
                  color={{ r: 251, g: 146, b: 60 }}
                  size="md"
                  onClick={() => console.log('Warning')}
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
            <p className="text-sm text-cyan-800">
              ✅ <strong>按钮重新设计：</strong>按钮就是卡片内部的图标背景部分！56×56px圆角矩形+图标，
              结构完全一样，只是尺寸不同（sm: 40px, md: 56px, lg: 72px）。
            </p>
            <p className="text-xs text-cyan-700 mt-2">
              无primary/secondary之分，用颜色表达用途：青色=主要、绿色=成功、红色=危险、灰色=次要、
              紫色/橙色=其他。所有按钮结构完全相同！
            </p>
          </div>
        </Section>

        {/* Section 3: Inputs - Edge Aligned */}
        <Section title="📝 Borderless Inputs" subtitle="无界输入框 · 边缘完美重合">
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
              icon={EditIcon}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          
          <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-sm text-purple-800">
              ✅ <strong>边缘重合修复：</strong>凝结态（focus）时，外层边缘1px和输入框边缘完美重合，
              不是分离的两层。边缘层使用 <code className="font-mono text-purple-700">inset: 0</code> 实现完美对齐。
            </p>
            <div className="mt-3 text-xs font-mono text-purple-700 space-y-1">
              <div>边缘层：inset: 0（完全贴合输入框）</div>
              <div>输入框：无独立border</div>
              <div>效果：边缘和内容边界完全重合</div>
            </div>
          </div>
        </Section>

        {/* Section 4: v1.5 Fixes Summary */}
        <Section title="🔧 v1.5 修复总结" subtitle="4 Issues Fixed">
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Fix 1: Hover Revertible */}
            <div className="p-6 rounded-xl bg-white border-2 border-green-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-700 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-medium text-green-900">Hover可回退</h3>
                  <p className="text-xs text-green-700 mt-1">Hover Revertible</p>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-red-700 font-medium mb-1">❌ v1.4 问题：</p>
                  <p className="text-xs text-slate-600">
                    卡片hover后无法回到雾气态，边缘线条不会重新展开和模糊
                  </p>
                </div>
                
                <div>
                  <p className="text-green-700 font-medium mb-1">✅ v1.5 修复：</p>
                  <p className="text-xs text-slate-600">
                    确保onMouseLeave正确触发，useEffect的else分支完整执行边缘线条反向动画
                  </p>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <code className="text-xs font-mono text-green-800 block">
                    useEffect(() =&gt; &#123;<br/>
                    &nbsp;&nbsp;if (isHovered) &#123; ... &#125;<br/>
                    &nbsp;&nbsp;else &#123; // 恢复雾气态 &#125;<br/>
                    &#125;, [isHovered]);
                  </code>
                </div>
              </div>
            </div>
            
            {/* Fix 2: Button Structure */}
            <div className="p-6 rounded-xl bg-white border-2 border-cyan-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-700 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-medium text-cyan-900">按钮=图标背景</h3>
                  <p className="text-xs text-cyan-700 mt-1">Button = Icon Background</p>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-red-700 font-medium mb-1">❌ v1.4 问题：</p>
                  <p className="text-xs text-slate-600">
                    按钮是完整卡片结构，过于复杂，不够简洁
                  </p>
                </div>
                
                <div>
                  <p className="text-cyan-700 font-medium mb-1">✅ v1.5 修复：</p>
                  <p className="text-xs text-slate-600">
                    按钮就是卡片内部的彩色图标背景部分！56×56px圆角矩形+图标，结构完全一样
                  </p>
                </div>
                
                <div className="p-3 bg-cyan-50 rounded-lg">
                  <code className="text-xs font-mono text-cyan-800 block">
                    尺寸: sm(40px), md(56px), lg(72px)<br/>
                    边缘: 和图标背景相同的模糊逻辑<br/>
                    无外层大容器
                  </code>
                </div>
              </div>
            </div>
            
            {/* Fix 3: Color-based */}
            <div className="p-6 rounded-xl bg-white border-2 border-purple-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-700 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-medium text-purple-900">颜色区分用途</h3>
                  <p className="text-xs text-purple-700 mt-1">Color-based Differentiation</p>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-red-700 font-medium mb-1">❌ v1.4 问题：</p>
                  <p className="text-xs text-slate-600">
                    使用variant="primary/secondary"区分主次，样式不同
                  </p>
                </div>
                
                <div>
                  <p className="text-purple-700 font-medium mb-1">✅ v1.5 修复：</p>
                  <p className="text-xs text-slate-600">
                    取消variant概念，只用color参数区分：青色=主要、绿色=成功、红色=危险、灰色=次要
                  </p>
                </div>
                
                <div className="p-3 bg-purple-50 rounded-lg space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ background: 'rgb(6,182,212)' }}></div>
                    <span>青色 Cyan - 主要操作</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ background: 'rgb(34,197,94)' }}></div>
                    <span>绿色 Green - 成功操作</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ background: 'rgb(239,68,68)' }}></div>
                    <span>红色 Red - 危险操作</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ background: 'rgb(100,116,139)' }}></div>
                    <span>灰色 Slate - 次要操作</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Fix 4: Edge Aligned */}
            <div className="p-6 rounded-xl bg-white border-2 border-amber-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-700 font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-medium text-amber-900">边缘完美重合</h3>
                  <p className="text-xs text-amber-700 mt-1">Edge Perfectly Aligned</p>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-red-700 font-medium mb-1">❌ v1.4 问题：</p>
                  <p className="text-xs text-slate-600">
                    输入框凝结态有两层边缘，边缘层和输入框边缘分离
                  </p>
                </div>
                
                <div>
                  <p className="text-amber-700 font-medium mb-1">✅ v1.5 修复：</p>
                  <p className="text-xs text-slate-600">
                    边缘层使用inset: 0，和输入框边缘完美重合。凝结态1px边缘紧贴输入框边界
                  </p>
                </div>
                
                <div className="p-3 bg-amber-50 rounded-lg">
                  <code className="text-xs font-mono text-amber-800 block">
                    边缘层: inset: 0, zIndex: 2<br/>
                    输入框: zIndex: 1, 无独立border<br/>
                    效果: 边缘1px紧贴边界
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
{`修正 v1.4 的4个问题

问题1: 卡片hover后无法回到雾气态
修复: 确保onMouseLeave正确触发，useEffect的else分支完整

问题2: 按钮结构错误（不是完整卡片）
修复: 按钮=卡片内部图标背景部分，56×56px圆角矩形+图标
      尺寸: sm(40px), md(56px), lg(72px)
      边缘动画和图标背景完全相同

问题3: 不需要次要按钮概念
修复: 只有一种按钮样式，用color参数区分
      青色=主要、绿色=成功、红色=危险、灰色=次要
      所有按钮结构完全相同

问题4: 输入框凝结态两层边缘
修复: 边缘层inset:0，和输入框边缘重合
      无独立box-shadow，凝结态1px紧贴边界

组件文件:
- BorderlessCard.tsx (已存在，hover逻辑正确)
- BorderlessButtonV1_5.tsx (新建，图标背景结构)
- BorderlessInputV1_5.tsx (新建，边缘重合)

导航: 第15个按钮，lime-400 to lime-500`}
              </pre>
            </div>
            
            {/* 英文版 */}
            <div>
              <h4 className="text-sm text-slate-400 mb-2">Prompt (English Version)</h4>
              <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono">
{`Fix 4 issues from v1.4

Issue 1: Card can't return to mist after hover
Fix: Ensure onMouseLeave triggers, useEffect else branch complete

Issue 2: Button structure wrong (not full card)
Fix: Button = card icon background part, 56×56px rounded rect + icon
     Sizes: sm(40px), md(56px), lg(72px)
     Edge animation same as icon background

Issue 3: No need for secondary button concept
Fix: One button style, use color to differentiate
     Cyan=primary, Green=success, Red=danger, Gray=secondary
     All buttons have identical structure

Issue 4: Input condensed state has double edges
Fix: Edge layer inset:0, aligns with input edge
     No separate box-shadow, condensed 1px aligns with border

Component files:
- BorderlessCard.tsx (existing, hover logic correct)
- BorderlessButtonV1_5.tsx (new, icon background structure)
- BorderlessInputV1_5.tsx (new, edge aligned)

Navigation: Button 15, lime-400 to lime-500`}
              </pre>
            </div>
            
            {/* 元数据 */}
            <div className="text-xs text-slate-400 pt-4 border-t border-slate-700 space-y-1">
              <p>生成日期: 2025-11-02</p>
              <p>Prompt文件: prompt-02.15-component-fixes-v1.5.md</p>
              <p>探索方向: 修复hover回退、按钮结构、颜色区分、边缘重合</p>
              <p>修复问题: 4个组件交互和结构问题</p>
              <p>新组件: BorderlessButtonV1_5, BorderlessInputV1_5</p>
              <p>复用组件: BorderlessCard (v1.4版本已正确)</p>
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
