# Prompt 02.11: 动态无界 v1.1 边缘模糊动画

**目标**: 粗蓝色线条边缘重度模糊，动画收缩消失后光晕淡入  
**日期**: 2025-11-02  
**文件**: 11-DynamicBorderlessV1.1.tsx

---

## 🎯 本次探索的方向

探索新的动画方式：雾气态用粗蓝色线条+重度模糊（只在线条上），hover时线条收缩消失，模糊撤销，然后光晕淡入，最终变成清晰的box-shadow光晕效果。分2阶段动画，视觉效果更有层次。

---

## 🎨 中文Prompt

```
创建 v1.1 - 边缘模糊线条动画方案

文件: src/pages/11-DynamicBorderlessV1.1.tsx
组件: src/components/borderless/DynamicBorderlessCardV1_1.tsx

核心设计：

【雾气态】粗蓝色边缘线条 + 重度模糊
【过渡】线条收缩消失 + 模糊撤销 → 光晕淡入
【凝结态】清晰光晕（box-shadow）

===  完整技术实现（详细代码）===

```tsx
import { motion, useAnimation } from "motion/react";
import { useState, useEffect } from "react";

export function DynamicBorderlessCardV1_1({
  title = "项目.zip",
  subtitle = "245 个文件",
  icon: Icon = FileArchive,
  iconColor = { r: 167, g: 139, b: 250 },
  // 可调参数
  edgeLineWidth = 10,          // 边缘线条粗细（雾气态）
  edgeBlurAmount = 18,         // 边缘线条模糊度（雾气态）
  glowSpread = 8,              // 光晕扩散（凝结态）
  iconBackgroundBlur = 2,      // 紫色背景模糊
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const edgeControls = useAnimation();
  const glowControls = useAnimation();
  const { r, g, b } = iconColor;
  
  // Hover状态改变时触发动画序列
  useEffect(() => {
    if (isHovered) {
      // === 进入凝结态动画 ===
      
      // 阶段1 (0-300ms): 线条收缩 + 模糊撤销
      edgeControls.start({
        borderWidth: '0px',           // 从10px收缩到0
        filter: 'blur(0px)',          // 从18px模糊到0
        opacity: 0,                   // 透明度降到0
        transition: {
          duration: 0.3,
          ease: [0.34, 1.56, 0.64, 1]
        }
      });
      
      // 阶段2 (300-400ms): 光晕淡入
      setTimeout(() => {
        glowControls.start({
          opacity: 1,                 // 从0淡入到1
          boxShadow: `0 0 15px ${glowSpread}px rgba(6,182,212,0.25)`,
          transition: {
            duration: 0.1,
            ease: 'easeOut'
          }
        });
      }, 300);
      
    } else {
      // === 退回雾气态动画 ===
      
      // 阶段1 (0-100ms): 光晕快速消失
      glowControls.start({
        opacity: 0,
        transition: {
          duration: 0.1,
          ease: 'easeIn'
        }
      });
      
      // 阶段2 (100-400ms): 线条展开 + 模糊出现
      setTimeout(() => {
        edgeControls.start({
          borderWidth: `${edgeLineWidth}px`,  // 0 → 10px
          filter: `blur(${edgeBlurAmount}px)`, // 0 → 18px
          opacity: 1,
          transition: {
            duration: 0.3,
            ease: [0.34, 1.56, 0.64, 1]
          }
        });
      }, 100);
    }
  }, [isHovered, edgeLineWidth, edgeBlurAmount, glowSpread]);
  
  return (
    <div 
      className="relative"
      style={{ padding: '80px' }}  // 留出足够空间显示模糊扩散
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 层1: 粗蓝色边缘线条层（雾气态）*/}
      <motion.div
        animate={edgeControls}
        initial={{
          borderWidth: `${edgeLineWidth}px`,
          filter: `blur(${edgeBlurAmount}px)`,
          opacity: 1,
        }}
        style={{
          position: 'absolute',
          inset: 0,
          border: `${edgeLineWidth}px solid rgba(6,182,212,0.8)`,  // 粗蓝色线
          borderRadius: '24px',
          zIndex: 1,
          pointerEvents: 'none',
          // 关键：只有这个div有blur，不影响其他元素
        }}
      />
      
      {/* 层2: 主容器（始终清晰）*/}
      <motion.div
        animate={isHovered ? "hover" : "default"}
        variants={{
          default: {
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.65) 35%, rgba(255,255,255,0.3) 65%, rgba(255,255,255,0.1) 85%, rgba(255,255,255,0) 100%)',
            backdropFilter: 'blur(32px)',
            borderRadius: '24px',
          },
          hover: {
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.65) 70%, rgba(255,255,255,0.3) 90%, rgba(255,255,255,0.1) 97%, rgba(255,255,255,0) 100%)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            y: -4,
          }
        }}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          width: '320px',
          height: '240px',
          padding: '32px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* 内容区域 - 完全不受线条模糊影响 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          height: '100%',
          justifyContent: 'center',
        }}>
          
          {/* 紫色图标背景（和v1.0一样）*/}
          <div style={{ position: 'relative', width: '56px', height: '56px' }}>
            {/* 紫色背景层 */}
            <motion.div
              animate={isHovered ? "hover" : "default"}
              variants={{
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
              }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            />
            
            {/* SVG图标 - 永远清晰 */}
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
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#0f172a' }}>
              {title}
            </h3>
            <p style={{ fontSize: '14px', color: '#64748b' }}>
              {subtitle}
            </p>
          </div>
        </div>
      </motion.div>
      
      {/* 层3: 凝结态光晕（最上层，淡入）*/}
      <motion.div
        animate={glowControls}
        initial={{
          opacity: 0,
          boxShadow: '0 0 0 0 rgba(6,182,212,0)',
        }}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: isHovered ? '16px' : '24px',
          zIndex: 0,
          pointerEvents: 'none',
          transition: 'border-radius 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      />
    </div>
  );
}
```

===  滑块控制系统 ===

4个滑块：

```tsx
const [edgeLineWidth, setEdgeLineWidth] = useState(10);     // 线条粗细：4-16px
const [edgeBlurAmount, setEdgeBlurAmount] = useState(18);   // 线条模糊：0-30px
const [glowSpread, setGlowSpread] = useState(8);            // 光晕扩散：0-20px
const [iconBackgroundBlur, setIconBackgroundBlur] = useState(2); // 图标模糊：0-5px

