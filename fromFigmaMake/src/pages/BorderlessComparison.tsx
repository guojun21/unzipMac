import { motion } from "motion/react";
import { FileArchive, ArrowLeft } from "lucide-react";

interface BorderlessComparisonProps {
  onBack?: () => void;
}

export default function BorderlessComparison({ onBack }: BorderlessComparisonProps) {
  return (
    <div className="min-h-screen bg-slate-100 py-12 px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-5xl mb-2">01 · Feather Intensity Study</h1>
              <p className="text-xl text-slate-600">羽化强度研究 · Finding the Perfect Edge Softness</p>
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
          <p className="text-slate-500 max-w-3xl">
            Exploring 4 progressive levels of edge feathering - from clear boundaries to fog-like atmospheric effects.
            The goal: components that feel truly borderless, like water vapor blending into air.
          </p>
        </motion.div>

        {/* Card Comparison */}
        <Section title="Card Feathering Levels" subtitle="卡片羽化等级">
          <div className="grid grid-cols-2 gap-12 p-12 bg-slate-50 rounded-3xl">
            {/* Card 1: Conservative */}
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-xl mb-1">保守版 - Conservative</h3>
                <p className="text-sm text-slate-500">Clear boundaries, just no border line</p>
                <p className="text-xs text-cyan-600 mt-2">边界明确</p>
              </div>
              <FeatherCard level="conservative" />
            </div>

            {/* Card 2: Moderate */}
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-xl mb-1">中度羽化 - Moderate Feather</h3>
                <p className="text-sm text-slate-500">Edges start fading earlier</p>
                <p className="text-xs text-cyan-600 mt-2">边界柔化</p>
              </div>
              <FeatherCard level="moderate" />
            </div>

            {/* Card 3: Heavy */}
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-xl mb-1">重度羽化 - Heavy Feather</h3>
                <p className="text-sm text-slate-500">Truly bleeding into background</p>
                <p className="text-xs text-orange-600 mt-2">边界模糊</p>
              </div>
              <FeatherCard level="heavy" />
            </div>

            {/* Card 4: Extreme */}
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-xl mb-1">极致羽化 - Extreme Feather</h3>
                <p className="text-sm text-slate-500">Almost invisible edges, pure atmosphere</p>
                <p className="text-xs text-purple-600 mt-2">边界消失</p>
              </div>
              <FeatherCard level="extreme" />
            </div>
          </div>

          {/* Notes */}
          <div className="mt-8 space-y-2 text-center">
            <p className="text-slate-600">✨ Hover over each card to see glow intensity</p>
            <p className="text-slate-600">💧 Which version feels most like 'water vapor' or 'mist'?</p>
            <p className="text-slate-600">🎯 Which edges feel most 'unlimited' and 'free'?</p>
          </div>
        </Section>

        {/* Button Comparison */}
        <Section title="Button Feathering Levels" subtitle="按钮羽化等级">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-12 bg-slate-50 rounded-3xl">
            {/* Button 1: Conservative */}
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg mb-1">Conservative</h3>
                <p className="text-xs text-cyan-600">边界明确</p>
              </div>
              <div className="flex justify-center">
                <FeatherButton level="conservative" />
              </div>
            </div>

            {/* Button 2: Moderate */}
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg mb-1">Moderate</h3>
                <p className="text-xs text-cyan-600">边界柔化</p>
              </div>
              <div className="flex justify-center">
                <FeatherButton level="moderate" />
              </div>
            </div>

            {/* Button 3: Heavy */}
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg mb-1">Heavy</h3>
                <p className="text-xs text-orange-600">边界模糊</p>
              </div>
              <div className="flex justify-center">
                <FeatherButton level="heavy" />
              </div>
            </div>

            {/* Button 4: Extreme */}
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg mb-1">Extreme</h3>
                <p className="text-xs text-purple-600">边界消失</p>
              </div>
              <div className="flex justify-center">
                <FeatherButton level="extreme" />
              </div>
            </div>
          </div>
        </Section>

        {/* Analysis */}
        <Section title="Design Analysis" subtitle="设计分析">
          <div className="grid md:grid-cols-2 gap-6">
            <AnalysisCard
              title="✓ Sweet Spot Criteria"
              items={[
                "Components feel truly borderless and free",
                "Content is still readable (contrast ≥4.5:1)",
                "Visual hierarchy is maintained",
                "Looks innovative, not broken",
                "Feels like liquid or vapor, not solid"
              ]}
              positive
            />
            <AnalysisCard
              title="⚠️ Balance Considerations"
              items={[
                "Too conservative → feels like traditional bordered cards",
                "Too extreme → content becomes hard to read",
                "Too much blur → loses crisp typography",
                "Need different levels for different contexts",
                "Interactive elements need more clarity"
              ]}
            />
          </div>
        </Section>

        {/* Recommendations */}
        <Section title="Recommendations" subtitle="建议">
          <div className="p-8 rounded-2xl bg-white/50 backdrop-blur-xl space-y-4">
            <div className="grid md:grid-cols-3 gap-6">
              <RecommendCard
                level="Moderate Feather"
                useCase="Primary Cards & Content"
                reason="Best balance: feels borderless but maintains readability"
                recommended
              />
              <RecommendCard
                level="Heavy Feather"
                useCase="Background Elements & Overlays"
                reason="Creates atmospheric depth without competing with content"
              />
              <RecommendCard
                level="Conservative"
                useCase="Interactive Components & Forms"
                reason="Maintains clear affordances for user interaction"
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

function FeatherCard({ level }: { level: 'conservative' | 'moderate' | 'heavy' | 'extreme' }) {
  const configs = {
    conservative: {
      background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 70%, rgba(255,255,255,0.3) 90%, rgba(255,255,255,0) 100%)',
      backdropBlur: 'blur(8px)',
      boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.08)',
      hoverShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.08), 0 0 30px rgba(6,182,212,0.25)',
      filter: 'none',
      opacity: 1
    },
    moderate: {
      background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.3) 80%, rgba(255,255,255,0) 100%)',
      backdropBlur: 'blur(15px)',
      boxShadow: '0 0 30px rgba(6,182,212,0.2)',
      hoverShadow: '0 0 50px rgba(6,182,212,0.3), 0 0 80px rgba(6,182,212,0.15)',
      filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.8))',
      opacity: 1
    },
    heavy: {
      background: 'radial-gradient(ellipse at center, rgba(255,255,255,1.0) 0%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0.2) 70%, rgba(255,255,255,0) 100%)',
      backdropBlur: 'blur(25px)',
      boxShadow: '0 0 50px rgba(6,182,212,0.15), 0 0 80px rgba(6,182,212,0.08)',
      hoverShadow: '0 0 70px rgba(6,182,212,0.25), 0 0 120px rgba(6,182,212,0.12)',
      filter: 'blur(3px)',
      opacity: 1
    },
    extreme: {
      background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 30%, rgba(255,255,255,0.15) 60%, rgba(255,255,255,0) 100%)',
      backdropBlur: 'blur(30px)',
      boxShadow: '0 0 60px rgba(6,182,212,0.12), 0 0 100px rgba(6,182,212,0.06)',
      hoverShadow: '0 0 80px rgba(6,182,212,0.2), 0 0 140px rgba(6,182,212,0.1)',
      filter: 'blur(5px)',
      opacity: 0.95
    }
  };

  const config = configs[level];
  const isExtreme = level === 'extreme';

  const cardContent = (
    <motion.div
      className="w-80 h-60 rounded-2xl p-6 flex flex-col items-center justify-center text-center mx-auto"
      style={{
        background: config.background,
        backdropFilter: config.backdropBlur,
        boxShadow: config.boxShadow,
        filter: config.filter,
        opacity: config.opacity
      }}
      whileHover={{
        boxShadow: config.hoverShadow,
        y: -4
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
    >
      {/* Purple Icon with Glow */}
      <div
        className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-500 flex items-center justify-center mb-4"
        style={{
          boxShadow: '0 0 20px rgba(167,139,250,0.4), 0 4px 16px rgba(167,139,250,0.3)'
        }}
      >
        <FileArchive className="w-6 h-6 text-white" />
      </div>

      {/* Text */}
      <h3 className="text-xl text-slate-900 mb-1">项目.zip</h3>
      <p className="text-sm text-slate-600">245 个文件</p>
    </motion.div>
  );

  // Extreme version: wrap in fog layer
  if (isExtreme) {
    return (
      <div className="relative">
        {/* Fog layer extending beyond card */}
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
            filter: 'blur(40px)',
            transform: 'scale(1.3)',
            pointerEvents: 'none'
          }}
        />
        {cardContent}
      </div>
    );
  }

  return cardContent;
}

