import { motion } from "motion/react";
import { DynamicBorderlessCardV5, DynamicBorderlessCardV5Frozen } from "../components/borderless/DynamicBorderlessCardV5";
import { ArrowLeft, FileArchive, Image as ImageIcon, Archive, Folder, CheckCircle, XCircle, ArrowRight, ArrowDown } from "lucide-react";
import { useState } from "react";

interface DynamicBorderlessDemoV5Props {
  onBack?: () => void;
}

export default function DynamicBorderlessDemoV5({ onBack }: DynamicBorderlessDemoV5Props) {
  const [slowMotion, setSlowMotion] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50/30 py-12 px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-5xl">03 · Dynamic Borderless v0.5</h1>
                <span className="px-4 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-medium border border-orange-300">
                  ⚠️ HAS ISSUES
                </span>
              </div>
              <p className="text-xl text-slate-600">问题版本 · See v0.6 for fixes</p>
              <p className="text-lg text-orange-600 mt-2">此版本有3个关键问题 - 请查看 v0.6</p>
            </div>
            {onBack && (
              <motion.button
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-slate-500 to-slate-600 text-white flex items-center gap-2"
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
          {/* Warning Banner */}
          <div className="mt-6 p-6 rounded-xl bg-orange-50 border-2 border-orange-200">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="text-lg font-medium text-orange-900 mb-2">This version has 3 critical issues</h3>
                <ul className="space-y-1 text-sm text-orange-700">
                  <li>• ❌ Opacity changes between states (should stay fixed)</li>
                  <li>• ❌ SVG icon affected by parent blur (should be independent)</li>
                  <li>• ❌ Backdrop blur too weak (should be stronger)</li>
                </ul>
                <p className="mt-3 text-sm text-orange-800 font-medium">
                  → All issues fixed in v0.6. Please use v0.6 for production.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Single Card with Labels */}
        <Section title="Layer Anatomy" subtitle="层级解剖">
          <div className="p-16 bg-slate-50 rounded-3xl relative">
            <div className="flex justify-center">
              <div className="relative">
                <DynamicBorderlessCardV5 
                  title="项目.zip"
                  subtitle="245 个文件"
                  icon={FileArchive}
                  iconColor={{ r: 167, g: 139, b: 250 }}
                />
                
                {/* Labels with arrows */}
                {/* Outer edge label */}
                <div className="absolute -left-48 top-8 text-right" style={{ width: '160px' }}>
                  <div className="flex items-center justify-end gap-2">
                    <div>
                      <p className="text-sm font-medium text-slate-900">重度羽化</p>
                      <p className="text-xs text-slate-500">Hover后清晰</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-cyan-600" />
                  </div>
                </div>

                {/* Icon background label */}
                <div className="absolute -right-48 top-16" style={{ width: '160px' }}>
                  <div className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium text-slate-900">轻度羽化</p>
                      <p className="text-xs text-slate-500">Hover后实心</p>
                    </div>
                  </div>
                </div>

                {/* Icon label */}
                <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-center" style={{ width: '140px' }}>
                  <div className="flex flex-col items-center gap-1">
                    <ArrowDown className="w-4 h-4 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-slate-900">永远清晰</p>
                      <p className="text-xs text-slate-500">图标 + 文字</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-32 flex justify-center gap-8">
              <LegendItem color="cyan" label="Layer 1: 外层容器" />
              <LegendItem color="purple" label="Layer 2: 图标背景" />
              <LegendItem color="green" label="Layer 3: 清晰内容" />
            </div>
          </div>
        </Section>

        {/* State Comparison Side by Side */}
        <Section title="State Comparison" subtitle="状态对比">
          <div className="grid md:grid-cols-2 gap-16 p-16 bg-slate-50 rounded-3xl">
            {/* Default State */}
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-xl mb-2">DEFAULT STATE · 雾气态</h3>
                <p className="text-sm text-slate-500">Mist with visible shapes</p>
              </div>
              <div className="flex justify-center">
                <DynamicBorderlessCardV5Frozen
                  state="default"
                  title="项目.zip"
                  subtitle="245 个文件"
                  icon={FileArchive}
                  iconColor={{ r: 167, g: 139, b: 250 }}
                />
              </div>
              <div className="space-y-2 text-sm">
                <StateSpec label="外层容器" value="Heavy feather (blur 20px)" />
                <StateSpec label="图标背景" value="Light feather (blur 1px)" highlight />
                <StateSpec label="图标形状" value="可见 - 能看出圆角矩形" />
                <StateSpec label="SVG + 文字" value="Crystal clear (blur 0)" />
              </div>
            </div>

            {/* Hover State */}
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-xl mb-2">HOVER STATE · 凝结态</h3>
                <p className="text-sm text-cyan-600 font-medium">Solid and clear</p>
              </div>
              <div className="flex justify-center">
                <DynamicBorderlessCardV5Frozen
                  state="hover"
                  title="项目.zip"
                  subtitle="245 个文件"
                  icon={FileArchive}
                  iconColor={{ r: 167, g: 139, b: 250 }}
                />
              </div>
              <div className="space-y-2 text-sm">
                <StateSpec label="外层容器" value="Conservative clear (blur 10px)" />
                <StateSpec label="图标背景" value="SOLID (blur 0, opacity 95%)" highlight />
                <StateSpec label="图标形状" value="清晰 - 实心紫色圆角矩形" />
                <StateSpec label="SVG + 文字" value="Crystal clear (no change)" />
              </div>
            </div>
          </div>

          <div className="mt-8 text-center space-y-2">
            <p className="text-slate-600">💡 Key difference: Icon background goes from <span className="text-purple-600 font-medium">light feather (shape visible)</span> to <span className="text-cyan-600 font-medium">solid block</span></p>
            <p className="text-slate-600">✨ SVG icon and text remain sharp throughout the entire transformation</p>
          </div>
        </Section>

        {/* Interactive Test Area */}
        <Section title="Interactive Test Area" subtitle="交互测试区">
          <div className="space-y-8">
            {/* Slow Motion Toggle */}
            <div className="p-8 rounded-2xl bg-white/50 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg mb-2">慢动作回放</h3>
                  <p className="text-sm text-slate-600">
                    {slowMotion ? '播放速度: 1000ms (2.5× slower)' : '播放速度: 400ms (normal)'}
                  </p>
                </div>
                <motion.button
                  onClick={() => setSlowMotion(!slowMotion)}
                  className={`
                    px-6 py-3 rounded-xl font-medium
                    ${slowMotion 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {slowMotion ? '✓ 已开启' : '慢动作'}
                </motion.button>
              </div>
            </div>

            {/* Large Test Card */}
            <div className="p-16 bg-slate-50 rounded-3xl">
              <div className="flex flex-col items-center gap-6">
                <div className="text-center mb-4">
                  <h3 className="text-xl mb-2">Hover to Test Transformation</h3>
                  <p className="text-sm text-slate-500">
                    {slowMotion ? 'Transition in slow motion (1000ms)' : 'Normal speed transition (400ms)'}
                  </p>
                </div>
                <DynamicBorderlessCardV5 
                  title="项目.zip"
                  subtitle="245 个文件"
                  icon={FileArchive}
                  iconColor={{ r: 167, g: 139, b: 250 }}
                  slowMotion={slowMotion}
                />
              </div>
            </div>
          </div>
        </Section>

        {/* Color Variations Grid */}
        <Section title="Color Variations" subtitle="色彩变化 · 6 Colors">
          <div className="grid md:grid-cols-3 gap-12 p-12 bg-slate-50 rounded-3xl">
            <DynamicBorderlessCardV5
              title="项目.zip"
              subtitle="245 个文件"
              icon={FileArchive}
              iconColor={{ r: 167, g: 139, b: 250 }} // purple
            />
            <DynamicBorderlessCardV5
              title="照片.zip"
              subtitle="512 个文件"
              icon={ImageIcon}
              iconColor={{ r: 244, g: 114, b: 182 }} // pink
            />
            <DynamicBorderlessCardV5
              title="备份.rar"
              subtitle="128 个文件"
              icon={Archive}
              iconColor={{ r: 251, g: 146, b: 60 }} // orange
            />
            <DynamicBorderlessCardV5
              title="代码.tar.gz"
              subtitle="1024 个文件"
              icon={Folder}
              iconColor={{ r: 6, g: 182, b: 212 }} // cyan
            />
            <DynamicBorderlessCardV5
              title="成功"
              subtitle="操作完成"
              icon={CheckCircle}
              iconColor={{ r: 34, g: 197, b: 94 }} // green
            />
            <DynamicBorderlessCardV5
              title="错误"
              subtitle="操作失败"
              icon={XCircle}
              iconColor={{ r: 239, g: 68, b: 68 }} // red
            />
          </div>
        </Section>

        {/* Technical Specifications */}
        <Section title="Technical Specifications" subtitle="技术规格">
          <div className="grid md:grid-cols-3 gap-6">
            <SpecCard
              title="Layer 1: Outer Container"
              subtitle="外层容器"
              color="cyan"
              defaultSpecs={[
                "Heavy feather radial gradient",
                "Fade starts at 35%",
                "backdrop-filter: blur(20px)",
                "Glow: 60px + 100px",
                "Border radius: 24px",
                "Size: 320×240px + feather"
              ]}
              hoverSpecs={[
                "Conservative clear gradient",
                "Fade starts at 70%",
                "backdrop-filter: blur(10px)",
                "Focused glow + shadow",
                "Border radius: 16px",
                "translateY(-4px)"
              ]}
            />
            <SpecCard
              title="Layer 2: Icon Background"
              subtitle="图标背景 (KEY!)"
              color="purple"
              defaultSpecs={[
                "rgba(color, 0.25) - semi-transparent",
                "filter: blur(1px) - LIGHT!",
                "Shape visible (rounded rect)",
                "Outer glow: 24px",
                "Size: 56×56px",
                "Border radius: 14px"
              ]}
              hoverSpecs={[
                "rgba(color, 0.95) - SOLID!",
                "filter: blur(0px) - NO blur",
                "Crisp edges, clear form",
                "Gentle glow: 16px",
                "Size: 56×56px (same)",
                "Border radius: 14px (same)"
              ]}
            />
            <SpecCard
              title="Layer 3: Sharp Content"
              subtitle="清晰内容"
              color="green"
              defaultSpecs={[
                "SVG icon: 28×28px",
                "filter: blur(0) !important",
                "Color: #ffffff",
                "Text: Inter font, blur(0)",
                "Always on top (z-index: 10)",
                "NEVER changes"
              ]}
              hoverSpecs={[
                "SVG icon: NO CHANGE",
                "filter: blur(0) - SAME",
                "Color: #ffffff - SAME",
                "Text: SAME",
                "Position: SAME",
                "These are CONSTANTS!"
              ]}
            />
          </div>
        </Section>

        {/* Critical Rules */}
        <Section title="Critical Implementation Rules" subtitle="关键实现规则">
          <div className="grid md:grid-cols-2 gap-6">
            <RuleCard
              title="✓ CORRECT Implementation"
              rules={[
                "Icon background default: rgba(color, 0.25) + blur(1px)",
                "Icon background hover: rgba(color, 0.95) + blur(0)",
                "SVG icon: filter: blur(0) in BOTH states",
                "Text: filter: blur(0) in BOTH states",
                "Single hover trigger for entire card",
                "All layers animate together (400ms spring)",
                "Rounded rectangle shape visible in default state"
              ]}
              positive
            />
            <RuleCard
              title="✗ INCORRECT Implementation"
              rules={[
                "Icon background too blurred (shape becomes blob)",
                "Icon background stays transparent on hover",
                "SVG icon changes blur on hover",
                "Text becomes blurry at any point",
                "Separate hover zones for different layers",
                "Linear transitions instead of spring",
                "Icon background not recognizable in default"
              ]}
            />
          </div>
        </Section>

        {/* Visual Goal Summary */}
        <Section title="Visual Goal Summary" subtitle="视觉目标总结">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-cyan-50">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <GoalCard
                emoji="🌫️"
                title="Default State"
                description="Mist with visible shapes"
                details="Purple rounded rectangle with soft edges, but you can still tell it's a rectangle (NOT a blob)"
              />
              <GoalCard
                emoji="💧"
                title="Transition"
                description="Mist condensing to droplet"
                details="Smooth transformation over 400ms with spring physics, feels organic and fluid"
              />
              <GoalCard
                emoji="💎"
                title="Hover State"
                description="Solid and clear"
                details="Solid purple block with crisp edges, like Conservative version, with focused glow"
              />
            </div>
          </div>
        </Section>
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
        <h2 className="text-3xl mb-1">{title}</h2>
        <p className="text-slate-500">{subtitle}</p>
      </div>
      {children}
    </motion.section>
  );
}

function LegendItem({ color, label }: { color: 'cyan' | 'purple' | 'green'; label: string }) {
  const colorMap = {
    cyan: 'bg-cyan-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500'
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${colorMap[color]}`} />
      <span className="text-sm text-slate-600">{label}</span>
    </div>
  );
}

