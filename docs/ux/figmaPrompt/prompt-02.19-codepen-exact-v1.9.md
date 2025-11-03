# Prompt 02.19: CodePen发光边缘完全复刻 v1.9

**目标**: 100%复刻CodePen的Glowing Edge效果，先做静态凝结态  
**日期**: 2025-11-02  
**文件**: 19-CodePenGlowingEdgeV1.9.tsx

---

## 🎯 本次探索的方向

完全按照fromCodePen/glowingEdgeCard的实现方式，一模一样地复刻发光边缘效果。先创建一个静态的凝结态卡片展示，确保视觉效果和CodePen完全一致。

---

## 🎨 中文Prompt

```
创建 v1.9 - 完全复刻CodePen Glowing Edge

文件: src/pages/19-CodePenGlowingEdgeV1.9.tsx

重要：完全按照fromCodePen/glowingEdgeCard的代码实现！
不要自己创新，要100%还原！

===  CodePen关键技术分析 ===

从glowingEdgeCard代码中提取的核心实现：

1. 卡片基础结构：

```css
.card {
  position: relative;
  border-radius: 1.768em;  // 约28px
  border: 1px solid rgb(255 255 255 / 25%);
  background: linear-gradient(...);  // 卡片背景
  
  /* 3个伪元素/层 */
  &::before { /* mesh gradient border */ }
  &::after { /* mesh gradient background */ }
  & > .glow { /* glowing边缘 */ }
}
```

2. 发光边缘层（.glow元素）- 最关键！

```css
.glow {
  position: absolute;
  inset: -40px;  /* 向外扩展40px */
  border-radius: inherit;
  z-index: 1;
  
  /* Conic gradient mask - 锥形遮罩 */
  mask-image: conic-gradient(
    from var(--pointer-°) at center,
    black 2.5%,
    transparent 10%,
    transparent 90%,
    black 97.5%
  );
  
  /* 根据鼠标距离控制透明度 */
  opacity: calc((var(--pointer-d) - 30) / (100 - 30));
  
  /* ::before创建实际的发光 */
  &::before {
    content: "";
    position: absolute;
    inset: 40px;  /* 回到原尺寸 */
    border-radius: inherit;
    
    /* 多层inset box-shadow创建发光 */
    box-shadow: 
      /* 内部发光 */
      inset 0 0 0 1px hsl(var(--glow-color) / 100%),
      inset 0 0 1px 0 hsl(var(--glow-color) / 60%),
      inset 0 0 3px 0 hsl(var(--glow-color) / 50%),
      inset 0 0 6px 0 hsl(var(--glow-color) / 40%),
      inset 0 0 15px 0 hsl(var(--glow-color) / 30%),
      inset 0 0 25px 2px hsl(var(--glow-color) / 20%),
      inset 0 0 50px 2px hsl(var(--glow-color) / 10%),
      
      /* 外部发光 */
      0 0 1px 0 hsl(var(--glow-color) / 60%),
      0 0 3px 0 hsl(var(--glow-color) / 50%),
      0 0 6px 0 hsl(var(--glow-color) / 40%),
      0 0 15px 0 hsl(var(--glow-color) / 30%),
      0 0 25px 2px hsl(var(--glow-color) / 20%),
      0 0 50px 2px hsl(var(--glow-color) / 10%);
  }
}
```

3. Mesh Gradient Border（::before元素）：

```css
&::before {
  border: 1px solid transparent;
  
  /* 多层radial-gradient创建彩色网格 */
  background:
    linear-gradient(var(--card-bg) 0 100%) padding-box,
    radial-gradient(at 80% 55%, hsla(268,100%,76%,1) 0px, transparent 50%) border-box,
    radial-gradient(at 69% 34%, hsla(349,100%,74%,1) 0px, transparent 50%) border-box,
    radial-gradient(at 8% 6%, hsla(136,100%,78%,1) 0px, transparent 50%) border-box,
    radial-gradient(at 41% 38%, hsla(192,100%,64%,1) 0px, transparent 50%) border-box,
    /* ...更多radial-gradient */
    linear-gradient(#c299ff 0 100%) border-box;
  
  /* Conic gradient mask */
  mask-image: conic-gradient(
    from var(--pointer-°) at center,
    black 25%,
    transparent 40%,
    transparent 60%,
    black 75%
  );
  
  /* 根据距离控制显示 */
  opacity: calc((var(--pointer-d) - 50) / 50);
}
```

===  React组件实现（完全复刻）===

创建组件：src/components/borderless/CodePenGlowingEdge.tsx

```tsx
import { useState, useRef, useEffect } from "react";

interface CodePenGlowingEdgeProps {
  children?: React.ReactNode;
  className?: string;
}

export function CodePenGlowingEdge({
  children,
  className = "",
}: CodePenGlowingEdgeProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pointerAngle, setPointerAngle] = useState(45);
  const [pointerDistance, setPointerDistance] = useState(0);
  
  // 鼠标移动跟踪（完全按照CodePen的算法）
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const dx = x - centerX;
    const dy = y - centerY;
    
    // 角度计算（CodePen算法）
    let angleRadians = 0;
    let angleDegrees = 0;
    if (dx !== 0 || dy !== 0) {
      angleRadians = Math.atan2(dy, dx);
      angleDegrees = angleRadians * (180 / Math.PI) + 90;
      if (angleDegrees < 0) {
        angleDegrees += 360;
      }
    }
    
    // 到边缘距离计算（CodePen算法）
    let k_x = Infinity;
    let k_y = Infinity;
    if (dx !== 0) {
      k_x = centerX / Math.abs(dx);
    }
    if (dy !== 0) {
      k_y = centerY / Math.abs(dy);
    }
    const closeness = Math.min(Math.max(1 / Math.min(k_x, k_y), 0), 1);
    
    setPointerAngle(angleDegrees);
    setPointerDistance(closeness);
  };
  
  // 发光强度（根据距离）
  const glowOpacity = Math.max(0, (pointerDistance - 0.3) / 0.7);
  const colorOpacity = Math.max(0, (pointerDistance - 0.5) / 0.5);
  
  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      onPointerMove={handlePointerMove}
      style={{
        width: 'clamp(320px, 90vw, 600px)',
        height: '400px',
        borderRadius: '28px',
        isolation: 'isolate',
        border: '1px solid rgba(255, 255, 255, 0.25)',
        background: `
          linear-gradient(
            8deg,
            hsl(260, 25%, 15%) 75%,
            hsl(260, 25%, 17%) 75.5%
          )
        `,
        boxShadow: `
          rgba(0, 0, 0, 0.1) 0px 1px 2px,
          rgba(0, 0, 0, 0.1) 0px 2px 4px,
          rgba(0, 0, 0, 0.1) 0px 4px 8px,
          rgba(0, 0, 0, 0.1) 0px 8px 16px,
          rgba(0, 0, 0, 0.1) 0px 16px 32px,
          rgba(0, 0, 0, 0.1) 0px 32px 64px
        `,
      }}
    >
      {/* Mesh Gradient Border（::before）*/}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          border: '1px solid transparent',
          zIndex: -1,
          opacity: colorOpacity,
          transition: 'opacity 0.25s ease-out',
          background: `
            linear-gradient(hsl(260, 25%, 15%) 0 100%) padding-box,
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
      
      {/* Glowing边缘（.glow元素）*/}
      <div
        style={{
          position: 'absolute',
          inset: '-40px',  // 向外扩展
          borderRadius: 'inherit',
          zIndex: 1,
          pointerEvents: 'none',
          opacity: glowOpacity,
          transition: 'opacity 0.25s ease-out',
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
        {/* ::before - 实际的发光效果 */}
        <div
          style={{
            position: 'absolute',
            inset: '40px',  // 回到原尺寸
            borderRadius: 'inherit',
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
      
      {/* Mesh Gradient Background（::after）*/}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          border: '1px solid transparent',
          zIndex: -1,
          opacity: colorOpacity,
          transition: 'opacity 0.25s ease-out',
          mixBlendMode: 'soft-light',
          background: `
            radial-gradient(at 80% 55%, hsla(268,100%,76%,1) 0px, transparent 50%) padding-box,
            radial-gradient(at 69% 34%, hsla(349,100%,74%,1) 0px, transparent 50%) padding-box,
            radial-gradient(at 8% 6%, hsla(136,100%,78%,1) 0px, transparent 50%) padding-box,
            radial-gradient(at 41% 38%, hsla(192,100%,64%,1) 0px, transparent 50%) padding-box,
            radial-gradient(at 86% 85%, hsla(186,100%,74%,1) 0px, transparent 50%) padding-box,
            radial-gradient(at 82% 18%, hsla(52,100%,65%,1) 0px, transparent 50%) padding-box,
            radial-gradient(at 51% 4%, hsla(12,100%,72%,1) 0px, transparent 50%) padding-box,
            linear-gradient(#c299ff 0 100%) padding-box
          `,
          WebkitMaskImage: `
            linear-gradient(to bottom, black, black),
            radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%),
            radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%),
            radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%),
            radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%),
            radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%),
            conic-gradient(
              from ${pointerAngle}deg at center,
              transparent 5%,
              black 15%,
              black 85%,
              transparent 95%
            )
          `,
          WebkitMaskComposite: 'source-over, destination-out, destination-out, destination-out, destination-out, destination-out',
          maskImage: `
            linear-gradient(to bottom, black, black),
            radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%),
            radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%),
            radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%),
            radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%),
            radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%),
            conic-gradient(
              from ${pointerAngle}deg at center,
              transparent 5%,
              black 15%,
              black 85%,
              transparent 95%
            )
          `,
          maskComposite: 'subtract, add, add, add, add, add',
        }}
      />
      
      {/* 内容层 */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '2em',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {children}
      </div>
    </div>
  );
}
```

