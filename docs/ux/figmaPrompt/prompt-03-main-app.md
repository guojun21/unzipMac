# Prompt 03: 主应用界面

**目标**: 生成Unzip应用主界面  
**基于**: Prompt 02的无界组件  
**状态**: 📝 待执行  
**预计时间**: 20-30分钟  
**优先级**: ⭐⭐⭐⭐

---

## 🎯 复制此Prompt

```
Excellent! The borderless components are perfect. Now create the MAIN UNZIP APPLICATION SCREEN.

=== UNZIP MAIN SCREEN (1440×900px) ===

Create: src/pages/UnzipMainApp.tsx

Use the borderless components we just created.

FULL SCREEN BACKGROUND:
- Gradient: from-slate-50 via-white to-cyan-50/30

---

1. NAVIGATION BAR (top, sticky, full width):

Height: 64px
Background: rgba(255,255,255,0.85), blur(12px)
Shadow: 0 0 20px rgba(6,182,212,0.1), 0 8px 32px rgba(0,0,0,0.08)
NO border!

Content (max-width 1400px, centered, horizontal):
  Left:
    - Droplet icon, 24px, cyan-500
    - Text "Unzip" (Inter Semibold, 18px)
  
  Right (gap 12px):
    - IconButton: search
    - IconButton: settings
    - IconButton: user
    All 44×44px, borderless

Bottom decoration:
- 1px gradient line: transparent → cyan-500/20% → transparent

---

2. MAIN CONTENT (max-width 1200px, centered, padding-top 48px):

Upload Zone (prominent):
- Use FileUploadZone component
- Size: 600×200px
- Center aligned
- Text: "拖入文件" (4 chars)
- "或点击选择" (5 chars)

Spacing: margin-top 64px

Section:
- Title: "最近解压" (4 chars)
- Font: Inter Semibold, 24px, slate-900
- Margin-bottom: 24px

File Grid (3 columns × 2 rows, gap 24px):
- Use BorderlessCard components
- 6 cards total

Each card:
  * File icon with colored glow:
    - Card 1: Purple (#a78bfa), .zip file
    - Card 2: Pink (#f472b6), .rar file  
    - Card 3: Orange (#fb923c), .7z file
    - Card 4-6: Various colors and types
  
  * Content:
    - Name: "项目.zip", "备份.rar", etc
    - Size: "24.5 MB", "156 MB", etc (monospace)
    - Time: "2小时前", "昨天", "3天前"
  
  * Divider: gradient line
  
  * Actions: 3 IconButtons
    - Download icon
    - Share icon
    - Delete icon
    NO text labels!

---

3. FLOATING ACTION BUTTON (bottom-right):

Position: fixed, bottom 24px, right 24px
Size: 56×56px circle

Background: Linear gradient #06b6d4 → #0ea5e9
Shadow: 0 0 30px rgba(6,182,212,0.5), 0 8px 24px rgba(0,0,0,0.2)

Icon: Plus, 24px, white
NO text!

Hover: Glow 0 0 50px, scale 1.1
Active: scale 0.95

---

4. TOAST DEMOS (top-right corner):

Show 2 stacked toasts:
- Success: "上传完成" (green glow)
- Error: "文件损坏" (red glow)

Position: fixed, top 80px, right 24px

---

INTERACTIONS (framer-motion):

- Cards: stagger animation on load (delay 50ms each)
- Hover: glow enhances smoothly
- Scroll: smooth scroll behavior
- FAB: pulse animation (subtle breathing)

---

CRITICAL RULES:

✓ NO borders anywhere
✓ All cards: radial gradient backgrounds
✓ All shadows: glow effects (cyan)
✓ All text: ≤4 chars (中文)
✓ All actions: icon-only buttons
✓ Background blur on floating elements
✓ Spacing: 8px grid (16, 24, 32, 48, 64)

Visual should feel like:
💧 Floating water droplets
✨ Soft glowing edges
🌊 Light and transparent

NOT like:
❌ Boxes with borders
❌ Solid backgrounds
❌ Sharp edges

Generate the main screen now using BorderlessPrimaryButton, BorderlessCard, IconButton, FileUploadZone from Prompt 02.
```

---

## 预期结果

**生成文件**: `src/pages/UnzipMainApp.tsx`

**页面效果**：
```
┌─────────────────────────────────────┐
│ 💧 Unzip      [🔍] [⚙️] [👤]        │ ← 无界导航
├─────────────────────────────────────┤
│                                     │
│      ┌─────────────────┐            │
│      │   ☁️ 拖入文件    │            │ ← 晕染上传区
│      │   或点击选择     │            │
│      └─────────────────┘            │
│                                     │
│  最近解压 ─────────────              │
│                                     │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │ 项目 │ │ 备份 │ │ 文档 │        │ ← 无界卡片
│  │ .zip │ │ .rar │ │ .7z  │        │   边缘晕染
│  └──────┘ └──────┘ └──────┘        │
│                                     │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │      │ │      │ │      │        │
│  └──────┘ └──────┘ └──────┘        │
│                                 [+] │ ← 悬浮按钮
└─────────────────────────────────────┘   强光晕

全屏都是柔和晕染，无任何硬边框！
```

---

## 成功标准

```
视觉：
  ✓ 像水滴晕染在纸上
  ✓ 边缘柔和发光
  ✓ 悬停时光晕扩散
  
交互：
  ✓ 卡片stagger进入
  ✓ hover丝滑流畅
  ✓ FAB轻微呼吸
  
文字：
  ✓ 所有文字≤4字
  ✓ 操作全用图标
```

---

## 下一步

生成并验证通过后 → **执行Prompt 04**（文件列表视图）