function FeatherButton({ level }: { level: 'conservative' | 'moderate' | 'heavy' | 'extreme' }) {
  const configs = {
    conservative: {
      boxShadow: '0 0 20px rgba(6,182,212,0.3), 0 0 40px rgba(6,182,212,0.15)',
      hoverShadow: '0 0 30px rgba(6,182,212,0.4), 0 0 60px rgba(6,182,212,0.2)',
      filter: 'none',
      opacity: 1
    },
    moderate: {
      boxShadow: '0 0 30px rgba(6,182,212,0.35), 0 0 50px rgba(6,182,212,0.2)',
      hoverShadow: '0 0 45px rgba(6,182,212,0.45), 0 0 75px rgba(6,182,212,0.25)',
      filter: 'drop-shadow(0 0 15px rgba(6,182,212,0.3))',
      opacity: 1
    },
    heavy: {
      boxShadow: '0 0 40px rgba(6,182,212,0.4), 0 0 60px rgba(6,182,212,0.25)',
      hoverShadow: '0 0 60px rgba(6,182,212,0.5), 0 0 90px rgba(6,182,212,0.3)',
      filter: 'blur(2px)',
      opacity: 1
    },
    extreme: {
      boxShadow: '0 0 50px rgba(6,182,212,0.35), 0 0 80px rgba(6,182,212,0.2)',
      hoverShadow: '0 0 70px rgba(6,182,212,0.45), 0 0 110px rgba(6,182,212,0.25)',
      filter: 'blur(4px)',
      opacity: 0.95
    }
  };

  const config = configs[level];

  return (
    <motion.button
      className="h-12 px-6 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 text-white text-sm font-medium"
      style={{
        boxShadow: config.boxShadow,
        filter: config.filter,
        opacity: config.opacity
      }}
      whileHover={{
        boxShadow: config.hoverShadow,
        y: -2
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25
      }}
    >
      上传
    </motion.button>
  );
}

