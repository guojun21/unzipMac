import { motion } from "motion/react";
import { DynamicBorderlessCard } from "../components/borderless/DynamicBorderlessCard";
import { BorderlessCard } from "../components/borderless/BorderlessCard";
import { ArrowLeft, FileArchive, Archive, FolderArchive, Image as ImageIcon, Code, Video, Play } from "lucide-react";
import { useState } from "react";

interface DynamicBorderlessDemoProps {
  onBack?: () => void;
}

export default function DynamicBorderlessDemo({ onBack }: DynamicBorderlessDemoProps) {
  const [featherIntensity, setFeatherIntensity] = useState(100);
  const [showBoundary, setShowBoundary] = useState(false);
  const [playAnimation, setPlayAnimation] = useState(false);

  const handlePlayAnimation = () => {
    setPlayAnimation(true);
    setTimeout(() => setPlayAnimation(false), 3000);
  };

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
              <h1 className="text-5xl mb-2">Dynamic Borderless</h1>
              <p className="text-xl text-slate-600">动态无界 · Mist to Droplet Transformation</p>
              <p className="text-lg text-purple-600 mt-2">雾气凝结效果 · Condensation Design</p>
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
          <p className="text-slate-500 max-w-4xl mt-4">
            Components transform between states: <span className="text-cyan-600 font-medium">DEFAULT (mist - heavy feather)</span> ↔ <span className="text-purple-600 font-medium">HOVER (droplet - condensed edges)</span>. 
            Like water vapor condensing into droplets when you interact!
          </p>
        </motion.div>

        {/* Static vs Dynamic Comparison */}
        <Section title="Comparison: Static vs Dynamic" subtitle="静态 vs 动态对比">
          <div className="grid md:grid-cols-2 gap-16 p-16 bg-slate-50 rounded-3xl">
            {/* Static Borderless (Old) */}
            <div className="space-y-4">
              <div className="text-center mb-8">
                <h3 className="text-xl mb-2">❌ Static Borderless</h3>
                <p className="text-sm text-slate-500">Old approach - Same feathering always</p>
                <p className="text-xs text-slate-400 mt-2">Hover just adds glow. Boring.</p>
              </div>
              <div className="flex justify-center">
                <BorderlessCard
                  title="项目.zip"
                  subtitle="245 个文件"
                />
              </div>
            </div>

            {/* Dynamic Borderless (New) */}
            <div className="space-y-4">
              <div className="text-center mb-8">
                <h3 className="text-xl mb-2">✨ Dynamic Borderless</h3>
                <p className="text-sm text-cyan-600 font-medium">NEW! Mist → Droplet transformation</p>
                <p className="text-xs text-slate-400 mt-2">Edges condense on hover. Exciting!</p>
              </div>
              <div className="flex justify-center">
                <DynamicBorderlessCard
                  title="项目.zip"
                  subtitle="245 个文件"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="mt-8 space-y-2 text-center">
            <p className="text-slate-600">💧 Hover the right card to see mist → droplet transformation</p>
            <p className="text-slate-600">✨ Notice how edges pull in and sharpen on hover</p>
            <p className="text-slate-600">🎯 Content stays sharp in both states</p>
          </div>
        </Section>

        {/* Interactive Demo Grid */}
        <Section title="Interactive Demo Grid" subtitle="交互式演示网格">
          <div className="space-y-8">
            {/* Control Panel */}
            <div className="p-8 rounded-2xl bg-white/50 backdrop-blur-xl space-y-6">
              <h3 className="text-lg mb-4">控制面板 · Control Panel</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Feather Intensity Slider */}
                <div className="space-y-3">
                  <label className="text-sm text-slate-600 flex items-center justify-between">
                    <span>羽化强度 · Feather Intensity</span>
                    <span className="text-cyan-600 font-mono">{featherIntensity}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={featherIntensity}
                    onChange={(e) => setFeatherIntensity(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${featherIntensity}%, #e2e8f0 ${featherIntensity}%, #e2e8f0 100%)`
                    }}
                  />
                  <p className="text-xs text-slate-400">
                    {featherIntensity < 30 ? 'Minimal feather' : featherIntensity < 70 ? 'Moderate feather' : 'Heavy feather'}
                  </p>
                </div>

                {/* Show Boundary Toggle */}
                <div className="space-y-3">
                  <label className="text-sm text-slate-600">显示边界线 · Show Boundaries</label>
                  <button
                    onClick={() => setShowBoundary(!showBoundary)}
                    className={`
                      w-full h-10 rounded-lg px-4 flex items-center justify-center gap-2
                      transition-all duration-200
                      ${showBoundary 
                        ? 'bg-cyan-500 text-white' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }
                    `}
                  >
                    {showBoundary ? '✓ 已开启' : '关闭'}
                  </button>
                  <p className="text-xs text-slate-400">
                    Debug mode - shows card boundaries
                  </p>
                </div>

                {/* Play Animation Button */}
                <div className="space-y-3">
                  <label className="text-sm text-slate-600">播放动画 · Play Animation</label>
                  <button
                    onClick={handlePlayAnimation}
                    className="
                      w-full h-10 rounded-lg px-4 flex items-center justify-center gap-2
                      bg-gradient-to-r from-purple-500 to-pink-500 text-white
                      hover:shadow-lg hover:scale-105
                      transition-all duration-200
                    "
                  >
                    <Play className="w-4 h-4" />
                    <span>播放</span>
                  </button>
                  <p className="text-xs text-slate-400">
                    Stagger animation on all cards
                  </p>
                </div>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid md:grid-cols-3 gap-8 p-12 bg-slate-50 rounded-3xl">
              <DynamicBorderlessCard
                title="项目.zip"
                subtitle="245 个文件"
                icon={FileArchive}
                iconColor="from-purple-400 to-purple-500"
                featherIntensity={featherIntensity}
                showBoundary={showBoundary}
                animationDelay={playAnimation ? 0 : 0}
              />
              <DynamicBorderlessCard
                title="备份.rar"
                subtitle="128 个文件"
                icon={Archive}
                iconColor="from-pink-400 to-pink-500"
                featherIntensity={featherIntensity}
                showBoundary={showBoundary}
                animationDelay={playAnimation ? 0.1 : 0}
              />
              <DynamicBorderlessCard
                title="文档.7z"
                subtitle="89 个文件"
                icon={FolderArchive}
                iconColor="from-orange-400 to-orange-500"
                featherIntensity={featherIntensity}
                showBoundary={showBoundary}
                animationDelay={playAnimation ? 0.2 : 0}
              />
              <DynamicBorderlessCard
                title="照片.zip"
                subtitle="512 个文件"
                icon={ImageIcon}
                iconColor="from-pink-400 to-rose-500"
                featherIntensity={featherIntensity}
                showBoundary={showBoundary}
                animationDelay={playAnimation ? 0.3 : 0}
              />
              <DynamicBorderlessCard
                title="代码.tar.gz"
                subtitle="1024 个文件"
                icon={Code}
                iconColor="from-cyan-400 to-blue-500"
                featherIntensity={featherIntensity}
                showBoundary={showBoundary}
                animationDelay={playAnimation ? 0.4 : 0}
              />
              <DynamicBorderlessCard
                title="视频.zip"
                subtitle="64 个文件"
                icon={Video}
                iconColor="from-purple-500 to-indigo-500"
                featherIntensity={featherIntensity}
                showBoundary={showBoundary}
                animationDelay={playAnimation ? 0.5 : 0}
              />
            </div>
          </div>
        </Section>

        {/* Technical Details */}
        <Section title="Technical Implementation" subtitle="技术实现">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Default State */}
            <TechCard
              title="DEFAULT STATE · 雾气态"
              color="cyan"
              specs={[
                "Radial gradient: Fade starts at 40%",
                "Backdrop blur: 20px",
                "Glow spread: 60px + 100px layers",
                "Corner radius: 24px (larger, softer)",
                "Visual footprint: ~450×370px",
                "Effect: Like mist, blends into background"
              ]}
            />

            {/* Hover State */}
            <TechCard
              title="HOVER STATE · 凝结态"
              color="purple"
              specs={[
                "Radial gradient: Fade starts at 70%",
                "Backdrop blur: 10px (reduced)",
                "Glow spread: 30px (focused)",
                "Corner radius: 16px (tighter)",
                "Transform: translateY(-4px)",
                "Effect: Condensed, clear boundaries"
              ]}
            />

            {/* Transition */}
            <TechCard
              title="TRANSITION · 过渡动画"
              color="orange"
              specs={[
                "Duration: 400ms",
                "Easing: cubic-bezier(0.34, 1.56, 0.64, 1)",
                "Animates: gradient, blur, shadow, radius",
                "Effect: Smooth mist → droplet transformation",
                "Feel: Organic, fluid, spring-like",
                "Like water vapor condensing!"
              ]}
            />

            {/* Content Layer */}
            <TechCard
              title="CONTENT LAYER · 内容层"
              color="green"
              specs={[
                "filter: blur(0px) explicitly set",
                "z-index: 10 (above feathered container)",
                "Text always sharp and readable",
                "Icons always crisp",
                "Contrast ratio: ≥4.5:1 maintained",
                "边缘如雾，核心如晶 principle!"
              ]}
            />
          </div>
        </Section>

        {/* Advanced Effects */}
        <Section title="Advanced Effects to Explore" subtitle="高级效果探索">
          <div className="grid md:grid-cols-4 gap-4">
            <EffectCard
              title="Colored Glow Bleed"
              description="Cyan glow bleeds into card edges on hover"
              effect="色彩渗透"
            />
            <EffectCard
              title="Depth Shift"
              description="Z-axis movement through fog on interaction"
              effect="深度位移"
            />
            <EffectCard
              title="Particle Emergence"
              description="Particles coalesce into card on hover"
              effect="粒子聚合"
            />
            <EffectCard
              title="Breathing Pulse"
              description="Gentle pulsing even in default state"
              effect="呼吸脉动"
            />
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

