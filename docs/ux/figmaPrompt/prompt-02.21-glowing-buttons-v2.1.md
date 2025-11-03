# Prompt 02.21: 发光边缘按钮 v2.1

**目标**: 将CodePen发光边缘效果应用到按钮的3个尺寸  
**日期**: 2025-11-02  
**文件**: 21-GlowingButtonsV2.1.tsx

---

## 🎯 本次探索的方向

将v2.0的CodePen发光边缘效果完整应用到v1.7的Borderless Buttons组件，支持sm(40×40px)、md(56×56px)、lg(72×72px)三种尺寸，每个尺寸都有完整的Mesh Gradient Border和12层box-shadow发光效果。

---

## 🎨 中文Prompt

```
创建 v2.1 - 发光边缘按钮

文件: src/pages/21-GlowingButtonsV2.1.tsx
组件: src/components/borderless/BorderlessButtonV2.tsx

将v2.0的CodePen发光效果应用到按钮！

===  完整组件实现 ===

```tsx
import { motion, useAnimation } from "motion/react";
import { LucideIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function BorderlessButtonV2({
  icon: Icon,
  color = { r: 6, g: 182, b: 212 },
  size = 'md',  // sm | md | lg
  onClick,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [pointerAngle, setPointerAngle] = useState(45);
  const [pointerDistance, setPointerDistance] = useState(0);
  const buttonRef = useRef<HTMLDivElement>(null);
  const { r, g, b } = color;
  
  const sizeMap = {
    sm: { box: 40, icon: 20, radius: 10, inset: 20 },  // inset用于glow层
    md: { box: 56, icon: 28, radius: 14, inset: 28 },
    lg: { box: 72, icon: 36, radius: 18, inset: 36 },
  };
  const s = sizeMap[size];
  
  const iconBackgroundBlur = 5.0;
  
  // 鼠标跟踪（v2.0算法）
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const dx = x - centerX;
    const dy = y - centerY;
    
    let angleRadians = 0;
    let angleDegrees = 0;
    if (dx !== 0 || dy !== 0) {
      angleRadians = Math.atan2(dy, dx);
      angleDegrees = angleRadians * (180 / Math.PI) + 90;
      if (angleDegrees < 0) angleDegrees += 360;
    }
    
    let k_x = Infinity;
    let k_y = Infinity;
    if (dx !== 0) k_x = centerX / Math.abs(dx);
    if (dy !== 0) k_y = centerY / Math.abs(dy);
    const closeness = Math.min(Math.max(1 / Math.min(k_x, k_y), 0), 1);
    
    setPointerAngle(angleDegrees);
    setPointerDistance(closeness);
  };
  
  const glowOpacity = Math.max(0, (pointerDistance - 0.3) / 0.7);
  const colorOpacity = Math.max(0, (pointerDistance - 0.5) / 0.5);
  
  return (
    <div 
      ref={buttonRef}
      className="relative inline-block"
      style={{ 
        width: `${s.box}px`,
        height: `${s.box}px`,
      }}
      onPointerMove={handlePointerMove}
    >
      {/* 层1: Mesh Gradient Border（Hover态，v2.0）*/}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: `${s.radius}px`,
          border: '1px solid transparent',
          zIndex: 5,
          opacity: isHovered ? colorOpacity : 0,
          transition: 'opacity 0.25s ease-out',
          pointerEvents: 'none',
          background: `
            linear-gradient(hsl(260, 25%, 95%) 0 100%) padding-box,
            radial-gradient(at 80% 55%, hsla(268,100%,76%,1) 0px, transparent 50%) border-box,
            radial-gradient(at 69% 34%, hsla(349,100%,74%,1) 0px, transparent 50%) border-box,
            radial-gradient(at 8% 6%, hsla(136,100%,78%,1) 0px, transparent 50%) border-box,
            radial-gradient(at 41% 38%, hsla(192,100%,64%,1) 0px, transparent 50%) border-box,
            radial-gradient(at 86% 85%, hsla(186,100%,74%,1) 0px, transparent 50%) border-box,
            radial-gradient(at 82% 18%, hsla(52,100%,65%,1) 0px, transparent 50%) border-box,
            radial-gradient(at 51% 4%, hsla(12,100%,72%,1) 0px, transparent 50%) border-box,
            linear-gradient(#c299ff 0 100%) border-box
          `,
          WebkitMaskImage: `
            conic-gradient(
              from ${pointerAngle}deg at center,
              black 25%,
              transparent 40%,
              transparent 60%,
              black 75%
            )
          `,
          maskImage: `
            conic-gradient(
              from ${pointerAngle}deg at center,
              black 25%,
              transparent 40%,
              transparent 60%,
              black 75%
            )
          `,
        }}
      />
      
      {/* 层2: Glowing Edge（Hover态，12层box-shadow）*/}
      <div
        style={{
          position: 'absolute',
          inset: `-${s.inset}px`,  // sm:-20px, md:-28px, lg:-36px
          borderRadius: `${s.radius}px`,
          zIndex: 4,
          opacity: isHovered ? glowOpacity : 0,
          transition: 'opacity 0.25s ease-out',
          pointerEvents: 'none',
          mixBlendMode: 'plus-lighter',
          WebkitMaskImage: `
            conic-gradient(
              from ${pointerAngle}deg at center,
              black 2.5%,
              transparent 10%,
              transparent 90%,
              black 97.5%
            )
          `,
          maskImage: `
            conic-gradient(
              from ${pointerAngle}deg at center,
              black 2.5%,
              transparent 10%,
              transparent 90%,
              black 97.5%
            )
          `,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: `${s.inset}px`,
            borderRadius: `${s.radius}px`,
            boxShadow: `
              inset 0 0 0 1px hsl(40deg 80% 80% / 100%),
              inset 0 0 1px 0 hsl(40deg 80% 80% / 60%),
              inset 0 0 3px 0 hsl(40deg 80% 80% / 50%),
              inset 0 0 6px 0 hsl(40deg 80% 80% / 40%),
              inset 0 0 15px 0 hsl(40deg 80% 80% / 30%),
              inset 0 0 25px 2px hsl(40deg 80% 80% / 20%),
              inset 0 0 50px 2px hsl(40deg 80% 80% / 10%),
              
              0 0 1px 0 hsl(40deg 80% 80% / 60%),
              0 0 3px 0 hsl(40deg 80% 80% / 50%),
              0 0 6px 0 hsl(40deg 80% 80% / 40%),
              0 0 15px 0 hsl(40deg 80% 80% / 30%),
              0 0 25px 2px hsl(40deg 80% 80% / 20%),
              0 0 50px 2px hsl(40deg 80% 80% / 10%)
            `,
          }}
        />
      </div>
      
      {/* 层3: 彩色背景（可模糊，v1.7）*/}
      <motion.div
        animate={{
          filter: isHovered ? 'blur(0px)' : `blur(${iconBackgroundBlur}px)`,
          boxShadow: isHovered
            ? `0 0 20px rgba(${r},${g},${b},0.35)`
            : `0 0 30px rgba(${r},${g},${b},0.25)`,
        }}
        transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          width: `${s.box}px`,
          height: `${s.box}px`,
          borderRadius: `${s.radius}px`,
          background: `rgba(${r},${g},${b},1.0)`,
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      
      {/* 层4: 透明容器 + 图标 + 点击态（⭐核心交互）*/}
      <motion.button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        animate={{
          // ⭐⭐⭐ 点击态：整体变亮（超重要！）
          // 作用在整个button容器，影响所有视觉层：
          // - 彩色背景变亮
          // - CodePen发光边缘变亮
          // - 白色图标变得更亮（接近发光）
          // - Mesh gradient也变亮
          filter: isPressed ? 'brightness(1.15)' : 'brightness(1.0)',
        }}
        transition={{
          duration: 0.2,  // 200ms快速响应
          ease: 'easeOut',
          // Framer Motion自动打断：
          // 按下100ms就松开 → 从brightness(1.075)回退到1.0
          // 不会跳跃，平滑过渡
        }}
        style={{
          width: `${s.box}px`,
          height: `${s.box}px`,
          borderRadius: `${s.radius}px`,
          background: 'transparent',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          padding: 0,
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* 白色图标 - 永远清晰 */}
        <Icon size={s.icon} color="#ffffff" strokeWidth={2} />
      </motion.button>
    </div>
  );
}
```

===  点击态效果详解（⭐核心特色）===

为什么点击态变亮15%非常重要：

1. 即时反馈原则：
```
用户点击 → 0ms延迟 → 立即视觉反馈
不是等待动画完成，而是瞬间开始变亮
符合"呼应性"设计原则（100ms内反馈）
```

2. 整体变亮的优势：
```tsx
// brightness(1.15)作用在button容器上
<motion.button filter="brightness(1.15)">
  
  // 影响范围（视觉层叠）：
  下层彩色背景 → 变亮
  CodePen发光边缘 → 变亮（Mesh gradient + 12层box-shadow都变亮）
  白色图标 → 更亮（接近发光效果）
  
  // 整体效果：
  像能量脉冲 ⚡
  像闪光灯 ✨
  像按钮"发光" 💡
