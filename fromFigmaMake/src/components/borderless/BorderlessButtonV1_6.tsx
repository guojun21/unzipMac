import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";
import { useState, CSSProperties } from "react";

interface BorderlessButtonV1_6Props {
  icon: LucideIcon;
  color?: { r: number; g: number; b: number };
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

// ==================== V1.6: Borderless Button - No Edge Line ====================
// Button = Pure icon background (colored rounded rect + blur + icon)
// NO edge line layer at all!
// Exactly like the card's icon background part

export function BorderlessButtonV1_6({
  icon: Icon,
  color = { r: 6, g: 182, b: 212 },  // Default cyan
  size = 'md',
  onClick,
  className = "",
}: BorderlessButtonV1_6Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const { r, g, b } = color;
  
  const sizeMap = {
    sm: { box: 40, icon: 20, radius: 10 },
    md: { box: 56, icon: 28, radius: 14 },
    lg: { box: 72, icon: 36, radius: 18 },
  };
  const s = sizeMap[size];
  
  // Fixed parameter (same as card icon)
  const iconBackgroundBlur = 5.0;
  
  return (
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
        // Only blur effect (same as card icon background)
        filter: isPressed 
          ? 'brightness(0.92)' 
          : isHovered 
            ? 'blur(0px)' 
            : `blur(${iconBackgroundBlur}px)`,
        
        // Glow effect
        boxShadow: isHovered
          ? `0 0 20px rgba(${r},${g},${b},0.35)`
          : `0 0 30px rgba(${r},${g},${b},0.25)`,
      }}
      transition={{ 
        filter: { 
          duration: isPressed ? 0.15 : 1.0,
          ease: isPressed ? 'easeOut' : [0.34, 1.56, 0.64, 1]
        },
        boxShadow: { 
          duration: 1.0, 
          ease: [0.34, 1.56, 0.64, 1]
        },
      }}
      className={className}
      style={{
        width: `${s.box}px`,
        height: `${s.box}px`,
        borderRadius: `${s.radius}px`,
        background: `rgba(${r},${g},${b},1.0)`,  // Solid color background
        border: 'none',  // NO border!
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        padding: 0,
      } as CSSProperties}
    >
      <Icon size={s.icon} color="#ffffff" strokeWidth={2} />
    </motion.button>
  );
}
