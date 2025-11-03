import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";
import { useState, useRef, CSSProperties } from "react";

interface BorderlessButtonV2Props {
  icon: LucideIcon;
  color?: { r: number; g: number; b: number };
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

// ==================== V2.1: Glowing Edge Buttons ====================
// Apply v2.0 CodePen glowing edge to buttons with 3 sizes
// sm: 40×40px, md: 56×56px, lg: 72×72px

export function BorderlessButtonV2({
  icon: Icon,
  color = { r: 6, g: 182, b: 212 },
  size = 'md',
  onClick,
  className = "",
}: BorderlessButtonV2Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [pointerAngle, setPointerAngle] = useState(45);
  const [pointerDistance, setPointerDistance] = useState(0);
  const buttonRef = useRef<HTMLDivElement>(null);
  const { r, g, b } = color;
  
  // Size configuration (box, icon, radius, glow inset)
  const sizeMap = {
    sm: { box: 40, icon: 20, radius: 10, inset: 20 },   // inset: -20px for glow layer
    md: { box: 56, icon: 28, radius: 14, inset: 28 },   // inset: -28px for glow layer
    lg: { box: 72, icon: 36, radius: 18, inset: 36 },   // inset: -36px for glow layer
  };
  const s = sizeMap[size];
  
  const iconBackgroundBlur = 5.0;
  
  // Mouse tracking (exact v2.0 CodePen algorithm)
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const dx = x - centerX;
    const dy = y - centerY;
    
    // Angle calculation (v2.0 algorithm)
    let angleRadians = 0;
    let angleDegrees = 0;
    if (dx !== 0 || dy !== 0) {
      angleRadians = Math.atan2(dy, dx);
      angleDegrees = angleRadians * (180 / Math.PI) + 90;
      if (angleDegrees < 0) {
        angleDegrees += 360;
      }
    }
    
    // Distance to edge calculation (v2.0 algorithm)
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
  
  // Glow intensity (based on distance) - v2.0 CodePen formula
  const glowOpacity = Math.max(0, Math.min(1, (pointerDistance - 0.3) / 0.7));
  const colorOpacity = Math.max(0, Math.min(1, (pointerDistance - 0.5) / 0.5));
  
  return (
    <div 
      ref={buttonRef}
      className={`relative inline-block ${className}`}
      style={{ 
        width: `${s.box}px`,
        height: `${s.box}px`,
      }}
      onPointerMove={handlePointerMove}
    >
      {/* Layer 1: CodePen Mesh Gradient Border (hover state) - exact v2.0 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: `${s.radius}px`,
          border: '1px solid transparent',
          zIndex: 5,
          opacity: isHovered ? colorOpacity : 0,
          transition: 'opacity 0.25s ease-out',
          pointerEvents: 'none',
          // Exact v2.0 mesh gradient (8 radial layers)
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
          // Conic gradient mask following mouse angle (exact v2.0)
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
      
      {/* Layer 2: CodePen Glowing Edge (hover state) - exact v2.0 */}
      <div
        style={{
          position: 'absolute',
          inset: `-${s.inset}px`,  // Size-adaptive: sm(-20px), md(-28px), lg(-36px)
          borderRadius: `${s.radius}px`,
          zIndex: 4,
          opacity: isHovered ? glowOpacity : 0,
          transition: 'opacity 0.25s ease-out',
          pointerEvents: 'none',
          mixBlendMode: 'plus-lighter',
          // Conic gradient mask (narrow beam) - exact v2.0
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
        {/* ::before - 12 layers of box-shadow (exact v2.0 CodePen) */}
        <div
          style={{
            position: 'absolute',
            inset: `${s.inset}px`,  // Shrink back to original size
            borderRadius: `${s.radius}px`,
            // EXACT v2.0 CodePen box-shadow (6 inset + 6 outer)
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
      
      {/* Layer 3: Colored background (can blur, from v1.7) */}
      <motion.div
        animate={{
          filter: isHovered ? 'blur(0px)' : `blur(${iconBackgroundBlur}px)`,
          boxShadow: isHovered
            ? `0 0 20px rgba(${r},${g},${b},0.35)`
            : `0 0 30px rgba(${r},${g},${b},0.25)`,
        }}
        transition={{ 
          duration: 1, 
          ease: [0.34, 1.56, 0.64, 1]
        }}
        style={{
          width: `${s.box}px`,
          height: `${s.box}px`,
          borderRadius: `${s.radius}px`,
          background: `rgba(${r},${g},${b},1.0)`,
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      
      {/* Layer 4: Transparent container + Icon + Press state (⭐ Core interaction) */}
      <motion.button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        animate={{
          // ⭐⭐⭐ Press state: overall brightness increase (critical!)
          // Applied to entire button container, affects all visual layers:
          // - Colored background brightens
          // - CodePen glowing edge brightens
          // - White icon brightens (approaches glow)
          // - Mesh gradient also brightens
          filter: isPressed ? 'brightness(1.15)' : 'brightness(1.0)',
        }}
        transition={{
          duration: 0.2,  // 200ms fast response
          ease: 'easeOut',
          // Framer Motion auto-interrupts:
          // Press for 100ms then release → smoothly return from brightness(1.075) to 1.0
          // No jumping, smooth transition
        }}
        style={{
          width: `${s.box}px`,
          height: `${s.box}px`,
          borderRadius: `${s.radius}px`,
          background: 'transparent',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          padding: 0,
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* White icon - always sharp */}
        <Icon size={s.icon} color="#ffffff" strokeWidth={2} />
      </motion.button>
    </div>
  );
}
