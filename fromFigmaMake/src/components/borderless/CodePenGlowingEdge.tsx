import { useState, useRef } from "react";

interface CodePenGlowingEdgeProps {
  children?: React.ReactNode;
  className?: string;
}

// ==================== V1.9: Exact CodePen Glowing Edge Replica ====================
// 100% implementation following fromCodePen/glowingEdgeCard
// No innovations, exact replication!

export function CodePenGlowingEdge({
  children,
  className = "",
}: CodePenGlowingEdgeProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pointerAngle, setPointerAngle] = useState(45);
  const [pointerDistance, setPointerDistance] = useState(0);
  
  // Mouse tracking (exact CodePen algorithm)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const dx = x - centerX;
    const dy = y - centerY;
    
    // Angle calculation (CodePen algorithm)
    let angleRadians = 0;
    let angleDegrees = 0;
    if (dx !== 0 || dy !== 0) {
      angleRadians = Math.atan2(dy, dx);
      angleDegrees = angleRadians * (180 / Math.PI) + 90;
      if (angleDegrees < 0) {
        angleDegrees += 360;
      }
    }
    
    // Distance to edge calculation (CodePen algorithm)
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
  
  // Glow intensity (based on distance) - CodePen formula
  const glowOpacity = Math.max(0, Math.min(1, (pointerDistance - 0.3) / 0.7));
  const colorOpacity = Math.max(0, Math.min(1, (pointerDistance - 0.5) / 0.5));
  
  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      onPointerMove={handlePointerMove}
      style={{
        width: 'clamp(320px, 90vw, 600px)',
        height: '400px',
        borderRadius: '28px',
        isolation: 'isolate',
        border: '1px solid rgba(255, 255, 255, 0.25)',
        // Card background (exact CodePen gradient)
        background: `
          linear-gradient(
            8deg,
            hsl(260, 25%, 15%) 75%,
            hsl(260, 25%, 17%) 75.5%
          )
        `,
        // Card shadow (exact CodePen multi-layer)
        boxShadow: `
          rgba(0, 0, 0, 0.1) 0px 1px 2px,
          rgba(0, 0, 0, 0.1) 0px 2px 4px,
          rgba(0, 0, 0, 0.1) 0px 4px 8px,
          rgba(0, 0, 0, 0.1) 0px 8px 16px,
          rgba(0, 0, 0, 0.1) 0px 16px 32px,
          rgba(0, 0, 0, 0.1) 0px 32px 64px
        `,
      }}
    >
      {/* Mesh Gradient Border (::before in CodePen) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          border: '1px solid transparent',
          zIndex: -1,
          opacity: colorOpacity,
          transition: 'opacity 0.25s ease-out',
          // Exact CodePen mesh gradient (8 radial layers)
          background: `
            linear-gradient(hsl(260, 25%, 15%) 0 100%) padding-box,
            radial-gradient(at 80% 55%, hsla(268,100%,76%,1) 0px, transparent 50%) border-box,
            radial-gradient(at 69% 34%, hsla(349,100%,74%,1) 0px, transparent 50%) border-box,
            radial-gradient(at 8% 6%, hsla(136,100%,78%,1) 0px, transparent 50%) border-box,
            radial-gradient(at 41% 38%, hsla(192,100%,64%,1) 0px, transparent 50%) border-box,
            radial-gradient(at 86% 85%, hsla(186,100%,74%,1) 0px, transparent 50%) border-box,
            radial-gradient(at 82% 18%, hsla(52,100%,65%,1) 0px, transparent 50%) border-box,
            radial-gradient(at 51% 4%, hsla(12,100%,72%,1) 0px, transparent 50%) border-box,
            linear-gradient(#c299ff 0 100%) border-box
          `,
          // Conic gradient mask following mouse angle
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
      
      {/* Glowing Edge (.glow in CodePen) */}
      <div
        style={{
          position: 'absolute',
          inset: '-40px',  // Expand outward
          borderRadius: 'inherit',
          zIndex: 1,
          pointerEvents: 'none',
          opacity: glowOpacity,
          transition: 'opacity 0.25s ease-out',
          mixBlendMode: 'plus-lighter',
          // Conic gradient mask (narrow beam following mouse)
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
        {/* ::before - Actual glow effect (12 layers of box-shadow) */}
        <div
          style={{
            position: 'absolute',
            inset: '40px',  // Shrink back to original size
            borderRadius: 'inherit',
            // EXACT CodePen box-shadow (6 inset + 6 outer = 12 layers total)
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
      
      {/* Mesh Gradient Background (::after in CodePen) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          border: '1px solid transparent',
          zIndex: -1,
          opacity: colorOpacity,
          transition: 'opacity 0.25s ease-out',
          mixBlendMode: 'soft-light',
          // Same radial gradients but in padding-box
          background: `
            radial-gradient(at 80% 55%, hsla(268,100%,76%,1) 0px, transparent 50%) padding-box,
            radial-gradient(at 69% 34%, hsla(349,100%,74%,1) 0px, transparent 50%) padding-box,
            radial-gradient(at 8% 6%, hsla(136,100%,78%,1) 0px, transparent 50%) padding-box,
            radial-gradient(at 41% 38%, hsla(192,100%,64%,1) 0px, transparent 50%) padding-box,
            radial-gradient(at 86% 85%, hsla(186,100%,74%,1) 0px, transparent 50%) padding-box,
            radial-gradient(at 82% 18%, hsla(52,100%,65%,1) 0px, transparent 50%) padding-box,
            radial-gradient(at 51% 4%, hsla(12,100%,72%,1) 0px, transparent 50%) padding-box,
            linear-gradient(#c299ff 0 100%) padding-box
          `,
          // Complex mask-composite for squircle shape
          WebkitMaskImage: `
            linear-gradient(to bottom, black, black),
            radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%),
            radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%),
            radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%),
            radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%),
            radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%),
            conic-gradient(
              from ${pointerAngle}deg at center,
              transparent 5%,
              black 15%,
              black 85%,
              transparent 95%
            )
          `,
          WebkitMaskComposite: 'source-over, xor, xor, xor, xor, xor, source-over',
          maskImage: `
            linear-gradient(to bottom, black, black),
            radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%),
            radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%),
            radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%),
            radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%),
            radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%),
            conic-gradient(
              from ${pointerAngle}deg at center,
              transparent 5%,
              black 15%,
              black 85%,
              transparent 95%
            )
          `,
          maskComposite: 'add, subtract, subtract, subtract, subtract, subtract, add',
        }}
      />
      
      {/* Content Layer */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '2em',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        {children}
      </div>
    </div>
  );
}
