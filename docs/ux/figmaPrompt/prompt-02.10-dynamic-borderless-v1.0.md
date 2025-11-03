# Prompt 02.10: 动态无界 v1.0

**目标**: 光晕紧贴容器边缘，整体施加模糊  
**日期**: 2025-11-02  
**文件**: 10-DynamicBorderlessV1.0.tsx

---

## 🎯 本次探索的方向

合并方案B和C（实质相同），修正光晕实现方式。核心突破：光晕应该是容器边缘的扩散，而非独立的大光晕层。光晕紧贴容器边缘走，模糊施加在"容器+光晕"整体上。

---

## 🎨 中文Prompt

```
创建 v1.0 - 光晕紧贴边缘方案

文件: src/pages/10-DynamicBorderlessV1.0.tsx
组件: src/components/borderless/DynamicBorderlessCardV1.tsx

核心改进：

1. 合并方案B和C（它们本质相同）
2. 光晕紧贴容器边缘（不是独立大椭圆）
3. 光晕只在容器外部，不渗透到内部
4. 光晕贴合容器形状（不是圆形，而是跟随容器轮廓）
5. 模糊施加在"容器边缘+光晕"整体上

技术实现：

```tsx
export function DynamicBorderlessCardV1({
  iconBackgroundBlur = 2,
  containerBlur = 6,        // 整体模糊度（容器+光晕）
  glowSpread = 20,          // 光晕扩散范围（现在可以很小）
  glowIntensity = 0.15,     // 光晕强度
}: Props) {
  
  return (
    <div className="relative" style={{ padding: '60px' }}>
      {/* 单层容器 - 光晕用box-shadow */}
      <motion.div
        variants={{
          default: {
            // 容器背景（径向渐变）
            background: 'radial-gradient(...)',
            
            // 光晕：紧贴边缘，向外扩散
            boxShadow: `0 0 ${glowSpread}px ${glowSpread * 0.3}px rgba(6,182,212,${glowIntensity})`,
            //          ↑ blur  ↑ spread（向外扩散）
            // spread参数让光晕从边缘向外扩散，不会渗透到内部
            
            // 整体模糊（包括容器+光晕）
            filter: `blur(${containerBlur}px)`,
            
            borderRadius: '24px',
          },
          hover: {
            background: 'radial-gradient(...)',
            boxShadow: `0 0 15px 8px rgba(6,182,212,0.2)`,  // 光晕收紧
            filter: 'blur(0px)',  // 边缘清晰
            borderRadius: '16px',
            y: -4,
          }
        }}
        style={{
          width: '320px',
          height: '240px',
          padding: '32px',
        }}
      >
        {/* 内容层 - 独立清晰 */}
        <div style={{
          filter: 'blur(0)',
          transform: 'translateZ(0)',
          position: 'relative',
          zIndex: 10,
        }}>
          {/* 紫色背景 + SVG + 文字 */}
        </div>
      </motion.div>
    </div>
  );
}
```

关键点：

box-shadow语法：
```css
box-shadow: 0 0 [blur] [spread] [color];
              ↑     ↑       ↑
            x,y   模糊   向外扩散距离
```

- blur: 光晕的模糊范围
- spread: 光晕向外扩散的距离（正值向外，负值向内）
- 通过spread控制，光晕只在边缘外，不渗透内部
- 形状跟随容器的border-radius，不是独立圆形

滑块调整：

1. 紫色背景模糊: 0-5px（图标背景）
2. 整体模糊度: 0-15px（容器+光晕整体）← 合并了原来的"容器"和"光晕模糊"
3. 光晕扩散范围: 0-40px（可以很小！）← 从20px可以降到0
4. 光晕强度: 0-0.3（透明度）← 新增

示例效果：

默认态：
- 整体模糊: 6px
- 光晕扩散: 20px（紧贴边缘向外20px）
- 光晕强度: 0.15

Hover态：
- 整体模糊: 0px（清晰）
- 光晕扩散: 8px（收紧）
- 光晕强度: 0.2（稍亮）

优势：
- 光晕紧贴容器，不是独立大光团
- 光晕跟随容器形状
- 扩散范围可以很小（0-40px，而非固定大范围）
- 光晕只在外部，内部干净
- 模糊作用在整体上，效果统一

导航位置：
在 App.tsx 中添加为第10个按钮
按钮文字: "10 · v1.0 光晕紧贴边缘"
按钮颜色: amber-400 to amber-500

页面底部添加prompt记录（包含本prompt的中英文完整内容和元数据）

生成v1.0页面。
```

