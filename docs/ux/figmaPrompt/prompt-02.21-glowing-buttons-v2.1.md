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
      
      {/* 层4: 透明容器 + 图标 + 点击态 */}
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
          filter: isPressed ? 'brightness(1.15)' : 'brightness(1.0)',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
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
        <Icon size={s.icon} color="#ffffff" strokeWidth={2} />
      </motion.button>
    </div>
  );
}
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

