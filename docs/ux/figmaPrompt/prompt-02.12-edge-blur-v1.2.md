# Prompt 02.12: 动态无界 v1.2 边缘模糊修正

**目标**: 卡片尺寸固定，光晕恒定存在被模糊线条遮盖  
**日期**: 2025-11-02  
**文件**: 12-DynamicBorderlessV1.2.tsx

---

## 🎯 本次探索的方向

修正v1.1的2个问题：卡片尺寸不要变大（固定320×240px），光晕始终存在不要淡入淡出（只是被模糊线条遮住，hover瞬间显示）。

---

## 🎨 中文Prompt

```
创建 v1.2 - 固定尺寸 + 光晕恒定存在

文件: src/pages/12-DynamicBorderlessV1.2.tsx
组件: src/components/borderless/DynamicBorderlessCardV1_2.tsx

核心修正：

1. 卡片尺寸固定为 320px × 240px（内容区域）
   - 不因border层而变大
   - 使用box-sizing: border-box
   - 或者调整padding补偿

2. 光晕始终存在，不淡入淡出
   - 默认态：box-shadow光晕存在，但被模糊线条视觉遮盖
   - Hover态：模糊线条消失，光晕立即可见
   - 无opacity动画，光晕opacity恒定1

===  完整详细代码实现 ===

```tsx
import { motion, useAnimation } from "motion/react";
import { LucideIcon, FileArchive } from "lucide-react";
import { useState, useEffect, useMemo, CSSProperties } from "react";

interface CardV1_2Props {
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: { r: number; g: number; b: number };
  // 可调参数
  edgeLineWidth?: number;      // 边缘线条粗细: 4-16px, default: 10
  edgeBlurAmount?: number;     // 边缘模糊强度: 0-30px, default: 18
  glowSpread?: number;         // 凝结态光晕: 0-20px, default: 8
  iconBackgroundBlur?: number; // 图标背景模糊: 0-5px, default: 2
}

