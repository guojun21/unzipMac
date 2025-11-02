import { motion } from "motion/react";
import { LucideIcon, FileArchive } from "lucide-react";
import { useState, CSSProperties, useMemo } from "react";

interface CardV9Props {
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: { r: number; g: number; b: number };
  iconBackgroundBlur?: number;
  containerBackdropBlur?: number;
  glowSpread?: number;
  glowBlurAmount?: number;
  className?: string;
}

// ==================== SOLUTION B: Double-layer glow (FIXED) ====================
// Independent glow layer that can be blurred - WITH VISIBILITY FIXES

export function DynamicBorderlessCardV9B({
  title = "项目.zip",
  subtitle = "245 个文件",
  icon: Icon = FileArchive,
  iconColor = { r: 167, g: 139, b: 250 },
  iconBackgroundBlur = 2,
  containerBackdropBlur = 32,
  glowSpread = 70,
  glowBlurAmount = 12,
  className = "",
}: CardV9Props) {
  const [isHovered, setIsHovered] = useState(false);
  const { r, g, b } = iconColor;

  // Glow layer variants - FIXED: higher opacity, proper positioning
  const glowLayerVariants = useMemo(() => ({
    default: {
      filter: `blur(${glowBlurAmount}px)`,
      opacity: 1,  // FIXED: was 0.8
      scale: 1,
    },
    hover: {
      filter: 'blur(2px)',
      opacity: 1,
      scale: 0.95,
    }
  }), [glowBlurAmount]);

  // Container variants
  const containerVariants = useMemo(() => ({
    default: {
      backdropFilter: `blur(${containerBackdropBlur}px)`,
      boxShadow: `0 0 ${glowSpread * 0.4}px rgba(6,182,212,0.12)`,
      borderRadius: '24px',
      y: 0,
    },
    hover: {
      backdropFilter: 'blur(10px)',
      boxShadow: '0 0 0 1px rgba(6,182,212,0.15), 0 0 25px rgba(6,182,212,0.2), 0 16px 48px rgba(0,0,0,0.12)',
      borderRadius: '16px',
      y: -4,
    }
  }), [containerBackdropBlur, glowSpread]);

  const iconBackgroundVariants = useMemo(() => ({
    default: {
      background: `rgba(${r},${g},${b},1.0)`,
      filter: `blur(${iconBackgroundBlur}px)`,
      boxShadow: `0 0 ${glowSpread}px rgba(${r},${g},${b},0.25)`,
    },
    hover: {
      background: `rgba(${r},${g},${b},1.0)`,
      filter: 'blur(0px)',
      boxShadow: `0 0 20px rgba(${r},${g},${b},0.35)`,
    }
  }), [r, g, b, iconBackgroundBlur, glowSpread]);

  return (
    <div className="relative flex items-center justify-center" style={{ minHeight: '300px' }}>
      {/* Outer glow layer - FIXED: increased color intensity, positive z-index */}
      <motion.div
        initial={false}
        animate={isHovered ? "hover" : "default"}
        variants={glowLayerVariants}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          position: 'absolute',
          width: '500px',
          height: '400px',
          // FIXED: Much stronger colors - was rgba(6,182,212,0.12)
          background: 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, rgba(6,182,212,0.2) 30%, rgba(6,182,212,0.12) 50%, rgba(6,182,212,0.05) 70%, transparent 85%)',
          borderRadius: '50%',
          zIndex: 1,  // FIXED: was -2, now positive
          pointerEvents: 'none',
        }}
      />

      {/* Main container */}
      <motion.div
        className={`w-80 h-60 cursor-pointer ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={false}
        animate={isHovered ? "hover" : "default"}
        variants={containerVariants}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.65) 35%, rgba(255,255,255,0.3) 65%, rgba(255,255,255,0.1) 85%, rgba(255,255,255,0) 100%)',
          padding: '32px',
          position: 'relative',
          zIndex: 2,  // FIXED: was -1, above glow layer
        } as CSSProperties}
      >
        <div style={{
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

// ==================== SOLUTION C: Pseudo-element-like glow (FIXED) ====================
// Separate blurred glow layer - WITH VISIBILITY FIXES

export function DynamicBorderlessCardV9C({
  title = "项目.zip",
  subtitle = "245 个文件",
  icon: Icon = FileArchive,
  iconColor = { r: 167, g: 139, b: 250 },
  iconBackgroundBlur = 2,
  containerBackdropBlur = 32,
  glowSpread = 70,
  glowBlurAmount = 10,
  className = "",
}: CardV9Props) {
  const [isHovered, setIsHovered] = useState(false);
  const { r, g, b } = iconColor;

  // Pseudo-element-like glow layer variants - FIXED
  const pseudoGlowVariants = useMemo(() => ({
    default: {
      filter: `blur(${glowBlurAmount}px)`,
      opacity: 1,  // FIXED: was 0.7
      scale: 1.1,
    },
    hover: {
      filter: 'blur(3px)',
      opacity: 1,  // FIXED: was 0.9
      scale: 1,
    }
  }), [glowBlurAmount]);

  const containerVariants = useMemo(() => ({
    default: {
      backdropFilter: `blur(${containerBackdropBlur}px)`,
      borderRadius: '24px',
      y: 0,
    },
    hover: {
      backdropFilter: 'blur(10px)',
      boxShadow: '0 0 0 1px rgba(6,182,212,0.15), 0 16px 48px rgba(0,0,0,0.12)',
      borderRadius: '16px',
      y: -4,
    }
  }), [containerBackdropBlur]);

  const iconBackgroundVariants = useMemo(() => ({
    default: {
      background: `rgba(${r},${g},${b},1.0)`,
      filter: `blur(${iconBackgroundBlur}px)`,
      boxShadow: `0 0 ${glowSpread}px rgba(${r},${g},${b},0.25)`,
    },
    hover: {
      background: `rgba(${r},${g},${b},1.0)`,
      filter: 'blur(0px)',
      boxShadow: `0 0 20px rgba(${r},${g},${b},0.35)`,
    }
  }), [r, g, b, iconBackgroundBlur, glowSpread]);

  return (
    <div className="relative flex items-center justify-center" style={{ minHeight: '300px' }}>
      {/* Pseudo-element-like glow - FIXED: stronger colors, positive z-index */}
      <motion.div
        initial={false}
        animate={isHovered ? "hover" : "default"}
        variants={pseudoGlowVariants}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          position: 'absolute',
          width: '450px',
          height: '380px',
          // FIXED: Much stronger colors - was rgba(6,182,212,0.15)
          background: 'radial-gradient(circle, rgba(6,182,212,0.35) 0%, rgba(6,182,212,0.22) 35%, rgba(6,182,212,0.12) 55%, rgba(6,182,212,0.05) 75%, transparent 90%)',
          borderRadius: '50%',
          zIndex: 1,  // FIXED: was -3, now positive
          pointerEvents: 'none',
        }}
      />

      {/* Main container */}
      <motion.div
        className={`w-80 h-60 cursor-pointer ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={false}
        animate={isHovered ? "hover" : "default"}
        variants={containerVariants}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.65) 35%, rgba(255,255,255,0.3) 65%, rgba(255,255,255,0.1) 85%, rgba(255,255,255,0) 100%)',
          padding: '32px',
          position: 'relative',
          zIndex: 2,  // FIXED: was -1, above glow layer
        } as CSSProperties}
      >
        <div style={{
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
