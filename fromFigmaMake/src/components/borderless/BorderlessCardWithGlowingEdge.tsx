import { motion, useAnimation } from "motion/react";
import { LucideIcon, FileArchive } from "lucide-react";
import { useState, useEffect, useRef, CSSProperties } from "react";

interface BorderlessCardWithGlowingEdgeProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: { r: number; g: number; b: number };
  onClick?: () => void;
  className?: string;
}

// ==================== V1.8: Card with Glowing Edge ====================
// Based on CodePen Glowing Edge effect
// Mist state: Blue blurred edge (v1.7)
// Condensed state: Rainbow glowing edge following mouse position

export function BorderlessCardWithGlowingEdge({
  title,
  subtitle,
  icon: Icon = FileArchive,
  iconColor = { r: 167, g: 139, b: 250 },
  onClick,
  className = "",
}: BorderlessCardWithGlowingEdgeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [pointerAngle, setPointerAngle] = useState(0);
  const [pointerDistance, setPointerDistance] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const edgeControls = useAnimation();
  const { r, g, b } = iconColor;
  
  // Fixed parameters
  const params = {
    edgeLineWidth: 7,
    edgeBlurAmount: 12,
    glowSpread: 13,
    iconBackgroundBlur: 5.0,
    animationSpeed: 1000,
  };
  
  // Track mouse position (learn from CodePen)
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate angle (from center to mouse)
    const dx = x - centerX;
    const dy = y - centerY;
    const angleRad = Math.atan2(dy, dx);
    const angleDeg = angleRad * (180 / Math.PI) + 90;
    const normalizedAngle = angleDeg < 0 ? angleDeg + 360 : angleDeg;
    
    // Calculate distance to edge (0-1, closer to edge = higher value)
    const kx = dx !== 0 ? centerX / Math.abs(dx) : Infinity;
    const ky = dy !== 0 ? centerY / Math.abs(dy) : Infinity;
    const closeness = Math.max(0, Math.min(1, 1 / Math.min(kx, ky)));
    
    setPointerAngle(normalizedAngle);
    setPointerDistance(closeness);
  };
  
  // Edge line animation (mist ↔ condensed)
  useEffect(() => {
    if (isHovered) {
      // Condensed state: edge shrinks and disappears
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
      // Mist state: edge expands and appears
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
      {/* Layer 1: Rainbow glowing edge (condensed state) */}
      <motion.div
        animate={{
          opacity: isHovered ? Math.min(1, pointerDistance * 1.2 + 0.3) : 0,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeOut',
          delay: isHovered ? 0.3 : 0,  // Appear after blue edge disappears
        }}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '24px',
          padding: '1px',
          zIndex: 4,
          pointerEvents: 'none',
          // Rainbow gradient background (conic-gradient from CodePen)
          background: `
            conic-gradient(
              from 0deg at 50% 50%,
              rgba(6,182,212,0.9) 0deg,
              rgba(167,139,250,0.9) 60deg,
              rgba(244,114,182,0.9) 120deg,
              rgba(251,146,60,0.9) 180deg,
              rgba(34,197,94,0.9) 240deg,
              rgba(6,182,212,0.9) 300deg,
              rgba(6,182,212,0.9) 360deg
            )
          `,
          // Mask trick: only show 1px edge
          WebkitMask: `
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0)
          `,
          WebkitMaskComposite: 'xor',
          mask: `
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0)
          `,
          maskComposite: 'exclude',
          // Multi-layer glow effect (learn from CodePen)
          boxShadow: `
            0 0 2px 0px rgba(6,182,212,0.7),
            0 0 4px 1px rgba(167,139,250,0.5),
            0 0 8px 1px rgba(244,114,182,0.4),
            0 0 16px 2px rgba(251,146,60,0.3)
          `,
          filter: 'blur(0.5px)',
        }}
      >
        {/* Gradient following mouse angle */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '24px',
            background: `
              conic-gradient(
                from ${pointerAngle}deg at 50% 50%,
                transparent 0deg,
                transparent 20deg,
                rgba(6,182,212,0.9) 40deg,
                rgba(167,139,250,0.9) 80deg,
                rgba(244,114,182,0.9) 120deg,
                transparent 140deg,
                transparent 360deg
              )
            `,
            // Inherit mask from parent
            WebkitMask: 'inherit',
            mask: 'inherit',
          }}
        />
      </motion.div>
      
      {/* Layer 2: Blue blurred edge (mist state) */}
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
      
      {/* Layer 3: Main container + press state */}
      <motion.div
        animate={{
          filter: isPressed ? 'brightness(1.15)' : 'brightness(1.0)',
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
        } as CSSProperties}
      >
        {/* Content: Icon + Text (same as v1.7) */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          height: '100%',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          
          {/* Icon with colored background (double-layer) */}
          <div style={{ position: 'relative', width: '56px', height: '56px', pointerEvents: 'none' }}>
            {/* Layer 1: Color background (can blur) */}
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
            
            {/* Layer 2: White icon (always sharp) */}
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
