import { motion } from "motion/react";
import { DynamicBorderlessCardV4 } from "../components/borderless/DynamicBorderlessCardV4";
import { ArrowLeft, FileArchive, Image as ImageIcon, Archive, Folder, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

interface MultiLayerFeatherDemoProps {
  onBack?: () => void;
}

export default function MultiLayerFeatherDemo({ onBack }: MultiLayerFeatherDemoProps) {
  const [featherIntensity, setFeatherIntensity] = useState<'light' | 'medium' | 'heavy'>('medium');

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
              <h1 className="text-5xl mb-2">Multi-Layer Feathering</h1>
              <p className="text-xl text-slate-600">多层羽化结构 · Sharp Content in Feathered Glows</p>
              <p className="text-lg text-purple-600 mt-2">只有 SVG 和文字清晰，其他都是羽化光晕</p>
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
            <span className="text-cyan-600 font-medium">Key Insight:</span> Only SVG icons and text should be sharp. 
            Everything else (containers, colored backgrounds, glows) should be feathered! 
            This creates the perfect "crystal floating in fog" effect.
          </p>
        </motion.div>

        {/* Traditional vs Multi-Layer Comparison */}
        <Section title="Architecture Comparison" subtitle="结构对比">
          <div className="grid md:grid-cols-2 gap-16 p-16 bg-slate-50 rounded-3xl">
            {/* Traditional Approach */}
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-xl mb-2">❌ Traditional Icon Approach</h3>
                <p className="text-sm text-slate-500">Solid colored circle with sharp edges</p>
              </div>
              <div className="flex justify-center">
                <TraditionalIconCard />
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <p>• Solid purple circle (NOT feathered)</p>
                <p>• Sharp edges on background</p>
                <p>• Looks "placed" on card</p>
                <p>• Feels mechanical, not fluid</p>
              </div>
            </div>

            {/* Multi-Layer Approach */}
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-xl mb-2">✨ Multi-Layer Feather</h3>
                <p className="text-sm text-cyan-600 font-medium">Feathered glow with sharp icon</p>
              </div>
              <div className="flex justify-center">
                <DynamicBorderlessCardV4 
                  title="项目.zip"
                  subtitle="245 个文件"
                  icon={FileArchive}
                  iconColor={{ r: 167, g: 139, b: 250 }}
                  featherIntensity={featherIntensity}
                />
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <p>• Purple glow is feathered (radial gradient)</p>
                <p>• White SVG icon is crystal clear</p>
                <p>• Purple "bleeds" into background</p>
                <p>• Looks "floating" in atmosphere</p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-2 text-center">
            <p className="text-slate-600">✨ Notice: Only the white icon and text are sharp</p>
            <p className="text-slate-600">🎨 The colored backgrounds are feathered glows</p>
            <p className="text-slate-600">💧 Hover to see condensation effect</p>
          </div>
        </Section>

        {/* Feather Intensity Control */}
        <Section title="Feather Intensity Control" subtitle="羽化强度控制">
          <div className="space-y-8">
            {/* Control Panel */}
            <div className="p-8 rounded-2xl bg-white/50 backdrop-blur-xl">
              <h3 className="text-lg mb-6">Choose Feather Intensity</h3>
              <div className="flex gap-4">
                <IntensityButton
                  label="Light Feather"
                  subtitle="轻度羽化"
                  active={featherIntensity === 'light'}
                  onClick={() => setFeatherIntensity('light')}
                  specs={['Icon blur: 1px', 'Container blur: 15px', 'Subtle effect']}
                />
                <IntensityButton
                  label="Medium Feather"
                  subtitle="中度羽化 (推荐)"
                  active={featherIntensity === 'medium'}
                  onClick={() => setFeatherIntensity('medium')}
                  specs={['Icon blur: 3px', 'Container blur: 22px', 'Balanced']}
                  recommended
                />
                <IntensityButton
                  label="Heavy Feather"
                  subtitle="重度羽化"
                  active={featherIntensity === 'heavy'}
                  onClick={() => setFeatherIntensity('heavy')}
                  specs={['Icon blur: 5px', 'Container blur: 25px', 'Atmospheric']}
                />
              </div>
            </div>

            {/* Demo Grid with Intensity */}
            <div className="grid md:grid-cols-3 gap-12 p-12 bg-slate-50 rounded-3xl">
              <DynamicBorderlessCardV4
                title="项目.zip"
                subtitle="245 个文件"
                icon={FileArchive}
                iconColor={{ r: 167, g: 139, b: 250 }}
                featherIntensity={featherIntensity}
              />
              <DynamicBorderlessCardV4
                title="备份.rar"
                subtitle="128 个文件"
                icon={Archive}
                iconColor={{ r: 244, g: 114, b: 182 }}
                featherIntensity={featherIntensity}
              />
              <DynamicBorderlessCardV4
                title="文档.7z"
                subtitle="89 个文件"
                icon={Folder}
                iconColor={{ r: 251, g: 146, b: 60 }}
                featherIntensity={featherIntensity}
              />
            </div>
          </div>
        </Section>

        {/* Color Variations */}
        <Section title="Color Variations" subtitle="色彩变化">
          <div className="grid md:grid-cols-3 gap-12 p-12 bg-slate-50 rounded-3xl">
            <DynamicBorderlessCardV4
              title="照片.zip"
              subtitle="512 个文件"
              icon={ImageIcon}
              iconColor={{ r: 244, g: 114, b: 182 }} // pink
              featherIntensity={featherIntensity}
            />
            <DynamicBorderlessCardV4
              title="代码.tar.gz"
              subtitle="1024 个文件"
              icon={Archive}
              iconColor={{ r: 6, g: 182, b: 212 }} // cyan
              featherIntensity={featherIntensity}
            />
            <DynamicBorderlessCardV4
              title="成功"
              subtitle="操作完成"
              icon={CheckCircle}
              iconColor={{ r: 34, g: 197, b: 94 }} // green
              featherIntensity={featherIntensity}
            />
            <DynamicBorderlessCardV4
              title="文档"
              subtitle="156 个文件"
              icon={FileArchive}
              iconColor={{ r: 251, g: 146, b: 60 }} // orange
              featherIntensity={featherIntensity}
            />
            <DynamicBorderlessCardV4
              title="项目"
              subtitle="245 个文件"
              icon={Folder}
              iconColor={{ r: 167, g: 139, b: 250 }} // purple
              featherIntensity={featherIntensity}
            />
            <DynamicBorderlessCardV4
              title="错误"
              subtitle="操作失败"
              icon={XCircle}
              iconColor={{ r: 239, g: 68, b: 68 }} // red
              featherIntensity={featherIntensity}
            />
          </div>
        </Section>

        {/* Layer Structure Breakdown */}
        <Section title="Layer Structure" subtitle="层级结构解析">
          <div className="grid md:grid-cols-3 gap-6">
            <LayerCard
              number="1"
              title="Outer Container"
              subtitle="外层容器"
              color="cyan"
              specs={[
                "320×240px content area",
                "~460×380px visual footprint",
                "Radial gradient: white, heavily feathered",
                "backdrop-filter: blur(22px)",
                "Massive soft glow",
                "Fade starts at 35%"
              ]}
            />
            <LayerCard
              number="2"
              title="Icon Background"
              subtitle="图标背景"
              color="purple"
              specs={[
                "64×64px feathered glow",
                "Radial gradient: colored, semi-transparent",
                "filter: blur(3px) - the glow is blurred!",
                "NOT a solid circle",
                "Purple light surrounding icon",
                "box-shadow: extends beyond"
              ]}
            />
            <LayerCard
              number="3"
              title="Sharp Content"
              subtitle="清晰内容"
              color="green"
              specs={[
                "28×28px SVG icon",
                "filter: blur(0) !important",
                "White color, crisp edges",
                "Text: Inter font, sharp",
                "z-index: 10 (on top)",
                "Crystal clear throughout!"
              ]}
            />
          </div>
        </Section>

        {/* Technical Notes */}
        <Section title="Critical Implementation Notes" subtitle="关键实现要点">
          <div className="grid md:grid-cols-2 gap-6">
            <NoteCard
              title="✓ What Should Be Sharp"
              items={[
                "SVG icon paths (filter: blur(0))",
                "Text content (title + subtitle)",
                "Action buttons (if any)",
                "All typography elements",
                "Icon strokes and fills"
              ]}
              positive
            />
            <NoteCard
              title="✓ What Should Be Feathered"
              items={[
                "Card container (radial gradient)",
                "Icon background glow (blur(3px))",
                "Colored glows around icons",
                "Box shadows and halos",
                "All atmospheric effects"
              ]}
              positive
            />
            <NoteCard
              title="⚡ Hover State Changes"
              items={[
                "Container: Gradient tightens (35% → 70%)",
                "Container: Blur reduces (22px → 10px)",
                "Icon glow: Slightly tighter + less blur",
                "Shadow: Becomes more focused",
                "Border radius: 24px → 16px",
                "Content: Remains sharp (no change!)"
              ]}
            />
            <NoteCard
              title="🎯 Design Principle"
              items={[
                "边缘如雾 (Edges like fog)",
                "核心如晶 (Core like crystal)",
                "Only SVG + text sharp",
                "Everything else feathered",
                "Mist to droplet on hover",
                "Organic, fluid transformations"
              ]}
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

function TraditionalIconCard() {
  return (
    <motion.div
      className="w-80 h-60 rounded-2xl p-8 bg-white flex flex-col items-center justify-center"
      style={{
        boxShadow: '0 0 0 1px rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.08)'
      }}
      whileHover={{
        boxShadow: '0 0 0 1px rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.08), 0 0 30px rgba(6,182,212,0.15)',
        y: -4
      }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Solid purple circle - traditional approach */}
        <div 
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-500 flex items-center justify-center"
          style={{
            boxShadow: '0 4px 16px rgba(167,139,250,0.3)'
          }}
        >
          <FileArchive size={28} color="#ffffff" />
        </div>
        
        <div className="text-center">
          <h3 className="text-xl font-semibold text-slate-900 mb-1">
            项目.zip
          </h3>
          <p className="text-sm text-slate-600">
            245 个文件
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function IntensityButton({ 
  label, 
  subtitle, 
  active, 
  onClick,
  specs,
  recommended 
}: { 
  label: string; 
  subtitle: string; 
  active: boolean;
  onClick: () => void;
  specs: string[];
  recommended?: boolean;
}) {
  return (
    <motion.button
      className={`
        flex-1 p-6 rounded-xl text-left
        transition-all duration-200
        ${active 
          ? 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white' 
          : 'bg-white text-slate-900 hover:bg-slate-50'
        }
      `}
      style={{
        boxShadow: active
          ? '0 0 30px rgba(6,182,212,0.3), 0 8px 24px rgba(0,0,0,0.08)'
          : '0 0 0 1px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.06)'
      }}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {recommended && (
        <div className={`text-xs mb-2 ${active ? 'text-cyan-100' : 'text-cyan-600'}`}>
          ⭐ RECOMMENDED
        </div>
      )}
      <h4 className={`text-lg mb-1 ${active ? 'font-semibold' : 'font-medium'}`}>
        {label}
      </h4>
      <p className={`text-sm mb-3 ${active ? 'text-white/80' : 'text-slate-500'}`}>
        {subtitle}
      </p>
      <ul className="space-y-1">
        {specs.map((spec, i) => (
          <li key={i} className={`text-xs ${active ? 'text-white/70' : 'text-slate-400'}`}>
            • {spec}
          </li>
        ))}
      </ul>
    </motion.button>
  );
}

function LayerCard({ 
  number, 
  title, 
  subtitle, 
  color,
  specs 
}: { 
  number: string;
  title: string;
  subtitle: string;
  color: 'cyan' | 'purple' | 'green';
  specs: string[];
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
      <div className="flex items-center gap-3 mb-4">
        <div 
          className={`w-10 h-10 rounded-lg ${config.text} bg-white/50 flex items-center justify-center text-xl font-bold`}
        >
          {number}
        </div>
        <div>
          <h3 className={`text-lg font-medium ${config.text}`}>{title}</h3>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
      </div>
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

function NoteCard({ 
  title, 
  items,
  positive 
}: { 
  title: string;
  items: string[];
  positive?: boolean;
}) {
  return (
    <div
      className="p-6 rounded-xl backdrop-blur-lg"
      style={{
        background: positive
          ? 'radial-gradient(ellipse at center, rgba(34,197,94,0.08) 0%, transparent 100%)'
          : 'radial-gradient(ellipse at center, rgba(251,146,60,0.08) 0%, transparent 100%)',
        boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.08)'
      }}
    >
      <h3 className={`text-sm font-medium mb-4 ${positive ? 'text-green-700' : 'text-orange-700'}`}>
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
            <span className="text-slate-400">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