```

3. 技术实现示例：

完整点击态代码（带详细注释）：

```tsx
import { motion } from "motion/react";
import { useState } from "react";

function ExampleButton() {
  const [isPressed, setIsPressed] = useState(false);
  
  return (
    <motion.button
      // ===== 事件绑定 =====
      onMouseDown={() => {
        setIsPressed(true);
        console.log('Press start:', Date.now());
      }}
      onMouseUp={() => {
        setIsPressed(false);
        console.log('Press end:', Date.now());
      }}
      onMouseLeave={() => {
        // 重要：离开时重置，避免卡住
        setIsPressed(false);
      }}
      
      // ===== 动画配置 =====
      animate={{
        // brightness: 1.0（正常）→ 1.15（变亮15%）
        filter: isPressed ? 'brightness(1.15)' : 'brightness(1.0)',
      }}
      transition={{
        duration: 0.2,    // 200ms
        ease: 'easeOut',  // 快速启动，平滑结束
        // 无需配置打断，Framer Motion自动处理
      }}
      
      // ===== 视觉样式 =====
      style={{
        background: 'rgba(6,182,212,1.0)',  // 青色背景
        // brightness会让这个背景变得更亮
        // rgba(6,182,212) → 更亮的青色
      }}
    >
      <Icon color="#ffffff" />
      {/* 白色图标也会变得更亮，接近发光 */}
    </motion.button>
  );
}

