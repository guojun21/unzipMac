import { motion, useAnimation } from "motion/react";
import { LucideIcon, FileArchive } from "lucide-react";
import { useState, useEffect, CSSProperties } from "react";

interface BorderlessCardProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: { r: number; g: number; b: number };
  onClick?: () => void;
  className?: string;
}

// ==================== V1.4: Component Library - Card ====================
// Fixed optimal parameters from v1.3
// NEW: Condensed edge keeps 1px (not 0px)
// NEW: Press state effect (brightness)

export function BorderlessCard({
  title,
  subtitle,
  icon: Icon = FileArchive,
  iconColor = { r: 167, g: 139, b: 250 },
  onClick,
  className = "",
}: BorderlessCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const edgeControls = useAnimation();
  const { r, g, b } = iconColor;
  
  // Fixed optimal parameters
  const params = {
    edgeLineWidth: 7,
    edgeBlurAmount: 12,
    glowSpread: 13,
    iconBackgroundBlur: 5.0,
    animationSpeed: 1000,
    condensedEdgeWidth: 1,  // NEW: Keep 1px edge in condensed state
  };

  // Edge line animation
  useEffect(() => {
    if (isHovered) {
      edgeControls.start({
        borderWidth: `${params.condensedEdgeWidth}px`,  // 7px → 1px (not 0!)
        filter: 'blur(0px)',                            // 12px → 0px
        borderColor: 'rgba(6,182,212,0.4)',             // Lighter color
        transition: {
          duration: params.animationSpeed / 1000,       // 1s
          ease: [0.34, 1.56, 0.64, 1],
        }
      });
    } else {
      edgeControls.start({
        borderWidth: `${params.edgeLineWidth}px`,       // 1px → 7px
        filter: `blur(${params.edgeBlurAmount}px)`,     // 0px → 12px
        borderColor: 'rgba(6,182,212,0.8)',             // Original color
        transition: {
          duration: params.animationSpeed / 1000,
          ease: [0.34, 1.56, 0.64, 1],
        }
      });
    }
  }, [isHovered, edgeControls]);

  return (
    <div 
      className={`relative flex items-center justify-center ${className}`}
      style={{ 
        width: '320px',
        height: '240px',
        padding: '0',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={onClick}
    >
      {/* Edge line layer */}
      <motion.div
        animate={edgeControls}
        initial={{
          borderWidth: `${params.edgeLineWidth}px`,
          filter: `blur(${params.edgeBlurAmount}px)`,
          borderColor: 'rgba(6,182,212,0.8)',
        }}
        style={{
          position: 'absolute',
          inset: 0,
          border: `${params.edgeLineWidth}px solid rgba(6,182,212,0.8)`,
          borderRadius: '24px',
          boxSizing: 'border-box',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />
      
      {/* Main container (static, but with press state) */}
      <motion.div
        animate={{
          // NEW: Press state - darken on click
          filter: isPressed ? 'brightness(0.92)' : 'brightness(1)',
        }}
        transition={{
          duration: 0.15,  // 150ms fast response
          ease: 'easeOut',
        }}
        style={{
          width: '320px',
          height: '240px',
          padding: '32px',
          position: 'relative',
          zIndex: 2,
          boxSizing: 'border-box',
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.65) 35%, rgba(255,255,255,0.3) 65%, rgba(255,255,255,0.1) 85%, rgba(255,255,255,0) 100%)',
          backdropFilter: 'blur(32px)',
          borderRadius: '24px',
          boxShadow: `0 0 15px ${params.glowSpread}px rgba(6,182,212,0.25)`,
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
          
          {/* Icon with colored background */}
          <div style={{ position: 'relative', width: '56px', height: '56px' }}>
            <motion.div
              animate={{
                filter: isHovered ? 'blur(0px)' : `blur(${params.iconBackgroundBlur}px)`,
                boxShadow: isHovered 
                  ? `0 0 20px rgba(${r},${g},${b},0.35)`
                  : `0 0 30px rgba(${r},${g},${b},0.25)`,
              }}
              transition={{ 
                duration: params.animationSpeed / 1000,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                position: 'absolute',
                background: `rgba(${r},${g},${b},1.0)`,
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
              {Icon && <Icon size={28} color="#ffffff" strokeWidth={2} />}
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
            {subtitle && (
              <p style={{ 
                fontSize: '14px', 
                color: '#64748b',
                lineHeight: 1.5,
              }}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
