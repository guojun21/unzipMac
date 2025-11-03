import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";
import { useState } from "react";

interface BorderlessButtonV1_7Props {
  icon: LucideIcon;
  color?: { r: number; g: number; b: number };
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

// ==================== V1.7: Button - Double Layer Structure ====================
// Layer 1: Color background (can blur) - position: absolute, pointerEvents: none
// Layer 2: Transparent container + white icon (always sharp) - position: relative, zIndex: 10
// Press state: brightness(1.15) brighten 15%, 200ms, interruptible

export function BorderlessButtonV1_7({
  icon: Icon,
  color = { r: 6, g: 182, b: 212 },  // Default cyan
  size = 'md',
  onClick,
  className = "",
}: BorderlessButtonV1_7Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const { r, g, b } = color;
  
  const sizeMap = {
    sm: { box: 40, icon: 20, radius: 10 },
    md: { box: 56, icon: 28, radius: 14 },
    lg: { box: 72, icon: 36, radius: 18 },
  };
  const s = sizeMap[size];
  
  // Fixed parameters
  const iconBackgroundBlur = 5.0;
  const animationSpeed = 1.0;  // 1s for blur animation
  const pressSpeed = 0.2;      // 200ms for press animation
  
  return (
    <div 
      className={`relative inline-block ${className}`}
      style={{ 
        width: `${s.box}px`, 
        height: `${s.box}px` 
      }}
    >
      {/* Layer 1: Color background (can blur) */}
      <motion.div
        animate={{
          // Blur effect: mist state blurs, condensed state clear
          filter: isHovered ? 'blur(0px)' : `blur(${iconBackgroundBlur}px)`,
          
          // Glow effect
          boxShadow: isHovered
            ? `0 0 20px rgba(${r},${g},${b},0.35)`
            : `0 0 30px rgba(${r},${g},${b},0.25)`,
        }}
        transition={{ 
          duration: animationSpeed,  // 1s elegant animation
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
          pointerEvents: 'none',  // Don't intercept events
        }}
      />
      
      {/* Layer 2: Transparent container + white icon (always sharp) + press state */}
      <motion.button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);  // Reset press state on leave
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        animate={{
          // Press state: brighten 15%, affects whole container (including background layer)
          filter: isPressed ? 'brightness(1.15)' : 'brightness(1.0)',
        }}
        transition={{
          duration: pressSpeed,  // 200ms
          ease: 'easeOut',
          // Framer Motion default behavior: animation is interruptible
          // If pressed for only 100ms, animation will smoothly transition from ~1.075 back to 1.0
          // No special configuration needed - it automatically implements interruption
        }}
        style={{
          width: `${s.box}px`,
          height: `${s.box}px`,
          borderRadius: `${s.radius}px`,
          background: 'transparent',  // Transparent, shows color background below
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
        {/* White icon - always sharp, not affected by any blur */}
        <Icon 
          size={s.icon} 
          color="#ffffff" 
          strokeWidth={2}
        />
      </motion.button>
    </div>
  );
}
