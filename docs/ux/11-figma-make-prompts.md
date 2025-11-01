# Figma Make AI Prompts 指南

**目标**: 用Figma Make AI快速生成设计稿  
**策略**: 将17,000行设计文档精华提炼成精准的AI prompts  
**预计时间**: 4-8小时（vs 手动60小时）  
**更新日期**: 2025-11-01

---

## 🎯 Figma Make 使用策略

### 核心原则

```
1. 分步生成（而非一次性生成整个APP）
   → 先生成组件库
   → 再组装页面
   → 最后调整细节

2. 精准描述（提供具体参数）
   → ❌ "做一个按钮"
   → ✅ "青色渐变按钮，无边框，有光晕阴影，圆角12px"

3. 引用设计系统（建立上下文）
   → 先让AI理解"无界"设计语言
   → 再生成具体组件

4. 迭代优化（生成后调整）
   → 第一版不会完美
   → 用自然语言微调
```

---

## 一、初始化：建立设计系统上下文

### 🌟 第一个Prompt（最重要）

**目的**：让Figma Make理解你的设计系统

```
Create a design system foundation page with the following specifications:

DESIGN PHILOSOPHY: Fluid Technology (流体科技)
- Core concept: Blend of liquid fluidity + digital technology
- Visual metaphor: Archives as fluid containers, extraction as liquid pouring
- NO hard borders, use glows and gradients instead

CORE PRINCIPLES:
1. Borderless Design (无界)
   - Never use solid borders
   - Use radial gradients with transparent edges
   - Use glow shadows instead of strokes
   - Components should look like water droplets on paper

2. Minimal Text (极简文字)
   - Buttons: max 2-4 characters in Chinese (or 1-2 words in English)
   - Use icons wherever possible
   - Examples: "上传" (Upload), "删除" (Delete), "开始解压" (Extract)

3. Fluid Animations
   - All transitions feel organic, not mechanical
   - Use spring physics, not linear

COLOR SYSTEM (Water Spectrum):
Primary: Cyan gradient
- Main: #06b6d4 to #0ea5e9 (135deg linear gradient)
- Use for primary buttons, links, progress

Neutral: Slate (Deep Sea gradient)
- Background: #ffffff, #f8fafc, #f1f5f9
- Text: #0f172a (primary), #475569 (secondary)

Aurora Palette (Supporting colors):
- Purple: #a78bfa (special files)
- Pink: #f472b6 (media files)
- Orange: #fb923c (warnings)
- Green: #34d399 (success)

SHADOWS (Borderless Design - KEY!):
Standard shadow:
- 0 0 0 1px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.08)

Glow shadow (cyan):
- 0 0 20px rgba(6,182,212,0.3), 0 0 40px rgba(6,182,212,0.15)

EFFECTS:
Background blur: 10px (cards), 20px (glass), 30px (overlays)

SPACING:
8px grid system: 4, 8, 12, 16, 24, 32, 48, 64px

TYPOGRAPHY:
- Font: Inter (sans-serif), JetBrains Mono (monospace)
- Sizes: 12, 14, 16, 18, 20, 24, 30, 36, 48px
- Line height: 1.5 (body), 1.2-1.3 (headings)

BORDER RADIUS:
8px (inputs), 12px (buttons), 16px (cards), 24px (modals)

Create a foundation page showing:
1. Color palette with all shades
2. Typography scale
3. Shadow examples (especially glow effects)
4. Spacing grid visualization
5. Example of borderless card vs traditional bordered card

Make the page beautiful and organized.
```

**预期结果**：Figma Make会生成一个Foundation页面，展示设计系统基础

---

## 二、组件库生成（核心）

### Prompt 2.1: 无界主按钮 ⭐⭐⭐

