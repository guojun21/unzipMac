import { motion } from "motion/react";
import { LucideIcon, FileArchive } from "lucide-react";
import { useState, CSSProperties } from "react";

interface DynamicBorderlessCardV6Props {
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: {
    r: number;
    g: number;
    b: number;
  };
  animationDelay?: number;
  slowMotion?: boolean;
  className?: string;
}

export function DynamicBorderlessCardV6({
  title = "项目.zip",
  subtitle = "245 个文件",
  icon: Icon = FileArchive,
  iconColor = { r: 167, g: 139, b: 250 }, // purple by default
  animationDelay = 0,
  slowMotion = false,
  className = ""
}: DynamicBorderlessCardV6Props) {
  const [isHovered, setIsHovered] = useState(false);
  const { r, g, b } = iconColor;
  
  const transitionDuration = slowMotion ? 1 : 0.4;

  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: animationDelay
      }}
    >
      {/* LAYER 1: OUTER CONTAINER */}
      <motion.div
        className={`w-80 h-60 cursor-pointer ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={false}
        animate={isHovered ? "hover" : "default"}
        variants={{
          default: {
            // FIX 1: Same opacity values as hover, only positions differ
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.65) 35%, rgba(255,255,255,0.3) 65%, rgba(255,255,255,0.1) 85%, rgba(255,255,255,0) 100%)',
            // FIX 3: Stronger blur in mist state (32px instead of 20px)
            backdropFilter: 'blur(32px)',
            boxShadow: '0 0 70px rgba(6,182,212,0.08), 0 0 110px rgba(6,182,212,0.04)',
            borderRadius: '24px',
            y: 0,
          },
          hover: {
            // FIX 1: SAME opacity values, only positions change (35→70, 65→90, 85→97)
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.65) 70%, rgba(255,255,255,0.3) 90%, rgba(255,255,255,0.1) 97%, rgba(255,255,255,0) 100%)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 0 1px rgba(6,182,212,0.12), 0 0 35px rgba(6,182,212,0.18), 0 18px 50px rgba(0,0,0,0.12)',
            borderRadius: '16px',
            y: -4,
          }
        }}
        transition={{ 
          duration: transitionDuration, 
          ease: [0.34, 1.56, 0.64, 1]
        }}
        style={{ 
          padding: '32px',
          position: 'relative',
        } as CSSProperties}
      >
        {/* Content wrapper */}
        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '16px',
            height: '100%',
            justifyContent: 'center'
          }}
        >
          {/* Icon section with SEPARATED layers */}
          {/* FIX 2: Background and SVG are SIBLINGS, not parent-child */}
          <div style={{ position: 'relative', width: '56px', height: '56px' }}>
            
            {/* LAYER 2A: Icon Background (CAN be blurred) */}
            <motion.div
              variants={{
                default: {
                  // Increased opacity from 0.25 to 0.35 for better visibility
                  background: `rgba(${r},${g},${b},0.35)`,
                  filter: 'blur(2px)',  // Soft edges
                  boxShadow: `0 0 30px rgba(${r},${g},${b},0.25)`,
                },
                hover: {
                  // Full opacity for dramatic transformation
                  background: `rgba(${r},${g},${b},1.0)`,
                  filter: 'blur(0px)',  // Crisp edges
                  boxShadow: `0 0 20px rgba(${r},${g},${b},0.3)`,
                }
              }}
              transition={{ 
                duration: transitionDuration, 
                ease: [0.34, 1.56, 0.64, 1]
              }}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            />
            
            {/* LAYER 2B: SVG Icon (ABOVE background, NO parent blur affects it!) */}
            <div
              style={{
                width: '56px',
                height: '56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 10,
                // Explicitly sharp - not affected by background blur
                filter: 'blur(0px)',
                WebkitFilter: 'blur(0px)',
              }}
            >
              <Icon 
                size={28}
                color="#ffffff"
                strokeWidth={2}
              />
            </div>
          </div>

          {/* LAYER 3: SHARP TEXT - NEVER changes */}
          <div 
            style={{ 
              textAlign: 'center',
              filter: 'blur(0px)',
              WebkitFilter: 'blur(0px)',
              position: 'relative',
              zIndex: 10,
            }}
          >
            <h3 
              style={{ 
                fontSize: '20px',
                fontWeight: 600,
                color: '#0f172a',
                marginBottom: '4px',
                lineHeight: 1.3,
              }}
            >
              {title}
            </h3>
            <p 
              style={{
                fontSize: '14px',
                color: '#64748b',
                lineHeight: 1.5,
              }}
            >
              {subtitle}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Frozen state version for comparison
export function DynamicBorderlessCardV6Frozen({
  state,
  ...props
}: DynamicBorderlessCardV6Props & { state: 'default' | 'hover' }) {
  const { r, g, b } = props.iconColor || { r: 167, g: 139, b: 250 };
  const Icon = props.icon || FileArchive;

  const containerStyles = state === 'default' ? {
    background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.65) 35%, rgba(255,255,255,0.3) 65%, rgba(255,255,255,0.1) 85%, rgba(255,255,255,0) 100%)',
    backdropFilter: 'blur(32px)',
    boxShadow: '0 0 70px rgba(6,182,212,0.08), 0 0 110px rgba(6,182,212,0.04)',
    borderRadius: '24px',
    transform: 'translateY(0)',
  } : {
    background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.65) 70%, rgba(255,255,255,0.3) 90%, rgba(255,255,255,0.1) 97%, rgba(255,255,255,0) 100%)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 0 0 1px rgba(6,182,212,0.12), 0 0 35px rgba(6,182,212,0.18), 0 18px 50px rgba(0,0,0,0.12)',
    borderRadius: '16px',
    transform: 'translateY(-4px)',
  };

  const iconBackgroundStyles = state === 'default' ? {
    background: `rgba(${r},${g},${b},0.35)`,
    filter: 'blur(2px)',
    boxShadow: `0 0 30px rgba(${r},${g},${b},0.25)`,
  } : {
    background: `rgba(${r},${g},${b},1.0)`,
    filter: 'blur(0px)',
    boxShadow: `0 0 20px rgba(${r},${g},${b},0.3)`,
  };

  return (
    <div className="relative flex items-center justify-center">
      <div
        className="w-80 h-60"
        style={{ 
          ...containerStyles,
          padding: '32px',
          position: 'relative',
        } as CSSProperties}
      >
        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '16px',
            height: '100%',
            justifyContent: 'center'
          }}
        >
          <div style={{ position: 'relative', width: '56px', height: '56px' }}>
            <div
              style={{
                ...iconBackgroundStyles,
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            />
            
            <div
              style={{
                width: '56px',
                height: '56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 10,
                filter: 'blur(0px)',
                WebkitFilter: 'blur(0px)',
              }}
            >
              <Icon 
                size={28}
                color="#ffffff"
                strokeWidth={2}
              />
            </div>
          </div>

          <div 
            style={{ 
              textAlign: 'center',
              filter: 'blur(0px)',
              WebkitFilter: 'blur(0px)',
            }}
          >
            <h3 
              style={{ 
                fontSize: '20px',
                fontWeight: 600,
                color: '#0f172a',
                marginBottom: '4px',
              }}
            >
              {props.title || "项目.zip"}
            </h3>
            <p 
              style={{
                fontSize: '14px',
                color: '#64748b',
              }}
            >
              {props.subtitle || "245 个文件"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