function TechCard({ 
  title, 
  color,
  specs 
}: { 
  title: string;
  color: 'cyan' | 'purple' | 'orange' | 'green';
  specs: string[];
}) {
  const colorMap = {
    cyan: {
      bg: 'rgba(6,182,212,0.08)',
      text: 'text-cyan-700',
      border: 'rgba(6,182,212,0.2)'
    },
    purple: {
      bg: 'rgba(167,139,250,0.08)',
      text: 'text-purple-700',
      border: 'rgba(167,139,250,0.2)'
    },
    orange: {
      bg: 'rgba(251,146,60,0.08)',
      text: 'text-orange-700',
      border: 'rgba(251,146,60,0.2)'
    },
    green: {
      bg: 'rgba(34,197,94,0.08)',
      text: 'text-green-700',
      border: 'rgba(34,197,94,0.2)'
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
      <h3 className={`text-sm font-medium mb-4 ${config.text}`}>{title}</h3>
      <ul className="space-y-2">
        {specs.map((spec, i) => (
          <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
            <span className="text-slate-400">•</span>
            <span>{spec}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EffectCard({ title, description, effect }: { title: string; description: string; effect: string }) {
  return (
    <motion.div
      className="p-4 rounded-xl bg-white/50 backdrop-blur-lg"
      style={{
        boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.06)'
      }}
      whileHover={{
        boxShadow: '0 0 0 1px rgba(6,182,212,0.2), 0 4px 16px rgba(0,0,0,0.06), 0 0 20px rgba(6,182,212,0.15)',
        y: -2
      }}
    >
      <h4 className="text-sm font-medium mb-1 text-slate-900">{title}</h4>
      <p className="text-xs text-slate-500 mb-2">{description}</p>
      <span className="text-xs text-cyan-600">{effect}</span>
    </motion.div>
  );
}