```
Create a primary button component with these EXACT specifications:

DESIGN STYLE: Borderless (无界)
- NO borders at all
- Use glow shadows instead

SIZE: Auto width × 48px

STRUCTURE:
- Horizontal layout with icon + text
- Padding: 12px (top/bottom), 24px (left/right)
- Gap between icon and text: 8px
- Icon size: 18×18px
- Text: "上传" (Upload) - use this exact 2-character Chinese text

BACKGROUND:
- Linear gradient, 135 degrees
- Color stop 1 (0%): #06b6d4
- Color stop 2 (100%): #0ea5e9

SHADOW (glow effect):
- Layer 1: X:0 Y:0 Blur:20px Spread:0, Color:#06b6d4 at 30% opacity
- Layer 2: X:0 Y:0 Blur:40px Spread:0, Color:#06b6d4 at 15% opacity

TEXT:
- Font: Inter Medium
- Size: 14px
- Color: #ffffff

BORDER RADIUS: 12px

VARIANTS (create component with variants):
1. State: Default (as described above)
2. State: Hover
   - Shadow blur increases: 30px (layer 1), 60px (layer 2)
   - Opacity increases: 40% (layer 1), 20% (layer 2)
   - Visual note: "translateY(-2px)" for developer
3. State: Active
   - Shadow blur decreases: 10px (layer 1), 20px (layer 2)
   - Opacity: 30% (layer 1), 15% (layer 2)
   - Visual note: "scale(0.98)" for developer
4. State: Disabled
   - Overall opacity: 50%
   - No shadow effects

ICON: Use a simple upload icon (cloud with arrow up)

This is the MOST IMPORTANT component - make it perfect with smooth edges and glowing effect, NO BORDERS.
```

**检查生成结果**：
- ✅ 有渐变背景
- ✅ 有光晕阴影（两层）
- ✅ 无边框
- ✅ 文字是"上传"（2字）
- ✅ 有4个Variants

---

### Prompt 2.2: 无界卡片组件 ⭐⭐⭐

```
Create a borderless card component (THIS IS KEY TO THE DESIGN SYSTEM):

DESIGN CONCEPT: Water Droplet on Paper
- The card should look like a colored water droplet bleeding into paper
- Edges fade to transparent (no hard borders!)
- Center is more opaque, edges are transparent

SIZE: 320px × auto (use auto-layout)

BACKGROUND (radial gradient - IMPORTANT):
- Type: Radial gradient
- Shape: Ellipse (ratio 1.5:1, wider than tall)
- Center position: Center of card
- Color stops:
  * 0%: #FFFFFF at 90% opacity (center, most solid)
  * 70%: #FFFFFF at 70% opacity (middle, semi-transparent)
  * 90%: #FFFFFF at 30% opacity (near edge, fading)
  * 100%: #FFFFFF at 0% opacity (edge, fully transparent)

EFFECTS:
- Background blur: 10px (creates frosted glass effect)
- Drop shadow layer 1: X:0 Y:0 Blur:0 Spread:1px, Color:#000000 at 5% opacity
- Drop shadow layer 2: X:0 Y:8 Blur:32px Spread:0, Color:#000000 at 8% opacity

STRUCTURE (use auto-layout):
- Padding: 24px all sides
- Vertical layout
- Gap: 16px between elements
- Corner radius: 16px

CONTENT EXAMPLE:
- Icon (48×48px, purple gradient circle with document icon)
- Title: "项目.zip" (text-xl, semibold, slate-900)
- Description: "245 个文件" (text-sm, slate-600)
- Gradient divider line (1px height, horizontal gradient: transparent → slate-200 → transparent)
- Action icons row (3 icon buttons: download, share, delete - icons only, no text)

VARIANTS:
1. State: Default (as above)
2. State: Hover
   - Center of gradient becomes more opaque (95%)
   - Shadow changes to: 
     * Layer 1: X:0 Y:0 Blur:0 Spread:1px, #06b6d4 at 10% opacity
     * Layer 2: X:0 Y:0 Blur:30px, #06b6d4 at 15% opacity
     * Layer 3: X:0 Y:16 Blur:48px, #000000 at 12% opacity
   - Visual note: "translateY(-4px)"

This card is the signature element of the design system - edges must be soft and glowing, not hard borders!
```

---

### Prompt 2.3: 图标按钮

```
Create an icon button component (borderless design):

SIZE: 44×44px (touch-friendly)

BACKGROUND:
- Solid: rgba(255, 255, 255, 0.5)

EFFECTS:
- Background blur: 8px
- Drop shadow: X:0 Y:0 Blur:0 Spread:1px, #000000 at 3% opacity
- NO border

STRUCTURE:
- Centered icon, 20×20px
- Corner radius: full circle (9999px)

VARIANTS:
- Size: sm(32×32, icon 16px) / md(44×44, icon 20px) / lg(56×56, icon 24px)
- State: Default / Hover

Hover state:
- Background: rgba(6, 182, 212, 0.1)
- Shadow: 0 0 15px rgba(6, 182, 212, 0.3)

ICONS TO CREATE: trash, download, settings, search, more (3 dots)
All icons should be simple line icons, 2px stroke.

Text note: Add aria-label for accessibility (not visible in design)
```

