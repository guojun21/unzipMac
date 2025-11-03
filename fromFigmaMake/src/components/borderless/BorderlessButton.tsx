import { motion, useAnimation } from "motion/react";
import { LucideIcon } from "lucide-react";
import { useState, useEffect, CSSProperties, ReactNode } from "react";

interface BorderlessButtonProps {
  children: ReactNode;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

// ==================== V1.4: Component Library - Button ====================
// Fixed optimal parameters (lighter than card for buttons)
// NEW: Condensed edge keeps 1px
// NEW: Press state effect

export function BorderlessButton({
  children,
  icon: Icon,
  variant = 'primary',
  size = 'md',
  onClick,
  className = "",
}: BorderlessButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const edgeControls = useAnimation();
  
  // Fixed parameters (lighter for buttons)
  const params = {
    edgeLineWidth: 4,       // Thinner line for buttons
    edgeBlurAmount: 8,      // Lighter blur for buttons
    condensedEdgeWidth: 1,  // Keep 1px in condensed state
    animationSpeed: 1000,
  };
  
  const sizeMap = {
    sm: { px: 12, py: 6, text: '14px', iconSize: 16 },
    md: { px: 24, py: 12, text: '14px', iconSize: 18 },
    lg: { px: 32, py: 16, text: '16px', iconSize: 20 },
  };
  
  const variantMap = {
    primary: {
      bg: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
      text: '#ffffff',
      glowColor: 'rgba(6,182,212,0.2)',
    },
    secondary: {
      bg: 'rgba(255,255,255,0.8)',
      text: '#0f172a',
      glowColor: 'rgba(6,182,212,0.15)',
    },
  };
  
  const s = sizeMap[size];
  const v = variantMap[variant];
  
  // Edge line animation
  useEffect(() => {
    if (isHovered) {
      edgeControls.start({
        borderWidth: `${params.condensedEdgeWidth}px`,  // 4px → 1px
        filter: 'blur(0px)',                            // 8px → 0px
        borderColor: 'rgba(6,182,212,0.3)',
        transition: { 
          duration: params.animationSpeed / 1000, 
          ease: [0.34, 1.56, 0.64, 1] 
        }
      });
    } else {
      edgeControls.start({
        borderWidth: `${params.edgeLineWidth}px`,       // 1px → 4px
        filter: `blur(${params.edgeBlurAmount}px)`,     // 0px → 8px
        borderColor: 'rgba(6,182,212,0.7)',
        transition: { 
          duration: params.animationSpeed / 1000, 
          ease: [0.34, 1.56, 0.64, 1] 
        }
      });
    }
  }, [isHovered, edgeControls]);
  
  return (
    <div className={`relative inline-block ${className}`} style={{ padding: '20px' }}>
      {/* Edge line */}
      <motion.div
        animate={edgeControls}
        initial={{
          borderWidth: `${params.edgeLineWidth}px`,
          filter: `blur(${params.edgeBlurAmount}px)`,
          borderColor: 'rgba(6,182,212,0.7)',
        }}
        style={{
          position: 'absolute',
          inset: 0,
          border: `${params.edgeLineWidth}px solid rgba(6,182,212,0.7)`,
          borderRadius: '12px',
          boxSizing: 'border-box',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      
      {/* Button body */}
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
          // NEW: Press state - darken on click
          filter: isPressed ? 'brightness(0.92)' : 'brightness(1)',
        }}
        transition={{
          duration: 0.15,  // 150ms fast response
          ease: 'easeOut',
        }}
        style={{
          padding: `${s.py}px ${s.px}px`,
          background: v.bg,
          color: v.text,
          border: 'none',
          borderRadius: '12px',
          fontSize: s.text,
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          position: 'relative',
          zIndex: 1,
          backdropFilter: 'blur(10px)',
          boxShadow: `0 0 10px 6px ${v.glowColor}`,
        } as CSSProperties}
      >
        {Icon && <Icon size={s.iconSize} />}
        {children}
      </motion.button>
    </div>
  );
}