===  v1.9页面：静态凝结态展示 ===

先创建一个静态的凝结态卡片（不要动画，只要效果）：

```tsx
export default function CodePenGlowingEdgeV1_9() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        <div>
          <h1 className="text-5xl text-white mb-2">CodePen Glowing Edge v1.9</h1>
          <p className="text-xl text-slate-300">
            完全复刻CodePen效果 · 静态凝结态展示
          </p>
        </div>
        
        {/* 静态凝结态卡片（固定鼠标位置）*/}
        <Section title="静态发光边缘效果">
          <div className="flex justify-center">
            <CodePenGlowingEdge>
              <div className="text-center text-white">
                <h2 className="text-2xl font-medium mb-4">
                  Colored, Glowing Edges
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  This is a borderless card with glowing edges, 
                  exactly like the CodePen example!
                </p>
                <p className="text-slate-400 text-xs mt-4">
                  移动鼠标观察边缘发光效果变化
                </p>
              </div>
            </CodePenGlowingEdge>
          </div>
          
          <div className="mt-8 p-6 bg-slate-800 rounded-xl border border-slate-700">
            <h3 className="text-lg text-white mb-4">技术特点：</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• 多层inset box-shadow创建内外双向发光</li>
              <li>• Conic gradient mask跟随鼠标方向</li>
              <li>• Mesh gradient border（多个radial叠加）</li>
              <li>• Mix-blend-mode: plus-lighter增强发光</li>
              <li>• 复杂的mask-composite创建squircle形状</li>
            </ul>
          </div>
        </Section>
        
        {/* 技术分解展示 */}
        <Section title="技术分解">
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* 只显示mesh border */}
            <div className="p-6 bg-slate-800 rounded-xl">
              <h4 className="text-white mb-4">Mesh Gradient Border</h4>
              <div 
                style={{
                  width: '200px',
                  height: '150px',
                  borderRadius: '20px',
                  border: '1px solid transparent',
                  background: `
                    radial-gradient(at 80% 55%, hsla(268,100%,76%,1), transparent 50%),
                    radial-gradient(at 69% 34%, hsla(349,100%,74%,1), transparent 50%),
                    radial-gradient(at 8% 6%, hsla(136,100%,78%,1), transparent 50%),
                    #c299ff
                  `,
                }}
              />
              <p className="text-xs text-slate-400 mt-3">
                多个radial-gradient叠加创建彩色网格
              </p>
            </div>
            
            {/* 只显示glow */}
            <div className="p-6 bg-slate-800 rounded-xl">
              <h4 className="text-white mb-4">Inset Box-Shadow Glow</h4>
              <div 
                style={{
                  width: '200px',
                  height: '150px',
                  borderRadius: '20px',
                  background: '#1e293b',
                  boxShadow: `
                    inset 0 0 0 1px hsl(40deg 80% 80% / 100%),
                    inset 0 0 15px 0 hsl(40deg 80% 80% / 30%),
                    inset 0 0 50px 2px hsl(40deg 80% 80% / 10%),
                    0 0 15px 0 hsl(40deg 80% 80% / 30%),
                    0 0 50px 2px hsl(40deg 80% 80% / 10%)
                  `,
                }}
              />
              <p className="text-xs text-slate-400 mt-3">
                内外双向box-shadow创建发光效果
              </p>
            </div>
            
            {/* 只显示conic mask */}
            <div className="p-6 bg-slate-800 rounded-xl">
              <h4 className="text-white mb-4">Conic Gradient Mask</h4>
              <div 
                style={{
                  width: '200px',
                  height: '150px',
                  borderRadius: '20px',
                  background: 'linear-gradient(90deg, cyan, purple, pink, orange)',
                  WebkitMaskImage: `
                    conic-gradient(
                      from 45deg at center,
                      black 25%,
                      transparent 40%,
                      transparent 60%,
                      black 75%
                    )
                  `,
                }}
              />
              <p className="text-xs text-slate-400 mt-3">
                锥形遮罩只显示鼠标方向的部分
              </p>
            </div>
          </div>
        </Section>
        
        {/* Prompt记录 */}
        <details className="mt-16 p-6 rounded-xl bg-slate-900 text-white border border-slate-700">
          <summary className="cursor-pointer text-lg font-medium mb-4">
            📝 查看生成此页面的Prompt
          </summary>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm text-slate-400 mb-2">Prompt (中文版)</h4>
              <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono">
{`完全复刻CodePen Glowing Edge效果

