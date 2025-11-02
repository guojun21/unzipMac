import { motion } from "motion/react";
import { DynamicBorderlessCardV6, DynamicBorderlessCardV6Frozen } from "../components/borderless/DynamicBorderlessCardV6";
import { DynamicBorderlessCardV5, DynamicBorderlessCardV5Frozen } from "../components/borderless/DynamicBorderlessCardV5";
import { ArrowLeft, FileArchive, Image as ImageIcon, Archive, Folder, CheckCircle, XCircle, Sparkles, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface DynamicBorderlessV6PerfectProps {
  onBack?: () => void;
}

export default function DynamicBorderlessV6Perfect({ onBack }: DynamicBorderlessV6PerfectProps) {
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
                <h1 className="text-5xl">Dynamic Borderless v0.6</h1>
                <span className="px-4 py-1 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white text-sm font-medium">
                  ✓ PERFECT
                </span>
              </div>
              <p className="text-xl text-slate-600">完美版本 · All Issues Fixed</p>
              <p className="text-lg text-emerald-600 mt-2">透明度固定 · SVG独立 · 强化模糊</p>
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

        {/* Critical Fixes Summary */}
        <Section title="Critical Fixes in v0.6" subtitle="关键修复">
          <div className="grid md:grid-cols-3 gap-6">
            <FixCard
              number="1"
              title="Opacity Consistency"
              subtitle="透明度一致性"
              problem="v0.5: Opacity values changed between states"
              solution="v0.6: Same opacity values, only positions change"
              details={[
                "rgba(255,255,255,0.92) stays 0.92",
                "rgba(255,255,255,0.65) stays 0.65",
                "Only gradient positions shift (35%→70%)",
                "Smoother, more predictable transition"
              ]}
            />
            <FixCard
              number="2"
              title="Independent SVG Layer"
              subtitle="SVG 独立图层"
              problem="v0.5: SVG nested inside blurred parent"
              solution="v0.6: SVG and background are siblings"
              details={[
                "Background: absolute positioned, can blur",
                "SVG: relative positioned, above background",
                "No parent blur affects SVG",
                "Icon stays crystal clear"
              ]}
            />
            <FixCard
              number="3"
              title="Stronger Backdrop Blur"
              subtitle="强化背景模糊"
              problem="v0.5: backdrop-filter blur(20px) too weak"
              solution="v0.6: backdrop-filter blur(32px)"
              details={[
                "60% stronger blur in mist state",
                "More atmospheric effect",
                "Better fog-like appearance",
                "Hover still uses blur(10px)"
              ]}
            />
          </div>
        </Section>

        {/* Side-by-Side Comparison */}
        <Section title="v0.5 vs v0.6 Comparison" subtitle="版本对比">
          <div className="grid md:grid-cols-2 gap-16 p-16 bg-slate-50 rounded-3xl">
            {/* v0.5 - With Issues */}
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <h3 className="text-xl">v0.5 - Issues</h3>
                </div>
                <p className="text-sm text-slate-500">Has 3 critical problems</p>
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
                <IssueSpec label="❌ Opacity" value="Changes between states" negative />
                <IssueSpec label="❌ SVG Blur" value="Affected by parent blur(1px)" negative />
                <IssueSpec label="❌ Backdrop" value="blur(20px) - too weak" negative />
              </div>
            </div>

            {/* v0.6 - Perfect */}
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-xl">v0.6 - PERFECT</h3>
                </div>
                <p className="text-sm text-emerald-600 font-medium">All issues fixed!</p>
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
                <IssueSpec label="✓ Opacity" value="Fixed - positions change only" />
                <IssueSpec label="✓ SVG Blur" value="Independent layer - always sharp" />
                <IssueSpec label="✓ Backdrop" value="blur(32px) - 60% stronger" />
              </div>
            </div>
          </div>
        </Section>

        {/* Technical Diff */}
        <Section title="Technical Diff" subtitle="技术差异">
          <div className="grid md:grid-cols-2 gap-6">
            <DiffCard
              title="Opacity Values"
              v5Code={`// v0.5 - WRONG
default: {
  background: 'rgba(255,255,255,0.92) 0%,
              rgba(255,255,255,0.65) 35%, ...'
}
hover: {
  background: 'rgba(255,255,255,0.95) 0%,
              rgba(255,255,255,0.88) 70%, ...'
  // Opacity changes: 0.92→0.95, 0.65→0.88
}`}
              v6Code={`// v0.6 - CORRECT
default: {
  background: 'rgba(255,255,255,0.92) 0%,
              rgba(255,255,255,0.65) 35%, ...'
}
hover: {
  background: 'rgba(255,255,255,0.92) 0%,
              rgba(255,255,255,0.65) 70%, ...'
  // Same opacity: 0.92, 0.65, 0.3, 0.1
  // Only positions change: 35%→70%
}`}
            />
            <DiffCard
              title="SVG Structure"
              v5Code={`// v0.5 - WRONG (nested)
<motion.div filter="blur(1px)">
  <Icon /> {/* Affected by parent blur! */}
</motion.div>`}
              v6Code={`// v0.6 - CORRECT (siblings)
<div position="relative">
  <motion.div filter="blur(2px)" 
              position="absolute" />
  <div filter="blur(0)" position="relative">
    <Icon /> {/* Not affected! */}
  </div>
</div>`}
            />
            <DiffCard
              title="Backdrop Blur"
              v5Code={`// v0.5 - Too weak
default: {
  backdropFilter: 'blur(20px)'
}`}
              v6Code={`// v0.6 - Stronger (60% increase)
default: {
  backdropFilter: 'blur(32px)'
}`}
            />
            <DiffCard
              title="Icon Background Opacity"
              v5Code={`// v0.5
default: {
  background: 'rgba(color, 0.25)',
  filter: 'blur(1px)'
}
hover: {
  background: 'rgba(color, 0.95)',
  filter: 'blur(0px)'
}`}
              v6Code={`// v0.6 - More visible & dramatic
default: {
  background: 'rgba(color, 0.35)',
  filter: 'blur(2px)'
}
hover: {
  background: 'rgba(color, 1.0)',
  filter: 'blur(0px)'
}`}
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
                  <h3 className="text-xl mb-2">v0.6 Perfect Version</h3>
                  <p className="text-sm text-slate-500">
                    Hover to experience the perfected transformation
                  </p>
                </div>
                <DynamicBorderlessCardV6 
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
        <Section title="Color Variations" subtitle="色彩变化 · All Perfect">
          <div className="grid md:grid-cols-3 gap-12 p-12 bg-slate-50 rounded-3xl">
            <DynamicBorderlessCardV6
              title="项目.zip"
              subtitle="245 个文件"
              icon={FileArchive}
              iconColor={{ r: 167, g: 139, b: 250 }} // purple
            />
            <DynamicBorderlessCardV6
              title="照片.zip"
              subtitle="512 个文件"
              icon={ImageIcon}
              iconColor={{ r: 244, g: 114, b: 182 }} // pink
            />
            <DynamicBorderlessCardV6
              title="备份.rar"
              subtitle="128 个文件"
              icon={Archive}
              iconColor={{ r: 251, g: 146, b: 60 }} // orange
            />
            <DynamicBorderlessCardV6
              title="代码.tar.gz"
              subtitle="1024 个文件"
              icon={Folder}
              iconColor={{ r: 6, g: 182, b: 212 }} // cyan
            />
            <DynamicBorderlessCardV6
              title="成功"
              subtitle="操作完成"
              icon={CheckCircle}
              iconColor={{ r: 34, g: 197, b: 94 }} // green
            />
            <DynamicBorderlessCardV6
              title="错误"
              subtitle="操作失败"
              icon={XCircle}
              iconColor={{ r: 239, g: 68, b: 68 }} // red
            />
          </div>
        </Section>

        {/* Final Specifications */}
        <Section title="Final v0.6 Specifications" subtitle="最终规格">
          <div className="grid md:grid-cols-2 gap-6">
            <SpecificationCard
              title="✓ Opacity Rules"
              specs={[
                "Same rgba values in both states",
                "Only gradient positions change",
                "0.92 → 0.92 (center)",
                "0.65 @ 35% → 0.65 @ 70%",
                "0.3 @ 65% → 0.3 @ 90%",
                "0.1 @ 85% → 0.1 @ 97%",
                "Smoother, more predictable"
              ]}
              color="green"
            />
            <SpecificationCard
              title="✓ SVG Independence"
              specs={[
                "Background: position absolute",
                "SVG container: position relative",
                "They are SIBLINGS, not parent-child",
                "Background can have filter: blur()",
                "SVG explicitly filter: blur(0)",
                "No parent blur affects icon",
                "Always crystal clear"
              ]}
              color="blue"
            />
            <SpecificationCard
              title="✓ Blur Strength"
              specs={[
                "Default backdrop: blur(32px)",
                "60% stronger than v0.5",
                "More atmospheric mist effect",
                "Hover backdrop: blur(10px)",
                "Icon background: blur(2px) default",
                "Icon background: blur(0px) hover",
                "Perfect fog-to-droplet feel"
              ]}
              color="purple"
            />
            <SpecificationCard
              title="✓ Icon Background"
              specs={[
                "Default: rgba(color, 0.35)",
                "Increased from 0.25 for visibility",
                "Hover: rgba(color, 1.0)",
                "Full opacity for drama",
                "Default blur: 2px (soft edges)",
                "Hover blur: 0px (crisp edges)",
                "Dramatic transformation"
              ]}
              color="orange"
            />
          </div>
        </Section>

        {/* Success Banner */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-cyan-50 border-2 border-emerald-200">
          <div className="text-center">
            <Sparkles className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-2xl font-medium text-emerald-900 mb-2">
              v0.6 is the PERFECT version!
            </h3>
            <p className="text-emerald-700 max-w-2xl mx-auto">
              All critical issues from v0.5 have been fixed. Opacity is consistent, SVG is independent, 
              and backdrop blur is properly strengthened. This is the final, production-ready implementation 
              of the Dynamic Borderless system.
            </p>
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

function FixCard({ 
  number, 
  title, 
  subtitle,
  problem,
  solution,
  details
}: { 
  number: string;
  title: string;
  subtitle: string;
  problem: string;
  solution: string;
  details: string[];
}) {
  return (
    <div
      className="p-6 rounded-xl backdrop-blur-lg"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(34,197,94,0.08) 0%, transparent 100%)',
        boxShadow: '0 0 0 1px rgba(34,197,94,0.2), 0 8px 24px rgba(0,0,0,0.08)'
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-xl font-bold">
          {number}
        </div>
        <div>
          <h3 className="text-lg font-medium text-emerald-700">{title}</h3>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="p-3 rounded-lg bg-red-50 border border-red-200">
          <p className="text-xs text-red-700">{problem}</p>
        </div>
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
          <p className="text-xs text-emerald-700 font-medium">{solution}</p>
        </div>
      </div>

      <ul className="space-y-1">
        {details.map((detail, i) => (
          <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
            <span className="text-emerald-500">•</span>
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function IssueSpec({ 
  label, 
  value,
  negative 
}: { 
  label: string; 
  value: string;
  negative?: boolean;
}) {
  return (
    <div className={`
      p-3 rounded-lg
      ${negative ? 'bg-red-50 border border-red-200' : 'bg-emerald-50 border border-emerald-200'}
    `}>
      <div className="flex justify-between items-start gap-4">
        <span className={`font-medium ${negative ? 'text-red-700' : 'text-emerald-700'}`}>{label}</span>
        <span className={`text-right text-xs ${negative ? 'text-red-600' : 'text-emerald-600'}`}>
          {value}
        </span>
      </div>
    </div>
  );
}

function DiffCard({ 
  title, 
  v5Code,
  v6Code
}: { 
  title: string;
  v5Code: string;
  v6Code: string;
}) {
  return (
    <div className="p-6 rounded-xl bg-slate-800 text-white">
      <h3 className="text-lg font-medium mb-4 text-cyan-400">{title}</h3>
      <div className="space-y-4">
        <div>
          <p className="text-xs text-red-400 mb-2">❌ v0.5</p>
          <pre className="text-xs bg-slate-900 p-3 rounded-lg overflow-x-auto">
            <code className="text-red-300">{v5Code}</code>
          </pre>
        </div>
        <div>
          <p className="text-xs text-emerald-400 mb-2">✓ v0.6</p>
          <pre className="text-xs bg-slate-900 p-3 rounded-lg overflow-x-auto">
            <code className="text-emerald-300">{v6Code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

function SpecificationCard({ 
  title, 
  specs,
  color
}: { 
  title: string;
  specs: string[];
  color: 'green' | 'blue' | 'purple' | 'orange';
}) {
  const colorMap = {
    green: { bg: 'rgba(34,197,94,0.08)', text: 'text-green-700', border: 'rgba(34,197,94,0.2)' },
    blue: { bg: 'rgba(6,182,212,0.08)', text: 'text-cyan-700', border: 'rgba(6,182,212,0.2)' },
    purple: { bg: 'rgba(167,139,250,0.08)', text: 'text-purple-700', border: 'rgba(167,139,250,0.2)' },
    orange: { bg: 'rgba(251,146,60,0.08)', text: 'text-orange-700', border: 'rgba(251,146,60,0.2)' }
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
      <h3 className={`text-lg font-medium mb-4 ${config.text}`}>{title}</h3>
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