---

### Prompt 2.4: 输入框

```
Create a text input component (borderless design):

SIZE: 320px × 48px

BACKGROUND:
- Solid: rgba(255, 255, 255, 0.7)

EFFECTS:
- Background blur: 10px
- Drop shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.05)
- NO border stroke

STRUCTURE (auto-layout):
- Horizontal layout
- Padding: 12px (vertical), 16px (horizontal)
- Gap: 12px
- Icon (18×18px, slate-400)
- Placeholder text: "搜索" (2 characters max - minimal text principle)

VARIANTS:
1. State: Default (as above)
2. State: Focus
   - Add outer ring: 2px stroke, cyan-500 at 20% opacity
   - Shadow changes to glow: 0 0 30px rgba(6,182,212,0.15)
   - Icon color: cyan-500
3. State: Error
   - Ring color: red-500 at 30%
   - Icon color: red-500

CORNER RADIUS: 12px

TEXT STYLE:
- Font: Inter Regular
- Size: 14px
- Color: slate-900
- Placeholder color: slate-400
```

---

### Prompt 2.5: Toast 通知

```
Create a toast notification component:

SIZE: Auto width × auto height (min 280px wide)

BACKGROUND:
- For success: rgba(16, 185, 129, 0.95) - emerald green
- For error: rgba(239, 68, 68, 0.95) - red

EFFECTS:
- Background blur: 12px
- Glow shadow for success: 0 0 30px rgba(16,185,129,0.5)
- Glow shadow for error: 0 0 30px rgba(239,68,68,0.5)
- Regular shadow: 0 8px 24px rgba(0,0,0,0.2)

STRUCTURE:
- Horizontal layout
- Padding: 12px 16px
- Gap: 12px
- Icon (20×20px, white) - check-circle or x-circle
- Text: "上传完成" (4 characters max - minimal text)
- Close button (16×16px X icon, white)

CORNER RADIUS: 12px

VARIANTS:
- Type: success / error / info / warning

Create all 4 types with appropriate colors and icons.
Text examples (max 4-6 Chinese characters):
- Success: "上传完成", "解压完成"
- Error: "文件损坏", "网络错误"
- Info: "处理中", "准备中"
- Warning: "文件过大", "空间不足"
```

---

### Prompt 2.6: 模态框

```
Create a modal dialog component (borderless design):

OVERLAY (background):
- Full screen overlay
- Background: rgba(15, 23, 42, 0.6) - dark semi-transparent
- Background blur: 40px (heavy blur)

MODAL CONTAINER:
SIZE: 480px × auto

BACKGROUND (radial gradient - borderless!):
- Radial gradient from center
- Color stops:
  * 0%: #FFFFFF at 95% opacity (center)
  * 70%: #FFFFFF at 90% opacity
  * 100%: #FFFFFF at 85% opacity (edges)

EFFECTS:
- Background blur: 24px
- Shadow (multi-layer):
  * Layer 1: X:0 Y:0 Blur:0 Spread:1px, #06b6d4 at 15% opacity
  * Layer 2: X:0 Y:0 Blur:60px, #06b6d4 at 20% opacity
  * Layer 3: X:0 Y:20 Blur:80px, #000000 at 30% opacity

STRUCTURE:
- Padding: 24px
- Vertical layout, gap: 24px
- Corner radius: 16px

CONTENT:
1. Header row (horizontal):
   - Title: "删除文件" (4 chars max)
   - Close button (icon only, X)
2. Body:
   - Text: "确定删除这3个文件？" (keep concise)
3. Footer (horizontal, gap: 12px):
   - Secondary button: "取消" (2 chars)
   - Primary button: "删除" (2 chars)

Make it look ethereal and floating, NOT like a solid box.
```

---

### Prompt 2.7: 文件上传拖拽区 ⭐⭐⭐

