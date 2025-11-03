# Prompt 02.20: 动态无界 v2.0 融合CodePen发光

**目标**: 将v1.9的CodePen发光效果融合到BorderlessCard的凝结态  
**日期**: 2025-11-02  
**文件**: 20-BorderlessCardV2.0.tsx

---

## 🎯 本次探索的方向

将v1.9实现的CodePen发光边缘效果（鼠标跟随的Box-Shadow、Conic Gradient Mask、Mesh Gradient Border）完整融合到BorderlessCard组件的凝结态。雾气态保持v1.7的边缘模糊效果，凝结态使用v1.9的鼠标跟随发光效果。

---

## 🎨 中文Prompt

```
创建 v2.0 - 动态无界 + CodePen发光边缘

文件: src/pages/20-BorderlessCardV2.0.tsx
组件: src/components/borderless/BorderlessCardV2.tsx

核心要求：
把v1.9的发光边缘效果完整应用到BorderlessCard的Hover态！

===  完整组件实现（融合v1.7 + v1.9）===

```tsx
import { motion, useAnimation } from "motion/react";
import { LucideIcon, FileArchive } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function BorderlessCardV2({
  title = "项目.zip",
  subtitle = "245 个文件",
  icon: Icon = FileArchive,
  iconColor = { r: 167, g: 139, b: 250 },
  onClick,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [pointerAngle, setPointerAngle] = useState(45);
  const [pointerDistance, setPointerDistance] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const edgeControls = useAnimation();
  const { r, g, b } = iconColor;
  
  const params = {
    edgeLineWidth: 7,
    edgeBlurAmount: 12,
    iconBackgroundBlur: 5.0,
    animationSpeed: 1000,
  };
  
  // 鼠标跟踪（完全使用v1.9的算法）
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const dx = x - centerX;
    const dy = y - centerY;
    
    // 角度计算（v1.9算法）
    let angleRadians = 0;
    let angleDegrees = 0;
    if (dx !== 0 || dy !== 0) {
      angleRadians = Math.atan2(dy, dx);
      angleDegrees = angleRadians * (180 / Math.PI) + 90;
      if (angleDegrees < 0) angleDegrees += 360;
    }
    
    // 距离计算（v1.9算法）
    let k_x = Infinity;
    let k_y = Infinity;
    if (dx !== 0) k_x = centerX / Math.abs(dx);
    if (dy !== 0) k_y = centerY / Math.abs(dy);
    const closeness = Math.min(Math.max(1 / Math.min(k_x, k_y), 0), 1);
    
    setPointerAngle(angleDegrees);
    setPointerDistance(closeness);
  };
  
  // 计算发光强度（v1.9算法）
  const glowOpacity = Math.max(0, (pointerDistance - 0.3) / 0.7);
  const colorOpacity = Math.max(0, (pointerDistance - 0.5) / 0.5);
  
  // 边缘线条动画（雾气态）
  useEffect(() => {
    if (isHovered) {
      edgeControls.start({
        borderWidth: '1px',
        filter: 'blur(0px)',
        opacity: 0,  // 消失
        transition: { duration: 1, ease: [0.34, 1.56, 0.64, 1] }
      });
    } else {
      edgeControls.start({
        borderWidth: `${params.edgeLineWidth}px`,
        filter: `blur(${params.edgeBlurAmount}px)`,
        opacity: 1,  // 出现
        transition: { duration: 1, ease: [0.34, 1.56, 0.64, 1] }
      });
    }
  }, [isHovered]);
  
  return (
    <div 
      ref={cardRef}
      className="relative"
      style={{ 
        width: '320px',
        height: '240px',
        padding: 0,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onPointerMove={handlePointerMove}
    >
      {/* 层1: CodePen Mesh Gradient Border（凝结态显示）*/}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '24px',
          border: '1px solid transparent',
          zIndex: 5,
          opacity: isHovered ? colorOpacity : 0,
          transition: 'opacity 0.25s ease-out',
          pointerEvents: 'none',
          // 完全复制v1.9的mesh gradient
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
          // Conic mask跟随鼠标（v1.9算法）
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
      
      {/* 层2: CodePen Glowing Edge（凝结态显示）*/}
      <div
        style={{
          position: 'absolute',
          inset: '-40px',  // 向外扩展
          borderRadius: '24px',
          zIndex: 4,
          opacity: isHovered ? glowOpacity : 0,
          transition: 'opacity 0.25s ease-out',
          pointerEvents: 'none',
          mixBlendMode: 'plus-lighter',
          // Conic mask（v1.9）
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
        {/* Glow的::before - 12层box-shadow（完全复制v1.9）*/}
        <div
          style={{
            position: 'absolute',
            inset: '40px',
            borderRadius: '24px',
            // 完全复制v1.9的12层box-shadow
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
      
      {/* 层3: 蓝色模糊边缘（雾气态）*/}
      <motion.div
        animate={edgeControls}
        initial={{
          borderWidth: `${params.edgeLineWidth}px`,
          filter: `blur(${params.edgeBlurAmount}px)`,
          opacity: 1,
        }}
        style={{
          position: 'absolute',
          inset: 0,
          border: `${params.edgeLineWidth}px solid rgba(6,182,212,0.8)`,
          borderRadius: '24px',
          boxSizing: 'border-box',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />
      
      {/* 层4: 主容器（静态）+ 点击态 */}
      <motion.div
        animate={{
          filter: isPressed ? 'brightness(1.15)' : 'brightness(1.0)',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{
          width: '320px',
          height: '240px',
          padding: '32px',
          boxSizing: 'border-box',
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.65) 35%, rgba(255,255,255,0.3) 65%, rgba(255,255,255,0.1) 85%, rgba(255,255,255,0) 100%)',
          backdropFilter: 'blur(32px)',
          borderRadius: '24px',
          boxShadow: '0 0 15px 13px rgba(6,182,212,0.25)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* 内容：图标+文字（和v1.7一样）*/}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          height: '100%',
          justifyContent: 'center',
        }}>
          {/* 紫色图标背景（双层）*/}
          <div style={{ position: 'relative', width: '56px', height: '56px' }}>
            {/* 紫色背景层 */}
            <motion.div
              animate={{
                filter: isHovered ? 'blur(0px)' : `blur(${params.iconBackgroundBlur}px)`,
                boxShadow: isHovered
                  ? `0 0 20px rgba(${r},${g},${b},0.35)`
                  : `0 0 30px rgba(${r},${g},${b},0.25)`,
              }}
              transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: `rgba(${r},${g},${b},1.0)`,
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
          
          {/* 文字 */}
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
  );
}
```

===  层级结构（5层）===

```
z-index: 5  Mesh Gradient Border（凝结态，跟随鼠标）
z-index: 4  Glowing Edge（凝结态，12层box-shadow）
z-index: 3  蓝色模糊边缘（雾气态）
z-index: 2  主容器 + 内容
z-index: 1  Mesh Gradient Background
```

===  动画时序 ===

雾气态 → 凝结态（Hover）：

```
t=0ms:     鼠标进入
           
t=0-1000ms: 蓝色边缘消失
            borderWidth: 7px → 1px
            filter: blur(12px) → 0
            opacity: 1 → 0

t=300ms:    CodePen效果开始淡入
            Mesh border opacity: 0 → colorOpacity
            Glowing edge opacity: 0 → glowOpacity

t=1000ms:   完全凝结态
            - 蓝色边缘：不可见
            - CodePen边缘：显示，跟随鼠标
            - 鼠标移动实时响应
```

===  完整页面布局 ===

```tsx
export default function BorderlessCardV2_0() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 py-12 px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        <div>
          <h1 className="text-5xl mb-2">Borderless Card v2.0</h1>
          <p className="text-xl text-slate-600">
            动态无界 + CodePen发光边缘融合版
          </p>
          <div className="mt-4 flex gap-3">
            <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm">
              雾气态：边缘模糊
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
              凝结态：CodePen发光边缘
            </span>
          </div>
        </div>
        
        {/* 卡片网格（6个）*/}
        <Section title="Borderless Cards V2.0">
          <div className="grid md:grid-cols-3 gap-8">
            
            <BorderlessCardV2
              title="项目.zip"
              subtitle="245 个文件"
              icon={FileArchive}
              iconColor={{r:167,g:139,b:250}}
            />
            
            <BorderlessCardV2
              title="照片.zip"
              subtitle="512 个文件"
              icon={ImageIcon}
              iconColor={{r:244,g:114,b:182}}
            />
            
            <BorderlessCardV2
              title="备份.rar"
              subtitle="128 个文件"
              icon={ArchiveIcon}
              iconColor={{r:251,g:146,b:60}}
            />
            
            <BorderlessCardV2
              title="代码.tar.gz"
              subtitle="1024 个文件"
              icon={FolderIcon}
              iconColor={{r:6,g:182,b:212}}
            />
            
            <BorderlessCardV2
              title="文档.zip"
              subtitle="89 个文件"
              icon={FileTextIcon}
              iconColor={{r:34,g:197,b:94}}
            />
            
            <BorderlessCardV2
              title="视频.zip"
              subtitle="36 个文件"
              icon={VideoIcon}
              iconColor={{r:239,g:68,b:68}}
            />
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-cyan-50 via-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
            <h3 className="text-lg font-medium text-purple-900 mb-3">
              💡 使用说明
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• <strong>默认态：</strong>蓝色边缘重度模糊（雾气感）</li>
              <li>• <strong>Hover后：</strong>蓝色边缘消失，CodePen彩色发光边缘出现</li>
              <li>• <strong>移动鼠标：</strong>发光边缘跟随鼠标位置，靠近边缘时更亮</li>
              <li>• <strong>点击：</strong>整体变亮15%（200ms）</li>
            </ul>
          </div>
        </Section>
        
        {/* 技术说明 */}
        <Section title="🔬 技术实现">
          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="p-6 bg-white rounded-xl border border-slate-200">
              <h4 className="font-medium mb-3">雾气态（v1.7）</h4>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>• 蓝色边缘：7px, blur(12px)</li>
                <li>• 边缘线条独立层</li>
                <li>• 1秒spring动画</li>
              </ul>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
              <h4 className="font-medium mb-3">凝结态（v1.9 CodePen）</h4>
              <ul className="text-sm text-purple-700 space-y-2">
                <li>• Mesh gradient border（7层radial）</li>
                <li>• Glowing edge（12层box-shadow）</li>
                <li>• Conic mask跟随鼠标角度</li>
                <li>• Opacity随鼠标距离变化</li>
                <li>• Mix-blend-mode: plus-lighter</li>
              </ul>
            </div>
          </div>
        </Section>
        
        {/* Prompt记录 */}
        <details className="mt-16 p-6 rounded-xl bg-slate-900 text-white">
          <summary className="cursor-pointer text-lg font-medium mb-4">
            📝 查看生成此页面的Prompt
          </summary>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm text-slate-400 mb-2">Prompt (中文版)</h4>
              <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono">
{`创建 v2.0 - 动态无界 + CodePen发光融合

融合两种效果：
- v1.7: 雾气态边缘模糊
- v1.9: 凝结态CodePen发光边缘

完全复制v1.9的实现：
1. Mesh gradient border（7层radial + conic mask）
2. Glowing edge（12层box-shadow + mask）
3. 鼠标跟踪（角度+距离）
4. Mix-blend-mode
5. 动态opacity

层级：5层
动画：雾气消失 → CodePen效果淡入

[完整代码见上方 300+ 行]`}
              </pre>
            </div>
            
            <div>
              <h4 className="text-sm text-slate-400 mb-2">Prompt (English Version)</h4>
              <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono">
{`Create v2.0 - Dynamic Borderless + CodePen glow fusion

Combine two effects:
- v1.7: Mist state edge blur
- v1.9: Condensed state CodePen glowing edge

Exact copy of v1.9 implementation:
1. Mesh gradient border (7 radials + conic mask)
2. Glowing edge (12 box-shadows + mask)
3. Mouse tracking (angle + distance)
4. Mix-blend-mode
5. Dynamic opacity

Layers: 5
Animation: Mist fades → CodePen effect fades in

[Complete code above 300+ lines]`}
              </pre>
            </div>
            
            <div className="text-xs text-slate-400 pt-4 border-t border-slate-700 space-y-1">
              <p>生成日期: 2025-11-02</p>
              <p>Prompt文件: prompt-02.20-borderless-with-codepen-glow-v2.0.md</p>
              <p>探索方向: 融合雾气态和CodePen发光边缘</p>
              <p>技术来源: v1.7边缘模糊 + v1.9 CodePen复刻</p>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}
```

关键要求：
1. 完全使用v1.9的CodePen实现代码
2. 不要修改v1.9的算法和参数
3. 只是把这些层加入到BorderlessCard中
4. 雾气态消失后，CodePen效果淡入
5. 鼠标跟踪、mask、box-shadow全部和v1.9一样

导航位置：
在 App.tsx 中添加为第20个按钮
按钮文字: "20 · v2.0 融合发光"
按钮颜色: violet-500 to-violet-600

更新文件：
1. 页面：src/pages/20-BorderlessCardV2.0.tsx
2. 组件：src/components/borderless/BorderlessCardV2.tsx
3. 同时更新：src/components/borderless/BorderlessCardWithGlowingEdge.tsx（应用相同效果）

生成v2.0页面和组件。
```

---

## 🎨 English Prompt

```
Create v2.0 - Fusion of Dynamic Borderless + CodePen Glow

File: src/pages/20-BorderlessCardV2.0.tsx
Component: src/components/borderless/BorderlessCardV2.tsx

Merge v1.7 edge blur + v1.9 CodePen glowing edge into one component!

[Complete implementation with all CodePen code from v1.9]

Navigation:
Add to App.tsx as button 20
Button text: "20 · v2.0 融合发光"
Button color: violet-500 to violet-600

Generate v2.0 page and component.
```

---

**v1.7雾气 + v1.9发光 = v2.0完美融合 ✓ 300+行代码 ✓ 5层结构 ✓**

