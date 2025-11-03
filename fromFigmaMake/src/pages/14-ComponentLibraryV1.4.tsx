import { motion } from "motion/react";
import { BorderlessCard } from "../components/borderless/BorderlessCard";
import { BorderlessButton } from "../components/borderless/BorderlessButton";
import { BorderlessInput } from "../components/borderless/BorderlessInput";
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
  Share as ShareIcon,
  Settings as SettingsIcon,
  Search as SearchIcon,
  MoreHorizontal as MoreIcon,
  Filter as FilterIcon,
  Edit as EditIcon,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";

interface ComponentLibraryV1_4Props {
  onBack?: () => void;
}

export default function ComponentLibraryV1_4({ onBack }: ComponentLibraryV1_4Props) {
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");

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
                <h1 className="text-5xl">Component Library v1.4</h1>
              </div>
              <p className="text-xl text-slate-600">完整组件库 · 固定最优参数</p>
              <p className="text-sm text-slate-500 mt-2">Complete Component Library · Fixed Optimal Parameters</p>
              
              {/* Parameter badges */}
              <div className="mt-4 flex gap-3 flex-wrap text-sm">
                <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full font-medium">
                  边缘: 7px/12px → 1px/0px
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                  图标: blur(5px) → blur(0)
                </span>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full font-medium">
                  动画: 1000ms 优雅
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                  凝结: 保留1px边缘 🆕
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

        {/* Section 1: Cards */}
        <Section title="📦 Borderless Cards" subtitle="无界卡片 · 6种颜色示例">
          <div className="grid md:grid-cols-3 gap-8">
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
              iconColor={{ r: 251, g: 146, b: 60 }}   // Orange
              onClick={() => console.log('Click: 备份.rar')}
            />
            
            <BorderlessCard
              title="代码.tar.gz"
              subtitle="1024 个文件"
              icon={FolderIcon}
              iconColor={{ r: 6, g: 182, b: 212 }}    // Cyan
              onClick={() => console.log('Click: 代码.tar.gz')}
            />
            
            <BorderlessCard
              title="文档.zip"
              subtitle="89 个文件"
              icon={FileTextIcon}
              iconColor={{ r: 34, g: 197, b: 94 }}    // Green
              onClick={() => console.log('Click: 文档.zip')}
            />
            
            <BorderlessCard
              title="视频.zip"
              subtitle="36 个文件"
              icon={VideoIcon}
              iconColor={{ r: 239, g: 68, b: 68 }}    // Red
              onClick={() => console.log('Click: 视频.zip')}
            />
          </div>
          
          <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-sm text-purple-800">
              💡 <strong>提示：</strong>Hover 观察边缘线条从 7px/blur(12px) 收缩到 1px/blur(0)，
              点击卡片查看按下时的亮度变化效果（150ms快速响应）
            </p>
          </div>
        </Section>

        {/* Section 2: Buttons */}
        <Section title="🔘 Borderless Buttons" subtitle="无界按钮 · 主要/次要 · 大中小">
          <div className="space-y-8">
            {/* Primary buttons */}
            <div>
              <h3 className="text-base font-medium text-slate-700 mb-4">主要按钮 (Primary)</h3>
              <div className="flex flex-wrap gap-4">
                <BorderlessButton 
                  variant="primary" 
                  size="lg" 
                  icon={UploadIcon}
                  onClick={() => console.log('Upload')}
                >
                  上传
                </BorderlessButton>
                
                <BorderlessButton 
                  variant="primary" 
                  size="md" 
                  icon={DownloadIcon}
                  onClick={() => console.log('Download')}
                >
                  下载
                </BorderlessButton>
                
                <BorderlessButton 
                  variant="primary" 
                  size="sm" 
                  icon={TrashIcon}
                  onClick={() => console.log('Delete')}
                >
                  删除
                </BorderlessButton>
                
                {/* Icon only buttons */}
                <BorderlessButton 
                  variant="primary" 
                  size="md"
                  onClick={() => console.log('Search')}
                >
                  <SearchIcon size={18} />
                </BorderlessButton>
                
                <BorderlessButton 
                  variant="primary" 
                  size="md"
                  onClick={() => console.log('More')}
                >
                  <MoreIcon size={18} />
                </BorderlessButton>
              </div>
            </div>
            
            {/* Secondary buttons */}
            <div>
              <h3 className="text-base font-medium text-slate-700 mb-4">次要按钮 (Secondary)</h3>
              <div className="flex flex-wrap gap-4">
                <BorderlessButton 
                  variant="secondary" 
                  size="md" 
                  icon={ShareIcon}
                  onClick={() => console.log('Share')}
                >
                  分享
                </BorderlessButton>
                
                <BorderlessButton 
                  variant="secondary" 
                  size="md" 
                  icon={SettingsIcon}
                  onClick={() => console.log('Settings')}
                >
                  设置
                </BorderlessButton>
                
                <BorderlessButton 
                  variant="secondary" 
                  size="sm" 
                  icon={EditIcon}
                  onClick={() => console.log('Edit')}
                >
                  编辑
                </BorderlessButton>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
            <p className="text-sm text-cyan-800">
              💡 <strong>提示：</strong>按钮使用更细的边缘线条（4px/blur(8px) → 1px/blur(0)），
              适配按钮的小尺寸，动画速度同样为1秒优雅过渡
            </p>
          </div>
        </Section>

        {/* Section 3: Inputs */}
        <Section title="📝 Borderless Inputs" subtitle="无界输入框 · Focus触发凝结">
          <div className="space-y-4 max-w-md">
            <BorderlessInput
              placeholder="搜索"
              icon={SearchIcon}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            
            <BorderlessInput
              placeholder="筛选"
              icon={FilterIcon}
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />
            
            <BorderlessInput
              placeholder="输入"
              icon={EditIcon}
            />
          </div>
          
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800">
              💡 <strong>提示：</strong>输入框的凝结态由 Focus 触发（不是 Hover），
              边缘从 5px/blur(10px) 收缩到 1px/blur(0)
            </p>
          </div>
        </Section>

        {/* Section 4: Fixed Parameters Display */}
        <Section title="⚙️ 固定参数说明" subtitle="Fixed Parameters Specification">
          <div className="p-8 rounded-2xl bg-white/80 backdrop-blur-lg" style={{
            boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.08)'
          }}>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Mist state parameters */}
              <div>
                <h3 className="text-lg font-medium mb-4 text-slate-900">
                  雾气态参数 (Default State)
                </h3>
                <div className="space-y-3">
                  <ParamItem label="边缘线条粗细" value="7px" color="cyan" />
                  <ParamItem label="边缘模糊强度" value="12px" color="teal" />
                  <ParamItem label="光晕扩散范围" value="13px" color="green" />
                  <ParamItem label="图标背景模糊" value="5.0px" color="purple" />
                  <ParamItem label="边缘线条颜色" value="rgba(6,182,212,0.8)" color="cyan" />
                </div>
              </div>
              
              {/* Condensed state parameters */}
              <div>
                <h3 className="text-lg font-medium mb-4 text-slate-900">
                  凝结态参数 (Hover/Focus State)
                </h3>
                <div className="space-y-3">
                  <ParamItem label="边缘线条粗细" value="1px" color="cyan" highlight />
                  <ParamItem label="边缘模糊强度" value="0px" color="teal" />
                  <ParamItem label="光晕扩散范围" value="13px (不变)" color="green" />
                  <ParamItem label="图标背景模糊" value="0px" color="purple" />
                  <ParamItem label="边缘线条颜色" value="rgba(6,182,212,0.4)" color="cyan" />
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-amber-50 rounded-lg border-2 border-amber-200">
              <h4 className="text-sm font-medium text-amber-900 mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                🎬 动画速度: 1000ms（1秒）
              </h4>
              <p className="text-xs text-amber-700">
                所有组件使用统一的1秒动画速度，优雅从容，能清晰看到边缘线条的收缩过程。
                Spring easing: [0.34, 1.56, 0.64, 1] 创造自然的弹性感。
              </p>
            </div>
          </div>
        </Section>

        {/* Section 5: 1px Edge Explanation + Press State */}
        <Section title="🔍 凝结态1px边缘 + 点击态效果" subtitle="1px Condensed Edge + Press State Effect">
          <div className="grid md:grid-cols-2 gap-6">
            {/* 1px edge explanation */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200">
              <h3 className="text-lg font-medium text-cyan-900 mb-4">
                为什么凝结态保留1px边缘？
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg">
                  <h4 className="text-sm font-medium text-red-700 mb-2">
                    ❌ v1.3: 边缘完全消失（0px）
                  </h4>
                  <ul className="text-xs text-slate-700 space-y-1">
                    <li>• 凝结后完全依赖box-shadow定义边界</li>
                    <li>• 光晕可能不够明显</li>
                    <li>• 边界感较弱</li>
                    <li>• 视觉层次单一</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-cyan-50 rounded-lg border-2 border-cyan-300">
                  <h4 className="text-sm font-medium text-cyan-700 mb-2">
                    ✅ v1.4: 保留1px细线
                  </h4>
                  <ul className="text-xs text-cyan-800 space-y-1">
                    <li>• 细微的线条轮廓保留</li>
                    <li>• 配合box-shadow，边界更清晰</li>
                    <li>• 视觉层次更丰富</li>
                    <li>• 线条从粗7px → 细1px，收缩感明显</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-white rounded-lg">
                <p className="text-xs font-medium text-cyan-900 mb-2">动画过程：</p>
                <code className="text-xs font-mono text-cyan-700 block space-y-1">
                  <div>borderWidth: '7px' → '1px'  (收缩但不消失)</div>
                  <div>filter: blur(12px) → blur(0px)  (模糊撤销)</div>
                  <div>borderColor: rgba(...,0.8) → rgba(...,0.4)  (颜色变淡)</div>
                </code>
              </div>
            </div>
            
            {/* Press state explanation */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
              <h3 className="text-lg font-medium text-purple-900 mb-4 flex items-center gap-2">
                🖱️ 点击态效果（NEW）
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg">
                  <h4 className="text-sm font-medium text-purple-900 mb-2">触发时机：</h4>
                  <ul className="text-xs text-slate-700 space-y-1">
                    <li>• 鼠标左键按下（onMouseDown）</li>
                    <li>• 松开鼠标左键时恢复（onMouseUp）</li>
                    <li>• 鼠标离开时恢复（onMouseLeave）</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-white rounded-lg">
                  <h4 className="text-sm font-medium text-purple-900 mb-2">视觉效果：</h4>
                  <ul className="text-xs text-slate-700 space-y-1">
                    <li>• 按下：整体颜色变浅（brightness 92%）</li>
                    <li>• 松开：颜色恢复（brightness 100%）</li>
                    <li>• 速度：150ms（快速响应）</li>
                    <li>• 缓动：easeOut（自然衰减）</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-purple-100 rounded-lg border border-purple-300">
                  <p className="text-xs font-medium text-purple-900 mb-2">实现代码：</p>
                  <code className="text-xs font-mono text-purple-800 block space-y-1">
                    <div>onMouseDown → filter: brightness(0.92)</div>
                    <div>onMouseUp   → filter: brightness(1.0)</div>
                    <div>transition: 150ms easeOut</div>
                    <div className="mt-2 text-purple-600">效果：快速按下变暗 → 松开恢复</div>
                  </code>
                </div>
                
                <div className="p-4 bg-white rounded-lg">
                  <h4 className="text-sm font-medium text-purple-900 mb-2 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    应用场景：
                  </h4>
                  <ul className="text-xs text-slate-700 space-y-1">
                    <li>• 卡片：点击查看详情时的即时反馈</li>
                    <li>• 按钮：执行操作时的按下感</li>
                    <li>• 输入框：聚焦点击时的状态指示</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Component Comparison */}
        <Section title="📊 组件参数对比" subtitle="Component Parameter Comparison">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="p-3 text-left text-sm font-medium text-slate-700 border border-slate-200">组件类型</th>
                  <th className="p-3 text-left text-sm font-medium text-slate-700 border border-slate-200">边缘粗细</th>
                  <th className="p-3 text-left text-sm font-medium text-slate-700 border border-slate-200">边缘模糊</th>
                  <th className="p-3 text-left text-sm font-medium text-slate-700 border border-slate-200">凝结态</th>
                  <th className="p-3 text-left text-sm font-medium text-slate-700 border border-slate-200">触发方式</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="p-3 text-sm text-slate-700 border border-slate-200 font-medium">BorderlessCard</td>
                  <td className="p-3 text-sm font-mono text-cyan-600 border border-slate-200">7px</td>
                  <td className="p-3 text-sm font-mono text-teal-600 border border-slate-200">blur(12px)</td>
                  <td className="p-3 text-sm font-mono text-purple-600 border border-slate-200">1px/0px</td>
                  <td className="p-3 text-sm text-slate-600 border border-slate-200">Hover</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 text-sm text-slate-700 border border-slate-200 font-medium">BorderlessButton</td>
                  <td className="p-3 text-sm font-mono text-cyan-600 border border-slate-200">4px</td>
                  <td className="p-3 text-sm font-mono text-teal-600 border border-slate-200">blur(8px)</td>
                  <td className="p-3 text-sm font-mono text-purple-600 border border-slate-200">1px/0px</td>
                  <td className="p-3 text-sm text-slate-600 border border-slate-200">Hover</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3 text-sm text-slate-700 border border-slate-200 font-medium">BorderlessInput</td>
                  <td className="p-3 text-sm font-mono text-cyan-600 border border-slate-200">5px</td>
                  <td className="p-3 text-sm font-mono text-teal-600 border border-slate-200">blur(10px)</td>
                  <td className="p-3 text-sm font-mono text-purple-600 border border-slate-200">1px/0px</td>
                  <td className="p-3 text-sm text-slate-600 border border-slate-200">Focus</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-700">
              <strong>设计原则：</strong>组件尺寸越小，边缘线条越细，模糊强度越轻。
              所有组件凝结态统一保留1px边缘，确保视觉一致性。
            </p>
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
              <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono">
{`创建 v1.4 - 完整组件库

固定参数（最优值）:
- 边缘线条粗细: 7px (卡片), 4px (按钮), 5px (输入框)
- 边缘模糊强度: 12px (卡片), 8px (按钮), 10px (输入框)
- 光晕扩散范围: 13px
- 图标背景模糊: 5.0px
- 动画速度: 1000ms
- 凝结态边缘: 1px (NEW - 不是0px)

组件库包含：
1. BorderlessCard - 卡片（6个不同颜色示例）
2. BorderlessButton - 按钮（主要/次要，大中小尺寸）
3. BorderlessInput - 输入框（Focus触发）

核心特点：
- 凝结态保留1px边缘（不是0px）
- 所有组件使用相同的边缘模糊技术
- 1秒优雅动画（1000ms）
- 完全静态的外层容器
- NEW: 点击态效果（150ms brightness变浅）

点击态实现：
- onMouseDown: filter brightness(0.92) (150ms)
- onMouseUp: filter brightness(1.0) (150ms)
- 快速即时反馈，不影响边缘线条动画

设计原则：
- 组件越小��边缘越细，模糊越轻
- 统一的1px凝结态边缘
- 统一的1秒动画速度
- 统一的点击态反馈`}
              </pre>
            </div>
            
            {/* 英文版 */}
            <div>
              <h4 className="text-sm text-slate-400 mb-2">Prompt (English Version)</h4>
              <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono">
{`Create v1.4 - Complete Component Library

Fixed parameters (optimal values):
- Edge line width: 7px (card), 4px (button), 5px (input)
- Edge blur amount: 12px (card), 8px (button), 10px (input)
- Glow spread: 13px
- Icon background blur: 5.0px
- Animation speed: 1000ms
- Condensed edge: 1px (NEW - not 0px)

Component library includes:
1. BorderlessCard - Cards (6 color examples)
2. BorderlessButton - Buttons (primary/secondary, sm/md/lg)
3. BorderlessInput - Inputs (Focus triggered)

Core features:
- Condensed state keeps 1px edge (not 0px)
- All components use same edge blur technique
- 1s elegant animation (1000ms)
- Fully static outer container
- NEW: Press state effect (150ms brightness darken)

Press state implementation:
- onMouseDown: filter brightness(0.92) (150ms)
- onMouseUp: filter brightness(1.0) (150ms)
- Quick instant feedback, doesn't affect edge animation

Design principles:
- Smaller components = thinner edge, lighter blur
- Unified 1px condensed edge
- Unified 1s animation speed
- Unified press state feedback`}
              </pre>
            </div>
            
            {/* 元数据 */}
            <div className="text-xs text-slate-400 pt-4 border-t border-slate-700 space-y-1">
              <p>生成日期: 2025-11-02</p>
              <p>Prompt文件: prompt-02.14-component-library-v1.4.md</p>
              <p>探索方向: 固定最优参数，生成完整组件库</p>
              <p>固定参数: 7px/12px/13px/5px/1000ms/1px凝结边缘</p>
              <p>组件数量: 3类（卡片/按钮/输入框），20+示例</p>
              <p>新增功能: 凝结态保留1px边缘 + 点击态效果（brightness 0.92, 150ms）</p>
              <p>设计原则: 组件越小边缘越细，统一1px凝结态，统一1s动画</p>
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

function ParamItem({ 
  label, 
  value, 
  color, 
  highlight 
}: {
  label: string;
  value: string;
  color: 'cyan' | 'teal' | 'green' | 'purple';
  highlight?: boolean;
}) {
  const colorMap = {
    cyan: 'text-cyan-600',
    teal: 'text-teal-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
  };
  
  return (
    <div className={`flex justify-between p-3 rounded-lg ${
      highlight 
        ? 'bg-cyan-100 border-2 border-cyan-300' 
        : 'bg-slate-50'
    }`}>
      <span className="text-sm text-slate-700">{label}</span>
      <code className={`text-sm font-mono font-medium ${colorMap[color]}`}>
        {value}
      </code>
    </div>
  );
}