// 滑块1
<div>
  <label>边缘线条粗细</label>
  <span>{edgeLineWidth}px</span>
  <input 
    type="range"
    min="4"
    max="16"
    value={edgeLineWidth}
    onChange={(e) => setEdgeLineWidth(parseInt(e.target.value))}
  />
  <p>控制雾气态的蓝色边缘线条宽度</p>
</div>

// 滑块2
<div>
  <label>边缘模糊强度</label>
  <span>{edgeBlurAmount}px</span>
  <input 
    type="range"
    min="0"
    max="30"
    value={edgeBlurAmount}
    onChange={(e) => setEdgeBlurAmount(parseInt(e.target.value))}
  />
  <p>控制蓝色边缘线条的模糊程度，只作用在线条上</p>
</div>

// 滑块3
<div>
  <label>凝结态光晕扩散</label>
  <span>{glowSpread}px</span>
  <input 
    type="range"
    min="0"
    max="20"
    value={glowSpread}
    onChange={(e) => setGlowSpread(parseInt(e.target.value))}
  />
  <p>控制hover后的box-shadow光晕大小</p>
</div>

// 滑块4
<div>
  <label>图标背景模糊</label>
  <span>{iconBackgroundBlur.toFixed(1)}px</span>
  <input 
    type="range"
    min="0"
    max="5"
    step="0.1"
    value={iconBackgroundBlur}
    onChange={(e) => setIconBackgroundBlur(parseFloat(e.target.value))}
  />
  <p>控制紫色图标背景的边缘柔和度</p>
</div>
```

预设按钮：

```tsx
<button onClick={() => {
  setEdgeLineWidth(10);
  setEdgeBlurAmount(18);
  setGlowSpread(8);
  setIconBackgroundBlur(2);
}}>
  推荐值 (10/18/8/2)
</button>

<button onClick={() => {
  setEdgeLineWidth(6);
  setEdgeBlurAmount(12);
  setGlowSpread(5);
  setIconBackgroundBlur(1);
}}>
  轻度 (6/12/5/1)
</button>

<button onClick={() => {
  setEdgeLineWidth(14);
  setEdgeBlurAmount(25);
  setGlowSpread(12);
  setIconBackgroundBlur(3);
}}>
  重度雾气 (14/25/12/3)
