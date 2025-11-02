import { motion } from "motion/react";
import { LucideIcon, FileArchive } from "lucide-react";
import { CSSProperties } from "react";

interface DynamicBorderlessCardV4Props {
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: {
    r: number;
    g: number;
    b: number;
  };
  featherIntensity?: 'light' | 'medium' | 'heavy';
  animationDelay?: number;
  className?: string;
}

export function DynamicBorderlessCardV4({
  title = "项目.zip",
  subtitle = "245 个文件",
  icon: Icon = FileArchive,
  iconColor = { r: 167, g: 139, b: 250 }, // purple by default
  featherIntensity = 'medium',
  animationDelay = 0,
  className = ""
}: DynamicBorderlessCardV4Props) {
  // Feather intensity configurations
  const intensityConfig = {
    light: {
      iconGlowBlur: 1,
      iconGlowOpacity: 0.3,
      iconGlowSize: 60,
      containerBlur: 15,
      containerGlowSpread: 50,
      containerGlowSpreadOuter: 90
    },
    medium: {
      iconGlowBlur: 3,
      iconGlowOpacity: 0.35,
      iconGlowSize: 64,
      containerBlur: 22,
      containerGlowSpread: 70,
      containerGlowSpreadOuter: 110
    },
    heavy: {
      iconGlowBlur: 5,
      iconGlowOpacity: 0.4,
      iconGlowSize: 68,
      containerBlur: 25,
      containerGlowSpread: 85,
      containerGlowSpreadOuter: 130
    }
  };

  const config = intensityConfig[featherIntensity];
  const { r, g, b } = iconColor;

  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: animationDelay
      }}
    >
      {/* LAYER 1: OUTER CONTAINER - Heavily Feathered */}
      <motion.div
        className={`
          w-80 h-60 rounded-3xl p-8
          flex flex-col items-center justify-center
          cursor-pointer
          ${className}
        `}
        style={{
          background: `radial-gradient(ellipse at center,
            rgba(255,255,255,0.9) 0%,
            rgba(255,255,255,0.6) 35%,
            rgba(255,255,255,0.3) 60%,
            rgba(255,255,255,0.1) 85%,
            rgba(255,255,255,0) 100%)`,
          backdropFilter: `blur(${config.containerBlur}px)`,
          boxShadow: `0 0 ${config.containerGlowSpread}px rgba(6,182,212,0.06), 0 0 ${config.containerGlowSpreadOuter}px rgba(6,182,212,0.03)`
        }}
        whileHover={{
          background: `radial-gradient(ellipse at center,
            rgba(255,255,255,0.95) 0%,
            rgba(255,255,255,0.85) 70%,
            rgba(255,255,255,0.4) 90%,
            rgba(255,255,255,0) 100%)`,
          backdropFilter: 'blur(10px)',
          boxShadow: '0 0 0 1px rgba(6,182,212,0.15), 0 0 30px rgba(6,182,212,0.2), 0 16px 48px rgba(0,0,0,0.12)',
          borderRadius: '16px',
          y: -4
        }}
        transition={{
          duration: 0.4,
          ease: [0.34, 1.56, 0.64, 1]
        }}
      >
        {/* Content wrapper */}
        <div className="flex flex-col items-center gap-4">
          
          {/* Icon section */}
          <div className="relative">
            {/* LAYER 2: ICON BACKGROUND - Feathered Colored Glow (NOT solid!) */}
            <motion.div
              className="rounded-2xl flex items-center justify-center"
              style={{
                width: `${config.iconGlowSize}px`,
                height: `${config.iconGlowSize}px`,
                background: `radial-gradient(circle at center,
                  rgba(${r},${g},${b},${config.iconGlowOpacity}) 0%,
                  rgba(${r},${g},${b},${config.iconGlowOpacity * 0.57}) 40%,
                  rgba(${r},${g},${b},${config.iconGlowOpacity * 0.23}) 70%,
                  rgba(${r},${g},${b},0) 100%)`,
                filter: `blur(${config.iconGlowBlur}px)`,
                boxShadow: `0 0 30px rgba(${r},${g},${b},0.25)`
              }}
              whileHover={{
                filter: 'blur(1px)',
                width: '56px',
                height: '56px',
                background: `radial-gradient(circle at center,
                  rgba(${r},${g},${b},0.5) 0%,
                  rgba(${r},${g},${b},0.3) 40%,
                  rgba(${r},${g},${b},0.12) 70%,
                  rgba(${r},${g},${b},0) 100%)`
              }}
              transition={{
                duration: 0.4,
                ease: [0.34, 1.56, 0.64, 1]
              }}
            >
              {/* LAYER 3: SHARP SVG ICON - Crystal Clear! */}
              <Icon 
                size={28}
                color="#ffffff"
                strokeWidth={2}
                style={{ 
                  filter: 'blur(0px)',
                  position: 'relative',
                  zIndex: 10
                }}
              />
            </motion.div>
          </div>

          {/* LAYER 3: SHARP TEXT - Crystal Clear! */}
          <div 
            className="text-center"
            style={{ 
              filter: 'blur(0px)',
              position: 'relative',
              zIndex: 10
            }}
          >
            <h3 
              style={{ 
                fontSize: '20px',
                fontWeight: 600,
                color: '#0f172a',
                lineHeight: 1.3,
                marginBottom: '4px',
                textShadow: 'none'
              }}
            >
              {title}
            </h3>
            <p 
              style={{
                fontSize: '14px',
                color: '#64748b',
                lineHeight: 1.5
              }}
            >
              {subtitle}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
