import { motion } from "motion/react";
import { FileArchive, ArrowLeft } from "lucide-react";
import { useMemo } from "react";

interface AdvancedFeatheringTechniquesProps {
  onBack?: () => void;
}

export default function AdvancedFeatheringTechniques({ onBack }: AdvancedFeatheringTechniquesProps) {
  return (
    <div className="min-h-screen bg-slate-100 py-12 px-8">
      <div className="max-w-[1800px] mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-5xl mb-2">Advanced Feathering Techniques</h1>
              <p className="text-xl text-slate-600">高级羽化技术 · 边缘如雾，核心如晶</p>
              <p className="text-lg text-purple-600 mt-2">Edges like fog, Core like crystal</p>
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
            Exploring advanced techniques for creating truly borderless components. The critical principle: 
            <span className="text-purple-600 font-medium"> content remains crystal-clear while edges dissolve into atmosphere.</span>
          </p>
        </motion.div>

        {/* Core Techniques Grid */}
        <Section title="Core Techniques" subtitle="核心技术 (1-6)">
          <div className="grid grid-cols-3 gap-16 p-16 bg-slate-50 rounded-3xl">
            {/* Technique 1 */}
            <TechniqueWrapper title="巨量径向羽化" subtitle="Massive Radial Feather">
              <MassiveRadialFeather />
            </TechniqueWrapper>

            {/* Technique 2 */}
            <TechniqueWrapper title="多层光晕" subtitle="Layered Glow Halos">
              <LayeredGlowHalos />
            </TechniqueWrapper>

            {/* Technique 3 */}
            <TechniqueWrapper title="高斯羽化遮罩" subtitle="Gaussian Feather Mask">
              <GaussianFeatherMask />
            </TechniqueWrapper>

            {/* Technique 4 */}
            <TechniqueWrapper title="双层结构" subtitle="Double Layer (Fog + Crystal)">
              <DoubleLayer />
            </TechniqueWrapper>

            {/* Technique 5 */}
            <TechniqueWrapper title="光环效果" subtitle="Glow Aura + Sharp Core">
              <GlowAura />
            </TechniqueWrapper>

            {/* Technique 6 */}
            <TechniqueWrapper title="粒子场边缘" subtitle="Particle Field Edges">
              <ParticleFieldEdges />
            </TechniqueWrapper>
          </div>

          {/* Interactive Notes */}
          <div className="mt-8 space-y-2 text-center">
            <p className="text-slate-600">💧 Hover over each card to see which feels most 'fluid' and 'boundless'</p>
            <p className="text-slate-600">🔬 All have sharp content but dissolved edges</p>
            <p className="text-slate-600">✨ Which creates the best 'crystal in fog' effect?</p>
          </div>
        </Section>

        {/* Extreme Versions */}
        <Section title="Extreme Versions" subtitle="极致版本">
          <div className="grid grid-cols-2 gap-16 p-16 bg-slate-50 rounded-3xl">
            {/* Ultra Version */}
            <TechniqueWrapper title="超极致版" subtitle="Ultra Version" extreme>
              <UltraVersion />
            </TechniqueWrapper>

            {/* Pure Aura Version */}
            <TechniqueWrapper title="纯光环版" subtitle="Pure Aura Version" extreme>
              <PureAuraVersion />
            </TechniqueWrapper>
          </div>

          <div className="mt-8 space-y-2 text-center">
            <p className="text-purple-600 font-medium">⚡ These versions push feathering to the absolute limit</p>
            <p className="text-slate-600">Visual spread: 500-600px | Glow radius: 150-200px | Multiple colored layers</p>
          </div>
        </Section>

        {/* Analysis */}
        <Section title="Technical Analysis" subtitle="技术分析">
          <div className="grid md:grid-cols-3 gap-6">
            <AnalysisCard
              title="✓ Sharp Content Methods"
              items={[
                "Apply filter: blur(0) explicitly to content",
                "Use double-layer structure (blur only outer)",
                "CSS mask for container opacity fade",
                "Pseudo-elements for glows (z-index: -1)",
                "Separate particle layers from content"
              ]}
              color="cyan"
            />
            <AnalysisCard
              title="⚡ Extreme Feathering Methods"
              items={[
                "Radial gradients with 80-200px spread",
                "Multiple layered box-shadows",
                "Backdrop-filter blur (20-40px)",
                "CSS masks with gradient opacity",
                "Pseudo-element glow halos"
              ]}
              color="purple"
            />
            <AnalysisCard
              title="🎯 Best Practices"
              items={[
                "Start fade at 20-30% of radius",
                "Use 3-4 glow layers for depth",
                "Keep content contrast ratio ≥4.5:1",
                "Test on multiple backgrounds",
                "Animate glows on interaction"
              ]}
              color="orange"
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

function TechniqueWrapper({ 
  title, 
  subtitle, 
  children,
  extreme 
}: { 
  title: string; 
  subtitle: string; 
  children: React.ReactNode;
  extreme?: boolean;
}) {
  return (
    <div className="space-y-4">
      <div className="text-center">
        {extreme && <div className="text-xs text-purple-600 font-medium mb-1">⚡ EXTREME</div>}
        <h3 className="text-lg mb-1">{title}</h3>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
      <div className="flex justify-center items-center min-h-[400px]">
        {children}
      </div>
    </div>
  );
}

// Card Content Component (reusable sharp content)
function CardContent() {
  return (
    <div className="flex flex-col items-center justify-center text-center" style={{ filter: 'blur(0px)' }}>
      {/* Purple Icon with Glow - SHARP */}
      <div
        className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-500 flex items-center justify-center mb-4"
        style={{
          boxShadow: '0 0 20px rgba(167,139,250,0.4), 0 4px 16px rgba(167,139,250,0.3)',
          filter: 'blur(0px)'
        }}
      >
        <FileArchive className="w-6 h-6 text-white" style={{ filter: 'blur(0px)' }} />
      </div>

      {/* Text - SHARP */}
      <h3 className="text-xl text-slate-900 mb-1 font-semibold" style={{ filter: 'blur(0px)' }}>
        项目.zip
      </h3>
      <p className="text-sm text-slate-600" style={{ filter: 'blur(0px)' }}>
        245 个文件
      </p>
    </div>
  );
}

// Technique 1: Massive Radial Feather
function MassiveRadialFeather() {
  return (
    <motion.div
      className="w-80 h-60 rounded-2xl p-6 backdrop-blur-[20px]"
      style={{
        background: `radial-gradient(ellipse at center,
          rgba(255,255,255,0.95) 0%,
          rgba(255,255,255,0.6) 25%,
          rgba(255,255,255,0.25) 50%,
          rgba(255,255,255,0.08) 75%,
          rgba(255,255,255,0) 100%)`,
        boxShadow: '0 0 80px rgba(6,182,212,0.08), 0 0 120px rgba(6,182,212,0.04)'
      }}
      whileHover={{
        boxShadow: '0 0 100px rgba(6,182,212,0.12), 0 0 160px rgba(6,182,212,0.06)',
        y: -4
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <CardContent />
    </motion.div>
  );
}

// Technique 2: Layered Glow Halos
function LayeredGlowHalos() {
  return (
    <div className="relative">
      {/* Outer glow halo */}
      <div
        className="absolute rounded-3xl"
        style={{
          inset: '-80px',
          background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 80%)',
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }}
      />
      
      {/* Main card */}
      <motion.div
        className="relative w-80 h-60 rounded-2xl p-6"
        style={{
          background: 'rgba(255,255,255,0.95)',
          boxShadow: `
            0 0 40px rgba(6,182,212,0.15),
            0 0 80px rgba(6,182,212,0.10),
            0 0 120px rgba(6,182,212,0.06),
            0 0 160px rgba(6,182,212,0.03)
          `
        }}
        whileHover={{
          boxShadow: `
            0 0 50px rgba(6,182,212,0.2),
            0 0 100px rgba(6,182,212,0.15),
            0 0 150px rgba(6,182,212,0.08),
            0 0 200px rgba(6,182,212,0.04)
          `,
          y: -4
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <CardContent />
      </motion.div>
    </div>
  );
}

// Technique 3: Gaussian Feather Mask
function GaussianFeatherMask() {
  return (
    <motion.div
      className="w-80 h-60 rounded-2xl p-6 bg-white"
      style={{
        maskImage: `radial-gradient(ellipse at center,
          black 0%,
          black 40%,
          rgba(0,0,0,0.6) 70%,
          rgba(0,0,0,0.2) 90%,
          transparent 100%)`,
        WebkitMaskImage: `radial-gradient(ellipse at center,
          black 0%,
          black 40%,
          rgba(0,0,0,0.6) 70%,
          rgba(0,0,0,0.2) 90%,
          transparent 100%)`,
        boxShadow: '0 0 60px rgba(6,182,212,0.15), 0 0 100px rgba(6,182,212,0.08)'
      }}
      whileHover={{
        boxShadow: '0 0 80px rgba(6,182,212,0.2), 0 0 130px rgba(6,182,212,0.12)',
        y: -4
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <CardContent />
    </motion.div>
  );
}

// Technique 4: Double Layer (Fog + Crystal)
function DoubleLayer() {
  return (
    <div className="relative">
      {/* Background fog layer */}
      <div
        className="absolute w-[400px] h-80 rounded-3xl"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.8) 0%, transparent 100%)',
          filter: 'blur(30px)',
          boxShadow: '0 0 100px rgba(6,182,212,0.1)',
          pointerEvents: 'none'
        }}
      />

      {/* Foreground content layer */}
      <motion.div
        className="relative w-80 h-60 rounded-2xl p-6"
        style={{
          background: 'rgba(255,255,255,0.9)',
          boxShadow: '0 0 0 1px rgba(0,0,0,0.03)'
        }}
        whileHover={{
          boxShadow: '0 0 0 1px rgba(0,0,0,0.03), 0 0 50px rgba(6,182,212,0.15)',
          y: -4
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <CardContent />
      </motion.div>
    </div>
  );
}

// Technique 5: Glow Aura + Sharp Core
function GlowAura() {
  return (
    <div className="relative">
      {/* Inner glow - ::before */}
      <div
        className="absolute rounded-3xl"
        style={{
          inset: '-60px',
          background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)',
          filter: 'blur(50px)',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />

      {/* Outer aura - ::after */}
      <div
        className="absolute rounded-[100px]"
        style={{
          inset: '-100px',
          background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 80%)',
          filter: 'blur(60px)',
          zIndex: -2,
          pointerEvents: 'none'
        }}
      />

      {/* Core card */}
      <motion.div
        className="relative w-80 h-60 rounded-2xl p-6"
        style={{
          background: 'rgba(255,255,255,0.95)',
          zIndex: 1
        }}
        whileHover={{
          y: -4
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <CardContent />
      </motion.div>
    </div>
  );
}

// Technique 6: Particle Field Edges
function ParticleFieldEdges() {
  const particles = useMemo(() => {
    const result = [];
    const cardWidth = 320;
    const cardHeight = 240;
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const distance = 20 + Math.random() * 80;
      const size = 2 + Math.random() * 4;
      const opacity = 0.1 + Math.random() * 0.3;
      
      const x = cardWidth / 2 + Math.cos(angle) * (cardWidth / 2 + distance);
      const y = cardHeight / 2 + Math.sin(angle) * (cardHeight / 2 + distance);

      result.push({ x, y, size, opacity, id: i });
    }
    return result;
  }, []);

  return (
    <div className="relative">
      {/* Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-cyan-500"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            filter: 'blur(2px)'
          }}
          animate={{
            opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Core card */}
      <motion.div
        className="relative w-80 h-60 rounded-2xl p-6 bg-white"
        style={{
          boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.08)'
        }}
        whileHover={{
          boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.08), 0 0 50px rgba(6,182,212,0.15)',
          y: -4
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <CardContent />
      </motion.div>
    </div>
  );
}

// Extreme 1: Ultra Version
function UltraVersion() {
  return (
    <div className="relative">
      {/* Multi-colored glow layers */}
      <div
        className="absolute rounded-[120px]"
        style={{
          inset: '-150px',
          background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />
      <div
        className="absolute rounded-[120px]"
        style={{
          inset: '-180px',
          background: 'radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 75%)',
          filter: 'blur(90px)',
          zIndex: -2,
          pointerEvents: 'none'
        }}
      />
      <div
        className="absolute rounded-[140px]"
        style={{
          inset: '-220px',
          background: 'radial-gradient(circle, rgba(244,114,182,0.06) 0%, transparent 80%)',
          filter: 'blur(100px)',
          zIndex: -3,
          pointerEvents: 'none'
        }}
      />

      {/* Core card with extreme radial gradient */}
      <motion.div
        className="relative w-80 h-60 rounded-2xl p-6 backdrop-blur-[30px]"
        style={{
          background: `radial-gradient(ellipse at center,
            rgba(255,255,255,1.0) 0%,
            rgba(255,255,255,0.5) 20%,
            rgba(255,255,255,0.2) 40%,
            rgba(255,255,255,0.08) 60%,
            rgba(255,255,255,0) 100%)`,
          boxShadow: '0 0 100px rgba(6,182,212,0.12), 0 0 160px rgba(6,182,212,0.08)',
          zIndex: 1
        }}
        whileHover={{
          boxShadow: '0 0 130px rgba(6,182,212,0.18), 0 0 200px rgba(6,182,212,0.12)',
          y: -4
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <CardContent />
      </motion.div>
    </div>
  );
}

// Extreme 2: Pure Aura Version
function PureAuraVersion() {
  return (
    <div className="relative">
      {/* Massive outer glow */}
      <div
        className="absolute rounded-[150px]"
        style={{
          inset: '-200px',
          background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, rgba(6,182,212,0.06) 50%, transparent 100%)',
          filter: 'blur(100px)',
          pointerEvents: 'none'
        }}
      />

      {/* Almost transparent card floating in pure light */}
      <motion.div
        className="relative w-80 h-60 rounded-2xl p-6"
        style={{
          background: 'rgba(255,255,255,0.5)',
          backdropFilter: 'blur(40px)',
          boxShadow: '0 0 150px rgba(6,182,212,0.12)'
        }}
        whileHover={{
          background: 'rgba(255,255,255,0.6)',
          boxShadow: '0 0 180px rgba(6,182,212,0.15)',
          y: -4
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <CardContent />
      </motion.div>
    </div>
  );
}

function AnalysisCard({ 
  title, 
  items,
  color 
}: { 
  title: string; 
  items: string[];
  color: 'cyan' | 'purple' | 'orange';
}) {
  const colorMap = {
    cyan: {
      bg: 'rgba(6,182,212,0.1)',
      text: 'text-cyan-700'
    },
    purple: {
      bg: 'rgba(167,139,250,0.1)',
      text: 'text-purple-700'
    },
    orange: {
      bg: 'rgba(251,146,60,0.1)',
      text: 'text-orange-700'
    }
  };

  const config = colorMap[color];

  return (
    <div
      className="p-6 rounded-2xl backdrop-blur-xl"
      style={{
        background: `radial-gradient(ellipse at center, ${config.bg} 0%, transparent 100%)`,
        boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.08)'
      }}
    >
      <h3 className={`text-lg mb-4 ${config.text}`}>{title}</h3>
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
