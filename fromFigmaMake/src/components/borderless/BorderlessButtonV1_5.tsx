import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";
import { useState, CSSProperties } from "react";

interface BorderlessButtonV1_5Props {
  icon: LucideIcon;
  color?: { r: number; g: number; b: number };
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

// ==================== V1.5: Borderless Button - Icon Background Only ====================
// Button is just the icon background part (like the colored icon in card)
// NO full card structure, NO variant prop
// Use color parameter to differentiate: cyan=primary, green=success, red=danger, gray=secondary

export function BorderlessButtonV1_5({
  icon: Icon,
  color = { r: 6, g: 182, b: 212 },  // Default cyan
  size = 'md',
  onClick,
  className = "",
}: BorderlessButtonV1_5Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const { r, g, b } = color;
  
  const sizeMap = {
    sm: { box: 40, icon: 20, radius: 10, edgeWidth: 3, edgeBlur: 6 },
    md: { box: 56, icon: 28, radius: 14, edgeWidth: 4, edgeBlur: 8 },
    lg: { box: 72, icon: 36, radius: 18, edgeWidth: 5, edgeBlur: 10 },
  };
  const s = sizeMap[size];
  
  return (
    <div 
      className={className}
      style={{ position: 'relative', padding: '20px', display: 'inline-block' }}
    >
      {/* Edge line (same logic as card icon) */}
      <motion.div
        animate={{
          borderWidth: isHovered ? '1px' : `${s.edgeWidth}px`,
          filter: isHovered ? 'blur(0px)' : `blur(${s.edgeBlur}px)`,
          borderColor: isHovered 
            ? `rgba(${r},${g},${b},0.4)` 
            : `rgba(${r},${g},${b},0.8)`,
        }}
        transition={{ 
          duration: 1, 
          ease: [0.34, 1.56, 0.64, 1] 
        }}
        style={{
          position: 'absolute',
          inset: 0,
          border: `${s.edgeWidth}px solid rgba(${r},${g},${b},0.8)`,
          borderRadius: `${s.radius}px`,
          boxSizing: 'border-box',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      
      {/* Button body (colored rounded rectangle) */}
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
          // Background blur (same as card icon)
          filter: isPressed 
            ? 'brightness(0.92)' 
            : isHovered ? 'blur(0px)' : 'blur(5px)',
          // Glow
          boxShadow: isHovered
            ? `0 0 20px rgba(${r},${g},${b},0.35)`
            : `0 0 30px rgba(${r},${g},${b},0.25)`,
        }}
        transition={{ 
          filter: { 
            duration: isPressed ? 0.15 : 1, 
            ease: isPressed ? 'easeOut' : [0.34, 1.56, 0.64, 1]
          },
          boxShadow: { 
            duration: 1, 
            ease: [0.34, 1.56, 0.64, 1] 
          },
        }}
        style={{
          width: `${s.box}px`,
          height: `${s.box}px`,
          borderRadius: `${s.radius}px`,
          background: `rgba(${r},${g},${b},1.0)`,  // Solid color
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative',
          zIndex: 1,
        } as CSSProperties}
      >
        <Icon size={s.icon} color="#ffffff" strokeWidth={2} />
      </motion.button>
    </div>
  );
}