/* 
  实际效果：
  
  未按下：
    background: rgb(6,182,212)
    icon: rgb(255,255,255)
    
  按下（brightness 1.15）：
    background: rgb(7,209,244) ← 自动计算，更亮
    icon: rgb(255,255,255) ← 已经是最大值，不变
    整体光感增强
    
  视觉：整个按钮"闪亮"一下
*/
```

4. 动画打断示例代码：

```tsx
// 场景A：完整200ms点击
function FullPress() {
  // t=0ms:    mouseDown, brightness 1.0 → 1.15 开始
  // t=50ms:   brightness ≈ 1.0375 (进行25%)
  // t=100ms:  brightness ≈ 1.075 (进行50%)
  // t=150ms:  brightness ≈ 1.1125 (进行75%)
  // t=200ms:  brightness = 1.15 (完成100%)
  // t=200ms:  mouseUp, brightness 1.15 → 1.0 开始
  // t=400ms:  brightness回到1.0
  
  return <motion.button animate={{ filter: ... }} />;
}

// 场景B：100ms快速点击（打断）
function QuickPress() {
  // t=0ms:    mouseDown, 1.0 → 1.15 开始
  // t=100ms:  brightness到达约1.075（动画进行一半）
  // t=100ms:  mouseUp！动画被打断
  //           立即从1.075 → 1.0开始新动画
  //           不会跳到1.15，不会等待
  // t=300ms:  brightness回到1.0
  
  // 关键：从当前值平滑回退，无跳跃
  return <motion.button animate={{ filter: ... }} />;
}

// 场景C：50ms极快点击
function VeryQuickPress() {
  // t=0ms:   mouseDown, 1.0 → 1.15 开始
  // t=50ms:  brightness到达约1.0375（刚开始）
  // t=50ms:  mouseUp！立即打断
  //          1.0375 → 1.0
  // t=250ms: brightness回到1.0
  
  // 视觉：轻微闪烁，非常自然
  return <motion.button animate={{ filter: ... }} />;
}
```

5. CSS brightness原理：

```css
/* brightness是CSS filter函数 */
filter: brightness(1.15);

/* 作用方式：
   将所有颜色通道乘以1.15
   
   示例：
   rgb(100, 150, 200) × 1.15 
   = rgb(115, 172.5, 230)
   
   白色 rgb(255,255,255) × 1.15
   = rgb(255,255,255) (已达上限，不变)
   
   所以：
   - 有色元素变亮
   - 白色元素不变（已最亮）
   - 整体光感增强
*/

