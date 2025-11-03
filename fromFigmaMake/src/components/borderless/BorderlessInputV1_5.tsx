import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";
import { useState, ChangeEvent, CSSProperties } from "react";

interface BorderlessInputV1_5Props {
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  icon?: LucideIcon;
  className?: string;
}

// ==================== V1.5: Borderless Input - Edge Alignment ====================
// Fixed: Condensed edge aligns with input border (not double edges)
// Edge layer uses inset: 0 to perfectly align with input

export function BorderlessInputV1_5({
  placeholder = "搜索",
  value,
  onChange,
  icon: Icon,
  className = "",
}: BorderlessInputV1_5Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  const params = {
    edgeLineWidth: 5,
    edgeBlurAmount: 10,
    condensedEdgeWidth: 1,
    animationSpeed: 1000,
  };
  
  return (
    <div 
      className={`relative ${className}`} 
      style={{ width: '320px' }}
    >
      {/* Edge line layer - ALIGNED with input (inset: 0) */}
      <motion.div
        animate={{
          borderWidth: isFocused 
            ? `${params.condensedEdgeWidth}px` 
            : `${params.edgeLineWidth}px`,
          filter: isFocused 
            ? 'blur(0px)' 
            : `blur(${params.edgeBlurAmount}px)`,
          borderColor: isFocused 
            ? 'rgba(6,182,212,0.5)' 
            : 'rgba(6,182,212,0.7)',
        }}
        transition={{ 
          duration: params.animationSpeed / 1000, 
          ease: [0.34, 1.56, 0.64, 1] 
        }}
        style={{
          position: 'absolute',
          inset: 0,  // KEY: Aligns perfectly with input border
          border: `${params.edgeLineWidth}px solid rgba(6,182,212,0.7)`,
          borderRadius: '12px',
          boxSizing: 'border-box',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      
      {/* Input body */}
      <motion.div
        animate={{
          filter: isPressed ? 'brightness(0.92)' : 'brightness(1)',
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 16px',
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          // NO box-shadow glow - edge line is the boundary
          // Condensed state: edge becomes 1px, aligned with input edge
          position: 'relative',
          zIndex: 1,
          width: '100%',
          boxSizing: 'border-box',
        } as CSSProperties}
      >
        {Icon && (
          <Icon 
            size={18} 
            style={{ color: '#94a3b8', flexShrink: 0 }} 
          />
        )}
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: '14px',
            color: '#0f172a',
            flex: 1,
            width: '100%',
          }}
        />
      </motion.div>
    </div>
  );
}