```
Create a drag-drop file upload zone (borderless design):

SIZE: 640px × 256px

BACKGROUND (radial gradient - water droplet effect):
- Radial gradient, ellipse
- Color stops:
  * 0%: #FFFFFF at 90%
  * 70%: #FFFFFF at 60%
  * 90%: #FFFFFF at 30%
  * 100%: #FFFFFF at 0% (fully transparent edges!)

EFFECTS:
- Background blur: 10px
- Shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.08)

CORNER RADIUS: 16px

CENTER CONTENT (vertical layout):
1. Icon container (64×64px circle):
   - Background: radial gradient, cyan-500 at 15% opacity to transparent
   - Shadow: 0 0 20px rgba(6,182,212,0.2)
   - Upload cloud icon, 32×32px, cyan-500
2. Title: "拖入文件" (4 chars - minimal text!)
   - Font: Inter Semibold, 18px, slate-900
3. Subtitle: "或点击选择" (5 chars)
   - Font: Inter Regular, 14px, slate-500

VARIANTS:
1. State: Default (as above)
2. State: Dragging (when file is dragged over)
   - Background gradient changes to cyan tint:
     * 0%: rgba(6,182,212,0.2)
     * 70%: rgba(6,182,212,0.05)
     * 100%: transparent
   - Shadow: 0 0 0 2px rgba(6,182,212,0.3), 0 0 60px rgba(6,182,212,0.4)
   - Scale: 1.02
   - Icon container glow: 0 0 40px rgba(6,182,212,0.5)

This is a signature component - must have soft, glowing edges!
```

---

## 三、页面生成

### Prompt 3.1: 主界面

```
Create the main screen for an unzip application (1440×900px desktop):

DESIGN STYLE: Borderless, fluid technology, water-like aesthetics

BACKGROUND:
- Gradient: from slate-50 to cyan-50/30 (top to bottom)

LAYOUT:

1. TOP NAVIGATION BAR (sticky, full width):
   - Height: 64px
   - Background: rgba(255, 255, 255, 0.85)
   - Background blur: 12px
   - Shadow: 0 0 20px rgba(6,182,212,0.1), 0 8px 32px rgba(0,0,0,0.08)
   - NO border!
   - Content (horizontal):
     * Logo + "Unzip" text (left)
     * Icon buttons (right): search, settings, user
     * All icon buttons are borderless with subtle glow
   - Bottom edge: 1px gradient line (transparent → cyan-500/20% → transparent)

2. MAIN CONTENT (centered, max-width 1200px):
   
   Upload Zone (prominent):
   - Use the drag-drop component from previous prompt
   - Size: 600×200px
   - Text: "拖入文件" (4 chars)
   
   Section title:
   - "最近解压" (4 chars) - text-2xl, semibold
   - Top margin: 64px
   
   File Grid (3 columns, gap 24px):
   - Use borderless card components
   - Each card shows:
     * Purple file icon (48×48px)
     * Filename: "项目.zip"
     * Size: "24.5 MB"
     * Action icons at bottom (download, more - icons only)
   - Cards have soft edges, radial gradient backgrounds
   - Hover state: glow enhances

3. FLOATING ACTION BUTTON (bottom-right):
   - Position: fixed, bottom 24px, right 24px
   - Size: 56×56px circle
   - Background: cyan gradient
   - Shadow: 0 0 30px rgba(6,182,212,0.5)
   - Icon: plus, 24×24px, white
   - NO text, icon only

IMPORTANT:
- NO borders anywhere in the entire design
- All cards use radial gradients with transparent edges
- All shadows are glows, not hard shadows
- All text is minimal (2-4 characters)
- Use icons for actions, not text buttons
```

---

### Prompt 3.2: 解压进度界面

```
Create a modal showing file extraction progress (borderless design):

MODAL OVERLAY:
- Full screen
- Background: rgba(15, 23, 42, 0.6)
- Background blur: 40px

MODAL CONTENT:
SIZE: 480px × auto

BACKGROUND (radial gradient - ethereal feel):
- Radial gradient
- Stops:
  * 0%: #FFFFFF 95%
  * 70%: #FFFFFF 90%
  * 100%: #FFFFFF 85%

EFFECTS:
- Background blur: 24px
- Triple shadow:
  * 0 0 0 1px rgba(6,182,212,0.15)
  * 0 0 60px rgba(6,182,212,0.2)
  * 0 20px 80px rgba(0,0,0,0.3)

STRUCTURE (padding 32px, vertical, gap 24px):

1. Liquid progress ring (center):
   - Circular, 120×120px
   - Background track: cyan-500/20%
   - Progress fill: cyan gradient
   - Glow: 0 0 40px rgba(6,182,212,0.4)
   - Center text: "65%" (large, tabular numbers)

2. Status text:
   - "解压中" (3 chars - minimal!)
   - Font: Inter Semibold, 18px

3. File count:
   - "245/512 文件" (use monospace for numbers)
   - Font: JetBrains Mono, 14px, slate-600

4. Liquid progress bar:
   - Container: 100% width, 8px height, rounded-full
   - Background: cyan-500/10%
   - Fill: cyan gradient (animate from left to right)
   - Glow: 0 0 15px rgba(6,182,212,0.5)
   - Inner highlight: inset top light

5. Cancel button (centered):
   - Secondary style (outlined but using glow, not border)
   - Text: "取消" (2 chars)

CORNER RADIUS: 16px

Make it feel like floating in water, very soft and ethereal.
```

