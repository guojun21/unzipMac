# Prompt 02.13: 动态无界 v1.3 静态容器

**目标**: 外层容器完全静态，只有边缘线条动画，新增动画速度滑块  
**日期**: 2025-11-02  
**文件**: 13-DynamicBorderlessV1.3.tsx

---

## 🎯 本次探索的方向

移除外层容器的所有形状动画（borderRadius、y、backdropFilter、background全部固定），只保留边缘线条的收缩和模糊动画。新增动画速度滑块，可调节整个过渡的快慢。

---

## 🎨 中文Prompt

```
创建 v1.3 - 外层容器静态方案

文件: src/pages/13-DynamicBorderlessV1.3.tsx
组件: src/components/borderless/DynamicBorderlessCardV1_3.tsx

核心修改：

外层容器完全静态（无任何动画）：
  ❌ 移除 borderRadius 动画（24px → 16px）
  ❌ 移除 y 位置动画（0 → -4px）
  ❌ 移除 backdropFilter 动画（blur 32px → 10px）
  ❌ 移除 background 渐变位置动画（35% → 70%）
  
只保留边缘线条动画：
  ✅ borderWidth: 10px → 0px
  ✅ filter: blur(18px) → 0px

===  完整代码实现 ===

```tsx
import { motion, useAnimation } from "motion/react";
import { LucideIcon, FileArchive } from "lucide-react";
import { useState, useEffect, useMemo, CSSProperties } from "react";

interface CardV1_3Props {
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: { r: number; g: number; b: number };
  // 可调参数
  edgeLineWidth?: number;      // 边缘线条粗细: 4-16px, default: 10
  edgeBlurAmount?: number;     // 边缘模糊强度: 0-30px, default: 18
  glowSpread?: number;         // 光晕扩散: 0-20px, default: 8
  iconBackgroundBlur?: number; // 图标模糊: 0-5px, default: 2
  animationSpeed?: number;     // 动画速度: 100-1000ms, default: 300
  className?: string;
}