</button>
```

===  动画时间轴（精确控制）===

使用 framer-motion 的 useAnimation + useEffect 实现分阶段动画：

```tsx
useEffect(() => {
  if (isHovered) {
    // ===  进入凝结态 ===
    
    // 阶段1 (0-300ms): 线条收缩 + 模糊撤销
    edgeControls.start({
      borderWidth: '0px',              // 10px → 0px
      filter: 'blur(0px)',             // 18px → 0px
      opacity: 0,                      // 1 → 0
      transition: {
        duration: 0.3,
        ease: [0.34, 1.56, 0.64, 1],  // spring缓动
      }
    });
    
    // 阶段2 (300-400ms): 光晕淡入
    setTimeout(() => {
      glowControls.start({
        opacity: 1,
        boxShadow: `0 0 15px ${glowSpread}px rgba(6,182,212,0.25)`,
        transition: {
          duration: 0.1,
          ease: 'easeOut'
        }
      });
    }, 300);  // 300ms延迟
    
  } else {
    // ===  退回雾气态 ===
    
    // 阶段1 (0-100ms): 光晕快速消失
    glowControls.start({
      opacity: 0,
      boxShadow: '0 0 0 0 rgba(6,182,212,0)',
      transition: {
        duration: 0.1,
        ease: 'easeIn'
      }
    });
    
    // 阶段2 (100-400ms): 线条展开 + 模糊出现
    setTimeout(() => {
      edgeControls.start({
        borderWidth: `${edgeLineWidth}px`,  // 0 → 10px
        filter: `blur(${edgeBlurAmount}px)`, // 0 → 18px
        opacity: 1,
        transition: {
          duration: 0.3,
          ease: [0.34, 1.56, 0.64, 1]
        }
      });
    }, 100);  // 100ms延迟
  }
}, [isHovered, edgeLineWidth, edgeBlurAmount, glowSpread]);
```

===  完整组件结构（5层）===

```tsx
<div className="relative" style={{ padding: '80px' }}>
  
  {/* 层1: 粗蓝色边缘线条（雾气态，可模糊）*/}
  <motion.div
    animate={edgeControls}
    initial={{
      borderWidth: `${edgeLineWidth}px`,
      filter: `blur(${edgeBlurAmount}px)`,
      opacity: 1,
    }}
    style={{
      position: 'absolute',
      inset: 0,
      border: `${edgeLineWidth}px solid rgba(6,182,212,0.8)`,
      borderRadius: '24px',
      zIndex: 3,  // 在容器上方
      pointerEvents: 'none',
      boxSizing: 'border-box',
    }}
  />
  
  {/* 层2: 凝结态光晕（淡入淡出）*/}
  <motion.div
    animate={glowControls}
    initial={{
      opacity: 0,
      boxShadow: '0 0 0 0 rgba(6,182,212,0)',
    }}
    style={{
      position: 'absolute',
      inset: 0,
      borderRadius: '16px',
      zIndex: 1,
      pointerEvents: 'none',
    }}
  />
  
  {/* 层3: 主容器（背景渐变 + backdrop-filter）*/}
  <motion.div
    animate={isHovered ? "hover" : "default"}
    variants={{
      default: {
        background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.65) 35%, rgba(255,255,255,0.3) 65%, rgba(255,255,255,0.1) 85%, rgba(255,255,255,0) 100%)',
        backdropFilter: 'blur(32px)',
        borderRadius: '24px',
        y: 0,
      },
      hover: {
        background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.65) 70%, rgba(255,255,255,0.3) 90%, rgba(255,255,255,0.1) 97%, rgba(255,255,255,0) 100%)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        y: -4,
      }
    }}
    transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
    style={{
      width: '320px',
      height: '240px',
      padding: '32px',
      position: 'relative',
      zIndex: 2,
    }}
  >
    {/* 内容区 */}
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
    }}>
      
      {/* 层4: 紫色图标背景（和v1.0一样）*/}
      <div style={{ position: 'relative', width: '56px', height: '56px' }}>
        <motion.div
          animate={isHovered ? "hover" : "default"}
          variants={{
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
          }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '14px',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
        
        {/* 层5: SVG图标 - 永远清晰 */}
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
        <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#0f172a' }}>
          {title}
        </h3>
        <p style={{ fontSize: '14px', color: '#64748b' }}>
          {subtitle}
        </p>
      </div>
    </div>
  </motion.div>
</div>
```

===  页面演示布局 ===

创建演示页面：src/pages/11-DynamicBorderlessV1.1.tsx

布局：

```
┌──────────────────────────────────────────┐
│ 动画时间轴可视化                          │
│                                          │
│ 雾气态          过渡中         凝结态    │
│ ┏━━━━┓    →    ┌────┐    →   ┌─────┐   │
│ ┃    ┃         │    │         │  ·  │   │
│ ┗━━━━┛         └────┘         └·····┘   │
│ 粗线+模糊      线条消失        清晰光晕  │
│                                          │
├──────────────────────────────────────────┤
│ 实时调节面板                              │
│                                          │
│ 1️⃣ 边缘线条粗细:  [━━●━━] 10px         │
│ 2️⃣ 边缘模糊强度:  [━━━●━] 18px         │
│ 3️⃣ 凝结态光晕:    [━●━━━] 8px          │
│ 4️⃣ 图标背景模糊:  [━●━━━] 2px          │
│                                          │
│ [推荐] [轻度] [重度]                     │
│                                          │
├──────────────────────────────────────────┤
│          实时预览卡片                     │
│         [大卡片居中]                      │
│      Hover观察动画过渡                    │
└──────────────────────────────────────────┘
```

===  技术要点说明 ===

1. 为什么用独立的border层：
   - border层可以单独应用filter: blur()
   - 不影响内容区域
   - 模糊严格作用在线条上

2. 为什么分2阶段动画：
   - 阶段1：线条形态变化（视觉重点）
   - 阶段2：光晕淡入（补充细节）
   - 更有层次感，不是简单的fade

3. 为什么用useAnimation：
   - 需要精确控制时间序列
   - setTimeout实现延迟
   - 可以独立控制每层的动画

4. 线条+模糊效果：
   - border: 10px solid cyan → 粗蓝色线
   - filter: blur(18px) → 只blur这个线条层
   - 模糊范围约36-40px（blur的2倍）
   - 严格沿着边缘，不是独立形状

===  导航位置 ===

在 App.tsx 中添加为第11个按钮：

```tsx
<NavButton 
  color="amber"  // 彩虹序列第10个（修正：应该是第11个，用teal）
  onClick={() => navigate('11')}
>
  11 · v1.1 边缘线条模糊
</NavButton>
```

注：第10个是amber，第11个应该用teal-400 to teal-500

===  页面底部Prompt展示 ===

<details className="mt-16 p-6 rounded-xl bg-slate-900 text-white">
  <summary className="cursor-pointer text-lg font-medium mb-4">
    📝 查看生成此页面的Prompt
  </summary>
  
  <div className="space-y-6">
    <div>
      <h4 className="text-sm text-slate-400 mb-2">Prompt (中文版)</h4>
      <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap">
创建 v1.1 - 边缘模糊线条动画方案

核心设计：
雾气态：粗蓝色边缘线条(10px) + 重度模糊(18px)，只在线条上
过渡：线条收缩消失 + 模糊撤销(0-300ms) → 光晕淡入(300-400ms)
凝结态：清晰box-shadow光晕

技术方案：
- 独立border层，只对这层应用filter: blur()
- useAnimation控制分阶段动画
- 边缘线条和模糊紧密结合
- 内容区域完全不受影响

[完整代码见上方]
      </pre>
    </div>
    
    <div>
      <h4 className="text-sm text-slate-400 mb-2">Prompt (English Version)</h4>
      <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap">
Create v1.1 - Edge blur line animation

Core design:
Mist: Thick cyan edge line(10px) + heavy blur(18px), only on line
Transition: Line shrinks & blur removes(0-300ms) → Glow fades in(300-400ms)
Condensed: Sharp box-shadow glow

Technical approach:
- Independent border layer, filter: blur() only on this layer
- useAnimation controls phased animation
- Edge line and blur tightly coupled
- Content area completely unaffected

[Complete code above]
      </pre>
    </div>
    
    <div className="text-xs text-slate-400 pt-4 border-t border-slate-700 space-y-1">
      <p>生成日期: 2025-11-02</p>
      <p>Prompt文件: prompt-02.11-edge-blur-animation-v1.1.md</p>
      <p>探索方向: 边缘线条模糊动画，分阶段过渡效果</p>
    </div>
  </div>
</details>

生成v1.1页面，实现边缘线条重度模糊的动画效果。
```

---

## 🎨 English Prompt

```
Create v1.1 - Edge blur line animation approach

File: src/pages/11-DynamicBorderlessV1.1.tsx
Component: src/components/borderless/DynamicBorderlessCardV1_1.tsx

Core design:

【Mist State】Thick cyan edge line + heavy blur
【Transition】Line shrinks & blur removes → Glow fades in
【Condensed State】Sharp glow (box-shadow)

===  COMPLETE TECHNICAL IMPLEMENTATION (Detailed Code) ===

[Full component code as shown in Chinese section above - same implementation]

Key technical points:

1. Independent border layer with filter: blur()
2. useAnimation + useEffect for phased animation
3. Precise timing: 0-300ms (line shrink) → 300-400ms (glow fade in)
4. Border layer isolated, doesn't affect content
5. Blur strictly on edge line only

===  SLIDER SYSTEM ===

4 sliders with detailed control:

1. Edge line width: 4-16px (default 10px)
2. Edge blur amount: 0-30px (default 18px)  
3. Condensed glow spread: 0-20px (default 8px)
4. Icon background blur: 0-5px (default 2px)

===  NAVIGATION ===

Add to App.tsx as button 11:
Button text: "11 · v1.1 边缘线条模糊"
Button color: teal-400 to teal-500 (rainbow sequence #11)
Same style as all other buttons

===  BOTTOM PROMPT DISPLAY ===

Include full Chinese + English prompts at page bottom with metadata.

Generate v1.1 page with edge line blur animation effect.
```

---

**精简格式 ✓ 仅3部分 ✓ 代码详细 ✓**