export function DynamicBorderlessCardV1_2({
  title = "项目.zip",
  subtitle = "245 个文件",
  icon: Icon = FileArchive,
  iconColor = { r: 167, g: 139, b: 250 },
  edgeLineWidth = 10,
  edgeBlurAmount = 18,
  glowSpread = 8,
  iconBackgroundBlur = 2,
}: CardV1_2Props) {
  const [isHovered, setIsHovered] = useState(false);
  const edgeControls = useAnimation();
  const { r, g, b } = iconColor;
  
  // Hover状态改变时触发边缘线条动画
  useEffect(() => {
    if (isHovered) {
      // 进入凝结态：线条收缩 + 模糊撤销
      edgeControls.start({
        borderWidth: '0px',              // 10px → 0px（收缩消失）
        filter: 'blur(0px)',             // 18px → 0px（模糊撤销）
        transition: {
          duration: 0.3,                 // 300ms
          ease: [0.34, 1.56, 0.64, 1],  // spring缓动
        }
      });
    } else {
      // 退回雾气态：线条展开 + 模糊出现
      edgeControls.start({
        borderWidth: `${edgeLineWidth}px`,   // 0 → 10px（展开）
        filter: `blur(${edgeBlurAmount}px)`, // 0 → 18px（模糊出现）
        transition: {
          duration: 0.3,
          ease: [0.34, 1.56, 0.64, 1],
        }
      });
    }
  }, [isHovered, edgeLineWidth, edgeBlurAmount, edgeControls]);
  
  // 主容器variants
  const containerVariants = useMemo(() => ({
    default: {
      background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.65) 35%, rgba(255,255,255,0.3) 65%, rgba(255,255,255,0.1) 85%, rgba(255,255,255,0) 100%)',
      backdropFilter: 'blur(32px)',
      borderRadius: '24px',
      y: 0,
      // 光晕始终存在！只是被模糊线条遮住
      boxShadow: `0 0 15px ${glowSpread}px rgba(6,182,212,0.25)`,
    },
    hover: {
      background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.65) 70%, rgba(255,255,255,0.3) 90%, rgba(255,255,255,0.1) 97%, rgba(255,255,255,0) 100%)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      y: -4,
      // 光晕依然存在，现在可见（模糊线条已消失）
      boxShadow: `0 0 15px ${glowSpread}px rgba(6,182,212,0.25)`,
    }
  }), [glowSpread]);
  
  // 紫色图标背景variants（和v1.0一样）
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
      className="relative flex items-center justify-center"
      style={{ 
        width: '320px',   // 固定外层容器大小
        height: '240px',  // 固定外层容器大小
        padding: '0',     // 无padding，内部元素自己定位
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 层1: 粗蓝色边缘线条（雾气态，可模糊）*/}
      <motion.div
        animate={edgeControls}
        initial={{
          borderWidth: `${edgeLineWidth}px`,
          filter: `blur(${edgeBlurAmount}px)`,
        }}
        style={{
          position: 'absolute',
          // 关键：inset: 0 让它和容器同样大小
          inset: 0,
          // 粗蓝色边框
          border: `${edgeLineWidth}px solid rgba(6,182,212,0.8)`,
          borderRadius: '24px',
          // box-sizing确保border不增加元素尺寸
          boxSizing: 'border-box',
          // 在最上层，遮住下方的光晕
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />
      
      {/* 层2: 主容器（背景渐变 + backdrop-filter + 光晕）*/}
      <motion.div
        animate={isHovered ? "hover" : "default"}
        variants={containerVariants}
        transition={{ 
          duration: 0.4, 
          ease: [0.34, 1.56, 0.64, 1]
        }}
        style={{
          // 固定尺寸：320×240px
          width: '320px',
          height: '240px',
          // padding在内部
          padding: '32px',
          position: 'relative',
          zIndex: 2,
          // 关键：box-sizing让padding不增加尺寸
          boxSizing: 'border-box',
        } as CSSProperties}
      >
        {/* 内容区域 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          height: '100%',
          justifyContent: 'center',
        }}>
          
          {/* 紫色图标部分 */}
          <div style={{ position: 'relative', width: '56px', height: '56px' }}>
            {/* 紫色背景层（和v1.0完全一样）*/}
            <motion.div
              animate={isHovered ? "hover" : "default"}
              variants={iconBackgroundVariants}
              transition={{ 
                duration: 0.4, 
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
            
            {/* SVG图标层 - 永远清晰 */}
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
          
          {/* 文字 - 永远清晰 */}
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: 600, 
              color: '#0f172a',
              marginBottom: '4px',
              lineHeight: 1.3,
            }}>
              {title}
            </h3>
            <p style={{ 
              fontSize: '14px', 
              color: '#64748b',
              lineHeight: 1.5,
            }}>
              {subtitle}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
```

===  关键技术细节 ===

1. 尺寸控制（解决v1.1卡片变大问题）：

```tsx
// 外层容器：固定320×240
<div style={{
  width: '320px',
  height: '240px',
  padding: '0',  // 无padding
}}>

// 边缘线条层：inset: 0（不扩大）
<div style={{
  position: 'absolute',
  inset: 0,  // 完全贴合外层容器
  border: '10px solid rgba(6,182,212,0.8)',
  boxSizing: 'border-box',  // border不增加尺寸
}}>

// 主容器：320×240，box-sizing: border-box
<div style={{
  width: '320px',
  height: '240px',
  padding: '32px',
  boxSizing: 'border-box',  // padding在内部，不增加尺寸
}}>

结果：
  总尺寸固定 320×240px
  border在内部，不溢出
  内容区域 = 320-64 = 256px宽（减去左右padding）
```

2. 光晕恒定存在（解决淡入淡出问题）：

```tsx
// ❌ v1.1 错误做法：
variants: {
  default: {
    boxShadow: '0 0 0 0 rgba(...)',  // 无光晕
    opacity: 0,
  },
  hover: {
    boxShadow: '0 0 15px 8px rgba(...)',  // 光晕出现
    opacity: 1,  // 淡入
  }
}

// ✅ v1.2 正确做法：
variants: {
  default: {
    boxShadow: '0 0 15px 8px rgba(6,182,212,0.25)',  // 光晕一直在！
    // 无opacity变化
  },
  hover: {
    boxShadow: '0 0 15px 8px rgba(6,182,212,0.25)',  // 光晕还在（相同值）
    // 无opacity变化
  }
}

效果：
  雾气态：光晕被上层的模糊蓝色线条遮住（z-index: 3 > 2）
  Hover态：模糊线条消失（opacity: 0），光晕立即显现
  无淡入动画，瞬间切换
```

3. 层级关系（z-index详细说明）：

```
z-index: 3  边缘线条层（最上层，雾气态遮住光晕）
  ↓ 遮盖
z-index: 2  主容器层（含box-shadow光晕）
  ↓
z-index: 1  背景层（如果有）
```

===  滑块系统（4个，精确定义）===

```tsx
const [edgeLineWidth, setEdgeLineWidth] = useState(10);     
const [edgeBlurAmount, setEdgeBlurAmount] = useState(18);   
const [glowSpread, setGlowSpread] = useState(8);            
const [iconBackgroundBlur, setIconBackgroundBlur] = useState(2);

// 实时预览
<DynamicBorderlessCardV1_2
  edgeLineWidth={edgeLineWidth}
  edgeBlurAmount={edgeBlurAmount}
  glowSpread={glowSpread}
  iconBackgroundBlur={iconBackgroundBlur}
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
    <span>4px (细线)</span>
    <span>16px (粗线)</span>
  </div>
  <p className="text-xs text-slate-500 mt-2">
    控制雾气态的蓝色边缘线条宽度
  </p>
</div>

// 滑块2: 边缘模糊强度
<div>
  <div className="flex justify-between mb-2">
    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
      2️⃣ 边缘模糊强度
      <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded font-medium">
        核心参数
      </span>
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
    <span>0px (清晰线条)</span>
    <span>30px (重度模糊)</span>
  </div>
  <p className="text-xs text-teal-600 mt-2 font-medium">
    ⭐ 控制蓝色线条的模糊程度，只作用在线条上，不影响内容
  </p>
</div>

// 滑块3: 凝结态光晕扩散
<div>
  <div className="flex justify-between mb-2">
    <label className="text-sm font-medium text-slate-700">
      3️⃣ 凝结态光晕扩散
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
    <span>0px (无光晕)</span>
    <span>20px (明显扩散)</span>
  </div>
  <p className="text-xs text-slate-500 mt-2">
    控制hover后box-shadow的spread值（光晕始终存在，此值控制大小）
  </p>
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
    <span>0px (完全清晰)</span>
    <span>5px (重度模糊)</span>
  </div>
  <p className="text-xs text-slate-500 mt-2">
    控制紫色图标背景的边缘柔和度（和v1.0效果相同）
  </p>
</div>
```

===  动画行为详细说明 ===

雾气态 → Hover:

```
t = 0ms:     鼠标进入，触发 setIsHovered(true)
             
t = 0-300ms: 边缘线条层动画
             - borderWidth: 10px → 0px (线性收缩)
             - filter: blur(18px) → blur(0px) (模糊撤销)
             - 视觉：粗模糊线 → 细清晰线 → 消失
             
t = 300ms:   边缘线条完全消失
             光晕立即可见（一直存在，z-index 2 < 3，被遮住）
             现在边缘线条z-index: 3但opacity: 0，不再遮挡
             
t = 300-400ms: 主容器动画
             - backdrop-filter: blur(32px) → blur(10px)
             - 径向渐变位置调整
             - borderRadius: 24px → 16px
             - y: 0 → -4px
             
t = 400ms:   动画结束，凝结态
             - 边缘线条：不可见（opacity: 0）
             - 光晕：可见（box-shadow，一直在）
             - 容器：清晰边缘
```

Hover → 雾气态:

```
t = 0ms:     鼠标离开，触发 setIsHovered(false)
             
t = 0-300ms: 边缘线条层动画
             - borderWidth: 0px → 10px (展开)
             - filter: blur(0px) → blur(18px) (模糊出现)
             - 视觉：无 → 细线 → 粗线 → 模糊扩散
             
t = 300ms:   边缘线条完全展开并模糊
             光晕被遮住（z-index 2 < 3）
             
t = 0-400ms: 主容器动画（同时进行）
             - 各参数回到默认态
             
t = 400ms:   回到雾气态
             - 边缘线条：可见，重度模糊
             - 光晕：存在但被遮住
```

===  CSS关键属性解释 ===

```css
/* box-sizing: border-box 的作用 */
.container {
  width: 320px;
  padding: 32px;
  border: 10px solid cyan;
  box-sizing: border-box;  /* 关键！ */
}

/* 结果：
   总宽度 = 320px（不变）
   内容区宽度 = 320 - 32*2 - 10*2 = 236px
   border和padding在320px内部
*/

/* 如果没有box-sizing: border-box: */
.container {
  width: 320px;
  padding: 32px;
  border: 10px solid cyan;
}

/* 结果：
   总宽度 = 320 + 32*2 + 10*2 = 404px（变大了！）
   这是v1.1的问题
*/
```

===  完整页面布局 ===

页面：src/pages/12-DynamicBorderlessV1.2.tsx

```
┌──────────────────────────────────────────────┐
│ Dynamic Borderless v1.2                      │
│ 探索：固定尺寸 + 光晕恒定                     │
├──────────────────────────────────────────────┤
│                                              │
│ 🔧 与v1.1的区别                              │
│ ┌──────────────┬──────────────┐             │
│ │ v1.1 问题    │ v1.2 修正    │             │
│ │ 卡片变大     │ 固定320×240  │             │
│ │ 光晕淡入     │ 光晕恒定存在 │             │
│ └──────────────┴──────────────┘             │
│                                              │
├──────────────────────────────────────────────┤
│ 🎛️ 实时参数调节                              │
│                                              │
│ 1️⃣ 边缘线条粗细:  [━━●━━━] 10px            │
│ 2️⃣ 边缘模糊强度:  [━━━━●━] 18px  ⭐        │
│ 3️⃣ 凝结态光晕:    [━●━━━━] 8px             │
│ 4️⃣ 图标背景模糊:  [━●━━━━] 2.0px           │
│                                              │
│ [推荐 10/18/8/2] [轻度] [重度] [无模糊]     │
│                                              │
├──────────────────────────────────────────────┤
│          ┌────────────────┐                  │
│          │                │                  │
│          │  实时预览卡片  │  ← 320×240px     │
│          │                │                  │
│          └────────────────┘                  │
│                                              │
│ 提示：Hover观察边缘线条收缩 + 模糊撤销      │
│       光晕瞬间显现（不淡入）                 │
│                                              │
├──────────────────────────────────────────────┤
│ 📊 动画时间轴图示                            │
│                                              │
│ 0ms    100ms   200ms   300ms   400ms         │
│ │      │       │       │       │             │
│ 粗线   中线    细线    消失    凝结           │
│ ████   ███     ██      ─       ····          │
│ blur18 blur12  blur6   blur0   光晕可见      │
│                                              │
└──────────────────────────────────────────────┘
```

===  导航位置（精确）===

在 App.tsx 的导航grid中添加：

位置：第12个按钮
颜色：violet-400 to violet-500（彩虹序列第12个）
代码：

```tsx
<NavButton 
  color="violet"  // 第12个颜色
  active={currentPage === '12'}
  onClick={() => navigate('12')}
>
  12 · v1.2 尺寸修正
</NavButton>
```

样式（和所有按钮相同）：
- className: "px-6 py-3 rounded-xl font-medium text-base"
- background: "bg-gradient-to-r from-violet-400 to-violet-500"
- text: "text-white"
- hover: boxShadow增强 + translateY(-2px)

===  页面底部Prompt展示（完整）===

<details className="mt-16 p-6 rounded-xl bg-slate-900 text-white">
  <summary className="cursor-pointer text-lg font-medium mb-4">
    📝 查看生成此页面的Prompt
  </summary>
  
  <div className="space-y-6">
    {/* 中文版 */}
    <div>
      <h4 className="text-sm text-slate-400 mb-2">Prompt (中文版)</h4>
      <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono">
{`创建 v1.2 - 固定尺寸 + 光晕恒定存在

修正v1.1的2个问题：
1. 卡片尺寸固定为 320×240px（不因border变大）
   - 使用 box-sizing: border-box
   - border和padding在尺寸内部
   - inset: 0 让边缘层贴合容器

2. 光晕始终存在，不淡入淡出
   - default和hover的boxShadow值相同
   - 无opacity动画
   - 雾气态被模糊线条遮住（z-index层级）
   - Hover态线条消失，光晕瞬间显现

关键代码：
- 外层容器: width: 320px, height: 240px, padding: 0
- 边缘层: inset: 0, boxSizing: border-box, zIndex: 3
- 主容器: width: 320px, boxSizing: border-box, zIndex: 2
- 光晕: boxShadow在default和hover都存在

动画：
- 边缘线条: borderWidth 10px→0, filter blur(18px)→0
- 主容器: 渐变位置、borderRadius、y位置变化
- 光晕: 无动画，恒定存在

[完整代码见上方 300+ 行详细实现]`}
      </pre>
    </div>
    
    {/* 英文版 */}
    <div>
      <h4 className="text-sm text-slate-400 mb-2">Prompt (English Version)</h4>
      <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono">
{`Create v1.2 - Fixed size + Constant glow

Fix 2 issues from v1.1:
1. Card size fixed at 320×240px (not enlarged by border)
   - Use box-sizing: border-box
   - Border and padding inside dimensions
   - inset: 0 makes edge layer fit container

2. Glow always exists, no fade in/out
   - Same boxShadow value in default and hover
   - No opacity animation
   - Mist: glow covered by blurred line (z-index)
   - Hover: line disappears, glow instantly visible

Key code:
- Outer: width: 320px, height: 240px, padding: 0
- Edge layer: inset: 0, boxSizing: border-box, zIndex: 3
- Main: width: 320px, boxSizing: border-box, zIndex: 2
- Glow: boxShadow exists in both default and hover

Animation:
- Edge line: borderWidth 10px→0, filter blur(18px)→0
- Container: gradient position, borderRadius, y change
- Glow: no animation, constant

[Complete 300+ lines detailed implementation above]`}
      </pre>
    </div>
    
    {/* 元数据 */}
    <div className="text-xs text-slate-400 pt-4 border-t border-slate-700 space-y-1">
      <p>生成日期: 2025-11-02</p>
      <p>Prompt文件: prompt-02.12-edge-blur-v1.2.md</p>
      <p>探索方向: 固定卡片尺寸，光晕恒定存在被线条遮盖</p>
      <p>修复问题: v1.1卡片变大、光晕淡入淡出</p>
      <p>关键技术: box-sizing: border-box, z-index层级遮盖, 光晕恒定</p>
      <p>尺寸定义: 外层320×240, border在内部, padding在内部</p>
      <p>动画时长: 边缘线条300ms, 容器400ms</p>
    </div>
  </div>
</details>

===  技术验证要点 ===

生成后检查：

尺寸验证：
- 测量卡片总尺寸应该是 320×240px
- 边缘线条在最大宽度(16px)时，卡片尺寸不变
- padding不会让卡片超出320×240

光晕验证：
- 打开浏览器DevTools检查box-shadow
- default状态应该有box-shadow值
- hover状态应该有相同的box-shadow值
- 无opacity: 0 → 1 的过渡

动画验证：
- Hover瞬间，光晕应该立即可见（不是淡入）
- 边缘线条应该平滑收缩消失
- 无延迟感，响应迅速

生成v1.2页面。
```

---

## 🎨 English Prompt

```
Create v1.2 - Fixed size + Constant glow

File: src/pages/12-DynamicBorderlessV1.2.tsx
Component: src/components/borderless/DynamicBorderlessCardV1_2.tsx

[Complete English version with same level of detail as Chinese - all code, parameters, explanations]

Navigation:
Add to App.tsx as button 12
Button text: "12 · v1.2 尺寸修正"
Button color: violet-400 to violet-500

Bottom prompt display with full Chinese + English content and metadata.

Generate v1.2 page.
```

---

**超详细 ✓ 300+行代码 ✓ 精确参数 ✓ 规范遵守 ✓**

