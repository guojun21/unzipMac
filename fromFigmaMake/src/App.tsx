import { motion } from "motion/react";
import { Droplet, Sparkles, Layers, Type, Palette, Grid3x3, Box, Package } from "lucide-react";
import { useState } from "react";
import ComponentShowcase from "./pages/ComponentShowcase";

export default function App() {
  const [currentPage, setCurrentPage] = useState<'foundation' | 'components'>('foundation');

  if (currentPage === 'components') {
    return <ComponentShowcase onBack={() => setCurrentPage('foundation')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50/30">
      {/* Header */}
      <header className="px-8 py-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Droplet className="w-10 h-10 text-cyan-500" />
              <h1 className="text-5xl">Fluid Technology</h1>
            </div>
            <motion.button
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white flex items-center gap-2"
              style={{
                boxShadow: '0 0 20px rgba(6,182,212,0.3), 0 0 40px rgba(6,182,212,0.15)'
              }}
              whileHover={{
                boxShadow: '0 0 30px rgba(6,182,212,0.4), 0 0 60px rgba(6,182,212,0.2)',
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentPage('components')}
            >
              <Package className="w-5 h-5" />
              <span>查看组件</span>
            </motion.button>
          </div>
          <p className="text-xl text-slate-600">流体科技 Design System Foundation</p>
          <p className="text-slate-500 mt-2 max-w-2xl">
            A borderless design philosophy blending liquid fluidity with digital technology.
            Archives as fluid containers, extraction as liquid pouring.
          </p>
        </motion.div>
      </header>

      <div className="max-w-7xl mx-auto px-8 pb-24 space-y-16">
        {/* Core Principles */}
        <Section icon={Sparkles} title="Core Principles" subtitle="核心原则">
          <div className="grid md:grid-cols-3 gap-6">
            <PrincipleCard
              title="Borderless Design"
              subtitle="无界"
              description="No solid borders. Use radial gradients with transparent edges and glow shadows."
            />
            <PrincipleCard
              title="Minimal Text"
              subtitle="极简文字"
              description="Buttons: max 2-4 Chinese characters or 1-2 English words. Use icons."
            />
            <PrincipleCard
              title="Fluid Animations"
              subtitle="流动动画"
              description="All transitions feel organic, not mechanical. Spring physics, not linear."
            />
          </div>
        </Section>

        {/* Color System */}
        <Section icon={Palette} title="Color System" subtitle="Water Spectrum">
          <div className="space-y-8">
            {/* Primary Cyan Gradient */}
            <div>
              <h3 className="text-lg mb-4 text-slate-700">Primary: Cyan Gradient</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <ColorCard
                  name="Cyan Gradient"
                  value="linear-gradient(135deg, #06b6d4, #0ea5e9)"
                  className="bg-gradient-to-br from-cyan-500 to-blue-500"
                />
                <div className="grid grid-cols-2 gap-4">
                  <ColorSwatch name="Cyan-500" value="#06b6d4" bg="bg-cyan-500" />
                  <ColorSwatch name="Blue-500" value="#0ea5e9" bg="bg-blue-500" />
                </div>
              </div>
            </div>

            {/* Neutral: Slate */}
            <div>
              <h3 className="text-lg mb-4 text-slate-700">Neutral: Slate (Deep Sea Gradient)</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <ColorSwatch name="White" value="#ffffff" bg="bg-white" border />
                <ColorSwatch name="Slate-50" value="#f8fafc" bg="bg-slate-50" border />
                <ColorSwatch name="Slate-100" value="#f1f5f9" bg="bg-slate-100" border />
                <ColorSwatch name="Slate-600" value="#475569" bg="bg-slate-600" />
                <ColorSwatch name="Slate-900" value="#0f172a" bg="bg-slate-900" />
              </div>
            </div>

            {/* Aurora Palette */}
            <div>
              <h3 className="text-lg mb-4 text-slate-700">Aurora Palette (Supporting Colors)</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ColorSwatch name="Purple-400" value="#a78bfa" bg="bg-purple-400" label="Special Files" />
                <ColorSwatch name="Pink-400" value="#f472b6" bg="bg-pink-400" label="Media Files" />
                <ColorSwatch name="Orange-400" value="#fb923c" bg="bg-orange-400" label="Warnings" />
                <ColorSwatch name="Green-400" value="#34d399" bg="bg-green-400" label="Success" />
              </div>
            </div>
          </div>
        </Section>

        {/* Shadows & Glows */}
        <Section icon={Layers} title="Shadows & Glows" subtitle="Borderless Design - KEY!">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Standard Shadow */}
            <div className="space-y-4">
              <h3 className="text-lg text-slate-700">Standard Shadow</h3>
              <div
                className="h-32 rounded-2xl bg-white"
                style={{
                  boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.08)'
                }}
              >
                <div className="h-full flex items-center justify-center text-slate-400">
                  <code className="text-xs px-4 text-center">
                    0 0 0 1px rgba(0,0,0,0.05),<br />
                    0 8px 32px rgba(0,0,0,0.08)
                  </code>
                </div>
              </div>
            </div>

            {/* Glow Shadow */}
            <div className="space-y-4">
              <h3 className="text-lg text-slate-700">Glow Shadow (Cyan)</h3>
              <div
                className="h-32 rounded-2xl bg-white"
                style={{
                  boxShadow: '0 0 20px rgba(6,182,212,0.3), 0 0 40px rgba(6,182,212,0.15)'
                }}
              >
                <div className="h-full flex items-center justify-center text-cyan-500">
                  <code className="text-xs px-4 text-center">
                    0 0 20px rgba(6,182,212,0.3),<br />
                    0 0 40px rgba(6,182,212,0.15)
                  </code>
                </div>
              </div>
            </div>

            {/* Combined Shadow + Glow */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-lg text-slate-700">Combined: Standard + Glow</h3>
              <div
                className="h-32 rounded-2xl bg-white"
                style={{
                  boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.08), 0 0 20px rgba(6,182,212,0.3), 0 0 40px rgba(6,182,212,0.15)'
                }}
              >
                <div className="h-full flex items-center justify-center text-cyan-600">
                  <span>Perfect for interactive elements ✨</span>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Typography */}
        <Section icon={Type} title="Typography" subtitle="字体系统">
          <div className="space-y-8">
            {/* Font Families */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 rounded-2xl bg-white" style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.08)' }}>
                <p className="text-slate-500 text-sm mb-2">Sans-serif</p>
                <p className="text-3xl">Inter</p>
                <p className="text-slate-600 mt-2">The quick brown fox jumps over the lazy dog</p>
              </div>
              <div className="p-8 rounded-2xl bg-white font-mono" style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.08)' }}>
                <p className="text-slate-500 text-sm mb-2">Monospace</p>
                <p className="text-3xl">JetBrains Mono</p>
                <p className="text-slate-600 mt-2">The quick brown fox</p>
              </div>
            </div>

            {/* Type Scale */}
            <div className="space-y-1 p-8 rounded-2xl bg-white" style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.08)' }}>
              <div className="flex items-baseline gap-4 py-2 border-b border-slate-100">
                <span className="text-sm text-slate-400 w-16 font-mono">48px</span>
                <span style={{ fontSize: '48px', lineHeight: '1.2' }}>Heading XL</span>
              </div>
              <div className="flex items-baseline gap-4 py-2 border-b border-slate-100">
                <span className="text-sm text-slate-400 w-16 font-mono">36px</span>
                <span style={{ fontSize: '36px', lineHeight: '1.2' }}>Heading L</span>
              </div>
              <div className="flex items-baseline gap-4 py-2 border-b border-slate-100">
                <span className="text-sm text-slate-400 w-16 font-mono">30px</span>
                <span style={{ fontSize: '30px', lineHeight: '1.3' }}>Heading M</span>
              </div>
              <div className="flex items-baseline gap-4 py-2 border-b border-slate-100">
                <span className="text-sm text-slate-400 w-16 font-mono">24px</span>
                <span style={{ fontSize: '24px', lineHeight: '1.3' }}>Heading S</span>
              </div>
              <div className="flex items-baseline gap-4 py-2 border-b border-slate-100">
                <span className="text-sm text-slate-400 w-16 font-mono">20px</span>
                <span style={{ fontSize: '20px', lineHeight: '1.5' }}>Body XL</span>
              </div>
              <div className="flex items-baseline gap-4 py-2 border-b border-slate-100">
                <span className="text-sm text-slate-400 w-16 font-mono">18px</span>
                <span style={{ fontSize: '18px', lineHeight: '1.5' }}>Body L</span>
              </div>
              <div className="flex items-baseline gap-4 py-2 border-b border-slate-100">
                <span className="text-sm text-slate-400 w-16 font-mono">16px</span>
                <span style={{ fontSize: '16px', lineHeight: '1.5' }}>Body M (Base)</span>
              </div>
              <div className="flex items-baseline gap-4 py-2 border-b border-slate-100">
                <span className="text-sm text-slate-400 w-16 font-mono">14px</span>
                <span style={{ fontSize: '14px', lineHeight: '1.5' }}>Body S</span>
              </div>
              <div className="flex items-baseline gap-4 py-2">
                <span className="text-sm text-slate-400 w-16 font-mono">12px</span>
                <span style={{ fontSize: '12px', lineHeight: '1.5' }}>Caption</span>
              </div>
            </div>
          </div>
        </Section>

        {/* Spacing */}
        <Section icon={Grid3x3} title="Spacing" subtitle="8px Grid System">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {[4, 8, 12, 16, 24, 32, 48, 64].map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <div
                  className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg"
                  style={{ width: size, height: size }}
                />
                <span className="text-xs text-slate-500 font-mono">{size}px</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Border Radius */}
        <Section icon={Box} title="Border Radius" subtitle="圆角">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <RadiusCard value="8px" label="Inputs" />
            <RadiusCard value="12px" label="Buttons" />
            <RadiusCard value="16px" label="Cards" />
            <RadiusCard value="24px" label="Modals" />
          </div>
        </Section>

        {/* Borderless vs Traditional */}
        <Section icon={Droplet} title="Borderless Philosophy" subtitle="无界设计">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Traditional Bordered Card */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-500">
                <div className="w-4 h-4 rounded-full bg-red-400" />
                <h3 className="text-lg">Traditional (Avoid)</h3>
              </div>
              <div className="p-8 rounded-2xl bg-white border-2 border-slate-300">
                <h4 className="text-lg mb-2">Bordered Card</h4>
                <p className="text-slate-600">Hard borders create visual barriers and feel mechanical, not fluid.</p>
                <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg border-2 border-blue-700">
                  Click Me
                </button>
              </div>
            </div>

            {/* Borderless Fluid Card */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-cyan-600">
                <div className="w-4 h-4 rounded-full bg-cyan-500" />
                <h3 className="text-lg">Borderless (Fluid)</h3>
              </div>
              <motion.div
                className="p-8 rounded-2xl bg-white cursor-pointer"
                style={{
                  boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.08)'
                }}
                whileHover={{
                  boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.08), 0 0 20px rgba(6,182,212,0.3), 0 0 40px rgba(6,182,212,0.15)'
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <h4 className="text-lg mb-2">Fluid Card</h4>
                <p className="text-slate-600">Glow shadows create depth without barriers. Feels like water droplets on paper.</p>
                <motion.button
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl"
                  style={{
                    boxShadow: '0 4px 16px rgba(6,182,212,0.2)'
                  }}
                  whileHover={{
                    boxShadow: '0 0 20px rgba(6,182,212,0.4), 0 4px 16px rgba(6,182,212,0.3)',
                    scale: 1.02
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  上传
                </motion.button>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* Effects */}
        <Section icon={Sparkles} title="Effects" subtitle="效果">
          <div className="grid md:grid-cols-3 gap-6">
            <EffectCard title="Blur: 10px" subtitle="Cards" blur="10px" />
            <EffectCard title="Blur: 20px" subtitle="Glass" blur="20px" />
            <EffectCard title="Blur: 30px" subtitle="Overlays" blur="30px" />
          </div>
        </Section>

        {/* Minimal Text Examples */}
        <Section icon={Type} title="Minimal Text" subtitle="极简文字">
          <div className="flex flex-wrap gap-4">
            <FluidButton>上传</FluidButton>
            <FluidButton variant="secondary">删除</FluidButton>
            <FluidButton variant="success">开始</FluidButton>
            <FluidButton variant="warning">警告</FluidButton>
            <FluidButton variant="purple">特殊</FluidButton>
          </div>
          <p className="text-slate-500 mt-6 text-sm">
            ✓ Max 2-4 Chinese characters or 1-2 English words<br />
            ✓ Use icons wherever possible<br />
            ✓ Every button has glow on hover
          </p>
        </Section>
      </div>
    </div>
  );
}