export function DynamicBorderlessCardV1_3({
  title = "项目.zip",
  subtitle = "245 个文件",
  icon: Icon = FileArchive,
  iconColor = { r: 167, g: 139, b: 250 },
  edgeLineWidth = 10,
  edgeBlurAmount = 18,
  glowSpread = 8,
  iconBackgroundBlur = 2,
  animationSpeed = 300,  // NEW: 可调节动画速度
  className = "",
}: CardV1_3Props) {
  const [isHovered, setIsHovered] = useState(false);
  const edgeControls = useAnimation();
  const { r, g, b } = iconColor;

  // 边缘线条动画（唯一的动画）
  useEffect(() => {
    if (isHovered) {
      edgeControls.start({
        borderWidth: '0px',
        filter: 'blur(0px)',
        transition: {
          duration: animationSpeed / 1000,  // ms转s
          ease: [0.34, 1.56, 0.64, 1],
        }
      });
    } else {
      edgeControls.start({
        borderWidth: `${edgeLineWidth}px`,
        filter: `blur(${edgeBlurAmount}px)`,
        transition: {
          duration: animationSpeed / 1000,
          ease: [0.34, 1.56, 0.64, 1],
        }
      });
    }
  }, [isHovered, edgeLineWidth, edgeBlurAmount, animationSpeed, edgeControls]);

  // 紫色图标背景动画（保留，和v1.0一样）
  const iconBackgroundVariants = useMemo(() => ({
    default: {
      background: `rgba(${r},${g},${b},1.0)`,
      filter: `blur(${iconBackgroundBlur}px)`,
      boxShadow: `0 0 30px rgba(${r},${g},${b},0.25)`,
    },
    hover: {
      background: `rgba(${r},${g},${b},1.0)`,
      filter: 'blur(0px)',
      boxShadow: `0 0 20px rgba(${r},${g},${b},0.35)`,
    }
  }), [r, g, b, iconBackgroundBlur]);

  return (
    <div 
      className={`relative flex items-center justify-center ${className}`}
      style={{ 
        width: '320px',
        height: '240px',
        padding: '0',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 层1: 边缘线条层（唯一有动画的层）*/}
      <motion.div
        animate={edgeControls}
        initial={{
          borderWidth: `${edgeLineWidth}px`,
          filter: `blur(${edgeBlurAmount}px)`,
        }}
        style={{
          position: 'absolute',
          inset: 0,
          border: `${edgeLineWidth}px solid rgba(6,182,212,0.8)`,
          borderRadius: '24px',  // 固定，不变！
          boxSizing: 'border-box',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />
      
      {/* 层2: 主容器（完全静态，无动画！）*/}
      <div
        style={{
          width: '320px',
          height: '240px',
          padding: '32px',
          position: 'relative',
          zIndex: 2,
          boxSizing: 'border-box',
          // 以下属性全部固定，不变！
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.65) 35%, rgba(255,255,255,0.3) 65%, rgba(255,255,255,0.1) 85%, rgba(255,255,255,0) 100%)',
          backdropFilter: 'blur(32px)',  // 固定32px，不变
          borderRadius: '24px',          // 固定24px，不变
          transform: 'translateY(0)',    // 固定位置，不变
          boxShadow: `0 0 15px ${glowSpread}px rgba(6,182,212,0.25)`,  // 光晕恒定
        } as CSSProperties}
      >
        {/* 内容 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          height: '100%',
          justifyContent: 'center',
        }}>
          
          {/* 紫色图标（保留动画，和v1.0一样）*/}
          <div style={{ position: 'relative', width: '56px', height: '56px' }}>
            <motion.div
              animate={isHovered ? "hover" : "default"}
              variants={iconBackgroundVariants}
              transition={{ 
                duration: animationSpeed / 1000,  // 使用动画速度参数
                ease: [0.34, 1.56, 0.64, 1]
              }}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            />
            
            <div style={{
              width: '56px',
              height: '56px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 10,
            }}>
              <Icon size={28} color="#ffffff" strokeWidth={2} />
            </div>
          </div>
          
          {/* 文字 */}
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: 600, 
              color: '#0f172a',
              marginBottom: '4px',
            }}>
              {title}
            </h3>
            <p style={{ fontSize: '14px', color: '#64748b' }}>
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

关键改动说明：

```
v1.2 → v1.3 的区别：

层2主容器从：
  <motion.div variants={containerVariants}>  // ❌ 有动画
  
改为：
  <div style={{ ...固定值 }}>  // ✅ 无动画，普通div
  
所有属性固定：
  - background: 固定的渐变（35%位置）
  - backdropFilter: 固定blur(32px)
  - borderRadius: 固定24px
  - transform: 固定translateY(0)
  - boxShadow: 固定光晕值
  
无variants，无animate，无transition
完全静态的容器！
```

===  滑块系统（5个）===

```tsx
const [edgeLineWidth, setEdgeLineWidth] = useState(10);
const [edgeBlurAmount, setEdgeBlurAmount] = useState(18);
const [glowSpread, setGlowSpread] = useState(8);
const [iconBackgroundBlur, setIconBackgroundBlur] = useState(2);
const [animationSpeed, setAnimationSpeed] = useState(300);  // NEW

<DynamicBorderlessCardV1_3
  edgeLineWidth={edgeLineWidth}
  edgeBlurAmount={edgeBlurAmount}
  glowSpread={glowSpread}
  iconBackgroundBlur={iconBackgroundBlur}
  animationSpeed={animationSpeed}  // NEW
/>

// 滑块1: 边缘线条粗细
<div>
  <div className="flex justify-between mb-2">
    <label className="text-sm font-medium text-slate-700">
      1️⃣ 边缘线条粗细
    </label>
    <span className="text-sm font-mono text-cyan-600 font-bold">
      {edgeLineWidth}px
    </span>
  </div>
  <input 
    type="range"
    min="4"
    max="16"
    step="1"
    value={edgeLineWidth}
    onChange={(e) => setEdgeLineWidth(parseInt(e.target.value))}
    className="w-full h-2 bg-cyan-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
  />
  <div className="flex justify-between text-xs text-slate-400 mt-1">
    <span>4px</span>
    <span>16px</span>
  </div>
</div>

// 滑块2: 边缘模糊强度
<div>
  <div className="flex justify-between mb-2">
    <label className="text-sm font-medium text-slate-700">
      2️⃣ 边缘模糊强度
    </label>
    <span className="text-sm font-mono text-teal-600 font-bold">
      {edgeBlurAmount}px
    </span>
  </div>
  <input 
    type="range"
    min="0"
    max="30"
    step="1"
    value={edgeBlurAmount}
    onChange={(e) => setEdgeBlurAmount(parseInt(e.target.value))}
    className="w-full h-2 bg-teal-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
  />
  <div className="flex justify-between text-xs text-slate-400 mt-1">
    <span>0px</span>
    <span>30px</span>
  </div>
</div>

// 滑块3: 光晕扩散范围
<div>
  <div className="flex justify-between mb-2">
    <label className="text-sm font-medium text-slate-700">
      3️⃣ 光晕扩散范围
    </label>
    <span className="text-sm font-mono text-green-600 font-bold">
      {glowSpread}px
    </span>
  </div>
  <input 
    type="range"
    min="0"
    max="20"
    step="1"
    value={glowSpread}
    onChange={(e) => setGlowSpread(parseInt(e.target.value))}
    className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600"
  />
  <div className="flex justify-between text-xs text-slate-400 mt-1">
    <span>0px</span>
    <span>20px</span>
  </div>
</div>

// 滑块4: 图标背景模糊
<div>
  <div className="flex justify-between mb-2">
    <label className="text-sm font-medium text-slate-700">
      4️⃣ 图标背景模糊
    </label>
    <span className="text-sm font-mono text-purple-600 font-bold">
      {iconBackgroundBlur.toFixed(1)}px
    </span>
  </div>
  <input 
    type="range"
    min="0"
    max="5"
    step="0.1"
    value={iconBackgroundBlur}
    onChange={(e) => setIconBackgroundBlur(parseFloat(e.target.value))}
    className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
  />
  <div className="flex justify-between text-xs text-slate-400 mt-1">
    <span>0px</span>
    <span>5px</span>
  </div>
</div>

// 滑块5: 动画速度（NEW!）
<div className="pt-6 border-t-2 border-amber-300">
  <div className="flex justify-between mb-2">
    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
      5️⃣ 动画速度
      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded font-medium">
        🆕 NEW
      </span>
    </label>
    <span className="text-sm font-mono text-amber-600 font-bold">
      {animationSpeed}ms
    </span>
  </div>
  <input 
    type="range"
    min="100"
    max="1000"
    step="50"
    value={animationSpeed}
    onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
    className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
  />
  <div className="flex justify-between text-xs text-slate-400 mt-1">
    <span>100ms (极快)</span>
    <span>1000ms (慢动作)</span>
  </div>
  <p className="text-xs text-amber-600 mt-2 font-medium">
    ⭐ 控制边缘线条收缩和紫色图标背景的动画速度（整体快慢）
  </p>
</div>

// 预设按钮
<div className="pt-4 border-t border-slate-200">
  <p className="text-xs text-slate-500 mb-3">快速预设：</p>
  <div className="flex gap-2 flex-wrap">
    <button 
      onClick={() => {
        setEdgeLineWidth(10);
        setEdgeBlurAmount(18);
        setGlowSpread(8);
        setIconBackgroundBlur(2);
        setAnimationSpeed(300);
      }}
      className="px-4 py-2 rounded-lg bg-amber-100 text-amber-700 text-sm hover:bg-amber-200 transition-colors"
    >
      推荐值 (10/18/8/2/300ms)
    </button>
    
    <button 
      onClick={() => {
        setEdgeLineWidth(6);
        setEdgeBlurAmount(12);
        setGlowSpread(5);
        setIconBackgroundBlur(1);
        setAnimationSpeed(200);
      }}
      className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm hover:bg-slate-200"
    >
      快速 (6/12/5/1/200ms)
    </button>
    
    <button 
      onClick={() => {
        setEdgeLineWidth(14);
        setEdgeBlurAmount(25);
        setGlowSpread(12);
        setIconBackgroundBlur(3);
        setAnimationSpeed(500);
      }}
      className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm hover:bg-slate-200"
    >
      重度雾气 (14/25/12/3/500ms)
    </button>
    
    <button 
      onClick={() => {
        setEdgeLineWidth(10);
        setEdgeBlurAmount(18);
        setGlowSpread(8);
        setIconBackgroundBlur(2);
        setAnimationSpeed(800);
      }}
      className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm hover:bg-slate-200"
    >
      慢动作观察 (10/18/8/2/800ms)
    </button>
  </div>
</div>
```

===  动画对比（v1.2 vs v1.3）===

v1.2 的动画元素：
  ❌ 边缘线条: borderWidth, filter
  ❌ 主容器: borderRadius, y, backdropFilter, background
  ❌ 紫色背景: filter, boxShadow
  共3层都在动画

v1.3 的动画元素：
  ✅ 边缘线条: borderWidth, filter（唯一的外层动画）
  ❌ 主容器: 无动画！完全静态！
  ✅ 紫色背景: filter, boxShadow（内部动画保留）
  只有2个动画：边缘线条 + 图标背景

动画时长控制：
  - 边缘线条: animationSpeed参数控制（100-1000ms）
  - 紫色背景: 同样的animationSpeed参数
  - 两者同步，速度一致

===  技术细节说明 ===

为什么外层容器要静态：

```
理由1: 焦点清晰
  - 用户注意力在"边缘线条消失"这个动画上
  - 容器形状变化会分散注意力
  - 静态容器让线条动画更突出

理由2: 视觉稳定
  - 容器位置、形状、模糊度不变
  - 只有边缘在变化
  - 更稳定，不晃动

理由3: 简化代码
  - 少一个variants对象
  - 少一个motion.div
  - 用普通div即可
```

动画速度滑块的作用：

```
100ms (极快):
  - 几乎瞬间切换
  - 适合生产环境（响应迅速）
  
300ms (推荐):
  - 平衡速度和流畅度
  - 能看清线条收缩过程
  
800ms (慢动作):
  - 观察动画细节
  - 调试用
  
1000ms (超慢):
  - 看清每一帧
  - 理解动画原理
```

===  层级结构（精确）===

```
z-index: 3  边缘线条层
            - 动画：borderWidth, filter
            - 静态：borderRadius(24px), position(inset:0)
            
z-index: 2  主容器层
            - 完全静态！无任何动画！
            - background: 固定渐变
            - backdropFilter: 固定blur(32px)
            - borderRadius: 固定24px
            - boxShadow: 固定光晕
            
z-index: 10 SVG图标层
            - 永远清晰
```

===  导航位置 ===

在 App.tsx 中添加为第13个按钮：

```tsx
<NavButton 
  color="fuchsia"  // 彩虹序列第13个：fuchsia-400 to fuchsia-500
  active={currentPage === '13'}
  onClick={() => navigate('13')}
>
  13 · v1.3 静态容器
</NavButton>
```

位置：Grid中第13个
颜色：fuchsia-400 to fuchsia-500（紫红色）
样式：与其他按钮完全相同（px-6 py-3, rounded-xl）

===  页面底部Prompt展示 ===

<details className="mt-16 p-6 rounded-xl bg-slate-900 text-white">
  <summary className="cursor-pointer text-lg font-medium mb-4">
    📝 查看生成此页面的Prompt
  </summary>
  
  <div className="space-y-6">
    <div>
      <h4 className="text-sm text-slate-400 mb-2">Prompt (中文版)</h4>
      <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono">
{`创建 v1.3 - 外层容器完全静态

核心改动：
1. 主容器从 <motion.div> 改为 <div>
2. 移除所有容器动画：
   - borderRadius: 固定24px
   - y: 固定0
   - backdropFilter: 固定blur(32px)
   - background: 固定渐变位置35%
   - boxShadow: 固定光晕

3. 只保留2个动画：
   - 边缘线条: borderWidth 10px→0, filter blur(18px)→0
   - 紫色背景: filter blur(2px)→0, boxShadow变化

4. 新增动画速度滑块：
   - 范围: 100-1000ms
   - 默认: 300ms
   - 控制所有动画的速度
   - 可以看慢动作观察细节

[完整代码见上方]`}
      </pre>
    </div>
    
    <div>
      <h4 className="text-sm text-slate-400 mb-2">Prompt (English Version)</h4>
      <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono">
{`Create v1.3 - Fully static outer container

Core changes:
1. Main container from <motion.div> to <div>
2. Remove all container animations:
   - borderRadius: fixed 24px
   - y: fixed 0
   - backdropFilter: fixed blur(32px)
   - background: fixed gradient position 35%
   - boxShadow: fixed glow

3. Keep only 2 animations:
   - Edge line: borderWidth 10px→0, filter blur(18px)→0
   - Purple background: filter blur(2px)→0, boxShadow change

4. New animation speed slider:
   - Range: 100-1000ms
   - Default: 300ms
   - Controls all animation speed
   - Can see slow motion for details

[Complete code above]`}
      </pre>
    </div>
    
    <div className="text-xs text-slate-400 pt-4 border-t border-slate-700 space-y-1">
      <p>生成日期: 2025-11-02</p>
      <p>Prompt文件: prompt-02.13-static-container-v1.3.md</p>
      <p>探索方向: 外层容器完全静态，只有边缘线条动画</p>
      <p>新增功能: 动画速度滑块（100-1000ms）</p>
      <p>动画数量: 2个（边缘线条 + 图标背景）</p>
      <p>静态属性: borderRadius, y, backdropFilter, background全部固定</p>
    </div>
  </div>
</details>

生成v1.3页面。
```

---

## 🎨 English Prompt

```
Create v1.3 - Fully static outer container approach

File: src/pages/13-DynamicBorderlessV1.3.tsx
Component: src/components/borderless/DynamicBorderlessCardV1_3.tsx

Core modifications:

Outer container completely static (no animation):
  ❌ Remove borderRadius animation (24px → 16px)
  ❌ Remove y position animation (0 → -4px)
  ❌ Remove backdropFilter animation (blur 32px → 10px)
  ❌ Remove background gradient position animation (35% → 70%)
  
Keep only edge line animation:
  ✅ borderWidth: 10px → 0px
  ✅ filter: blur(18px) → 0px

New feature: Animation speed slider
  Range: 100-1000ms
  Default: 300ms
  Controls: All animation duration

[Complete detailed implementation code as shown in Chinese section above - same structure]

Main container changes from:
  <motion.div variants={...} animate={...}>  // Has animation
  
To:
  <div style={{ ...fixed values }}>  // No animation, regular div

All properties fixed:
  - background: fixed gradient (35% position)
  - backdropFilter: fixed blur(32px)
  - borderRadius: fixed 24px
  - transform: fixed translateY(0)
  - boxShadow: fixed glow value

No variants, no animate, no transition on container.
Fully static container!

Navigation:
Add to App.tsx as button 13
Button text: "13 · v1.3 静态容器"
Button color: fuchsia-400 to fuchsia-500

Bottom prompt display with full Chinese + English prompts and metadata.

Generate v1.3 page.
```

---

**遵守规范 ✓ 超详细代码 ✓ 5个滑块 ✓ 静态容器 ✓**

