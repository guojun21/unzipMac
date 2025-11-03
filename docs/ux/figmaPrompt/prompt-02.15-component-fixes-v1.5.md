# Prompt 02.15: 组件库修正 v1.5

**目标**: 修复4个问题：hover可回退、按钮结构修正、无次要概念、输入框边缘重合  
**日期**: 2025-11-02  
**文件**: 15-ComponentLibraryV1.5.tsx

---

## 🎯 本次探索的方向

修复v1.4的4个问题：卡片hover后可回到雾气态，按钮结构改为只是图标背景部分，取消次要按钮概念（用颜色区分），输入框凝结态边缘与内容边缘重合。

---

## 🎨 中文Prompt

```
修正 v1.4 的4个问题，创建 v1.5

文件: src/pages/15-ComponentLibraryV1.5.tsx

===  问题1: 卡片hover后无法回到雾气态 ===

可能原因：
- onMouseLeave没有正确触发
- 或者边缘线条动画没有反向执行

修复：确保代码包含完整的hover和leave逻辑

```tsx
const [isHovered, setIsHovered] = useState(false);

// 确保这两个事件都正确绑定
<div
  onMouseEnter={() => setIsHovered(true)}   // 进入
  onMouseLeave={() => setIsHovered(false)}  // 离开
>

