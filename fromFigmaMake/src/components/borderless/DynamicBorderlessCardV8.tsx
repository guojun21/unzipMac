import { motion } from "motion/react";
import { LucideIcon, FileArchive } from "lucide-react";
import { useState, CSSProperties, useMemo } from "react";

interface CardV8Props {
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

// ==================== SOLUTION A: filter: blur() ====================
// Uses filter instead of backdrop-filter to blur the glow itself

export function DynamicBorderlessCardV8A({
  title = "项目.zip",
  subtitle = "245 个文件",
  icon: Icon = FileArchive,
  iconColor = { r: 167, g: 139, b: 250 },
  iconBackgroundBlur = 2,
  glowSpread = 70,
  glowBlurAmount = 8,
  className = "",
}: CardV8Props) {
  const [isHovered, setIsHovered] = useState(false);
  const { r, g, b } = iconColor;

  // Outer layer variants - uses filter to blur EVERYTHING including glow
  const outerVariants = useMemo(() => ({
    default: {
      filter: `blur(${glowBlurAmount}px)`,  // Blurs the whole element including box-shadow!
      boxShadow: `0 0 ${glowSpread}px rgba(6,182,212,0.15), 0 0 ${glowSpread + 40}px rgba(6,182,212,0.08)`,
      borderRadius: '24px',
      y: 0,
    },
    hover: {
      filter: 'blur(0px)',
      boxShadow: '0 0 30px rgba(6,182,212,0.25), 0 16px 48px rgba(0,0,0,0.1)',
      borderRadius: '16px',
      y: -4,
    }
  }), [glowBlurAmount, glowSpread]);

  const iconBackgroundVariants = useMemo(() => ({
    default: {
      background: `rgba(${r},${g},${b},1.0)`,
      filter: `blur(${iconBackgroundBlur}px)`,
      boxShadow: `0 0 ${glowSpread}px rgba(${r},${g},${b},0.25)`,
    },
    hover: {
      background: `rgba(${r},${g},${b},1.0)`,
      filter: 'blur(0px)',
      boxShadow: `0 0 20px rgba(${r},${g},${b},0.3)`,
    }
  }), [r, g, b, iconBackgroundBlur, glowSpread]);

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer blur wrapper - blurs EVERYTHING including box-shadow */}
      <motion.div
        className={`w-80 h-60 cursor-pointer ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={false}
        animate={isHovered ? "hover" : "default"}
        variants={outerVariants}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.65) 35%, rgba(255,255,255,0.3) 65%, rgba(255,255,255,0.1) 85%, rgba(255,255,255,0) 100%)',
          padding: '32px',
          position: 'relative',
        } as CSSProperties}
      >
        {/* Inner content wrapper - cancels parent blur to stay sharp */}
        <div
          style={{
            filter: 'blur(0)',
            WebkitFilter: 'blur(0)',
            transform: 'translateZ(0)', // Creates new stacking context
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            height: '100%',
            justifyContent: 'center'
          }}
        >
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

// ==================== SOLUTION B: Double-layer glow ====================
// Separate glow layer that can be blurred independently

export function DynamicBorderlessCardV8B({
  title = "项目.zip",
  subtitle = "245 个文件",
  icon: Icon = FileArchive,
  iconColor = { r: 167, g: 139, b: 250 },
  iconBackgroundBlur = 2,
  containerBackdropBlur = 32,
  glowSpread = 70,
  glowBlurAmount = 12,
  className = "",
}: CardV8Props) {
  const [isHovered, setIsHovered] = useState(false);
  const { r, g, b } = iconColor;

  // Glow layer variants
  const glowLayerVariants = useMemo(() => ({
    default: {
      filter: `blur(${glowBlurAmount}px)`,
      opacity: 0.8,
      scale: 1.2,
    },
    hover: {
      filter: 'blur(2px)',
      opacity: 1,
      scale: 1,
    }
  }), [glowBlurAmount]);

  // Container variants - uses backdrop-filter
  const containerVariants = useMemo(() => ({
    default: {
      backdropFilter: `blur(${containerBackdropBlur}px)`,
      boxShadow: `0 0 ${glowSpread * 0.4}px rgba(6,182,212,0.1)`,
      borderRadius: '24px',
      y: 0,
    },
    hover: {
      backdropFilter: 'blur(10px)',
      boxShadow: '0 0 0 1px rgba(6,182,212,0.12), 0 0 25px rgba(6,182,212,0.15), 0 16px 48px rgba(0,0,0,0.1)',
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
      boxShadow: `0 0 20px rgba(${r},${g},${b},0.3)`,
    }
  }), [r, g, b, iconBackgroundBlur, glowSpread]);

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow layer - can be blurred independently */}
      <motion.div
        initial={false}
        animate={isHovered ? "hover" : "default"}
        variants={glowLayerVariants}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          position: 'absolute',
          inset: '-100px',
          background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, rgba(6,182,212,0.06) 40%, transparent 70%)',
          borderRadius: '50%',
          zIndex: -2,
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
          zIndex: -1,
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

// ==================== SOLUTION C: Pseudo-element glow ====================
// Uses CSS for glow layer (simplified version without pseudo-element due to React constraints)

export function DynamicBorderlessCardV8C({
  title = "项目.zip",
  subtitle = "245 个文件",
  icon: Icon = FileArchive,
  iconColor = { r: 167, g: 139, b: 250 },
  iconBackgroundBlur = 2,
  containerBackdropBlur = 32,
  glowSpread = 70,
  glowBlurAmount = 10,
  className = "",
}: CardV8Props) {
  const [isHovered, setIsHovered] = useState(false);
  const { r, g, b } = iconColor;

  // Pseudo-element-like glow layer
  const pseudoGlowVariants = useMemo(() => ({
    default: {
      filter: `blur(${glowBlurAmount}px)`,
      opacity: 0.7,
    },
    hover: {
      filter: 'blur(3px)',
      opacity: 0.9,
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
      boxShadow: '0 0 0 1px rgba(6,182,212,0.12), 0 16px 48px rgba(0,0,0,0.1)',
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
      boxShadow: `0 0 20px rgba(${r},${g},${b},0.3)`,
    }
  }), [r, g, b, iconBackgroundBlur, glowSpread]);

  return (
    <div className="relative flex items-center justify-center">
      {/* Pseudo-element-like glow */}
      <motion.div
        initial={false}
        animate={isHovered ? "hover" : "default"}
        variants={pseudoGlowVariants}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          position: 'absolute',
          inset: '-80px',
          background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(6,182,212,0.08) 50%, transparent 70%)',
          borderRadius: '50%',
          zIndex: -3,
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
          zIndex: -1,
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
