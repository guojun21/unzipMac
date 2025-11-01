# Prompt 02: 核心无界组件

**目标**: 生成5个核心无界组件  
**状态**: ⏳ 下一步执行  
**优先级**: ⭐⭐⭐⭐⭐ 最高  
**预计时间**: 15-20分钟

---

## 🔥 立即复制此Prompt给Figma Make

```
Perfect! The foundation page looks great. Now let's create the CORE BORDERLESS COMPONENTS.

CRITICAL: These components MUST follow "Borderless" design - NO borders, only glows and radial gradients.

=== COMPONENT 1: BORDERLESS PRIMARY BUTTON ===

Create: src/components/borderless/BorderlessPrimaryButton.tsx

SPECS:
- Size: Auto width × 48px
- Background: Linear gradient 135deg, #06b6d4 (0%) → #0ea5e9 (100%)
- Shadow (glow - KEY!):
  * Layer 1: X:0 Y:0 Blur:20px, #06b6d4 at 30% opacity
  * Layer 2: X:0 Y:0 Blur:40px, #06b6d4 at 15% opacity
- Padding: 12px (vertical) × 24px (horizontal)
- Gap: 8px
- Icon: 18×18px (upload icon)
- Text: "上传" (EXACTLY 2 Chinese characters)
- Font: Inter Medium, 14px, white
- Corner radius: 12px
- NO border!

VARIANTS:
1. Default (as above)
2. Hover: Blur 30px + 60px, Opacity 40% + 20%, translateY(-2px)
3. Active: Blur 10px + 20px, scale(0.98)
4. Disabled: Opacity 50%, no shadow

---

=== COMPONENT 2: BORDERLESS CARD (MOST IMPORTANT!) ===

Create: src/components/borderless/BorderlessCard.tsx

THIS IS THE SIGNATURE COMPONENT - edges must look like water droplet bleeding into paper!

SPECS:
- Size: 320px × auto
- Background (RADIAL GRADIENT - CRITICAL):
  * Type: radial-gradient
  * Shape: ellipse at center
  * Stops:
    - 0%: rgba(255,255,255,0.9)    - center, most solid
    - 70%: rgba(255,255,255,0.7)   - fading
    - 90%: rgba(255,255,255,0.3)   - nearly transparent  
    - 100%: rgba(255,255,255,0)    - fully transparent edges!

- Effects:
  * backdrop-filter: blur(10px)
  * Shadow layer 1: X:0 Y:0 Blur:0 Spread:1px, #000 at 5%
  * Shadow layer 2: X:0 Y:8 Blur:32px, #000 at 8%

- Padding: 24px
- Gap: 16px (vertical)
- Corner radius: 16px
- NO border!

CONTENT TEMPLATE:
1. Icon (48×48, purple glow background)
2. Title: "项目.zip" (Inter Semibold, 20px)
3. Meta: "245 个文件" (Inter Regular, 14px, slate-600)
4. Gradient divider: 1px, transparent → slate-200/50% → transparent
5. Actions: 3 IconButtons (download, share, delete)

HOVER STATE:
- Center opacity: 95%
- Shadow: cyan glow layers
- Transform: translateY(-4px)

---

=== COMPONENT 3: ICON BUTTON ===

Create: src/components/borderless/IconButton.tsx

SPECS:
- Sizes: sm(32), md(44), lg(56) - all px
- Shape: Circle (rounded-full)
- Background: rgba(255,255,255,0.5), blur 8px
- Shadow: subtle borderless
- Icon: centered, slate-600
- aria-label required (for accessibility)
- NO text visible!

HOVER: Background cyan-500/10%, glow 15px

---

=== COMPONENT 4: BORDERLESS INPUT ===

Create: src/components/borderless/BorderlessInput.tsx

SPECS:
- Size: 320×48px
- Background: rgba(255,255,255,0.7), blur 10px
- Shadow: borderless
- NO border!
- Placeholder: "搜索" (2 chars ONLY)
- Icon: search, 18px, slate-400

FOCUS STATE:
- Ring: 2px cyan-500/20%
- Shadow: glow appears (blur 30px)
- Icon color: cyan-500

---

=== COMPONENT 5: TOAST NOTIFICATION ===

Create: src/components/borderless/ToastNotification.tsx

4 TYPES (create variants):

Success:
- Background: rgba(16,185,129,0.95)
- Glow: 0 0 30px rgba(16,185,129,0.5)
- Icon: check-circle
- Text: "上传完成" (4 chars)

Error:
- Background: rgba(239,68,68,0.95)
- Glow: 0 0 30px rgba(239,68,68,0.5)
- Text: "文件损坏" (4 chars)

Info: cyan version, text "处理中" (3 chars)
Warning: orange version, text "文件过大" (4 chars)

All with:
- blur(12px)
- Close button (X icon, 16px)
- Enter animation: blur(10px) → blur(0)

---

ALSO CREATE:

src/pages/ComponentShowcase.tsx

Show all 5 components in a beautiful grid:
- Multiple button states
- 3 cards in a row
- Input examples
- Upload zone (default + dragging states)
- All 4 toast types

Background: gradient slate-50 to cyan-50/30

---

REMINDER:
- NO borders anywhere
- Radial gradients for cards (center solid → edges transparent)
- Glow shadows (cyan colored)
- Text ≤4 Chinese characters
- Use framer-motion for all animations

Generate these 5 components + showcase page now.
```

---

## ✅ 生成后检查清单

### BorderlessPrimaryButton
- [ ] 无border属性
- [ ] 渐变背景 #06b6d4→#0ea5e9
- [ ] 光晕blur: 20+40px
- [ ] 文字是"上传"（2字）
- [ ] 有4个variants

### BorderlessCard ⭐
- [ ] 径向渐变背景（0%→70%→90%→100%）
- [ ] 边缘完全透明
- [ ] backdrop-filter: blur(10px)
- [ ] 无border
- [ ] hover时光晕增强

### IconButton
- [ ] 圆形
- [ ] 3种尺寸
- [ ] 纯图标无文字
- [ ] aria-label正确

### BorderlessInput  
- [ ] 半透明背景
- [ ] blur(10px)
- [ ] placeholder"搜索"（2字）
- [ ] focus时光晕

### ToastNotification
- [ ] 4种类型
- [ ] 强光晕
- [ ] 文字≤8字
- [ ] 边缘消融动画

---

## 如果不满意

**追加调整prompt**：

```
// 如果边框还在
"Remove all border classes completely. Use only box-shadow."

// 如果光晕太弱
"Increase cyan glow to blur:30px at 40% opacity for hover."

// 如果背景不是径向渐变
"Card background MUST be radial-gradient from center (90% white) to edges (0% transparent)."

// 如果文字太长
"Shorten to ≤4 Chinese characters: '上传' not '上传文件'."
```

---

## 下一步

生成并验证通过后 → **执行Prompt 03**（主应用界面）