useEffect(() => {
  if (isHovered) {
    // hover进入：7px→1px, blur(12px)→0
    edgeControls.start({ ... });
  } else {
    // hover离开：1px→7px, blur(0)→12px  ← 必须有这个！
    edgeControls.start({
      borderWidth: '7px',
      filter: 'blur(12px)',
      ...
    });
  }
}, [isHovered]);  // 依赖isHovered
```

===  问题2: 按钮结构完全重新设计 ===

按钮不是一个完整卡片，而是：
- 只有图标背景那个部分！
- 圆角矩形（56×56px或更小）+ 图标
- 和卡片内部的紫色图标背景完全一样的结构
- 不需要外层大容器

新的按钮组件：

```tsx
export function BorderlessButton({
  icon: Icon,
  color = { r: 6, g: 182, b: 212 },  // 默认青色
  size = 'md',  // sm(40×40) | md(56×56) | lg(72×72)
  onClick,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const { r, g, b } = color;
  
  const sizeMap = {
    sm: { box: 40, icon: 20, radius: 10 },
    md: { box: 56, icon: 28, radius: 14 },
    lg: { box: 72, icon: 36, radius: 18 },
  };
  const s = sizeMap[size];
  
  return (
    <div style={{ position: 'relative', padding: '20px' }}>
      {/* 边缘线条（和卡片图标一样的逻辑）*/}
      <motion.div
        animate={{
          borderWidth: isHovered ? '1px' : '7px',
          filter: isHovered ? 'blur(0px)' : 'blur(12px)',
          borderColor: isHovered 
            ? `rgba(${r},${g},${b},0.4)` 
            : `rgba(${r},${g},${b},0.8)`,
        }}
        transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          position: 'absolute',
          inset: 0,
          border: `7px solid rgba(${r},${g},${b},0.8)`,
          borderRadius: `${s.radius}px`,
          boxSizing: 'border-box',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      
      {/* 按钮主体（就是彩色圆角矩形）*/}
      <motion.button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        animate={{
          // 背景模糊
          filter: isPressed 
            ? 'brightness(0.92)' 
            : isHovered ? 'blur(0px)' : 'blur(5px)',
          // 光晕
          boxShadow: isHovered
            ? `0 0 20px rgba(${r},${g},${b},0.35)`
            : `0 0 30px rgba(${r},${g},${b},0.25)`,
        }}
        transition={{ 
          filter: { duration: isPressed ? 0.15 : 1, ease: 'easeOut' },
          boxShadow: { duration: 1, ease: [0.34, 1.56, 0.64, 1] },
        }}
        style={{
          width: `${s.box}px`,
          height: `${s.box}px`,
          borderRadius: `${s.radius}px`,
          background: `rgba(${r},${g},${b},1.0)`,  // 纯色，用颜色区分主次
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Icon size={s.icon} color="#ffffff" strokeWidth={2} />
      </motion.button>
    </div>
  );
}
```

按钮示例（用颜色区分类型）：

```tsx
{/* 主要操作 - 青色 */}
<BorderlessButton 
  icon={UploadIcon} 
  color={{ r: 6, g: 182, b: 212 }}  // cyan
  size="md"
/>

{/* 成功操作 - 绿色 */}
<BorderlessButton 
  icon={CheckIcon} 
  color={{ r: 34, g: 197, b: 94 }}  // green
/>

{/* 警告操作 - 橙色 */}
<BorderlessButton 
  icon={AlertIcon} 
  color={{ r: 251, g: 146, b: 60 }}  // orange
/>

{/* 危险操作 - 红色 */}
<BorderlessButton 
  icon={TrashIcon} 
  color={{ r: 239, g: 68, b: 68 }}  // red
/>

{/* 次要操作 - 灰色 */}
<BorderlessButton 
  icon={SettingsIcon} 
  color={{ r: 100, g: 116, b: 139 }}  // slate
/>

无需variant prop，用颜色参数区分！
```

===  问题3: 取消次要按钮概念 ===

```
❌ v1.4 错误设计：
  variant="primary"  // 主要
  variant="secondary"  // 次要
  不同的样式

✅ v1.5 正确设计：
  只有一种按钮样式
  用color参数区分用途：
    - 青色：主要操作
    - 绿色：成功操作
    - 红色：危险操作
    - 灰色：次要操作
  
  所有按钮结构完全相同！
```

===  问题4: 输入框边缘重合 ===

输入框结构修正：

```tsx
export function BorderlessInput({
  placeholder = "搜索",
  value,
  onChange,
  icon: Icon,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  const params = {
    edgeLineWidth: 5,
    edgeBlurAmount: 10,
    condensedEdgeWidth: 1,
    animationSpeed: 1000,
  };
  
  return (
    <div className="relative" style={{ width: '320px' }}>
      {/* 边缘线条层 */}
      <motion.div
        animate={{
          borderWidth: isFocused ? `${params.condensedEdgeWidth}px` : `${params.edgeLineWidth}px`,
          filter: isFocused ? 'blur(0px)' : `blur(${params.edgeBlurAmount}px)`,
          borderColor: isFocused ? 'rgba(6,182,212,0.5)' : 'rgba(6,182,212,0.7)',
        }}
        transition={{ duration: params.animationSpeed / 1000, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          position: 'absolute',
          // 关键：inset: 0 让边缘和输入框重合
          inset: 0,
          border: `${params.edgeLineWidth}px solid rgba(6,182,212,0.7)`,
          borderRadius: '12px',
          boxSizing: 'border-box',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      
      {/* 输入框主体 */}
      <motion.div
        animate={{
          filter: isPressed ? 'brightness(0.92)' : 'brightness(1)',
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 16px',
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          // 关键：无box-shadow光晕，因为边缘线条就是边界
          // 凝结态：边缘线条变1px，紧贴输入框边缘
          position: 'relative',
          zIndex: 1,
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {Icon && <Icon size={18} className="text-slate-400" />}
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: '14px',
            color: '#0f172a',
            flex: 1,
          }}
        />
      </div>
    </div>
  );
}
```

关键：
- 边缘层：inset: 0，完全贴合输入框
- 输入框：无独立border
- 凝结态：边缘1px，和输入框边缘重合
- 不是两层边缘！

===  完整页面示例 ===

```tsx
export default function ComponentLibraryV1_5({ onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30 py-12 px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div>
          <h1 className="text-5xl mb-2">Component Library v1.5</h1>
          <p className="text-xl text-slate-600">
            修正：Hover可回退、按钮=图标背景、颜色区分、边缘重合
          </p>
        </div>
        
        {/* 卡片示例（6个）*/}
        <Section title="📦 Borderless Cards">
          <div className="grid md:grid-cols-3 gap-8">
            <BorderlessCard
              title="文档.zip"
              subtitle="89 个文件"
              icon={FileTextIcon}
              iconColor={{ r: 34, g: 197, b: 94 }}  // 绿色
            />
            
            <BorderlessCard
              title="项目.zip"
              subtitle="245 个文件"
              icon={FileArchiveIcon}
              iconColor={{ r: 167, g: 139, b: 250 }}  // 紫色
            />
            
            <BorderlessCard
              title="照片.zip"
              subtitle="512 个文件"
              icon={ImageIcon}
              iconColor={{ r: 244, g: 114, b: 182 }}  // 粉色
            />
            
            <BorderlessCard
              title="备份.rar"
              subtitle="128 个文件"
              icon={ArchiveIcon}
              iconColor={{ r: 251, g: 146, b: 60 }}  // 橙色
            />
            
            <BorderlessCard
              title="代码.tar.gz"
              subtitle="1024 个文件"
              icon={FolderIcon}
              iconColor={{ r: 6, g: 182, b: 212 }}  // 青色
            />
            
            <BorderlessCard
              title="视频.zip"
              subtitle="36 个文件"
              icon={VideoIcon}
              iconColor={{ r: 239, g: 68, b: 68 }}  // 红色
            />
          </div>
          
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800">
              ✅ 测试：Hover到卡片再移开，应该能回到雾气态（边缘线条重新展开并模糊）
            </p>
          </div>
        </Section>
        
        {/* 按钮示例（只有图标背景样式）*/}
        <Section title="🔘 Borderless Buttons">
          <div className="flex flex-wrap gap-6">
            
            {/* 主要操作组 - 青色系 */}
            <div className="space-y-2">
              <p className="text-xs text-slate-500">主要操作（青色）</p>
              <div className="flex gap-3">
                <BorderlessButton 
                  icon={UploadIcon} 
                  color={{ r: 6, g: 182, b: 212 }}
                  size="lg"
                />
                <BorderlessButton 
                  icon={DownloadIcon} 
                  color={{ r: 6, g: 182, b: 212 }}
                  size="md"
                />
                <BorderlessButton 
                  icon={FolderPlusIcon} 
                  color={{ r: 6, g: 182, b: 212 }}
                  size="sm"
                />
              </div>
            </div>
            
            {/* 成功操作 - 绿色 */}
            <div className="space-y-2">
              <p className="text-xs text-slate-500">成功操作（绿色）</p>
              <div className="flex gap-3">
                <BorderlessButton 
                  icon={CheckIcon} 
                  color={{ r: 34, g: 197, b: 94 }}
                  size="md"
                />
                <BorderlessButton 
                  icon={CheckCircleIcon} 
                  color={{ r: 34, g: 197, b: 94 }}
                  size="md"
                />
              </div>
            </div>
            
            {/* 危险操作 - 红色 */}
            <div className="space-y-2">
              <p className="text-xs text-slate-500">危险操作（红色）</p>
              <div className="flex gap-3">
                <BorderlessButton 
                  icon={TrashIcon} 
                  color={{ r: 239, g: 68, b: 68 }}
                  size="md"
                />
                <BorderlessButton 
                  icon={XIcon} 
                  color={{ r: 239, g: 68, b: 68 }}
                  size="md"
                />
              </div>
            </div>
            
            {/* 次要操作 - 灰色 */}
            <div className="space-y-2">
              <p className="text-xs text-slate-500">次要操作（灰色）</p>
              <div className="flex gap-3">
                <BorderlessButton 
                  icon={SettingsIcon} 
                  color={{ r: 100, g: 116, b: 139 }}  // 灰色
                  size="md"
                />
                <BorderlessButton 
                  icon={MoreHorizontalIcon} 
                  color={{ r: 100, g: 116, b: 139 }}
                  size="md"
                />
              </div>
            </div>
            
            {/* 其他颜色 */}
            <div className="space-y-2">
              <p className="text-xs text-slate-500">其他操作（紫/橙）</p>
              <div className="flex gap-3">
                <BorderlessButton 
                  icon={StarIcon} 
                  color={{ r: 167, g: 139, b: 250 }}  // 紫色
                  size="md"
                />
                <BorderlessButton 
                  icon={AlertTriangleIcon} 
                  color={{ r: 251, g: 146, b: 60 }}  // 橙色
                  size="md"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
            <p className="text-sm text-cyan-800">
              ✅ 按钮就是卡片内部的图标背景部分！结构完全一样，只是尺寸不同
            </p>
            <p className="text-xs text-cyan-700 mt-2">
              无primary/secondary之分，用颜色表达用途：青色主要、绿色成功、红色危险、灰色次要
            </p>
          </div>
        </Section>
        
        {/* 输入框示例 */}
        <Section title="📝 Borderless Inputs">
          <div className="space-y-6 max-w-md">
            
            <BorderlessInput
              placeholder="搜索"
              icon={SearchIcon}
            />
            
            <BorderlessInput
              placeholder="筛选"
              icon={FilterIcon}
            />
            
            <BorderlessInput
              placeholder="输入文件名"
            />
          </div>
          
          <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-sm text-purple-800">
              ✅ 凝结态（focus）：外层边缘1px和输入框边缘重合，不是分离的两层
            </p>
            <code className="text-xs font-mono text-purple-700 block mt-2">
              边缘层：inset: 0（贴合输入框）<br/>
              输入框：无独立border<br/>
              效果：边缘和内容完全重合
            </code>
          </div>
        </Section>
        
        {/* Prompt记录 */}
        <details className="mt-16 p-6 rounded-xl bg-slate-900 text-white">
          <summary className="cursor-pointer text-lg font-medium mb-4">
            📝 查看生成此页面的Prompt
          </summary>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm text-slate-400 mb-2">Prompt (中文版)</h4>
              <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono">
{`修正 v1.4 的4个问题

问题1: 卡片hover后无法回到雾气态
修复: 确保onMouseLeave正确触发，useEffect的else分支完整

问题2: 按钮结构错误（不是完整卡片）
修复: 按钮=卡片内部图标背景部分，56×56px圆角矩形+图标

问题3: 不需要次要按钮概念
修复: 只有一种按钮样式，用color参数区分（青/绿/红/灰）

问题4: 输入框凝结态两层边缘
修复: 边缘层inset:0，和输入框边缘重合

[完整代码见上方 400+ 行]`}
              </pre>
            </div>
            
            <div>
              <h4 className="text-sm text-slate-400 mb-2">Prompt (English Version)</h4>
              <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono">
{`Fix 4 issues from v1.4

Issue 1: Card can't return to mist after hover
Fix: Ensure onMouseLeave triggers, useEffect else branch complete

Issue 2: Button structure wrong (not full card)
Fix: Button = card icon background part, 56×56px rounded rect + icon

Issue 3: No need for secondary button concept
Fix: One button style, use color to differentiate (cyan/green/red/gray)

Issue 4: Input condensed state has double edges
Fix: Edge layer inset:0, aligns with input edge

[Complete code above 400+ lines]`}
              </pre>
            </div>
            
            <div className="text-xs text-slate-400 pt-4 border-t border-slate-700 space-y-1">
              <p>生成日期: 2025-11-02</p>
              <p>Prompt文件: prompt-02.15-component-fixes-v1.5.md</p>
              <p>探索方向: 修复hover回退、按钮结构、颜色区分、边缘重合</p>
              <p>修复问题: 4个组件交互和结构问题</p>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}
```

导航位置：
在 App.tsx 中添加为第15个按钮
按钮文字: "15 · v1.5 组件修正"
按钮颜色: lime-400 to lime-500

生成v1.5页面。
```

---

## 🎨 English Prompt

```
Fix 4 issues from v1.4, create v1.5

File: src/pages/15-ComponentLibraryV1.5.tsx

[Complete English version with same detailed code as Chinese section above]

Navigation:
Add to App.tsx as button 15
Button text: "15 · v1.5 组件修正"
Button color: lime-400 to lime-500

Generate v1.5 page.
```

---

**修复4个问题 ✓ 按钮重新设计 ✓ 边缘重合 ✓ Hover可回退 ✓**