关键技术（100%按CodePen实现）：
1. Mesh gradient border（多层radial）
2. Glowing edge（inset box-shadow 12层）
3. Conic gradient mask（跟随鼠标）
4. Mix-blend-mode: plus-lighter
5. 鼠标位置跟踪（角度+距离）

完整代码：300+行
严格按照CodePen的CSS和JS逻辑实现

[完整代码见上方]`}
              </pre>
            </div>
            
            <div>
              <h4 className="text-sm text-slate-400 mb-2">Prompt (English Version)</h4>
              <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono">
{`Exact replica of CodePen Glowing Edge

Key techniques (100% CodePen implementation):
1. Mesh gradient border (multi radial)
2. Glowing edge (inset box-shadow 12 layers)
3. Conic gradient mask (follow mouse)
4. Mix-blend-mode: plus-lighter
5. Mouse tracking (angle + distance)

Complete code: 300+ lines
Strictly follow CodePen CSS and JS logic

[Complete code above]`}
              </pre>
            </div>
            
            <div className="text-xs text-slate-400 pt-4 border-t border-slate-700 space-y-1">
              <p>生成日期: 2025-11-02</p>
              <p>Prompt文件: prompt-02.19-codepen-exact-v1.9.md</p>
              <p>探索方向: 100%复刻CodePen Glowing Edge效果</p>
              <p>参考源码: fromCodePen/glowingEdgeCard</p>
              <p>实现方式: 严格按照原始CSS和JS逻辑</p>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}
```