function AnalysisCard({ title, items, positive }: { title: string; items: string[]; positive?: boolean }) {
  return (
    <div
      className="p-6 rounded-2xl backdrop-blur-xl"
      style={{
        background: positive
          ? 'radial-gradient(ellipse at center, rgba(6,182,212,0.1) 0%, rgba(6,182,212,0.05) 70%, rgba(6,182,212,0) 100%)'
          : 'radial-gradient(ellipse at center, rgba(251,146,60,0.1) 0%, rgba(251,146,60,0.05) 70%, rgba(251,146,60,0) 100%)',
        boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.08)'
      }}
    >
      <h3 className={`text-lg mb-4 ${positive ? 'text-cyan-700' : 'text-orange-700'}`}>{title}</h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
            <span className="text-slate-400">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RecommendCard({ level, useCase, reason, recommended }: { level: string; useCase: string; reason: string; recommended?: boolean }) {
  return (
    <div
      className="p-6 rounded-xl backdrop-blur-lg"
      style={{
        background: recommended
          ? 'radial-gradient(ellipse at center, rgba(6,182,212,0.15) 0%, rgba(6,182,212,0.08) 70%, rgba(6,182,212,0) 100%)'
          : 'radial-gradient(ellipse at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.5) 70%, rgba(255,255,255,0) 100%)',
        boxShadow: recommended
          ? '0 0 30px rgba(6,182,212,0.2)'
          : '0 0 0 1px rgba(0,0,0,0.05), 0 8px 16px rgba(0,0,0,0.06)'
      }}
    >
      {recommended && <div className="text-xs text-cyan-600 font-medium mb-2">⭐ RECOMMENDED</div>}
      <h3 className="text-lg mb-2">{level}</h3>
      <p className="text-sm text-slate-600 mb-3">{useCase}</p>
      <p className="text-xs text-slate-500">{reason}</p>
    </div>
  );
}
