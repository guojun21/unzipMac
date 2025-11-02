# Prompt 01.01: 导航结构重构

**目标**: 重构App.tsx导航，所有探索版本平级展示  
**日期**: 2025-11-01  
**原则**: 持续探索，版本平等，无"最终"概念

---

## 🎯 设计原则

```
核心理念：
  ✓ 所有版本都是探索过程的一步
  ✓ 新版本不一定比老版本好
  ✓ 保留所有历史，平级展示
  ✓ 不用"完美"、"终极"等绝对词
  ✓ 用描述性名称，说明每版本的特点
  
导航要求：
  ✓ 时间顺序排列
  ✓ 样式统一，无突出
  ✓ 清晰说明每个版本的探索方向
  ✓ 易于添加新版本
```

---

## 🎨 完整Prompt（中文版）

```
重构 App.tsx 的导航系统。

核心原则：这是一个持续探索的设计系统，所有版本平等展示，无"最终版"概念。

=== 导航结构要求 ===

1. 页面列表（按时间顺序，平级排列）：

页面01: 羽化强度对比研究
  - 文件: 01-FeatherIntensityStudy.tsx
  - 说明: 探索4种不同羽化程度（保守/中度/重度/极致）
  - 按钮文字: "01 · 羽化研究"

页面02: 基础组件探索  
  - 文件: 02-BasicComponentsV2.tsx
  - 说明: 初步的无界组件实现
  - 按钮文字: "02 · 基础组件"

页面03: 动态无界 v0.5
  - 文件: 03-DynamicBorderlessV5.tsx
  - 说明: 探索透明度变化的凝结效果
  - 按钮文字: "03 · v0.5 透明度变化"

页面04: 动态无界 v0.6
  - 文件: 04-DynamicBorderlessV6.tsx
  - 说明: 探索透明度固定、SVG独立
  - 按钮文字: "04 · v0.6 透明度固定"

页面05: 动态无界 v0.7
  - 文件: 05-DynamicBorderlessV7.tsx
  - 说明: 探索紫色恒定1.0、凝结靠blur、可调参数
  - 按钮文字: "05 · v0.7 凝结靠模糊"

页面06: 完整组件库
  - 文件: 06-ComponentLibrary.tsx
  - 说明: 所有组件的集合展示
  - 按钮文字: "06 · 组件库"

---

2. 导航按钮样式（统一，无突出）：

所有按钮使用相同基础样式：
  - 大小: px-6 py-3
  - 圆角: rounded-xl
  - 字号: text-base
  - 字重: font-medium
  
颜色方案（彩虹色序列，纯装饰用）：
  - 01: 紫色 (purple-400)
  - 02: 粉色 (pink-400)
  - 03: 青色 (cyan-400)
  - 04: 绿色 (emerald-400)
  - 05: 橙色 (orange-400)
  - 06: 蓝色 (blue-500)

背景：渐变 + 光晕
  - bg-gradient-to-r from-[color]-400 to-[color]-500
  - 白色文字
  - box-shadow: 相应颜色的光晕

Hover效果（所有按钮统一）：
  - 光晕增强
  - translateY(-2px)
  - 无特殊突出

---

3. 布局方式：

```tsx
<div className="px-8 py-6">
  {/* Header */}
  <div className="mb-8">
    <h1 className="text-5xl mb-2">Fluid Technology</h1>
    <p className="text-xl text-slate-600">流体科技设计系统探索</p>
  </div>
  
  {/* Navigation Grid - 平级展示 */}
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
    
    <NavButton 
      color="purple"
      onClick={() => navigate('01')}
    >
      01 · 羽化研究
    </NavButton>
    
    <NavButton 
      color="pink"
      onClick={() => navigate('02')}
    >
      02 · 基础组件
    </NavButton>
    
    <NavButton 
      color="cyan"
      onClick={() => navigate('03')}
    >
      03 · v0.5 透明度变化
    </NavButton>
    
    <NavButton 
      color="emerald"
      onClick={() => navigate('04')}
    >
      04 · v0.6 透明度固定
    </NavButton>
    
    <NavButton 
      color="orange"
      onClick={() => navigate('05')}
    >
      05 · v0.7 凝结靠模糊
    </NavButton>
    
    <NavButton 
      color="blue"
      onClick={() => navigate('06')}
    >
      06 · 组件库
    </NavButton>
  </div>
  
  {/* 当前页面内容 */}
  {currentPage}
</div>
```

---

4. 每个页面底部添加Prompt记录：

在每个页面组件的底部添加一个折叠区域：

```tsx
{/* 页面内容 ... */}