---

## 四、批量生成技巧

### Prompt 4.1: 批量生成状态图标

```
Create a set of status icons (borderless style):

Create 4 circular icon containers, each 64×64px:

1. SUCCESS (green):
   - Background: radial gradient, #10b981 at 15% → transparent
   - Glow shadow: 0 0 30px rgba(16,185,129,0.4)
   - Icon: check-circle, 32×32px, emerald-500
   - Use for: upload success, extraction complete

2. ERROR (red):
   - Background: radial gradient, #ef4444 at 15% → transparent
   - Glow shadow: 0 0 30px rgba(239,68,68,0.4)
   - Icon: x-circle, 32×32px, red-500

3. WARNING (orange):
   - Background: radial gradient, #fb923c at 15% → transparent
   - Glow shadow: 0 0 30px rgba(251,146,60,0.4)
   - Icon: alert-triangle, 32×32px, orange-500

4. INFO (cyan):
   - Background: radial gradient, #06b6d4 at 15% → transparent
   - Glow shadow: 0 0 30px rgba(6,182,212,0.4)
   - Icon: info-circle, 32×32px, cyan-500

All icons should pulse gently (breathing animation note).
```

---

### Prompt 4.2: 文件类型图标组

```
Create file type icons for zip/rar/7z files:

Style: Minimal, modern, with subtle glow

Each icon: 48×48px

1. ZIP file:
   - Rounded rectangle background (12px radius)
   - Purple gradient: #a78bfa to #c084fc
   - Glow: 0 0 15px rgba(167,139,250,0.3)
   - White zipper symbol in center

2. RAR file:
   - Pink gradient: #f472b6 to #f9a8d4
   - Glow: 0 0 15px rgba(244,114,182,0.3)
   - White book/stack symbol

3. 7Z file:
   - Orange gradient: #fb923c to #fbbf24
   - Glow: 0 0 15px rgba(251,146,60,0.3)
   - White "7Z" text

All backgrounds should be semi-transparent with blur.
```

---

## 五、高效Prompt模板

### 通用组件Prompt模板

```
Create a [COMPONENT_NAME] component (borderless design):

SIZE: [WIDTH] × [HEIGHT]

BACKGROUND:
[选择一种]
- Solid: rgba(255, 255, 255, 0.7)
- Linear gradient: [angle]deg, [color1] → [color2]
- Radial gradient: center [opacity%] → edge transparent

EFFECTS:
- Background blur: [10/20/30]px
- Shadow: [具体参数或引用glow-md]
- NO hard borders

STRUCTURE:
[描述布局]

VARIANTS:
[列出状态]

MINIMAL TEXT:
[指定文字，确保≤4字]

REFERENCE: docs/ux/[XX]-[name].md Section [X.X]
```

---

## 六、分步执行计划

### 🚀 今天就开始（2小时MVP）

#### Phase 1: 初始化（30分钟）

**Prompt 1 - 建立上下文**：
```
I'm designing an unzip application with a unique design system called "Fluid Technology".

Key principles:
1. BORDERLESS: Never use borders, use glows and gradients instead
2. MINIMAL TEXT: Buttons max 2-4 Chinese characters, use icons primarily
3. WATER THEME: Components look like water droplets, with soft glowing edges

Main color: Cyan (#06b6d4)
Shadow style: Glow effects (0 0 20px rgba(6,182,212,0.3))
Background: Radial gradients with transparent edges

Please acknowledge these principles before I ask you to create components.
```

**等AI确认理解后**，再继续

---

#### Phase 2: 核心组件（90分钟）

