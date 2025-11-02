import { motion } from "motion/react";
import { LucideIcon, FileArchive } from "lucide-react";
import { useState, CSSProperties } from "react";

interface DynamicBorderlessCardV5Props {
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: {
    r: number;
    g: number;
    b: number;
  };
  animationDelay?: number;
  slowMotion?: boolean; // For demo purposes
  className?: string;
}

export function DynamicBorderlessCardV5({
  title = "项目.zip",
  subtitle = "245 个文件",
  icon: Icon = FileArchive,
  iconColor = { r: 167, g: 139, b: 250 }, // purple by default
  animationDelay = 0,
  slowMotion = false,
  className = ""
}: DynamicBorderlessCardV5Props) {
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
      {/* LAYER 1: OUTER CONTAINER - Heavy Feather → Conservative Clear */}
      <motion.div
        className={`w-80 h-60 cursor-pointer ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={false}
        animate={isHovered ? "hover" : "default"}
        variants={{
          default: {
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.65) 35%, rgba(255,255,255,0.3) 65%, rgba(255,255,255,0.1) 85%, rgba(255,255,255,0) 100%)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 60px rgba(6,182,212,0.08), 0 0 100px rgba(6,182,212,0.04)',
            borderRadius: '24px',
            y: 0,
          },
          hover: {
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.88) 70%, rgba(255,255,255,0.5) 90%, rgba(255,255,255,0) 100%)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 0 1px rgba(6,182,212,0.1), 0 0 30px rgba(6,182,212,0.15), 0 16px 48px rgba(0,0,0,0.1)',
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
          {/* Icon section */}
          <div style={{ position: 'relative' }}>
            {/* LAYER 2: ICON BACKGROUND - Light Feather → Solid */}
            <motion.div
              variants={{
                default: {
                  background: `rgba(${r},${g},${b},0.25)`,
                  filter: 'blur(1px)',
                  boxShadow: `0 0 24px rgba(${r},${g},${b},0.3)`,
                },
                hover: {
                  background: `rgba(${r},${g},${b},0.95)`,
                  filter: 'blur(0px)',
                  boxShadow: `0 0 16px rgba(${r},${g},${b},0.25)`,
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              {/* LAYER 3: SHARP SVG ICON - NEVER changes */}
              <Icon 
                size={28}
                color="#ffffff"
                strokeWidth={2}
                style={{ 
                  filter: 'blur(0px)',
                  WebkitFilter: 'blur(0px)',
                  position: 'relative',
                  zIndex: 10,
                }}
              />
            </motion.div>
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
export function DynamicBorderlessCardV5Frozen({
  state,
  ...props
}: DynamicBorderlessCardV5Props & { state: 'default' | 'hover' }) {
  const { r, g, b } = props.iconColor || { r: 167, g: 139, b: 250 };
  const Icon = props.icon || FileArchive;

  const containerStyles = state === 'default' ? {
    background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.65) 35%, rgba(255,255,255,0.3) 65%, rgba(255,255,255,0.1) 85%, rgba(255,255,255,0) 100%)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 0 60px rgba(6,182,212,0.08), 0 0 100px rgba(6,182,212,0.04)',
    borderRadius: '24px',
    transform: 'translateY(0)',
  } : {
    background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.88) 70%, rgba(255,255,255,0.5) 90%, rgba(255,255,255,0) 100%)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 0 0 1px rgba(6,182,212,0.1), 0 0 30px rgba(6,182,212,0.15), 0 16px 48px rgba(0,0,0,0.1)',
    borderRadius: '16px',
    transform: 'translateY(-4px)',
  };

  const iconBackgroundStyles = state === 'default' ? {
    background: `rgba(${r},${g},${b},0.25)`,
    filter: 'blur(1px)',
    boxShadow: `0 0 24px rgba(${r},${g},${b},0.3)`,
  } : {
    background: `rgba(${r},${g},${b},0.95)`,
    filter: 'blur(0px)',
    boxShadow: `0 0 16px rgba(${r},${g},${b},0.25)`,
  };

  return (
    <div className="relative flex items-center justify-center">
      <div
        className="w-80 h-60"
        style={{ 
          ...containerStyles,
          padding: '32px',
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
          <div style={{ position: 'relative' }}>
            <div
              style={{
                ...iconBackgroundStyles,
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon 
                size={28}
                color="#ffffff"
                strokeWidth={2}
                style={{ 
                  filter: 'blur(0px)',
                  WebkitFilter: 'blur(0px)',
                }}
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
