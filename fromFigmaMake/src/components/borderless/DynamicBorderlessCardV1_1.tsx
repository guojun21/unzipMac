import { motion, useAnimation } from "motion/react";
import { LucideIcon, FileArchive } from "lucide-react";
import { useState, useEffect, CSSProperties } from "react";

interface CardV1_1Props {
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

// ==================== V1.1: Edge blur line animation ====================
// Mist state: thick cyan edge line with heavy blur
// Transition: line shrinks & blur removes → glow fades in (phased animation)
// Condensed state: sharp box-shadow glow

export function DynamicBorderlessCardV1_1({
  title = "项目.zip",
  subtitle = "245 个文件",
  icon: Icon = FileArchive,
  iconColor = { r: 167, g: 139, b: 250 },
  edgeLineWidth = 10,
  edgeBlurAmount = 18,
  glowSpread = 8,
  iconBackgroundBlur = 2,
  className = "",
}: CardV1_1Props) {
  const [isHovered, setIsHovered] = useState(false);
  const edgeControls = useAnimation();
  const glowControls = useAnimation();
  const { r, g, b } = iconColor;

  // Trigger phased animation when hover state changes
  useEffect(() => {
    if (isHovered) {
      // === Enter condensed state ===
      
      // Phase 1 (0-300ms): Line shrinks + blur removes
      edgeControls.start({
        borderWidth: '0px',           // 10px → 0px
        filter: 'blur(0px)',          // 18px → 0px
        opacity: 0,                   // 1 → 0
        transition: {
          duration: 0.3,
          ease: [0.34, 1.56, 0.64, 1]  // Spring easing
        }
      });
      
      // Phase 2 (300-400ms): Glow fades in
      setTimeout(() => {
        glowControls.start({
          opacity: 1,                 // 0 → 1
          boxShadow: `0 0 15px ${glowSpread}px rgba(6,182,212,0.25)`,
          transition: {
            duration: 0.1,
            ease: 'easeOut'
          }
        });
      }, 300);  // 300ms delay
      
    } else {
      // === Return to mist state ===
      
      // Phase 1 (0-100ms): Glow quickly disappears
      glowControls.start({
        opacity: 0,
        boxShadow: '0 0 0 0 rgba(6,182,212,0)',
        transition: {
          duration: 0.1,
          ease: 'easeIn'
        }
      });
      
      // Phase 2 (100-400ms): Line expands + blur appears
      setTimeout(() => {
        edgeControls.start({
          borderWidth: `${edgeLineWidth}px`,  // 0 → 10px
          filter: `blur(${edgeBlurAmount}px)`, // 0 → 18px
          opacity: 1,
          transition: {
            duration: 0.3,
            ease: [0.34, 1.56, 0.64, 1]
          }
        });
      }, 100);  // 100ms delay
    }
  }, [isHovered, edgeLineWidth, edgeBlurAmount, glowSpread, edgeControls, glowControls]);

  // Icon background variants
  const iconBackgroundVariants = {
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
  };

  return (
    <div 
      className={`relative ${className}`}
      style={{ padding: '80px', minHeight: '400px' }}  // Extra space for blur spread
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Layer 1: Thick cyan edge line (mist state, blurred) */}
      <motion.div
        animate={edgeControls}
        initial={{
          borderWidth: `${edgeLineWidth}px`,
          filter: `blur(${edgeBlurAmount}px)`,
          opacity: 1,
        }}
        style={{
          position: 'absolute',
          inset: 0,
          border: `${edgeLineWidth}px solid rgba(6,182,212,0.8)`,  // Thick cyan line
          borderRadius: '24px',
          zIndex: 3,  // Above container
          pointerEvents: 'none',
          boxSizing: 'border-box',
          // Key: Only this div has blur, doesn't affect other elements
        }}
      />
      
      {/* Layer 2: Condensed state glow (fades in/out) */}
      <motion.div
        animate={glowControls}
        initial={{
          opacity: 0,
          boxShadow: '0 0 0 0 rgba(6,182,212,0)',
        }}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: isHovered ? '16px' : '24px',
          zIndex: 1,
          pointerEvents: 'none',
          transition: 'border-radius 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      />
      
      {/* Layer 3: Main container (always sharp) */}
      <motion.div
        animate={isHovered ? "hover" : "default"}
        variants={{
          default: {
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.65) 35%, rgba(255,255,255,0.3) 65%, rgba(255,255,255,0.1) 85%, rgba(255,255,255,0) 100%)',
            backdropFilter: 'blur(32px)',
            borderRadius: '24px',
            y: 0,
          },
          hover: {
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.65) 70%, rgba(255,255,255,0.3) 90%, rgba(255,255,255,0.1) 97%, rgba(255,255,255,0) 100%)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            y: -4,
          }
        }}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          width: '320px',
          height: '240px',
          padding: '32px',
          position: 'relative',
          zIndex: 2,
        } as CSSProperties}
      >
        {/* Content area - completely unaffected by line blur */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          height: '100%',
          justifyContent: 'center',
        }}>
          
          {/* Purple icon background (same as v1.0) */}
          <div style={{ position: 'relative', width: '56px', height: '56px' }}>
            {/* Purple background layer */}
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
            
            {/* SVG icon - always sharp */}
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