// Helper Components
function Section({ icon: Icon, title, subtitle, children }: { icon: any; title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <Icon className="w-6 h-6 text-cyan-500" />
        <div>
          <h2 className="text-2xl">{title}</h2>
          <p className="text-slate-500 text-sm">{subtitle}</p>
        </div>
      </div>
      {children}
    </motion.section>
  );
}

function PrincipleCard({ title, subtitle, description }: { title: string; subtitle: string; description: string }) {
  return (
    <motion.div
      className="p-6 rounded-2xl bg-white"
      style={{
        boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.08)'
      }}
      whileHover={{
        boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.08), 0 0 20px rgba(6,182,212,0.2)'
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <h3 className="text-lg mb-1">{title}</h3>
      <p className="text-cyan-600 mb-3">{subtitle}</p>
      <p className="text-slate-600 text-sm">{description}</p>
    </motion.div>
  );
}

function ColorCard({ name, value, className }: { name: string; value: string; className: string }) {
  return (
    <div
      className={`h-32 rounded-2xl ${className} p-6 flex flex-col justify-end`}
      style={{
        boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.08)'
      }}
    >
      <p className="text-white text-sm font-mono">{name}</p>
      <p className="text-white/80 text-xs font-mono">{value}</p>
    </div>
  );
}

