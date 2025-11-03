import { motion, useAnimation } from "motion/react";
import { LucideIcon, FileArchive } from "lucide-react";
import { useState, useEffect, useMemo, CSSProperties } from "react";

interface CardV1_2Props {
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: { r: number; g: number; b: number };
  edgeLineWidth?: number;
  edgeBlurAmount?: number;
  glowSpread?: number;
  iconBackgroundBlur?: number;
  className?: string;
}

// ==================== V1.2: Fixed size + Constant glow ====================
// Fix 1: Card size fixed at 320×240px (not enlarged by border)
// Fix 2: Glow always exists, no fade in/out (just covered by edge line)

export function DynamicBorderlessCardV1_2({
  title = "项目.zip",
  subtitle = "245 个文件",
  icon: Icon = FileArchive,
  iconColor = { r: 167, g: 139, b: 250 },
  edgeLineWidth = 10,
  edgeBlurAmount = 18,
  glowSpread = 8,
  iconBackgroundBlur = 2,
  className = "",
}: CardV1_2Props) {
  const [isHovered, setIsHovered] = useState(false);
  const edgeControls = useAnimation();
  const { r, g, b } = iconColor;

  // Trigger edge line animation when hover state changes
  useEffect(() => {
    if (isHovered) {
      // Enter condensed state: line shrinks + blur removes
      edgeControls.start({
        borderWidth: '0px',              // 10px → 0px (shrink & disappear)
        filter: 'blur(0px)',             // 18px → 0px (blur removes)
        transition: {
          duration: 0.3,                 // 300ms
          ease: [0.34, 1.56, 0.64, 1],  // Spring easing
        }
      });
    } else {
      // Return to mist state: line expands + blur appears
      edgeControls.start({
        borderWidth: `${edgeLineWidth}px`,   // 0 → 10px (expand)
        filter: `blur(${edgeBlurAmount}px)`, // 0 → 18px (blur appears)
        transition: {
          duration: 0.3,
          ease: [0.34, 1.56, 0.64, 1],
        }
      });
    }
  }, [isHovered, edgeLineWidth, edgeBlurAmount, edgeControls]);

  // Main container variants - GLOW ALWAYS EXISTS in both states!
  const containerVariants = useMemo(() => ({
    default: {
      background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.65) 35%, rgba(255,255,255,0.3) 65%, rgba(255,255,255,0.1) 85%, rgba(255,255,255,0) 100%)',
      backdropFilter: 'blur(32px)',
      borderRadius: '24px',
      y: 0,
      // Glow always exists! Just covered by blurred edge line
      boxShadow: `0 0 15px ${glowSpread}px rgba(6,182,212,0.25)`,
    },
    hover: {
      background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.65) 70%, rgba(255,255,255,0.3) 90%, rgba(255,255,255,0.1) 97%, rgba(255,255,255,0) 100%)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      y: -4,
      // Glow still exists, now visible (edge line disappeared)
      boxShadow: `0 0 15px ${glowSpread}px rgba(6,182,212,0.25)`,
    }
  }), [glowSpread]);

  // Icon background variants (same as v1.0)
  const iconBackgroundVariants = useMemo(() => ({
    default: {
      background: `rgba(${r},${g},${b},1.0)`,
      filter: `blur(${iconBackgroundBlur}px)`,
      boxShadow: `0 0 30px rgba(${r},${g},${b},0.25)`,
    },
    hover: {
      background: `rgba(${r},${g},${b},1.0)`,
      filter: 'blur(0px)',
      boxShadow: `0 0 20px rgba(${r},${g},${b},0.35)`,
    }
  }), [r, g, b, iconBackgroundBlur]);

  return (
    <div 
      className={`relative flex items-center justify-center ${className}`}
      style={{ 
        width: '320px',   // Fixed outer container size
        height: '240px',  // Fixed outer container size
        padding: '0',     // No padding, inner elements position themselves
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Layer 1: Thick cyan edge line (mist state, blurred) */}
      <motion.div
        animate={edgeControls}
        initial={{
          borderWidth: `${edgeLineWidth}px`,
          filter: `blur(${edgeBlurAmount}px)`,
        }}
        style={{
          position: 'absolute',
          // Key: inset: 0 makes it same size as container
          inset: 0,
          // Thick cyan border
          border: `${edgeLineWidth}px solid rgba(6,182,212,0.8)`,
          borderRadius: '24px',
          // box-sizing ensures border doesn't increase element size
          boxSizing: 'border-box',
          // Top layer, covers the glow below
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />
      
      {/* Layer 2: Main container (background gradient + backdrop-filter + glow) */}
      <motion.div
        animate={isHovered ? "hover" : "default"}
        variants={containerVariants}
        transition={{ 
          duration: 0.4, 
          ease: [0.34, 1.56, 0.64, 1]
        }}
        style={{
          // Fixed dimensions: 320×240px
          width: '320px',
          height: '240px',
          // Padding inside
          padding: '32px',
          position: 'relative',
          zIndex: 2,
          // Key: box-sizing makes padding not increase size
          boxSizing: 'border-box',
        } as CSSProperties}
      >
        {/* Content area */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          height: '100%',
          justifyContent: 'center',
        }}>
          
          {/* Purple icon section */}
          <div style={{ position: 'relative', width: '56px', height: '56px' }}>
            {/* Purple background layer (exactly same as v1.0) */}
            <motion.div
              animate={isHovered ? "hover" : "default"}
              variants={iconBackgroundVariants}
              transition={{ 
                duration: 0.4, 
                ease: [0.34, 1.56, 0.64, 1]
              }}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            />
            
            {/* SVG icon layer - always sharp */}
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
          
          {/* Text - always sharp */}
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: 600, 
              color: '#0f172a',
              marginBottom: '4px',
              lineHeight: 1.3,
            }}>
              {title}
            </h3>
            <p style={{ 
              fontSize: '14px', 
              color: '#64748b',
              lineHeight: 1.5,
            }}>
              {subtitle}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
