import { motion } from "motion/react";
import { DynamicBorderlessCardV7, DynamicBorderlessCardV7Frozen } from "../components/borderless/DynamicBorderlessCardV7";
import { DynamicBorderlessCardV6Frozen } from "../components/borderless/DynamicBorderlessCardV6";
import { ArrowLeft, FileArchive, Image as ImageIcon, Archive, Folder, CheckCircle, XCircle, Sparkles, Sliders, Target } from "lucide-react";
import { useState } from "react";

interface DynamicBorderlessV7UltimateProps {
  onBack?: () => void;
}

export default function DynamicBorderlessV7Ultimate({ onBack }: DynamicBorderlessV7UltimateProps) {
  const [slowMotion, setSlowMotion] = useState(false);
  
  // Interactive control panel state
  const [iconBlurValue, setIconBlurValue] = useState(2);
  const [containerBlurValue, setContainerBlurValue] = useState(32);
  const [glowSpreadValue, setGlowSpreadValue] = useState(30);

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
              <div className="mb-2">
                <h1 className="text-5xl">Dynamic Borderless v0.7</h1>
              </div>
              <p className="text-xl text-slate-600">探索：紫色透明度恒定1.0，凝结效果靠blur变化</p>
              <p className="text-sm text-slate-500 mt-2">Exploration: Constant opacity (1.0), condensation via blur changes, adjustable parameters</p>
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
        </motion.div>

        {/* Key Discovery Banner */}
        <Section title="🎯 Key Discovery in v0.7" subtitle="核心发现">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300">
            <div className="flex items-start gap-4">
              <Target className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-xl font-medium text-amber-900 mb-3">
                  Icon background opacity should be CONSTANT (1.0) in both states!
                </h3>
                <div className="space-y-2 text-amber-800">
                  <p className="flex items-start gap-2">
                    <span className="text-amber-600">✓</span>
                    <span>The "condensation" effect comes from <strong>blur changes</strong> and <strong>glow changes</strong>, NOT opacity changes</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-amber-600">✓</span>
                    <span>Transformation feels like <strong>adjusting lens focus</strong> (blur → sharp) instead of color intensity change</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-amber-600">✓</span>
                    <span>Mist state: Full purple (1.0 opacity) with blur(2px) - <strong>saturated but soft</strong></span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-amber-600">✓</span>
                    <span>Hover state: Full purple (1.0 opacity) with blur(0) - <strong>same color, sharper edges</strong></span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* What Changed */}
        <Section title="What Changed from v0.6" subtitle="与 v0.6 的差异">
          <div className="grid md:grid-cols-2 gap-8">
            <ChangeCard
              version="v0.6"
              title="Opacity Changes"
              subtitle="Light → Full"
              negative
              details={[
                "Default: rgba(color, 0.35) - pale purple",
                "Hover: rgba(color, 1.0) - full purple",
                "Opacity changes: 0.35 → 1.0",
                "Feels like color intensity change",
                "Dramatic but less natural"
              ]}
            />
            <ChangeCard
              version="v0.7"
              title="Blur Changes Only"
              subtitle="Soft → Sharp"
              details={[
                "Default: rgba(color, 1.0) + blur(2px)",
                "Hover: rgba(color, 1.0) + blur(0px)",
                "Opacity stays: 1.0 → 1.0 (constant!)",
                "Feels like lens focusing",
                "More natural and elegant"
              ]}
            />
          </div>
        </Section>

        {/* Visual Comparison */}
        <Section title="v0.6 vs v0.7 Visual Comparison" subtitle="视觉对比">
          <div className="grid md:grid-cols-2 gap-16 p-16 bg-slate-50 rounded-3xl">
            {/* v0.6 */}
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-xl mb-2">v0.6 - Opacity Change</h3>
                <p className="text-sm text-slate-500">Light purple → Full purple</p>
              </div>
              <div className="flex justify-center">
                <DynamicBorderlessCardV6Frozen
                  state="default"
                  title="项目.zip"
                  subtitle="245 个文件"
                  icon={FileArchive}
                  iconColor={{ r: 167, g: 139, b: 250 }}
                />
              </div>
              <div className="space-y-2 text-sm">
                <DetailSpec label="Background" value="rgba(purple, 0.35)" color="orange" />
                <DetailSpec label="Blur" value="blur(2px)" color="slate" />
                <DetailSpec label="Effect" value="Pale purple with soft edges" color="slate" />
              </div>
            </div>

            {/* v0.7 */}
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-xl mb-2">v0.7 - Blur Change Only</h3>
                <p className="text-sm text-amber-600 font-medium">Soft focus → Sharp focus</p>
              </div>
              <div className="flex justify-center">
                <DynamicBorderlessCardV7Frozen
                  state="default"
                  title="项目.zip"
                  subtitle="245 个文件"
                  icon={FileArchive}
                  iconColor={{ r: 167, g: 139, b: 250 }}
                />
              </div>
              <div className="space-y-2 text-sm">
                <DetailSpec label="Background" value="rgba(purple, 1.0)" color="green" />
                <DetailSpec label="Blur" value="blur(2px)" color="slate" />
                <DetailSpec label="Effect" value="Full purple with soft edges" color="green" />
              </div>
            </div>
          </div>
        </Section>

        {/* Interactive Blur Adjustment Panel */}
        <Section title="🎛️ Interactive Blur Adjustment" subtitle="交互式模糊调节">
          <div className="p-8 rounded-2xl backdrop-blur-lg" style={{
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 70%, transparent 100%)',
            boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.08)'
          }}>
            <div className="flex items-center gap-3 mb-6">
              <Sliders className="w-6 h-6 text-purple-600" />
              <div>
                <h3 className="text-xl">实时模糊参数调节</h3>
                <p className="text-sm text-slate-600">拖动滑块找到最佳的模糊效果</p>
              </div>
            </div>

            {/* Live preview card */}
            <div className="mb-8 p-8 bg-slate-50 rounded-xl flex justify-center">
              <DynamicBorderlessCardV7
                title="实时预览"
                subtitle="拖动滑块"
                icon={FileArchive}
                iconColor={{ r: 167, g: 139, b: 250 }}
                iconBackgroundBlur={iconBlurValue}
                containerBackdropBlur={containerBlurValue}
                glowSpread={glowSpreadValue}
              />
            </div>

            {/* Sliders */}
            <div className="space-y-6">
              {/* Slider 1: Icon background blur */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">紫色背景模糊</label>
                  <span className="text-sm font-mono text-purple-600 font-bold">{iconBlurValue.toFixed(1)}px</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={iconBlurValue}
                  onChange={(e) => setIconBlurValue(parseFloat(e.target.value))}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>0px (完全清晰)</span>
                  <span>5px (重度模糊)</span>
                </div>
              </div>

              {/* Slider 2: Outer container blur */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">外层容器模糊</label>
                  <span className="text-sm font-mono text-cyan-600 font-bold">{containerBlurValue}px</span>
                </div>
                <input 
                  type="range"
                  min="10"
                  max="50"
                  step="1"
                  value={containerBlurValue}
                  onChange={(e) => setContainerBlurValue(parseInt(e.target.value))}
                  className="w-full h-2 bg-cyan-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>10px (轻度)</span>
                  <span>50px (极重度)</span>
                </div>
              </div>

              {/* Slider 3: Glow spread */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">光晕扩散范围</label>
                  <span className="text-sm font-mono text-orange-600 font-bold">{glowSpreadValue}px</span>
                </div>
                <input 
                  type="range"
                  min="10"
                  max="60"
                  step="2"
                  value={glowSpreadValue}
                  onChange={(e) => setGlowSpreadValue(parseInt(e.target.value))}
                  className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>10px (收紧)</span>
                  <span>60px (扩散)</span>
                </div>
              </div>

              {/* Preset buttons */}
              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500 mb-3">预设值：</p>
                <div className="flex gap-2 flex-wrap">
                  <button 
                    onClick={() => {
                      setIconBlurValue(2);
                      setContainerBlurValue(32);
                      setGlowSpreadValue(30);
                    }}
                    className="px-4 py-2 rounded-lg bg-purple-100 text-purple-700 text-sm hover:bg-purple-200 transition-colors"
                  >
                    推荐值 (2/32/30)
                  </button>
                  <button 
                    onClick={() => {
                      setIconBlurValue(1);
                      setContainerBlurValue(25);
                      setGlowSpreadValue(20);
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm hover:bg-slate-200 transition-colors"
                  >
                    轻度 (1/25/20)
                  </button>
                  <button 
                    onClick={() => {
                      setIconBlurValue(3);
                      setContainerBlurValue(40);
                      setGlowSpreadValue(40);
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm hover:bg-slate-200 transition-colors"
                  >
                    重度 (3/40/40)
                  </button>
                  <button 
                    onClick={() => {
                      setIconBlurValue(0);
                      setContainerBlurValue(15);
                      setGlowSpreadValue(15);
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm hover:bg-slate-200 transition-colors"
                  >
                    清晰 (0/15/15)
                  </button>
                </div>
              </div>

              {/* Current values display */}
              <div className="mt-6 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                <p className="text-xs font-medium text-cyan-900 mb-2">当前参数代码：</p>
                <code className="text-xs text-cyan-700 block font-mono">
                  filter: blur({iconBlurValue.toFixed(1)}px)<br/>
                  backdrop-filter: blur({containerBlurValue}px)<br/>
                  box-shadow: 0 0 {glowSpreadValue}px rgba(...)
                </code>
              </div>
            </div>
          </div>
        </Section>

        {/* Technical Breakdown */}
        <Section title="Technical Breakdown" subtitle="技术细节">
          <div className="grid md:grid-cols-2 gap-6">
            <TechnicalCard
              state="DEFAULT STATE"
              subtitle="雾气态 - Mist"
              color="purple"
              specs={[
                {
                  label: "Icon Background",
                  value: "rgba(color, 1.0)",
                  highlight: true,
                  note: "Full opacity!"
                },
                {
                  label: "Icon Blur",
                  value: "filter: blur(2px)",
                  note: "Soft edges"
                },
                {
                  label: "Icon Glow",
                  value: "0 0 30px rgba(color, 0.25)",
                  note: "Diffuse glow"
                },
                {
                  label: "Visual Effect",
                  value: "Solid color with soft blurred edges",
                  note: "Like soft focus"
                }
              ]}
            />
            <TechnicalCard
              state="HOVER STATE"
              subtitle="凝结态 - Condensed"
              color="cyan"
              specs={[
                {
                  label: "Icon Background",
                  value: "rgba(color, 1.0)",
                  highlight: true,
                  note: "SAME full opacity!"
                },
                {
                  label: "Icon Blur",
                  value: "filter: blur(0px)",
                  note: "Sharp edges"
                },
                {
                  label: "Icon Glow",
                  value: "0 0 20px rgba(color, 0.3)",
                  note: "Focused glow"
                },
                {
                  label: "Visual Effect",
                  value: "Solid color with sharp edges",
                  note: "Like in focus"
                }
              ]}
            />
          </div>
        </Section>

        {/* Interactive Test */}
        <Section title="Interactive Test" subtitle="交互测试">
          <div className="space-y-8">
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

            <div className="p-16 bg-slate-50 rounded-3xl">
              <div className="flex flex-col items-center gap-6">
                <div className="text-center mb-4">
                  <h3 className="text-xl mb-2">v0.7 Ultimate Version</h3>
                  <p className="text-sm text-slate-500">
                    Hover to experience the lens focusing effect
                  </p>
                </div>
                <DynamicBorderlessCardV7 
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

        {/* Color Variations */}
        <Section title="Color Variations" subtitle="色彩变化 · All Ultimate">
          <div className="grid md:grid-cols-3 gap-12 p-12 bg-slate-50 rounded-3xl">
            <DynamicBorderlessCardV7
              title="项目.zip"
              subtitle="245 个文件"
              icon={FileArchive}
              iconColor={{ r: 167, g: 139, b: 250 }} // purple
            />
            <DynamicBorderlessCardV7
              title="照片.zip"
              subtitle="512 个文件"
              icon={ImageIcon}
              iconColor={{ r: 244, g: 114, b: 182 }} // pink
            />
            <DynamicBorderlessCardV7
              title="备份.rar"
              subtitle="128 个文件"
              icon={Archive}
              iconColor={{ r: 251, g: 146, b: 60 }} // orange
            />
            <DynamicBorderlessCardV7
              title="代码.tar.gz"
              subtitle="1024 个文件"
              icon={Folder}
              iconColor={{ r: 6, g: 182, b: 212 }} // cyan
            />
            <DynamicBorderlessCardV7
              title="成功"
              subtitle="操作完成"
              icon={CheckCircle}
              iconColor={{ r: 34, g: 197, b: 94 }} // green
            />
            <DynamicBorderlessCardV7
              title="错误"
              subtitle="操作失败"
              icon={XCircle}
              iconColor={{ r: 239, g: 68, b: 68 }} // red
            />
          </div>
        </Section>

        {/* Ultimate Specifications */}
        <Section title="Ultimate v0.7 Specifications" subtitle="终极规格">
          <div className="grid md:grid-cols-3 gap-6">
            <SpecCard
              title="Constant Opacity"
              subtitle="恒定透明度"
              icon="🎯"
              specs={[
                "Icon background: rgba(color, 1.0)",
                "Both default AND hover states",
                "No opacity changes at all",
                "Full saturation always",
                "More elegant transformation",
                "Natural lens focusing feel"
              ]}
              color="amber"
            />
            <SpecCard
              title="Blur Changes"
              subtitle="模糊变化"
              icon="🔍"
              specs={[
                "Default: filter: blur(2px)",
                "Hover: filter: blur(0px)",
                "Soft → Sharp edges",
                "Like camera autofocus",
                "Smooth spring transition",
                "400ms ease-out timing"
              ]}
              color="purple"
            />
            <SpecCard
              title="Glow Changes"
              subtitle="光晕变化"
              icon="✨"
              specs={[
                "Default: 0 0 30px (diffuse)",
                "Hover: 0 0 20px (focused)",
                "Glow tightens on hover",
                "Opacity: 0.25 → 0.3",
                "More concentrated light",
                "Enhances focus effect"
              ]}
              color="cyan"
            />
          </div>
        </Section>

        {/* Success Banner */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200">
          <div className="text-center">
            <Sparkles className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h3 className="text-2xl font-medium text-amber-900 mb-2">
              v0.7 is the ULTIMATE version!
            </h3>
            <p className="text-amber-700 max-w-2xl mx-auto mb-4">
              The critical discovery: constant opacity (1.0) creates a more natural "lens focusing" effect. 
              The transformation comes from blur and glow changes, not color intensity changes. 
              This is the final, production-ready implementation with perfect visual fidelity.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-amber-600">
              <span>⭐</span>
              <span>Recommended for all production use</span>
              <span>⭐</span>
            </div>
          </div>
        </div>
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

function ChangeCard({
  version,
  title,
  subtitle,
  details,
  negative
}: {
  version: string;
  title: string;
  subtitle: string;
  details: string[];
  negative?: boolean;
}) {
  return (
    <div
      className="p-6 rounded-xl backdrop-blur-lg"
      style={{
        background: negative
          ? 'radial-gradient(ellipse at center, rgba(251,146,60,0.08) 0%, transparent 100%)'
          : 'radial-gradient(ellipse at center, rgba(34,197,94,0.08) 0%, transparent 100%)',
        boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.08)'
      }}
    >
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono text-slate-500">{version}</span>
          {!negative && <span className="text-green-600">✓</span>}
        </div>
        <h3 className={`text-lg font-medium ${negative ? 'text-orange-700' : 'text-green-700'}`}>
          {title}
        </h3>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
      <ul className="space-y-2">
        {details.map((detail, i) => (
          <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
            <span className="text-slate-400">•</span>
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DetailSpec({
  label,
  value,
  color
}: {
  label: string;
  value: string;
  color: 'green' | 'orange' | 'slate';
}) {
  const colorMap = {
    green: 'bg-green-50 border-green-200 text-green-700',
    orange: 'bg-orange-50 border-orange-200 text-orange-700',
    slate: 'bg-slate-50 border-slate-200 text-slate-700'
  };

  return (
    <div className={`p-3 rounded-lg border ${colorMap[color]}`}>
      <div className="flex justify-between items-start gap-4">
        <span className="font-medium text-xs">{label}</span>
        <span className="text-right text-xs font-mono">{value}</span>
      </div>
    </div>
  );
}

function TechnicalCard({
  state,
  subtitle,
  color,
  specs
}: {
  state: string;
  subtitle: string;
  color: 'purple' | 'cyan';
  specs: Array<{
    label: string;
    value: string;
    highlight?: boolean;
    note?: string;
  }>;
}) {
  const colorMap = {
    purple: {
      bg: 'rgba(167,139,250,0.08)',
      text: 'text-purple-700',
      border: 'rgba(167,139,250,0.2)',
      highlight: 'bg-purple-50 border-purple-300'
    },
    cyan: {
      bg: 'rgba(6,182,212,0.08)',
      text: 'text-cyan-700',
      border: 'rgba(6,182,212,0.2)',
      highlight: 'bg-cyan-50 border-cyan-300'
    }
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
      <h3 className={`text-lg font-medium mb-1 ${config.text}`}>{state}</h3>
      <p className="text-xs text-slate-500 mb-4">{subtitle}</p>

      <div className="space-y-3">
        {specs.map((spec, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg ${spec.highlight ? `border-2 ${config.highlight}` : 'bg-slate-50'}`}
          >
            <div className="flex justify-between items-start gap-2 mb-1">
              <span className="text-xs font-medium text-slate-700">{spec.label}</span>
              {spec.highlight && <span className={config.text}>⭐</span>}
            </div>
            <p className="text-xs font-mono text-slate-600">{spec.value}</p>
            {spec.note && (
              <p className="text-xs text-slate-500 mt-1 italic">{spec.note}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SpecCard({
  title,
  subtitle,
  icon,
  specs,
  color
}: {
  title: string;
  subtitle: string;
  icon: string;
  specs: string[];
  color: 'amber' | 'purple' | 'cyan';
}) {
  const colorMap = {
    amber: { bg: 'rgba(251,191,36,0.08)', text: 'text-amber-700', border: 'rgba(251,191,36,0.2)' },
    purple: { bg: 'rgba(167,139,250,0.08)', text: 'text-purple-700', border: 'rgba(167,139,250,0.2)' },
    cyan: { bg: 'rgba(6,182,212,0.08)', text: 'text-cyan-700', border: 'rgba(6,182,212,0.2)' }
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
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{icon}</span>
        <div>
          <h3 className={`text-lg font-medium ${config.text}`}>{title}</h3>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
      </div>
      <ul className="space-y-2">
        {specs.map((spec, i) => (
          <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
            <span className="text-slate-400">•</span>
            <span>{spec}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
