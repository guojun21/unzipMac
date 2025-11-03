import { motion, useAnimation } from "motion/react";
import { LucideIcon, FileArchive } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface BorderlessCardV2_4Props {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: { r: number; g: number; b: number };
  onClick?: () => void;
  className?: string;
}

// ==================== V2.4: Same as v2.3 (for light background) ====================
// brightness 1.15 + scale 0.96

export function BorderlessCardV2_4({
  title,
  subtitle,
  icon: Icon = FileArchive,
  iconColor = { r: 167, g: 139, b: 250 },
  onClick,
  className = "",
}: BorderlessCardV2_4Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [pointerAngle, setPointerAngle] = useState(45);
  const [pointerDistance, setPointerDistance] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const edgeControls = useAnimation();
  const { r, g, b } = iconColor;
  
  const params = {
    edgeLineWidth: 7,
    edgeBlurAmount: 12,
    glowSpread: 13,
    iconBackgroundBlur: 5.0,
    animationSpeed: 1000,
  };
  
  // Mouse tracking
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const dx = x - centerX;
    const dy = y - centerY;
    
    let angleRadians = 0;
    let angleDegrees = 0;
    if (dx !== 0 || dy !== 0) {
      angleRadians = Math.atan2(dy, dx);
      angleDegrees = angleRadians * (180 / Math.PI) + 90;
      if (angleDegrees < 0) {
        angleDegrees += 360;
      }
    }
    
    let k_x = Infinity;
    let k_y = Infinity;
    if (dx !== 0) {
      k_x = centerX / Math.abs(dx);
    }
    if (dy !== 0) {
      k_y = centerY / Math.abs(dy);
    }
    const closeness = Math.min(Math.max(1 / Math.min(k_x, k_y), 0), 1);
    
    setPointerAngle(angleDegrees);
    setPointerDistance(closeness);
  };
  
  const glowOpacity = Math.max(0, (pointerDistance - 0.3) / 0.7);
  const colorOpacity = Math.max(0, (pointerDistance - 0.5) / 0.5);
  
  // Edge animation (mist state)
  useEffect(() => {
    if (isHovered) {
      edgeControls.start({
        borderWidth: '1px',
        filter: 'blur(0px)',
        opacity: 0,
        transition: {
          duration: params.animationSpeed / 1000,
          ease: [0.34, 1.56, 0.64, 1],
        }
      });
    } else {
      edgeControls.start({
        borderWidth: `${params.edgeLineWidth}px`,
        filter: `blur(${params.edgeBlurAmount}px)`,
        opacity: 1,
        transition: {
          duration: params.animationSpeed / 1000,
          ease: [0.34, 1.56, 0.64, 1],
        }
      });
    }
  }, [isHovered, edgeControls, params.animationSpeed, params.edgeLineWidth, params.edgeBlurAmount]);
  
  return (
    <div 
      ref={cardRef}
      className={`relative ${className}`}
      style={{ 
        width: '320px',
        height: '240px',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onPointerMove={handlePointerMove}
      onClick={onClick}
    >
      {/* Layer 1: CodePen Mesh Gradient Border (condensed state) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '24px',
          border: '1px solid transparent',
          zIndex: 5,
          opacity: isHovered ? colorOpacity : 0,
          transition: 'opacity 0.25s ease-out',
          pointerEvents: 'none',
          background: `
            linear-gradient(rgba(255,255,255,0.95) 0 100%) padding-box,
            radial-gradient(at 80% 55%, hsla(268,100%,76%,1) 0px, transparent 50%) border-box,
            radial-gradient(at 69% 34%, hsla(349,100%,74%,1) 0px, transparent 50%) border-box,
            radial-gradient(at 8% 6%, hsla(136,100%,78%,1) 0px, transparent 50%) border-box,
            radial-gradient(at 41% 38%, hsla(192,100%,64%,1) 0px, transparent 50%) border-box,
            radial-gradient(at 86% 85%, hsla(186,100%,74%,1) 0px, transparent 50%) border-box,
            radial-gradient(at 82% 18%, hsla(52,100%,65%,1) 0px, transparent 50%) border-box,
            radial-gradient(at 51% 4%, hsla(12,100%,72%,1) 0px, transparent 50%) border-box,
            linear-gradient(#c299ff 0 100%) border-box
          `,
          WebkitMaskImage: `
            conic-gradient(
              from ${pointerAngle}deg at center,
              black 25%,
              transparent 40%,
              transparent 60%,
              black 75%
            )
          `,
          maskImage: `
            conic-gradient(
              from ${pointerAngle}deg at center,
              black 25%,
              transparent 40%,
              transparent 60%,
              black 75%
            )
          `,
        }}
      />
      
      {/* Layer 2: CodePen Glowing Edge (condensed state) */}
      <div
        style={{
          position: 'absolute',
          inset: '-40px',
          borderRadius: '24px',
          zIndex: 4,
          opacity: isHovered ? glowOpacity : 0,
          transition: 'opacity 0.25s ease-out',
          pointerEvents: 'none',
          mixBlendMode: 'plus-lighter',
          WebkitMaskImage: `
            conic-gradient(
              from ${pointerAngle}deg at center,
              black 2.5%,
              transparent 10%,
              transparent 90%,
              black 97.5%
            )
          `,
          maskImage: `
            conic-gradient(
              from ${pointerAngle}deg at center,
              black 2.5%,
              transparent 10%,
              transparent 90%,
              black 97.5%
            )
          `,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '40px',
            borderRadius: '24px',
            boxShadow: `
              inset 0 0 0 1px hsl(40deg 80% 80% / 100%),
              inset 0 0 1px 0 hsl(40deg 80% 80% / 60%),
              inset 0 0 3px 0 hsl(40deg 80% 80% / 50%),
              inset 0 0 6px 0 hsl(40deg 80% 80% / 40%),
              inset 0 0 15px 0 hsl(40deg 80% 80% / 30%),
              inset 0 0 25px 2px hsl(40deg 80% 80% / 20%),
              inset 0 0 50px 2px hsl(40deg 80% 80% / 10%),
              
              0 0 1px 0 hsl(40deg 80% 80% / 60%),
              0 0 3px 0 hsl(40deg 80% 80% / 50%),
              0 0 6px 0 hsl(40deg 80% 80% / 40%),
              0 0 15px 0 hsl(40deg 80% 80% / 30%),
              0 0 25px 2px hsl(40deg 80% 80% / 20%),
              0 0 50px 2px hsl(40deg 80% 80% / 10%)
            `,
          }}
        />
      </div>
      
      {/* Layer 3: Blue blurred edge (mist state) */}
      <motion.div
        animate={edgeControls}
        initial={{
          borderWidth: `${params.edgeLineWidth}px`,
          filter: `blur(${params.edgeBlurAmount}px)`,
          opacity: 1,
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
      
      {/* Layer 4: Main container + Press state */}
      <motion.div
        animate={{
          filter: isPressed ? 'brightness(1.15)' : 'brightness(1.0)',
          scale: isPressed ? 0.96 : 1.0,
        }}
        transition={{
          duration: 0.2,
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
          pointerEvents: 'none',
        }}
      >
        {/* Content: Icon + Text */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          height: '100%',
          justifyContent: 'center',
          pointerEvents: 'none',
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
