import { motion, useAnimation } from "motion/react";
import { LucideIcon } from "lucide-react";
import { useState, useEffect, CSSProperties, ChangeEvent } from "react";

interface BorderlessInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  icon?: LucideIcon;
  className?: string;
}

// ==================== V1.4: Component Library - Input ====================
// Fixed optimal parameters
// NEW: Condensed edge keeps 1px on focus
// NEW: Press state effect

export function BorderlessInput({
  placeholder = "搜索",
  value,
  onChange,
  icon: Icon,
  className = "",
}: BorderlessInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const edgeControls = useAnimation();
  
  // Fixed parameters (moderate for inputs)
  const params = {
    edgeLineWidth: 5,
    edgeBlurAmount: 10,
    condensedEdgeWidth: 1,  // Keep 1px when focused
    animationSpeed: 1000,
  };
  
  // Edge line animation (triggered by focus, not hover)
  useEffect(() => {
    if (isFocused) {
      edgeControls.start({
        borderWidth: `${params.condensedEdgeWidth}px`,  // 5px → 1px
        filter: 'blur(0px)',                            // 10px → 0px
        borderColor: 'rgba(6,182,212,0.5)',
        transition: { 
          duration: params.animationSpeed / 1000, 
          ease: [0.34, 1.56, 0.64, 1] 
        }
      });
    } else {
      edgeControls.start({
        borderWidth: `${params.edgeLineWidth}px`,       // 1px → 5px
        filter: `blur(${params.edgeBlurAmount}px)`,     // 0px → 10px
        borderColor: 'rgba(6,182,212,0.6)',
        transition: { 
          duration: params.animationSpeed / 1000, 
          ease: [0.34, 1.56, 0.64, 1] 
        }
      });
    }
  }, [isFocused, edgeControls]);
  
  return (
    <div className={`relative ${className}`} style={{ padding: '20px', width: '320px' }}>
      {/* Edge line */}
      <motion.div
        animate={edgeControls}
        initial={{
          borderWidth: `${params.edgeLineWidth}px`,
          filter: `blur(${params.edgeBlurAmount}px)`,
          borderColor: 'rgba(6,182,212,0.6)',
        }}
        style={{
          position: 'absolute',
          inset: 0,
          border: `${params.edgeLineWidth}px solid rgba(6,182,212,0.6)`,
          borderRadius: '12px',
          boxSizing: 'border-box',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      
      {/* Input body */}
      <motion.div
        animate={{
          // NEW: Press state - darken on click
          filter: isPressed ? 'brightness(0.92)' : 'brightness(1)',
        }}
        transition={{ 
          duration: 0.15,  // 150ms fast response
          ease: 'easeOut' 
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 16px',
          background: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          boxShadow: '0 0 10px 5px rgba(6,182,212,0.12)',
          position: 'relative',
          zIndex: 1,
        } as CSSProperties}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
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