function ColorSwatch({ name, value, bg, label, border }: { name: string; value: string; bg: string; label?: string; border?: boolean }) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.08)'
      }}
    >
      <div className={`${bg} h-24 ${border ? 'border border-slate-200' : ''}`} />
      <div className="p-3 bg-white">
        <p className="text-xs text-slate-900">{name}</p>
        <p className="text-xs text-slate-500 font-mono">{value}</p>
        {label && <p className="text-xs text-cyan-600 mt-1">{label}</p>}
      </div>
    </div>
  );
}

function RadiusCard({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="p-6 bg-white h-32 flex items-center justify-center"
      style={{
        borderRadius: value,
        boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.08)'
      }}
    >
      <div className="text-center">
        <p className="text-lg text-slate-900">{value}</p>
        <p className="text-sm text-slate-500">{label}</p>
      </div>
    </div>
  );
}

function EffectCard({ title, subtitle, blur }: { title: string; subtitle: string; blur: string }) {
  return (
    <div className="relative h-48 rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 rounded-full bg-white/30 backdrop-blur-sm" style={{ backdropFilter: `blur(${blur})` }} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50">
        <p className="text-white">{title}</p>
        <p className="text-white/70 text-sm">{subtitle}</p>
      </div>
    </div>
  );
}

function FluidButton({ children, variant = 'primary' }: { children: React.ReactNode; variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'purple' }) {
  const variants = {
    primary: 'from-cyan-500 to-blue-500',
    secondary: 'from-slate-500 to-slate-600',
    success: 'from-green-400 to-emerald-500',
    warning: 'from-orange-400 to-orange-500',
    purple: 'from-purple-400 to-purple-500'
  };

  const glowColors = {
    primary: '0 0 20px rgba(6,182,212,0.4), 0 4px 16px rgba(6,182,212,0.3)',
    secondary: '0 0 20px rgba(100,116,139,0.4), 0 4px 16px rgba(100,116,139,0.3)',
    success: '0 0 20px rgba(52,211,153,0.4), 0 4px 16px rgba(52,211,153,0.3)',
    warning: '0 0 20px rgba(251,146,60,0.4), 0 4px 16px rgba(251,146,60,0.3)',
    purple: '0 0 20px rgba(167,139,250,0.4), 0 4px 16px rgba(167,139,250,0.3)'
  };

  return (
    <motion.button
      className={`px-6 py-2 bg-gradient-to-r ${variants[variant]} text-white rounded-xl`}
      style={{
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
      }}
      whileHover={{
        boxShadow: glowColors[variant],
        scale: 1.02
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.button>
  );
}
