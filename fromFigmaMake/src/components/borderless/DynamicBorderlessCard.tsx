import { motion } from "motion/react";
import { FileArchive, Download, Share2, Trash2, LucideIcon } from "lucide-react";
import { CSSProperties } from "react";

interface DynamicBorderlessCardProps {
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: string;
  onDownload?: () => void;
  onShare?: () => void;
  onDelete?: () => void;
  featherIntensity?: number; // 0-100, controls how much feathering
  showBoundary?: boolean; // debug mode
  animationDelay?: number; // for stagger animations
  className?: string;
}

export function DynamicBorderlessCard({
  title = "项目.zip",
  subtitle = "245 个文件",
  icon: Icon = FileArchive,
  iconColor = "from-purple-400 to-purple-500",
  onDownload,
  onShare,
  onDelete,
  featherIntensity = 100,
  showBoundary = false,
  animationDelay = 0,
  className = ""
}: DynamicBorderlessCardProps) {
  // Calculate dynamic CSS variables based on feather intensity
  const featherStart = 40 + (featherIntensity / 100) * 30; // 40-70%
  const featherBlur = 10 + (featherIntensity / 100) * 10; // 10-20px
  const glowSpread = 30 + (featherIntensity / 100) * 30; // 30-60px
  const edgeOpacity = 0.95 - (featherIntensity / 100) * 0.05; // 0.95-0.90

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: animationDelay
      }}
    >
      {/* Debug boundary guide */}
      {showBoundary && (
        <div className="absolute inset-0 border-2 border-dashed border-red-400 rounded-2xl pointer-events-none" />
      )}

      {/* Main card with dynamic borderless effect */}
      <motion.div
        className={`
          w-80 h-60 rounded-2xl p-6
          flex flex-col items-center justify-center
          cursor-pointer
          ${className}
        `}
        style={
          {
            '--feather-start': `${featherStart}%`,
            '--feather-blur': `${featherBlur}px`,
            '--glow-spread': `${glowSpread}px`,
            '--edge-opacity': edgeOpacity,
            background: `radial-gradient(ellipse at center,
              rgba(255,255,255,var(--edge-opacity)) 0%,
              rgba(255,255,255,calc(var(--edge-opacity) * 0.67)) var(--feather-start),
              rgba(255,255,255,0.25) 70%,
              rgba(255,255,255,0.08) 90%,
              rgba(255,255,255,0) 100%)`,
            backdropFilter: `blur(var(--feather-blur))`,
            boxShadow: `0 0 var(--glow-spread) rgba(6,182,212,0.08), 0 0 calc(var(--glow-spread) * 1.7) rgba(6,182,212,0.04)`
          } as CSSProperties
        }
        whileHover={{
          '--feather-start': '70%',
          '--feather-blur': '10px',
          '--glow-spread': '30px',
          '--edge-opacity': 0.95,
          y: -4,
          borderRadius: '16px',
          boxShadow: `0 0 0 1px rgba(6,182,212,0.15), 0 0 30px rgba(6,182,212,0.2), 0 16px 48px rgba(0,0,0,0.12)`
        }}
        transition={{
          duration: 0.4,
          ease: [0.34, 1.56, 0.64, 1] // fluid spring
        }}
      >
        {/* Content layer - ALWAYS SHARP */}
        <div 
          className="relative z-10 flex flex-col items-center justify-center text-center"
          style={{ filter: 'blur(0px)' }}
        >
          {/* Icon - SHARP */}
          <motion.div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${iconColor} flex items-center justify-center mb-4`}
            style={{
              boxShadow: '0 0 20px rgba(167,139,250,0.4), 0 4px 16px rgba(167,139,250,0.3)',
              filter: 'blur(0px)'
            }}
            whileHover={{ scale: 1.05 }}
          >
            <Icon className="w-6 h-6 text-white" style={{ filter: 'blur(0px)' }} />
          </motion.div>

          {/* Title - SHARP */}
          <h3 
            className="text-xl text-slate-900 mb-1"
            style={{ 
              filter: 'blur(0px)',
              fontWeight: 600,
              textShadow: 'none'
            }}
          >
            {title}
          </h3>

          {/* Subtitle - SHARP */}
          <p 
            className="text-sm text-slate-600 mb-4"
            style={{ filter: 'blur(0px)' }}
          >
            {subtitle}
          </p>

          {/* Gradient Divider */}
          <div
            className="w-full h-px mb-4"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(148,163,184,0.5) 50%, transparent 100%)',
              filter: 'blur(0px)'
            }}
          />

          {/* Action Buttons - SHARP */}
          <div className="flex items-center gap-2" style={{ filter: 'blur(0px)' }}>
            <ActionIconButton
              icon={<Download className="w-4 h-4" />}
              onClick={onDownload}
              aria-label="下载"
            />
            <ActionIconButton
              icon={<Share2 className="w-4 h-4" />}
              onClick={onShare}
              aria-label="分享"
            />
            <ActionIconButton
              icon={<Trash2 className="w-4 h-4" />}
              onClick={onDelete}
              aria-label="删除"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Small action button (always sharp)
function ActionIconButton({ 
  icon, 
  onClick,
  ...props 
}: { 
  icon: React.ReactNode;
  onClick?: () => void;
  'aria-label': string;
}) {
  return (
    <motion.button
      className="w-9 h-9 rounded-full backdrop-blur-[8px] flex items-center justify-center text-slate-600"
      style={{
        background: 'rgba(255,255,255,0.5)',
        boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.06)',
        filter: 'blur(0px)'
      }}
      whileHover={{
        background: 'rgba(6,182,212,0.1)',
        boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.06), 0 0 15px rgba(6,182,212,0.25)',
        color: 'rgb(6,182,212)',
        scale: 1.05
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      {...props}
    >
      {icon}
    </motion.button>
  );
}