/* 为什么不用opacity：
   
   opacity: 0.8 → 变透明（不好）
   brightness: 1.15 → 变亮（好！）
   
   opacity会让元素"消失"
   brightness会让元素"发光"
*/
```

6. 点击态在各层的视觉效果：

```
Layer 5 - Mesh Gradient Border:
  未按：hsla(268,100%,76%,1) 紫色
  按下：hsla(268,100%,87%,1) ← 自动变亮

Layer 4 - Glowing Edge (12层box-shadow):
  未按：hsl(40deg 80% 80%)
  按下：hsl(40deg 80% 92%) ← 每层都变亮
  
Layer 3 - 彩色背景:
  未按：rgba(6,182,212,1.0) 青色
  按下：rgb(7,209,244) ← 更亮的青色
  
Layer 图标:
  未按：#ffffff 白色
  按下：#ffffff (已达最大值)
  
整体：所有有色部分都变亮，像闪光
```

===  真实使用示例代码 ===

```tsx
// 示例1: 上传按钮（主要操作）
<BorderlessButtonV2
  icon={UploadIcon}
  color={{ r: 6, g: 182, b: 212 }}  // 青色
  size="md"
  onClick={() => {
    console.log('Upload clicked!');
    // 视觉：点击瞬间整个按钮变亮，包括CodePen发光边缘
  }}
/>

// 示例2: 删除按钮（危险操作）
<BorderlessButtonV2
  icon={TrashIcon}
  color={{ r: 239, g: 68, b: 68 }}  // 红色
  size="md"
  onClick={() => {
    if (confirm('确定删除?')) {
      // 删除逻辑
    }
  }}
/>
// 视觉：红色按钮点击时变成更亮的红色，警示感更强

// 示例3: 按钮组
<div className="flex gap-4">
  {/* 所有按钮都有相同的点击态效果 */}
  <BorderlessButtonV2 icon={SaveIcon} color={{r:34,g:197,b:94}} size="lg" />
  <BorderlessButtonV2 icon={CancelIcon} color={{r:100,g:116,b:139}} size="lg" />
</div>

// 示例4: 工具栏
<div className="flex gap-2">
  <BorderlessButtonV2 icon={SearchIcon} color={{r:6,g:182,b:212}} size="sm" />
  <BorderlessButtonV2 icon={FilterIcon} color={{r:6,g:182,b:212}} size="sm" />
  <BorderlessButtonV2 icon={SortIcon} color={{r:6,g:182,b:212}} size="sm" />
  <BorderlessButtonV2 icon={MoreIcon} color={{r:100,g:116,b:139}} size="sm" />
</div>

// 示例5: 快速连续点击测试
function RapidClickTest() {
  const [clickCount, setClickCount] = useState(0);
  
  return (
    <BorderlessButtonV2
      icon={ZapIcon}
      color={{r:251,g:146,b:60}}
      size="lg"
      onClick={() => setClickCount(c => c + 1)}
    />
    // 测试：快速连续点击
    // 每次点击都会有闪亮效果
    // 即使动画未完成就再次点击，也会平滑打断
  );
}
```

===  点击态状态机完整代码 ===

```tsx
// 完整的按钮组件，展示3种状态