**按顺序输入**：
1. Prompt 2.1 (主按钮) - 15分钟
2. Prompt 2.2 (无界卡片) - 20分钟 ⭐ 最重要
3. Prompt 2.3 (图标按钮) - 10分钟
4. Prompt 2.4 (输入框) - 10分钟
5. Prompt 2.5 (Toast) - 10分钟

**检查每个组件**：
- ✅ 无边框？
- ✅ 有光晕？
- ✅ 文字极简？

**调整Prompt**（如果不满意）：
```
"Make the edges more transparent and add a stronger glow effect"
"Remove the border and use a subtle shadow instead"
"Reduce the text to just 2 Chinese characters"
```

---

#### Phase 3: 组装界面（30分钟）

**Prompt 3.1** (主界面) - 一次性生成

检查生成的界面：
- ✅ 导航栏无边框？
- ✅ 上传区有晕染效果？
- ✅ 卡片边缘柔和？

---

### 📅 完整版计划（3天）

```
Day 1 (4小时):
  ✅ 建立上下文
  ✅ 生成10个核心组件
  ✅ 生成主界面

Day 2 (3小时):
  ✅ 生成其他页面（进度、设置、空状态）
  ✅ 生成移动端适配
  ✅ 调整细节

Day 3 (1小时):
  ✅ 添加动效标注
  ✅ 整理Dev Mode
  ✅ 导出资源
```

---

## 七、AI生成后的人工调整

### 🎨 必须手动调整的内容

Figma Make可能做不完美的地方：

#### 1. 径向渐变的细节
```
AI可能生成：
- ❌ 渐变中心不在正中
- ❌ 透明度过渡不够柔和
- ❌ 椭圆比例不对

手动调整：
1. 点击渐变填充
2. 拖动中心点到卡片正中
3. 调整色标位置（0%→70%→90%→100%）
4. 调整椭圆手柄，比例约1.5:1
```

#### 2. 光晕阴影的层次
```
AI可能生成：
- ❌ 只有一层阴影
- ❌ Blur值不对
- ❌ 颜色透明度太高/太低

手动调整：
1. Effects面板
2. 确保有2-3层Drop shadow
3. 第一层：Blur 20px, Opacity 30%
4. 第二层：Blur 40px, Opacity 15%
```

#### 3. 极简文字验证
```
AI可能生成：
- ❌ "上传文件到服务器" (太长)
- ❌ "请点击这里上传" (有虚词)

手动修改：
1. 选中文字
2. 改为："上传" (2字) ✅
3. 或："开始解压" (4字) ✅
```

---

## 八、省时技巧

### 💡 复用生成的组件

```
生成1个按钮后：

1. Duplicate (Cmd+D)
2. 修改文字："上传" → "删除"
3. 修改图标：upload → trash
4. 如果需要，改颜色为红色
5. 完成！

不需要重新生成每个按钮！
```

### 💡 使用"基于现有组件"的Prompt

```
"Based on the primary button I just created, make a secondary button with these changes:
- Background: transparent with blur instead of gradient
- Shadow: subtle borderless shadow instead of glow
- Text color: slate-700 instead of white
- On hover: cyan tint background (rgba(6,182,212,0.1))"
```

---

## 九、质量检查（AI生成后）

### ✅ 检查清单

**每个组件生成后，检查**：

```
视觉检查：
□ 无硬性边框（border）
□ 边缘是渐变或模糊的
□ 有光晕或阴影效果
□ 圆角合适（8-16px）
□ 颜色符合色彩系统

文字检查：
□ 按钮≤4个字
□ 无"请"、"您"等虚词
□ 能用图标的地方用了图标

技术检查：
□ 使用了Auto Layout
□ 有Variants（至少Default/Hover）
□ 间距是8的倍数
□ 背景模糊已启用
□ 阴影有多层

对比文档：
□ 与对应的设计文档一致
□ 参数与09-design-tokens.md匹配
```

---

## 十、终极Prompt（All-in-One）

### 如果想一次性生成整个设计系统

