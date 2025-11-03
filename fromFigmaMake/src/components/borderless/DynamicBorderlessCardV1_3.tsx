import { motion, useAnimation } from "motion/react";
import { LucideIcon, FileArchive } from "lucide-react";
import { useState, useEffect, useMemo, CSSProperties } from "react";

interface CardV1_3Props {
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: { r: number; g: number; b: number };
  edgeLineWidth?: number;
  edgeBlurAmount?: number;
  glowSpread?: number;
  iconBackgroundBlur?: number;
  animationSpeed?: number;
  className?: string;
}

// ==================== V1.3: Static container + Animation speed control ====================
// Change 1: Main container is now completely static (regular div, no motion)
// Change 2: Only edge line animates (borderWidth + blur)
// Change 3: New animation speed slider (100-1000ms)

export function DynamicBorderlessCardV1_3({
  title = "项目.zip",
  subtitle = "245 个文件",
  icon: Icon = FileArchive,
  iconColor = { r: 167, g: 139, b: 250 },
  edgeLineWidth = 10,
  edgeBlurAmount = 18,
  glowSpread = 8,
  iconBackgroundBlur = 2,
  animationSpeed = 300,  // NEW: Controllable animation speed
  className = "",
}: CardV1_3Props) {
  const [isHovered, setIsHovered] = useState(false);
  const edgeControls = useAnimation();
  const { r, g, b } = iconColor;

  // Edge line animation (the ONLY outer animation)
  useEffect(() => {
    if (isHovered) {
      edgeControls.start({
        borderWidth: '0px',
        filter: 'blur(0px)',
        transition: {
          duration: animationSpeed / 1000,  // Convert ms to seconds
          ease: [0.34, 1.56, 0.64, 1],
        }
      });
    } else {
      edgeControls.start({
        borderWidth: `${edgeLineWidth}px`,
        filter: `blur(${edgeBlurAmount}px)`,
        transition: {
          duration: animationSpeed / 1000,
          ease: [0.34, 1.56, 0.64, 1],
        }
      });
    }
  }, [isHovered, edgeLineWidth, edgeBlurAmount, animationSpeed, edgeControls]);

  // Icon background animation (preserved from v1.0)
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
        width: '320px',
        height: '240px',
        padding: '0',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Layer 1: Edge line (ONLY outer layer with animation) */}
      <motion.div
        animate={edgeControls}
        initial={{
          borderWidth: `${edgeLineWidth}px`,
          filter: `blur(${edgeBlurAmount}px)`,
        }}
        style={{
          position: 'absolute',
          inset: 0,
          border: `${edgeLineWidth}px solid rgba(6,182,212,0.8)`,
          borderRadius: '24px',  // Fixed, never changes!
          boxSizing: 'border-box',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />
      
      {/* Layer 2: Main container (COMPLETELY STATIC - regular div, no animation!) */}
      <div
        style={{
          width: '320px',
          height: '240px',
          padding: '32px',
          position: 'relative',
          zIndex: 2,
          boxSizing: 'border-box',
          // All properties below are FIXED and NEVER change!
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.65) 35%, rgba(255,255,255,0.3) 65%, rgba(255,255,255,0.1) 85%, rgba(255,255,255,0) 100%)',
          backdropFilter: 'blur(32px)',  // Fixed 32px, never changes
          borderRadius: '24px',          // Fixed 24px, never changes
          transform: 'translateY(0)',    // Fixed position, never changes
          boxShadow: `0 0 15px ${glowSpread}px rgba(6,182,212,0.25)`,  // Constant glow
        } as CSSProperties}
      >
        {/* Content */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          height: '100%',
          justifyContent: 'center',
        }}>
          
          {/* Purple icon (animation preserved from v1.0) */}
          <div style={{ position: 'relative', width: '56px', height: '56px' }}>
            <motion.div
              animate={isHovered ? "hover" : "default"}
              variants={iconBackgroundVariants}
              transition={{ 
                duration: animationSpeed / 1000,  // Uses animation speed parameter
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
      </div>
    </div>
  );
}