关键要求：
1. 完全按照CodePen的CSS实现
2. 12层box-shadow（6层inset + 6层outer）
3. Mesh gradient用多个radial-gradient
4. Conic gradient mask跟随鼠标
5. Mix-blend-mode: plus-lighter
6. 鼠标跟踪算法和CodePen一样
7. 不要简化，不要创新，要100%一样！

导航位置：
在 App.tsx 中添加为第19个按钮
按钮文字: "19 · v1.9 CodePen复刻"
按钮颜色: orange-400 to orange-500

生成v1.9页面。
```

---

## 🎨 English Prompt

```
Create v1.9 - Exact CodePen Glowing Edge replica

File: src/pages/19-CodePenGlowingEdgeV1.9.tsx

IMPORTANT: Implement EXACTLY as in fromCodePen/glowingEdgeCard!
Don't innovate, replicate 100%!

[All technical details same as Chinese section]

Complete code: 300+ lines following CodePen exactly

Navigation:
Add to App.tsx as button 19
Button text: "19 · v1.9 CodePen复刻"
Button color: orange-400 to orange-500

Generate v1.9 page.
```

---

**100%复刻CodePen ✓ 12层box-shadow ✓ Mesh gradient ✓ 鼠标跟踪 ✓ 完整代码 ✓**