{/* Prompt记录（页面底部）*/}
<details className="mt-16 p-6 rounded-xl bg-slate-900 text-white">
  <summary className="cursor-pointer text-lg font-medium mb-4">
    📝 查看生成此页面的Prompt
  </summary>
  
  <div className="space-y-4">
    {/* 中文版 */}
    <div>
      <h4 className="text-sm text-slate-400 mb-2">Prompt (中文版)</h4>
      <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto">
        {/* 原始prompt的中文内容 */}
      </pre>
    </div>
    
    {/* 英文版 */}
    <div>
      <h4 className="text-sm text-slate-400 mb-2">Prompt (English Version)</h4>
      <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto">
        {/* 原始prompt的英文内容 */}
      </pre>
    </div>
    
    {/* 元数据 */}
    <div className="text-xs text-slate-400 pt-4 border-t border-slate-700">
      <p>生成日期: 2025-11-01</p>
      <p>Prompt版本: {对应的prompt编号}</p>
      <p>探索目标: {该版本探索的具体内容}</p>
    </div>
  </div>
</details>
```

---

实现NavButton组件：

```tsx
function NavButton({ 
  color, 
  onClick, 
  children 
}: { 
  color: 'purple'|'pink'|'cyan'|'emerald'|'orange'|'blue';
  onClick: () => void;
  children: React.ReactNode;
}) {
  const colorMap = {
    purple: { from: 'from-purple-400', to: 'to-purple-500', glow: 'rgba(167,139,250,0.3)' },
    pink: { from: 'from-pink-400', to: 'to-pink-500', glow: 'rgba(244,114,182,0.3)' },
    cyan: { from: 'from-cyan-400', to: 'to-cyan-500', glow: 'rgba(6,182,212,0.3)' },
    emerald: { from: 'from-emerald-400', to: 'to-emerald-500', glow: 'rgba(52,211,153,0.3)' },
    orange: { from: 'from-orange-400', to: 'to-orange-500', glow: 'rgba(251,146,60,0.3)' },
    blue: { from: 'from-blue-500', to: 'to-blue-600', glow: 'rgba(59,130,246,0.3)' },
  };
  
  const config = colorMap[color];
  
  return (
    <motion.button
      onClick={onClick}
      className={`px-6 py-3 rounded-xl bg-gradient-to-r ${config.from} ${config.to} text-white font-medium`}
      style={{
        boxShadow: `0 0 20px ${config.glow}, 0 0 40px ${config.glow.replace('0.3', '0.15')}`
      }}
      whileHover={{
        boxShadow: `0 0 30px ${config.glow.replace('0.3', '0.4')}, 0 0 60px ${config.glow.replace('0.3', '0.2')}`,
        y: -2
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.button>
  );
}
```

所有按钮样式统一，仅颜色不同，平级展示，无重点突出。

---

重构 App.tsx 导航，应用以上设计。
```

---

## 🎨 Complete Prompt (English Version)

```
Restructure the App.tsx navigation system.

Core principle: This is an ongoing design exploration. All versions are equal steps in the process. No "final" or "perfect" versions.

=== NAVIGATION STRUCTURE ===

1. Page list (chronological order, all equal):

Page 01: Feather Intensity Study
  - File: 01-FeatherIntensityStudy.tsx
  - Description: Explore 4 feather levels (conservative/moderate/heavy/extreme)
  - Button text: "01 · 羽化研究"

Page 02: Basic Components Exploration
  - File: 02-BasicComponentsV2.tsx
  - Description: Initial borderless component implementation
  - Button text: "02 · 基础组件"

Page 03: Dynamic Borderless v0.5
  - File: 03-DynamicBorderlessV5.tsx
  - Description: Explore condensation via opacity changes
  - Button text: "03 · v0.5 透明度变化"

Page 04: Dynamic Borderless v0.6
  - File: 04-DynamicBorderlessV6.tsx
  - Description: Explore fixed opacity, independent SVG
  - Button text: "04 · v0.6 透明度固定"

Page 05: Dynamic Borderless v0.7
  - File: 05-DynamicBorderlessV7.tsx
  - Description: Explore purple opacity 1.0, condensation via blur, adjustable params
  - Button text: "05 · v0.7 凝结靠模糊"

Page 06: Component Library
  - File: 06-ComponentLibrary.tsx
  - Description: Collection of all components
  - Button text: "06 · 组件库"

---

2. Button styling (UNIFORM, no emphasis):

All buttons same base style:
  - Size: px-6 py-3
  - Radius: rounded-xl
  - Font: text-base, font-medium
  
Color scheme (rainbow sequence, decorative only):
  - 01: purple (purple-400 to purple-500)
  - 02: pink (pink-400 to pink-500)
  - 03: cyan (cyan-400 to cyan-500)
  - 04: green (emerald-400 to emerald-500)
  - 05: orange (orange-400 to orange-500)
  - 06: blue (blue-500 to blue-600)

Same glow effects for all.
Same hover behavior for all.
NO special highlighting of any version.

---

3. Layout:

Grid layout: 2 columns on mobile, 3 columns on desktop
All buttons equal size and prominence
Chronological order: 01, 02, 03, 04, 05, 06

---

4. Add prompt display at BOTTOM of each page:

At the end of EVERY page component, add:

```tsx
<details className="mt-16 p-6 rounded-xl bg-slate-900 text-white">
  <summary className="cursor-pointer text-lg font-medium mb-4">
    📝 查看生成此页面的Prompt
  </summary>
  
  <div className="space-y-6">
    {/* Chinese version */}
    <div>
      <h4 className="text-sm text-slate-400 mb-2">Prompt (中文版)</h4>
      <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap">
        {/* The actual prompt text in Chinese */}
      </pre>
    </div>
    
    {/* English version */}
    <div>
      <h4 className="text-sm text-slate-400 mb-2">Prompt (English Version)</h4>
      <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap">
        {/* The actual prompt text in English */}
      </pre>
    </div>
    
    {/* Metadata */}
    <div className="text-xs text-slate-400 pt-4 border-t border-slate-700 space-y-1">
      <p>生成日期: 2025-11-01</p>
      <p>Prompt文件: prompt-XX.XX.md</p>
      <p>探索方向: {specific exploration goal}</p>
    </div>
  </div>
</details>
```

---

5. For v0.7 page (05-DynamicBorderlessV7.tsx):

Title: "Dynamic Borderless v0.7"
Subtitle: "探索：紫色透明度恒定1.0，凝结效果靠blur变化"

NO words like: "PERFECT", "ULTIMATE", "FINAL"
Just: "v0.7" - one step in ongoing exploration

Include the prompt text at bottom showing the actual prompt used to generate this page.

---

Update App.tsx navigation NOW with this equal, chronological structure.
```

---

## 🎨 Complete Prompt (English Version)

```
Restructure the App.tsx navigation system.

Core principle: Ongoing design exploration. All versions are equal. No "final" concept.

=== NAVIGATION STRUCTURE ===

1. Page list (chronological, all equal):

Page 01: Feather Intensity Study
  Button: "01 · 羽化研究"
  
Page 02: Basic Components
  Button: "02 · 基础组件"

Page 03: Dynamic v0.5
  Button: "03 · v0.5 透明度变化"

Page 04: Dynamic v0.6
  Button: "04 · v0.6 透明度固定"

Page 05: Dynamic v0.7
  Button: "05 · v0.7 凝结靠模糊"

Page 06: Component Library
  Button: "06 · 组件库"

---

2. Uniform button styling:

All buttons:
  - Same size (px-6 py-3)
  - Same font (text-base, font-medium)
  - Rainbow colors (decorative only)
  - Same glow effects
  - Same hover behavior
  - NO special emphasis

Colors: purple, pink, cyan, emerald, orange, blue (in order)

---

3. Grid layout: 2×3 or 3×2, all equal prominence

---

4. Add prompt display at bottom of EACH page:
  - Collapsible section
  - Shows Chinese + English prompt
  - Shows metadata (date, prompt file, goal)

---

Update App.tsx with this equal navigation structure NOW.
```

---

## 📋 预期结果

### App.tsx 导航应该是

```tsx
<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
  
  <NavButton color="purple" onClick={() => navigate('01')}>
    01 · 羽化研究
  </NavButton>
  
  <NavButton color="pink" onClick={() => navigate('02')}>
    02 · 基础组件
  </NavButton>
  
  <NavButton color="cyan" onClick={() => navigate('03')}>
    03 · v0.5 透明度变化
  </NavButton>
  
  <NavButton color="emerald" onClick={() => navigate('04')}>
    04 · v0.6 透明度固定
  </NavButton>
  
  <NavButton color="orange" onClick={() => navigate('05')}>
    05 · v0.7 凝结靠模糊
  </NavButton>
  
  <NavButton color="blue" onClick={() => navigate('06')}>
    06 · 组件库
  </NavButton>
</div>
```

**特点**：
- ✅ 平级网格，无突出
- ✅ 彩虹色序列（装饰）
- ✅ 清晰描述每版本特点
- ✅ 时间顺序
- ✅ 易于添加v0.8, v0.9...

---

### 每个页面底部应该有

```
[页面内容...]

📝 查看生成此页面的Prompt ▼
├─ Prompt (中文版)
│  └─ [原始prompt文本]
├─ Prompt (English)
│  └─ [原始prompt文本]
└─ 元数据
   ├─ 生成日期: 2025-11-01
   ├─ Prompt文件: prompt-02.06-xxx.md
   └─ 探索方向: 紫色透明度恒定...
```

---

## 🎯 文件命名

**Prompt文件编号系统**：

```
01.xx - 导航/结构相关
  01.01 - 导航重构

02.xx - 动态无界探索
  02.01 - 羽化程度探索
  02.02 - 多层羽化
  02.03 - v0.4
  02.04 - v0.5
  02.05 - v0.6
  02.06 - v0.7

03.xx - 未来的其他探索
```

---

**复制这个prompt给Figma Make，重构导航系统！** 🎯✨

**所有版本平等，持续探索！** 🚀
