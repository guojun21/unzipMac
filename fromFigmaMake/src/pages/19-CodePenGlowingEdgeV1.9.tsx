import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { CodePenGlowingEdge } from "../components/borderless/CodePenGlowingEdge";

interface CodePenGlowingEdgeV1_9Props {
  onBack?: () => void;
}

export default function CodePenGlowingEdgeV1_9({ onBack }: CodePenGlowingEdgeV1_9Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="mb-2">
                <h1 className="text-5xl text-white">CodePen Glowing Edge v1.9</h1>
              </div>
              <p className="text-xl text-slate-300">
                完全复刻 CodePen 效果 · 100% 原始实现
              </p>
              <p className="text-sm text-slate-400 mt-2">
                Exact CodePen Replica · 100% Original Implementation
              </p>
              
              {/* Feature badges */}
              <div className="mt-4 flex gap-3 flex-wrap text-sm">
                <span className="px-3 py-1 bg-orange-900/50 text-orange-300 rounded-full font-medium border border-orange-700">
                  ✓ 12层 Box-Shadow
                </span>
                <span className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full font-medium border border-purple-700">
                  ✓ Mesh Gradient
                </span>
                <span className="px-3 py-1 bg-cyan-900/50 text-cyan-300 rounded-full font-medium border border-cyan-700">
                  ✓ Conic Mask
                </span>
                <span className="px-3 py-1 bg-pink-900/50 text-pink-300 rounded-full font-medium border border-pink-700">
                  ✓ Plus-Lighter
                </span>
              </div>
            </div>
            {onBack && (
              <motion.button
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-slate-600 to-slate-700 text-white flex items-center gap-2 border border-slate-500"
                style={{
                  boxShadow: '0 0 20px rgba(100,116,139,0.3), 0 0 40px rgba(100,116,139,0.15)'
                }}
                whileHover={{
                  boxShadow: '0 0 30px rgba(100,116,139,0.4), 0 0 60px rgba(100,116,139,0.2)',
                  y: -2
                }}
                whileTap={{ scale: 0.98 }}
                onClick={onBack}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>返回</span>
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Section 1: Main Effect Demo */}
        <Section title="✨ CodePen 发光边缘效果" subtitle="移动鼠标观察边缘发光变化">
          <div className="flex justify-center py-12">
            <CodePenGlowingEdge>
              <div className="text-center text-white">
                <h2 className="text-3xl font-medium mb-4">
                  Colored, Glowing Edges
                </h2>
                <p className="text-slate-300 text-base leading-relaxed mb-4">
                  This is an exact replica of the CodePen glowing edge card effect.
                  Move your mouse around to see the colored glow follow your pointer.
                </p>
                <p className="text-slate-400 text-sm">
                  移动鼠标到卡片边缘附近，观察发光效果如何跟随
                </p>
              </div>
            </CodePenGlowingEdge>
          </div>
          
          <div className="mt-8 p-6 bg-slate-800 rounded-xl border border-slate-700">
            <h3 className="text-lg text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              <span>100% CodePen 原始技术实现</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-orange-400">•</span>
                  <span><strong>12层 Box-Shadow:</strong> 6层 inset + 6层 outer 创建内外双向发光</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span><strong>Mesh Gradient Border:</strong> 8个 radial-gradient 叠加创建彩色网格</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span>
                  <span><strong>Conic Gradient Mask:</strong> 锥形遮罩跟随鼠标角度</span>
                </li>
              </ul>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-pink-400">•</span>
                  <span><strong>Mix-Blend-Mode:</strong> plus-lighter 增强发光效果</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span><strong>Mouse Tracking:</strong> 实时计算角度和到边缘距离</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  <span><strong>Complex Mask-Composite:</strong> 创建 squircle 形状</span>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Section 2: Technical Breakdown */}
        <Section title="🔬 技术分解展示" subtitle="各个效果层的独立展示">
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Mesh Gradient Border Only */}
            <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
              <h4 className="text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-purple-600 text-white text-xs flex items-center justify-center">1</span>
                <span>Mesh Gradient Border</span>
              </h4>
              <div className="flex justify-center mb-4">
                <div 
                  style={{
                    width: '200px',
                    height: '150px',
                    borderRadius: '20px',
                    border: '2px solid transparent',
                    background: `
                      radial-gradient(at 80% 55%, hsla(268,100%,76%,1) 0px, transparent 50%),
                      radial-gradient(at 69% 34%, hsla(349,100%,74%,1) 0px, transparent 50%),
                      radial-gradient(at 8% 6%, hsla(136,100%,78%,1) 0px, transparent 50%),
                      radial-gradient(at 41% 38%, hsla(192,100%,64%,1) 0px, transparent 50%),
                      #c299ff
                    `,
                  }}
                />
              </div>
              <p className="text-xs text-slate-400">
                8个 radial-gradient 在不同位置叠加，创建彩色网格效果
              </p>
              <div className="mt-3 p-2 bg-slate-900 rounded text-xs font-mono text-purple-400">
                radial-gradient(at x% y%, color, transparent)
              </div>
            </div>
            
            {/* Inset Box-Shadow Glow */}
            <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
              <h4 className="text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-orange-600 text-white text-xs flex items-center justify-center">2</span>
                <span>12层 Box-Shadow 发光</span>
              </h4>
              <div className="flex justify-center mb-4">
                <div 
                  style={{
                    width: '200px',
                    height: '150px',
                    borderRadius: '20px',
                    background: 'hsl(260, 25%, 15%)',
                    boxShadow: `
                      inset 0 0 0 1px hsl(40deg 80% 80% / 100%),
                      inset 0 0 15px 0 hsl(40deg 80% 80% / 30%),
                      inset 0 0 50px 2px hsl(40deg 80% 80% / 10%),
                      0 0 1px 0 hsl(40deg 80% 80% / 60%),
                      0 0 15px 0 hsl(40deg 80% 80% / 30%),
                      0 0 50px 2px hsl(40deg 80% 80% / 10%)
                    `,
                  }}
                />
              </div>
              <p className="text-xs text-slate-400">
                6层 inset（内发光）+ 6层 outer（外发光）= 12层叠加
              </p>
              <div className="mt-3 p-2 bg-slate-900 rounded text-xs font-mono text-orange-400">
                inset 0 0 Xpx 0 hsl(...) + 0 0 Xpx 0 hsl(...)
              </div>
            </div>
            
            {/* Conic Gradient Mask */}
            <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
              <h4 className="text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-cyan-600 text-white text-xs flex items-center justify-center">3</span>
                <span>Conic Gradient Mask</span>
              </h4>
              <div className="flex justify-center mb-4">
                <div 
                  style={{
                    width: '200px',
                    height: '150px',
                    borderRadius: '20px',
                    background: 'linear-gradient(90deg, #c299ff, #ff6b9d, #ffd93d, #6bcf7f)',
                    WebkitMaskImage: `
                      conic-gradient(
                        from 45deg at center,
                        black 2.5%,
                        transparent 10%,
                        transparent 90%,
                        black 97.5%
                      )
                    `,
                    maskImage: `
                      conic-gradient(
                        from 45deg at center,
                        black 2.5%,
                        transparent 10%,
                        transparent 90%,
                        black 97.5%
                      )
                    `,
                  }}
                />
              </div>
              <p className="text-xs text-slate-400">
                锥形遮罩只显示鼠标方向的窄条，创建"光束"效果
              </p>
              <div className="mt-3 p-2 bg-slate-900 rounded text-xs font-mono text-cyan-400">
                conic-gradient(from angle, black, transparent)
              </div>
            </div>
          </div>
        </Section>

        {/* Section 3: Implementation Details */}
        <Section title="💻 实现细节" subtitle="完全按照 CodePen 源码">
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Layer Structure */}
            <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
              <h4 className="text-white mb-4">层级结构（4层）</h4>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-slate-900 rounded-lg border-l-4 border-purple-500">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-purple-400 font-medium">Layer 1: Mesh Border</span>
                    <code className="text-xs text-slate-500">z-index: -1</code>
                  </div>
                  <p className="text-xs text-slate-400">
                    ::before 伪元素，8个 radial-gradient，conic mask
                  </p>
                </div>
                
                <div className="p-3 bg-slate-900 rounded-lg border-l-4 border-orange-500">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-orange-400 font-medium">Layer 2: Glowing Edge</span>
                    <code className="text-xs text-slate-500">z-index: 1</code>
                  </div>
                  <p className="text-xs text-slate-400">
                    .glow 元素，inset: -40px，12层 box-shadow
                  </p>
                </div>
                
                <div className="p-3 bg-slate-900 rounded-lg border-l-4 border-cyan-500">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-cyan-400 font-medium">Layer 3: Mesh Background</span>
                    <code className="text-xs text-slate-500">z-index: -1</code>
                  </div>
                  <p className="text-xs text-slate-400">
                    ::after 伪元素，soft-light 混合，复杂 mask-composite
                  </p>
                </div>
                
                <div className="p-3 bg-slate-900 rounded-lg border-l-4 border-green-500">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-green-400 font-medium">Layer 4: Content</span>
                    <code className="text-xs text-slate-500">z-index: 2</code>
                  </div>
                  <p className="text-xs text-slate-400">
                    内容层，padding: 2em，居中布局
                  </p>
                </div>
              </div>
            </div>
            
            {/* Key Formulas */}
            <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
              <h4 className="text-white mb-4">关键算法（CodePen 原版）</h4>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-slate-300 font-medium mb-2">1. 鼠标角度计算</p>
                  <div className="p-3 bg-slate-900 rounded font-mono text-xs text-cyan-400">
                    <div>angleRad = Math.atan2(dy, dx)</div>
                    <div>angleDeg = angleRad * 180/π + 90</div>
                    <div>{'if (angleDeg < 0) angleDeg += 360'}</div>
                  </div>
                </div>
                
                <div>
                  <p className="text-slate-300 font-medium mb-2">2. 到边缘距离</p>
                  <div className="p-3 bg-slate-900 rounded font-mono text-xs text-purple-400">
                    <div>{'k_x = centerX / |dx|'}</div>
                    <div>{'k_y = centerY / |dy|'}</div>
                    <div>{'closeness = 1 / min(k_x, k_y)'}</div>
                  </div>
                </div>
                
                <div>
                  <p className="text-slate-300 font-medium mb-2">3. 透明度计算</p>
                  <div className="p-3 bg-slate-900 rounded font-mono text-xs text-orange-400">
                    <div>glowOpacity = (distance - 0.3) / 0.7</div>
                    <div>colorOpacity = (distance - 0.5) / 0.5</div>
                  </div>
                </div>
                
                <div>
                  <p className="text-slate-300 font-medium mb-2">4. Mix-Blend-Mode</p>
                  <div className="p-3 bg-slate-900 rounded font-mono text-xs text-pink-400">
                    <div>Glow: plus-lighter</div>
                    <div>Background: soft-light</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Section 4: Code Snippet */}
        <Section title="📝 核心代码片段" subtitle="12层 Box-Shadow 完整实现">
          <div className="p-6 bg-slate-900 rounded-xl border border-slate-700">
            <h4 className="text-white mb-4 text-sm">Box-Shadow 完整代码（CodePen 原版）</h4>
            <pre className="text-xs font-mono overflow-auto whitespace-pre text-orange-400">
{`boxShadow: \`
  /* ===== 6层 Inset（内发光）===== */
  inset 0 0 0 1px hsl(40deg 80% 80% / 100%),     /* 1px 实线边缘 */
  inset 0 0 1px 0 hsl(40deg 80% 80% / 60%),      /* 1px 模糊 */
  inset 0 0 3px 0 hsl(40deg 80% 80% / 50%),      /* 3px 模糊 */
  inset 0 0 6px 0 hsl(40deg 80% 80% / 40%),      /* 6px 模糊 */
  inset 0 0 15px 0 hsl(40deg 80% 80% / 30%),     /* 15px 模糊 */
  inset 0 0 25px 2px hsl(40deg 80% 80% / 20%),   /* 25px 模糊 + 2px spread */
  inset 0 0 50px 2px hsl(40deg 80% 80% / 10%),   /* 50px 模糊 + 2px spread */
  
  /* ===== 6层 Outer（外发光）===== */
  0 0 1px 0 hsl(40deg 80% 80% / 60%),            /* 1px 模糊 */
  0 0 3px 0 hsl(40deg 80% 80% / 50%),            /* 3px 模糊 */
  0 0 6px 0 hsl(40deg 80% 80% / 40%),            /* 6px 模糊 */
  0 0 15px 0 hsl(40deg 80% 80% / 30%),           /* 15px 模糊 */
  0 0 25px 2px hsl(40deg 80% 80% / 20%),         /* 25px 模糊 + 2px spread */
  0 0 50px 2px hsl(40deg 80% 80% / 10%)          /* 50px 模糊 + 2px spread */
\``}
            </pre>
          </div>
          
          <div className="mt-6 p-6 bg-slate-800 rounded-xl border border-slate-700">
            <h4 className="text-white mb-3 text-sm">为什么需要12层？</h4>
            <div className="grid md:grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="p-3 bg-slate-900 rounded">
                <p className="text-cyan-400 font-medium mb-2">渐进过渡</p>
                <p>从清晰的1px边缘逐渐过渡到50px的柔和光晕，创造平滑的发光效果</p>
              </div>
              <div className="p-3 bg-slate-900 rounded">
                <p className="text-purple-400 font-medium mb-2">双向发光</p>
                <p>Inset 向内发光 + Outer 向外发光，让边缘既有内光又有外光</p>
              </div>
              <div className="p-3 bg-slate-900 rounded">
                <p className="text-orange-400 font-medium mb-2">丰富层次</p>
                <p>不同透明度和模糊半径叠加，创造丰富的深度和立体感</p>
              </div>
            </div>
          </div>
        </Section>

        {/* Prompt记录 */}
        <details className="mt-16 p-6 rounded-xl bg-slate-900 text-white border border-slate-700">
          <summary className="cursor-pointer text-lg font-medium mb-4">
            📝 查看生成此页面的 Prompt
          </summary>
          
          <div className="space-y-6">
            {/* 中文版 */}
            <div>
              <h4 className="text-sm text-slate-400 mb-2">Prompt (中文版)</h4>
              <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono">
{`完全复刻 CodePen Glowing Edge 效果

文件: src/pages/19-CodePenGlowingEdgeV1.9.tsx
组件: src/components/borderless/CodePenGlowingEdge.tsx

重要：100% 按照 CodePen 原始实现！
不要创新，要完全还原！

核心技术（严格按 CodePen）：
1. Mesh gradient border - 8个 radial-gradient 叠加
2. Glowing edge - 12层 box-shadow（6 inset + 6 outer）
3. Conic gradient mask - 跟随鼠标角度
4. Mix-blend-mode: plus-lighter - 增强发光
5. 鼠标位置跟踪 - CodePen 算法

层级结构：
- Layer 1: Mesh Border (::before, z-index: -1)
- Layer 2: Glowing Edge (.glow, z-index: 1, inset: -40px)
- Layer 3: Mesh Background (::after, z-index: -1)
- Layer 4: Content (z-index: 2)

关键算法：
- 角度：Math.atan2(dy, dx) * 180/π + 90
- 距离：1 / min(centerX/|dx|, centerY/|dy|)
- 透明度：(distance - 0.3) / 0.7

完整代码：300+ 行
严格按照 CodePen 的 CSS 和 JS 逻辑实现

组件文件:
- CodePenGlowingEdge.tsx (新建，完全复刻)

导航: 第19个按钮，orange-400 to orange-500`}
              </pre>
            </div>
            
            {/* 英文版 */}
            <div>
              <h4 className="text-sm text-slate-400 mb-2">Prompt (English Version)</h4>
              <pre className="text-xs bg-slate-800 p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono">
{`Exact replica of CodePen Glowing Edge

File: src/pages/19-CodePenGlowingEdgeV1.9.tsx
Component: src/components/borderless/CodePenGlowingEdge.tsx

IMPORTANT: 100% following CodePen original implementation!
No innovations, exact replication!

Core technologies (strict CodePen):
1. Mesh gradient border - 8 radial-gradient layers
2. Glowing edge - 12 box-shadow layers (6 inset + 6 outer)
3. Conic gradient mask - following mouse angle
4. Mix-blend-mode: plus-lighter - enhance glow
5. Mouse position tracking - CodePen algorithm

Layer structure:
- Layer 1: Mesh Border (::before, z-index: -1)
- Layer 2: Glowing Edge (.glow, z-index: 1, inset: -40px)
- Layer 3: Mesh Background (::after, z-index: -1)
- Layer 4: Content (z-index: 2)

Key algorithms:
- Angle: Math.atan2(dy, dx) * 180/π + 90
- Distance: 1 / min(centerX/|dx|, centerY/|dy|)
- Opacity: (distance - 0.3) / 0.7

Complete code: 300+ lines
Strictly following CodePen CSS and JS logic

Component files:
- CodePenGlowingEdge.tsx (new, exact replica)

Navigation: Button 19, orange-400 to orange-500`}
              </pre>
            </div>
            
            {/* 元数据 */}
            <div className="text-xs text-slate-400 pt-4 border-t border-slate-700 space-y-1">
              <p>生成日期: 2025-11-02</p>
              <p>Prompt文件: prompt-02.19-codepen-exact-v1.9.md</p>
              <p>探索方向: 100% 复刻 CodePen Glowing Edge 效果</p>
              <p>参考源码: fromCodePen/glowingEdgeCard</p>
              <p>实现方式: 严格按照原始 CSS 和 JS 逻辑</p>
              <p>核心技术: 12层 box-shadow, 8层 radial-gradient, conic mask, mix-blend-mode</p>
              <p>新组件: CodePenGlowingEdge（完全复刻版）</p>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}

// Helper Components
function Section({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-3xl text-white mb-1">{title}</h2>
        <p className="text-slate-400">{subtitle}</p>
      </div>
      {children}
    </motion.section>
  );
}
