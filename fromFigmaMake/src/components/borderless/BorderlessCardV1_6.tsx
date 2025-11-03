import { motion, useAnimation } from "motion/react";
import { LucideIcon, FileArchive } from "lucide-react";
import { useState, useEffect, CSSProperties } from "react";

interface BorderlessCardV1_6Props {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: { r: number; g: number; b: number };
  onClick?: () => void;
  className?: string;
}

// ==================== V1.6: Card - Fixed Hover Leave ====================
// Fixed: onMouseLeave properly triggers and returns to mist state
// Key: Hover events on outermost div, all children pointerEvents: 'none'

export function BorderlessCardV1_6({
  title,
  subtitle,
  icon: Icon = FileArchive,
  iconColor = { r: 167, g: 139, b: 250 },
  onClick,
  className = "",
}: BorderlessCardV1_6Props) {
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
    condensedEdgeWidth: 1,
  };

  // Edge line animation
  useEffect(() => {
    if (isHovered) {
      // Condensed state (hover)
      edgeControls.start({
        borderWidth: `${params.condensedEdgeWidth}px`,
        filter: 'blur(0px)',
        borderColor: 'rgba(6,182,212,0.4)',
        transition: {
          duration: params.animationSpeed / 1000,
          ease: [0.34, 1.56, 0.64, 1],
        }
      });
      console.log('Edge: Condensed state (hover)');
    } else {
      // Mist state (not hover)
      edgeControls.start({
        borderWidth: `${params.edgeLineWidth}px`,
        filter: `blur(${params.edgeBlurAmount}px)`,
        borderColor: 'rgba(6,182,212,0.8)',
        transition: {
          duration: params.animationSpeed / 1000,
          ease: [0.34, 1.56, 0.64, 1],
        }
      });
      console.log('Edge: Mist state (not hover)');
    }
  }, [isHovered, edgeControls, params.animationSpeed, params.condensedEdgeWidth, params.edgeLineWidth, params.edgeBlurAmount]);

  return (
    // ✅ Hover events on outermost container
    <div 
      className={`relative flex items-center justify-center ${className}`}
      style={{ 
        width: '320px',
        height: '240px',
        padding: '0',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        console.log('Mouse Enter');
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
        console.log('Mouse Leave');
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={onClick}
    >
      {/* Edge line layer - ✅ pointerEvents: 'none' */}
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
          pointerEvents: 'none',  // ✅ Key!
        }}
      />
      
      {/* Main container - ✅ pointerEvents: 'none' */}
      <motion.div
        animate={{
          filter: isPressed ? 'brightness(0.92)' : 'brightness(1)',
        }}
        transition={{
          duration: 0.15,
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
          pointerEvents: 'none',  // ✅ Key!
        } as CSSProperties}
      >
        {/* Content - ✅ pointerEvents: 'none' */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          height: '100%',
          justifyContent: 'center',
          pointerEvents: 'none',  // ✅ Key!
        }}>
          
          {/* Icon with colored background */}
          <div style={{ position: 'relative', width: '56px', height: '56px', pointerEvents: 'none' }}>
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
                pointerEvents: 'none',
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
              pointerEvents: 'none',
            }}>
              {Icon && <Icon size={28} color="#ffffff" strokeWidth={2} />}
            </div>
          </div>
          
          {/* Text */}
          <div style={{ textAlign: 'center', pointerEvents: 'none' }}>
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