---

## 🎨 English Prompt

```
Create v1.0 - Glow tightly follows container edges

File: src/pages/10-DynamicBorderlessV1.0.tsx
Component: src/components/borderless/DynamicBorderlessCardV1.tsx

Core improvements:

1. Merge Solutions B and C (they are essentially the same)
2. Glow tightly follows container edges (not independent large ellipse)
3. Glow only outside container, not bleeding inside
4. Glow follows container shape (via box-shadow, not separate layer)
5. Blur applied to "container + glow" as a whole

Technical implementation:

```tsx
export function DynamicBorderlessCardV1({
  iconBackgroundBlur = 2,
  containerBlur = 6,        // Overall blur (container + glow)
  glowSpread = 20,          // Glow spread range (can be very small now!)
  glowIntensity = 0.15,     // Glow intensity
}: Props) {
  
  return (
    <div className="relative" style={{ padding: '60px' }}>
      {/* Single container - glow via box-shadow */}
      <motion.div
        variants={{
          default: {
            // Container background
            background: 'radial-gradient(...)',
            
            // Glow: tightly follows edge, spreads outward
            boxShadow: `0 0 ${glowSpread}px ${glowSpread * 0.3}px rgba(6,182,212,${glowIntensity})`,
            //          ↑ blur  ↑ spread (outward expansion)
            // Spread parameter makes glow extend from edge outward, won't bleed inside
            
            // Overall blur (includes container + glow)
            filter: `blur(${containerBlur}px)`,
            
            borderRadius: '24px',
          },
          hover: {
            background: 'radial-gradient(...)',
            boxShadow: `0 0 15px 8px rgba(6,182,212,0.2)`,  // Tighter glow
            filter: 'blur(0px)',  // Sharp edges
            borderRadius: '16px',
            y: -4,
          }
        }}
        style={{
          width: '320px',
          height: '240px',
          padding: '32px',
        }}
      >
        {/* Content layer - independent sharpness */}
        <div style={{
          filter: 'blur(0)',
          transform: 'translateZ(0)',
          position: 'relative',
          zIndex: 10,
        }}>
          {/* Purple background + SVG + Text */}
        </div>
      </motion.div>
    </div>
  );
}
```

Key points:

box-shadow syntax:
```css
box-shadow: 0 0 [blur] [spread] [color];
              ↑     ↑       ↑
            x,y   blur   outward spread distance
```

- blur: Glow blur range
- spread: Outward expansion distance (positive = outward, negative = inward)
- Via spread, glow stays outside edge, doesn't penetrate inside
- Shape follows container's border-radius, not independent circle

Sliders:

1. Icon background blur: 0-5px
2. Overall blur: 0-15px (container + glow together) ← Merged "container" and "glow blur"
3. Glow spread range: 0-40px (can be very small!) ← Can go down to 0
4. Glow intensity: 0-0.3 (opacity) ← New

Example effect:

Default:
- Overall blur: 6px
- Glow spread: 20px (20px outward from edge)
- Glow intensity: 0.15

Hover:
- Overall blur: 0px (sharp)
- Glow spread: 8px (tightens)
- Glow intensity: 0.2 (slightly brighter)

Advantages:
- Glow hugs container, not independent blob
- Glow follows container shape
- Spread range can be very small (0-40px, not fixed large range)
- Glow only outside, inside clean
- Blur acts on whole, unified effect

Navigation:
Add to App.tsx as button 10
Button text: "10 · v1.0 光晕紧贴边缘"
Button color: amber-400 to amber-500

Add prompt display at page bottom (include full Chinese + English prompts with metadata)

Generate v1.0 page.
```

---

**遵守规范 ✓ 仅3部分 ✓ 探索继续 ✓**