```
Create a complete design system for an unzip application following these principles:

=== DESIGN PHILOSOPHY ===
"Fluid Technology" - blend of liquid fluidity and digital precision
- Components look like water droplets on paper
- NO hard borders anywhere - use glows, gradients, and blur
- Minimal text (max 2-4 Chinese characters per button)
- Water color spectrum (cyan primary, aurora accents)

=== VISUAL LANGUAGE: BORDERLESS ===
Every component must:
1. Have radial gradient backgrounds (center opaque → edge transparent)
2. Use background blur (10-30px)
3. Use glow shadows instead of borders
4. Have soft, bleeding edges

=== COLOR PALETTE ===
Primary: #06b6d4 (cyan-500)
Gradient: linear 135deg, #06b6d4 → #0ea5e9
Success: #10b981
Error: #ef4444
Warning: #fb923c
Background: #ffffff, #f8fafc
Text: #0f172a (primary), #475569 (secondary)

=== SHADOWS (CRITICAL) ===
Borderless card: 0 0 0 1px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.08)
Glow (cyan): 0 0 20px rgba(6,182,212,0.3), 0 0 40px rgba(6,182,212,0.15)
Glow (strong): 0 0 30px rgba(6,182,212,0.4), 0 0 60px rgba(6,182,212,0.2)

=== COMPONENTS TO CREATE ===
1. Primary button (cyan gradient, glow, text: "上传")
2. Icon button (circular, 44×44px, icon only)
3. Borderless card (radial gradient, soft edges)
4. Text input (blur background, glow on focus)
5. Toast notification (colored, strong glow)
6. Modal dialog (ethereal, floating)
7. File upload zone (drag-drop, glow when dragging)

=== MAIN SCREEN ===
1440×900px showing:
- Borderless navigation (blur, glow shadow)
- Upload zone (large, prominent, soft edges)
- File grid (3 columns of borderless cards)
- Floating action button (bottom-right, glowing)

=== TEXT RULES ===
All buttons: 2-4 Chinese characters max
Examples: "上传", "删除", "开始解压"
NO verbose text like "请上传文件"

=== SPACING ===
8px grid: 8, 16, 24, 32, 48, 64px
Card padding: 24px
Button padding: 12px×24px

Please create this design system with a foundation page, component library, and main screen.
REMEMBER: No borders, only glows and gradients!
```

**这个prompt包含了所有核心信息**，可以一次性生成大部分内容！

---

## 十一、预期效果与调整

### ✅ Figma Make 会做得很好的：

- ✅ 基本布局和结构
- ✅ 颜色应用
- ✅ 文字样式
- ✅ 组件排列
- ✅ 间距系统
- ✅ 基础阴影

### ⚠️ 可能需要手动调整的：

- ⚠️ **径向渐变的细节**（透明度过渡）
- ⚠️ **多层阴影**（可能只生成1层）
- ⚠️ **背景模糊效果**（需确认已启用）
- ⚠️ **光晕强度**（可能需要增强）
- ⚠️ **极细节的文字**（可能还是会生成长文案）

**调整方法**：
用自然语言继续对话：
```
"Make the card edges more transparent"
"Add a second layer of shadow with blur 40px"
"Change the button text to just 2 Chinese characters: 上传"
"Increase the glow intensity"
```

---

## 十二、成功标准

### 🎯 生成的设计稿应该：

```
视觉上：
✅ 像水彩画一样，边缘柔和晕染
✅ 像晨雾一样，轻盈透明
✅ 像荧光一样，柔和发光
❌ 不像传统软件那样，方框+边框

交互上：
✅ 悬停时光晕变强
✅ 点击时有涟漪提示
✅ 所有操作用图标
❌ 不要长文案

技术上：
✅ 所有组件可导出代码
✅ 颜色用变量
✅ Dev Mode可查看参数
```

---

## 🎁 给你的最终建议

### 推荐方案：混合策略

```
用AI生成（80%工作量）：
  ✅ 基础结构
  ✅ 组件库
  ✅ 页面布局
  ✅ 颜色/文字应用

人工精修（20%工作量）：
  ✅ 调整径向渐变透明度
  ✅ 增强光晕效果
  ✅ 确保文字极简
  ✅ 添加动效标注
```

**预计总时间：6-10小时**（vs 手动60小时，节省80%！）

---

## 🚀 立即行动（今天30分钟）

```
1. 打开Figma，启动Figma Make
2. 复制粘贴"Prompt 1 - 建立上下文"
3. 等AI确认理解
4. 复制粘贴"Prompt 2.1 - 主按钮"
5. 检查生成结果
6. 如不满意，用自然语言调整

→ 30分钟后你就有第一个无界按钮！
```

**然后明天继续，3天内完成所有设计！** 💪🎨✨
