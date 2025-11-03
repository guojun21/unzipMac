import { motion } from "motion/react";
import { LucideIcon, FileArchive } from "lucide-react";
import { useState, CSSProperties, useMemo } from "react";

interface CardV1Props {
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: { r: number; g: number; b: number };
  iconBackgroundBlur?: number;
  containerBlur?: number;
  glowSpread?: number;
  glowIntensity?: number;
  className?: string;
}

// ==================== V1.0: Edge-hugging glow ====================
// Glow tightly follows container edges via box-shadow spread parameter
// Blur applied to entire container+glow unit

export function DynamicBorderlessCardV1({
  title = "项目.zip",
  subtitle = "245 个文件",
  icon: Icon = FileArchive,
  iconColor = { r: 167, g: 139, b: 250 },
  iconBackgroundBlur = 2,
  containerBlur = 6,
  glowSpread = 20,
  glowIntensity = 0.15,
  className = "",
}: CardV1Props) {
  const [isHovered, setIsHovered] = useState(false);
  const { r, g, b } = iconColor;

  // Container variants - glow via box-shadow, blur on whole unit
  const containerVariants = useMemo(() => ({
    default: {
      background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.65) 35%, rgba(255,255,255,0.3) 65%, rgba(255,255,255,0.1) 85%, rgba(255,255,255,0) 100%)',
      // Edge-hugging glow: blur spread outward from edge
      boxShadow: `0 0 ${glowSpread}px ${glowSpread * 0.3}px rgba(6,182,212,${glowIntensity})`,
      //          x y  blur    spread (outward expansion)
      // Blur applied to entire container + glow
      filter: `blur(${containerBlur}px)`,
      borderRadius: '24px',
      y: 0,
    },
    hover: {
      background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.75) 35%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0.15) 85%, rgba(255,255,255,0) 100%)',
      // Tighter glow on hover
      boxShadow: `0 0 15px 8px rgba(6,182,212,${Math.min(glowIntensity + 0.05, 0.3)}), 0 16px 48px rgba(0,0,0,0.12)`,
      filter: 'blur(0px)',  // Sharp edges
      borderRadius: '16px',
      y: -4,
    }
  }), [containerBlur, glowSpread, glowIntensity]);

  // Icon background variants
  const iconBackgroundVariants = useMemo(() => ({
    default: {
      background: `rgba(${r},${g},${b},1.0)`,
      filter: `blur(${iconBackgroundBlur}px)`,
      boxShadow: `0 0 40px rgba(${r},${g},${b},0.25)`,
    },
    hover: {
      background: `rgba(${r},${g},${b},1.0)`,
      filter: 'blur(0px)',
      boxShadow: `0 0 20px rgba(${r},${g},${b},0.35)`,
    }
  }), [r, g, b, iconBackgroundBlur]);

  return (
    <div className="relative flex items-center justify-center" style={{ minHeight: '300px' }}>
      {/* Single container - glow via box-shadow */}
      <motion.div
        className={`w-80 h-60 cursor-pointer ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={false}
        animate={isHovered ? "hover" : "default"}
        variants={containerVariants}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          padding: '32px',
          position: 'relative',
        } as CSSProperties}
      >
        {/* Content layer - stays sharp via separate stacking context */}
        <div style={{
          filter: 'blur(0)',
          WebkitFilter: 'blur(0)',
          transform: 'translateZ(0)',  // Creates new stacking context
          willChange: 'transform',
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          height: '100%',
          justifyContent: 'center'
        }}>
          {/* Icon section */}
          <div style={{ position: 'relative', width: '56px', height: '56px' }}>
            <motion.div
              animate={isHovered ? "hover" : "default"}
              variants={iconBackgroundVariants}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            />
            
            <div style={{
              width: '56px',
              height: '56px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 10,
            }}>
              <Icon size={28} color="#ffffff" strokeWidth={2} />
            </div>
          </div>

          {/* Text */}
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
              {title}
            </h3>
            <p style={{ fontSize: '14px', color: '#64748b' }}>
              {subtitle}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