function StateSpec({ 
  label, 
  value,
  highlight 
}: { 
  label: string; 
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className={`
      p-3 rounded-lg
      ${highlight ? 'bg-purple-50 border border-purple-200' : 'bg-slate-50'}
    `}>
      <div className="flex justify-between items-start gap-4">
        <span className="text-slate-600 font-medium">{label}</span>
        <span className={`text-right ${highlight ? 'text-purple-700 font-medium' : 'text-slate-500'}`}>
          {value}
        </span>
      </div>
    </div>
  );
}

function SpecCard({ 
  title, 
  subtitle,
  color,
  defaultSpecs,
  hoverSpecs
}: { 
  title: string;
  subtitle: string;
  color: 'cyan' | 'purple' | 'green';
  defaultSpecs: string[];
  hoverSpecs: string[];
}) {
  const colorMap = {
    cyan: { bg: 'rgba(6,182,212,0.08)', text: 'text-cyan-700', border: 'rgba(6,182,212,0.2)' },
    purple: { bg: 'rgba(167,139,250,0.08)', text: 'text-purple-700', border: 'rgba(167,139,250,0.2)' },
    green: { bg: 'rgba(34,197,94,0.08)', text: 'text-green-700', border: 'rgba(34,197,94,0.2)' }
  };

  const config = colorMap[color];

  return (
    <div
      className="p-6 rounded-xl backdrop-blur-lg"
      style={{
        background: `radial-gradient(ellipse at center, ${config.bg} 0%, transparent 100%)`,
        boxShadow: `0 0 0 1px ${config.border}, 0 8px 24px rgba(0,0,0,0.08)`
      }}
    >
      <h3 className={`text-lg font-medium mb-1 ${config.text}`}>{title}</h3>
      <p className="text-xs text-slate-500 mb-4">{subtitle}</p>
      
      <div className="space-y-4">
        <div>
          <p className="text-xs font-medium text-slate-600 mb-2">DEFAULT STATE:</p>
          <ul className="space-y-1">
            {defaultSpecs.map((spec, i) => (
              <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                <span className="text-slate-400">•</span>
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <p className="text-xs font-medium text-slate-600 mb-2">HOVER STATE:</p>
          <ul className="space-y-1">
            {hoverSpecs.map((spec, i) => (
              <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                <span className="text-slate-400">•</span>
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function RuleCard({ 
  title, 
  rules,
  positive 
}: { 
  title: string;
  rules: string[];
  positive?: boolean;
}) {
  return (
    <div
      className="p-6 rounded-xl backdrop-blur-lg"
      style={{
        background: positive
          ? 'radial-gradient(ellipse at center, rgba(34,197,94,0.08) 0%, transparent 100%)'
          : 'radial-gradient(ellipse at center, rgba(239,68,68,0.08) 0%, transparent 100%)',
        boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.08)'
      }}
    >
      <h3 className={`text-lg font-medium mb-4 ${positive ? 'text-green-700' : 'text-red-700'}`}>
        {title}
      </h3>
      <ul className="space-y-2">
        {rules.map((rule, i) => (
          <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
            <span className="text-slate-400">{positive ? '✓' : '✗'}</span>
            <span>{rule}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function GoalCard({ 
  emoji, 
  title, 
  description,
  details
}: { 
  emoji: string;
  title: string;
  description: string;
  details: string;
}) {
  return (
    <div>
      <div className="text-4xl mb-3">{emoji}</div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-cyan-600 font-medium mb-2">{description}</p>
      <p className="text-xs text-slate-600 leading-relaxed">{details}</p>
    </div>
  );
}