export function BorderlessButtonWithStates({
  icon: Icon,
  color,
  size = 'md',
  onClick,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  // 状态机：
  // State 1: Default（默认态）
  //   - isHovered: false
  //   - isPressed: false
  //   - 视觉：背景blur(5px)，无CodePen发光
  
  // State 2: Hovered（悬停态）
  //   - isHovered: true
  //   - isPressed: false
  //   - 视觉：背景blur(0)，CodePen发光边缘显示
  
  // State 3: Pressed（按下态）⭐
  //   - isHovered: true（必须先hover）
  //   - isPressed: true
  //   - 视觉：brightness(1.15) 整体变亮
  
  return (
    <div>
      {/* 彩色背景层 */}
      <motion.div
        animate={{
          filter: isHovered ? 'blur(0px)' : 'blur(5px)',
          boxShadow: isHovered ? '大光晕' : '小光晕',
        }}
        style={{
          // 这层的颜色会被上层的brightness影响
          background: `rgba(${color.r},${color.g},${color.b},1.0)`,
        }}
      />
      
      {/* CodePen发光层（hover时显示）*/}
      <div
        style={{
          opacity: isHovered ? glowOpacity : 0,
          // 这层的发光也会被brightness影响
          boxShadow: '12层...',
        }}
      />
      
      {/* 顶层button - 点击态在这里 */}
      <motion.button
        animate={{
          // ⭐ 关键：brightness作用在这里
          // 视觉上影响所有下层
          filter: isPressed ? 'brightness(1.15)' : 'brightness(1.0)',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        style={{
          background: 'transparent',  // 透明，显示下层
          zIndex: 10,
        }}
      >
        <Icon />
      </motion.button>
    </div>
  );
}

// 使用示例：
<BorderlessButtonWithStates
  icon={UploadIcon}
  color={{r:6,g:182,b:212}}
/>

// 交互流程：
// 1. 鼠标移入 → isHovered=true → CodePen发光边缘淡入
// 2. 移动鼠标 → 发光跟随鼠标位置
// 3. 按下左键 → isPressed=true → brightness(1.15)整体闪亮
// 4. 松开左键 → isPressed=false → brightness(1.0)恢复
// 5. 鼠标移出 → isHovered=false → CodePen边缘消失，背景模糊
```

===  性能优化建议（真实代码）===

```tsx
// 如果按钮很多（比如100个），优化鼠标跟踪：

export function BorderlessButtonV2Optimized({...}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [pointerAngle, setPointerAngle] = useState(45);
  const [pointerDistance, setPointerDistance] = useState(0);
  const buttonRef = useRef<HTMLDivElement>(null);
  
  // 使用throttle减少计算频率
  const handlePointerMove = useCallback(
    throttle((e: React.PointerEvent) => {
      if (!buttonRef.current) return;
      // 鼠标跟踪算法...
    }, 16),  // 约60fps，足够流畅
    []
  );
  
  return (
    <div onPointerMove={handlePointerMove}>
      {/* ... */}
    </div>
  );
}

// 或者：只在hover时才跟踪鼠标
const handlePointerMove = (e: React.PointerEvent) => {
  if (!isHovered) return;  // 未hover时不计算
  // 鼠标跟踪算法...
};
```

===  不同颜色的点击态视觉效果 ===

```tsx
// 青色按钮
<BorderlessButtonV2 color={{r:6,g:182,b:212}}>
  // 点击：rgb(6,182,212) → rgb(7,209,244) 更亮的青色
  // 感觉：清爽的闪光
</BorderlessButtonV2>

// 红色按钮
<BorderlessButtonV2 color={{r:239,g:68,b:68}}>
  // 点击：rgb(239,68,68) → rgb(255,78,78) 更亮的红色
  // 感觉：警示的脉冲
</BorderlessButtonV2>

// 绿色按钮
<BorderlessButtonV2 color={{r:34,g:197,b:94}}>
  // 点击：rgb(34,197,94) → rgb(39,227,108) 更亮的绿色
  // 感觉：确认的光芒
</BorderlessButtonV2>

// 紫色按钮
<BorderlessButtonV2 color={{r:167,g:139,b:250}}>
  // 点击：rgb(167,139,250) → rgb(192,160,255) 更亮的紫色
  // 感觉：梦幻的闪烁
</BorderlessButtonV2>

每种颜色都有独特的"闪亮"感觉！
```

===  实战应用代码示例 ===

```tsx
// 应用示例1: 文件操作工具栏
function FileActionToolbar({ file }: { file: File }) {
  return (
    <div className="flex gap-3">
      <BorderlessButtonV2
        icon={EyeIcon}
        color={{r:6,g:182,b:212}}
        size="sm"
        onClick={() => previewFile(file)}
      />
      <BorderlessButtonV2
        icon={DownloadIcon}
        color={{r:34,g:197,b:94}}
        size="sm"
        onClick={() => downloadFile(file)}
      />
      <BorderlessButtonV2
        icon={ShareIcon}
        color={{r:167,g:139,b:250}}
        size="sm"
        onClick={() => shareFile(file)}
      />
      <BorderlessButtonV2
        icon={TrashIcon}
        color={{r:239,g:68,b:68}}
        size="sm"
        onClick={() => deleteFile(file)}
      />
    </div>
  );
  // 每个按钮点击时都会闪亮，配合CodePen发光边缘
  // 视觉反馈极佳！
}

// 应用示例2: 主操作按钮组
function PrimaryActions() {
  return (
    <div className="flex gap-4">
      <BorderlessButtonV2
        icon={UploadIcon}
        color={{r:6,g:182,b:212}}
        size="lg"
        onClick={handleUpload}
      />
      <BorderlessButtonV2
        icon={FolderPlusIcon}
        color={{r:34,g:197,b:94}}
        size="lg"
        onClick={handleCreateFolder}
      />
    </div>
  );
}

// 应用示例3: 带Loading状态的按钮
function ButtonWithLoading() {
  const [loading, setLoading] = useState(false);
  
  const handleClick = async () => {
    setLoading(true);
    await uploadFile();
    setLoading(false);
  };
  
  return (
    <BorderlessButtonV2
      icon={loading ? SpinnerIcon : UploadIcon}
      color={{r:6,g:182,b:212}}
      size="md"
      onClick={handleClick}
    />
    // 点击态在loading时也生效
    // 提供即时反馈，然后显示loading
  );
}
```

===  调试和测试代码 ===

```tsx
// 测试组件：验证点击态效果
function ClickStateDebugger() {
  const [clickLog, setClickLog] = useState<string[]>([]);
  
  const logClick = (event: string) => {
    const timestamp = Date.now();
    setClickLog(prev => [...prev, `${timestamp}: ${event}`]);
  };
  
  return (
    <div>
      <BorderlessButtonV2
        icon={ZapIcon}
        color={{r:251,g:146,b:60}}
        size="lg"
        onClick={() => logClick('Click完成')}
      />
      
      {/* 在按钮上添加监听器 */}
      <div
        onMouseDown={() => logClick('MouseDown')}
        onMouseUp={() => logClick('MouseUp')}
      >
        {/* 日志显示 */}
        <div className="mt-4 p-4 bg-slate-800 rounded text-white text-xs font-mono">
          {clickLog.map((log, i) => (
            <div key={i}>{log}</div>
          ))}
        </div>
      </div>
      
      {/* 测试说明 */}
      <div className="mt-4 text-sm text-slate-600">
        <p>测试方法：</p>
        <ul>
          <li>• 快速点击：观察brightness动画是否平滑</li>
          <li>• 按住500ms：观察是否到达1.15并保持</li>
          <li>• 按下100ms松开：观察是否从中间值回退</li>
        </ul>
      </div>
    </div>
  );
}
```

===  完整按钮组件代码（可直接使用）===

[上方已包含完整实现，300+行]

特别强调点击态部分（Line 150-180）:
- onMouseDown/Up事件
- brightness(1.15)变亮
- 200ms可打断动画
- 整体闪亮效果
- 包括所有视觉层（背景+CodePen发光+图标）

这是v2.0的核心特色！
```

===  页面布局 ===

```tsx
<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900/30 py-12 px-8">
  <h1 className="text-5xl text-white">Borderless Buttons v2.1</h1>
  <p className="text-xl text-slate-300">
    发光边缘按钮 · 3种尺寸
  </p>
  
  {/* 尺寸示例 */}
  <Section title="尺寸示例 · 全部带CodePen发光">
    <div className="flex gap-8 items-end">
      <div className="text-center">
        <BorderlessButtonV2 
          icon={UploadIcon} 
          color={{r:6,g:182,b:212}} 
          size="sm"
        />
        <p className="text-white text-sm mt-3">sm · 40×40px</p>
      </div>
      
      <div className="text-center">
        <BorderlessButtonV2 
          icon={UploadIcon} 
          color={{r:6,g:182,b:212}} 
          size="md"
        />
        <p className="text-white text-sm mt-3">md · 56×56px</p>
      </div>
      
      <div className="text-center">
        <BorderlessButtonV2 
          icon={UploadIcon} 
          color={{r:6,g:182,b:212}} 
          size="lg"
        />
        <p className="text-white text-sm mt-3">lg · 72×72px</p>
      </div>
    </div>
  </Section>
  
  {/* 颜色语义网格 */}
  <Section title="颜色语义 · 全部带发光边缘">
    <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
      
      {/* 主要 - 青色 */}
      <BorderlessButtonV2 icon={UploadIcon} color={{r:6,g:182,b:212}} />
      <BorderlessButtonV2 icon={DownloadIcon} color={{r:6,g:182,b:212}} />
      <BorderlessButtonV2 icon={SearchIcon} color={{r:6,g:182,b:212}} />
      
      {/* 成功 - 绿色 */}
      <BorderlessButtonV2 icon={CheckIcon} color={{r:34,g:197,b:94}} />
      
      {/* 危险 - 红色 */}
      <BorderlessButtonV2 icon={TrashIcon} color={{r:239,g:68,b:68}} />
      <BorderlessButtonV2 icon={XIcon} color={{r:239,g:68,b:68}} />
      
      {/* 次要 - 灰色 */}
      <BorderlessButtonV2 icon={SettingsIcon} color={{r:100,g:116,b:139}} />
      <BorderlessButtonV2 icon={MoreIcon} color={{r:100,g:116,b:139}} />
      
      {/* 其他颜色 */}
      <BorderlessButtonV2 icon={StarIcon} color={{r:167,g:139,b:250}} />
      <BorderlessButtonV2 icon={AlertIcon} color={{r:251,g:146,b:60}} />
      <BorderlessButtonV2 icon={HeartIcon} color={{r:244,g:114,b:182}} />
    </div>
    
    <div className="mt-8 p-6 bg-slate-800 rounded-xl border border-purple-500">
      <p className="text-slate-300">
        ✨ Hover到任意按钮，移动鼠标观察CodePen彩色发光边缘跟随效果
      </p>
      <p className="text-xs text-slate-400 mt-2">
        每个按钮都有：Mesh Gradient Border + 12层Box-Shadow + Conic Mask
      </p>
    </div>
  </Section>
  
  {/* 技术说明 */}
  <Section title="🛠️ 技术实现">
    <div className="p-6 bg-slate-800 rounded-xl">
      <h4 className="text-white mb-4">按钮发光边缘（4层结构）</h4>
      <div className="space-y-3 text-sm">
        <div className="flex items-start gap-3">
          <span className="text-purple-400">5️⃣</span>
          <div>
            <p className="text-white font-medium">Mesh Gradient Border</p>
            <p className="text-slate-400 text-xs">8层radial + conic mask，z-index: 5</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <span className="text-orange-400">4️⃣</span>
          <div>
            <p className="text-white font-medium">Glowing Edge - 12层box-shadow</p>
            <p className="text-slate-400 text-xs">6 inset + 6 outer，inset: -{s.inset}px，z-index: 4</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <span className="text-cyan-400">1️⃣</span>
          <div>
            <p className="text-white font-medium">彩色背景 - 可模糊</p>
            <p className="text-slate-400 text-xs">filter: blur(5px) → blur(0)，z-index: 1</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <span className="text-green-400">🔟</span>
          <div>
            <p className="text-white font-medium">白色图标 - 永远清晰 + 点击态</p>
            <p className="text-slate-400 text-xs">brightness(1.15) on press，z-index: 10</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-slate-900 rounded-lg">
        <code className="text-xs font-mono text-purple-400">
          尺寸自适应：sm(40px, inset:-20px) / md(56px, inset:-28px) / lg(72px, inset:-36px)
        </code>
      </div>
    </div>
  </Section>
</div>
```

关键参数：
- sm: 40×40px, icon 20px, radius 10px, glow inset -20px
- md: 56×56px, icon 28px, radius 14px, glow inset -28px
- lg: 72×72px, icon 36px, radius 18px, glow inset -36px

导航位置：
在 App.tsx 中添加为第21个按钮
按钮文字: "21 · v2.1 发光按钮"
按钮颜色: fuchsia-500 to-fuchsia-600

页面底部添加prompt记录（中英文+元数据）

生成v2.1页面和组件。
```

---

## 🎨 English Prompt

```
Create v2.1 - Glowing Edge Buttons

File: src/pages/21-GlowingButtonsV2.1.tsx
Component: src/components/borderless/BorderlessButtonV2.tsx

Apply v2.0 CodePen glowing edge to v1.7 buttons!

[Complete implementation with all CodePen effects for 3 sizes]

Key: Size-adaptive inset for glow layer
- sm: -20px
- md: -28px  
- lg: -36px

Navigation:
Add to App.tsx as button 21
Button text: "21 · v2.1 发光按钮"
Button color: fuchsia-500 to-fuchsia-600

Generate v2.1 page and component.
```

---

**3尺寸全支持 ✓ CodePen发光 ✓ 鼠标跟随 ✓ 完整代码 ✓**

